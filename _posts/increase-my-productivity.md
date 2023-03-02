---
title: "Increase My Productivity"
date: "2023-03-02"
author: "Alfin Surya"
coverImage: "https://assets.website-files.com/63f2b1af8b98d1733162ebc2/63f39b58f3679317969e42a1_61017910c94166551954cb5a_rT1WACMRnvq_SryU_V2Ks7D8YYj6TSIXwU6eGErUw5mfO7fXrEgGB1GsRv2rrR-qsHQjEOefk1jdaNjBryHwkMzaS_dhhvNBHqEaRzDsadJ8PSg5rg6SglitVyro6GsYCo_3IQrX.gif"
favorite: "yes"
---

_Tingkat produktivitas setiap individu itu bersifat relative_. 
Menurut saya ini bisa dilihat dari : 
1. Waktu yang dibutuhkan dalam proses pengerjaan
2. Seberapa besar / penting masalah yang dihadapi
3. **Code quality (may be drastically different from what another individual value)**

> Biasanya ini tergantung perasaan aja, dan orangnya juga. Kalau kondisi lagi bagus kapasitas bisa lebih tinggi 100% dalam 8 jam. Ada yang 100% dalam 10 jam. Kalau lembur bisa 120% - 130%. 

Jujur dari 3 kriteria diatas, yang paling relate 'apakah saya hari ini produktif atau ngga?' itu yang nomor 3. Alasannya, entah kenapa **kalau lagi nulis kode kalau kualitas codenya bagus rasanya happy aja**. 

