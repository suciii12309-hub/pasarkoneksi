# PasarKoneksi

**Dari Koneksi Digital, Menuju Peluang Pasar**
Digital Market Ecosystem — website statis (HTML, CSS, JavaScript murni) yang siap di-hosting gratis di GitHub Pages.

> Tidak ada backend, tidak ada database eksternal. Semua data (favorit & riwayat simulasi transaksi) disimpan di `localStorage` browser pengguna.

---

## 1. Struktur Folder

```
pasarkoneksi/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
└── assets/
    ├── logo.svg
    ├── icon-market.svg
    ├── icon-digital.svg
    ├── icon-payment.svg
    ├── icon-data.svg
    └── images/        (kosong — disediakan jika ingin menyimpan gambar lokal)
```

Gambar produk pada versi ini memakai tautan gambar langsung dari Unsplash (tidak butuh API key). Jika sewaktu-waktu tautan gagal dimuat, tampilan otomatis berpindah ke ikon fallback berbasis CSS/SVG sehingga layout tidak pernah rusak atau menampilkan kotak kosong.

---

## 2. Cara Menjalankan Website di Komputer

Karena murni HTML/CSS/JS, tidak perlu instalasi apa pun.

**Cara termudah:** klik dua kali file `index.html` — akan terbuka di browser.

**Cara yang lebih stabil (disarankan)**, jalankan server lokal sederhana agar semua fitur (termasuk path relatif) berjalan sempurna:

```bash
cd pasarkoneksi
python -m http.server 8000
```

Lalu buka `http://localhost:8000` di browser.

Alternatif lain: gunakan ekstensi **Live Server** di VS Code.

---

## 3. Cara Upload ke GitHub

1. Buat repository baru di GitHub, misalnya `pasarkoneksi`.
2. Di komputer, masuk ke folder proyek lalu jalankan:

```bash
cd pasarkoneksi
git init
git add .
git commit -m "Initial commit: PasarKoneksi website"
git branch -M main
git remote add origin https://github.com/USERNAME/pasarkoneksi.git
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub Anda.

---

## 4. Cara Mengaktifkan GitHub Pages

1. Buka repository di GitHub.
2. Masuk ke **Settings** → **Pages**.
3. Pada bagian **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch **main** dan folder **/ (root)**.
5. Klik **Save**.
6. Tunggu 1–2 menit hingga GitHub selesai membangun halaman.

---

## 5. URL Website

Setelah GitHub Pages aktif, website dapat diakses melalui:

```
https://USERNAME.github.io/pasarkoneksi/
```

Ganti `USERNAME` dan `pasarkoneksi` sesuai username dan nama repository Anda.

---

## 6. Cara Mengganti Gambar Produk

Buka file `script.js`, cari array `PRODUCTS` di bagian atas file. Setiap produk memiliki properti `img` berisi URL gambar, contoh:

```js
{
  id: 'p01',
  name: 'Kopi Lokal Soppeng',
  ...
  img: 'https://images.unsplash.com/photo-XXXXXXXXXXXX?auto=format&fit=crop&w=600&q=80'
}
```

Untuk mengganti gambar:
- **Gambar online**: ganti nilai `img` dengan URL gambar langsung (harus berakhiran atau mendukung format gambar seperti `.jpg`/`.png`, atau URL Unsplash sejenis).
- **Gambar lokal**: simpan file gambar ke folder `assets/images/`, lalu ubah nilai `img` menjadi path relatif, contoh: `./assets/images/kopi.jpg`.

Properti `icon` (emoji) adalah ikon cadangan yang otomatis tampil jika gambar gagal dimuat — tidak wajib diubah, tetapi disarankan tetap relevan dengan produk.

---

## 7. Cara Mengganti Nomor WhatsApp

Buka file `script.js`, di baris paling atas terdapat:

```js
const WHATSAPP_NUMBER = '628123456789';
```

Ganti dengan nomor WhatsApp asli penjual dalam format internasional **tanpa** tanda `+` dan tanpa spasi, contoh nomor `0812-3456-7890` menjadi:

```js
const WHATSAPP_NUMBER = '6281234567890';
```

Nomor ini digunakan oleh seluruh tombol "Hubungi Penjual" di website.

---

## 8. Cara Mengubah Data Produk

Semua data produk dikelola dalam satu tempat di `script.js`, yaitu array `PRODUCTS`. Untuk menambah produk baru, salin salah satu blok objek produk dan sesuaikan isinya:

```js
{
  id: 'p13',                     // id unik, tidak boleh sama dengan produk lain
  name: 'Nama Produk Baru',
  category: 'Makanan',           // salah satu: Makanan, Minuman, Fashion, Pertanian, Peternakan, Kerajinan
  price: 30000,                  // angka saja, tanpa titik/koma
  rating: 4.7,
  location: 'Soppeng',
  seller: 'Nama Usaha',
  icon: '🍪',                    // emoji fallback
  desc: 'Deskripsi singkat produk.',
  img: 'https://... (URL gambar)'
}
```

Tambahkan koma setelah objek sebelumnya, lalu simpan file. Produk baru akan otomatis muncul di grid marketplace beserta filter kategorinya.

Data profil pelaku usaha dapat diubah dengan cara yang sama pada array `PROFILES`.

---

## 9. Checklist Pengujian Sebelum Lomba

- [ ] Buka website di desktop, tablet, dan HP — pastikan tidak ada scroll horizontal.
- [ ] Uji navbar: menu desktop berfungsi, menu hamburger di mobile terbuka/tertutup dengan baik.
- [ ] Klik semua menu navbar — pastikan smooth scroll menuju section yang benar.
- [ ] Uji kotak pencarian produk dengan beberapa kata kunci.
- [ ] Uji semua filter kategori (Semua, Makanan, Minuman, Fashion, Pertanian, Peternakan, Kerajinan).
- [ ] Klik "Lihat Detail" pada beberapa produk — pastikan modal menampilkan data yang sesuai.
- [ ] Klik tombol favorit (♡) — pastikan berubah menjadi tersimpan (♥) dan tersimpan setelah reload halaman.
- [ ] Klik "Simulasi Transaksi" — uji tombol tambah/kurang jumlah, lalu klik "Konfirmasi Simulasi".
- [ ] Klik "Hubungi Penjual" — pastikan mengarah ke tautan WhatsApp dengan nomor yang sudah diganti.
- [ ] Klik setiap node pada diagram Ekosistem Pasar Digital — pastikan penjelasan berubah sesuai node yang dipilih.
- [ ] Klik setiap kartu pada bagian "Peluang di Dalam Ekosistem" — pastikan deskripsi muncul.
- [ ] Matikan koneksi internet sebentar dan reload — pastikan gambar yang gagal dimuat berpindah ke tampilan ikon cadangan, bukan kotak kosong.
- [ ] Periksa console browser (F12) — pastikan tidak ada pesan error JavaScript.
- [ ] Setelah upload ke GitHub Pages, buka URL publik dari HP dan laptop untuk memastikan semuanya tampil dan berfungsi normal.

---

## Catatan

Website ini dibuat sebagai pengembangan digital dari konsep infografik "Dari Koneksi Digital Menuju Peluang Pasar" dengan tema *Empowering the Future Market Ecosystem Through Sustainable Business and Financial Resilience*. Seluruh data pada bagian "Data & Fakta" bersumber dari Bank Indonesia (2025–2026) dan Kementerian Komunikasi dan Digital RI (2026), dan tidak diubah dari angka resmi yang tersedia.

© 2026 PasarKoneksi — "Terhubung secara digital, berkembang melalui peluang."
