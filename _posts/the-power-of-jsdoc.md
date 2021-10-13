---
title: "The Power of JSDoc"
date: "2020-12-23"
author: "Alfin Surya"
excerpt: "JSDoc itu adalah dokumentasi dari source code yang kita buat, bentuknya simple hanya berupa komen tpi penggunaannya sangat berguna nantinya. Contohnya ada pada"
---

Bagi para developer, kata `utility` tentunya sudah tak asing di dengar, hampir di setiap project, utility ini akan selalu dibuat. Utility biasanya isinya adalah **functions2**, atau **service**, yang sifatnya reusable atau istilahnya *'write once, use many times'*. 

Di tulisan kali ini kita tidak akan membuat utility, tpi lebih ke bagaimana mengembangkan utility yang kamu buat supaya lebih readable, dan bisa mudah digunakan oleh developer lain nantinya.

Tapi sebelum itu, ada beberapa pertanyaan, apa bener javascript itu `dynamic typing`?, coba perhatikan kode dibawah ini:

`index.js` 
![Screen Shot 2020-12-22 at 23.25.51.png](https://i.imgur.com/FzuxGFm.png) 

Dalam kode diatas, type tidak didefinisikan, tapi Javascript sudah secara otomatis mendeteksi type ketika value dibuat. Perhatikan lagi, ketika cursor di hover

![Screen Shot 2020-12-22 at 23.26.00.png](https://i.imgur.com/GDIWkrI.png) 

Dari sini kita tahu, bahwa Javascript itu [Dynamic Typing](https://developer.mozilla.org/en-US/docs/Glossary/Dynamic_typing) 

Sebelum ke maincase, bisa baca source ini dlu:
- [Difference arguments and parameters](https://www.quora.com/What-is-the-difference-between-argument-and-parameters-in-C)
- [JavaScript is Dynamic Typing](https://developer.mozilla.org/en-US/docs/Glossary/Dynamic_typing)


## Main case
Ketika membuat sebuah function, pastinya ada nama function, parameter(optional), dan return dari function tersebut, example: 

`index.js` 
![Screen Shot 2020-12-23 at 09.36.59.png](https://i.imgur.com/dsYbojg.png) 

Mungkin kalian sudah tau, maksud dari cara kerja function ini, ekspetasinya adalah return dari function ini harus mengembalikan nilai `true`, yang isi parameter `type`nya mempunyai masing-masing tipe data nya adalah `string`. 

Tapi problemnya, ketika function ini digunakan, apakah argumen yang dimasukkan di function `isShouldBeString()` selalu bertipe data `string`?  bisa jadi **tidak!**. 
Mengapa? karena type dari kedua parameter tersebut tidak di *define/definisikan*.

Jika menggunakan `TypeScript`, tentu masalah ini akan selesai sepersekian detik. Tpi bagaimana pengguna JavaScript menyelesaikan ini? *"Ya definisiin typenya masbro!"*


Jawabannya 70% hampir betul, definiisin typenya. Tapi tidak dengan [type definitions](https://www.typescriptlang.org/docs/handbook/basic-types.html), melainkan [JSDoc](https://jsdoc.app/). Bisa dibantu juga dengan [JSDoc eslint plugin](https://eslint.org/docs/rules/valid-jsdoc), tapi kali ini kita tidak menggunakan eslint.

What? Apa itu jsdoc?, singkatnya JSDoc itu adalah **dokumentasi dari source code** yang kita buat, bentuknya simple hanya berupa komen tpi penggunaannya sangat berguna nantinya. Contohnya ada pada kode dibawah ini:

![Screen Shot 2020-12-23 at 17.19.11.png](https://i.imgur.com/aDVKgy2.png) 

Perhatikan pada line 23 - 27, ada 3 tag, pada tag`@param`, fungsinya untuk membuat dokumentasi dari tipe data dari parameter function `isShouldBeString()`, kemudian tag `@returns` artinya apa returnnya, sedangkan tag `@example` adalah contoh penggunaan dari function tersebut. Selain 3 tag itu, kalian juga bisa menggunakan tag2 lain

Jika kita hover functionnya, maka hasilnya akan seperti ini:

![Screen Shot 2020-12-23 at 17.19.21.png](https://i.imgur.com/a20qUEw.png) 

Sangat mudah bukan?, disini sangat jelas terlihat bahwa function `isShouldBeString()` itu maksudnya untuk apa sih, cara penggunaan function ini yang tepat bagaimana, dll. Tentunya ini bisa membantu developer lain untuk bisa mudah mengerti utility yang kita buat.

So programming it's all about solving problem right? Maka dari itu, bisa mulai dari sekarang untuk disiplin dalam meng-kode. Thanks!