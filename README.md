# Ticketing Platform 

## Aplication Name
Tikeroo

## Team - SOA Kelompok 5

| NIM         | Name                    |
|-------------|-------------------------|
| 2210511069  | Salma Nabila Lovyanti   |
| 2210511071  | Mahira Afifa Mulia      |
| 2210511093  | Dini Rahmawati          |

---

## Features

### Basic API (CRUD)
- User Management
- Event Management
- Orders & Transactions

### Complex API


### API NoSQL (Redis)
| No. | Method | Endpoint | Deskripsi |
|-----|--------|----------|-----------|
| 1 | `GET` | `/api/redis/events/popular` | Mengambil daftar event populer dari cache |
| 2 | `GET` | `/api/redis/event/:id/preload` | Preload detail event tertentu ke Redis |
| 3 | `POST` | `/api/redis/token/store` | Menyimpan token user ke Redis |
| 4 | `GET` | `/api/redis/event/:id/view` | Meningkatkan counter view event dan menyimpannya di Redis |
| 5 | `GET` | `/api/redis/leaderboard` | Mengambil leaderboard pembeli terbanyak dari Redis |
| 6 | `POST` | `/api/redis/search` | Menyimpan query pencarian user ke Redis |
| 7 | `POST` | `/api/redis/search/history` | Mengambil riwayat pencarian user dari Redis |
| 8 | `POST` | `/api/redis/queue/:eventId` | Memasukkan user ke dalam antrian pembelian tiket |
| 9 | `POST` | `/api/redis/stock/update` | Memperbarui stok tiket di Redis |
| 10 | `POST` | `/api/redis/booking/lock` | Mengunci kursi agar tidak bisa dibeli oleh user lain |
| 11 | `POST` | `/api/redis/booking/check-lock` | Mengecek apakah kursi tertentu sudah dikunci (prevent double booking) |


### Authentication
- Google OAuth 2.0
- JWT Access Token

### Security


### 3rd Party Integration
- Gmail API — Email Confirmation & Reminder
- Google Calendar API — Save event to user calendar
- Google Maps API — Show event location

### Service Worker


