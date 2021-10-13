---
title: "Haskell: Type Systems. Spend Your Time with Haskell"
date: "2021-10-12"
author: "Alfin Surya"
excerpt: "Sebagai pengguna type system,  fitur ini memiliki beberapa keuntungan tersendiri selama proses development seperti menjaga konsistensi data, mengurangi runtime"
favorite: 'yes'
---

Sebagai pengguna type system,  fitur ini memiliki beberapa keuntungan tersendiri selama proses development seperti menjaga konsistensi data, mengurangi runtime errors, dll. Tidak bisa dipungkiri lagi, kebanyakan jenis bahasa pemrogaman yg adopt fitur ini rata-rata functional language, seperti: ML (Meta Language), OCaml, **Haskell**, etc. 

Dalam pembahasan Type System kali ini, [Haskell](haskell.org/) menjadi bahasa pilihan yang sangat baik untuk dipelajari menurut saya, karena banyak fitur-fitur unik di Haskell yang nantinya akan berguna buat kedepannya. 

Haskell sendiri merupakan **statically typed language**, dan memiliki sistem tipe yang kuat. 
- Strongly typed = programs cannot corrupt data by using it as incorrect type.
- Statically typed = types known and checked at compile time.

Selain itu Haskell juga termasuk **purely functional language**, dimana semua komputasi atau perhitungan dilakukan melalui [ekspresi](https://en.wikipedia.org/wiki/Expression_(computer_science)) untuk menghasilkan nilai. Dan semua nilai memiliki tipe termasuk fungsi dan pernyataan if. 

<!-- | -- Evaluasi, Ekspresi, ADT, Type Classes, -->

## Type Variables
Dalam mendeklarasikan suatu tipe pada variabel atau function di haskell, dimulai dengan menggunakan symbol `::`
```hs
hys :: Integer
hys = 250

-- It's allowed
cyl = 250
cyl :: Integer
```
Haskell tidak akan menyuruh [compilernya](https://www.haskell.org/ghc/) untuk ngomelin kamu, walaupun deklarasi tipe dilakukan setelah deklarasi variabel (*its allowed*). Haskell sendiri mempunyai sistem tipe bawaan atau primitive types, seperti: 
- Booleans => `Bool`, contoh: `True`, `False`.
- String => `String` / `[Char]`, contoh: "Example String"
- Integer => `Integer` / `Int`. contoh: 2, 3. 
  - Int: 
    - 32bit (min: -2147483648, max: 2147483647), 
    - 64bit (min: -9223372036854775808, max: 9223372036854775807)
  - Integer: Big Int / Big Num
- Lists => `[a]`, contoh: `[10..1000]`.

Selengkapnya bisa lihat disini [standard haskell types](https://www.haskell.org/onlinereport/haskell2010/haskellch6.html#x13-1170006.1).

## Type Inference
Selain **statically typed language**, haskell juga menggunakan **type inference** yang diambil dari dasar/teori [Hindley-Milner](https://en.wikipedia.org/wiki/Hindley%E2%80%93Milner_type_system) untuk menyediakan semantik tipe statis . Ini memungkinkan untuk **melakukan definisi variabel dan fungsi tanpa harus menentukan tipe-nya secara eksplisit**. Haskell secara otomatis tau apa tipe variabel dan fungsi tersebut.

```hs
-- c :: Integer
c = 3 + 5

-- f :: Num a => a -> a
f x = x * 2
```
> Tipe fungsi atau konstruktor fungsi ditulis sebagai (->) dan memiliki jenis * → * → * .

`c` adalah variable expression yang mengembalikan tipe data `Integer`. Sedangkan `f` merupakan **fungsi** yang mempunyai satu parameter yaitu `x`. 

## Type Signature (Type Annotation)
Type signature secara *global* merupakan sebuah tipe untuk **mendefinisikan tipe variabel dan fungsi**, salah satu kegunaannya untuk menghindari *ambigous type*. Disini saya bagi penulisan type signature menjadi beberapa bentuk:

- Type signature with <b>*argument*</b>:
 ```hs
-- tsArg:: Argument_0 -> Argument_1 as Return
tsArg :: Integer -> Integer
tsArg x = x * 10

-- tsArgWFn:: Argument_0 -> Argument_1 -> Argument_2 as Return
tsArgWFn :: Integer -> Integer -> Integer
tsArgWFn x y = x * y
```
Tipe argumen input pada fungsi `tsArg` adalah `x` dengan bentuk `Integer`, begitu juga dengan fungsi `tsArgWFn` mempunyai 2 tipe argumen input yaitu `x` dan `y`. 
> Argumen terakhir dari type signature adalah tipe fungsi.

- Type signature with <b>parenthesized</b>:
```hs
tsArgP :: Integer -> Integer -> Integer
tsArgP x y = x * y

tsArgPHave :: Integer -> (Integer -> Integer) -> Integer
tsArgPHave x fn = fn x * x

tsArgPHave2 :: (Integer -> Integer) -> Integer -> Integer
tsArgPHave2 fn x = fn x * x
```

Di haskell ini disebut aplikasi fungsi `τ1 → ( τ2 → ( τ3 → τ4 ))`. Sederhananya, aplikasi fungsi digunakan untuk **menerapkan argumen sebagai fungsi** kalau di JavaScript seperti *callback function*, dimulai dengan tanda kurung `()`.  

Tanda kurung berfungsi untuk mengelompokkan (grouping) bagian-bagian tipe ekspresi secara berbeda berdasarkan prioritas dan asosiatifitas operator. Seperti yang saya singgung di artikel [sebelumnya](infix-prefix-postfix-notation) setiap *operator* di haskell mempunyai **prioritas** dan sifat **assosiatif**.

Assosiatif di haskell mempunyai 3 sifat:
- Left assosiatif: `10 + 5 + 5 = <a0> + <a1> + <a2>`, pengurutan dari kiri ke kanan.
- Right assosiatif: `10 + (5 + 5) = <a0> + <a1>`, pengurutan dari kanan ke kiri. Tanda kurung `()` mempunyai prioritas lebih tinggi dari `+`.
- Dan Non assosiatif: `5 .|= 2 = <a0>`, perbandingan nilai.

> Menurut saya ini uniknya *fp*, kita diajak untuk berfikir kebalik dan membingungkan seperti rumus matematika. Maka dari itu saya anggap assosiatif ini seperti cara berfikir.

~ Mari kita uraikan:  

Sebuah tipe fungsi `tsArgP` memiliki bentuk tipe `Integer -> Integer -> Integer` , ini sebenernya setara dengan `Integer -> (Integer -> Integer)`. 

Symbol panah fungsi `->` ini secara default **berasosiasi ke kanan**. 
```hs
-- (1)
-- a0 -> a1 -> a2
tsArgP :: Integer -> Integer -> Integer
tsArgP x y = x * y

-- (2) it's same with (1)
-- a0 -> a1
tsArgP :: Integer -> (Integer -> Integer)
tsArgP x y = x * y
```
> `t1 -> (t2 -> t3)` setiap argumen yang dikelompokkan (grouping) dengan tanda kurung, itu dihitung satu argumen. Berbeda dengan `t1 -> t2 -> t3`.

- Tipe fungsi `tsArgP`(1), mempunyai **3 argumen** *x as a0* -> *y as a1* -> *x * y as a2*. 
- Tipe fungsi `tsArgP`(2), **2 argumen** *x as a0* -> *y as a1*

Read:
1. <b>*x as a0* sebagai argumen pertama</b> dari `tsArgP`, 
2. <b>*y as a1 (a1_A -> a1_B)* sebagai argumen kedua</b> dari `tsArgP`, 
    - `a1` mempunyai dua argumen `a1_A` dan `a1_B`
    - Bentuk kembalian dari `a1` adalah `a1_B`
    - So, last type signature nya adalah `a0 -> a1_B`
3. Jika semua sudah dievaluasi, maka result type signaturenya adalah `a1_B`. 

Fasenya (Type Indexes) seperti ini:

```hs
-- (Fase 0)
-- out:: Integer -> (Integer -> Integer) 
out = _tsArgP

-- (Fase 1)
-- out:: Integer -> Integer
out = _tsArgP 10

-- (Fase 2)
-- out:: Integer
out = _tsArgP 10 $ 5 + 5
```
Jadi urutan evaluasi berdasarkan **prioritas & assosiatif** yakni **(5 + 5) + 10**, bukan 10 + 5 + 5.  

~ Dibawah ini saya buat implementasi lain, dari dua bahasa yang berbeda:

Haskell Code:
```hs
count :: Int -> Int -> (Int -> Int -> Int) -> Int
count x y fn = fn x y

-- result :: Int
result = count 2 3 (\x y -> x * y) -- output: 6
```

TypeScript Code:
```ts
function count (x: number, y: number, fn: (a: number, b: number) => number): number {
  return fn(x, y)
}
      
count(2, 3, ((x: number, y: number) => x * y )) // output: 6
```
> `\x y -> x * y` merupakan lambda/anonymous function

## Polymorphic Type ∀ a. a -> (a, a)
