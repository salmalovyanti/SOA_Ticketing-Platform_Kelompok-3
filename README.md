# Ticketing Platform 

## Aplication Name: Tikeroo

---
## API Gateway & Ports Mapping
| Service            | Path Base                 | Port   | Keterangan                                      |
| ------------------ | ------------------------- | ------ | ----------------------------------------------- |
| API Gateway     | `/api/...`                | `3001` | Entry point utama semua request dari client     |
| Auth Service    | `/api/auth`, `/api/users`, `/api/wishlist`,  | `3002` | Registrasi, login, profil user, wishlist, dsb   |
| Ticket Service  | `/api/category`, `/api/location`,`/api/event`, `/api/ticket`, `/api/venue`  | `3003` | Manajemen event, tiket, kategori, venue, lokasi |
| Order Service   | `/api/cart`, `/api/order_detail`, `/api/order`, `/api/promo_code`,  | `3004` | Cart, pemesanan tiket, promo, detail pesanan    |
| Payment Service | `/api/payments`           | `3005` | Pembayaran dan verifikasi transaksi             |

---

## Features

### Basic API (CRUD)
- User Management
  | No. | Method | Endpoint | Deskripsi |
  |-----|--------|----------|-----------|
  | 1 | `POST` | `/api/user` | Menambahkan user |
  | 2 | `GET` | `/api/user` | Menampilkan semua user |
  | 3 | `GET` | `/api/user/:id` | Menampilkan satu user |
  | 4 | `PUT` | `/api/user/:id` | Mengedit data user |
  | 5 | `DELETE` | `/api/user/:id` | Menghapus user |

- Event Management
  | No. | Method | Endpoint | Deskripsi |
  |-----|--------|----------|-----------|
  | 1 | `GET` | `/api/event` | Menampilkan seluruh data event |
  | 2 | `POST` | `/api/event` | Menambahkan event baru |
  | 3 | `GET` | `/api/event/:id` | Menampilkan detail event |
  | 4 | `PUT` | `/api/event/:id` | Mengedit event |
  | 5 | `DELETE` | `/api/event/:id` | Menghapus event |

- Location Management
  | No. | Method | Endpoint | Deskripsi |
  |-----|--------|----------|-----------|
  | 1 | `GET` |	`/api/location` |	Menampilkan seluruh lokasi |
  | 2 | `POST` |	`/api/location` |	Menambahkan lokasi |
  | 3 | `GET` |	`/api/location/:id` |	Menampilkan satu lokasi |
  | 4 | `PUT` |	`/api/location/:id` |	Mengedit lokasi |
  | 5 | `DELETE` |	`/api/location/:id` |	Menghapus lokasi |
  | 6 | `GET` |	`/api/venue` |	Menampilkan semua venue |
  | 7 | `POST` |	`/api/venue` |	Menambahkan venue |
  | 8 | `GET` |	`/api/venue/:id` |	Menampilkan satu venue |
  | 9 | `PUT` |	`/api/venue/:id` |	Mengedit venue |
  | 10 | `DELETE` |	`/api/venue/:id` |	Menghapus venue |

- Category Management
  | No. | Method | Endpoint | Deskripsi |
  |-----|--------|----------|-----------|
  | 1 | `GET` |	`/api/category` |	Menampilkan seluruh kategori event |
  | 2 | `POST` |	`/api/category` |	Menambahkan kategori event |
  | 3 | `GET` |	`/api/category/:id` |	Melihat detail kategori event |
  | 4 | `PUT` |	`/api/category/:id` |	Mengedit kategori event |
  | 5 | `DELETE` |	`/api/category/:id` |	Menghapus kategori event |

- Orders & Transactions
  | No. | Method | Endpoint | Deskripsi |
  |-----|--------|----------|-----------|
  | 1 | `POST` |	`/api/order` |	Membuat order |
  | 2 | `GET` |	`/api/order` |	Menampilkan seluruh order |
  | 3 | `GET` |	`/api/order/:id` |	Menampilkan satu data order |
  | 4 | `PUT` |	`/api/order/:id` |	Mengedit order |
  | 5 | `DELETE` |	`/api/order/:id` |	Menghapus order |
  | 6 | `POST` |	`/api/order_detail` |	Membuat order detail |
  | 7 | `GET` |	`/api/order_detail` |	Menampilkan seluruh order detail |
  | 8 | `GET` |	`/api/order_detail/:id` |	Menampilkan satu order detail |
  | 9 | `PUT` |	`/api/order_detail/:id` |	Mengedit order detail |
  | 10 | `DELETE` |	`/api/order_detail/:id` |	Menghapus order detail |

