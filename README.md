# chatrawichai-envbr.github.io — เว็บไซต์

เว็บไซต์ของแอปสแกนเอกสารเป็น PDF บน GitHub Pages — https://chatrawichai-envbr.github.io/

| แอป | ที่อยู่ | โค้ดต้นทาง |
|---|---|---|
| สแกนเอกสารเป็น PDF (เว็บแอป) | https://chatrawichai-envbr.github.io/doc-scanner-pdf/ | repo [`chatrawichai-envbr/doc-scanner-pdf-code`](https://github.com/chatrawichai-envbr/doc-scanner-pdf-code) โฟลเดอร์ `doc-scanner-pdf/` |
| สแกนเอกสาร PDF — แอป Android | https://chatrawichai-envbr.github.io/doc-scanner-pdf-android/ | repo [`chatrawichai-envbr/doc-scanner-pdf-android`](https://github.com/chatrawichai-envbr/doc-scanner-pdf-android) — ไฟล์ APK ที่เซ็นแล้ว |

repo นี้กู้คืนเมื่อ 2026-10-01 จาก `chatrawichai-tech/chatrawichai-tech.github.io` (บัญชีเดิมใช้ไม่ได้แล้ว)
และเปลี่ยนชื่อเป็น `chatrawichai-envbr/chatrawichai-envbr.github.io` เมื่อ 2026-10-02 —
ที่อยู่เดิม https://chatrawichai-tech.github.io/ ใช้ไม่ได้แล้ว

## โครงสร้าง

เว็บไซต์นี้เป็น GitHub Pages ของบัญชี (user site อยู่ที่ราก `/`) ลิงก์ทุกลิงก์เป็นแบบสัมพัทธ์ (ไม่ขึ้นต้นด้วย `/`)
หน้าเว็บจึงใช้ได้ทั้งที่รากและในโฟลเดอร์ย่อย

```
doc-scanner-pdf/          เว็บแอปสแกนเอกสาร — สร้างอัตโนมัติจาก repo doc-scanner-pdf-code ด้วย tools/publish-site.sh
                          ห้ามแก้ไฟล์ในโฟลเดอร์นี้เอง (version.json = commit ต้นทาง)
doc-scanner-pdf-android/  ไฟล์ APK ของแอป Android + หน้าดาวน์โหลด + นโยบายความเป็นส่วนตัว — CI ของ repo doc-scanner-pdf-android
                          push ให้อัตโนมัติหลังทดสอบผ่าน (เฉพาะ APK ที่เซ็นด้วยกุญแจถาวร) ห้ามแก้ไฟล์ในโฟลเดอร์นี้เอง
index.html, site.css      หน้าแรก (รายการแอป)
.nojekyll                 ให้ GitHub Pages เผยแพร่ไฟล์ตามจริง (ไม่ผ่าน Jekyll)
.github/workflows/live.yml   ตรวจเว็บจริงหลัง push ทุกครั้งและทุกวัน
```

โค้ดของแอปทั้งหมดอยู่ใน repo `doc-scanner-pdf-code` — repo นี้เก็บเฉพาะไฟล์ที่เผยแพร่เป็นหน้าเว็บ

## อัปเดตเว็บแอป

แก้ไขใน repo `doc-scanner-pdf-code` และให้ชุดทดสอบผ่าน แล้วเผยแพร่จาก commit นั้น (clone repo นี้ไว้ข้างกันในชื่อ `chatrawichai-envbr.github.io`):

```bash
cd doc-scanner-pdf-code
tools/publish-site.sh          # เขียน ../chatrawichai-envbr.github.io/doc-scanner-pdf/ ใหม่ทั้งโฟลเดอร์
cd ../chatrawichai-envbr.github.io
git add -A && git commit -m "Publish doc-scanner-pdf from doc-scanner-pdf-code@<commit>" && git push origin main
```

`tools/publish-site.sh` ใช้เฉพาะไฟล์ที่ commit แล้ว ประทับเลข commit ลงในหน้าเว็บ (ล้างแคชเบราว์เซอร์อัตโนมัติ)
และเผยแพร่ commit เดิมซ้ำได้ไฟล์เหมือนเดิมทุกไบต์

## แอป Android

ทุกครั้งที่ CI ของ `doc-scanner-pdf-android` ออก Release ใหม่ (ทดสอบบน emulator มือถือ มือถือจอเล็ก และแท็บเล็ตผ่านครบ) งาน `site`
จะตรวจว่า APK เซ็นด้วยกุญแจถาวร แล้ว push โฟลเดอร์ `doc-scanner-pdf-android/` มาที่ repo นี้ (APK รุ่นล่าสุดไฟล์เดียว, `index.html`,
`privacy.html` นโยบายความเป็นส่วนตัวของแอปที่ใช้กับ Google Play, `version.json` ที่มี SHA-256) ด้วย deploy key ที่เขียนได้เฉพาะ repo นี้
(secret `SITE_DEPLOY_KEY` ใน repo doc-scanner-pdf-android — วิธีตั้งอยู่ใน README ของ repo นั้น)

## การตรวจสอบ

- **repo นี้** (`live.yml`): หลัง push และทุกวัน — โฟลเดอร์แอปเป็น build ที่ประทับเลข commit แล้ว, APK ตรงกับ SHA-256 ใน `version.json`,
  GitHub Pages ให้บริการ commit นี้ และทุกไฟล์บนเว็บจริงตรงกับไฟล์ใน repo ทุกไบต์, หน้าแรกและหน้าดาวน์โหลดไม่มีลิงก์ที่ขึ้นต้นด้วย `/`
- **repo doc-scanner-pdf-code** (`published-site.yml`): ทุกวัน — โฟลเดอร์ `doc-scanner-pdf/` ที่นี่ตรงกับผลของ `publish-site.sh`
  และไม่มีการแก้ไขใน repo นั้นที่ยังไม่ได้เผยแพร่

## ตั้งค่า GitHub Pages (ทำครั้งเดียว)

Settings → Pages → Build and deployment → **Deploy from a branch** → `main` / `(root)` → Save
