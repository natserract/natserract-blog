---
title: "Functional Programming di Rust"
date: "2020-04-22"
author: "Alfin Surya"
excerpt: "Mencoba paradigma pemrogaman fungsional di Rust"
coverImage: 'https://res.cloudinary.com/practicaldev/image/fetch/s--lNRD-vey--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/2y19pxhcq4ltvzq569mv.png'
---

Sebulan lalu ketika pertama kali mendevelop sebuah non komersial project menggunakan [ReasonML](https://reasonml.github.io/), saya mendapat sebuah pengalaman baru, yaitu *functional programming*. Bahasa ini merupakan alternative syntax dari [OCaml](https://ocaml.org/). OCaml sendiri merupakan purely functional language, fitur-fitur yang ditawarkan menarik. Contohnya: type inference, strongly type system, algebraic datatypes, dan masih banyak lagi. Menarik bukan?

Nah setelah mencoba language tersebut, saya mulai interest dengan namanya functional programming. Usut punya usut, akhirnya saya coba mengimplementasikan paradigma tersebut di bahasa berbeda yaitu [Rust](http://rustlang.org/). 

### Introduction
Functional programming (FP) adalah paradigma pemrograman dimana memungkinkan kita untuk menulis kode program yang ekspresif, ringkas, dan elegan. Functional programming juga membantu developer untuk mengatur kodenya agar tidak **DRY (Don't Repeat Yourself)** alias tidak menulis kode yang sama berulang-ulang kali. Functional language lainnya contohnya seperti Lisp, Clojure, Erlang, Haskell, R, dan masih banyak lagi.

### Okay, but why Rust?
Pertanyaannya, apakah **Rust functional programming language?** jawabannya, tidak. Walaupun Rust sendiri terinspirasi dari **ML family of language**, dia bukan functional. Tetapi beruntungnya Rust mempunyai beberapa fitur yang mirip dengan bahasa fungsional lainnya, seperti: algebraic datatypes, expressive types, dan lain-lain. 

### Lists yang akan dibahas
* Primitive Types
* Closures
* Currying
* Recursion
* Higher Order Functions(HOF)
* Lazy evaluations

## Primitive Types
Agar tidak langsung loncat lebih jauh, alangkah baiknya kita harus mengetahui beberapa tipe data yang ada di Rust. Ini juga berlaku untuk semua bahasa pemrogaman.

### Booleans
Jenis tipe data yang paling sederhana adalah nilai `true/false`, di Rust ini disebut `bool`
```rust
let x = true;
let y: bool = false;
```

### Char
Jenis tipe data `char` memiliki nilai single Unicode. Kita bisa menggunakan tipe data `char` dengan single tick (`'`)
```rust
let x = 'x';
let two_hearts = '💕';
```
Tidak seperti beberapa bahasa lain, `char` di Rust nilainya bukan satu byte, tetapi empat.

### Numeric Types
Rust mempunyai beberapa varian kategori tipe numeric, seperti signed(`i`) dan unsigned(`u`), fixed size (`8`, `16`, `32`, `64`) dan variable(`isize`, `usize`) types.
```rust
let x = 42; // `x` has type `i32`.
let y = 1.0; // `y` has type `f64`.
```

### Arrays
Seperti banyak bahasa pemrograman lain, Rust juga memiliki tipe data array. Secara default, array di Rust tidak dapat diubah. Kecuali kamu menginisializenya dengan [`mut`](https://doc.rust-lang.org/rust-by-example/scope/borrow/mut.html)
```rust
let a = [1, 2, 3]; // a: [i32; 3]
let mut m = [1, 2, 3]; // m: [i32; 3]
```

### Functions
Function juga memiliki tipe data! Contohnya seperti ini:
```rust
fn foo(x: i32) -> i32 { x }
let x: fn(i32) -> i32 = foo;
```
Dalam case ini, fungsi `foo()` memiliki return type `numeric: i32`, dan mengembalikan nilai `x`.

> Untuk selengkapnya kamu bisa cek disini: [primitive types](https://doc.rust-lang.org/1.29.0/book/first-edition/primitive-types.html)

## Closures
>*"Closure is a mechanism by which an inner function will have access to the variables defined in its outer function’s lexical scope even after the outer function has returned."* 

Sampai disini paham? singkatnya *closures* adalah sebuah inner function yang mempunyai akses untuk mengambil suatu nilai diseluruh scopenya baik diluar maupun didalam.

```rust
fn fmt(prev_str: &str) -> String {
    let mut new_str = String::new();
    
    let closure_annotated = |next_str| -> String {
        new_str.push_str(prev_str);
        new_str.push_str(next_str);
        return new_str;
    };
    
    closure_annotated("dolor sit amet")
}

let r_txt = "Lorem ipsum ";
assert_eq!("Lorem ipsum dolor sit amet", fmt(r_txt));
```
Dicase ini, dibagian `new_str.push_str()` dimana `closure_annotated` mengakses variable `new_str` lalu merubah nilai dalam variabel tersebut dan mereturn nya diluar scope. 


## Currying
Currying adalah teknik functional programming di mana kita dapat mengubah suatu fungsi dengan beberapa argumen menjadi urutan fungsi bersarang. Ini mengembalikan fungsi baru yang mengharapkan argumen inline berikutnya.

```sh
#[derive(Debug)]
struct States<'a> {
    a: &'a i32,
    b: &'a i32
}

trait Currying {
    type ReturnType: Fn(i32) -> i32;
    fn add(self) -> Self::ReturnType;
}

impl Currying for States<'static>{
    type ReturnType = Box<dyn Fn(i32) -> i32>;
   
    fn add(self) -> Self::ReturnType {
        Box::new(move|x| {
            x * self.a
        })
    }
}

let r_value: States = States {
    a: &100,
    b: &100
};

let r1 = r_value.add();
let r2 = r1(5);

assert_eq!(500, r2);

```
Terdapat 2 parameter disini, yaitu `a`, `b` dimana masing-masing mempunyai tipe data numeric, lalu dibagian `trait` adalah sebuah *function interfaces*, tempat untuk inisialisasi function. Traits ini mirip seperti [typescript interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html).


## Recursion
Sederhananya recursion adalah suatu `procedure/function` yang memanggil dirinya sendiri, dimana fungsinya untuk membuat/mengolah data yang akan ingin ditampilkan.

```rust
#[allow(non_camel_case_types)] 
type i64_t = i64;

trait Factor {
    fn factorial_tail_rec(val: i64_t) -> Self;
    fn factorial(num: i64_t) -> Self;
}

impl Factor for i64_t {
    fn factorial_tail_rec(val: i64_t) -> Self {
        val
    }

    fn factorial(num: i64_t) -> Self {
        match num {
            0 => 1,
            _ => num * Self::factorial_tail_rec(num - 1)
        }
    }
}

let result: i64_t = Factor::factorial(3); 
assert_eq!(6, result);
```
Ini adalah sebuah fungsi faktorial, dimana jika nilai argumen dari parameter num `!== 0`, maka nilai tersebut akan dikalikan dengan setiap angka dibawahnya. Misalnya `(5! = 5 * 4 * 3 * 2 * 1 = 120)`.


## Higher Order Functions(HOF)
Higher order function adalah fungsi yang menggunakan fungsi lain sebagai parameter atau sebagai hasil return.
```rust
fn map<F>(arr: &[i32], func: F) -> Vec<i32> where F: Fn(&i32) -> i32{
    let mut new_array: Vec<i32> = vec![];
    for i in arr.iter() {
        new_array.push(func(i))
    }
    
    return new_array
}

let lists = vec![1, 4, 9, 16];
let result = map(&lists, |i| *i + 2);

assert_eq!(vec![3, 6, 11, 18], result)
```
Jadi `func` dan `map` merupakan higher order function, dimana fungsi ini digunakan untuk mengubah setiap isi dari suatu array. Hasil returnnya adalah array baru dengan length yang sama dengan `originalArray` yang diubah.


## Lazy Evaluation
Lazy evaluation atau non-strict evaluation adalah sebuah proses menahan evaluasi dari sebuah `expression/function` hingga nilainya diperlukan. Tujuannya agar menghindari evaluasi berulang.

```rust
struct State {
    x: i32,
}

trait Lazy {
    fn add(&self) -> i32;
    fn multiply(&self) -> i32;
    fn add_or_multiply(&self, add: bool) -> i32;
}

impl Lazy for State {
    fn add(&self) -> i32 {
        println!("executing add");
        &self.x + &self.x
    }

    fn multiply(&self) -> i32 {
        println!("executing multiply");
        &self.x * &self.x
    }

    fn add_or_multiply(&self, add: bool) -> i32 { 
        match add {
            true => self.add(),
            false =>  self.multiply(),
        }
    }
}

let val: State = State {
    x: 20
};

assert_eq!(40, val.add_or_multiply(true));
assert_eq!(400, val.add_or_multiply(false));
```


## Referensi
* [Functional Programming in Go](https://deepu.tech/functional-programming-in-go/)
* [Eloquent Javascript Functional Programming](https://eloquentjavascript.net/1st_edition/chapter6.html)
* [Closures Developer Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) 


## Motivation
Functional Programming (FP) memiliki banyak keuntungan, dan popularitasnya terus meningkat. Namun, setiap paradigma pemrograman dilengkapi fitur dan keunikan tersendiri dan FP tidak terkecuali. Semoga dengan adanya tulisan ini, dapat memberikan manfaat bagi pembacanya. Sekian dari saya terimakasih ✌️

Repository: [github](https://github.com/natserract/rustfp)