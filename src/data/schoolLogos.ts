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
  format: 'svg' | 'png' | 'webp';
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
 * tiếp từ trang chủ chính thức (thẻ `<img>`/`og:image` trong HTML gốc, không suy đoán URL). Còn
 * 108 trường verified-exact chưa có logo + toàn bộ trường catalog-only — xem
 * docs/contributing-data.md mục "Logo trường" cho quy trình thêm 1 entry (P3 backlog, chạy
 * `npm run stats:coverage` không liệt kê tiến độ logo; tự đối chiếu
 * `Object.keys(SCHOOL_LOGOS).length` so với tổng catalog).
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
};

export function getSchoolLogo(schoolId: string): SchoolLogoRecord | undefined {
  return SCHOOL_LOGOS[schoolId];
}

/** Dùng trong test/audit: mọi record phải trỏ tới 1 school có thật trong registry. */
export function isKnownSchoolId(schoolId: string): boolean {
  return schoolId in schoolRegistry;
}
