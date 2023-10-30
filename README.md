# BE Tech Test "Rest API with User Authentication"
Web service dengan autentikasi pengguna dan penerapan melindungi data rahasia dari pengguna yang tidak terdaftar.

Service ini dibuat dengan bahasa pemrograman JavaScript dengan JavaScript runtime yaitu NodeJs.
Agar nyaman melihat dokumentasi ini, lihatnya di [Github Repositori ini yaa](https://github.com/TirthaAhmadNazuha/be-tech-test)

## Pemilihan Framework, Database dan library/package
- ### Fastify
  Sebagai Framework Rest API
- ### MongoDB
  Sebagai database no-sql
- ### Bcrypt
  Sebagai library untuk encripsi/hash password user
- ### Nanoid
  Sebagai library untuk menghasilkan karakter atau angka random, digunakan untuk menhasilkan auth token
- ### Axios
  Sebagai library untuk request/fetching ke service lainnya

## Alasan Pemilihan Framework, Database dan library/package tersebut
Fastify merupakan Framework untuk membuat rest API dengan mudah dan cepat, Dibandingkan dengan ExpressJs Fastify full support penggunaan `async/await` (Asyncronous) dan `ES5` (JavaScript ES5 Module). Lalu MongoDB kenapa saya pilih mongoDB tentu karena kecepatannya dan saya senang menggunakannya karena no schema/dynamic schema membuat developing service terasa lebih cepat.

## Deskripsi singkat desain system service tersebut
Pertama saya membuat middleware/preHandler, selayaknya sebuah gerbang middleware tersebut saya namakan `SecurityHandler` berfungsi untuk meminta auth token dari request client dan mengecek ketersediaan token tersebut di `tokenStore` apabila token tersebut tersedia maka client dapat menuju route yang dituju. namun ada route yang tidak memerlukan token yaitu route `/signup` dan `/signin`.

Kemudian bila client atau user telah registrasi di `/signup` client mendapatkan `authToken` dan `userId` dan mengembalikan input user seperti `name, username, phone`. untuk mengakses data yang dilindungi client perlu menyertakan header dengan key `authorization` dan valuenya adalah `authToken`, apabila tidak disertakan response akan mengembalikan response dengan statusCode 401.

Auth Token tersebut memiliki waktu kadarluarsa 60 menit dan sistem akan menghapus token tersebut bila sudah kadarluarsa setiap 10 menit sekali.

Begitu pula dengan register, login/signin apabila login berhasil akan mengembalikan `authToken` dan data user seperti (name, username, phone).

## Software yang diperlu diinstall di device/pc untuk menjalankan service ini
- ### NodeJs@v20.7.0
  Gunakanlah NodeJs dengan versi di sekitar 18-20 major version, kalau saya menggunakan versi 20.7.0
- ### npm@10.1.0
  Saya menggunakan npm versi bawaan dari NodeJs versi 20.7.0, menurut saya versi npm tidak terlalu berpengaruh
- ### MongoDB Comunity Server
  Saya menggunakan MongoDB Comunity Server versi 6.0
- ### (Opsional) Postman
  Saya menggunakan ini untuk testing rest API dengan mudah, btw saya lampirkan yaa file `Rest API Testing.postman_collection` tinggal import buat ngetest

# Setup project "Rest API with User Authentication" And Running it
## Setup
Untuk setup buka folder project ini di text editor kamu yaa, buka juga terminal/cmd-nya pastikan path di terminal sesuai yaa.
Pastikan kamu bisa menampilkan versi nodeJs atau npm dengan menjalankan perintah ini yaa `node -v` dan `npm -v`, lalu untuk setup jalankan `npm i` tunggu dan setup selesai 🎉

## Running
Lalu cara menjalankannya adalah dengan menjalankan perintah ini di terminal `npm start` dan apabila kamu mendapakan output seperti ini
```
> be-tech-task_tirtha-ahmad-nazuha@1.0.0 start
> node src/index.js

Server listening at http://[::1]:5178
```
Itu artinya kamu berhasil menjalankannya horee 🎉🙌😆

## Penutupan
Ini udah penghujung kalimat, Terima kasih sudah membaca ini dangan senang hati.
Dari Saya Tirtha Ahmad Nazuha.
