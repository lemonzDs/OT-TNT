# OT-TNT

Claim Perjalanan dan Lebih Masa — Rekod OT SUK Pahang.

Sistem tempatan seorang pengguna berdasarkan Jun.xls. Mengandungi rekod bulanan, input jumlah jam atau tempoh masa, enam kategori kadar, profil setiap bulan, cetakan, sandaran dan pemulihan.

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

Rujuk docs/formula-audit.md. Jalankan `node --test tests/formula.test.mjs` untuk semakan formula sumber yang telah diekstrak. Kiraan asal tiada ROUND; ketepatan penuh dikekalkan dan wang dipaparkan dua perpuluhan.

Cetakan mengikuti medan dan perakuan templat, bukan salinan piksel tepat Excel. Teks pekeliling dikekalkan daripada fail pengguna; sistem tidak mengesahkan dasar jabatan terkini.
