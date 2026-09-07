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
 * Rỗng cho tới khi có logo thật đầu tiên được xác minh nguồn — xem docs/contributing-data.md
 * mục "Logo trường" cho quy trình thêm 1 entry (P3 backlog, chạy `npm run stats:coverage` không
 * liệt kê tiến độ logo; tự đối chiếu `Object.keys(SCHOOL_LOGOS).length` so với tổng catalog).
 */
export const SCHOOL_LOGOS: Record<string, SchoolLogoRecord> = {};

export function getSchoolLogo(schoolId: string): SchoolLogoRecord | undefined {
  return SCHOOL_LOGOS[schoolId];
}

/** Dùng trong test/audit: mọi record phải trỏ tới 1 school có thật trong registry. */
export function isKnownSchoolId(schoolId: string): boolean {
  return schoolId in schoolRegistry;
}
