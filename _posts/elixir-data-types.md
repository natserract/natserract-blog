---
title: "Elixir Data Types"
date: "2022-08-29"
excerpt: "Elixir has weak dynamic types. But 'weak' doesn't imply bad"
coverImage: "https://asset.kompas.com/crops/yVJe0Ygxfku1OKtSIwqdQxrKH_s=/0x0:978x652/750x500/data/photo/2018/05/20/2057564360.JPG"
---

Elixir adalah bahasa functional yang ditulis secara dinamis (dynamic language), yang artinya setiap variabel memiliki tipe data tertentu, tetapi tipe tersebut tidak dicek dan program akan tetap berjalan, hampir semua aspek bersifat dinamis. 

Ini saya sedikit *speechless*, karena umumnya bahasa functional ditulis secara static (harus mengetahui jenis semua variabel pada waktu kompilasi) layaknya seperti [haskell](https://www.haskell.org/), [rust](https://doc.rust-lang.org/book/ch03-02-data-types.html), etc. Meskipun Elixir bukan bahasa yang ditulis secara statis, ia memiliki konsep tipe layaknya bahasa pemrogaman lain.  

Beberapa tipe dasar yang akan kita bahas adalah:

### Number
Elixir mengenal dua jenis angka: yaitu bilangan bulat (ex. `1`) dan float (ex. `1.2`)

#### Integer
```bash
iex(2)> 1 * 2
2

iex(3)> is_integer(2)
true
```
Elixir menyimpan bilangan integer dengan cara yang berbeda, elixir memungkinkan Anda menyimpan bilangan integer entah itu kecil atau besar, elixir akan selalu presisi. Jadi *tidak perlu khawatir hasil bilangan Anda berkurang*.

#### Float
```bash
iex(4)> 10.50
10.5
```

Float membutuhkan sebuah titik desimal setidaknya satu angka disebelah kiri titik desimal, meskipun itu nol. Jika tidak, Elixir akan melaporkan kesalahan:
```bash
iex(6)> .02
** (SyntaxError) iex:6:1: syntax error before: '.'
    |
  6 | .02
    | ^

```
Elixir memiliki tingkat presisi 64 bit IEEE 754-1985 “double precision” dan mendukung bilangan eksponen (`e`).
```bash
iex(6)> 1.0e-10
1.0e-10
```

#### Hex, Oktal, Biner 
Selain itu, Elixir mendukung notasi untuk bilangan biner, hex, oktal, dan heksadesimal
```bash
0b01010111 # output: 87
0xcafe # output: 51966
0x1F # output: 31
```

### Boolean
Elixir mendukung `true` dan `false `sebagai nilai boolean (logika)
```bash
iex(2)> true
true

iex(3)> false
false
```

Nilai boolean di Elixir sebenernya adalah **Atom**, begitu juga dengan `nil`
```bash
iex(5)> true === :true
true

iex(6)> false === :false
true

iex(7)> nil === :nil
true
```

> `true`, `false`, `nil` merupakan atom/konstanta khusus yang dapat digunakan tanpa operator :

### Atom
Atom merupakan salah satu konsep penting di Elixir, **cara penulisannya menggunakan tanda titik dua (:)**, diikuti dengan huruf, angka, garis bawah,  tanda `@`,  operator, maupun tanda seru (`!`) atau tanda tanya (`?`). 

> Umumnya, atom ditulis dengan huruf kecil dengan satu kata 

Secara teknis atom itu hanya sebuah **nilai konstanta** dimana nilainya sama dengan namanya. Misal: `:ok`:
```bash
iex(8)> :ok
:ok
```

Jika Anda sudah familiar dengan Ruby, atom adalah sinonim dengan `Symbol:`. Nantinya kita akan banyak menggunakan atom untuk **menandai suatu nilai**. Salah satu kasus penggunaan Atom yang paling umum:

```bash
url = 'http://www.example.com/users'
 
case HTTPoison.get(url) do
  {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
    IO.puts body
  {:ok, %HTTPoison.Response{status_code: 404}} ->
    IO.puts "Not found :("
  {:error, %HTTPoison.Error{reason: reason}} ->
    IO.inspect reason
end
```
> `:ok` dan `:error` mewakilkan hasil response dari permintaan http

### String
String di Elixir ditulis diantara tanda petik ganda (double quotes):
```bash
iex(2)> "hello"
"hello"
```

Elixir memiliki dua jenis string, kutip tunggal `''`, dan kutip ganda `""`, secara signifikan ini berbeda. 

String yang menggunakan single quote `''`, adalah **list karakter** sedangkan untuk double quote `""`adalah **binary atau serangkaian byte yang dikodekan dengan [UTF-8](https://id.wikipedia.org/wiki/UTF-8)**. Lihat perbedaannya:

```bash
iex(4)> 'hello' ++ 'world'
'helloworld'

iex(3)> "hello" <> "world"
"helloworld"
```

#### Interpolasi String
String di Elixir juga mendukung [interpolasi](https://medium.com/modern-web-app/string-interpolation-472e5ee5f441). Ini memungkinkan Anda untuk menampilkan nilai di tengah/dalam string dengan menggunakan sintaks `#{}`:
```bash
iex(5)> nama = "Alfin"
"Alfin"

iex(6)> "halo #{nama}"
"halo Alfin"

iex(7)> "2 + 2 = #{2 + 2}"
"2 + 2 = 4"
```
> Ekspresi apapun valid di dalam interpolasi

#### Penggantian Baris & Escape Sequences
String juga mendukung penggantian baris dan escape sequences:
```bash
iex(1)> "hello
...(1)> world"
"hello\nworld"

iex(2)> "hello\n Elixir"
"hello\n Elixir"
```
> Lihat escape karakter lainnya [disini](https://github.com/elixir-lang/elixir/blob/26e4624a5e15ba249aef7e19a135ec2d0b8ac076/lib/elixir/lib/string.ex#L48)

#### Sigils
Sigils adalah **sintaks alternatif** untuk string literals tertentu. Sigil dimulai dengan tanda (`~`) diikuti dengan huruf kecil atau besar. Misalnya kita ingin menghindari tanda kutip (`""`) di string, bisa diganti dengan `~s(..)`:
```bash
iex(6)> ~s(Hello World!)
"Hello World!"

iex(11)> ~s(#{1+1})
"2"
```

Berikut adalah jenis-jenis sigil di Elixir:
```bash
Sigil lists:
    ~C a character list without escaping or interpolation
    ~c a character list with escaping and interpolation
    ~D a Date literal (yyyy-mm-dd)
    ~N a naive DateTime literal (yyyy-mm-dd hh:mm:ss)
    ~R a regular expression without escaping or interpolation
    ~r a regular expression with escaping and interpolation
    ~S a string without escaping or interpolation
    ~s a string with escaping and interpolation
    ~T a Time literal (hh:mm:ss)
    ~W a word list, with no escaping or interpolation
    ~w a word list with escaping and interpolation

```


### Ranges
Ranges mewakili urutan angka dari awal hingga akhir, ditulis dengan operator dua titik (`..`). Misalnya:

```bash
# Urutan naik
iex(9)> 1..50
1..50

# Urutan turun
iex(11)> 50..1
50..1//-1
```

### Anonymous function
Elixir adalah bahasa functional, jadi *fungsi juga merupakan tipe*. Elixir menyediakan anonymous function atau **fungsi tanpa nama**. 

> [Lambda abstraction](https://wiki.haskell.org/Lambda_abstraction) adalah nama lain untuk anonymous function. 

Fungsi anonim di elixir, menggunakan keyword `fn` dan `end`:
```bash
fn
  parameter-list -> body
  parameter-list -> body ... 
end
```

Jika Anda familiar dengan javacript itu seperti: 
```js
(() => ...)()
```

Contoh penggunaan anonymous function di elixir:
```bash
# Panggil secara eksplisit
iex(18)> (fn -> 2 * 3 end).()
6

# Bind dengan variables (variable as a function)
iex(16)> sum = fn(a, b) -> a + b end
#Function<43.65746770/2 in :erl_eval.expr/5>

iex(17)> sum.(1, 2)
3
```

### Lists
Lists terlihat seperti array di bahasa lain, yang berisi nilai tertentu. Lists disimpan sebagai [linked list](https://www.educative.io/edpresso/what-is-a-linked-list). Elixir menggunakan tanda kurung siku (`[]`) untuk menentukan nilai lists.

```bash
iex(12)> prime_numbers = [2, 3, 5, 7]
[2, 3, 5, 7]

iex(13)> [1,2,3] ++ [4,5,6]
[1, 2, 3, 4, 5, 6]

iex(14)> 1 in [1,2,3,4]
true

iex(15)> [1, 2, 3, 4] -- [2, 4]
[1, 3]
```

> Data di elixir bersifat [**immutable**](C.2.5-immutability-elixir) artinya setelah data dideklarasikan, data tersebut tidak dapat **dimutasi/diubah lagi**.

### Tuples
Tuple merupakan kumpulan struktur data, biasanya digunakan untuk mengelompokkan/grouping suatu data tertentu. Tuple dapat menyimpan nilai apapun termasuk angka, atom, tuple lainnya, list, serta string. Ini memungkinkan Anda menggabungkan beberapa item menjadi satu [single composite data type](https://www.ibm.com/docs/en/tivoli-netcoolimpact/6.1.0?topic=types-working-composite-data). 

Tuple dapat ditulis dengan tanda kurung awal `{ }`:
```bash
iex(19)> person = {"Bob", 25}
{"Bob", 25}

# Accessing
iex(27)> elem(person, 0)
"Bob"
```

Anda juga bisa menggunakan [pattern matching](/docs/C.2/C.2.3-pattern-matching.md) di dalam tuples:
```bash
iex(20)> {status, count} = {:ok, 40}
{:ok, 40}

iex(21)> status
:ok

iex(22)> count
4
```

> Itu terlihat seperti [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) pada javascript


### Maps
Maps merupakan penyimpanan suatu kumpulan kunci dan nilai yang bersifat dinamis:
```bash
iex(32)> words = %{ 2 => "world", 1 => "hello"}
%{1 => "hello", 2 => "world"}

# Accessing
iex(33)> words[2]
"world"
```
> Saya pikir Maps ini terlihat seperti struktur [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) pada javascript, tetapi yang membedakan Maps datanya bersifat *immutable*.


Kunci/keynya bersifat unique:
```bash
iex(30)> m = %{ 2 => "world", 2 => "hello"}
warning: key 2 will be overridden in map
  iex:30

%{2 => "hello"}
```

### Binaries
Binaries adalah jenis kumpulan bytes (biner). Jika Anda lihat section sebelumnya pada bagian Strings, String disimpan menjadi suatu binary sehingga nantinya dapat disimpan kedalam memori, ditulis ke disk, dll.

```bash
iex(42)> say = "ƒunction"
"ƒunction"

iex(41)> byte_size(say)
9
```
Terlihat, jumlah panjang kata "ƒunction" adalah 8, tetapi byte yang dihasilkan adalah 9. Ini karena `ƒ` mewakilkan 2 bytes. 

Anda bisa membuat binary dimulai dengan tanda `<<` dan `>>`:
```bash
iex(1)> <<1, 2, 3>>
<<1, 2, 3>>

iex(45)> <<1, 2, 255, 256>>
<<1, 2, 255, 0>>

iex(46)> 'hełło'
[104, 101, 322, 322, 111]
```