# 🌌 Interactive 3D Particle & AI Gesture Bouquet

[![Webcam Interaction](https://img.shields.io/badge/Interaction-Webcam%20AI-00e5ff?style=for-the-badge)](https://github.com/Bad4Secondond)
[![Tech Stack](https://img.shields.io/badge/Tech%20Stack-HTML5%20%7C%20CSS3%20%7C%20JavaScript-orange?style=for-the-badge)](https://github.com/Bad4Second)

Sebuah aplikasi web interaktif yang menggabungkan kecanggihan **AI Computer Vision (MediaPipe)** dengan keindahan **Grafis 3D (Three.js)** dan **CSS Art**. Project ini mengubah pergerakan atau gestur tangan real-time via webcam menjadi formasi partikel kosmos yang memukau hingga memunculkan buket bunga digital yang dinamis.

---

## ✨ Fitur Utama

* **Real-time Gesture Recognition:**
Memanfaatkan akselerasi AI MediaPipe untuk mendeteksi posisi dan bentuk jari tangan secara instan tanpa *delay*.
* **Dynamic Particle Morphing:**
Sistem partikel berbasis Three.js yang berpindah formasi (interpolasi) secara halus mengikuti perubahan gestur tangan.
* **Responsive CSS Flower Bouquet Art:**
Kreasi seni visual buket bunga murni menggunakan CSS, lengkap dengan efek animasi kupu-kupu orbital dan partikel berpendar (*sparkles*).
* **Mobile Optimized:**
Penyesuaian performa otomatis (*scale factor* & jumlah partikel) untuk memastikan animasi berjalan lancar di perangkat *smartphone*.

---

## 🖐️ Panduan Gestur Tangan (Sistem Mode)

Website ini membaca 5 mode bentuk tangan untuk memicu visual yang berbeda pada layar

| Mode | Bentuk Gestur | Representasi Visual |
| :--- | :--- | :--- |
| **1** | **Standby / Tidak Ada Tangan** | **Kosmos (Default):** Partikel biru menyebar tenang di tengah layar. |
| **2** | **Satu Jari 👆** | **Saturnus 3D:** Partikel membentuk bola inti dengan cincin asteroid oranye yang berputar di pergelangan tangan. (jupiter) |
| **3** | **Dua Jari ✌** | **I LOVE YOU Text:** Partikel bertransformasi presisi membentuk teks tipografi neon biru. |
| **4** | **Tangan Mengepal ✊** | **Hati / Love:** Partikel meluncur membentuk geometri simbol hati berwarna merah muda. |
| **5** | **Tangan Terbuka 🖐** | **Buket Bunga Custom Name:** Partikel meluruh (transparan) dan memicu mekarnya buket bunga CSS penuh dari dasar layar. _(Ubah nama di file index.html line paling bawah)_ |

---

## 🚀 Cara Menjalankan Project Ini Secara Lokal

Karena project ini membutuhkan akses ke **Webcam** dan memuat aset eksternal via CDN, browser memerlukan protokol server lokal agar fitur AI Mediapipe berjalan dengan aman.

1. **Clone Repositori Ini:**
```bash
git clone https://github.com/Bad4Second/3D-Particle-Hand-Gesture.git

```


2. **Jalankan Menggunakan Local Server:**
* Jika menggunakan **VS Code**, klik kanan pada `index.html` lalu pilih **Open with Live Server**.
* Atau menggunakan Python (via terminal di folder project):
```bash
python -m http.server 8000

```


Lalu buka `http://localhost:8000` di browser Anda.



> ⚠️ **Catatan Keamanan Browser:** Kamera hanya dapat diakses melalui protokol aman (`https://`) atau pada lingkungan pengembangan lokal (`http://localhost` / `http://127.0.0.1`).

---

## 🧠 Teknologi yang Digunakan

* [Three.js (r128)](https://threejs.org/) — Untuk rendering grafis 3D dan sistem partikel interaktif.
* [MediaPipe Hands](https://www.google.com/search?q=https://google.github.io/mediapipe/solutions/hands.html) — Framework machine learning untuk pelacakan *landmark* tangan.
* [HTML5 / CSS3 (Modern Flexbox & Clip-path)](https://developer.mozilla.org/) — Digunakan untuk membangun UI kontrol panel serta *pure CSS art* buket bunga.

---

Matur nuwun! Semoga project interaktif ini dapat memberikan inspirasi atau kebahagiaan saat dicoba. ✨
```
© Fredy
𝑐𝑜𝑑𝑒 𝑖𝑛𝑖 𝑑𝑖𝑏𝑢𝑎𝑡 𝑑𝑎𝑛 𝑑𝑖𝑏𝑎𝑛𝑡𝑢 𝑜𝑙𝑒ℎ 𝐴𝐼, 𝑠𝑎𝑦𝑎 𝑡𝑖𝑑𝑎𝑘 100% 𝑚𝑒𝑚𝑏𝑢𝑎𝑡𝑛𝑦𝑎 𝑑𝑎𝑟𝑖 0
```
