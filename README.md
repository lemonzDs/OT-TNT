# OT-TNT

Portal **eTuntutan SUK Pahang** untuk tuntutan elaun lebih masa (OT) dan tuntutan perjalanan (TNT).

Projek ini memudahkan penyediaan tuntutan bulanan melalui borang dalam pelayar, pengiraan automatik, simpanan tempatan dan cetakan. Sistem direka untuk seorang pengguna pada komputer sendiri menggunakan Laragon atau pelayan PHP tempatan.

Modul OT dibina berdasarkan formula dalam `Jun.xls` dan sudah boleh digunakan. Modul TNT kini mempunyai halaman pengenalan; borang input dan pengiraannya belum dibangunkan.

## Status projek

Status setakat **5 Oktober 2026**:

| Komponen | Status | Skop semasa |
| --- | --- | --- |
| Portal eTuntutan | Tersedia | Laman utama dengan pilihan OT dan TNT serta navigasi antara halaman. |
| Tuntutan OT | Tersedia | Rekod bulanan, profil pegawai, kadar berdasarkan gaji, enam kategori kadar, input jam atau waktu mula/tamat dan potongan rehat. |
| Pengurusan rekod OT | Tersedia | Tambah, sunting, padam, simpan, sandaran dan pemulihan rekod. |
| Cetakan OT | Tersedia | Jadual tuntutan dan perkiraan/perakuan; simpan PDF melalui dialog cetakan pelayar. |
| Tuntutan TNT | Menunggu rujukan | Halaman pengenalan tersedia; medan, kadar dan formula belum ditentukan. |
| Ujian formula OT | Lulus | Tujuh ujian formula lulus pada semakan 5 Oktober 2026. Panduan ujian pelayar tersedia dalam folder `tests/`. |

## Ongoing — fokus semasa

- **Penyediaan skop TNT:** menunggu borang atau fail Excel tuntutan perjalanan yang akan menjadi rujukan medan, kadar dan formula. Pelaksanaan pengiraan TNT belum bermula.
- **Dokumentasi projek:** merekod fungsi yang tersedia, cara menjalankan sistem, batasan dan status pembangunan dalam repositori ini.

## Upcoming — perancangan seterusnya

Senarai ini ialah perancangan, bukan fungsi yang sudah tersedia. Skop TNT bergantung pada semakan borang rujukan dan belum mempunyai tarikh siap.

- [ ] Semak borang/Excel TNT dan dokumentasikan medan wajib, kadar, syarat serta contoh pengiraan.
- [ ] Bina borang rekod perjalanan dan pengiraan tuntutan mengikut rujukan yang disahkan.
- [ ] Tambah simpanan rekod TNT mengikut bulan serta fungsi sunting dan padam.
- [ ] Sediakan cetakan TNT, sandaran dan pemulihan mengikut keperluan borang.
- [ ] Tambah ujian formula serta aliran input, simpan dan cetak TNT sebelum modul digunakan.

## Teknologi dan struktur

PHP dengan PDO SQLite mengendalikan API dan simpanan data. Antara muka menggunakan HTML, CSS dan JavaScript modules tanpa proses build frontend. Node.js digunakan untuk menjalankan ujian formula.

| Fail/folder | Peranan |
| --- | --- |
| `index.php`, `landing.css` | Laman utama portal eTuntutan. |
| `ot.php`, `app.mjs`, `style.css` | Antara muka dan interaksi tuntutan OT. |
| `formula.mjs` | Logik pengiraan OT. |
| `api.php` | API rekod bulanan dan simpanan SQLite. |
| `tnt.php` | Halaman pengenalan modul TNT. |
| `storage/` | Data tempatan dan fail perlindungan akses. Fail SQLite dikecualikan daripada Git. |
| `tests/` | Ujian formula, aliran pelayar dan kebolehcapaian. |
| `docs/` | Catatan audit formula dan aset visual. |

## Buka sistem

Dengan Laragon Apache berjalan, buka http://localhost/OT/ atau alamat virtual host folder OT. Memerlukan PHP dengan PDO SQLite. Tiada npm atau pangkalan data MySQL diperlukan untuk menggunakan sistem.

Alternatif: jalankan `php -S 127.0.0.1:8095 router.php` dalam folder ini, kemudian buka http://127.0.0.1:8095.

Pada komputer ini, klik dua kali Mula-OT.cmd untuk memulakan pelayan alternatif. Biarkan tetingkap itu terbuka semasa menggunakan sistem. Jika port sedang digunakan oleh pratonton yang sedia berjalan, buka alamat tersebut terus.

## Penggunaan

Halaman utama kini mempunyai dua pilihan: OT membuka sistem lebih masa di `ot.php`, manakala TNT membuka halaman pengenalan tuntutan perjalanan di `tnt.php`. Pengiraan TNT belum tersedia sehingga borang atau Excel rujukan diberikan.

1. Pilih bulan. Isi Maklumat pegawai dan isi gaji pokok. Kadar sejam dikira automatik sebagai gaji × 12 ÷ (313 × 8).
2. Tambah rekod. Pilih jenis hari serta siang/malam. Isi jam perpuluhan atau waktu mula/tamat. Isi potongan rehat sendiri.
3. Masukkan rekod, semak Perincian kiraan, kemudian klik Simpan tuntutan. Perubahan hanya kekal selepas simpan berjaya.
4. Cetak / PDF menghasilkan jadual tuntutan dan bahagian perkiraan/perakuan. Untuk PDF, pilih Save as PDF dalam dialog cetakan.
5. Sandaran memuat turun bulan yang sedang dibuka. Pulihkan sandaran membuka data untuk semakan; klik Simpan tuntutan untuk mengekalkannya.

Pecahkan sesi jika bertukar kategori siang/malam atau jenis hari. Sistem tidak meneka cuti umum atau memotong waktu rehat automatik. Rekod contoh dalam Excel tidak diimport kerana tarikh dan label asal tidak konsisten.

## Data

Data disimpan dalam `storage/claims.sqlite` pada komputer ini. Setiap bulan menyimpan salinan profil/kadar sendiri. Bulan baharu mewarisi profil bulan terbuka. Sandarkan fail pangkalan data untuk semua bulan ketika sistem tidak sedang menyimpan. Apache mesti menghormati `storage/.htaccess`; pelayan PHP terbina dalam mesti menggunakan router.php. Sistem API hanya menerima sambungan loopback. Jangan dedahkan folder ini sebagai laman awam.

## Formula dan ujian

Rujuk [audit formula](docs/formula-audit.md) dan [panduan ujian](tests/README.md). Jalankan ujian formula dengan:

```sh
node --test tests/formula.test.mjs
```

Kiraan asal tiada ROUND; ketepatan penuh dikekalkan dan wang dipaparkan dua perpuluhan. Ujian pelayar mesti menggunakan pangkalan data ujian berasingan seperti yang diterangkan dalam panduan ujian.

Cetakan mengikuti medan dan perakuan templat, bukan salinan piksel tepat Excel. Teks pekeliling dikekalkan daripada fail pengguna; sistem tidak mengesahkan dasar jabatan terkini.
