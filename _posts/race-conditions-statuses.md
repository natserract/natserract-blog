---
title: "Dealing with Race Conditions Status"
date: "2022-08-27"
author: "Alfin Surya"
excerpt: "A critical race condition, problem and solutions. Race condition or race hazard is the condition of an electronics, software, or other system where the system's substantive behavior is dependent on the sequence or timing of other uncontrollable events."
---

Race condition merupakan sebuah **keadaan dimana terdapat dua atau lebih proses/variabel/state yang berjalan dan digunakan secara bersamaan**. Contohnya bisa lihat kutipan ini dari [quora](https://www.quora.com/What-is-meant-by-race-condition):

> Contoh sederhana dari race conditions adalah sakelar lampu. Di beberapa rumah ada beberapa sakelar lampu yang terhubung ke lampu langit-langit umum. Ketika jenis sirkuit ini digunakan, posisi sakelar menjadi tidak relevan. Jika lampu menyala, memindahkan salah satu sakelar dari posisinya saat ini akan mematikan lampu. Demikian pula, jika lampu mati, maka memindahkan salah satu sakelar dari posisinya saat ini akan menyalakan lampu. Dengan mengingat hal itu, bayangkan apa yang mungkin terjadi jika dua orang mencoba menyalakan lampu menggunakan dua sakelar berbeda pada waktu yang sama. Satu instruksi mungkin membatalkan yang lain atau dua tindakan mungkin membuat sirkuit terputus. 

Pada intinya ini berkaitan dengan proses [multithreading](https://totalview.io/blog/multithreading-multithreaded-applications) di suatu aplikasi, namun ditulisan kali ini kita tidak akan bahas multithread, melainkan case yang saya alami selama di pekerjaan saya.

Jadi case nya adalah, anggap saja disini ada sebuah state bisa kita sebut **external status**. Untuk menghasilkan external status, state tersebut harus dikalkulasi dengan state lainnya, yaitu **order status** dan **unit status**, kalau di rumuskan contohnya seperti ini: 

```hs
data OrderStatus = 
  | AWAITING_PAYMENT
  | PAID
  | ACTIVE
  | FULFILLED
  | CANCELED

data UnitStatus
  | TRANSIT_FOR_OUTBOUND
  | RENT_IN_PROGRESS
  | PREPARING_CLEANING

-- product    -- a value of this type is an `o` value AND a `u` value
data ExternalStatus o u = ExternalStatus o u 
-- ...
```

> Btw, code diatas merupakan dialect [haskell/purescript](https://jordanmartinez.github.io/purescript-jordans-reference-site/content/21-Hello-World/01-Prelude-ish/01-Basic-FP-Data-Types/01-Sum-and-Product-Types.html) walaupun nantinya kita akan pakai javascript untuk implementasinya. Saya suka mengaitkan pembahasan saya dengan teori di lingkungan bahasa tersebut karena referensi yang berkaitan dengan bahasa ini sangat lekat dengan teori, jadi tidak hanya sebatas implementasi, secara teori lingkup pengetahuan kita bisa lebih luas. (Ini alasan saya suka haskell hehe)

Biar lebih paham lagi dengan problemnya, bentuk tabelnya seperti ini:
```
+---------------------------+---------------------------+-----------------------+ 
|        Order Status       |         Unit Status       |    External Status    | 
+---------------------------+---------------------------+-----------------------+ 
|     Menunggu Pembayaran   |             -             |  Menunggu Pembayaran  | 
|   Sudah Dibayar & Aktif   |   Transit for Outbound    |    Pesanan Dikirim    | 
|           Aktif           |     Rent in Progress      |    Pesanan Aktif      | 
|       Selesai & Aktif     |    Preparing & Cleaning   |        Selesai        | 
|         Dibatalkan        |             -             |      Dibatalkan       | 
+--------+----------------------+---------------------+-------------------------+ 
```

## Let's do it!
Dari tabel diatas, kita bisa mulai implementasikan problem tersebut ke bentuk code dengan mudah menggunakan pernyataan `if else` atau `switch case` pada javascript:

```ts
if (orderStatus == "awaiting_payment") {
  // Menunggu Pembayaran
}  else if (
  (orderStatus == "paid" && unitStatuses.includes('transit_for_outbound_rent')) ||
  (orderStatus == "active" && unitStatuses.includes('transit_for_outbound_rent'))
) {
  // Pesanan Dikirim
} else if (
  (orderStatus == "active" && unitStatuses.includes('rent_in_progress'))
) {
  // Pesanan Aktif
} else if (
  (orderStatus == "fulfilled" && allMarkedBy('preparing_and_cleaning')) || 
  (orderStatus == "active" && allMarkedBy('preparing_and_cleaning'))
) {
  // Selesai
} else if (
  (orderStatus == "canceled")
) {
  // Dibatalkan
} 
...
```

Dari conditions diatas, kita bisa solve beberapa race conditions seperti pada status `paid` dan `active` dengan operator `&&` untuk kalkulasi unit status, kemudian operator `||` untuk handle multiple order status dan unit status. Cukup simple bukan?

## Problems
Setelah cukup senang mendapat task yg *terlihat easy, cukup if else if else*, ternyata disini ada beberapa problems:

Oke, kita bahas schema nya terlebih dahulu:
1. Sebuah order dengan status tertentu terdiri dari banyak items,
2. Dalam items tersebut, bisa terdiri dari banyak units
3. Units tersebut, mempunyai jenis status yang berbeda-beda

Masalahnya adalah, seandainya dalam satu order tersebut dengan status yang sama (contohnya: active), terdapat unit status yang berkaitan bersamaan dengan status order aktif juga (sorry saya aga susah ngejelasin, saya kasi example case nya deh):

- Order, Status: **Aktif**
  - Unit 1:
    - Status: **Transit for Outbound**
  - Unit 2 
    - Status: **Rent in Progress**
  - Unit 3
    - Status: **Preparing and Cleaning**

Kalau dilihat table nya lagi:

```
|   Sudah Dibayar & Aktif   |   Transit for Outbound    |    Pesanan Dikirim    | 
|           Aktif           |     Rent in Progress      |    Pesanan Aktif      | 
|       Selesai & Aktif     |    Preparing & Cleaning   |        Selesai        | 
```

Lihat? race condition yang terjadi terdapat *3 kondisi status order aktif* dengan unit status yang berbeda. Bagaimana cara validasi nya?

## Solutions
Dari masalah diatas, secara general konsepnya **jika semua sama, maka buatlah sesuatu yang berbeda** which means kita harus buat sesuatu yang **unik** untuk mem-validate nilai tersebut. Terus unik disini secara eksplisit itu apa dong?

Yap, *Thanks to tim product!* Strategy-nya kita bisa menggunakan yg namanya **`precedence (hak prioritas)`**, jadi setiap unit status tersebut mempunyai nilai sendiri berdasarkan prioritasnya:

```ts
// Highest: 1 - Lowest: 3
const Precedence = {
  'transit_for_outbound_rent': 1,
  'rent_in_progress': 2,
  'preparing_and_cleaning': 3,
}
```

Dari prioritas diatas, baru kita bisa mendapatkan nilai mana yang akan dihasilkan. Ini mirip seperti tabel fixity declarations yg saya bahas disini [infix prefix postfix notation](/post/infix-prefix-postfix-notation).

So, mari buat fungsi untuk mem-filter nilai prioritas tersebut:

```ts
// Asset ~ Unit
const getAssetStatus = (assets: AssetStatuses[]) => {
  // Highest: 1 - Lowest: 3
  const Precedence = {
    'transit_for_outbound_rent': 1,
    'rent_in_progress': 2,
    'preparing_and_cleaning': 3,
  }

  // Map asset statuses with precedence
  const mapAssetStatus = assets.flatMap(
    (status) => {
      return Object.entries(Precedence).filter(
        ([s, prec]) => {
          if (status == s) return { status, prec, }
          return
        }
      )
    }
  )

  // In this context, min is highest
  const maxPrec = Math.min(...mapAssetStatus.map(v => v[1]))

  return (Object
    .entries(Precedence)
    .map(([v, prec]) => prec == maxPrec && v)
    .find(v => v !== false))
}
```

Langkah selanjutnya, refactor condition sebelumnya dengan fungsi diatas:

```ts
else if (
  (orderStatus == "paid" && getAssetStatus(assetStatuses) == 'transit_for_outbound_rent') ||
  (orderStatus == "active" && getAssetStatus(assetStatuses) == 'transit_for_outbound_rent')
) {
  // Pesanan Dikirim
} else if (
  orderStatus == "active" &&
  getAssetStatus(assetStatuses) == 'rent_in_progress'
) {
  // Pesanan Aktif
}
...
```
> Semoga tim product happy ~ engineer happy -> customer happy!

## Optimization
Perlu optimisasi?, yap optimisasi perlu dilakukan, sebaiknya lakukan proses validate nilai tersebut di backend dengan logic yang sama. Karena *seandainya nanti ada tambahan atau perubahan di business logic, akan cukup sulit lagi2 dilakukan di frontend*. 

Jadi jika dilakukan di backend seharusnya itu bisa lebih mudah, bisa menggunakan [`WHERE` clause](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#applying-where-clauses) untuk filter query nya. **Sekian, Semoga bermanfaat. Thanks in advance!** 