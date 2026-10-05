@echo off
cd /d "%~dp0"
echo Sistem Rekod OT: http://127.0.0.1:8095
echo Biarkan tetingkap ini terbuka semasa menggunakan sistem.
"C:\laragon\bin\php\php-8.5.11-Win32-vs17-x64\php.exe" -S 127.0.0.1:8095 router.php
pause
