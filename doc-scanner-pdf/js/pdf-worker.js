/*
 * pdf-worker.js — Web Worker (module) ที่รันตัวอ่าน PDF ของ PDF.js (vendor/pdfjs/pdf.worker.min.mjs) — สร้างโดย js/pdf-tools.js
 *
 *   new Worker(<ที่อยู่ไฟล์นี้>, { type: 'module', name: <ที่อยู่ pdf.worker.min.mjs จาก AppPlatform.resolve> })
 *
 * ทำไมไม่ให้ PDF.js สร้าง worker เอง: PDF.js (แม้รุ่น legacy) ใช้ Promise.withResolvers ซึ่งเบราว์เซอร์/WebView รุ่นเก่า
 * (Chrome/WebView ก่อน 119, Safari ก่อน 17.4) ยังไม่มี — ไฟล์นี้เติมให้ก่อน แล้วจึงโหลด PDF.js
 * ที่อยู่ของ PDF.js ส่งมาทาง name ของ worker (ใช้ได้ทั้ง URL ปกติและ blob: URL ของเวอร์ชัน Apps Script)
 * ข้อความที่มาถึงก่อน PDF.js โหลดเสร็จถูกเก็บไว้แล้วส่งต่อตามลำดับ (PDF.js ฝั่งหน้าเว็บส่งข้อความทันทีที่สร้าง worker)
 */
(function () {
  'use strict';

  if (typeof Promise.withResolvers !== 'function') {
    Promise.withResolvers = function () {
      var resolve, reject;
      var promise = new this(function (a, b) { resolve = a; reject = b; });
      return { promise: promise, resolve: resolve, reject: reject };
    };
  }

  var early = [];
  function hold(e) { early.push(e); }
  self.addEventListener('message', hold);

  /** รับเฉพาะ PDF.js ของแอปเอง: ต้นทางเดียวกัน (หรือ blob: ของต้นทางเดียวกัน) และเป็นไฟล์ pdf.worker.min.mjs */
  function allowed(src) {
    try {
      var u = new URL(src);
      if (u.protocol === 'blob:') return u.origin === self.location.origin;
      return u.origin === self.location.origin && /\/vendor\/pdfjs\/pdf\.worker\.min\.mjs$/.test(u.pathname);
    } catch (e) {
      return false;
    }
  }

  function fail(e) {
    self.removeEventListener('message', hold);
    early = null;
    setTimeout(function () { throw e; }); // ส่งเหตุการณ์ error ให้หน้าเว็บ (pdf-tools.js แจ้งผู้ใช้)
  }

  var src = String(self.name || '');
  if (!allowed(src)) {
    fail(new Error('PDF.js worker: ที่อยู่ไฟล์ไม่ถูกต้อง'));
    return;
  }
  import(src).then(function () {
    // PDF.js ติดตั้งตัวรับข้อความของตัวเองแล้ว — ส่งข้อความที่เก็บไว้ต่อตามลำดับ
    self.removeEventListener('message', hold);
    var list = early;
    early = null;
    list.forEach(function (e) { self.dispatchEvent(new MessageEvent('message', { data: e.data })); });
  }, fail);
})();
