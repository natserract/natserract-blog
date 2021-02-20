---
title: "Mutable/Immutable pada Javascript"
date: "2020-04-27"
author: "Alfin Surya"
excerpt: "Memahami mutable / immutable di javascript"
---

Hai semua! Welcome ya, semoga bisa banya memberikan kontribusi  di blog ini. Okey, di thread ini kita akan membahas apa si itu mutable/immutable pada JavaScript/TypeScript. 

Ketika online interview di salah satu perusahaan di Jakarta, saya mendapatkan beberapa pertanyaan fundamental mengenai javascript, salah satunya adalah pertanyaan ini, "Apa itu mutable dan immutable pada Javascript". Dari sini kita tahu kan bahwa hal-hal sepele seperti ini juga ternyata sangat penting kita pahami bebet bibit bobotnya bagaiamana. Maka dari itu pahami fundamentalnya terlebih dahulu, jangan loncat terlalu jauh ya, supaya lebih paham.

## Apa itu Mutability? atau Immutability?
Mutability dan immutability merupakan suatu konsep penting dalam dunia pemrograman. Mutability dan immutability pada dasarnya adalah sebuah objek dimana immutable objek adalah objek yang state/nilainya tidak dapat diubah, sedangkan mutable adalah sebaliknya, nilai/statenya dapat diubah.

Contohnya ketika ada sebuah string dengan valuenya "cat", jika kamu inisialize value tersebut immutable, maka ketika kamu mengubah/mengganti value "cat" menjadi "rat" itu tidak akan bisa, karena sifatnya yg immutable. Secara **default** di JavaScript semua variable yg dideklarasikan yg bukan constant bersifat `mutable`.

Dicase kali ini, kita akan menggunakan TypeScript sebagai bantuan agar lebih strong hehe ;)

## `let` vs `const` vs `var`
Ha, apa ini? let const var? Apa hubungannya dengan mutability dan immutability? Yap, tentunya kita sudah sering menggunakan ini ketika mendeklarasikan sebuah variable  `let`, `const` dan `var` tapi tak jarang kita missconception dengan ketiga variable ini.


### Sifat
Coba lihat kode berikut ini: 
```ts
let num1 = 2 + 3;
const num2 = 5 + 9;
var num3 = 30;

(function () {
    num1 = 32; // Ok
    num2 = 10; // Err
    num3 = 50; // Ok
})();
```

Di kode tersebut, terdapat 3 variable `num1`, `num2`, dan `num3`, dan di dalam scope anonymous function kita ingin mengubah nilai dari masing-masing variable tersebut, dan hasilnya kamu akan lihat pada saat compile time, dibagian `num2 = ..` muncul error seperti ini *`Cannot assign to 'num2' because it is a constant`*. 

Dari sana sudah jelas kan, bahwa variable constant `num2` nilainya **tidak dapat diubah** alias `immutable`, sedangkan yang lainnya seperti yang sudah dijelaskan diatas, bahwa secara default semua variable bersifat `mutable` alias bisa diubah.


### Scope
Coba lihat kode berikut ini: 
```ts
{
    let txt1 = "Text from javasript"; // local scope
    const txt2 = "Text from javasript"; // local scope
    var txt3 = "Text from javasript"; //global scope
}

txt1; //Err
txt2; // Err
txt3; // Ok
```
Berdasarkan scopenya `let` dan `const` adalah **local scope**, sedangkan `var` scopenya adalah **global scope**. Maka ketika kita ingin mengakses variable `txt1` dan `txt2` kita akan mendapati error, karena kedua variable tersebut berada di dalam anonymous scope. 

## String
Coba lihat kode berikut ini:

```ts
let val1 = "Value"
const val2 = "Value"

{
    val1 = "Value1" // Ok
    val2 = "Value2" // Err
}
```

Seperti yang dijelaskan sebelumnya, bahwa nilai constant tidak dapat diubah, jadi nilai dari `val2` tidak dapat diubah.

## Object
Coba lihat kode berikut ini:
```ts
type ArrayImmutable<T> = ReadonlyArray<T>;
type ArrayImmutableInline<T> = readonly T[]; 

let array_mut = [6, 7, 8, 9, 10];
let array_immutable: ArrayImmutableInline<number> = [1, 2, 3, 4, 5];
let array_immutable2: ArrayImmutable<number> = [11, 12, 13, 14, 15];

array_mut[0] = 2; //Ok
array_immutable[0] = 5; //Err:
array_immutable2[0] = 20; // Err
```

Di typescript sendiri kita bisa menggunakan `ReadonlyArray<T>` atau `readonly T[]` untuk membuat nilai/value array agar bersifat `immutable`. 

Nah, secara default type `readonly` ini hanya berlaku pada object saja, contohnya kita ingin membuat seperti ini `let txt readonly string = "value"`, maka yg terjadi adalah error karena `readonly` cuma bisa dipakai di object saja. 

Coba lihat kode berikut ini:
```ts
interface IObj {
    readonly[t: number]: number;
}

let obj: IObj = {
    0: 123,
    1: 456,
    2: 789
};

obj[1] = 654; // Err
```

Sekian dari saya, semoga bermanfaat ya. Kalo ada yang mau ditanyakan silahkan di komentar, atau pm langsung. Semangat! Don't give up!.