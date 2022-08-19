---
title: "Eager Techniques"
date: "2022-08-18"
author: "Alfin Surya"
excerpt: "Little bit know about eager & lazy"
---

Eager/Eager Loading/Eager evaluation, pernah dengar istilah ini? Yap, ini juga saya baru dengar ketika coba menjajal teknologi backend di kerjaan saat ini. Secara tidak sadar ternyata teknik ini telah banyak digunakan di sistem ORM semacam [active record](https://guides.rubyonrails.org/active_record_querying.html#eager-loading-associations), dan [sequelize](https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/).

Bahkan kalau pernah menggunakan Angular, code ini pasti terasa familiar:
```ts
@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ...
  ],
  declarations: [
    HomeComponent,
    ...
  ],
  schemas: [
    Schemas
    ...
  ],
  providers: [
    Resolver,
    ...
  ]
})
```
Code diatas termasuk salah satu implementasi eager loading/evaluation. 

## Theory
Eager ini mempunyai versi beberapa arti, tapi tetap merujuk satu hal. Dalam scope ORM, eager loading disebut **tindakan mengambil atau menggabungkan data dari beberapa model sekaligus, kalau istilah SQL nya disebut [JOIN](https://en.wikipedia.org/wiki/Join_(SQL))**. 

Kemudian dalam sumber lain yg lebih common disebut, eager loading adalah **proses load suatu module dengan mengimpornya ke module aplikasi root (seperti contoh diatas) lalu semua module/fitur akan dimuat sebelum aplikasi dimulai atau dirender**. 

> Darisini kita dapat mengambil beberapa kata kunci yaitu `menggabungkan`, `dimuat sebelum aplikasi dimulai`. 

Saya akan mengambil sudut pandang yang lebih dalam, kalau dipikir2 eager ini merupakan sebuah teknik **mengevaluasi sebuah **kumpulan ekspresi** dimana ekspresi2 tersebut disiapkan terlebih dahulu sebelum evaluasi itu dipanggil**.

## Lazy vs Eager

Setiap ada eager, tentu ada lazy (*setiap ada dia, belum tentu ada kamu*). Oke, lazy? mungkin salah satu yang terkenal menggunakan implementasi lazy yaitu [GHC Haskell](https://www.haskell.org/ghc/) ~ functional lazy language

[Lazy](https://natserract.vercel.app/post/haskell-match-laziness) sendiri merupakan sebuah mekanisme yang berlawanan dari Eager, dimana **sebuah ekspresi akan di evaluasi hanya jika dibutuhkan saja**. Saya berikan beberapa contoh:

```hs
Prelude> let fun x y = x

Prelude> fun 10 20
10

Prelude> fun 10 [1..]
10
```

- Dalam pemrogaman lazy, kedua parameter `x` dan `y` tidak required, artinya kalaupun kita taruh nilai pada argumen kedua `20` atau `1.. infinite` ini tidak akan dievaluasi,
- Berbeda dengan pemrogaman eager, kedua argumen tersebut required, dan keduanya akan dikalkulasi.

Sedikit melihat kebelakang, lazy ini layaknya seperti closures pada javascript 

```js
function lazy(x){
  return function(y) {
    return x
  }
}
```
Dalam beberapa case terkadang lazy lebih unggul, begitu juga sebaliknya. Terkadang pemrogaman lazy ini terasa sulit, karena susah untuk mendebug nya, jadi kadang harus dipaksa (eager) sedikit..

> Eit itu alasan klasik ya, mungkin sebaiknya baca sumber ini [eager haskell](http://csg.csail.mit.edu/pubs/haskell.html)


## Why eager matters?
N + 1 queries problem? masalah yang terjadi ketika kita memerlukan untuk load data child dari relasi parent-child dimana kita melakukan banyak query select pada child data.

```sql
-- Here’s how it usually goes down: You have two database tables with a parent/child relationship (like blogs and posts, or products and line items), and you want to iterate through all of them. So you do this:

SELECT id FROM Parent

-- and then executing a query for each record:

SELECT * FROM Child WHERE parent_id = ?
```

Eager merupakan konsep penting di sistem ORM, sekaligus cara ini membuat development terasa lebih mudah dan cepat (*i know ORM is magic*). Contohnya pada [sequelize](https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/) bagaimana eager loading dilakukan dengan mengabungkan beberapa model berdasarkan associations nya.

> Ditulisan ini saya hanya memberikan pandangan secara high level saja tidak menyeluruh, kalau lebih detail nya silahkan baca pada sumber link yang tertera diatas, mungkin suatu saat teknik ini bisa saya gunakan untuk buat bahasa pemrogaman misalnya, atau lib. Yaa begitu saja, selebih dan kurang nya, thanks in advance!

## Additional Reads:
- [https://self-learning-java-tutorial.blogspot.com/2016/04/haskell-lazy-vs-eager-evaluation.html](https://self-learning-java-tutorial.blogspot.com/2016/04/haskell-lazy-vs-eager-evaluation.html)
- [https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/](https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/)