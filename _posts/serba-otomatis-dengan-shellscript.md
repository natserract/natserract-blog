---
title: "Serba Otomatis dengan Shell Script"
date: "2020-05-08"
author: "Alfin Surya"
excerpt: "Tingkatkan produktivitas kerja Anda dengan shellscript. Bagi kalian yang mau cepet, dan serba otomatis mungkin ini bisa bermanfaat buat kalian. 
Nah, shell script?  fungsinya buat apa?, shell script sebenernya adalah sebuah bahasa pemrograman yang berfungsi sebagai jembatan antara user dan kernel untuk menjalankan perintah2 Unix/Linux shell."
coverImage: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F1Z4aXa0t4r8%2Fmaxresdefault.jpg&f=1&nofb=1'
---

Bagi kalian yang mau cepet, dan serba otomatis mungkin ini bisa bermanfaat buat kalian. 

Nah, shell script?  fungsinya buat apa?, shell script sebenernya adalah sebuah bahasa pemrograman yang berfungsi sebagai jembatan antara user dan kernel untuk menjalankan perintah2 Unix/Linux shell.

Fungsinya sendiri sangat banyak, salah satunya hacking, tpi disini bukan bahas hacking ya, tpi lebih ke optimisasi waktu, contohnya running multiple nodejs script untuk nge-watch scss, javascript, ataupun jalanin http server. Biasanya kita ketik manual di terminal, dengan new-tab2, contoh:

**WindowA**: watch --sass
**WindowB**: watch --js
**WindowC**: serve --js

Sungguh, tidak efektif bukan? Nah, dengan shell script kamu bisa dengan mudah menjalankan itu semua dengan satu kata **BOOOM**

Contoh casenya kali ini adalah, ceritanya bambang lagi buat project Angular, dan dia ada requirements untuk membuat [**custom web component**](https://angular.io/guide/elements), dimana setiap component punya satu file bootstraping (contohnya seperti ini: [manually bootstrap angular app](https://medium.com/angular-in-depth/how-to-manually-bootstrap-an-angular-application-9a36ccf86429) )

Struktur direktorinya seperti ini:

```sh
├── components
    ├── button                   
    ├──── button.module.ts
    ├──── compile.ts                     
    ├── slider                   
    ├──── slider.module.ts
    ├──── compile.ts  
```

Dan isinya sekilas seperti ini:

-> button.module.ts
```ts
@NgModule({
  imports: [BrowserModule, ComponentModule],
  entryComponents: [ButtonComponent],
})
export class ButtonElementModule extends RootElementModule {
  constructor(
    injector: Injector
   ){
    super(injector, ButtonComponent, 'button');
   }
}
```
-> compile.ts
```ts
enableProdMode();

platformBrowserDynamic().bootstrapModule(ButtonElementModule)
.catch(err => console.error(err));
```

Running: 
```sh
ng run library:build:production --aot --output-path=tmp/button --main="components/button/compile.ts"
```

Dan outputnya seperti ini:
- runtime-es2015.js
- runtime-es5.js
- polyfills-es5.js
- polyfills-es2015.js
- main-es2015.js
- main-es5.js

Terus si atasan minta, itu hasil buildnya di jadiiin satu file aja, biar ga kebanyakan integrasi js file, atasan juga minta nanti dibuildnya per-component ya, terus atasan juga minta nanti file/folder ini di include in ya di build foldernya, terus atasan minta ini minta itu, hmm..

Nah, coba bayangkan kamu melakukan itu semua manual, apalagi kalo komponennya sudah banyak? *Aduh cape deh.*.....

 Maka dari itu, kita bisa menggunakan bantuan shell script untuk mempercepat dan menyelesaikan semua proses tersebut! 

Hasil kodenya seperti ini:
```sh
#!/bin/bash
search_dirs=($(ls components/))
rm -rf ./dist/library/
mkdir ./dist/library

for dir in ${search_dirs[*]}; do
    ng run library:build:production --aot --output-path=tmp/${dir} --main="components/${dir}/compile.ts"
    cat ./tmp/${dir}/{runtime,polyfills,main}-es5.js > ./tmp/${dir}.js
    cp -r ./tmp/${dir}.js ./dist/library
    rm -rf ./tmp/
done
```

Penjelasan kode diatas adalah dimulai dari line pertama, dimana karena kali ini kita menggunakan bash, jdi dimulai dengan `#!/bin/bash`

Selanjutnya, kita nge-find direktori apa aja yang ada di folder *components/*, nantinya resultnya berupa array

Dibagian ini:
`rm -rf ./dist/library/ mkdir ./dist/library`, fungsinya untuk hapus directory yg sudah exists, simplenya: delete -> create -> delete -> create

Setelah itu, karena sudah dapet list folder apa aja yang ada di folder *components/*, kita pake for loop, dan tinggal sesuain aja sama param nya.

Note:
-  `ng run`: command dari angular cli untuk running
-  `cat`: untuk concat/gabungin semua file
- `cp`: untuk copy file/folder, pake option -r biar bisa copy file sm folder
-  `rm`: untuk delete file/folder