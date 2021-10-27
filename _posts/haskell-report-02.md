---
title: "Match Match Laziness on Expression"
date: "2021-10-21"
author: "Alfin Surya"
excerpt: "Little discussion about pattern matching, expression, and lazy evaluation ~ /A couple of onomatopoeic myths circulating about the origin of this term/"
coverImage: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F-yKUxH6tgln0%2FT-cQ-bH8BRI%2FAAAAAAAAOpw%2FEhoqOWD-sRI%2Fs1600%2FTugu-Pancoran-Perbedaan-Jakarta-Jaman-Dulu-dan-Sekarang.jpg&f=1&nofb=1"
---

Pattern Matching merupakan sebuah logic yang digunakan untuk membandingkan sebuah nilai atau data dengan struktur pola tertentu untuk mencapai hasil kecocokan yang diinginkan. Pola-pola tersebut umumnya berbentuk barisan atau [struktur pohon](https://en.wikipedia.org/wiki/Tree_structure). 

Dalam kutipan artikel [Wikipedia](https://en.wikipedia.org/wiki/SNOBOL), pencocokan pola pertama kali digunakan pada [SNOBOL](http://www.snobol4.org/docs/burks/tutorial/ch4.htm)(1962) yang digunakan untuk operasi string. Di masa modern kini, fitur ini banyak digunakan seperti di bahasa pemrogaman seperti OCaml, ML, Rust, Haskell, etc.

Secara global, pattern matching terdiri dari beberapa jenis diantaranya:
1. **`as` pattern**: pattern as identifier, f.e `(a, b) as tuple1`
2. **Wildcard pattern**: _
3. **List pattern**: [ pattern_1; ... ; pattern_n ], f.e `[ a; b; c ]`
4. **Tuple pattern**: ( pattern_1, ... , pattern_n ), f.e `( a, b )`
5. Lihat contoh lainnya disini [fsharp/language-reference/pattern-matching](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/pattern-matching).

Berikut adalah contoh sederhana pencocokan pola argumen dari sebuah fungsi pada haskell:
```hs
match :: Int -> Int
match 0 = 1
match 1 = 1
match n = n
```
Kode diatas merupakan salah satu cara pattern matching di Haskell, disebut juga pencocokan pola deklarasi fungsi yang dilakukan di tingkat atas. Yang dicocokkan adalah argumen `n` dengan 2 kondisi yaitu jika **nilai argumen `n == 0`, atau jika nilai `n == 1`**. Ini berkaitan dengan *drives evaluation* yang nanti kita akan bahas di section selanjutnya. 

Teknik ini juga disebut [branching](https://en.wikipedia.org/wiki/Branching_(version_control)), jadi deklarasi fungsi dibuat berulang kali tetapi dengan branch `n` yang berbeda, *mungkin terlihat seperti [overloading function](https://learntypescript.dev/05/l3-overloading#the-syntax-for-method-overloading)*. Cara kerja kode diatas sebenernya mirip seperti ini:

<!-- 
```hs
tell :: ([Int], [Char]) -> String
tell ([], s) = show 0
tell (a@(x:xs), s) 
  | s == "all" = show a 
  | s == "head" = show x 
  | s == "tail" = show xs 
  | otherwise = show [0]

  
``` -->

```hs
match :: Int -> Int
match n 
  | n == 0 = 1
  | n == 1 = 1
  | otherwise = n
```
Yang dilakukan tetap sama, tetapi untuk bagian yang kedua menggunakan [guard syntax](https://wiki.haskell.org/Pattern_guard).

## Let's Start Smaller
Sebelum menuju ke case selanjutnya, kita mulai dari case yang sederhana dulu

```hs
let a               = ([1, 2, 3], False) -- a = ([1, 2, 3], False)
let (a, _)          = ([1, 2, 3], False) -- a = [1, 2, 3]
let (_, a)          = ([1, 2, 3], False) -- a = False
let ([a, _, _], _)  = ([1, 2, 3], False) -- a = (1)
let (a@(_:_), _)    = ([1, 2, 3], False) -- a = [1, 2, 3]
let (_@(a:_), _)    = ([1, 2, 3], False) -- a = 1
let (_@(_:a), _)    = ([1, 2, 3], False) -- a = [2, 3]
```
> Untuk lebih memahami cara kerja kode diatas, saran saya pahami cara kerja list dan tuple di haskell terlebih dahulu.

Pada kode diatas terdapat ekspresi [let](https://wiki.haskell.org/Let_vs._Where) dengan nama dan nilai berupa tuple. Di haskell ini disebut *pattern matching on tuples*, awalnya saya cukup bingung mengapa ini disebut pattern matching ketika membaca kode [ini](https://gist.github.com/natserract/af998008e08cedb16540590e7bd7f8e2), jadi cara memahaminya mulai dari case diatas.

Sebuah let expression dibaca *from right to left*, maksudnya adalah *apa yang dibutuhkan, tulis di sebelah kanan, lalu buat pola nya disebelah kiri*. Uraiannya:
- `let` hanya memberi nama pada nilai, 
- `let a = 5` membuat nama a yang nilainya 5, 
- `let a = (5, True)` membuat  nama a yang nilainya `(5, True)`,
- Dan `let (a, _) = (5, True)`membuat nama a yang nilainya 5.   

Let membuat nama sesuai dengan hal yang dipilih pada ekspresi sebelah kanan, contoh:
```hs
greetings :: [String]
greetings = ["hi", "yo", "howdy"]

x = let [_, s, _] = greetings in (s ++ "!")
--          ^          ^          ^
--          |          |       and use it here
--   name second el    |
--                   from this list
```
Pattern matching digunakan untuk **mengekstrak** bagian dari data yang ada (atau mungkin semua data), itu terlihat seperti [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) pada javascript. Setelah mengetahui *how to read let expression*, kita ambil beberapa line pada kode bagian pertama, tapi kita coba lengkapi:
```hs
let (a@(x:xs), _)  = ([1, 2, 3], False)
```

Yang dilakukan pada operasi diatas sebenernya seperti ini:
```hs
let (a@(x:xs), _) 
  = ([1, 2, 3], False) in a == [1, 2, 3] && x == 3 && xs == [2, 3]
```
Jadi `a@(x:xs)` merupakan **as pattern** atau identifier yang digunakan untuk mengestrak bagian,
- All `a` = [1, 2, 3]
- Head `x` = 1
- Tail `xs` = [2, 3]

Kemudian disana juga terdapat symbol `_` ini disebut **wildcard pattern**. Itu mengartikan bahwa kita tidak perlu variabel tersebut jadi avoid dengan `_`. Pola ini juga digunakan di akhir dari sebuah pencocokan pola, kalau di javascript seperti `default` di switch case.

Jika dilihat disana terdapat symbol `:`, awalnya saya pikir ini cuman simbol biasa. Namun, di haskell itu bukan biasa, ini disebut **konstruktor data untuk list** bisa dilihat di prelude typenya `(:) :: a -> [a] -> [a]`. Baik, asumsi saya  teman-teman sudah paham tentang `let expression` bisa kembali keatas untuk evaluasi mengapa hasil nya seperti itu.

## Drives Evaluation
Seperti yang kita tahu, bahwa haskell merupakan bahasa yang lazy artinya **ekspresi akan dievaluasi jika itu diperlukan**. Dalam contoh dibawah, pencocokan pola dilakukan untuk mendorong evaluasi berdasarkan argumen fungsi

```hs
f :: Maybe a -> [a]
f Nothing  = []
f (Just x) = [x]
```

Fungsi `f` mempunyai argumen inputan anggap saja `x`, mirip seperti contoh pertama, dimana pencocokan pola berdasarkan argumen inputannya. Jadi proses evaluasi fungsi `f` dimulai dari evaluasi argumen `x` dahulu, apakah itu `Nothing` or `Just ..`, karena hasil dari `f` bergantung dari bentukan `x`. 

**~ First, think with laziness!**

Dalam proses [*evaluation strategy*](https://en.wikipedia.org/wiki/Evaluation_strategy), haskell menggunakan strategy call by need / laziness dimana evaluasi ekspresi ditunda sampai nilainya dibutuhkan. Secara teknis lazy evaluation adalah gabungan dari **[call by name](https://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_name) + [sharing](https://wiki.haskell.org/Sharing)**.  Untuk itu coba kita implementasi:
```hs
eval :: (Int, Bool)
eval = (3, undefined)

f' :: a -> b -> a
f' a b = a

result :: (Int, Bool)
result = f' eval 5 -- lazy
```
Fungsi `f'` mempunyai argumen inputan `a` dan `b`, dengan kembalian `a`. Ini artinya dalam fungsi `f` yang akan dievaluasi (kemungkinan) hanya sebagian yaitu `a`. Setelah itu pada `result`, fungsi `f'` mempunyai inputan `eval 5` <sup>lihat [lambda expression](https://riptutorial.com/haskell/example/16098/lambda-expressions)</sup>. 

Jika fungsi `f'` dievaluasi **sepenuhnya**, maka akan terjadi error yaitu **undefined**. Undefined merupakan nilai kesalahan universal di haskell, yang mempunyai arti tidak mempunyai nilai. Untuk menjalankan kode diatas tanpa error  kita bisa menggunakan fungsi [`fst`](https://hackage.haskell.org/package/base-4.15.0.0/docs/src/Data-Tuple.html#fst), ini hanya meng-ekstrak komponen pertama dari tupple `(x, _)`.

> **Note**: Diatas saya sempat bilang *kemungkinan* ini terjadi karena, ekspresi `print` itu **mengevaluasi secara keseluruhan/penuh** karena perlu merangkai semua sub-bagian. Untuk itu kita bisa force dikit, menggunakan `fst`.

```hs
print $ fst result
```
Dari problem diatas sebenernya kita sudah dapat melihat bagaimana laziness bekerja, `f' a b = a` tidak mengevaluasi sepenuhnya hanya argumen a yang dievaluasi. Buktinya nilai pada argumen `b` adalah undefined/tidak ada nilai, jika itu dievaluasi penuh maka tentunya akan error. 

> "You cant inspect (easily) at runtime when an expression is evaluated so performance in a lazy language is less predicatble than in a strict one. Even experienced haskellers finds hard to predict and analyze performance of a complex haskell program". **@jneira**

Ada beberapa poin juga yang penting disini, fungsi `eval 5` berada dalam bentuk [WHNF](https://wiki.haskell.org/Weak_head_normal_form) atau **bentuk normal kepala lemah**, yang berarti argumen tidak harus sepenuhnya dievaluasi, lihat `(3, undefined)` ini adalah **lapisan terluarnya** dan *sudah diketahui*. Nilai di haskell dapat dievaluasi dengan cara seperti ini, walaupun jika tidak diperiksa apa isinya itu tidak masalah.
- **WHNF**: nilai yg ekspresinya sudah di evaluasi, tetapi sub ekspresinya blm. 
    ```hs
    (1 + 1, 2 + 2)      
    \x -> 2 + 2         
    'h' : ("e" ++ "llo")
    ```
- **NF** : ekspresi sepenuhnya dievaluasi dan tidak ada sub ekspresi.
    ```hs
    42
    (2, "hello")
    \x -> (x + 1)
    ```

Asumsi saya kamu sudah mengerti bagaimana laziness bekerja, untuk itu kita balik lagi ke topik **drives evaluation**. Perhatikan dibawah ini adalah fungsi rekursif,

```hs
-- All code is same
recList :: a -> [a]
recList n = n : recList n

-- recList 5
```
> Seperti yang kamu ketahui, haskell tidak memiliki loop seperti di bahasa lain, jadi untuk melakukan perulangan sejenis membutuhkan recursive function.

Konstruktor `:` pada fungsi `recList` akan menghasilkan nilai list yang dimulai *(head)* dari `5` dan diakhiri *(tail)* `recList 5` dengan nilai tak terbatas `(5:5:(5:...))`. 

Proses yang terjadi, fungsi `recList` akan memanggil fungsi nya sendiri dan meng-evaluasi kembalian `5 : recList 5`, lalu hasil kembalian disimpan sampai evaluasi hasil akhir (tail) dapat tercapai. Setiap evaluasi panggilan menciptakan sesuatu seperti grafik **bertumpuk-tumpuk** yang disebut dengan [*thunks*](https://en.wikipedia.org/wiki/Thunk). Beberapa pengertian *thunk* dari beberapa sumber:
1. Ekspresi yang nilainya belum diminta kecuali jika dibutuhkan.
2. Catatan untuk melacak ekspresi yang tidak dievaluasi
3. Berfungsi untuk menunda evaluasi yang **sebenarnya** sampai benar2 dibutuhkan.
4. Mesin yang berguna untuk mengabstraksi perhitungan ekspresi

```hs
  :
 /   \
5    (recList 5)
      :
    /   \
  5   (recList 5)

-- (5:5:(...))
```
Haskell menghasilkan thunk yang berisi list [(cons) cells](https://en.wikipedia.org/wiki/Cons) yang berisi nilai elemen `n`(head) dan nilai lain yang belum dievaluasi `recList n` (tail). Bagian head:`5`telah sepenuhnya dievaluasi namun tail: `recList 5` belum dievaluasi karena bersifat *laziness*.

> Fact: Jika thunk ini cukup besar, akan menghasilkan [stack overflow](https://wiki.haskell.org/Stack_overflow).


```hs
take' :: Int -> [a] -> [a]
take' _ [] = []
take' 0  _  = [] -- base case
take' n (x:xs) = x : take' (n - 1) xs -- recursion
```

```hs
take' 3 (recList 5)
```

Fungsi `recList` tidak sepenuhnya dievaluasi dan nilainya tak terbatas, untuk itu kita perlu fungsi `take'` untuk menghentikan proses infinite. Fungsi `take'` juga bersifat lazy, ia hanya mengambil beberapa index list yang dibutuhkan `[5, 5, 5]`. Urutan evaluasinya seperti ini:

```hs
take' 3 (recList 5)
take' 3 (5 : recList 5)
5: take' 2 (recList 5) -- WHNF
```
Seperti yang sebelumnya dibahas, bahwa thunk melacak/mencatat ekspresi yang nilainya belum dibutuhkan sekaligus menunda evaluasinya. Jika **tidak dipaksa berevaluasi secara penuh** maka last evaluation berada pada `5 : take' 2 (recList 5)`. 

Mengapa evaluasi tidak dilanjutkan lagi?, iya ini karena inti laziness pada haskell bahwa **ekspresi hanya harus dievaluasi hingga/sampai Bentuk Normal Kepala Rendah (WHNF)** jadi `5 : take' 2 (recList 5)` ini berada dalam bentuk WHNF. 

Sedangkan ketika dipaksa **berevaluasi penuh**, maka urutan evaluasi nya seperti ini:
```hs
take' 3 (recList 5)
take' 3 (5 : recList 5)
5 : take' 2 (recList 5)
5 : take' 2 (5 : recList 5)
5 : 5 : take' 1 (recList 5)
5 : 5 : take' 1 (5 : recList 5)
5 : 5 : 5 : take' 0 (recList 5)
5 : 5 : 5 : [] -- NF (Normal Form)
```
Iyap, *thunk* diatas akan dicetak sepenuhnya atau dievaluasi jika diperlukan, contoh: 
```hs
print . take' 3 $ recList 5
``` 
Maka hasilnya `[5, 5, 5]`. Hasil akhir untuk menilai ekspresi asli adalah **thunk**.

Haskell merupakan bahasa yang tidak ketat (lazy) secara default, tetapi kita bisa membuatnya *strict*. Inipun diperlukan alasan performance, umumnya biarkan bersifat unstrict/lazy dan masalah optimisasi bisa nanti dilakukan.

> "Haskell started as a language to research laziness, and so it remains a very important part of what Haskell is; but in my opinion it's not the part I like the most. Laziness forced the creators of Haskell to use pure functions (because it is hard to control evaluation order in a lazy language, and you need to control evaluation order with side-effecting procedures). Haskell also has a really great type system. Those two aspects (pure FP & strong static algebraic datatypes with inference) are what bring me the most value in Haskell. But it's important to get comfortable with the basics of lazy evaluation!" **@gabedamien**

## Referensi terkait
- [https://wiki.haskell.org/Performance/Strictness](https://wiki.haskell.org/Performance/Strictness)
- [https://wiki.haskell.org/Short-circuiting](https://wiki.haskell.org/Short-circuiting)
- [https://www.haskell.org/onlinereport/exps.html#sect3.17.2](https://www.haskell.org/onlinereport/exps.html#sect3.17.2)
- [https://newbedev.com/haskell/users_guide/exts/strict](https://newbedev.com/haskell/users_guide/exts/strict)
- Real World Haskell PDF

<!-- Drives Evaluation mempunyai rules:
Di haskell, argumen ke suatu fungsi tidak dievaluasi kecuali jika benar2 digunakan 
- Expressions are only evaluated when pattern-matched
- …only as far as necessary for the match to proceed, and no farther! -->

<!-- Ini berkaitan dengan [evaluation strategy](https://en.wikipedia.org/wiki/Evaluation_strategy) yaitu call by value argumen dievaluasi sebelum suatu fungsi dimasukkan. -->
