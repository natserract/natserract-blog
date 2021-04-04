---
title: "Infix, prefix, postfix. Is it Matter?"
date: "2021-04-03"
author: "Alfin Surya"
excerpt: "Notasi penulisan ekspresi aritmatika"
coverImage: "https://i.ytimg.com/vi/V88BS4UN8qg/maxresdefault.jpg"
---

Ketika belajar bahasa pemrogaman, pastinya ada beberapa hal wajib yang tidak boleh dilewatkan, seperti memahami syntax, tipe data, operator, dll. Nah ditulisan kali ini saya akan menyinggung tentang operator.

[Operator](https://en.wikipedia.org/wiki/Operator_(computer_programming)) ini sebenarnya hanyalah sebuah simbol yang digunakan untuk melakukan operasi matematika atau logika tertentu. Jenis-jenis operator banyak, contohnya seperti: `(+)`, `(*)`, `(++)`. Faktanya bahwa kita tidak akan bisa lepas dari matematika di kehidupan, khususnya di bahasa pemrogaman yang matematis yaitu [functional programming](https://en.wikipedia.org/wiki/Functional_programming). Seperti yang dikatakan seorang blogger matematikawan:

> "After my involving myself in the subject, one thing that stands out is the relatively low distance between thought expressed in my ordinary day-to-day mathematical discourse, and thought expressed in Haskell code."

Sebagian besar saat kita menulis ekspresi matematika adalah seperti ini:
```hs 
λ> 2 + 3
```
Ini adalah cara umum yang digunakan baik di bahasa pemrogaman maupun di sekolah. Jika dilihat pada kode diatas posisi operator `(+)` berada ditengah [operand](https://www.duniailkom.com/pengertian-operand-operator-dan-urutan-operator-dalam-php/), ini sesuai dengan prinsip utama dari fp bahwa nilai suatu ekspresi hanya tergantung kepada nilai sub-ekspresinya.

## Infix
Infix pada dasarnya adalah hanya sebuah cara yang digunakan untuk menampilkan sebuah operasi, dimana posisi operator ditempatkan diantara operand, contohnya seperti ini:
```hs 
λ> 3 + 5 * 2
```
Jika diuraikan, operasi tersebut sebenarnya diartikan seperti **"Pertama kalikan 5 * 2, lalu tambahkan hasilnya dengan 3, maka hasilnya adalah 13"**. Disini mulai muncul beberapa pertanyaan, *mengapa operasi yang pertama kali di evaluasi adalah `(*)` dulu, bukan `(+)`? Bukannya harusnya hasilnya adalah `3+5=8*2=16`??*

Baik, jawabannya adalah karena semua operator tersebut memiliki **prioritas**-nya masing-masing, di table ini `9` adalah yang tertinggi. Ini saya ketahui ketika membaca [**fixity declarations**](https://www.haskell.org/onlinereport/decls.html#fixity) pada [haskell](https://www.haskell.org/).
```
+--------+----------------------+-----------------------+-------------------+
| Prec-  |   Left associative   |    Non-associative    | Right associative |
| edence |      operators       |       operators       |    operators      |
+--------+----------------------+-----------------------+-------------------+
| 9      | !!                   |                       | .                 |
| 8      |                      |                       | ^, ^^, **         |
| 7      | *, /, `div`,         |                       |                   |
|        | `mod`, `rem`, `quot` |                       |                   |
| 6      | +, -                 |                       |                   |
| 5      |                      |                       | :, ++             |
| 4      |                      | ==, /=, <, <=, >, >=, |                   |
|        |                      | `elem`, `notElem`     |                   |
| 3      |                      |                       | &&                |
| 2      |                      |                       | ||                |
| 1      | >>, >>=              |                       |                   |
| 0      |                      |                       | $, $!, `seq`      |
+--------+----------------------+-----------------------+-------------------+
```
Table diatas berkaitan pada urutan operasi mana yang akan di evaluasi duluan.

Setelah melihat bagaimana prioritas/preseden/precedence pada masing-masing operator diatas, kali ini casenya sedikit berbeda, yaitu dengan penambahan tanda kurung `( )`
```hs 
λ> (3 + 5) * 2
```
Jika operasi diatas diuraikan hasilnya seperti **"Pertama tambahkan 3 dan 5, lalu dikalikan 2, maka hasilnya adalah 16**. Pertanyaan muncul lagi, *bukannya `(*)` mempunyai prioritas 7 > 6 `(+)`??*

Baik, ini karena notasi infix mempunyai aturan dimana jika terdapat tanda kurung `( )` maka prioritas yang paling tinggi adalah `( )` yang bernilai [13](http://orc.csres.utexas.edu/documentation/html/refmanual/ref.syntax.precedence.html). Maka dari itu hasilnya 16. 

## Prefix (aka Polish)
Prefix atau dikenal sebagai "notasi polandia", dimana posisi operatornya ditulis sebelum operand nya. Ekspresinya seperti ini `/ * A + B C D`. Coba lihat kode dibawah ini:
```hs
λ> (+) 3 5 * 2
```
Pada operasi prefix evaluasi dilakukan dari **kiri ke kanan**, **berdasarkan dua nilai terdekat dari sebelah kanan**. Jika merujuk pada kode diatas, mempunyai arti **"Pertama tambahkan 3 dan 5, lalu kalikan 2, maka hasilnya adalah 16"**. Evaluasi pertama terjadi pada (3 + 5) karena dua angka ini saling berdekatan, baru dikalikan 2." 

Saya berikan case lain, contoh ekspresinya seperti ini `+ * 2 10 / 14 2 `. Evaluasi yang terjadi **"Pertama kalikan 2 dan 10, bagi 14 dengan 2, terakhir 20 + 7 = 27"**. 

Btw notasi prefix tidak mendukung tanda kurung `( )`, jadi tidak akan berpengaruh.

> Haskell has no prefix operators, with the exception of minus (-), which is both infix and prefix.]

## Postfix (aka !Polish)
Postfix disebut "notasi polandia terbalik", dimana posisi operator berada di akhir operand. Notasi ini digunakan beberapa bahasa pemrogaman lama seperti [Forth](https://www.forth.com/resources/forth-programming-language/) dan [Postscript](https://en.wikipedia.org/wiki/PostScript). Coba lihat kode dibawah ini:

```hs
λ> (!) :: Bool -> Bool
λ> (!) = not
λ> (True !)
```
Di haskell sendiri untuk mensupport postfix operators, kamu harus menggunakan [syntax extensions](https://ghc.readthedocs.io/en/8.0.1/glasgow_exts.html) pada [GHC](https://www.haskell.org/ghc/), Supaya ga kena omel sama compilernya 😀.

Iya, itulah 3 macam notasi yang digunakan dalam penulisan ekspresi. Meskipun prefer ke infix syntax karena lebih mudah dibaca, masing-masing punya maksud dan tujuan tersendiri. Tulisan ini penting bagi kamu terutama yang lagi belajar functional programming, dimana matematis terjadi dimana-mana. 

Tapi yang terpenting, semoga artikel ini bermanfaat, Thanks!

<!-- 
  - In: tengah
  - Pre: Awal
  - Post: Akhir
 -->
