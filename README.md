# chatrawichai-tech.github.io

หน้าเว็บของ chatrawichai-tech บน GitHub Pages — https://chatrawichai-tech.github.io/

| แอป | ที่อยู่ | โค้ดต้นทาง |
|---|---|---|
| สแกนเอกสารเป็น PDF | https://chatrawichai-tech.github.io/doc-scanner-pdf/ | repo `chatrawichai-tech/claude` (private) โฟลเดอร์ `doc-scanner-pdf/` |
| สแกนเอกสาร PDF — แอป Android | https://chatrawichai-tech.github.io/doc-scanner-pdf-android/ | repo `chatrawichai-tech/claude4app` (private) — ไฟล์ APK ที่เซ็นแล้ว |

## โครงสร้าง

```
doc-scanner-pdf/        แอปสแกนเอกสาร — สร้างอัตโนมัติจาก repo claude ด้วย tools/publish-site.sh ห้ามแก้ไฟล์ในโฟลเดอร์นี้เอง
                        (version.json = commit ต้นทางใน repo claude)
doc-scanner-pdf-android/  ไฟล์ APK ของแอป Android + หน้าดาวน์โหลด — CI ของ repo claude4app push ให้อัตโนมัติหลังทดสอบผ่าน
                        (เฉพาะ APK ที่เซ็นด้วยกุญแจถาวร) ห้ามแก้ไฟล์ในโฟลเดอร์นี้เอง
index.html, site.css    หน้าแรก (รายการแอป)
claude/index.html       ที่อยู่เดิมของแอป https://chatrawichai-tech.github.io/claude/ → พาไปที่อยู่ใหม่
.nojekyll               ให้ GitHub Pages เผยแพร่ไฟล์ตามจริง (ไม่ผ่าน Jekyll)
.github/workflows/live.yml   ตรวจเว็บจริงหลัง push ทุกครั้งและทุกวัน
```

โค้ดของแอปทั้งหมดอยู่ใน repo `claude` — repo นี้เก็บเฉพาะไฟล์ที่เผยแพร่เป็นหน้าเว็บ (ไฟล์เดียวกับที่เบราว์เซอร์ดาวน์โหลดไปใช้งานอยู่แล้ว)

## อัปเดตแอป

แก้ไขใน repo `claude` และให้ชุดทดสอบผ่าน แล้วเผยแพร่จาก commit นั้น (clone repo นี้ไว้ข้างกัน):

```bash
cd claude
tools/publish-site.sh          # เขียน ../chatrawichai-tech.github.io/doc-scanner-pdf/ ใหม่ทั้งโฟลเดอร์
cd ../chatrawichai-tech.github.io
git add -A && git commit -m "Publish doc-scanner-pdf from claude@<commit>" && git push origin main
```

`tools/publish-site.sh` ใช้เฉพาะไฟล์ที่ commit แล้ว ประทับเลข commit ลงในหน้าเว็บ (ล้างแคชเบราว์เซอร์อัตโนมัติ)
และเผยแพร่ commit เดิมซ้ำได้ไฟล์เหมือนเดิมทุกไบต์

## แอป Android

ทุกครั้งที่ CI ของ `claude4app` ออก Release ใหม่ (ทดสอบบน emulator มือถือ มือถือจอเล็ก และแท็บเล็ตผ่านครบ) งาน `site`
จะตรวจว่า APK เซ็นด้วยกุญแจถาวร แล้ว push โฟลเดอร์ `doc-scanner-pdf-android/` มาที่ repo นี้ (APK รุ่นล่าสุดไฟล์เดียว, `index.html`,
`version.json` ที่มี SHA-256) ด้วย deploy key ที่เขียนได้เฉพาะ repo นี้ (secret `SITE_DEPLOY_KEY` ใน claude4app)

## การตรวจสอบ

- **repo นี้** (`live.yml`): หลัง push และทุกวัน — โฟลเดอร์แอปเป็น build ที่ประทับเลข commit แล้ว, APK ตรงกับ SHA-256 ใน `version.json`,
  GitHub Pages ให้บริการ commit นี้ และทุกไฟล์บนเว็บจริงตรงกับไฟล์ใน repo ทุกไบต์, หน้าแรกและที่อยู่เดิมใช้งานได้
- **repo claude** (`published-site.yml`): ทุกวัน — โฟลเดอร์ `doc-scanner-pdf/` ที่นี่ตรงกับผลของ `publish-site.sh`
  และไม่มีการแก้ไขใน repo claude ที่ยังไม่ได้เผยแพร่

## ตั้งค่า GitHub Pages

Settings → Pages → Build and deployment → **Deploy from a branch** → `main` / `(root)`
