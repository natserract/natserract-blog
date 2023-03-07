---
title: "DRY Your SQL Query"
date: "2023-03-07"
author: "Alfin Surya"
---

DRY (Don't Repeat Yourself) merupakan prinsip dasar pemrogaman. Masalah yang terjadi umumnya terkait dengan kode yang berulang, saat logika yang sama ditulis berulang nantinya ketika ada perubahan, pemrogram harus merubah keseluruhan logic dimana-mana, sehingga ini membuang banyak waktu.

Keuntungan DRY:
Lebih sedikit kode: Menghemat waktu dan tenaga, mudah di maintenance, dan juga mengurangi kemungkinan bug.

> “Every line of code is written without reason, maintained out of weakness, and deleted by chance” Jean-Paul Sartre’s Programming in ANSI C.

Tidak mesti kode yang duplikat itu salah. Ada beberapa alasan, biasanya saya akan _**lakukan tulis dulu optimisasi nanti**_. Abstraksi terbaik adalah abstraksi yang mengoptimalkan cukup baik , bukan sempurna . _Itu fitur, bukan bug_. Memahami sifat abstraksi adalah kunci untuk merancang software yang baik.

## Our case

Case kali ini, buat sebuah fitur analitik detail pesanan dalam periode waktu **hari ini** dan **hari sebelumnya**. Product terdiri dari 2 tipe berupa **product item** dan **addon**.

```sql
select 
	-- Today
	sum(coalesce(curr_product_item.subtotal, 0)) as today_subtotal,
	sum(coalesce(curr_addon.subtotal, 0)) as today_addon_subtotal,
	sum(coalesce(curr_product_item.total, 0) + coalesce(curr_addon.total, 0)) as today_total,
	-- Yesterday
	sum(coalesce(prev_product_item.subtotal, 0)) as yesterday_subtotal,
	sum(coalesce(prev_addon.subtotal, 0)) as yesterday_addon_subtotal,
	sum(coalesce(prev_product_item.total, 0) + coalesce(prev_addon.total, 0)) as yesterday_total
from invoices i 
    left join (
    	select 
            ili.subtotal, 
            ili.discount, 
            (ili.subtotal - ili.discount) as total, 
            i.id as invoiceid
          from 
            order_items oi 
            inner join invoice_line_items ili on ili."orderItemId" = oi.id 
            inner join invoices i on i.id = ili."invoiceId" 
            where 
            	i."postedDate" >= date_trunc('day', (now() at time zone 'Asia/Jakarta')):: timestamp
            	and i."postedDate" <= date_trunc('day', (now() at time zone 'Asia/Jakarta' + interval '1 day')):: timestamp
            	and oi."ownerType" = 'productItem'
    ) curr_product_item on curr_product_item.invoiceid = i.id
     left join (
    	select 
            ili.subtotal, 
            ili.discount, 
            (ili.subtotal - ili.discount) as total, 
            i.id as invoiceid
          from 
            order_items oi 
            inner join invoice_line_items ili on ili."orderItemId" = oi.id 
            inner join invoices i on i.id = ili."invoiceId"
            where 
            	i."postedDate" >= date_trunc('day', (now() at time zone 'Asia/Jakarta')):: timestamp
            	and i."postedDate" <= date_trunc('day', (now() at time zone 'Asia/Jakarta' + interval '1 day')):: timestamp
            	and oi."ownerType" = 'addOn'
    ) curr_addon on curr_addon.invoiceid = i.id
    left join (
    	select 
            ili.subtotal, 
            ili.discount, 
            (ili.subtotal - ili.discount) as total, 
            i.id as invoiceid
          from 
            order_items oi 
            inner join invoice_line_items ili on ili."orderItemId" = oi.id 
            inner join invoices i on i.id = ili."invoiceId" 
            where 
            	i."postedDate" >= date_trunc('day', (now() at time zone 'Asia/Jakarta' - interval '1 day')):: timestamp
            	and i."postedDate" <= date_trunc('day', (now() at time zone 'Asia/Jakarta')):: timestamp
            	and oi."ownerType" = 'productItem'
    ) prev_product_item on prev_product_item.invoiceid = i.id
     left join (
    	select 
            ili.subtotal, 
            ili.discount, 
            (ili.subtotal - ili.discount) as total, 
            i.id as invoiceid
          from 
            order_items oi 
            inner join invoice_line_items ili on ili."orderItemId" = oi.id 
            inner join invoices i on i.id = ili."invoiceId"
            where 
            	i."postedDate" >= date_trunc('day', (now() at time zone 'Asia/Jakarta' - interval '1 day')):: timestamp
            	and i."postedDate" <= date_trunc('day', (now() at time zone 'Asia/Jakarta')):: timestamp
            	and oi."ownerType" = 'addOn'
    ) prev_addon on prev_addon.invoiceid = i.id
```

### Problems
1. Periode waktu tidak hanya hari, ada minggu dan bulan
2. Pengaplikasian join/subquery yang related dengan invoice sulit dilakukan, karena mesti ganti satu2
3. Perhitungan kalkulasi field lainnya pun juga sulit dilakukan etc

<br />

## Refactor it!
#### - WITH Statement (non recursive)
Using [`WITH`](https://learnsql.com/blog/what-is-with-clause-sql/) statement gunanya memungkinkan untuk memberi alias pada query dan menggunakannya di query lain, selain itu bisa digunakan untuk:
- Melakukan agregasi multi-level, misal menemukan rata-rata maksimum.
- Melakukan perhitungan yang sama berkali-kali dalam konteks kueri yang lebih besar.
- Menggunakannya sebagai alternatif untuk membuat tampilan di database, etc

```sql
with curr_product_item as (
 select 
    ili.subtotal, 
    ili.discount, 
    (ili.subtotal - ili.discount) as total, 
    i.id as invoiceid
  from 
    order_items oi 
    inner join invoice_line_items ili on ili."orderItemId" = oi.id 
    inner join invoices i on i.id = ili."invoiceId" 
    where 
    	i."postedDate" >= date_trunc('day', (now() at time zone 'Asia/Jakarta')):: timestamp
    	and i."postedDate" <= date_trunc('day', (now() at time zone 'Asia/Jakarta' + interval '1 day')):: timestamp
    	and oi."ownerType" = 'productItem'
), 
prev_product_item as (
 select 
    ili.subtotal, 
    ili.discount, 
    (ili.subtotal - ili.discount) as total, 
    i.id as invoiceid
  from 
    order_items oi 
    inner join invoice_line_items ili on ili."orderItemId" = oi.id 
    inner join invoices i on i.id = ili."invoiceId" 
    where 
    	i."postedDate" >= date_trunc('day', (now() at time zone 'Asia/Jakarta' - interval '1 day')):: timestamp
    	and i."postedDate" <= date_trunc('day', (now() at time zone 'Asia/Jakarta')):: timestamp
    	and oi."ownerType" = 'productItem'
 )
 ..
 left join curr_product_item on curr_product_item.invoiceid = i.id
 left join prev_product_item prev_product_item on prev_product_item.invoiceid = i.id
 --
 -- ...similar ways for addon
 ...
```

### Review
Saya rasa code diatas cukup membantu, 
- itu membuat code saya lebih mudah dibaca,
- tidak perlu define select column lagi di query lainnya

### Problems
Dari benefit diatas, kenyataannya problem saya yang saya jelaskan masih belum solve bagaimana periode waktu nya tidak hanya hari?, terus pengaplikasian query lainnya  gimana?

#### - WITH RECURSIVE Statement (recursive)
Faktanya susunan data / query dari sql ini isinya berupa struktur pohon dimana ada parent dan ada juga node, setiap node memiliki id uniknya sendiri. [WITH RECURSIVE](https://medium.com/swlh/recursion-in-sql-explained-graphically-679f6a0f143b) disebut juga Common Table Expression (CTE) cara kerjanya mirip WITH statement tapi bedanya bekerja secara rekursif untuk menghitung dirinya sendiri sampai perhitungan tersebut kembaliannya kosong.

```sql
with recursive curr_invoice as (
 select i.* from invoices i
  inner join (
     select o.id, o."orderType" from orders o
    ) o on o.id = i."orderId"
 where 
    i."postedDate" >= date_trunc('day', (now() at time zone 'Asia/Jakarta')):: timestamp
    and i."postedDate" <= date_trunc('day', (now() at time zone 'Asia/Jakarta' + interval '1 day')):: timestamp
 ),
 prev_invoice as (
 select i.* from invoices i
  inner join (
   select o.id, o."orderType" from orders o
  ) o on o.id = i."orderId"
 where 
    i."postedDate" >= date_trunc('day', (now() at time zone 'Asia/Jakarta' - interval '1 day')):: timestamp
    and i."postedDate" <= date_trunc('day', (now() at time zone 'Asia/Jakarta')):: timestamp
 ),
 curr_product_item as (
  select 
   ...
  from 
    ...
    inner join curr_invoice i on i.id = ili."invoiceId"
  where oi."ownerType" = 'productItem'
 ),
 prev_product_item as (
  select 
   ...
  from 
    ...
    inner join prev_invoice i_prev on i_prev.id = ili."invoiceId"
  where oi."ownerType" = 'productItem'
 ) 
 -- ...similar ways for addon
```

Gotcha! Happy now! lihat full code nya disini [894612659e5c610a45a39caa252c675e](https://gist.github.com/natserract/894612659e5c610a45a39caa252c675e)