---
title: "Haskell: Type Systems. Zero Runtime Errors"
date: "2021-10-17"
author: "Alfin Surya"
excerpt: "Sebagai pengguna type system,  fitur ini memiliki beberapa keuntungan tersendiri selama proses development seperti menjaga konsistensi data, mengurangi runtime errors, dll. Tidak bisa dipungkiri lagi, kebanyakan jenis bahasa pemrogaman yg adopt fitur ini rata-rata functional language, seperti: ML (Meta Language), OCaml, Haskell, etc."
coverImage: "https://i1.wp.com/bestsellingcarsblog.com/wp-content/uploads/2019/07/Toyota-Kijang-Indonesia-1990.jpg?resize=600%2C400"
favorite: 'yes'
---

Sebagai pengguna type system,  fitur ini memiliki beberapa keuntungan tersendiri selama proses development seperti menjaga konsistensi data, mengurangi runtime errors, dll. Tidak bisa dipungkiri lagi, kebanyakan jenis bahasa pemrogaman yg adopt fitur ini rata-rata functional language, seperti: ML (Meta Language), OCaml, **Haskell**, etc. 

Dalam pembahasan Type System kali ini, [Haskell](haskell.org/) menjadi bahasa pilihan yang sangat baik untuk dipelajari menurut saya, karena banyak fitur-fitur unik di Haskell yang nantinya akan berguna buat kedepannya. 

Haskell sendiri merupakan **statically typed language**, dan memiliki sistem tipe yang kuat. 
- Strongly typed: programs cannot corrupt data by using it as incorrect type.
- Statically typed: types known and checked at compile time.

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
Type signature secara *global* merupakan sebuah tipe untuk **mendefinisikan tipe variabel dan fungsi**, salah satu kegunaannya untuk menghindari *ambigous type*. Disini saya bagi penulisan type signature menjadi beberapa bentuk: <sub>(*type signature lainnya ada di next section, ikutin saja alurnya*)</sub>

- Type signature with <b>*argument*</b>:
 ```hs
-- tsArg:: Argument_0 -> Argument_1 as Return
tsArg :: Integer -> Integer
tsArg x = x * 10

-- tsArgWFn:: Argument_0 -> Argument_1 -> Argument_2 as Return
tsArgWFn :: Integer -> Integer -> Integer
tsArgWFn x y = x * y
```
Tipe argumen input pada fungsi `tsArg` adalah `x` dengan bentuk `Integer`, begitu juga dengan fungsi `tsArgWFn` mempunyai **2 tipe argumen input** yaitu `x` dan `y`. 

- Type signature with <b>parenthesized (curried types)</b>:
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
- Dan Non assosiatif: `5 == 2 = <a0>`, perbandingan nilai.

