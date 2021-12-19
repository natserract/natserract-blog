---
title: "AWS S3 Presigned Url"
date: "2021-12-18"
author: "Alfin Surya"
excerpt: "Securing your AWS S3 using presigned URLs"
coverImage: "https://d1.awsstatic.com/serverless/New-API-GW-Diagram.c9fc9835d2a9aa00ef90d0ddc4c6402a2536de0d.png"
---
Secara umum metode pengupload-an biasanya file disimpan ke server, meskipun ini cara yang sah2 saja, tapi memiliki dampak yang sangat signifikan:
- Mengunggah file ke server dapat berdampak negatif pada sumber daya sistemnya (RAM dan CPU), terutama ketika berurusan dengan file yang lebih besar atau pemrosesan gambar. 
- Kalo storage server sudah penuh, harus upgrade terus menerus (siap2 bakar duit teros)
- Masalah keamanan 

Meskipun prosesnya sederhana, namun dapat memiliki efek samping yang signifikan pada kinerja server web dalam aplikasi yang lebih sibuk. Unggahan media biasanya berukuran besar, jadi mentransfernya dapat mewakili sebagian besar I/O jaringan dan waktu CPU server. Anda juga harus mengelola status transfer untuk memastikan bahwa seluruh objek berhasil diunggah, dan mengelola percobaan ulang dan kesalahan. 

## What is Amazon S3?  
>Amazon Simple Storage Service (Amazon S3) adalah layanan penyimpanan objek yang menawarkan industri terkemuka skalabilitas, ketersediaan data, keamanan, dan kinerja. pelanggan dari semua ukuran dan industri dapat menggunakan Amazon S3 untuk menyimpan dan melindungi sejumlah data untuk berbagai kasus penggunaan, seperti data lake, situs web, seluler aplikasi, pencadangan dan pemulihan, arsip, aplikasi perusahaan, IoT perangkat, dan analitik data besar.

Di dunia yang semakin canggih kini, hampir semuanya dilakukan menggunakan cloud. Jadi layanan ini hadir untuk menjadi solusi dari permasalahan diatas. Dengan langsung mengunggah file-file ini ke [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) , Anda dapat menghindari proxy permintaan ini melalui server aplikasi Anda. 

Ini dapat secara signifikan mengurangi lalu lintas jaringan dan penggunaan CPU server, dan memungkinkan server aplikasi Anda menangani permintaan lain selama periode sibuk. S3 juga sangat tersedia dan tahan lama, menjadikannya penyimpanan persisten yang ideal untuk unggahan pengguna. 


## So what are presigned URLs anyway?
Sederhananya, presigned URLs adalah URL yg dienkripsi dengan menggunakan beberapa algoritma, dimana URL ini memiliki batasan waktu tertentu. Contohnya:

```sh
https://presignedurldemo.s3.eu-west-2.amazonaws.com/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIAJJWZ7B6WCRGMKFGQ%2F20180210%2Feu-west-2%2Fs3%2Faws4_request&amp;X-Amz-Date=20180210T171315Z&amp;X-Amz-Expires=1800&amp;X-Amz-Signature=12b74b0788aa036bc7c3d03b3f20c61f1f91cc9ad8873e3314255dc479a25351&amp;X-Amz-SignedHeaders=host
```

Kalo kamu akses di terminal kamu `aws s3 ls s3://<bucket_name>/`, hasilnya menampikan list object yang ada di bucket S3 kamu. Ini sifatnya private, jdi yang hanya punya akses saja yang bisa akses. 

So, jika ingin membuat public url, kita bisa menggunakan presigned url untuk mengakses object s3 tadi. Ini mirip seperti share link public **google drive**, tapi bedanya presigned url memiliki batasan waktu, jdi kalo udah lewat ya kadaluwarsa.

