---
title: "Implementasi React pattern di Vuejs"
date: "2019-11-30"
author: "Alfin Surya"
excerpt: "Ngoding Vue menggunakan pattern React"
coverImage: 'https://res.cloudinary.com/practicaldev/image/fetch/s--0sdgyFHo--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/fmmsca2u3ssel70leqyt.png'
favorite: 'yes'
---

Ketika pertama kali kamu ingin belajar suatu teknologi khususnya frontend, biasanya kamu bingung mau mulai dari mana, salah satu alasannya karena kamu dihadapkan dengan banyak pilihan stack, contohnya: Vue, Angular, React, dll. Tentu saja ini membingungkan, maka dari itu supaya tahu bagaimana stack2 itu bekerja, caranya adalah harus langsung mencobanya. Yang perlu diingat semua teknologi punya pros dan consnya masing2.

Nah, dalam tulisan ini, kita ga akan ngebahas mana yang terbaik, karena semua digunakan sesuai dengan kebutuhan, yang akan kita bahas disini adalah bagaimana para React developer bisa dengan mudah ngoding di Vue dengan kode yang mirip/sama (97%). Tulisan ini cocok buat kamu bagi para react dev yang lagi ingin bermigrasi ke vue atau sekedar mau belajar.

So, ini perjalanan panjang! Baca doa dulu biar adem! 😃

### Persiapan Project

Pertama yang harus kita lakukan adalah mengatur project, mulai dengan membuat struktur direktori terlebih dahulu.

**1. Struktur direktori root**

Ini struktur direktori yang kita pakai dalam project ini, didalam folder komponen ada 2 folder yaitu container dan presentational. Kedua folder ini nantinya dipakai untuk membedakan mana komponen logic dan mana komponen view. 

```
├── src
| ├── assets
| ├── components
|   ├── container
|   ├── presentational
├── redux
| ├── action
| ├── reducer
├─
```

Kamu bisa bebas mengatur struktur direktori ini sesuai hati nurani kamu, yang penting kamu suka, nyaman dan aman.

**2. Menggunakan JSX & TypeScript**

So, mari kita mulai dengan menginstal beberapa dependensi yang diperlukan. Kita dapat melakukan ini dengan mengetikkan perintah:

```shell
npm i --save-dev typescript babel-preset-vca-jsx
npm i --save-dev @babel/plugin-syntax-dynamic-import @babel/plugin-transform-runtime 
npm i --save-dev @babel/preset-typescript @types/webpack-env source-map-loader 
npm uninstall babel-plugin-transform-runtime 
```
Kita perlu menghapus package ini `babel-plugin-transform-runtime`, karena kita sudah menginstal versi yang terbaru `@babel/plugin-transform-runtime`

Dan selanjutnya, kita harus mengatur beberapa konfigurasi tambahan karena beberapa packages memerlukan versi Babel yang support.

