---
title: "Angular DOM Manipulation"
date: "2020-07-09"
author: "Alfin Surya"
excerpt: "Manipulasi DOM menggunakan renderer, no jQuery!"
---

Bagi pengguna Angular, mungkin sudah pernah menggunakan ataupun pernah dengar apa itu `Renderer`. Fitur ini sudah muncul sejak Angular versi 4. Bagi kamu pengguna Angular 8/9, saatnya bermigrasi ke `Renderer2`. Alasannya bisa kalian baca disini: [Renderer to Renderer2 migration](https://angular.io/guide/migration-renderer)


Sebelum lebih jauh, kita harus fahami dlu apa itu DOM, DOM atau **Document Object Model**, adalah dokumen (HTML) yang dimodelkan dalam sebuah objek, simplenya DOM adalah keseluruhan dokumen html yang dibentuk saat web diload oleh browser pertama kali. Jadi dengan DOM HTML ini kita dapat melakukan berbagi manipulasi pada element HTML, seperti: get, add, change, add atau delete.

![WAW](https://i.redd.it/3t9ltfiw2zv01.png)

Jika kamu pengguna Angular yg sebelumnya terbiasa dengan Jquery, maka tidak menutup kemungkinan kamu akan memilih Jquery sebagai pilihan pertama jika ketemu case seperti ini (bisa jadi) 😅, karena.. ya tentunya krn jquery sudah memanjakan penggunanya lewat API2nya dia. So, ini tidak recommended ya, kalo mau tau alasannya bisa baca disini: [STOP TRYING TO USE JQUERY IN ANGULAR](https://docs.angularjs.org/misc/faq#common-pitfalls)

Okey, di case kali ini kita akan langsung bermain dengan `Renderer2`.

## Membuat element
Jika di jquery untuk membuat element kamu bisa melakukannya seperti ini: `$("<div/>").appendTo("div#main");` cukup mudah bukan? 😅. Nah, mulai sekarang klo bisa kurang-kurangin / tinggalkan cara pandang jquery ini ya, krn di Angular caranya cukup berbeda.

Code:
```ts
export class CreateElComponent implements OnInit {
    constructor(
        private renderer: Renderer2,
        private hostElement: ElementRef,
    ) {}

    ngOnInit() {
        const createLabelEl = this.renderer.createElement('label');
        const createInputEl = this.renderer.createElement('input');

        this.renderer.setStyle(createLabelEl, 'display', 'block');
        this.renderer.setAttribute(createInputEl, 'type', 'text');
        
        this.renderer.appendChild(createLabelEl, createInputEl);
        this.renderer.appendChild(this.hostElement.nativeElement, createLabelEl);
    }
}
```

Pada code diatas, proses pembuatan element dilakukan di `ngOnInit()` jdi ketika Angular sudah selesai membuat component. Kemudian terdapat beberapa function disana contohnya `createElement()` yg fungsinya utk membuat element, lalu `setStyle()` dan `setAttribute()` untuk menambahkan style dan attribute di element tersebut, selengkapnya kamu bisa baca disini: [Renderer2 Doc](https://angular.io/api/core/Renderer2). Setelah komponen dibuat, maka komponen di append dengan komponen rootnya.

Jadi simplenya, `Renderer2` ini tugasnya merender/menampilkan element yang sudah dibuat, kemudian `ElementRef` tugasnya sebagai component reference dari `Renderer2`, contohnya: membuat element, select element, etc.

## Custom Directive - Add/Remove Class
Seperti yang dijelaskan sebelumnya, kamu bisa menggunakan `Renderer2` ini di custom directive

```ts
@Directive({
    selector: `custom-directive, [customDirective]`,
    host: {
        'class': `custom-directive`
    }
})
export class CustomDirective {
    constructor(
        private renderer: Renderer2, 
        private hostElement: ElementRef
    ) {}

    isClicked = false;

    @HostListener('click', ['$event.target'])
    _onClick() {
        this.isClicked = !this.isClicked;

        switch (this.isClicked ) {
            case true: {
                this.renderer.addClass(this.hostElement.nativeElement.parentNode, 'isActive');
                break;
            }
            case false: {
                this.renderer.removeClass(this.hostElement.nativeElement.parentNode, 'isActive');
                break;
            }
        }
    }
}
```
Pada directive `custom-directive` ini, ketika terdapat event `click`, maka akan mentoggle sebuah class *isActive*, kamu bisa menggunakan fungsi `@HostListener()` untuk menghandle events yang ada pada element directive ini.

## Selecting elements
Kadang kala kamu ingin memilih suatu element, misalnya by id, class, ataupun tagname. Kamu juga masih bisa menggunakan API2 yg ada seperti di vanilla js (not jquery)

```ts
export class SelectingElComponent implements OnInit, AfterViewInit {
    constructor(
        private renderer: Renderer2, 
        private hostElement: ElementRef
    ) {}

    ngAfterViewInit(){
        const findInputEl = this.hostElement.nativeElement.querySelector('input[type="checkbox"]');
        const findAllBtnEl = this.hostElement.nativeElement.querySelectorAll('button');
        const hasClass = this.hostElement.nativeElement.classList.contains('container');

        console.group(
            findInputEl,
            findAllBtnEl,
            hasClass
        );
    }

    ngOnInit(){
        setTimeout(() => {
            // For alternative
        }, 1)
    }
}
```
Catatan disini, jdi selain menggunakan `ngAfterViewInit()` lifecycle, kamu juga bisa menggunakan `setTimeout()` sbg alternative untuk mendetect suatu element, karena kadang kala terdapat beberapa case dimana kita ingin mendetect suatu element selain di `ngAfterViewInit()` contohnya di constructor, jika tanpa `setTimeout()`, tentunya outputnya akan undefined, karena fungsi dipanggil sebelum component/directive dirender.

Thanks.