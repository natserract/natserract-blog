---
title: "React Optimization Techniques"
date: "2021-10-01"
author: "Alfin Surya"
excerpt: "Ways to Optimize Your React App's Performance"
---

Didalam pengembangan sebuah software **performance** merupakan salah satu faktor penting yang harus diperhatikan, karena ini menyangkut tentang kinerja dari software itu sendiri yang nanti langsung berdampak pada end-user, dan begitu juga bisnis. 

Pada tulisan ini saya buat, fokus pada topik bagaimana cara/teknik2 optimisasi performance di React. Diluar sana banyak sekali tulisan2/artikel yang membahas bagaimana meningkatkan performance di React, maka dari itu disini saya lebih spesifik ke arah optimisasi menggunakan teknik [memoisasi](https://en.wikipedia.org/wiki/Memoization). 

Memoisasi bisa disebut teknik optimisasi untuk meningkatkan kinerja suatu program dengan menyimpan hasil (cache) pemanggilan **fungsi yang mahal** dan mengembalikan hasil yg dicache sebelumnya. Fungsi yang mahal atau expensive function ini mengacu pada proses yang memakan waktu yang dapat memperlambat aplikasi.

![Web Caching](https://wpengine.com/wp-content/uploads/2014/06/cached_workflow.png)

Seperti data server, hasil disimpan di cache lalu dicek apakah value yg sebelumnya dan sekarang berbeda atau tidak?, jika berbeda maka cache akan diperbarui, begitu juga sebaliknya. Ini seperti lifecycle [`componentDidUpdate()`](https://reactjs.org/docs/react-component.html#componentdidupdate) di React

## Preventing The Re-Creation of a Function
Mencegah fungsi baru dan rendering ulang yang tidak perlu, untuk mengindari masalah ini yaitu dgn menggunakan `useCallback()`. Sebenernya hooks ini sudah saya jabarkan [disini](https://github.com/natserract/react-hooks-deepdive/blob/main/src/app/useCallback/index.tsx), cmn saya jelaskan secara garis besar saja. 

Jdi cara kerjanya lagi2 tentang caching, fungsi disimpan dicache lalu akan dikembalikan ke panggilan, dan kemudian dibuat kembali jika nilai dependensinya berubah.

> Fact: Setiap komponen itu di render/re-render, function akan dibuat ulang

Perhatikan fungsi mahal disini:

```jsx
function ExpensiveFunc() {
  let now = performance.now();
  while (performance.now() - now < 200) {
    // Artificial delay -- do nothing for 200ms
  }

  return now
}
```

`index.tsx`
```jsx
import React, { useCallback, useState } from "react";

const functionLogs = new Set();
const functionLogsWCallback = new Set();

export default () => {
  const [state, setState] = useState(NaN)

  const handleClick = () => setState(ExpensiveFunc())
  const handleClickWCallback = useCallback(() => setState(ExpensiveFunc()), [])

  functionLogs.add(handleClick);
  functionLogsWCallback.add(handleClickWCallback);

  console.log(`handleClick created: `, functionLogs.size, ' times');
  console.log(`handleClickWCallback created: `, functionLogsWCallback.size, ' times');
 
  ...
}
```
Setiap komponen dirender, fungsi `handleClickWCallback` tidak akan dibuat ulang, sedangkan fungsi `handleClick` terus dibuat ulang jika terjadi re-render. Optimisasi ini diperlukan, karena fungsi yang dipanggil `ExpensiveFunc` mahal, bisa dilihat di React Profiler perbedaan baseDurations nya.

> Catatan perbedaan: `useCallback` untuk memoize fungsi, `useMemo` untuk memoize value/objek/variabel, dan `memo()` untuk memoize component

## Caching Fetch Data
Permintaan data/API ke server akan berjalan pertama kali setiap komponen di-render atau dipicu. Begitupun juga saat pindah halaman, proses fetching dan rendering komponen akan dilakukan lagi. Ini bisa menjadi masalah bagi aplikasi yang menerapkan **offline first** alias aplikasi yang tidak membutuhkan koneksi internet *setelah sinkronisasi awal*.

Case kali ini saya menggunakan **context** untuk menyimpan hasil cache-nya

`Store.ts`
```jsx
import { createContext, useState, createElement, useContext, useRef } from 'react'
import { get } from './utils'

type Context<T> = T | (T | ((a: T) => void))[]
type Dispatch = (...args: any) => void

type CachedData = {
  [u: string]: any
}

const CachedDataCtx = createContext<Context<CachedData>>({})

export function useCachedData<T>() {
  return useContext(CachedDataCtx) as [T[], Dispatch]
}

export const CacheDataProvider: React.FC = ({ children }) => {
  const cache = useRef<CachedData>({})
  const [data, setData] = useState([])

  const setCachedData = (url: string) => {
    let cachedData = cache.current[url]

    const onFetch = async () => {
      const responses = await get(url)
      cache.current[url] = responses

      setData(cachedData)
    }

    if (!cache.current[url]) {
      onFetch()
    } else {
      setData(cachedData)
    }
  }

  const value = [data, setCachedData]

  return createElement(CachedDataCtx.Provider, { value }, children)
}

export const AllContextProvider: React.FC = ({ children }) => createElement(
  CacheDataProvider,
  null,
  children,
)
```
> Namun di beberapa source yang saya lihat ada yg disimpan di localstorage/session, tpi case kali ini karena hanya berlaku selama aplikasi itu hidup jadi pakenya context

`useQueryCached.tsx`
```jsx
import { useEffect } from 'react'
import { useCachedData } from './Store'

export function useQueryCached<T = Record<string, any>>(url: string) {
  const [data, setCachedData] = useCachedData<T>()

  const fetchData = () => setCachedData(url)

  useEffect(fetchData, [fetchData])

  return { data }
}
```
So, cara kerja code diatas cukup simple:
```jsx
Context -> Ref -> State
 ```
Data hasil request dari server/API di store melalui context, lalu disini ada proses pengecekan Ref apakah field dengan id url tersebut sudah dibuat, jika belum maka fetch dilakukan dan nilai ref diisi oleh result api tadi. Setelah itu baru value pada State diubah. Namun, jika id url pada Ref tersebut sudah ada, maka proses fetch tidak lgi dilakukan, dan State diisi oleh nilai Ref. Ref disini hanya sebagai *penyimpanan sementara/temporary*.

Catatan disini, ingat State dan Ref diatas berlaku global karena di-initial di Context, dan perubahan Ref tidak menyebabkan [re-render](https://github.com/natserract/react-hooks-deepdive/tree/main/src/app/useRef). Jadi tidak perlu melakukan proses rendering berulang-ulang.

```json
[
  {
    "name": "Ref",
    "value": {
      "https://jsonplaceholder.typicode.com/users/": [...]
    },
  },
  {
    "name": "State",
    "value": [...],
  }
]
```
Hasilnya, meskipun terjadi perpindahan Routes proses fetching tidak akan dilakukan lagi.

## Preventing Rerenders Component
Untuk case ini, kita menggunakan kasus kedua caching fetch data menggunakan context. Secara konseptual, [Context](https://id.reactjs.org/docs/context.html) adalah sebuah cara berbagi data (global) antar komponen dimana semua komponen consumernya bisa mengakses nilai dari Context tersebut. 

Context dilengkapi dengan komponen `Provider` sebagai penyedia Objek/Store dan `Konsumer` digunakan untuk mengakses nilai Context. Semua konsumer yang merupakan keturunan Provider **akan render ulang setiap kali value dalam Provider berubah**.

```jsx
const Parent = () => {
  return (
    <AllContextProvider>
      ...
    </AllContextProvider>
  )
}
```
> The propagation from Provider to its descendant consumers (including .contextType and useContext) is not subject to the shouldComponentUpdate method, so the consumer is updated even when an ancestor component skips an update.

Ini menyebabkan semua komponen turunannya akan secara otomatis dirender, akibatnya terjadi proses perenderan yang tidak perlu/sia-sia. Untuk itu coba kita lihat log dibawah ini *(klik button re-render parent*):
```jsx 
child of ChildWithoutMemo
child of ChildWithMemo
```
Dari log diatas, kita bisa melihat bahwa setiap perubahan yg terjadi pada Context, komponen turunannya di render ulang. Begitupun juga saat parent di render, semua komponen childnya juga akan re-render. Maka dari itu disini kita coba optimalkan:

`Store.jsx`
```jsx
const cache = useRef<CachedData>({})

// Prevents unnecessary renders
const value = useMemo(() => [data, setCachedData], [data, setCachedData])
```
Variabel value kita ubah menggunakan `useMemo`, ini  mengembalikan nilai dari hasil kembalian `useMemo` yang terdiri dari `data`, dan `setCachedData` berupa desctructuring array. Nilai reference `cache` disana menggunakan `useRef`, tujuannya utk melacak perubahan data dari result API tanpa proses re-render. Jadi `useMemo` tidak perlu melacak perubahan pada Ref `cache`. 

> Usually if you want a value that is not in any way connected to the render cycle and that will be stable during the lifetime of the component I would go for `useRef`. But useRef does not support an initializer function as does `useState` or `useMemo`.

Pendekatan dgn `useMemo` ini dilakukan bukan semata-mata untuk mencegah perenderan ulang, karena jika nilai dependensi berubah proses perenderan akan tetap terjadi, tetapi melainkan untuk pengoptimalan kinerja. Usaha pengoptimalan dilakukan by case jgn terburu-buru, mungkin saja pendekatan bisa dilakukan dgn `useRef` karena biaya penggunaan `useMemo` mungkin bisa lebih besar.

Tapi sebentar, sepertinya ada yg terlewatkan? ternyata terdapat peringatan dari es-lint: `The 'setCachedData' function makes the dependencies of useMemo Hook (at line 42) change on every render. Move it inside the useMemo callback. Alternatively, wrap the definition of 'setCachedData' in its own useCallback() Hook`. Maka dari itu kita manut saja,

```jsx 
const setCachedData = useCallback((url: string) => {...}, [])
```

> Dari warning diatas, sudah tau kan alasan menggunakan `useCallback` kenapa?

Untuk tau hasilnya, coba kita lihat di log apakah `useMemo` disini cukup membantu?
```jsx 
child of ChildWithoutMemo
child of ChildWithMemo
```
Ternyata komponen Anak masi saja terjadi proses re-render yg tidak perlu. Iyap disini kita lupa bahwa casenya adalah preventing rerenders **component**, maka dari itu untuk mencegah perenderan ulang yang terjadi pada **komponen** dgn menggunakan `React.memo()`. 
```jsx 
const ChildWithoutMemo = () => {
  console.log("child of ChildWithoutMemo");
  ...
}

const ChildWithMemo = memo(() => {
  console.log("child of ChildWithMemo");

  return <ExpensiveComponent />
})
```

Kemudian coba lihat log hasilnya dari kedua Child komponen.

## Code Splitting & Lazy Loading
Seiring berkembangnya waktu ukuran hasil build file/bundle bisa menjadi lebih besar. Konsekuensinya proses load time menjadi lebih lama dan ukuran halaman menjadi besar. Untuk itu, daripada maksa untuk nge-load semua file bundle aplikasi diawal, pendekatan yg dilakukan adalah membagi kode menjadi potongan terpisah / code splitting.

![initial load](https://miro.medium.com/max/2000/1*Yl7S7iGRMn_ChLmttDVbQw.png)

#### React.lazy() ❤️ Suspense
[Lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading) adalah teknik pengoptimalan kinerja untuk aplikasi web dan seluler. Kata kuncinya adalah `malas`, artinya muncul saat diperlukan saja. `React.lazy()` adalah fungsi bawaan React yg  memungkinkan Anda membuat impor secara dinamis sebagai komponen biasa. 

```jsx 
...
{
  path: '/',
  component: Home
},
{
  path: '/:username/album',
  component: React.lazy(() => import('./pages/album'))
},
...
```
Dalam kode diatas, `React.lazy()` membungkus halaman/module album, so ketika halaman root/home diload, halaman yg lazy tidak akan ikut diload pula krn tidak perlukan. Inilah mekanisme dari  `React.lazy()`, komponen dibagi menjadi beberapa potongan javascript terpisah. 

 `React.lazy()` mengembalikan kembalian `Promise` hingga selesai baru setelah itu komponen dimuat. Dalam implementasinya,  `React.lazy()` berkaitan dengan `Suspense` untuk menampilkan **fallback** selama kode/komponen dimuat.


```jsx
<React.Suspense fallback={<FullscreenLoading />}>
  <Routes />
</React.Suspense>
```
Biasanya `lazy` dan `Suspense` untuk menangani kasus pemuatan data/fetching. Untuk implementasi lengkap mengenai *code splitting* bisa cek repositori ini [react-walkthrough](https://github.com/natserract/react-walkthrough).

### Kesimpulan
Pada intinya optimisasi diperlukan **jika ada suatu masalah** saja, cara yang termudah adalah mulai dari membuat kode tanpa optimisasi dulu. Tujuan dari pengoptimalan sendiri adalah kecepatan, atau lebih baik dari sebelumnya jika memang caranya tepat itu akan berhasil.

Di case React sendiri juga tidak boleh *overuse* dalam menggunakan cara2 diatas, harus tentukan saat kapan dan dimana harus dipasang. Karena "semua yg berlebihan itu ga baik", hmm. 

Oke mungkin itu aja tulisan kali ini, kalau memang ada saran, kritik, diskusi bisa komen dibawah ya! Thanks!