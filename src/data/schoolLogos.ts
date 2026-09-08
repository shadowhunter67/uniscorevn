import { schoolRegistry } from '../schools';

/**
 * Hạ tầng logo trường — KHÔNG bịa logo. Chỉ thêm entry vào `SCHOOL_LOGOS` khi có file ảnh thật lấy
 * từ nguồn chính thức (website trường/bộ nhận diện chính thức/tài liệu chính thức), đặt file tại
 * `public/schools/logos/<file>` và khai đủ `sourceUrl` + `retrievedAt`. Trường chưa có logo dùng
 * fallback initials (`SchoolLogo.tsx`) — không tự vẽ/generate logo giả.
 */
export interface SchoolLogoRecord {
  schoolId: string;
  /** Tên file trong public/schools/logos/ (không gồm đường dẫn). */
  file: string;
  format: 'svg' | 'png' | 'webp' | 'jpg';
  width: number;
  height: number;
  /** Trang web/tài liệu đã lấy logo — bắt buộc để audit được nguồn. */
  sourceUrl: string;
  sourceTitle: string;
  /** Ngày lấy logo (YYYY-MM-DD), để biết logo có thể đã lỗi thời (trường đổi nhận diện). */
  retrievedAt: string;
  usageNote?: string;
}

/**
 * Batch 1 (2026-09-08) — 26 trường verified-exact-calculator có traffic cao nhất, logo lấy trực
 * tiếp từ trang chủ chính thức (thẻ `<img>`/`og:image` trong HTML gốc, không suy đoán URL).
 * Batch 2 (2026-09-08) — thêm 63 trường verified-exact còn lại (crawl hàng loạt og:image/img logo
 * theo domain đã biết từ `src/schools/<id>/sources.ts`, mỗi ảnh được kiểm tra thủ công — loại các
 * bản "dark-version"/removebg có chữ trắng gần như vô hình trên nền sáng, vd `ou`, `ufm`, `qbu` bị
 * bỏ qua vì trang chủ chỉ có duy nhất bản logo trắng-trong-suốt không dùng được, và `hpmu` bị bỏ vì
 * asset "logo" trên trang là logo Bộ Y Tế chứ không phải logo trường). Còn khoảng 45 trường
 * verified-exact chưa có logo + toàn bộ trường catalog-only — xem docs/contributing-data.md mục
 * "Logo trường" cho quy trình thêm 1 entry (P3 backlog, chạy `npm run stats:coverage` không liệt
 * kê tiến độ logo; tự đối chiếu `Object.keys(SCHOOL_LOGOS).length` so với tổng catalog).
 */