- Ticket Management
  | No. | Method | Endpoint | Deskripsi |
  |-----|--------|----------|-----------|
  | 1 | `POST` |	`/api/ticket` |	Menambahkan tiket |
  | 1 | `GET` |	`/api/ticket` |	Menampilkan semua tiket |
  | 1 | `GET` |	`/api/ticket/:id` |	Menampilkan satu tiket |
  | 1 | `PUT` |	`/api/ticket/:id` |	Mengedit tiket |
  | 1 | `DELETE` |	`/api/ticket/:id` |	Menghapus tiket |

### Complex API
| No. | Method | Endpoint | Deskripsi |
|-----|--------|----------|-----------|
| 1 | `POST` | `/api/cart/checkout` | Proses checkout dari keranjang menjadi order dan mengurangi stok tiket |
| 2 | `POST` | `/api/order/request-refund` | Mengajukan refund untuk tiket yang telah dibeli |
| 3 | `POST` | `/api/payment/cancel-ticket` | Membatalkan tiket yang telah dibayar (cancelation logic) |
| 4 | `POST` | `/api/ticket/purchase-ticket` | Membeli tiket dengan pengecekan stok dan validasi user |
| 5 | `POST` | `/api/ticket/bulk-upload` | Upload banyak tiket sekaligus (batch insert dan validasi data) |
| 6 | `GET` | `/api/order/my-tickets` | Menampilkan semua tiket yang dibeli oleh user login |
| 7 | `POST` | `/api/promo_code/redeem-promo` | Mengklaim kode promo dan menghitung potongan harga otomatis |
| 8 | `GET` | `/api/wishlist` | Menambahkan event ke dalam daftar wishlist user |
| 9 | `POST` | `/api/wishlist` | Menampilkan daftar wishlist user |
| 10 | `POST` | `/api/cart/add` | Menambahkan tiket ke keranjang |
| 11 | `GET` | `/api/cart` | Melihat isi keranjang user |
| 12 | `POST` | `/api/order/request-refund` | Mengajukan refund tiket |
| 13 | `POST` | `/api/tickets/bulk-upload` | Upload banyak tiket sekaligus ke event |
| 14 | `GET ` | `/api/events/search` | Query dinamis |
| 15 | `POST` | `/api/users/:id/avatar` | Upload dan penyimpanan file avatar |
| 16 | `GET` | `/api/events/category/:id` | Filter berdasarkan relasi kategori |
| 17 | `GET` | `/api/events/location/:id` | Filter berdasarkan relasi lokasi |
| 18 | `GET` | `/api/event/:eventId/ticket` | Menampilkan tiket berdasarkan ID event |
| 19 | `GET` | `/api/event/search?name=<nama_event>` | Mencari event berdasarkan nama event (menggunakan query) |

### API NoSQL (Redis)
| No. | Method | Endpoint | Deskripsi |
|-----|--------|----------|-----------|
| 1 | `GET` | `/events/popular` | Mengambil daftar event populer dari cache |
| 2 | `GET` | `/event/:id/preload` | Preload detail event tertentu ke Redis |
| 3 | `POST` | `/token/store` | Menyimpan token user ke Redis |
| 4 | `GET` | `/event/:id/view` | Meningkatkan counter view event dan menyimpannya di Redis |
| 5 | `GET` | `/leaderboard` | Mengambil leaderboard pembeli terbanyak dari Redis |
| 6 | `POST` | `/search` | Menyimpan query pencarian user ke Redis |
| 7 | `POST` | `/search/history` | Mengambil riwayat pencarian user dari Redis |
| 8 | `POST` | `/queue/:eventId` | Memasukkan user ke dalam antrian pembelian tiket |
| 9 | `POST` | `/stock/update` | Memperbarui stok tiket di Redis |
| 10 | `POST` | `/booking/lock` | Mengunci kursi agar tidak bisa dibeli oleh user lain |
| 11 | `POST` | `/booking/check-lock` | Mengecek apakah kursi tertentu sudah dikunci (prevent double booking) |


### Authentication
- Google OAuth 2.0
- JWT Access Token

### Security
- Broken Authentication: JWT
- Sensitive data exposure: Bcrypt password
- Injection: Sequelize ORM

### 3rd Party Integration
- Gmail API — Email Confirmation & Reminder
- Google Calendar API — Save event to user calendar
- Google Maps API — Show event location

### Service Worker
- Push Notifications — Kirim notif ke user (ex: "Tiketmu segera habis!")
- Background Sync — Simpan transaksi tiket offline dan sync saat koneksi kembali
- Cache Events for Offline — Simpan halaman event/event list agar bisa diakses offline

