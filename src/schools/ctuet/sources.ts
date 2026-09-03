import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface CtuetSource {
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

export const ctuetSources: CtuetSource[] = [
  {
    id: 'ctuet-threshold-2025',
    publisher: 'Trường Đại học Kỹ thuật - Công nghệ Cần Thơ (mã trường KCC, ctuet.edu.vn, tên miền chính chủ)',
    title: 'Thông báo số 79/TB-ĐHKTCN ngày 22/8/2025 — Điểm trúng tuyển đại học chính quy năm 2025',
    url: 'https://tuyensinh.ctuet.edu.vn/tuyen-sinh-dai-hoc-2025/thong-bao-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2025-2262.html',
    accessedAt: '2026-09-03',
    publishedAt: '2025-08-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Văn bản có chữ ký Hiệu trưởng + con dấu, công bố điểm trúng tuyển 22 ngành đại học chính quy năm 2025 theo 3 phương thức (KQ thi TN THPT / KQ học bạ lớp 12 / KQ ĐGNL ĐHQG-HCM). Module này CHỈ dùng cột "KQ thi TN THPT" (thang 30), dao động 20.15 (Công nghệ kỹ thuật công trình xây dựng) đến 24.68 (Luật).',
  },
  {
    id: 'ctuet-quyche-2025',
    publisher: 'Trường Đại học Kỹ thuật - Công nghệ Cần Thơ (ctuet.edu.vn, tên miền chính chủ)',
    title: 'Quyết định số 396/QĐ-ĐHKTCN ngày 29/4/2025 — Quy chế tuyển sinh đại học',
    url: 'https://tuyensinh.ctuet.edu.vn/tuyen-sinh-dai-hoc-2025/quy-che-tuyen-sinh-2025-248.html',
    accessedAt: '2026-09-03',
    publishedAt: '2025-04-29',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Điều 2.7/2.9 định nghĩa "điểm xét" dùng để so với "điểm trúng tuyển" LÀ điểm đã tính cả điểm ưu tiên ("...được quy thành điểm số để xét tuyển (điểm xét) trong đó có tính cả các điểm ưu tiên"). Điều 7.5 công thức giảm điểm ưu tiên cho thí sinh đạt tổng điểm từ 22,5 trở lên (thang 10 mỗi môn/30 tổng): ĐUT = [(30 − Tổng điểm đạt được)/7,5] × (Mức ĐUT khu vực + Mức ĐUT đối tượng) — đúng công thức quốc gia hiện hành. Phụ lục II (khu vực: KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0) và Phụ lục III (đối tượng: nhóm UT1 2,0 / nhóm UT2 1,0) là mức điểm ưu tiên CHÍNH CHỦ trường tự công bố (không phải judgment call quốc gia thay thế do trường im lặng — khác trường hợp TUEBA/PVU). Điều 6.2.b chỉ nêu trần chung "điểm cộng" (thành tích đặc biệt) tối đa 3/30 điểm, KHÔNG có bảng điểm cộng cụ thể theo loại thành tích/chứng chỉ cho CTUET — module không mô hình hoá điểm cộng (mặc định 0, đa số thí sinh không có thành tích đặc biệt).',
  },
  {
    id: 'ctuet-thongtin-2025',
    publisher: 'Trường Đại học Kỹ thuật - Công nghệ Cần Thơ (ctuet.edu.vn, tên miền chính chủ)',
    title: 'Thông tin tuyển sinh năm 2025 (biểu mẫu 3 công khai, Thông tư 09/2024/TT-BGDĐT)',
    url: 'https://drive.google.com/file/d/1l4njmVxBryAk63tV9LGHw-rMr76wUlAJ/view?usp=sharing',
    accessedAt: '2026-09-03',
    publishedAt: '2025-06-13',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Mục 3.2.1 nêu nguyên văn công thức Phương thức 1: "Điểm xét tuyển = (Điểm thi TN THPT môn 1 + Điểm thi TN THPT môn 2 + Điểm thi TN THPT môn 3) + Điểm ưu tiên + điểm cộng". Mục 4.2 là bảng chỉ tiêu/tổ hợp xét tuyển đầy đủ 22 ngành (mã xét tuyển, mã ngành, tổ hợp môn) dùng làm nguồn ánh xạ ngành → tổ hợp cho module này. Ghi được đóng dấu treo (con dấu Trường ở đầu mỗi trang), file scan từ máy photocopy/Toshiba e-Studio 857 của Phòng Quản lý đào tạo — không phải văn bản public HTML.',
  },
];
