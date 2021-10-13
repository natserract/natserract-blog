---
title: "Run Your Function Only Once"
date: "2021-09-17"
author: "Alfin Surya"
excerpt: "Terkadang di beberapa kondisi mungkin kita perlu menjalankan suatu fungsi hanya sekali meskipun pemanggilannya berkali-kali. Ini bisa terjadi"
---

Terkadang di beberapa kondisi mungkin kita perlu menjalankan suatu fungsi hanya sekali meskipun pemanggilannya berkali-kali. Ini bisa terjadi, tergantung kondisi dan case masing-masing. Contohnya dibeberapa case seperti:

- Randoming number (first execution)
- Handling event
- Operasi basis data
- Dan operasi lainnya

Pada case kali ini, saya hanya ingin memanggil fungsi `fn()` ini hanya sekali melalui event *onClick* 
<!-- https://www.scratchcode.io/wordpress-run-function-only-once/ -->

```ts
type Ref<T> = React.MutableRefObject<T>

const callFnOnce = (
  fn: (...fnArgs: any) => void,
  executedRef: Ref<boolean>,
) => (value: boolean) => {
  if (!executedRef.current) {
    fn(value);
    executedRef.current = true;
  }
};

```
>Fungsi diatas merupakan sebuah [higher order function](https://medium.com/paradigma-fungsional/higher-order-function-paradigma-fungsional-praktis-part-4-c836bd23a82) karena menerima parameter `fn` sebagai fungsi. 

Dimana ketika nilai reference awal adalah **false** maka fungsi `fn` baru akan dijalankan. Setelah itu nilai reference diubah menjadi nilai sebaliknya yang dimana value tersebut adalah sebuah trigger value untuk menghentikan proses berikutnya. Lihat implementasinya pada code dibawah ini:
```ts
const fn = (value: boolean) => {
  console.log("This will be displayed only once!", value);
};

export default function App() {
  const isExecuted = useRef(false)

  const handleClick = () => {
    const callFn = callFnOnce(fn, isExecuted);
    callFn(true)
  }
  
  return <button onClick={handleClick}>Click Me!</button>
}

// Result: This will be displayed only once! true
```

Implementasi diatas menggunakan [useRef](https://reactjs.org/docs/hooks-reference.html#useref) sebagai penyimpanan state execution-nya, alasannya karena perubahan pada ref `.current` tidak menyebabkan re-render, berbeda dengan [useState](https://reactjs.org/docs/hooks-reference.html#usestate). Jadi meskipun action event *onClick* ini dipanggil berkali-kali, fungsi `fn` akan tetap ter-eksekusi hanya sekali. 

Sekian, semoga artikel ini bermanfaat. Thanks for read!