---
title: "Method Overidding, Monkey Patching"
date: "2021-09-17"
author: "Alfin Surya"
excerpt: "Monkey patching atau tambalan monyet ini merupakan istilah yang merujuk pada perubahan kode, dimana pada intinya ini adalah sebuah cara/teknik untuk memperluas"
coverImage: "https://i.kym-cdn.com/entries/icons/facebook/000/000/521/13809242.b4f8cba9.1200x1200o.60dc4f38b621.jpg"
---

Huh, setelah sekian lama ga nulis lagi, kali ini saya mencoba untuk sharing kembali, karena saya pikir aga eman kalau ga dishare. Oke langsung ke topik saja, akhir-akhir ini saya lebih banyak berkutat pada hal-hal yang bersangkutan dengan diagram. Library yang saya gunakan adalah [MxGraph](https://jgraph.github.io/mxgraph/), walaupun proses pengembangannya berhenti tapi lib ini cukup mumpuni dikelasnya dan masih layak untuk digunakan (dengan alasan yang cukup hati2). 

Library ini saya pikir cukup lengkap dari segi API dan dokumentasinya, selain itu lib ini juga support di beberapa bahasa pemrogaman. Selama proses development, terkadang di beberapa case saya, ada beberapa API yang membutuhkan konfigurasi tambahan ataupun modifikasi, maka dari itu saya melakukan pendekatan yakni salah satunya dengan teknik [monkey patching](https://en.wikipedia.org/wiki/Monkey_patch).

**Monkey patching atau tambalan monyet** ini merupakan istilah yang merujuk pada perubahan kode, dimana pada intinya ini adalah sebuah cara/teknik untuk memperluas atau memodifikasi kode/API yang sudah ada tanpa harus merubah kode aslinya. Menarik bukan? Cara ini juga telah digunakan oleh beberapa library seperti [Moo Tools](https://github.com/mootools/mootools-core), dan [Zone.js](https://medium.com/reverse-engineering-angular/angular-deep-dive-zone-js-how-does-it-monkey-patches-various-apis-9cc1c7fcc321) untuk melakukan tugasnya.

Saya akan berikan contoh sederhana dari Monkey Patching untuk men-debug kode menggunakan API [console.log](https://developer.mozilla.org/en-US/docs/Web/API/console/log) dengan **tambahan timing** setiap metode ini dipanggil. 

```js
const debug = console.log

console.log = function(){
  return debug.apply(this, [String(new Date())].concat(arguments))
}
```
Yang dilakukan pada kode diatas yakni bukan mengubah fungsi aslinya, tetapi justru menambahkan beberapa fungsi didalamnya.
Jadi setiap fungsi `console.log` dipanggil, maka akan mengembalikan sebuah nilai sesuai arguments-nya, beserta *time execute* nya. 

## Prototipe
Selain cara diatas, pendekatan yang bisa dilakukan bisa menggunakan **rantai prototipe**, lihat kode berikut:

```js
function Lists() {}

Lists.prototype = {
  map: function(items){
    return items.map(v => v)
  }
};

const newCount = Lists.prototype.map

// Set Lists prototype to a new instance 
Lists.prototype.map = function (items) {
  const isObject = typeof items === "object";

  if (isObject) {
    const isHaveItems = !!items.length;

    if (isHaveItems) {
      return newCount.apply(this, arguments);
    } 

    console.error('Your items is empty!')
    return items
  }

  console.error('Is not Array!')
  return new Error()
};

// Create new Lists instance
const lists = new Lists() 

lists.map([1, 2, 3]);
```
Javascript sering digambarkan sebagai bahasa berbasis prototipe yang artinya setiap *Prototype* pada JavaScript hanya memiliki satu **konstruktor objek**. Setiap objek memiliki properti pribadi yang menyimpan tautan ke objek lain yang disebut prototipenya. Gambarannya seperti ini:

![Screen Shot 2020-12-22 at 23.26.00.png](https://mathiasbynens.be/_img/js-engines/anchor-prototype-chain.svg)

Ini seperti rantai, satu konstruktor mempunyai child object dibawahnya, masing2 objek prototipe itu memiliki prototipe sendiri, dan seterusnya sampai objek tercapai dengan null sebagai prototipenya. 

>"Everything in JavaScript acts like an object, with the only two exceptions being null and undefined."

Monkey patching memang teknik yang unik menurut saya, tetapi dalam sebagian besar kasus teknik ini juga berbahaya dan dapat menyebabkan masalah karena semuanya bersifat global dan rentan terjadinya konflik. Oleh karena itu sebisa mungkin untuk menghindarinya, tapi bagi yg penasaran ini mungkin ada solusi lain untuk menggunakan teknik monkey patching dengan aman [monkey patching solution](https://dev.to/lionelrowe/comment/1i1k1). 

Thanks for read!

#### Referensi
- [https://www.audero.it/blog/2016/12/05/monkey-patching-javascript/](https://www.audero.it/blog/2016/12/05/monkey-patching-javascript/)
- [https://medium.com/@iampika/master-the-weird-parts-of-the-javascript-5bc8be7ce441](https://medium.com/@iampika/master-the-weird-parts-of-the-javascript-5bc8be7ce441)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)