export const SCHOOL_LOGOS: Record<string, SchoolLogoRecord> = {
  hcmus: { schoolId: 'hcmus', file: 'hcmus.png', format: 'png', width: 400, height: 326, sourceUrl: 'https://hcmus.edu.vn', sourceTitle: 'Trường Đại học Khoa học Tự nhiên – ĐHQG TP.HCM (trang chủ)', retrievedAt: '2026-09-08' },
  ueh: { schoolId: 'ueh', file: 'ueh.png', format: 'png', width: 7677, height: 1987, sourceUrl: 'https://ueh.edu.vn', sourceTitle: 'Trường Đại học Kinh tế TP.HCM (trang chủ)', retrievedAt: '2026-09-08' },
  uel: { schoolId: 'uel', file: 'uel.svg', format: 'svg', width: 455, height: 80, sourceUrl: 'https://uel.edu.vn', sourceTitle: 'Trường Đại học Kinh tế - Luật – ĐHQG TP.HCM (trang chủ)', retrievedAt: '2026-09-08' },
  hcmue: { schoolId: 'hcmue', file: 'hcmue.png', format: 'png', width: 2994, height: 1512, sourceUrl: 'https://hcmue.edu.vn', sourceTitle: 'Trường Đại học Sư phạm Thành phố Hồ Chí Minh (trang chủ)', retrievedAt: '2026-09-08' },
  hust: { schoolId: 'hust', file: 'hust.png', format: 'png', width: 1900, height: 270, sourceUrl: 'https://hust.edu.vn', sourceTitle: 'Đại học Bách khoa Hà Nội (trang chủ)', retrievedAt: '2026-09-08' },
  ftu: { schoolId: 'ftu', file: 'ftu.png', format: 'png', width: 491, height: 108, sourceUrl: 'https://ftu.edu.vn', sourceTitle: 'Trường Đại học Ngoại thương (trang chủ)', retrievedAt: '2026-09-08' },
  tmu: { schoolId: 'tmu', file: 'tmu.svg', format: 'svg', width: 77, height: 77, sourceUrl: 'https://tmu.edu.vn', sourceTitle: 'Trường Đại học Thương mại (trang chủ)', retrievedAt: '2026-09-08' },
  hou: { schoolId: 'hou', file: 'hou.png', format: 'png', width: 60, height: 72, sourceUrl: 'https://hou.edu.vn', sourceTitle: 'Trường Đại học Mở Hà Nội (trang chủ)', retrievedAt: '2026-09-08' },
  tlu: { schoolId: 'tlu', file: 'tlu.webp', format: 'webp', width: 1542, height: 336, sourceUrl: 'https://tlu.edu.vn', sourceTitle: 'Trường Đại học Thủy lợi (trang chủ)', retrievedAt: '2026-09-08' },
  hmu: { schoolId: 'hmu', file: 'hmu.png', format: 'png', width: 402, height: 99, sourceUrl: 'https://hmu.edu.vn', sourceTitle: 'Trường Đại học Y Hà Nội (trang chủ)', retrievedAt: '2026-09-08' },
  hup: { schoolId: 'hup', file: 'hup.png', format: 'png', width: 250, height: 250, sourceUrl: 'https://hup.edu.vn', sourceTitle: 'Trường Đại học Dược Hà Nội (trang chủ)', retrievedAt: '2026-09-08' },
  hlu: { schoolId: 'hlu', file: 'hlu.png', format: 'png', width: 168, height: 168, sourceUrl: 'https://hlu.edu.vn', sourceTitle: 'Trường Đại học Luật Hà Nội (trang chủ)', retrievedAt: '2026-09-08' },
  hunre: { schoolId: 'hunre', file: 'hunre.png', format: 'png', width: 925, height: 134, sourceUrl: 'https://hunre.edu.vn', sourceTitle: 'Trường Đại học Tài nguyên và Môi trường Hà Nội (trang chủ)', retrievedAt: '2026-09-08' },
  huce: { schoolId: 'huce', file: 'huce.png', format: 'png', width: 1200, height: 627, sourceUrl: 'https://huce.edu.vn', sourceTitle: 'Trường Đại học Xây dựng Hà Nội (trang chủ, og:image)', retrievedAt: '2026-09-08' },
  tdtu: { schoolId: 'tdtu', file: 'tdtu.png', format: 'png', width: 84, height: 50, sourceUrl: 'https://tdtu.edu.vn', sourceTitle: 'Trường Đại học Tôn Đức Thắng (trang chủ)', retrievedAt: '2026-09-08' },
  hutech: { schoolId: 'hutech', file: 'hutech.png', format: 'png', width: 628, height: 727, sourceUrl: 'https://hutech.edu.vn', sourceTitle: 'Trường Đại học Công nghệ TP. Hồ Chí Minh (trang chủ)', retrievedAt: '2026-09-08' },
  iuh: { schoolId: 'iuh', file: 'iuh.png', format: 'png', width: 580, height: 580, sourceUrl: 'https://iuh.edu.vn', sourceTitle: 'Trường Đại học Công nghiệp Thành phố Hồ Chí Minh (trang chủ, og:image)', retrievedAt: '2026-09-08' },
  vmu: { schoolId: 'vmu', file: 'vmu.png', format: 'png', width: 97, height: 97, sourceUrl: 'https://vimaru.edu.vn', sourceTitle: 'Trường Đại học Hàng hải Việt Nam (trang chủ)', retrievedAt: '2026-09-08' },
  ctu: { schoolId: 'ctu', file: 'ctu.png', format: 'png', width: 254, height: 241, sourceUrl: 'https://www.ctu.edu.vn', sourceTitle: 'Trường Đại học Cần Thơ (trang chủ)', retrievedAt: '2026-09-08' },
  ptit: { schoolId: 'ptit', file: 'ptit.png', format: 'png', width: 192, height: 192, sourceUrl: 'https://ptit.edu.vn', sourceTitle: 'Học viện Công nghệ Bưu chính Viễn thông (trang chủ, favicon 192px)', retrievedAt: '2026-09-08' },
  aof: { schoolId: 'aof', file: 'aof.png', format: 'png', width: 262, height: 298, sourceUrl: 'https://hvtc.edu.vn', sourceTitle: 'Học viện Tài chính (trang chủ)', retrievedAt: '2026-09-08' },
  ajc: { schoolId: 'ajc', file: 'ajc.png', format: 'png', width: 500, height: 500, sourceUrl: 'https://ajc.hcma.vn', sourceTitle: 'Học viện Báo chí và Tuyên truyền (trang chủ, og:image)', retrievedAt: '2026-09-08' },
  hcmulaw: { schoolId: 'hcmulaw', file: 'hcmulaw.png', format: 'png', width: 235, height: 63, sourceUrl: 'https://hcmulaw.edu.vn', sourceTitle: 'Trường Đại học Luật Thành phố Hồ Chí Minh (trang chủ)', retrievedAt: '2026-09-08' },
  ussh: { schoolId: 'ussh', file: 'ussh.png', format: 'png', width: 340, height: 224, sourceUrl: 'https://hcmussh.edu.vn', sourceTitle: 'Trường Đại học Khoa học Xã hội và Nhân văn – ĐHQG TP.HCM (trang chủ)', retrievedAt: '2026-09-08' },
  vnuuet: { schoolId: 'vnuuet', file: 'vnuuet.png', format: 'png', width: 192, height: 192, sourceUrl: 'https://uet.vnu.edu.vn', sourceTitle: 'Trường Đại học Công nghệ - ĐHQGHN (trang chủ, favicon 192px)', retrievedAt: '2026-09-08' },
  vnuhus: { schoolId: 'vnuhus', file: 'vnuhus.png', format: 'png', width: 661, height: 99, sourceUrl: 'https://hus.vnu.edu.vn', sourceTitle: 'Trường Đại học Khoa học Tự nhiên - ĐHQGHN (trang chủ)', retrievedAt: '2026-09-08' },
  uef: { schoolId: 'uef', file: 'uef.jpg', format: 'jpg', width: 137, height: 129, sourceUrl: 'https://uef.edu.vn', sourceTitle: 'Trường Đại học Kinh tế - Tài chính TP.HCM (trang chủ)', retrievedAt: '2026-09-08' },
  tdmu: { schoolId: 'tdmu', file: 'tdmu.svg', format: 'svg', width: 244, height: 91, sourceUrl: 'https://tdmu.edu.vn', sourceTitle: 'Trường Đại học Thủ Dầu Một (trang chủ)', retrievedAt: '2026-09-08' },
  hiu: { schoolId: 'hiu', file: 'hiu.png', format: 'png', width: 3697, height: 932, sourceUrl: 'https://hiu.vn', sourceTitle: 'Trường Đại học Quốc tế Hồng Bàng (trang chủ)', retrievedAt: '2026-09-08' },
  sgu: { schoolId: 'sgu', file: 'sgu.png', format: 'png', width: 271, height: 58, sourceUrl: 'https://sgu.edu.vn', sourceTitle: 'Trường Đại học Sài Gòn (trang chủ)', retrievedAt: '2026-09-08' },
  vinhuni: { schoolId: 'vinhuni', file: 'vinhuni.png', format: 'png', width: 250, height: 250, sourceUrl: 'https://vinhuni.edu.vn', sourceTitle: 'Trường Đại học Vinh (trang chủ)', retrievedAt: '2026-09-08' },
  utc: { schoolId: 'utc', file: 'utc.png', format: 'png', width: 590, height: 99, sourceUrl: 'https://utc.edu.vn', sourceTitle: 'Trường Đại học Giao thông vận tải (trang chủ)', retrievedAt: '2026-09-08' },
  huflit: { schoolId: 'huflit', file: 'huflit.png', format: 'png', width: 400, height: 268, sourceUrl: 'https://huflit.edu.vn', sourceTitle: 'Trường Đại học Ngoại ngữ - Tin học TP. Hồ Chí Minh (trang chủ)', retrievedAt: '2026-09-08' },
  ctuet: { schoolId: 'ctuet', file: 'ctuet.png', format: 'png', width: 413, height: 413, sourceUrl: 'https://ctuet.edu.vn', sourceTitle: 'Trường Đại học Kỹ thuật - Công nghệ Cần Thơ (trang chủ)', retrievedAt: '2026-09-08' },
  tvu: { schoolId: 'tvu', file: 'tvu.png', format: 'png', width: 2560, height: 524, sourceUrl: 'https://tvu.edu.vn', sourceTitle: 'Trường Đại học Trà Vinh (trang chủ)', retrievedAt: '2026-09-08' },
  blu: { schoolId: 'blu', file: 'blu.png', format: 'png', width: 2946, height: 1186, sourceUrl: 'https://blu.edu.vn', sourceTitle: 'Trường Đại học Bạc Liêu (trang chủ)', retrievedAt: '2026-09-08' },
  dnu: { schoolId: 'dnu', file: 'dnu.png', format: 'png', width: 115, height: 115, sourceUrl: 'https://dnpu.edu.vn', sourceTitle: 'Trường Đại học Đồng Nai (trang chủ)', retrievedAt: '2026-09-08' },
  mku: { schoolId: 'mku', file: 'mku.jpg', format: 'jpg', width: 236, height: 150, sourceUrl: 'https://mku.edu.vn', sourceTitle: 'Trường Đại học Cửu Long (trang chủ)', retrievedAt: '2026-09-08' },
  pvu: { schoolId: 'pvu', file: 'pvu.png', format: 'png', width: 540, height: 81, sourceUrl: 'https://pvu.edu.vn', sourceTitle: 'Trường Đại học Dầu khí Việt Nam (trang chủ)', retrievedAt: '2026-09-08' },
  vnussh: { schoolId: 'vnussh', file: 'vnussh.png', format: 'png', width: 100, height: 100, sourceUrl: 'https://ussh.vnu.edu.vn', sourceTitle: 'Trường Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN (trang chủ)', retrievedAt: '2026-09-08' },
  bav: { schoolId: 'bav', file: 'bav.png', format: 'png', width: 3360, height: 1313, sourceUrl: 'https://hvnh.edu.vn', sourceTitle: 'Học viện Ngân hàng (trang chủ)', retrievedAt: '2026-09-08' },
  thanglong: { schoolId: 'thanglong', file: 'thanglong.svg', format: 'svg', width: 501, height: 143, sourceUrl: 'https://thanglong.edu.vn', sourceTitle: 'Trường Đại học Thăng Long (trang chủ)', retrievedAt: '2026-09-08' },
  hump: { schoolId: 'hump', file: 'hump.png', format: 'png', width: 277, height: 64, sourceUrl: 'https://huemed-univ.edu.vn', sourceTitle: 'Trường Đại học Y - Dược, Đại học Huế (trang chủ)', retrievedAt: '2026-09-08' },
  qnu: { schoolId: 'qnu', file: 'qnu.svg', format: 'svg', width: 360, height: 60, sourceUrl: 'https://qnu.edu.vn', sourceTitle: 'Trường Đại học Quy Nhơn (trang chủ)', retrievedAt: '2026-09-08' },
  pctu: { schoolId: 'pctu', file: 'pctu.png', format: 'png', width: 1481, height: 1284, sourceUrl: 'https://pctu.edu.vn', sourceTitle: 'Trường Đại học Phan Châu Trinh (trang chủ)', retrievedAt: '2026-09-08' },
  tueba: { schoolId: 'tueba', file: 'tueba.png', format: 'png', width: 1200, height: 130, sourceUrl: 'https://tueba.edu.vn', sourceTitle: 'Trường Đại học Kinh tế và Quản trị kinh doanh - Đại học Thái Nguyên (trang chủ)', retrievedAt: '2026-09-08' },
  tnut: { schoolId: 'tnut', file: 'tnut.png', format: 'png', width: 1280, height: 1280, sourceUrl: 'https://tnut.edu.vn', sourceTitle: 'Trường Đại học Kỹ thuật Công nghiệp - Đại học Thái Nguyên (trang chủ)', retrievedAt: '2026-09-08' },
  tump: { schoolId: 'tump', file: 'tump.png', format: 'png', width: 504, height: 118, sourceUrl: 'https://tump.edu.vn', sourceTitle: 'Trường Đại học Y - Dược, Đại học Thái Nguyên (trang chủ)', retrievedAt: '2026-09-08' },
  dsu: { schoolId: 'dsu', file: 'dsu.png', format: 'png', width: 1653, height: 206, sourceUrl: 'https://dsu.edu.vn', sourceTitle: 'Trường Đại học Thể dục Thể thao Đà Nẵng (trang chủ)', retrievedAt: '2026-09-08' },
  hdiu: { schoolId: 'hdiu', file: 'hdiu.png', format: 'png', width: 1920, height: 1568, sourceUrl: 'https://hdiu.edu.vn', sourceTitle: 'Trường Đại học Đông Đô (trang chủ)', retrievedAt: '2026-09-08' },
  humg: { schoolId: 'humg', file: 'humg.png', format: 'png', width: 446, height: 87, sourceUrl: 'https://humg.edu.vn', sourceTitle: 'Trường Đại học Mỏ - Địa chất (trang chủ)', retrievedAt: '2026-09-08' },
  hdu: { schoolId: 'hdu', file: 'hdu.png', format: 'png', width: 920, height: 244, sourceUrl: 'https://hdu.edu.vn', sourceTitle: 'Trường Đại học Hồng Đức (trang chủ)', retrievedAt: '2026-09-08' },
  ttn: { schoolId: 'ttn', file: 'ttn.png', format: 'png', width: 1200, height: 1200, sourceUrl: 'https://ttn.edu.vn', sourceTitle: 'Truong Dai hoc Tay Nguyen (trang chủ)', retrievedAt: '2026-09-08' },
  hul: { schoolId: 'hul', file: 'hul.png', format: 'png', width: 495, height: 495, sourceUrl: 'https://hul.edu.vn', sourceTitle: 'Trường Đại học Luật, Đại học Huế (trang chủ)', retrievedAt: '2026-09-08' },
  huaf: { schoolId: 'huaf', file: 'huaf.png', format: 'png', width: 350, height: 74, sourceUrl: 'https://huaf.edu.vn', sourceTitle: 'Trường Đại học Nông Lâm, Đại học Huế (trang chủ)', retrievedAt: '2026-09-08' },
  hueedu: { schoolId: 'hueedu', file: 'hueedu.png', format: 'png', width: 125, height: 122, sourceUrl: 'https://dhsphue.edu.vn', sourceTitle: 'Trường Đại học Sư phạm, Đại học Huế (trang chủ)', retrievedAt: '2026-09-08' },
  uedudn: { schoolId: 'uedudn', file: 'uedudn.png', format: 'png', width: 500, height: 500, sourceUrl: 'https://ued.udn.vn', sourceTitle: 'Trường Đại học Sư phạm - Đại học Đà Nẵng (trang chủ)', retrievedAt: '2026-09-08' },
  vku: { schoolId: 'vku', file: 'vku.svg', format: 'svg', width: 487, height: 68, sourceUrl: 'https://vku.udn.vn', sourceTitle: 'Trường Đại học Công nghệ Thông tin và Truyền thông Việt - Hàn (trang chủ)', retrievedAt: '2026-09-08' },
  pntu: { schoolId: 'pntu', file: 'pntu.png', format: 'png', width: 154, height: 139, sourceUrl: 'https://pnt.edu.vn', sourceTitle: 'Trường Đại học Y khoa Phạm Ngọc Thạch (trang chủ)', retrievedAt: '2026-09-08' },
  dtu: { schoolId: 'dtu', file: 'dtu.png', format: 'png', width: 179, height: 60, sourceUrl: 'https://duytan.edu.vn', sourceTitle: 'Truong Dai hoc Duy Tan (trang chủ)', retrievedAt: '2026-09-08' },
  uah: { schoolId: 'uah', file: 'uah.png', format: 'png', width: 42, height: 56, sourceUrl: 'https://uah.edu.vn', sourceTitle: 'Truong Dai hoc Kien truc TP.HCM (trang chủ)', retrievedAt: '2026-09-08' },
  bdu: { schoolId: 'bdu', file: 'bdu.png', format: 'png', width: 1000, height: 228, sourceUrl: 'https://bdu.edu.vn', sourceTitle: 'Truong Dai hoc Binh Duong (trang chủ)', retrievedAt: '2026-09-08' },
  bvu: { schoolId: 'bvu', file: 'bvu.png', format: 'png', width: 1481, height: 426, sourceUrl: 'https://bvu.edu.vn', sourceTitle: 'Truong Dai hoc Ba Ria - Vung Tau (trang chủ)', retrievedAt: '2026-09-08' },
  dla: { schoolId: 'dla', file: 'dla.png', format: 'png', width: 400, height: 100, sourceUrl: 'https://daihoclongan.edu.vn', sourceTitle: 'Trường Đại học Kinh tế Công nghiệp Long An (trang chủ)', retrievedAt: '2026-09-08' },
  hubt: { schoolId: 'hubt', file: 'hubt.png', format: 'png', width: 1000, height: 130, sourceUrl: 'https://hubt.edu.vn', sourceTitle: 'Trường Đại học Kinh doanh và Công nghệ Hà Nội (trang chủ)', retrievedAt: '2026-09-08' },
  gdu: { schoolId: 'gdu', file: 'gdu.png', format: 'png', width: 1326, height: 453, sourceUrl: 'https://giadinh.edu.vn', sourceTitle: 'Trường Đại học Gia Định (trang chủ)', retrievedAt: '2026-09-08' },
  halongu: { schoolId: 'halongu', file: 'halongu.jpg', format: 'jpg', width: 500, height: 400, sourceUrl: 'https://uhl.edu.vn', sourceTitle: 'Trường Đại học Hạ Long (trang chủ)', retrievedAt: '2026-09-08' },
  ntuhn: { schoolId: 'ntuhn', file: 'ntuhn.png', format: 'png', width: 800, height: 556, sourceUrl: 'https://daihocnguyentrai.edu.vn', sourceTitle: 'Truong Dai hoc Nguyen Trai (trang chủ)', retrievedAt: '2026-09-08' },
  tbdu: { schoolId: 'tbdu', file: 'tbdu.jpg', format: 'jpg', width: 600, height: 300, sourceUrl: 'https://tbd.edu.vn', sourceTitle: 'Truong Dai hoc Thai Binh Duong (trang chủ)', retrievedAt: '2026-09-08' },
  tdu: { schoolId: 'tdu', file: 'tdu.png', format: 'png', width: 1481, height: 168, sourceUrl: 'https://tdu.edu.vn', sourceTitle: 'Truong Dai hoc Tay Do (trang chủ)', retrievedAt: '2026-09-08' },
  tgu: { schoolId: 'tgu', file: 'tgu.png', format: 'png', width: 604, height: 65, sourceUrl: 'https://tgu.edu.vn', sourceTitle: 'Truong Dai hoc Tien Giang (trang chủ)', retrievedAt: '2026-09-08' },
  thanhdo: { schoolId: 'thanhdo', file: 'thanhdo.svg', format: 'svg', width: 729, height: 561, sourceUrl: 'https://thanhdo.edu.vn', sourceTitle: 'Truong Dai hoc Thanh Do (trang chủ)', retrievedAt: '2026-09-08' },
  tuaf: { schoolId: 'tuaf', file: 'tuaf.png', format: 'png', width: 180, height: 55, sourceUrl: 'https://tuaf.edu.vn', sourceTitle: 'Truong Dai hoc Nong Lam - Dai hoc Thai Nguyen (trang chủ)', retrievedAt: '2026-09-08' },
  ttu: { schoolId: 'ttu', file: 'ttu.png', format: 'png', width: 910, height: 180, sourceUrl: 'https://ttu.edu.vn', sourceTitle: 'Truong Dai hoc Tan Tao (trang chủ)', retrievedAt: '2026-09-08' },
  uda: { schoolId: 'uda', file: 'uda.svg', format: 'svg', width: 35, height: 33, sourceUrl: 'https://donga.edu.vn', sourceTitle: 'Trường Đại học Đông Á (trang chủ)', retrievedAt: '2026-09-08' },
  uhd: { schoolId: 'uhd', file: 'uhd.png', format: 'png', width: 512, height: 512, sourceUrl: 'https://uhd.edu.vn', sourceTitle: 'Trường Đại học Hải Dương (trang chủ)', retrievedAt: '2026-09-08' },
  umt: { schoolId: 'umt', file: 'umt.png', format: 'png', width: 400, height: 400, sourceUrl: 'https://umt.edu.vn', sourceTitle: 'Trường Đại học Quản lý và Công nghệ TP.HCM (trang chủ)', retrievedAt: '2026-09-08' },
  utm: { schoolId: 'utm', file: 'utm.png', format: 'png', width: 293, height: 124, sourceUrl: 'https://utm.edu.vn', sourceTitle: 'Trường Đại học Công nghệ và Quản lý hữu nghị (trang chủ)', retrievedAt: '2026-09-08' },
  haui: { schoolId: 'haui', file: 'haui.svg', format: 'svg', width: 170, height: 50, sourceUrl: 'https://haui.edu.vn', sourceTitle: 'Trường Đại học Công nghiệp Hà Nội (trang chủ)', retrievedAt: '2026-09-08' },
  lhu: { schoolId: 'lhu', file: 'lhu.png', format: 'png', width: 761, height: 200, sourceUrl: 'https://lhu.edu.vn', sourceTitle: 'Trường Đại học Lạc Hồng (trang chủ)', retrievedAt: '2026-09-08' },
  vnuump: { schoolId: 'vnuump', file: 'vnuump.png', format: 'png', width: 1490, height: 401, sourceUrl: 'https://ump.vnu.edu.vn', sourceTitle: 'Truong Dai hoc Y Duoc - Dai hoc Quoc gia Ha Noi (trang chủ)', retrievedAt: '2026-09-08' },
  vwa: { schoolId: 'vwa', file: 'vwa.svg', format: 'svg', width: 84, height: 70, sourceUrl: 'https://hvpnvn.edu.vn', sourceTitle: 'Học viện Phụ nữ Việt Nam (trang chủ)', retrievedAt: '2026-09-08' },
  hau: { schoolId: 'hau', file: 'hau.png', format: 'png', width: 112, height: 92, sourceUrl: 'https://hau.edu.vn', sourceTitle: 'Trường Đại học Kiến trúc Hà Nội (trang chủ, logo footer nền xanh)', retrievedAt: '2026-09-08' },
  pxu: { schoolId: 'pxu', file: 'pxu.png', format: 'png', width: 4167, height: 2084, sourceUrl: 'https://pxu.edu.vn', sourceTitle: 'Trường Đại học Phú Xuân (trang chủ)', retrievedAt: '2026-09-08' },
  hcmupes: { schoolId: 'hcmupes', file: 'hcmupes.png', format: 'png', width: 396, height: 120, sourceUrl: 'https://upes.edu.vn', sourceTitle: 'Trường Đại học Sư phạm Thể dục Thể thao Thành phố Hồ Chí Minh (trang chủ)', retrievedAt: '2026-09-08' },
  vttu: { schoolId: 'vttu', file: 'vttu.png', format: 'png', width: 331, height: 344, sourceUrl: 'https://vttu.edu.vn', sourceTitle: 'Trường Đại học Võ Trường Toản (trang chủ)', retrievedAt: '2026-09-08' },
  hvu: { schoolId: 'hvu', file: 'hvu.png', format: 'png', width: 100, height: 100, sourceUrl: 'https://hvu.edu.vn', sourceTitle: 'Trường Đại học Hùng Vương (trang chủ)', retrievedAt: '2026-09-08' },
  vhs: { schoolId: 'vhs', file: 'vhs.png', format: 'png', width: 470, height: 80, sourceUrl: 'https://hcmuc.edu.vn', sourceTitle: 'Trường Đại học Văn hóa Thành phố Hồ Chí Minh (trang chủ)', retrievedAt: '2026-09-08' },
  vya: { schoolId: 'vya', file: 'vya.png', format: 'png', width: 6155, height: 1005, sourceUrl: 'https://vya.edu.vn', sourceTitle: 'Học viện Thanh thiếu niên Việt Nam (trang chủ)', retrievedAt: '2026-09-08' },

  // Batch 3 (2026-09-08) — 40 trường verified-exact còn lại, domain xác thực từ src/schools/<id>/sources.ts
  // (hoặc tra cứu web khi sources.ts không có URL chính chủ) rồi mới crawl logo trên đúng domain đó —
  // KHÔNG đoán domain pattern như batch trước. 5 trường bị bỏ qua: `qbu`/`hpmu` (đã xác nhận lại logo
  // trên domain đúng vẫn không dùng được — qbu.edu.vn chỉ có bản logo xám nhạt gần như vô hình, hpmu
  // chỉ có asset "logo" là huy hiệu Bộ Y Tế không phải logo trường, giống kết luận batch 2), `ou`
  // (ou.edu.vn vẫn chỉ có bản dark-version trắng-trong-suốt, giữ nguyên kết luận batch 2), `iu`
  // (hcmiu.edu.vn/tuyensinh.hcmiu.edu.vn chặn bởi JS cookie-challenge chống bot, không lấy được HTML
  // thật), `uflsudn` (ufl.udn.vn liên tục 502 Bad Gateway nhiều lần thử — domain đang lỗi).
  apd: { schoolId: 'apd', file: 'apd.png', format: 'png', width: 339, height: 458, sourceUrl: 'https://apd.edu.vn', sourceTitle: 'Học viện Chính sách và Phát triển (trang chủ)', retrievedAt: '2026-09-08' },
  bmtu: { schoolId: 'bmtu', file: 'bmtu.png', format: 'png', width: 1268, height: 674, sourceUrl: 'https://bmu.edu.vn', sourceTitle: 'Trường Đại học Y Dược Buôn Ma Thuột (trang chủ, og:image)', retrievedAt: '2026-09-08' },
  cmcu: { schoolId: 'cmcu', file: 'cmcu.png', format: 'png', width: 400, height: 71, sourceUrl: 'https://cmcu.edu.vn', sourceTitle: 'Trường Đại học CMC (trang chủ)', retrievedAt: '2026-09-08' },
  ctump: { schoolId: 'ctump', file: 'ctump.png', format: 'png', width: 512, height: 109, sourceUrl: 'https://ctump.edu.vn', sourceTitle: 'Trường Đại học Y Dược Cần Thơ (media.ctump.edu.vn, header)', retrievedAt: '2026-09-08' },
  dainam: { schoolId: 'dainam', file: 'dainam.png', format: 'png', width: 922, height: 232, sourceUrl: 'https://dainam.edu.vn', sourceTitle: 'Trường Đại học Đại Nam (trang chủ, logo ngang)', retrievedAt: '2026-09-08' },
  dlu: { schoolId: 'dlu', file: 'dlu.png', format: 'png', width: 193, height: 193, sourceUrl: 'https://dlu.edu.vn', sourceTitle: 'Trường Đại học Đà Lạt (trang chủ)', retrievedAt: '2026-09-08' },
  dthu: { schoolId: 'dthu', file: 'dthu.png', format: 'png', width: 200, height: 200, sourceUrl: 'https://dthu.edu.vn', sourceTitle: 'Trường Đại học Đồng Tháp (trang chủ)', retrievedAt: '2026-09-08' },
  dumtp: { schoolId: 'dumtp', file: 'dumtp.png', format: 'png', width: 1200, height: 1200, sourceUrl: 'https://ydn.edu.vn', sourceTitle: 'Trường Đại học Kỹ thuật Y Dược Đà Nẵng (trang chủ)', retrievedAt: '2026-09-08' },
  fbu: { schoolId: 'fbu', file: 'fbu.png', format: 'png', width: 400, height: 96, sourceUrl: 'https://fbu.edu.vn', sourceTitle: 'Trường Đại học Tài chính - Ngân hàng Hà Nội (trang chủ, header logo)', retrievedAt: '2026-09-08' },
  fpfu: { schoolId: 'fpfu', file: 'fpfu.png', format: 'png', width: 669, height: 671, sourceUrl: 'https://daihocpccc.edu.vn', sourceTitle: 'Trường Đại học Phòng cháy Chữa cháy (trang chủ, logo Học viện PCCC và Cứu nạn cứu hộ)', retrievedAt: '2026-09-08' },
  fptu: { schoolId: 'fptu', file: 'fptu.png', format: 'png', width: 330, height: 93, sourceUrl: 'https://daihoc.fpt.edu.vn', sourceTitle: 'Trường Đại học FPT (trang chủ, header logo)', retrievedAt: '2026-09-08' },
  hat: { schoolId: 'hat', file: 'hat.png', format: 'png', width: 192, height: 192, sourceUrl: 'https://huht.hueuni.edu.vn', sourceTitle: 'Trường Du lịch - Đại học Huế (trang chủ, favicon 192px)', retrievedAt: '2026-09-08' },
  hbu: { schoolId: 'hbu', file: 'hbu.webp', format: 'webp', width: 1128, height: 865, sourceUrl: 'https://daihochoabinh.edu.vn', sourceTitle: 'Trường Đại học Hòa Bình (trang chủ, thương hiệu "Victoria Hòa Bình University")', retrievedAt: '2026-09-08' },
  hca: { schoolId: 'hca', file: 'hca.png', format: 'png', width: 85, height: 85, sourceUrl: 'http://hcmca.edu.vn', sourceTitle: 'Học viện Cán bộ Thành phố Hồ Chí Minh (trang chủ)', retrievedAt: '2026-09-08' },
  hce: { schoolId: 'hce', file: 'hce.jpg', format: 'jpg', width: 372, height: 372, sourceUrl: 'https://hce.edu.vn', sourceTitle: 'Trường Đại học Kinh tế, Đại học Huế (trang chủ, ảnh loading/logo)', retrievedAt: '2026-09-08' },
  hcmut: { schoolId: 'hcmut', file: 'hcmut.png', format: 'png', width: 3508, height: 2481, sourceUrl: 'https://hcmut.edu.vn', sourceTitle: 'Trường Đại học Bách khoa – ĐHQG TP.HCM (trang chủ, bundle JS nhận diện thương hiệu)', retrievedAt: '2026-09-08' },
  hcmute: { schoolId: 'hcmute', file: 'hcmute.jpg', format: 'jpg', width: 2711, height: 466, sourceUrl: 'https://hcmute.edu.vn', sourceTitle: 'Trường Đại học Công nghệ Kỹ thuật TP. Hồ Chí Minh (trang chủ, banner logo HCM-UTE)', retrievedAt: '2026-09-08' },
  hluv: { schoolId: 'hluv', file: 'hluv.jpg', format: 'jpg', width: 520, height: 108, sourceUrl: 'http://hluv.edu.vn', sourceTitle: 'Trường Đại học Hoa Lư (trang chủ, header logo)', retrievedAt: '2026-09-08' },
  hnmu: { schoolId: 'hnmu', file: 'hnmu.png', format: 'png', width: 1116, height: 223, sourceUrl: 'https://hnmu.edu.vn', sourceTitle: 'Trường Đại học Thủ đô Hà Nội (trang chủ)', retrievedAt: '2026-09-08' },
  hsu: { schoolId: 'hsu', file: 'hsu.png', format: 'png', width: 1055, height: 519, sourceUrl: 'https://www.hoasen.edu.vn', sourceTitle: 'Trường Đại học Hoa Sen (trang chủ, header logo)', retrievedAt: '2026-09-08' },
  htu: { schoolId: 'htu', file: 'htu.png', format: 'png', width: 495, height: 90, sourceUrl: 'https://htu.edu.vn', sourceTitle: 'Trường Đại học Hà Tĩnh (trang chủ, ảnh nền logo template)', retrievedAt: '2026-09-08' },
  hub: { schoolId: 'hub', file: 'hub.svg', format: 'svg', width: 2386, height: 820, sourceUrl: 'https://hub.edu.vn', sourceTitle: 'Trường Đại học Ngân hàng TP. Hồ Chí Minh (trang chủ, inline SVG logo trong header)', retrievedAt: '2026-09-08' },
  huc: { schoolId: 'huc', file: 'huc.png', format: 'png', width: 200, height: 195, sourceUrl: 'https://huc.edu.vn', sourceTitle: 'Trường Đại học Văn hóa Hà Nội (trang chủ)', retrievedAt: '2026-09-08' },
  husc: { schoolId: 'husc', file: 'husc.png', format: 'png', width: 2203, height: 424, sourceUrl: 'https://husc.edu.vn', sourceTitle: 'Trường Đại học Khoa học, Đại học Huế (trang chủ, logo_vi_white.png — nền xanh đậm)', retrievedAt: '2026-09-08' },
  ltvuni: { schoolId: 'ltvuni', file: 'ltvuni.jpg', format: 'jpg', width: 1200, height: 119, sourceUrl: 'https://ltvu.edu.vn', sourceTitle: 'Trường Đại học Lương Thế Vinh (trang chủ, banner navbar-brand)', retrievedAt: '2026-09-08' },
  naem: { schoolId: 'naem', file: 'naem.jpg', format: 'jpg', width: 812, height: 815, sourceUrl: 'https://naem.edu.vn', sourceTitle: 'Học viện Quản lý giáo dục (trang chủ, logo header)', retrievedAt: '2026-09-08' },
  nctu: { schoolId: 'nctu', file: 'nctu.webp', format: 'webp', width: 100, height: 97, sourceUrl: 'https://nctu.edu.vn', sourceTitle: 'Trường Đại học Nam Cần Thơ (trang chủ, favicon)', retrievedAt: '2026-09-08' },
  nlu: { schoolId: 'nlu', file: 'nlu.jpg', format: 'jpg', width: 293, height: 293, sourceUrl: 'https://nlu.edu.vn', sourceTitle: 'Trường Đại học Nông Lâm TP.HCM (trang chủ, og:image)', retrievedAt: '2026-09-08' },
  phenikaa: { schoolId: 'phenikaa', file: 'phenikaa.png', format: 'png', width: 2448, height: 493, sourceUrl: 'https://phenikaa-uni.edu.vn', sourceTitle: 'Trường Đại học Phenikaa (trang chủ, module logo)', retrievedAt: '2026-09-08' },
  qnamu: { schoolId: 'qnamu', file: 'qnamu.png', format: 'png', width: 225, height: 225, sourceUrl: 'https://qnamuni.edu.vn', sourceTitle: 'Trường Đại học Quảng Nam (trang chủ)', retrievedAt: '2026-09-08' },
  tbu: { schoolId: 'tbu', file: 'tbu.jpg', format: 'jpg', width: 253, height: 48, sourceUrl: 'https://tbu.edu.vn', sourceTitle: 'Trường Đại học Thái Bình (media.tbu.edu.vn, logo dashboard)', retrievedAt: '2026-09-08' },
  trungvuong: { schoolId: 'trungvuong', file: 'trungvuong.png', format: 'png', width: 262, height: 96, sourceUrl: 'https://tv-uni.edu.vn', sourceTitle: 'Trường Đại học Trưng Vương (tv-uni.edu.vn, logo gốc)', retrievedAt: '2026-09-08' },
  ufm: { schoolId: 'ufm', file: 'ufm.png', format: 'png', width: 366, height: 95, sourceUrl: 'https://ufm.edu.vn', sourceTitle: 'Trường Đại học Tài chính – Marketing (trang chủ, logo4.png)', retrievedAt: '2026-09-08' },
  ump: { schoolId: 'ump', file: 'ump.png', format: 'png', width: 320, height: 320, sourceUrl: 'https://ump.edu.vn', sourceTitle: 'Trường Đại học Y Dược Thành phố Hồ Chí Minh (trang chủ, logo2.png dùng cho .brand)', retrievedAt: '2026-09-08' },
  ush: { schoolId: 'ush', file: 'ush.png', format: 'png', width: 200, height: 200, sourceUrl: 'https://ush.edu.vn', sourceTitle: 'Trường Đại học Thể dục Thể thao Thành phố Hồ Chí Minh (trang chủ, logo-dh.png)', retrievedAt: '2026-09-08' },
  utt: { schoolId: 'utt', file: 'utt.jpg', format: 'jpg', width: 1200, height: 628, sourceUrl: 'https://utt.edu.vn', sourceTitle: 'Trường Đại học Công nghệ Giao thông vận tải (trang chủ, logo-utt)', retrievedAt: '2026-09-08' },
  vnua: { schoolId: 'vnua', file: 'vnua.png', format: 'png', width: 700, height: 79, sourceUrl: 'https://vnua.edu.vn', sourceTitle: 'Học viện Nông nghiệp Việt Nam (trang chủ, header logo)', retrievedAt: '2026-09-08' },
  vnueb: { schoolId: 'vnueb', file: 'vnueb.png', format: 'png', width: 2375, height: 2425, sourceUrl: 'https://ueb.edu.vn', sourceTitle: 'Trường Đại học Kinh tế - ĐHQGHN (trang chủ, logo.png)', retrievedAt: '2026-09-08' },
  vnued: { schoolId: 'vnued', file: 'vnued.png', format: 'png', width: 180, height: 180, sourceUrl: 'https://education.vnu.edu.vn', sourceTitle: 'Trường Đại học Giáo dục - ĐHQGHN (trang chủ, apple-touch-icon 180px)', retrievedAt: '2026-09-08' },
  vnuulis: { schoolId: 'vnuulis', file: 'vnuulis.png', format: 'png', width: 567, height: 567, sourceUrl: 'https://ulis.vnu.edu.vn', sourceTitle: 'Trường Đại học Ngoại ngữ - Đại học Quốc gia Hà Nội (trang chủ, header logo)', retrievedAt: '2026-09-08' },
};

export function getSchoolLogo(schoolId: string): SchoolLogoRecord | undefined {
  return SCHOOL_LOGOS[schoolId];
}

/** Dùng trong test/audit: mọi record phải trỏ tới 1 school có thật trong registry. */
export function isKnownSchoolId(schoolId: string): boolean {
  return schoolId in schoolRegistry;
}
