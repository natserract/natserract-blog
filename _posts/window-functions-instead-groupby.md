---
title: "Use Window Functions Instead of GroupBy"
date: "2023-08-15"
author: "Alfin Surya"
excerpt: "SQL window function vs group by"
---

Window functions sebenernya hampir mirip seperti `groupBy`, cuman saya rasa ini lebih powerful dan fleksibel. Tujuannya untuk mengelompokkan sekumpulan data dan menerapkan operasi agregat, seperti `AVG`, `MAX`, etc. 

> Secara hasil bedanya operasi pada window functions **di evaluasi di setiap baris data (saat ini)** sedangkan `groupBy` **menjadi satu baris hasil**.

### Group By:
```sql
λ> select 
  a.id as "ID",
  a.code as "Code",
  count(a.id) as "Count"
from order_items oi 
inner join assets a on a.id = oi."assetId" 
group by a.id

+-------------------------------+
| ID  |   Code     |   Count  | 
+-------------------------------+
| 15  |  1231212   |    2     |
| 19  |  12341928  |    2     |
+-----+-------------------------+
```
> Group By Asset Id

### Window Functions
```sql
λ> select 
  a.id as "ID",
  a.code as "Code",
  count(a.id) OVER(partition by oi."assetId") as "Count"
from order_items oi
inner join assets a on a.id = oi."assetId"

+-------------------------------+
| ID  |   Code     |   Count  | 
+-------------------------------+
| 15  |  1231212   |    2     |
| 15  |  1231212   |    2     |
| 19  |  12341928  |    2     |
| 19  |  12341928  |    2     |
+-----+-------------------------+
```

Dalam window functions, dapat dilihat operasi dilakukan tanpa `GROUP BY` clause, yang menarik ada dibagian ini:
```sql
count(a.id) OVER(partition by oi."assetId") as "Count"
```

### Agregate function
Disebut window functions, karena **adanya fungsi agregat yang dioperasikan dengan `OVER` clause**
  - Patternnya seperti ini:
  ```sql
  <function_name>(<argument(s)>) OVER(PARTITION BY <column(s)> ORDER BY <column(s)>) <alias> 
  ```

### Over Clause
**Over clause**, **mendefinisikan ukuran window yang mau dibuat. Misal**:
- `OVER()` jika parameter kosong, maka partisi dibuat berdasarkan perhitungan keseluruhan data. Jika merujuk pada case diatas
```sql
  λ> select 
    ...
    count(a.id) OVER() as "Count"
    ...

  +-------------------------------+
  | ID  |   Code     |   Count  |
  +-------------------------------+
  | 15  |  1231212   |    4     |
  | 15  |  1231212   |    4     |
  | 19  |  12341928  |    4     |
  | 19  |  12341928  |    4     |
  +-----+-------------------------+
```

- **Membuat partisi window, _berdasarkan grouping column_**.
 ```sql
 count(a.id) OVER(partition by oi."assetId")
 ```
> Jadi, dalam case diatas artinya hitung berdasarkan Asset Id yang ada, yaitu Asset ID 15 dengan jumlah 2, dan Asset ID 19 juga berjumlah 2
- **Membuat partisi window + _sorting_**, 

```sql
λ> select 
...
oi.price as "Price",
oi.id as "Item ID",
...
DENSE_RANK() OVER(partition by oi."assetId" order by oi.price desc) as "Rank"
...

+---------------------------------+------------+---------------+
| ID  |   Code     |    Price     |    Item ID    |    Rank
+---------------------------------+------------+---------------+
| 15  |  1231212   |    200000    |      303     |      1      |
| 15  |  1231212   |    100000    |      302     |      2      |
| 19  |  12341928  |    813984    |      301     |      1      |
| 19  |  12341928  |    813984    |      304     |      1      |
+-----+---------------------------+------------+---------------+
```
> [DENSE_RANK()](https://postgrespro.com/docs/postgresql/9.4/functions-window) untuk melihat peringkat berdasarkan Harga terbesar, secara berurutan 

## Why Window Functions?
Sejauh ini yg saya rasa, `GROUP BY` kurang fleksibel untuk operasi query yang membutuhkan data dari table lain:
```sql
λ> select 
oi.price, -- non agregate 
sum(oi.price) -- agregate,
...
...
from order_items oi 
inner join assets a on a.id = oi."assetId" 
inner join asset_events ae on ae."assetId" = a.id
...
group by 1, ... ? ..?
--
-- Error:
-- column "oi.price"  must appear in the GROUP BY clause 
-- or be used in an aggregate function
```
Jadi problemnya, saya harus define `group by` value diatas per setiap non agregate data (per table) yg akan di show, selain itu hasilnya bisa jadi tidak sesuai. Mungkin ada cara lain dengan group by, cuman kelihatannya bakal lebih kompleks.

Nah, justru window functions ini bisa solve problem kompleksitas diatas, just simply add:
```sql
λ> select
   a.id as "ID",
   a.code as "Code",
   oi.price,
   count(a.id) OVER(partition by oi."assetId") as "Count",
   sum(oi.price) OVER(partition by oi."assetId") as "Total"
from order_items oi
    inner join assets a on a.id = oi."assetId"
```

> TIPS: **If the problem statement does not require combining both aggregated and non-aggregated columns in a single query, then your best approach is to use a GROUP BY clause instead.**

## CTE + Window Functions + Sub Query 
Case kali ini, _get asset events terakhir dari setiap asset yang di book oleh customer_ 
```sql
with latest_asset_events as (
 select *, 
 	DENSE_RANK() OVER(PARTITION BY ae."assetId" order by ae."createdAt" desc) AS rank
   from asset_events ae
) select * from latest_asset_events lae 
where lae."assetId" in (
  select a.id
  from orders o
     inner join order_items oi on oi."orderId" = o.id
     inner join assets a on a.id = oi."assetId"
)
and rank=1
```
> `rank=1` untuk mendapatkan rank pertama dari tanggal asset event terbaru `order by ae."createdAt" desc`

## Additional reading:
- SQL Window Functions performance [https://selectfrom.dev/sql-performance-of-window-functions-vs-subqueries-on-big-data-3fa533fc64bf](https://selectfrom.dev/sql-performance-of-window-functions-vs-subqueries-on-big-data-3fa533fc64bf)
- [https://coderpad.io/blog/development/window-functions-aggregate-data-postgres/](https://coderpad.io/blog/development/window-functions-aggregate-data-postgres/)