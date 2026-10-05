# Visual system

## Portal tuntutan

Halaman utama eTuntutan menggunakan latar hijau pucat, tajuk Trebuchet MS dan teks Segoe UI. Ilustrasi kertas 3D menghubungkan meja kerja, jam, jalan dan pejabat. Dua pilihan ialah pautan besar yang berfungsi sebagai butang: OT berwarna sage dan TNT berwarna pasir. Status TNT menyatakan bahawa pengiraan belum tersedia. Grafik raster disimpan secara tempatan dalam assets/claims-illustration.webp.

Pengguna mengisi borang pada skrin komputer pejabat dalam suasana terang; permukaan cerah dan kontras teks tinggi menyokong kerja teliti.

## UI/UX Pro Max refinement

Selected guidance: Flat Design for enterprise web apps; Data-Dense Dashboard for readable tabular records; focusable inline error feedback. The search's marketing/video layout and sci-fi result are not applicable to this working tool.

Restrained palette: background #f4f6f4, paper #fdfefd, ink #233c35, muted text #52675f, primary action #225e49. System Segoe UI keeps this local app independent of external font services. Body 16px; controls 15–16px, table data 14px and supporting text at least 12px except compact navigation/category labels.

Sidebar width 246px, 44px action targets, consistent 20px stroke SVG icons, 8px controls and 12px panels. Profile grouped into identity, salary and work details. Selected navigation carries aria-current; skip link, visible focus, keyboard-operable restore and reduced-motion support.

Records become labeled stacked rows below 700px. Intermediate widths retain a scrollable table within its own container, without page overflow. Money uses tabular numbers. Salary reminder only appears when no positive rate is available. Pending save status is written and tinted amber; successful insertion uses green feedback; form errors remain local and receive focus.

No decorative animation; only 180ms state transitions. Print remains A4 landscape with detail and declarations on separate pages.
