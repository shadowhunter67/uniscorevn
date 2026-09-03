import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface DnuSource {
  id: string;
  publisher: string;
  title: string;
  url: string;
  accessedAt: string;
  publishedAt?: string;
  sourceType?: SourceType;
  verification: VerificationLevel;
  lifecycle?: SourceLifecycle;
  note?: string;
}

export const dnuSources: DnuSource[] = [
  {
    id: 'dnu-threshold-2025',
    publisher: 'Trường Đại học Đồng Nai (mã trường DNU, dnpu.edu.vn, tên miền chính chủ)',
    title: 'Quyết định số 1408/QĐ-HĐTS ngày 22/8/2025 — Công bố điểm chuẩn trúng tuyển đại học, cao đẳng chính quy năm 2025',
    url: 'https://dnpu.edu.vn/diem-chuan-trung-tuyen-dai-hoc-cao-dang-chinh-quy-nam-2025',
    accessedAt: '2026-09-03',
    publishedAt: '2025-08-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Văn bản có chữ ký Phó Hiệu trưởng + con dấu (TS. Võ Văn Lý), phụ lục "Danh sách điểm chuẩn trúng tuyển đại học, cao đẳng chính quy năm 2025" liệt kê 11 ngành với 1 cột "Điểm trúng tuyển ngành" duy nhất (không tách theo tổ hợp/phương thức) — thang 30, dao động 16.00 (Quản trị kinh doanh, Kế toán) đến 26.51 (Sư phạm Ngữ văn). File PDF gốc tại đường dẫn đính kèm trên trang.',
  },
  {
    id: 'dnu-thongtin-2025',
    publisher: 'Trường Đại học Đồng Nai (dnpu.edu.vn, tên miền chính chủ)',
    title: 'Thông tin tuyển sinh năm 2025 (cập nhật 24/6/2025, biểu mẫu 3 công khai, Thông tư 09/2024/TT-BGDĐT)',
    url: 'https://dnpu.edu.vn/thong-tin-tuyen-sinh-nam-2025',
    accessedAt: '2026-09-03',
    publishedAt: '2025-06-24',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Mục II.3 "Quy tắc quy đổi tương đương ngưỡng đầu vào và điểm trúng tuyển giữa các tổ hợp, phương thức tuyển sinh" ghi rõ: "Độ chênh lệch điểm xét tuyển giữa các tổ hợp: = 0. Độ lệch điểm giữa phương thức tuyển sinh: = 0" — xác nhận điểm chuẩn theo ngành (dnu-threshold-2025) áp dụng như nhau cho mọi tổ hợp/phương thức của ngành đó. Mục 4 "Chỉ tiêu tuyển sinh" + bảng "Danh sách mã xét tuyển theo đợt tuyển" liệt kê tổ hợp môn của phương thức 100 (Xét kết quả thi TN THPT) cho từng ngành, và bảng "Danh sách tổ hợp môn" định nghĩa từng mã tổ hợp (bao gồm X01 Toán-Văn-GDKTPL, X05 Toán-Lý-GDKTPL, X07 Toán-Lý-Công nghệ công nghiệp). Mục II.5.a nêu điều kiện phụ: ngành Sư phạm Toán yêu cầu điểm Toán thi TN THPT >= 5.0; ngành Sư phạm Tiếng Anh/Ngôn ngữ Anh yêu cầu điểm Tiếng Anh thi TN THPT >= 7.0 trong tổ hợp xét tuyển. Mục II.5.b "Điểm cộng" để trống — không có bảng điểm cộng cụ thể. Mục II.7 "Chính sách ưu tiên" chỉ dẫn chiếu Phụ lục I/II của Thông tư 08/2022/TT-BGDĐT (không tự công bố mức điểm ưu tiên riêng, xem `priority.ts`). Mục II.1.c: các ngành Sư phạm chỉ tuyển thí sinh có hộ khẩu/thường trú tại tỉnh Đồng Nai trước ngày tổ chức kỳ thi THPT (trừ thí sinh khuyết tật xét tuyển thẳng) — module này KHÔNG chặn theo điều kiện này (không có input hồ sơ tương ứng, xem `knowledgeGaps.ts`). 2 ngành Giáo dục Mầm non (cao đẳng 51140201, đại học 7140201) chỉ có phương thức 405/406/301 (Năng khiếu/học bạ/tuyển thẳng), KHÔNG có phương thức 100 — không đưa vào `thresholds.ts`.',
  },
];
