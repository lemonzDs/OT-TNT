# Pemetaan Jun.xls

Sumber dibaca sahaja. Dua helaian: `ajie` dan ` ajie 1` (nama kedua bermula dengan ruang).

| Sumber | Logik dalam sistem |
| --- | --- |
| ajie!E19:M19 | SUM setiap lajur jam, potongan, bersih dan enam kategori |
| ' ajie 1'!M5,M6,M8,M9,M11,M12 | Jam kategori × pengganda × kadar sejam |
| ' ajie 1'!H5,H6,H8,H9,H11,H12 | 1.125, 1.25, 1.25, 1.5, 1.75, 2 |
| ' ajie 1'!K5,K6,K8,K9,K11,K12 | Kadar tetap sumber 19.52; sistem kini mengira kadar daripada gaji mengikut permintaan pengguna |
| ' ajie 1'!M14 | SUM(M5:M12), tanpa pembundaran per kategori |
| ajie!M9:M10 | Teks formula gaji pokok × 12 / (313 × 8); digunakan automatik selepas gaji dimasukkan |

Sel jam E5/E6/E8/E9/E11/E12 pada helaian bayaran asal kosong, bukan pautan formula. Sistem menghubungkannya kepada jumlah kategori. Baris asal E16:G18 diisi manual, bukan formula tempoh masa. Sistem menambah pengiraan tempoh dan potongan untuk memudahkan input.

Tiada formula ROUND dalam sumber: kiraan menyimpan ketepatan penuh, paparan wang dua perpuluhan. Paparan jumlah mungkin berbeza satu sen daripada hasil tambah amaun kategori yang dipaparkan. Kadar daripada gaji juga tidak dibundarkan sebelum didarab.

Tarikh contoh A16 ialah 27.8.2023, label hari Jumaat, sedangkan tajuk Jun 2025. Ia tidak diimport sebagai tuntutan sebenar. Data contoh mempunyai 3 jam biasa siang dan 0.5 jam biasa malam, hasil tersambung RM78.08 pada kadar RM19.52.

Sumber menunjukkan 20:00–22:00 sebagai siang dan 22:00–22:30 sebagai malam, tetapi tidak menentukan batas pagi atau peraturan cuti. Sistem memerlukan pilihan siang/malam dan jenis hari secara nyata. Pecahkan sesi jika melintasi kategori atau jenis hari. Tidak meneka cuti umum atau memotong rehat secara automatik.

Perakuan melebihi 1/3 gaji disebut pada helaian kedua. Sistem memaparkan peringatan apabila gaji diisi dan tuntutan melebihi gaji/3, tanpa menghadkan jumlah. Ini penerapan templat pengguna, bukan pengesahan dasar semasa.