## Presigned URLs S3 cases
Pada tulisan ini, pendekatan yang dilakukan berdasarkan cases saat ini yaitu, 
- Panggil [Amazon API Gateway](https://aws.amazon.com/api-gateway/), lalu invoke fungsi `getSignedURL` lambda. Ini akan menghasilkan [presigned url](https://docs.aws.amazon.com/AmazonS3/latest/dev/ShareObjectPreSignedURL.html) dari bucket S3. Setelah mendapatkan url, file akan didownload (sisi server).
- Upload file menggunakan package [react-aws-s3](https://www.npmjs.com/package/react-aws-s3) (sisi client).

## Let's do this

Step pertama kamu buat dl environment untuk configurasi awsnya, setelah itu
```ts
// helpers/s3-util.js
const getSignedUrl = function (bucket, fileKey) {
  console.log('getSignedUrl...', bucket, fileKey)

  return new Promise((resolve) => {
    const { expires } = awsS3Config

    const params = {
      Bucket: bucket,
      Key: fileKey,
      Expires: expires,
    }

    const uploadURL = s3.getSignedUrl('getObject', params)

    resolve(uploadURL)
  })
}
```

```ts
// helpers/downloadFile.js
const Axios = require('axios')
const fs = require('fs')

export async function downloadFile(fileUrl, outputLocationPath) {
  const writer = fs.createWriteStream(outputLocationPath)

  return Axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
  }).then((response) => {
    //ensure that the user can call `then()` only when the file has
    //been downloaded entirely.
    return new Promise((resolve, reject) => {
      response.data.pipe(writer)
      let error = null
      writer.on('error', (err) => {
        error = err
        writer.close()
        reject(err)
      })
      writer.on('close', () => {
        if (!error) {
          resolve(true)
        }
        //no need to call the reject here, as it will have been called in the
        //'error' stream;
      })
    })
  })
}
```

```ts
// functions/signedurl.js
export const handler = async (event, context) => {
  logger.info('Invoked signed url function', event, context)

  try {
    const { filekey } = event.queryStringParameters
    const bucketName = awsS3Config.bucketName

    const preSignedUrl = await getSignedUrl(bucketName, filekey)

    if (preSignedUrl) {
      const pathFile = path.resolve(
        process.env.BASE_APP_PATH,
        './download/files',
        getFileName(filekey)
      )

      const responseStream = await downloadFile(preSignedUrl, pathFile)

      return formatJSONResponse({
        status: true,
        message: 'File successfully downloaded',
        preSignedUrl,
      })
    }

    return formatJSONResponse({
      status: false,
      message: 'File failed downloaded',
      preSignedUrl: '',
    })
  } catch (error) {
    console.log(error)
    return formatJSONResponse(error)
  }
}
```
Pada code diatas saya ingin menjelaskan beberapa hal. Parameters:
- **Bucket**: ini adalah nama dari bucket kamu, 
- **Key**: identitas key ini merupakan nama dari object/file bucket s3 kamu, kalo mau cek bisa coba `aws ls`
- **Expires**: Tanggal dan waktu saat objek tidak lagi dapat di-cache/akses. Untuk informasi lebih lanjut, lihat [http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.21](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.21). 

Jadi cara kerja code diatas, setelah mendapatkan presigned url, url akan di `fetch` lalu di download.

Untuk selanjutnya, kita akan coba upload file dari sisi client. Saya akan menggunakan package `react-aws-s3`, ini menghemat waktu development. Cuman kalo misalnya kamu ada kebutuhan tertentu, gunakan fungsi [s3.createPresignedPost](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_s3_presigned_post.html) atau [s3.upload](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property) untuk proses uploading file. 

```jsx
// upload-page.tsx
import { useCallback, useRef } from 'react'
import S3 from 'react-aws-s3'

const ReactS3Client = new S3(AwsConfig)

const UploadPage = () => {
  const filesInputRef = useRef()

  const handleChange = useCallback((e) => 
    onChangeFile(e, async (files) => {
      filesInputRef.current = files
    }), 
   []
  )

  const handleSubmit = useCallback((event) => {
    event.preventDefault()

    const upload = (file) => {
      const fileName = generateFileName(40)

      ReactS3Client.uploadFile(file, fileName).then((data) => {
        console.log(data)

        if (data.status === 204) {
          ... // success
        } else {
          ... // fail
        }
      })
    }

    const files = filesInputRef?.current
    const uploadPromises = files.map(({ file }) => upload(file))

    Promise.all(uploadPromises).then((responses) => {
      console.log('responses', responses)
    })
  }, [])

  return (
     <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} multiple />
        <button type="submit">Upload</button>
     </form>
  )
}
```

Ini adalah beberapa solusi yang saya lakukan selama bekerja dengan s3, layanan ini cukup membantu dari sisi development dan juga bisnis. Kalo ada pertanyaan, kritik, saran open for discuss, sekian **terima kasih sudah membaca!**.

## References:
- [https://aws.amazon.com/blogs/compute/uploading-to-amazon-s3-directly-from-a-web-or-mobile-application/](https://aws.amazon.com/blogs/compute/uploading-to-amazon-s3-directly-from-a-web-or-mobile-application/)
- [https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html)
- [https://bobbyhadz.com/blog/aws-s3-presigned-url-react](https://bobbyhadz.com/blog/aws-s3-presigned-url-react)