Ukuran bagus ini bisa dilihat dari:
- Apakah kode nya mudah dibaca? (even itu buat junior programmer)
- Apakah mudah di refactor nantinya? Misal, nanti ada perubahan data structure atau penambahan fitur apa perubahannya sulit diterapkan?
- [Robust](http://nob.cs.ucdavis.edu/bishop/secprog/robust.html) codes? Code yang kamu tulis sedetail mungkin **toleransi terhadap kesalahan** yang akan terjadi. Sehingga jika ada error, program tetap bisa meng-handle dengan baik dan memberikan informasi yang cukup bagi penulis kode.
```ts
const copyToClipboard = (str: string) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(str);

    // error handling
    return Promise.reject('The Clipboard API is not available.'); 
}; 
```
- _Less code is better but doesn't mean perfect_. Ini berkaitan dengan masalah duplikasi kode, atau yang kita kenal [DRY Code](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Dalam menulis kode sebisa mungkin saya menghindari duplikasi, rasanya terlihat kurang anggun. Upaya yang bisa dilakukan bisa dengan modularization. 

> **Principle: Buat sesuatu yang bisa diubah sefleksibel mungkin, bukan hanya bisa digunakan kembali**

```ts
type VersionTree = { 
  version: number;
  // children?: Version[]
}

const versions: Version[] = [
    { version: "0.9" },
    { version: "1.0" },
];

const findVersionTree = (versions: VersionTree[], search: string) => {
    let result = ``
    items.forEach((item) => {
        if (item.version === search) {
            result = `${item.version}`
        }
    })
    
    return `Version ${result}`.trim()
}
```

Tujuan fungsi diatas sudah jelas yaitu untuk mencari struktur versions tree. Tapi akan jadi masalah jika struktur datanya nested :(

```ts
const versions: VersionTree[] = [
    ...
    {
        version: "1.0",
        children: [
            {
                version: "1.0.1",
                children: [
                    {
                        version: "1.1.1",
                        ...
                    },
                ],
            },
            ...,
        ],
    },
];
```

Saya pikir pembaca sudah tahu apa yang harus dilakukan. **Rec..Rec..Rec..Rec..Rec..Recursive call!!!** Yapppp memang sih kalau udah masalah model pohon2 gini  umumnya pakai recursive, dan kebetulan saya juga suka konsep ini. _Mind blowing_ 

```ts
// non DRY code
findVersionTree(versions, '1.0')
findVersionTree(versions[1].children!, '1.0.1')
findVersionTree(versions[1].children![0].children!, '1.1.1')

// DRY code
const findVersionTreeRec = (items: Version[], search: string, separator = '->') => {
  let result,
    node = ``;

  items.forEach((item) => {
      const isMatch = item.version === search
      const nextSeparator = !isMatch ? separator : ''
      
      if (isMatch) {
        result = `${item.version}`
      }

     if (item.children && item.children.length) {
          node += `${item.version} ${nextSeparator}`
          result = `${node} ${findVersionTreeRec(item.children, search)}`
     }
  })

  return `Version ${result}`.trim()
}

findVersionTreeRec(versions, '1.1.1')
// ^ Version 1.0 -> Version 1.0.1 -> Version 1.1.1
```
> Mungkin kamu tertarik coba untuk optimize code ini?

Dalam hal modularization untuk membuat sesuatu yang reusable, saya pikir ada 5 hal yang harus dipahami:
1. Constructor,
2. Accessor, 
3. Mutator, 
4. Validator, 
5. Adapters/middleware

Konsep ini banyak digunakan module/library open source diluar sana. Karena produknya digunakan banyak orang bahkan seluruh dunia. Jdi kebutuhannya dibuat sefleksibel mungkin supaya pengguna bisa menggunakan produk tersebut dengan mudah, dan tidak perlu repot2 kalau misal nanti ada custom module. 

Contohnya [MUI](https://github.com/mui/material-ui/tree/master/packages/mui-base) selain tersedia komponen yang udah siap pakai, mereka juga provide component base nya alias yang belum ke style, cara ini bagus kalau misal kamu mau buat design system sendiri. Dan kalau kamu lihat struktur codebase mereka itu rapi, saya banyak belajar dari situ untuk buat komponen internal hehe.

- Good [abstraction](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction).

[//]: # (
https://ibb.co/JqVq7X7
https://ibb.co/0CQBftt
https://ibb.co/7NgBcpL
https://ibb.co/12ddWs6
)
## Mulai dengan Kopi
<img src="https://i.ibb.co/tKdpgMj/3-CA4-B318-533-E-433-B-B071-01-F83957-BB62.jpg" style="object-fit: cover; width: 100% !important; height: 550px !important;" width="100%" alt="Kopi" border="0">

Kopi memang bukan rahasia lagi ya, ini bisa boost up mood dan focus saya kalau lagi kerja. Saya biasa brew sendiri dirumah, jdi nyetok beans sm susu fresh milk perpaduan yang sangat nikmat. Pengeluaran cost juga jauh lebih murah daripada harus ke coffee shop.

Sebenernya dulu saya ga anak kopi bgt, minum kopi paling yang sachetan. Cuman karena waktu itu sempet buka [usaha kopi](https://www.instagram.com/blackseeds.co/) kecil2an mau gamau harus belajar kopi dong. Jadi beli alat-alat kopi yang notabene ga murah. Langsung dicoba tuh semua belajar makin dalem semakin paham tentang kopi akhirnya sadar _wajar kopi itu harganya mahal_ karena prosesnya panjang mulai dari proses tanam, roasting, dan sampai siap minum.

Beans favorit saya:
- [Space roastery](https://www.tokopedia.com/spaceroastery/byob-build-your-own-blend-paket-200gr-arabica-200gram-fine-robusta?extParam=whid%3D657230)
- [NOA Coffee roaster](https://www.instagram.com/noa.coffeeroasters/)
- [Excelso Kalosi Toraja](https://www.tokopedia.com/excelsoofficial/excelso-kopi-single-serving-kalosi-toraja-folding-box-10-sch-x-10gr?extParam=ivf%3Dfalse%26src%3Dsearch)

> Susu ini best lah untuk campuran kopi [green fields premium fresh milk](https://www.tokopedia.com/frmarket99/greenfields-premium-fresh-jersey-milk-1000-ml?extParam=ivf%3Dfalse%26src%3Dsearch&refined=true) rasanya creamy (cocok kalau mau buat flat white)

## Brainstorming
Biasanya brainstorming identikan dilakukan sm team, tapi bisa juga dilakukan oleh diri sendiri. Waktu yang bagus untuk brainstorming i think pagi2 sebelum mulai kerja, biasanya saya suka baca-baca artikel yang menarik, lihat beberapa video conference, lihat github repo yang bagus. 

Tujuan brainstorm ini supaya sudut pandang dan perspektif dalam memahami masalah bisa lebih luas, dan banyak ilmu-ilmu baru yang didapat. Terus kalau menarik dan relate saya  catat di notes atau bahkan nulis di blog biar ga lupa.

## Focus on one thing
![Focus](https://images.squarespace-cdn.com/content/v1/52d481cbe4b0e9203b293536/1614743005410-W9RC4YFYKFLXXSYDM5PS/One+Thing.png?format=1000w "Focus")

> Peneliti membuktikan bahwa orang yang mencoba mencapai banyak tujuan kurang berkomitmen dan lebih kecil kemungkinannya untuk berhasil dibandingkan mereka yang berfokus pada satu tujuan.

Saya setuju dengan pendapat diatas, gatau apa karena seorang laki2 tidak sepandai multitasking wanita. Kadang saya review diri saya sendiri, a*da perbedaan yang signifikan kalau saya focus di satu hal daripada multitasking*. Misal saya ada task untuk buat fitur A, terus ada bugs atau enhancement di fitur lain masing2 punya bobot sendiri. 

Dalam satu waktu tersebut biasanya goalsnya selesai. Masalahnya berjalan _dikejar oleh waktu, hasil belum tentu._ Ini perbedaan saya ketika saya coba focus on one thing, daripada sebelumnya

<img style="width: 500px !important;" src="https://i.ibb.co/Tt1tXzq/Screen-Shot-2023-03-02-at-10-05-04.png" alt="Screen-Shot-2023-03-02-at-10-05-04" border="0">

1.162 deletions cukup banyak reducenya dan code yang dihasilkan jauh lebih baik :)

## Play with my cat
<img src="https://i.ibb.co/5cnnHYF/IMG-1735.jpg" style="object-fit: cover; width: 100% !important; height: 190px !important;" width="100%" alt="IMG-1735" border="0">

Sorry ya ada foto kucing saya disitu dia lagi tidur diatas lemari, cuman lucu aja gemoy -,-. Namanya **BOY** karena dia laki2. Kalau saya lagi kerja disempet2 in tuh main kejar2an sm dia. Ini secara ga langsung ngaruh loh buat suasana hati, apalagi kalau lgi burnout butuh break dlu, breaknya main kucing xixixi. Apa kamu punya kucing?

> Sebuah studi Swiss baru-baru ini merekrut 212 pasangan dengan kucing dan membandingkan bagaimana kucing dan pasangan mereka memengaruhi suasana hati mereka. Hasil mereka menunjukkan bahwa, sejalan dengan penelitian sebelumnya, kucing dapat meredakan suasana hati yang negatif tetapi tidak mungkin meningkatkan suasana hati yang positif. Suasana hati positif orang lebih banyak diasosiasikan dengan pasangannya.

## Type Systems
Theorynya type systems merupakan sebuah mekanisme untuk mencegah terjadinya kesalahan program dengan adanya instruksi tertentu. Instruksi ini akan berjalan saat kompilasi program. 

Ini meningkatkan produktivitas saya sebagai seorang programmer, dengan adanya type systems kesalahan program bisa lebih sedikit karena ada yang menjaga. **Type systems sebagai jaminan, dan contract** antar data atau yang terkait. Konsistensi itu penting, bayangkan:

```js
let num = 0;
num = num + "alfin" // nope
```

Saya anggap type systems ini representasi design dari sebuah program. Sebelum do anything write types / models first. Bahasa seperti haskell, maupun typescript bagus untuk dicoba kalau ingin mendalami type sytems.

> Cost nya programmer selalu dituntut secara gamblang untuk explicit mendifinisikan types, dan butuh lebih banyak waktu dan ketegangan saat berhadapan dengan type systems, karena kalau type system nya ngomel program ga akan jalan :) 

## Nothing is perfect
Kita sebagai manusia memang harus menyadari ini, tidak ada yang sempurna. Dengan prinsip ini saya mengerti batasan mana yang harus diambil, begitu juga tentang kapasitas diri. Everybody's has a choice, sekarang tinggal apa pilihannya? Dan gimana prosesnya?

Thanks sudah baca!