> Menurut saya ini uniknya *fp*, kita diajak untuk berfikir kebalik dan membingungkan seperti rumus matematika. Maka dari itu saya anggap fp ini jelmaan [*tenet*](https://www.youtube.com/watch?v=LdOM0x0XDMo).

**~ Mari kita uraikan**:  

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
- Tipe fungsi `tsArgP`(2), **2 argumen** *x as a0* -> (*y as a1*)

**Read**:
1. <b>*x as a0* sebagai argumen pertama</b> dari `tsArgP`, 
2. <b>*y as a1 (a1_A -> a1_B)* sebagai argumen kedua</b> dari `tsArgP`, 
    - `a1` mempunyai dua argumen `a1_A` dan `a1_B`
    - Bentuk kembalian dari `a1` adalah `a1_B`
    - So, last type signature nya adalah `a0 -> a1_B`
3. Jika semua sudah dievaluasi, maka result type signaturenya adalah `a1_B`. 

Fasenya (*type Indexes*) seperti ini:

```hs
-- (Fase 0)
-- o:: Integer -> (Integer -> Integer) 
o = _tsArgP

-- (Fase 1)
-- o:: Integer -> Integer
o = _tsArgP 10

-- (Fase 2)
-- o:: Integer
o = _tsArgP 10 $ 5 + 5
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

## Monomorphic Type
Monomorphic mempunyai arti setiap value mempunyai **satu/single/unique type**. Ini dilakukan jika membutuhkan tipe yang lebih spesifik. Suatu nilai/operasi juga bisa dikatan monomorphic saat **tidak ada variabel/argumen tipe**.
```hs
f :: Integer -> Integer
```
Fungsi `f` hanya mempunyai single type yaitu `Integer -> Integer`, jadi jika didefine dengan type yang berbeda itu tidak akan bisa. Ini juga sudah kita lakukan di cara-cara sebelumnya diatas.

> Monomorphic: good for type-checking, bad for writing generic code

## Polymorphic Type

Sedangkan **polimorfisme** mempunyai arti *banyak bentuk*, didalam type system sendiri polimorfisme juga disebut kemampuan **suatu argument yang memiliki tipe yang berbeda-beda**. Dengan adanya ini, sistem tipe menjadi lebih fleksibel.

1. **[Parametic Polymorphism](https://en.wikipedia.org/wiki/Parametric_polymorphism)** adalah fitur yang memungkinkan kita untuk mengabstraksi tipe dari suatu nilai, dengan **tipe yang berbeda-beda**. Sederhananya, operasi yang dapat menerima argumen secara **generic**.
    ```hs
    f :: forall a. ([a] -> [a])  -- same with: [a] -> [a]

    -- It's all allowed
    f [True, False, True] -- [Bool]
    f [3.2, 4, 10] -- [Double]
    f [1..100] -- [Integer]
    ```
    Haskell membolehkan cara ini, fungsi `f` dengan *value type* yang berbeda-beda. Ini terjadi karena `forall a.` tidak ditentukan secara spesifik typenya alias `universal`. 

    Jika familiar dengan TypeScript, ini terasa seperti `Generic Type`:
    ```ts 
    function loggingIdentity<Type>(arg: Type[]): Type[]
    ```

2. **[Ad hoc polymorphism](https://en.wikipedia.org/wiki/Ad_hoc_polymorphism)** ini cukup membingungkan dari yang saya baca, karena antara polymorphism dan overloading saling [berkaitan](https://stackoverflow.com/questions/22887349/difference-between-polymorphism-and-overloading). 
    
    Cuman saya ambil kesimpulan(*in haskell perspective*):
    - **Ad hoc polymorphism**: Operasi yang menerima argumen dengan [kelas tipe](https://en.wikibooks.org/wiki/Haskell/Classes_and_types), baik jumlah jenisnya satu atau lebih, sama ataupun berbeda.
    - **Overloading**: Jenis polimorfisme suatu method/fungsi, yang dilakukan di dalam [type classes](https://en.wikibooks.org/wiki/Haskell/Classes_and_types). Compiler tidak akan meng-izinkan Anda melakukan ini:
      ```hs
      -- Compiler: Duplicate type signature fn
      fn :: String -> [String]  -- Ok
      fn :: Char -> String -> [String] -- No
      fn :: Int -> Int -> Int -- No
      ```
      > Di section selanjutnya, baru kita akan bahas mengenai **type classes**.

    Mari kita fokus di **ad hoc polymorphism**, seperti yang saya bilang sebelumnya ini dapat menerima *kelas tipe* yang berbeda-beda, jika mempunyai satu/lebih kelas tipe ini bisa dikatakan [**overloaded**](https://mail.haskell.org/pipermail/beginners/2010-December/006057.html) (*dalam konteks ad hoc not a function*).
    ```hs
    -- No instance for (Num t) arising from a use of ‘*’
    count:: forall a. a -> a -> a
    count x y = x * y -- Nope (just simple case)
    ```

    Ini terjadi karena, operator `*` merupakan bagian dari kelas tipe [`Num`](https://hackage.haskell.org/package/base-4.14.1.0/docs/src/GHC.Num.html#Num). So, compiler cukup pintar dengan memberikan solusi ini `Possible fix: add (Num a) to the context of the type signature for count :: forall a. a -> a -> a`.

    Maka dari itu bisa menggunakan **kelas tipe** ke dalam argument type `count`:
    ```hs
    -- Prev version: a -> a -> a
    count :: forall a. (Num a => a) -> (Num a => a) -> Num a => a 
    count x y = x * y -- Ok
    -- 10 `count` 25
    ```
    Jika dilihat dari jenisnya type `count` menerima satu kelas tipe yaitu `Num`, ini juga disebut **ad hoc polymorphism** (pendefinisian argument type dengan kelas tipe). Bentuk tipe dari operator `*` adalah `forall a. Num a => a -> a -> a`, artinya `*` turunan dari `Num`.

    Untuk implementasi lainnya seperti ini:
    ```hs
    (~/) :: forall x y. Eq x => x -> Eq x => x -> Maybe Bool
    a0 ~/ a1 = 
        if (==) a0 a1
          then Just True
          else Nothing
    ```
    Bentukan dari `Eq` adalah `* -> Constraint`.
    > Lihat standard type classes Haskell lainnya [disini](https://www.haskell.org/tutorial/stdclasses.html).

## Type Kinds

Umumnya muncul dengan symbol `*`, ini berkaitan dengan informasi tentang apa **yang diperlukan dalam parameter tipe** untuk membuat instance tipe. Saya bagi menjadi 3 bagian (*coba hover typenya*): 

<!-- Ini bukan suatu tipe, melainkan *istilah dalam ilmu komputer* yang digunakan sebagai penamaan **jumlah argumen** atau operan yang diambil dari suatu operasi. -->
- **Constraints**: `* -> Constraint`, ini juga disebut **class constraint** artinya merujuk pada [type classes](https://en.wikibooks.org/wiki/Haskell/Classes_and_types), penggunaannya dimulai dengan tanda kiri panah `=>`, seperti contoh diatas.
- **Multiple parametric**: `* -> *`, merujuk pada standard type haskell yang mempunyai argumen tipe bisa 2 atau lebih, seperti: `Maybe`, `Either`, dll.
- **Single**: `*`, merujuk pada standard type haskell, seperti: `String`, `Bool`, dll.

Point yang saya maksud disini berkaitan dengan cara penggunaan type di Haskell, karena haskell sendiri mempunyai jenis tipe yang berbeda-beda, seperti type classes, standard type, dll.

## Type Constructor
Haskel mempunyai aturan, setiap huruf yang dimulai dengan huruf besar itu disebut **konstruktor**, ini digunakan dalam penulisan tipe. Jenis-jenis type constructor:

1. **Deklarasi `type`**: syntatic sugar untuk type synonym/alias,
    ```hs
    type Person = Int
    type Make a = a
    ```
    Contoh diatas, `Person`, dan `Make` semuanya adalah type constructor. Menggunakan ini dapat membuat kode lebih terdokumentasi.

2. **Deklarasi `newtype`**: berlaku hanya 1 constructor, 
    ```hs
    newtype Primitive t = Primitive t
    ```
    `Primitive` adalah constructor. Allow for (*deriving*, *record*,  *instance*), strictly, terbatas

3. **Deklarasi `data`**: membuat type baru,
    ```hs
    data Color = Red | Blue
    ```
    `Color` adalah constructor, sedangkan `Red | Blue` merupakan constructor data. Nanti akan dibahas di section selanjutnya. Allow for (multiple constructor, instance, recursive, etc), non-strictly, luas, dan lain-lain.

## Type Classes 

Saya pikir, ini adalah salah satu fitur favorit di Haskell, dimana kita bisa dengan bebas melakukan *polimorfik suatu fungsi* melalui *class*. Di bahasa pemrogaman lain seperti [javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes?retiredLocale=id), class merupakan sebuah **object**, sedangkan di haskell ini digunakan **untuk penulisan tipe**. Type classes ini juga bisa disebut **module yang mempunyai struktur tipe dari suatu method/fungsi**.
> Haskell sendiri mempunyai [standard type classes](https://www.haskell.org/tutorial/stdclasses.html) bawaan.
```hs
-- TypeOf:: * -> Constraint
class TypeOf a where
  typeOf :: a -> String
```
Deklarasi kelas tipe `TypeOf` diatas menerima tipe argumen `a` dan terdapat method/operasi `typeOf`. Fungsi ini mempunyai tipe argumen `a` yang diikat/diambil dari tipe argumen `a` dari kelas `TypeOf` dan mengembalikan tipe `String`, ini artinya argumen tipe fungsi dengan argumen kelas tipe saling berkaitan dan bertindak secara **polymorphism**.

![type class strcture](https://drek4537l1klr.cloudfront.net/kurt/Figures/13fig01_alt.jpg)
<br />

Yang harus diingat disini bahwa, tipe fungsi `typeOf` yang berada dalam `class` itu hanya mendefinisikan **bentukan penulisan tipe** nya saja atau **pengelompokan**, sedangkan untuk menambahkan jenis tipe yang berbeda didefiniskan menggunakan `instance`.

```hs
instance TypeOf Bool where
  typeOf _ = "Bool"

instance TypeOf [Char] where
  typeOf _ = "Char"
``` 

ini artinya instance (jenis tipe) yang berlaku pada kelas tipe `TypeOf` hanya `[Char]` dan `Bool`.
> The **type class function** is not defined for all types, but only for some types, and those definitions are **described by type class instances**.

```hs
f = typeOf True
f = typeOf "Hello!"
f = typeOf () -- No instance for (TypeOf ())
```
Solusi dari permasalah tersebut, dengan menambahkan `instance TypeOf () ...`. *Instance* disini mirip seperti `implements` Clauses pada [TypeScript](https://www.typescriptlang.org/docs/handbook/2/classes.html#implements-clauses).

~ **Make our own type classes (step-by-step)**

Untuk lebih mendalami, mari coba implementasi operasi lain (*cara diatas hanya contoh*):
```hs
class Compare a
```
```hs
fn :: Compare a => a -> a -> Bool
fn a b = True  
```
Diawal pada kelas tipe `Compare`, tidak ada fungsi tipe yang di define. Implementasi **penggunaan dari kelas tipe** nya seperti diatas. Casenya adalah membuat sebuah *method/fungsi perbandingan untuk 2 nilai* dengan return type `Bool`. Kita coba ubah,
```hs
class Compare a where
  (=/=) :: a -> a -> Bool
```
Faktanya, kelas tipe `Compare` diatas termasuk **kelas tipe terbuka**, yang artinya instance tidak boleh mengubah hasilnya jika nanti menambahkan instance baru untuk kelas tersebut. Itu tidak bisa dilakukan seperti ini:
```hs
{-
  It's allowed:
  instance Compare a

  instance {-# INCOHERENT #-} Compare Int where ...
--}

instance Compare Int where
  (=/=) a b = a == b

-- Ambiguous type variable ‘a0’ arising from a use of ‘//’ 
-- prevents the constraint ‘(Compare a0)’ from being solved.
fn = (=/=) 4 2
```
Lihat, muncul error `Ambiguous` seperti diatas. Itu menyatakan bahwa compiler tidak mengetahui tipe apa yang harus dipilih untuk menyelesaikan batasan kelas tipe `Compare` alias **ambigu**. Untuk itu, ubah tipe `Int` jadi argumen `a` (*ingat penggunaan kelas tipe diatas*),

```hs
-- No instance for (Eq a) arising from a use of ‘==’
-- Possible fix: add (Eq a) to the context of the instance declaration
instance Compare a where
  (=/=) a b = a == b
```
Jika mengacu pada error diatas itu terjadi karena disana terdapat operasi perbandingan `a == b`, yang merupakan turunan dari kelas tipe `Eq`. Compiler memberi info untuk menambahkan kelas turunan `Eq` ke instance `Compare`
```hs
-- The constraint ‘Eq a’
-- is no smaller than the instance head ‘Compare a’
instance Eq a => Compare a where ...
```
Permasalahan diatas, karena compiler haskell mempunyai beberapa aturan, bahwa inferensi tipe di GHC mengharuskan konstruktor dan variabel lebih sedikit daripada kepala. Ini adalah bagian dari apa yang disebut [instance terminal rules](https://ghc.gitlab.haskell.org/ghc/doc/users_guide/exts/instances.html#instance-termination-rules). 

Saya coba implementasi, salah satu yang dimaksud disini adalah [arity](https://en.wikipedia.org/wiki/Arity) pada konstruktor kelas tipe tersebut **(*bagian kanan harus lebih besar*)**. Oleh karena itu compiler memberi informasi untuk menggunakan `{-# LANGUAGE UndecidableInstances #-}` untuk allow operasi ini. 

Syntax tersebut disebut [language pragmas](https://wiki.haskell.org/Language_Pragmas) di haskell, digunakan untuk memberi tahu compiler supaya mengaktifkan **ekstensi atau modifikasi language**. Pragma ini dipasang dibagian header/atas module, saya pikir ini seperti [attributes](https://doc.rust-lang.org/reference/attributes.html) di Rust.

```hs
* -> Constraint => * -> * -> Constraint
```  

```hs
-- Final code:
class Compare a where
  (=/=) :: a -> a -> Bool

instance (Eq a) => Compare a where
  (=/=) a b
    | a == b = True
    | otherwise = False

class Compare a => Order a where
  (/=>) :: a -> a -> Bool

instance (Ord a) => Order a where
    (/=>) a b
      | a > b = True
      | otherwise = False

-- f :: Bool
f = (/=>) 5 2
```
Kita juga bisa memperluas kelas tipe `Compare` dengan membuat *subclass* baru, seperti ini:
```hs
class Compare a => Order a where
  (/=>) :: a -> a -> Bool
```
Ini artinya kelas tipe `Compare` merupakan super kelas dari `Order`.


## Type Synonym (syntactic sugar)
Tipe sinonim memungkinkan pengguna untuk mendefinisikan singkatan untuk merujuk ke jenis lain. Ini bukan membuat data baru, melainkan hanya **sinonim/alternatif/aliasing** dari tipe lainnya. 

Tujuan adanya fitur ini, lagi-lagi tentang fleksibilitas, pengguna bisa dengan memperluas tipenya dengan identitasnya masing-masing. Beberapa keuntungan lainnya agar code lebih mudah dibaca (*tentunya dengan penamaan yg benar*), dirancang, diperluas, reusable, etc.

**Type synonym *parametric* and do *generic***:
```hs
type ReadT a =  String -> [(a,String)]
```
`ReadT` merupakan **constructor** dengan parameter `a`, menghasilkan *return type* `tupple list`. 

**Type synonym *adhoc polymorphism***:
```hs
type CompareT = forall a b. (Ord a) => (Num a) => (a, b) -> Bool
```

## Type Synonym Families (associated types)
Di Haskell, didalam kelas tipe kita juga bisa **mengasosiasikan satu set metode tipe dengan tipe *local***, ini disebut [type families](https://wiki.haskell.org/GHC/Type_families). Untuk menggunakan fitur ini kita harus mengaktifkan ekstensi  [{-# LANGUAGE TypeFamilies #-}](https://wiki.haskell.org/GHC/).

```hs
class Collects a where
  type Elem a  -- associated type synonym
  insertS :: Elem a -> a

instance (Collects a) => Collects [a] where
  type Elem [a] = a -- You can change any different type
  insertS = insertS

instance (Collects Int) => Collects Int where
  type Elem Int = String
  insertS = insertS

-- This requires @TypeApplications@
f = insertS @[Int] -- f :: Int -> [Int]
f = insertS @Int -- -- f :: String -> Int
```
Kelas `Collects` mempunyai tipe keluarga `Elem` dengan argumen tipe yang diambil dari kelas tipe `a`. Melalui *associated type synonym* ini, argumen tipe pada method `insertS` bergantung pada tipe keluarga `(type Elem [a] = a)`. 

Ini artinya untuk membuat jenis tipe baru pada method `insertS` tidak perlu **mengubah/menambahkan argumen kelas tipe**. Secara tidak langsung, tipe keluarga diatas otomatis memperluas fungsionalitas kelas tipe.
 ```hs
  class Collects a b where
```
> *You don't need add more argument type `b` like that for change argument type `a0` from method `insertS`. Just change type Elem {head} = {newType}. That's my point...*


Disini ada Beberapa rules: `type indexes must match class instance head`:
```hs
instance (Collects a) => Collects {...} where -- head
    type Elem {...} = [String]
```
Bagian {...} ini, harus mempunyai **tipe yang sama**.
> Another source say: the use of "associated types" **improves the overall readability of code** by moving inner types locally into a <strike>trait</strike> as output types ~ [(doc.rust-lang.org)](https://doc.rust-lang.org/rust-by-example/generics/assoc_items/types.html).


## Algebraic Data Types (ADTs)
Tipe data aljabar kenapa dinamai aljabar, karena ini memang mengambil konsep aljabar dari matematika. Coba kita lihat dulu dalam perspective math mengenai aljabar:

> Aljabar (Algebra) merupakan salah satu cabang dalam ilmu matematika yang sangat luas cakupannya, sedangkan aljabar itu sendiri diartikan sebagai cabang ilmu dalam matematika yang mempelajari **simbol matematika dan aturan aturan yang digunakan untuk memanipulasi simbol tersebut**.

Tipe data aljabar terdiri dari beberapa terminologi/konsep:

**Sums & Product Notation Table:**
```sh
# Source: http://dev.stephendiehl.com/fun/009_datatypes.html
+------------+----------------+
|   Notasi   |  Haskell Type  |
+------------+----------------+
| a * b      | (a,b)          |
| a + b      | Either a b     |
| Inl        | Left           |
| Inr        | Right          |
| Empty      | Void           |
| Unit       | ()             |
+------------+----------------+
```
Untuk konsep, laws dan lainnya bisa lihat beberapa source ini [1](http://dev.stephendiehl.com/fun/009_datatypes.html), [2](https://gist.github.com/tkersey/51b9507ed8cbc5ed8a7d800354cbf17a), dan [3](https://medium.com/@StevenLeiva1/haskell-book-chapter-11-algebraic-data-types-c83ab083c45a) karena **ADTs* ini cukup luas, jadi saya belum bisa menjelaskan banyak *base on my case saja*.

Saya pikir, ADTs ini mirip seperti persamaan aljabar, misalnya dalam penggunaan seperti ini:
```hs
-- Basic ADTs
data Color = Red | Blue

operation1 :: Color -> IO ()
operation1 c = case c of
  Red -> print "red"
  Blue -> print "blue"

operation2 =  Red

-- Nope
operation3 =  Red /= Blue -- No instance for (Eq Color) arising from a use of ‘/=’
```
Digunakan dalam pencocokan pola, `Red` mewakilkan output `"red"`, `Blue` mewakilkan output `"blue"`. Itu seperti `enum` types atau bahkan `union`, tapi membuat tipe data baru.

Kemudian pada `operation3`, compiler menyatakan error. Itu terjadi seperti case sebelumnya, bahwa operasi `/=` merupakan turunan dari tipe kelas `Eq`. So, solusinya adalah dengan menerapkan instance `Eq` ke `Color` menggunakan `deriving`

```hs
data Color = Red | Blue deriving (Eq)
```
Deriving merupakan mekanisme yang secara otomatis **menghasilkan instance kelas tipe untuk tipe data**. Tujuannya seperti pada case diatas, agar dapat menggunakan fungsi/method yang berada di dalam `Eq`, begitu juga tipe kelas lainnya.

Selain di `data` type, `deriving` ini juga bisa digunakan di `newtype`, `instance`.

> Pada bagian ini, jika ingin **mendalami** dan ingin tau **bagaimana ADTs bekerja**, lihat beberapa source yang saya cantumkan diatas.

## Record Type
Tipe data record, atau object sejauh ini yang saya lihat didefinisikan di `data` type, karena `newtype` tidak bisa membuat field objectnya lebih dari 1, lihat pesan error dibawah
```hs
-- Nope, The constructor of a newtype must have exactly one field
newtype State = State { a:: Int, b ::Int}

data Field r = Field { idx :: Int
  , names :: String
  , phone :: r
} deriving (Show)
```
Disini saya mempunyai beberapa pertanyaan. Seperti yang saya lakukan di TypeScript, bagaimana jika saya menambahkan *index properti* tambahan seperti ini:
```ts
interface Config {
    ...
    [x: string]: any;
}
```
Sejauh ini saya pikir, *(kemungkinan)* bisa dengan menggunakan package bawaan haskell [`Data.Dynamic`](https://hackage.haskell.org/package/base-4.15.0.0/docs/Data-Dynamic.html) atau tuple list. *Mungkin teman2 lain ada referensi/masukan..??*

## Overloading Families
Di pembahasan section sebelumnya, kita sudah bahas overloading dengan type synonym families yang di deklarasikan di tipe kelas. Tapi mari kita coba deklarasi di tingkat atas:

```hs
-- open type families
type family G a :: * -- defined outside
type instance G Int = Bool 
type instance G String = Char

-- closed type families
type family G a where -- defined inside using `where` clause
  G Int = Bool
  G String = Char
```
Dari kedua family diatas, terdapat dua perbedaan. Dalam [dokumentasi](https://downloads.haskell.org/~ghc/7.8.4/docs/html/users_guide/type-families.html) nya type families dapat didefinisikan dengan 3 cara:
- **Open type families**: di definisikan di tingkat atas
- **Closed type families**: di definisikan di tingkat atas melalui klausa `where`
- **Type Classes**: di definisikan didalam kelas tipe

> Untuk menggunakan *type families* gunakan ekstensi `{-# LANGUAGE TypeFamilies #-}`

Mengenai code diatas, itu seperti [conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) di TypeScript `T extends U ? X : Y`. Artinya, jika argument inputan `a` adalah `Int` maka hasilnya `Int -> Bool`, dan seterusnya.

Disini kita juga bisa menggunakan deklarasi `data` untuk family:
```hs
data family A t
data instance A Int = NumberT
data instance A String = StringT

f :: A Int
f = NumberT
```
*Kedua contoh mempunyai mekanisme kerja yang sama*.

**Yang Harus Diingat Tentang Type Families**:
  -  Keluarga data membuat **tipe baru**, setiap instance dari `data` family mendeklarasikan **konstruktor baru**.
  -  Keluarga tipe hanya dapat merujuk ke **tipe yang lain**.

## Functional Dependencies (aka fundeps)
Fundeps merupakan ekstensi bahasa, ini pertama kali diperkenalkan dalam makalah [Type Classes with Functional Dependencies](https://web.cecs.pdx.edu/~mpj/pubs/fundeps-esop2000.pdf) oleh Mark P. Jones pada Maret 2000. Seperti yang dokumentasi katakan, functional dependencies digunakan untuk **membatasi parameter kelas tipe**. Lebih jelasnya saat menggunakan kelas tipe **multiparameter**
```hs
class Result a b c where
  single :: a -> b -- The type variable ‘c0’ is ambiguous
  listsM :: a -> b -> [c]

instance ...
```
Kelas tipe `Result` mempunyai 3 variabel tipe, `a b c`. Kelas tipe mempunyai aturan bahwa **setiap variabel tipe pada kelas tipe** itu harus diikat(digunakan) oleh setiap method/operasi-nya. Error tersebut muncul, karena pada method `single` tidak menggunakan varibel tipe `c`, ini menyebabkan *ambigous*. Coba kita tambahkan fundeps:

```hs
class Result a b c | a b -> c where
  single :: a -> b
  listsM :: a -> b -> [c]
```
Kelas tipe diatas mempunyai `a b -> c` yang merupakan functional dependency (fundeps), ini artinya parameter `c` ditentukan secara **unik** dari `a` dan `b`. Saya pikir, ini bisa diartikan seperti layaknya `required` dan `optional` types tapi untuk parameter tipe kelas. Anggap saja `a` dan `b` required, sedangkan setelahnya `-> ...` adalah optional.

> Fundeps tidak hanya mengatasi masalah itu saja, untuk lihat case lainnya bisa lihat [wiki](https://wiki.haskell.org/Functional_dependencies).

## Conclusion
Tulisan ini adalah hasil pembelajaran saya menggunakan haskell. Tentu dengan keterbatasan waktu dan ilmu, pembahasan diatas hanyalah sebagian kecil dari pembahasan type systems haskell seluruhnya, bahkan butuh saran/kritik untuk kedepannya. Selain memberi manfaat bagi pembaca, ini juga berfungsi sebagai catatan saya dikemudian hari. 

Haskell sendiri adalah bahasa yang sangat baik untuk dipelajari, dengan memahami type system bekerja, akan bermanfaat bagi seorang programmer/dev untuk menulis kode yang lebih baik di masa depan. Mungkin diawal-awal belajar haskell cukup rumit, karena banyak istilah, operator, dan konsep-konsep lain ditemui di bahasa pemrogaman ini, tapi dengan cara itu kita nanti akan paham secara mendetail *apa dan bagaimananya suatu proses*, layaknya belajar *computer science*. Ini cocok buat kamu yang suka *research* atau suka dengan solusi *one liner* -,-.

Okay, segitu aja dulu. **Thanks in advance!**

## Referensi terkait:
- [https://kowainik.github.io/posts/deriving](https://kowainik.github.io/posts/deriving)
- [https://gist.github.com/phadej/cae76444548b9cffa10d9675e013847b](https://gist.github.com/phadej/cae76444548b9cffa10d9675e013847b)
- [http://sleepomeno.github.io/blog/2014/02/12/Explaining-Haskell-RankNTypes-for-all/](http://sleepomeno.github.io/blog/2014/02/12/Explaining-Haskell-RankNTypes-for-all/)
- [http://scg.unibe.ch/download/lectures/pl/PL-04TypesAndPolymorphism.pdf](http://scg.unibe.ch/download/lectures/pl/PL-04TypesAndPolymorphism.pdf)
- [https://zims-en.kiwix.campusafrica.gos.orange.com/wikibooks_en_all_maxi/A/Yet_Another_Haskell_Tutorial/Type_advanced](https://zims-en.kiwix.campusafrica.gos.orange.com/wikibooks_en_all_maxi/A/Yet_Another_Haskell_Tutorial/Type_advanced)
- [https://lexi-lambda.github.io/blog/2021/03/25/an-introduction-to-typeclass-metaprogramming/](https://lexi-lambda.github.io/blog/2021/03/25/an-introduction-to-typeclass-metaprogramming/)
- Impressed with this code [https://gist.github.com/copumpkin/2636229](https://gist.github.com/copumpkin/2636229) 🤘

<!-- Open vs closed type family
http://www.mchaver.com/posts/2017-06-21-type-families.html -->

<!-- - `0 + X = X`
- `X + Y = Y + X` -->
 
<!-- ```hs
data WeekDay = Mon | Tue | Wed | Thu | Fri | Sat | Sun
Secara sederhana, tipe data aljabar adalah pemodelan suatu tipe data Anda sendiri dengan menggunakan metode aljabar. 
```
https://gist.github.com/phadej/cae76444548b9cffa10d9675e013847b 
-->

<!-- http://sleepomeno.github.io/blog/2014/02/12/Explaining-Haskell-RankNTypes-for-all/ -->
<!-- http://scg.unibe.ch/download/lectures/pl/PL-04TypesAndPolymorphism.pdf -->
<!-- https://zims-en.kiwix.campusafrica.gos.orange.com/wikibooks_en_all_maxi/A/Yet_Another_Haskell_Tutorial/Type_advanced 
https://courses.cs.washington.edu/courses/cse341/04wi/lectures/07-ml-user-types.html
https://tgdwyer.github.io/haskell2/ -->

<!-- https://link.springer.com/content/pdf/10.1007%2F3-540-57880-3_16.pdf
https://lexi-lambda.github.io/blog/2021/03/25/an-introduction-to-typeclass-metaprogramming/ -->
<!-- https://kowainik.github.io/posts/deriving
  https://www.inf.ed.ac.uk/teaching/courses/inf1/fp/lectures/2017/lect13.pdf -->