Catatan: Kebetulan saya make boilerplate ini: [Vue Webpack Template](https://vuejs-templates.github.io/webpack/) kamu bisa memilih boilerplate apa saja.

Update babel core & babel loader
```shell
npm i --save-dev babel-core@^7.0.0-0 babel-loader@^8.0.6 
npm i --save-dev @babel/core@^7.6.4 @babel/preset-env@^7.6.3 
``` 

Setelah menginstal semua dependensi, kita harus mengatur konfigurasi tambahan pada `.babelrc` buka file ini, dan tambahkan config [.babelrc](https://gist.github.com/alfinsuryaS/1deb295c5ab3ec51b322298960ea8b52) dan kita juga mengatur webpack loadernya [webpack config](https://gist.github.com/alfinsuryaS/43d09d7d4e2def9d5a4df0c7623c1870)

**Catatan:** Untuk typescript loader, ada alternative lain, seperti [Awesome TypeScript Loader](https://github.com/s-panferov/awesome-typescript-loader)

Dan jangan lupa, kamu juga harus menambahkan beberapa config di `.eslintrc.js`

```js
rules: {
    'import/extensions': ['error', 'always', {
      jsx: 'never',
      ts: 'never',
      tsx: 'never'
    }],
}
```

Dan selanjutnya, buat file baru `tsconfig.json` lalu ikutin config ini [tsconfig.json](https://gist.github.com/alfinsuryaS/ea24b0e729b7a23fcb9d0ea07b71780e)


Setelah semua config ditambahkan, hooray! ini waktunya ganti extension seluruh file project kamu dari `.jsx/.js` ke`.tsx/.ts`

**Catatan:** Untuk bagian kedua ini memang cukup ribet, kalo mau langsung di skip boleh, kamu bisa pake boilerplate yang saya buat [Project Boilerplate](https://github.com/alfinsuryaS/vue-react)


**3. Install dependensi tambahan**
```shell
npm i --save @vue/composition-api vuejs-redux redux @types/redux 
```


### Konsep Utama
Sebagai frontend tools yang sangat populer, react dan vue memiliki fitur yang sama, seperti two-way-databinding, templating, routing, components, dan masih banyak lagi.

Serupa tapi tak sama, ada beberapa perbedaan antara kedua tools ini, yaitu dalam hal penulisan sintaks, rendering komponen, pengelolaan kondisi dan data. Oleh karena itu, pada bagian ini kita akan mengupas satu per satu cara menerapkan pattern React di Vue.


**Komponen and Props**
Komponen adalah jenis fungsi khusus seperti fungsi JavaScript yang akan menampilkan sebuah element dan dapat digunakan sebagai bagian terpisah dan dapat digunakan kembali. Dalam merender komponen, keduanya sangat berbeda. React mendefinisikan komponen sebagai class atau fungsi, kalo Vue berdasarkan objek.

```
export default createComponent({
    name: 'ComponentProps',
    props: {
        name: String,
        authorName: Array as () => string[]
    },
    setup(props) {
        return () => (
            <div className="components-props">
                <h2>{props.name}</h2>
                <p>{props.authorName}</p>
            </div>
        )
    }
})
```
Kita tidak perlu menggunakan `template` lagi, right?🙂

```
render () {
  return (
      <ComponentProps 
         name="Your name here" 
         commentId={['Name1', 'Name2']} 
      />
  )
}
```

**Render Pengkondisian**
Cara kerjanya mirip seperti pengkondisian di javascript biasa, kita bisa menggunakan `if else` ataupun `ternary operator`

```
export default createComponent({
    name: 'ConditionalRendering',
    props: {
        show: Boolean
    },
    setup(props) {
        return () => props.show ? <p>True Condition</p> : <p>False Condition</p>
    }
})
```
```ts
render() {
   return <ConditionalRendering show={false}/>
}
```

**Menangani Event**
Di Vue JS, saat menangani event, vue memberikan kita arahan untuk menggunakan ` v-on `. Nah karena kita sudah menggunakan JSX, jadi kita tidak membutuhkan itu lagi, kita bisa menggunakan attribut JSX biasa seperti di React :)

```
export default createComponent({
    setup(props) {
        return () => (
            <button onClick={props.handleButtonClick}>
                Click Event
            </button>
        )
    },
    props: {
        handleButtonClick: Function as () => void
    }
})
```
```ts
render () {
  return (
       <HandlingEvent 
          handleButtonClick={() => alert("Click event. This works!")} 
       />
  )
}
```


**Children**
Children komponen digunakan untuk menampilkan apapun yang kamu wrap antara tag pembuka dan penutup. Untuk mengakses komponen ini, kita dapat menggunakan fungsi ` slots`.

```
export default Vue.component('Children', {
    render() {
        return (
            <div className="children">
                {this.$slots.default}
            </div>
        )
    }
})
```

```
render () {
  return (
     <div className='container'>
        <Children>
          {/* what is placed here is passed as children */}
        </Children>
     </div>
  )
}
```


### Siklus Kehidupan & Hooks
Siklus hidup adalah metode yang mengatur tahapan siklus hidup dalam suatu komponen, dan memiliki fungsi masing-masing.

* `setup`: dipanggil setelah resolusi properti awal ketika instance komponen dibuat. Dari segi siklus, ia dipanggil sebelum hooks ` beforeCreate `.
* `onBeforeMount`: fungsi yang dijalankan sebelum proses rendering dijalankan.
* `onMounted`: fungsi yang dipanggil hanya sekali setelah rendering pertama selesai. Biasanya fungsi ini digunakan untuk menghandle side effect dalam operasi request ajax.
* `onUnmounted`: fungsi yang dijalankan untuk menghilangkan atau menghapus komponen dari DOM. 

```ts
import {
    createComponent,
    reactive as useState,
    onBeforeMount as componentWillMount,
    onMounted as componentDidMount,
    onUnmounted as componentWillUnmount
} from '@vue/composition-api';

const LifecycleHooks = createComponent({
    setup() {
        const state = useState<{ loading: boolean, users: object }>({
            loading: false,
            users: []
        })

        componentWillMount(() => {
            console.log("Component before mount")
        })

        componentDidMount(() => {
            const API_URL = 'https://jsonplaceholder.typicode.com/users'
            fetch(API_URL)
                .then(res => res.json() as Promise<any>)
                .then(data => {
                    state.users = data,
                        state.loading = !state.loading;
                })
                .catch((err: Error) => {
                    throw err
                })
            console.log("Component Mounted")
        });

        componentWillUnmount(() => {
            console.log("Component Will Unmount")
        })

        return () => (
            <div className="lifecycle-hooks">
                {state.loading ? JSON.stringify(state.users) : <span>Loading...</span>}
            </div>
        )
    }
})

export default LifecycleHooks
```

* `reactive`: fungsi ini mirip dengan `Vue.observable()`pada Vue 2, fungsi ini mengembalikan sebuah object baru, dan mengembalikan proxy reaktif dari aslinya.
* `watch`: *"function expects a function"* itu istilahnya. Fungsi ini melacak variabel reaktif didalam suatu komponen. Ketika nilai dari variable reaktif tersebut diganti/update, maka fungsi dijalankan kembali atau dirender ulang.


```
import {
    createComponent,
    reactive as useState,
    watch as useEffect
} from '@vue/composition-api';

const LifecycleHooks = createComponent({
    setup() {
        const state = useState<{ count: number }>({
            count: 0
        })

        /* => Re-run it whenever the dependencies have changed */
        useEffect(() => state.count, (nextState, prevState) => {
            console.log(nextState, '<= this is nextState')
            console.log(prevState, '<= this is prevState');
        })

        return () => (
            <div className="lifecycle-hooks">
                <button onClick={() => state.count++}>
                    Update Value
                </button>
            </div>
        )
    }
})
```

### Redux & Vue

Tentunya kamu pasti sudah tau apa itu Redux right?, ya! kamu jackpot! Redux adalah sebuah library state management untuk aplikasi javascript. Ga kayak vuex, redux bisa digunakan framework apapun.

Redux mempunyai 4 konsep: `reducers`, `actions`, `action creators`, dan `store`. State pada Redux sifatnya immutable dan pure functions. Berikut adalah beberapa hal yang perlu diketahui lebih lanjut tentang redux di vue:

**Actions**
Actions adalah objek Javascript sederhana yang tugasnya adalah mengirim/mengembalikan data dari aplikasi kamu ke store. Jika diberikan perumpamaan, maka action adalah orang yang memberikan perintah untuk melakukan suatu pekerjaan dan memberikan hal-hal yang diberikan untuk dapat menunjang pekerjaan itu.

```javascript
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const RESET = 'RESET'


export const increment = () => {
    return { 
        type: INCREMENT 
        // your payload here
    }
}

export const decrement = () => {
    return { 
        type: DECREMENT 
    }
}

export const reset = () => {
    return { 
        type: RESET 
    }
}
```

**Reducers**
Reducers mempunyai peran sebagai penentu bagaimana keadaan aplikasi berubah sesuai dengan perintah yang diberikan lalu dikirim ke store. Kamu bisa membuat banyak reducer, lalu mengkombinasikannya menjadi satu root reducer.

```javascript
type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'RESET' };

const Counter = (state: number = 0, action: Action) => {
    switch (action.type) {
        case 'INCREMENT': {
            return state + 1;
        }
        case 'DECREMENT': {
            return state - 1;
        }
        case 'RESET': {
            return state
        }
        default: return state
    }
}

export default Counter
```


Fungsi `combineReducers` untuk memanggil semua reducer yang kamu buat. Ini tentunya sangat useful:)

```
import { combineReducers } from 'redux'
import userReducer from './reducer/user.reducer'

export default combineReducers({
    user: userReducer
    // your another reducer here
})
``` 

**Store**
A `store` tempat menyimpan state/data dari aplikasi kamu. Store, memegang seluruh cabang dari aplikasi kamu. Hanya ada satu store di Redux.

```javascript
import Vue from 'vue'
import { createStore } from 'redux'

import Provider from 'vuejs-redux';
import RootReducer from './rootReducer'

const store = createStore(RootReducer);

export default Vue.component('Provider', {
    render() {
        return (
            <Provider 
                mapStateToProps={this.mapStateToProps} 
                mapDispatchToProps={this.mapDispatchToProps} 
                store={store}> 
                {this.$scopedSlots.default}
            </Provider>
        )
    },

    props: ['mapStateToProps', 'mapDispatchToProps'],

    components: {
        Provider
    }
})
```

Kamu juga bisa membuat custom provider yang menerima `mapStateToProps` and `mapDispatchToProps` sebagai props and mengimport store serta meneruskannya ke setiap `Provider`.

```javascript
import Vue from 'vue';
import ContextConsumer from './redux';
import * as actions from './redux/action/user.action';

import ComponentContainer from './components/container/component-wrap';

export default Vue.component('App', {
  render() {
   return (
      <ContextConsumer 
          mapStateToProps={this.mapStateToProps} 
          mapDispatchToProps={this.mapDispatchToProps}>
            {({ incrementAction, userData }) => (
                <ComponentContainer>
                    <SingleComponent
                      value={userData.user}
                      handleClick={incrementAction} 
                    />
                </ComponentContainer>
            )}
      </ContextConsumer>
    )
  },

  components: {
    ContextConsumer
  },

  methods: {
    mapStateToProps(state) {
      return {
        userData: state
      }
    },
    mapDispatchToProps(dispatch) {
      return {
        incrementAction: () => dispatch(actions.increment())
      }
    }
  }
})
```

### Higher-Order Components
Higher-order component (HOC) adalah sebuah konsep/teknik/pattern advanced di React yang dapat digunakan terus-menerus alias (reusable). HOCs bukan bagian dari React API. 

Jika kamu paham dengan konsep higher-order functions (HOF), tentunya akan sangat mudah membuat HOC, karena HOC adalah implementasi dari HOF :)


```javascript
import Vue from 'vue'

const useDataFetchingHOC = (WrappedComponent: JSX.IntrinsicElements) => (urlParam: string) => {
    return Vue.component('HOCFetch', {
        data: () => ({
            fetchData: null
        }),
        mounted: function() {
            fetch(urlParam)
                .then(response => {
                    if (!response.ok) { throw new Error(response.statusText) }
                    return response.json() as Promise<any>;
                })
                .then(data => this.fetchData = data)
                .catch((err: Error) => {
                    throw err
                })
        },

        render(createElement) {
            return !this.fetchData ? createElement('span', 'Loading Fetch...') :
                createElement(WrappedComponent, {
                    attrs: this.$attrs,
                    props: this.$props,
                    on: this.$listeners
            })
        }
    })
};

export default useDataFetchingHOC
```

```javascript
import { createComponent } from '@vue/composition-api'
import useDataFetchingHOC from '../presentational/hoc-component'

const dataSourceUrl = "https://jsonplaceholder.typicode.com/users";

const ContentSite = createComponent({
    setup() {
      return () => (
        <div className="content">
          <p>Yes, i'm in HOC</p>
        </div>
      )
    }
  })

export default useDataFetchingHOC(ContentSite)(dataSourceUrl)

```


**Terimakasih sudah membaca!**
Terima kasih telah membaca, saya harap kamu menikmati artikel ini, dan bisa memberi inspirasi baru untuk pekerjaan kamu. Yang pasti, Vue dan React adalah tools front-end yang sangat keren, dan sangat diminati oleh banyak pengguna. Jadi, teruslah mencoba dan mempelajari hal-hal baru, dan jangan lupa selalu percaya diri!😎

Source code: [github](https://github.com/natserract/vue-react)
