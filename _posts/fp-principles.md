---
title: "Functional Programming Principles"
date: "2022-06-05"
excerpt: "Secara harfiah pemrogaman fungsional adalah metode membangun program yang mengutamakan/menekankan fungsi dan aplikasinya. Dalam implementasinya, pemrogaman fungsional menerapkan penggunaan data yang tidak berubah, murni, fungsi transparan referensial, dan fungsi tingkat tinggi"
coverImage: "https://withflint.com/static/images/blog/hiring-secret.jpeg"
---

Secara *harfiah* pemrogaman fungsional adalah metode membangun program yang **mengutamakan/menekankan fungsi dan aplikasinya**. Dalam implementasinya, pemrogaman fungsional menerapkan **[penggunaan data yang tidak berubah](https://en.wikipedia.org/wiki/Immutable_object)**, **[murni](https://en.wikipedia.org/wiki/Pure_function)**, **[fungsi transparan referensial](https://en.wikipedia.org/wiki/Referential_transparency)**, dan **[fungsi tingkat tinggi](https://en.wikipedia.org/wiki/Higher-order_function)**. Pemrogaman fungsional menggunakan notasi matematika sederhana yang memungkinkan sebuah masalah dijelaskan dengan jelas dan ringkas. 

```hs
-- Functions Composition
(f . g) x = f (g x)
```
Paradigma pemrogaman fungsional secara eksplisit dibuat untuk mendukung pendekatan fungsional murni. Pemrogaman fungsional [murni](https://en.wikipedia.org/wiki/Purely_functional_programming) memiliki karakteristik khusus salah satunya adalah *no assignment statements, so variables, once given a value, never change* artinya Anda tidak akan bisa mengubah nilai variabel secara bebas, semua bersifat murni, immutable dan no-side effect. 

## Imperative vs Functional

```js
const values = [undefined, 'a', 'b', 'c'];

// Cara imperative
let result1 = []
for (const element of values) {
  if (element !== undefined ) { 
    result1.push(element)
  }
}
result1 = result1.reverse()

// Cara fungsional
const result2 = values
	.filter(value => value !== undefined)
	.reverse()

// > Array ["c", "b", "a"]
// > Array ["c", "b", "a"]
```
Kedua cara tersebut valid, dan hasil yang diinginkan sesuai. Tapi Anda lihat? disana terlihat perbedaan yang cukup signifikan: 
 - Cara *fungsional* terlihat lebih ringkas, ekspresif dan mudah dipahami. Pendekatan yang dilakukan untuk mencapai tujuan yang diinginkan, dengan mengabungkan fungsi `filter` dan `reverse`. 

 - Cara *imperative* terlihat lebih banyak kode baris yang dibuat. Pendekatan yang dilakukan adalah dengan menjalankan langkah `push` dulu untuk mendapatkan nilai, lalu mengubahnya dengan `reverse`.


## Think Different(ly)
Mari kita coba berfikir lagi, pendekatan cara imperative kita dituntut untuk **menentukan apa saja langkah-langkah yang harus diambil** untuk mencapai tujuan yang diinginkan. Sebaliknya, pendekatan cara fungsional menyelesaikan masalah dengan **menggabungkan beberapa fungsi** untuk menghasilkan output yang sesuai.

Ini adalah salah satu prinsip utama pemrogaman fungsional, semua dilakukan dengan fungsi (khususnya fungsi murni), **potongan-potongan fungsi kecil dicombine menjadi sebuah satu set perintah** sehingga menjadi sebuah program. 

Ini beberapa kutipan dari [Uncle Martin’s](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882), mengenai fungsi:
1. Mereka harus kecil ... seperti, sangat kecil
2. Mereka harus melakukan tepat satu hal ([single responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)). 
3. Mereka harus memiliki argumen sesedikit mungkin ([rule of three](https://en.wikipedia.org/wiki/Rule_of_three_(writing)))
4. Mereka seharusnya tidak memiliki efek samping ([side effect](https://en.wikipedia.org/wiki/Side_effect_(computer_science)))
5. Mereka seharusnya tidak memiliki argumen flag yang membuat suatu fungsi memiliki dua jalur internal.

Inti mekanisme dari paradigma fungsional adalah:
> Suatu fungsi akan **mengubah input menjadi outputnya tanpa perlu mengubah/memodifikasi** tempat aslinya. Fungsi tersebut dibagi menjadi potongan kecil, dan nantinya dapat digunakan berulang kali ([composition](https://www.youtube.com/watch?t=8&v=vDe-4o8Uwl8&feature=youtu.be)). Fungsi sebagai warga kelas satu, dapat didefinisikan dimana saja, diteruskan sebagai argumen, dan dikembalikan sebagai nilai.

## Fungsi Murni, Side Effect, dan Immutability
Suatu fungsi dianggap murni, jika memenuhi dua syarat:
1. Ketika diberikan input yang sama, akan selalu menghasilkan output yang sama (deterministik)
2. Fungsi tersebut tidak memiliki **efek samping**, seperti mutasi variabel non-lokal, global,  argumen fungsi atau interaksi dengan aliran IO

```js
// Impure function
Math.random() // output: 0.2342508113103542 

// Pure function
const highpass = (cutoff, nilai) => nilai >= cutoff; 
highpass(5, 5) // output: true
```

Itu adalah contoh sederhana perbedaan fungsi murni dan tidak murni. Jika dilihat pada syarat diatas, fungsi murni menerima input yang sama maka akan menghasilkan output yang sama. Namun, fungsi `Math.random()` setiap kali dipanggil akan menghasilkan output yang selalu berbeda, ini berarti fungsi tersebut tidak murni (impure).

### Keuntungan dari fungsi murni

Alasan utama untuk menerapkan transformasi fungsional sebagai fungsi murni antara lain sebagai berikut:

- Mudah dipahami dan di-maintenance. Ini karena setiap fungsi dirancang untuk menyelesaikan tugas tertentu dan tidak bergantung pada status apa pun selain dari input.
- Program terdiri dari fungsi, dan dapat digunakan kembali ([DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)). Mekanisme ini membuat kode lebih mudah untuk direfactor ketika terjadi perubahan desain, ini lebih mudah untuk diterapkan.
- Pengujian dan debugging lebih mudah. Karena fungsi murni dapat lebih mudah diuji secara terpisah, dan dapat diprediksi.
- Menghasilkan lebih sedikit bugs

### Efek Samping (Side Effect)
Efek samping adalah ketika suatu fungsi bergantung pada sesuatu di luar parameternya untuk melakukan sesuatu, seperti memodifikasi variabel diluar fungsi, melakukan I/O atau memanggil fungsi lain dengan efek samping. Fungsi murni tidak akan menghasilkan efek samping, yang berarti **tidak dapat mengubah keadaan eksternal apa pun**:

```js
// Create a new person
const person = {
    name: "Joe",
    age: 23,
    address: "1234 Main St."
}

// With side effect
// Function to update the age the passed in person 
function updateAge1(person, newAge) {
    person.age = newAge; // <- side effect happens here
    return person;
}

// Without side effect
function updateAge2(person, newAge) {
    const localPerson = Object.assign({}, person);
    localPerson.age = newAge;
    return localPerson;
}
```
Code diatas, melakukan **transformasi nilai** dengan cara yang berbeda. Fungsi `updateAge1`, menyebabkan side effect, penyebabnya karena fungsi tersebut langsung melakukan **mutasi/modifikasi pada variabel argument fungsi** (`person.age`). Sedangkan fungsi `updateAge2` dimulai dari **menyalin/copy argument person** dengan [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), lalu memodifikasi propertynya dengan nilai baru `localPerson.age`. Ini tidak menyebabkan side effect, karena *tidak ada perubahan dari fungsi ke eksternal.*

### Mengapa peduli?
```js
var count = 99
doSomethingWith(count)

console.log(count)
```
Expect Anda hasil tersebut adalah `99`, meskipun itu bisa jadi benar. Tetapi apa yang terjadi di fungsi `doSomethingWith` sesuatu telah terjadi, bayangkan ketika program sudah mencapai tingkat kompleks dan ada 1 juta proses berjalan bersamaan. Lalu ada code/fungsi lain yang mengambil nilai `count` sebagai reference, kemudian salah satu proses membuat side effect terhadap nilai asli tersebut menjadi `100`,  apa yang diharapkan dari fungsi `doSomethingWith` menjadi tidak sesuai. Ini tidak seharusnya terjadi, karena fungsi yang Anda buat harusnya menghasilkan nilai yang tepat (sehingga itu akan menjadi bugs).

Ini bukan berarti melakukan side effect itu salah, karena side effect memainkan peran penting dalam desain dan analisis bahasa pemrograman. Namun, adanya efek samping juga menjadi penyebab terjadinya kesalahan program. Maka dari itu dengan adanya pemrogaman fungsional, bertujuan untuk mengurangi/meminimalisir side effect. Bahkan bahasa fungsional seperti [Haskell](https://www.haskell.org/), telah menghilangkan side effect dengan menggantinya dengan [Monad](https://wiki.haskell.org/All_About_Monads).

### Immutability
Dalam pemrogaman fungsional immutable adalah hal wajar. Kita bisa selalu dapat membuat variabel dan strukur data baru, tetapi **tidak diizinkan untuk mengubah nilainya**. Ini mirip seperti perbedaan `const` dan `let`:
```js
const lang = "JavaScript"
lang = "Elixir" // Nope

let newLang = "JavaScript"
newLang = "Elixir" // Ok

```

Jika Anda setuju dengan konsep ini, maka prinsip utamanya adalah, untuk melakukan perubahan suatu nilai **gunakan fungsi sebagai alat untuk transformasi nilai**. Dan setiap transformasi nilai tidak melakukan perubahan pada nilai asli, melainkan **meng-copy/menyalin nilai asli, menjadi salinan nilai baru**. Nilai aslinya tetap, tidak berubah, dan operasi Anda tidak akan memengaruhi kode lain yang memiliki referensi ke nilai yang asli itu.

## Manfaat Pemrogaman Fungsional
Program fungsional seringkali lebih ringkas dan lebih mudah dipahami daripada program *imperatif*. Dan ini meningkatkan produktivitas yang lebih tinggi untuk para programmer. Bahkan Erlang dari Ericson (sistem telekomunikasi besar),  telah meningkatkan produktivitas-nya 9 hingga 25 kali lebih besar.

> I recently used Erlang for a small statistical project, and while I've played with it before, using it in a real application is even better. It's like a wonderful mix of Haskell and Python, with a big chunk of Prolog thrown in just for fun. It DOES have certain parts that make you say "hunh, that's weird", but they are far outnumbered by the bits that make you stop for a second and go "...oooooo. Shiny." -- SimonHeath

Well, menerapkan paradigma ini bukanlah suatu kewajiban yang dilakukan oleh setiap pemrogam. Tetapi memahami konsep ini, membuat Anda mempunyai cara baru yang lebih jenius dan pengalaman berbeda ketika menulis program, dan tentunya beberapa keuntungan lainnya. 

> Kalau Anda ingin mempelajari lebih lanjut tentang pemrogaman fungsional Anda bisa mulai dengan [Elixir](https://elixir-lang.org/) ataupun [Haskell](https://www.haskell.org/).