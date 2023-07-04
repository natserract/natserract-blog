---
title: "Defensive Programming"
date: "2023-07-04"
author: "Alfin Surya"
excerpt: "Zero trust even is you!"
---
> Defensive programming mungkin pembaca disini sudah pernah mendengar atau _belum pernah mendengar tapi secara ga sadar udah pernah lakukan?_. Nah sebelum bahas lebih lanjut, saya mau cerita sedikit. 

Saya awalnya aga skeptis dengan cara golang menangani kesalahan, dimana itu terlihat seperti pengecekan berulang2 kali, bahkan terlihat seperti messy code:

```go
func CopyFile(src, dst string) error {
	r, err := os.Open(src)
	if err != nil {
		return fmt.Errorf("copy %s %s: %v", src, dst, err)
	}
	defer r.Close()

	w, err := os.Create(dst)
	if err != nil {
		return fmt.Errorf("copy %s %s: %v", src, dst, err)
	}

	if _, err := io.Copy(w, r); err != nil {
		w.Close()
		os.Remove(dst)
		return fmt.Errorf("copy %s %s: %v", src, dst, err)
	}

	if err := w.Close(); err != nil {
		os.Remove(dst)
		return fmt.Errorf("copy %s %s: %v", src, dst, err)
	}
}
```
Karena latar belakangnya JavaScript dengan jargon [`throw` dan `try catch` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) lihat kode golang cukup bikin bingung. `if err != nil` What?. Ini memang kelihatan make sense ya, dimana error kalau ga `null` ya berarti ada error. Tapi yang bikin saya penasaran adalah design dari bahasa golang itu sendiri dimana mereka menggunakan **[error sebagai nilai](https://go.dev/blog/errors-are-values)** ini adalah gaya bahasa pemrogaman di tahun 70-an dan diterapkan juga di bahasa C.

Mereka mengatakan:

> In Go, error handling is important. The language’s design and conventions encourage you to explicitly check for errors where they occur (as distinct from the convention in other languages of throwing exceptions and sometimes catching them). In some cases this makes Go code verbose, but fortunately there are some techniques you can use to minimize repetitive error handling.

Kalau balik mundur sedikit, ada beberapa cara dalam menampilkan kesalahan di sebuah program:
1. **Error State**
   Bisa berupa http response code [https://developer.mozilla.org/en-US/docs/Web/HTTP/Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)), status nilai atau nilai kembalian 
2. **Exceptions** [`throw` dan `try catch` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
3. **Callback** (NodeJS IO), dll

Java, JavaScript umumnya menggunakan exceptions, sedangkan golang menggunakan pendekatan pertama. Cara diatas punya pros dan cons sendiri dan casenya masing2, tapi prinsip utama golang adalah kesederhanaan dan saya suka ini.  

## Defensive Programming

> "Defend against the impossible, because the impossible will happen."

Defensive programming adalah  pendekatan yang dilakukan dengan mengasumsikan sedetail mungkin adanya kesalahan atau ketidak konsistenan yang tidak terdeteksi dalam kode yang dapat menimbulkan masalah nantinya. Ini terkait dengan **cara menangani kesalahan pada program** dan membuat program berjalan sebaik mungkin. 

Cara ini mempunyai keuntungan:
- Meningkatkan kualitas program
- Meminimalisir jumlah bug dan masalah yang mungkin terjadi pada kode.
- Membuat kode dapat mudah dipahami, kode yang ditulis secara defensif dapat lebih mudah dibaca dan dipahami khususnya secara flow dan alur program.  

Contoh kasus penggunaan defensive programming yaitu [perusahaan NASA](https://coder.today/tech/2017-11-09_nasa-coding-standards-defensive-programming-and-reliability-a-postmortem-static-analysis./) dimana mereka menulis kode yang sangat kompleks yang nantinya bisa berjalan diluar angkasa. Release hanya sekali, sekalinya udah release program udh ga bisa diutek2, kalau ada kesalahan pada program kerugian bisa mencapai miliar dolar. _saya ga kebayang kalau saya kerja di NASA -,-_

### Error Handling Approach

Dalam menangani kesalahan ada tiga kemungkinan pendekatan:
1. **Ignore it**: kesalahan diabaikan dan aplikasi tetap melanjutkan eksekusi
2. **Fail fast**: aplikasi segera berhenti dan tampilkan kesalahan
3. **Fail safe**: aplikasi mendapatkan kesalahan dan tetap melanjutkan eksekusi dengan cara sebisa mungkin

> Kemungkinan di tulisan ini akan menggunakan pendekatan **fail fast** dan **fail safe** dalam beberapa kasus

### Rules
Untuk melakukan pendekatan ini, 
1. Anda harus betul2 paham business logic dari sebuah program sedetail mungkin.
2. Selain itu, kemampuan programming juga diperlukan disini. Makin deep kemampuan dan pengalaman Anda, maka hasil analysis semakin tepat.

Untuk case kali ini, saya akan menggunakan contoh kasus create order dimana payload nya harus valid++

Pertama, kita buat function dulu lalu define type nya:

```ts
type CreateOrderRequest = {
   customerId: number;
   price: number;
   orderTypes: string
   skipConfirmation?: boolean;
   discount?: number;
}

async function createOrder(payload: CreateOrderRequest) {...}
```

Lalu mari kita coba analysis, apa saja kesalahan2 yang kemungkinan terjadi disini:
1. Apakah semua required property payload ada?
2. Apakah tipe data dari payload tersebut semuanya valid?
3. Apakah proses kalkulasi hitung2an sudah benar?
4. Apakah data yang diterima (read) ada di database?
4. Apakah proses transaksi (create or update) ke database berhasil?

### Buat Validasi

<h4 style="font-size: 20px;">1.  Apakah semua required property payload ada?</h4>

```ts
 // Check required property (traditional ways);
  if (
    !payload ||
    !payload.customerId ||
    !payload.price ||
    !payload.orderTypes
  ) {
     // crash the program
     // or handle the error here
     // or throw an exception so some code higher up handles the error
     // or do anything else your error recovery implementation requires
  }
```
> Okey meskipun disini TypeScript sebagai static type checking, validasi tetap diperlukan karena typescript juga akan dicompile ke javascript.

<h4 style="font-size: 20px;">2.  Apakah tipe data dari payload tersebut semuanya valid?</h4>

```ts
 // Check payload type;
  if (
    typeof payload.customerId !== "number" ||
    typeof payload.price !== 'number' ||
    typeof payload.orderTypes !== 'string' ||
    typeof payload.skipConfirmation !== 'boolean' ||
    (payload.discount && typeof payload.discount !== 'number')
  ) {
     // crash the program
     // or handle the error here
     // or throw an exception so some code higher up handles the error
     // or do anything else your error recovery implementation requires
  }
```

<h4 style="font-size: 20px;">3.  Apakah proses kalkulasi hitung2an sudah benar?</h4>

```ts
 // Check price must be positive number;
 if (payload.price < 0) {
    // crash the program
    // or handle the error here
    // or throw an exception so some code higher up handles the error
    // or do anything else your error recovery implementation requires
}

// Check discount must be lower than price;
if (payload.discount && (payload.discount > payload.price)) {
   // crash the program
   // or handle the error here
   // or throw an exception so some code higher up handles the error
   // or do anything else your error recovery implementation requires
}
```

<h4 style="font-size: 20px;">4.  Apakah data yang diterima (read) ada di database?</h4>

```ts
 // Check customer is exists in db;
 try {
   const customer = await CustomerReadCoordinator.get(payload.customerId);
 } catch (err) {
    // crash the program
    // or handle the error here
    // or throw an exception so some code higher up handles the error
    // or do anything else your error recovery implementation requires
}
```

<h4 style="font-size: 20px;">5. Apakah proses transaksi (create or update) ke database berhasil?</h4>

```ts
try {
    // If create process failed will returns throw;
   const order = await OrderCreateCoordinator.create<CreateOrderRequest>({
      ...payload,
      customerId: customer.id
   })
} catch (err) {
   // crash the program
   // or handle the error here
   // or throw an exception so some code higher up handles the error
   // or do anything else your error recovery implementation requires
}
```

## Let's meet offensive!
**Offensive programming** merupakan bagian dari defensive programming keduanya tidak bertentangan (kecuali namanya). Bedanya offensive berfokus pada kegagalan sesegera mungkin. Tujuannya untuk mengidentifikasi kesalahan dengan cepat. 

Sedangkan, **defensive programming** lebih berfokus ke [fault tolerance](https://en.wikipedia.org/wiki/Fault_tolerance) artinya program akan selalu berjalan secara normal jika terjadi kegagalan atau kesalahan  apapun situasinya. Kode harus berfungsi apa pun masukannya. 

> Contoh kasusnya mungkin kalkulasi perhitungan discount:

**Penulisan defensive (fail safe)**
```ts
// Price will not smaller than 0
const price = Math.max(0, payload.price)

// Discount will not greater than price
const discount = Math.min(price, payload.discount)
```

**Penulisan offensive (fail fast)**
```ts
 // Check price must be positive number;
if (payload.price < 0) {
   throw new RequestValidationError(
     'Incorrect price!'
   )
}

// Check discount must be lower than price;
if (payload.discount && (payload.discount > payload.price)) {
   throw new RequestValidationError(
     'Discount must be lower than price!'
   )
}
```

Pendekatan dengan cara defensive, **berusaha recover input price dan discount untuk mendapatkan hasil yang se-valid mungkin** tanpa harus membuat program berhenti atau gagal even itu input nya -1 or etc.. Sedangkan offensive **membuat beberapa validasi lalu menampilkan letak kesalahan dan membuat program berhenti**. 

Dari pemahaman diatas, Anda harus benar2 tahu kapan harus menggunakan pendekatan diatas saat menangani kesalahan pada program. Umumnya program yang membutuhkan pemrograman defensif, program yang membutuhkan availability, security, reliability yang tinggi.

Selain itu untuk melakukan pemrograman defensif, point penting lainnya:
- Gunakan kode standarisasi pattern
- Lakukan pendekatan TDD (Test Driven Development)

## Optimize it (Bonus)!
> Thanks to @zod. Zod is a TypeScript-first schema declaration and validation library. I'm using the term "schema" to broadly refer to any data type, from a simple string to a complex nested object.

Iyap, kita bisa optimize code diatas menggunakan Zod karena katanya `Works with plain JavaScript too! You don't need to use TypeScript.` Okay!

<h4 style="font-size: 20px;">Buat Schema</h4>

```sh
// Utils
const zodValidation = <S extends ZodRawShape, T>
(schema: z.ZodObject<S> | z.ZodEffects<z.ZodObject<S>>, payload: T): [T, null | ZodError] => {
   let error = null;
   let results = null;

   const validateResult = schema.safeParse(payload);
   if (!validateResult.success) {
      error = validateResult.error
   } else {
      results = validateResult.data;
   }

   return [results as unknown as T, error as null | ZodError]
}

enum OrderTypes {
   RECURRING = 'recurring',
   NON_RECURRING  = 'non_recurring'
}

const CreateOrderRequestSchema = z.object({
   customerId: z.number(),
   price: z.number().positive(),
   orderTypes: z.nativeEnum(OrderTypes),
   skipConfirmation: z.boolean().optional(),
   discount: z.number().optional(),
})

async function createOrder(payload: CreateOrderRequest) {
   const [, payloadErr] = zodValidation(CreateOrderRequestSchema, payload);
   if (payloadErr !== null) {
      throw new RequestValidationZodError(
        'Payload is not a valid!',
        payloadErr
      )
   }

   const [, priceCalculationErr] = zodValidation(
     CreateOrderRequestSchema.refine((data) =>  data.discount && data.discount < data.price),
     payload
   )
   if (priceCalculationErr !== null) {
      throw new RequestValidationZodError(
        'Discount must be lower than price!',
        priceCalculationErr
      )
   }
}
```

Thanks! Semoga bermanfaat!

## Additional Reading
- [https://completedeveloperpodcast.com/episode-225/](https://completedeveloperpodcast.com/episode-225/)
- [https://programmingduck.com/articles/defensive-programming](https://programmingduck.com/articles/defensive-programming)
- [https://medium.com/@christian.ppl/introduction-to-the-fail-fast-principle-in-software-development-865ccab28979](https://medium.com/@christian.ppl/introduction-to-the-fail-fast-principle-in-software-development-865ccab28979)