import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface StuSource {
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

export const stuSources: StuSource[] = [
  {
    id: 'stu-cutoff-2026',
    publisher: 'Trường Đại học Công nghệ Sài Gòn (STU)',
    title: 'STU công bố điểm chuẩn trúng tuyển đại học chính quy năm 2026 - Đợt 1',
    url: 'https://tuyensinhdaihoc.stu.edu.vn/2026/08/12/stu-cong-bo-diem-chuan-trung-tuyen-dai-hoc-chinh-quy-nam-2026-dot-1/',
    accessedAt: '2026-09-26',
    publishedAt: '2026-08-12',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang tuyen sinh chính thức công bố bảng điểm chuẩn theo 20 ngành, căn cứ Quyết định 614/QD-DSG-DT ngay 09/08/2026. PT02 la xét điểm thi tốt nghiệp THPT năm 2026; điểm chuẩn áp dụng chung cho các tổ hợp trong cung mot phương thức, dành cho thí sinh khu vực 3 va nhom đối tượng không ưu tiên.',
  },
  {
    id: 'stu-admission-methods-2026',
    publisher: 'Trường Đại học Công nghệ Sài Gòn (STU)',
    title: 'Đại học Công nghệ Sài Gòn (STU) tuyển sinh Đại học 2026',
    url: 'https://tuyensinhdaihoc.stu.edu.vn/',
    accessedAt: '2026-09-26',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Homepage tuyen sinh chính thức nêu công thức PT02: DXT = điểm môn 01 + điểm môn 02 + điểm môn 03, thang 30, chưa cóng điểm ưu tiên/điểm cộng; điều kiện khác: nhom Kỹ thuật - Công nghệ phải có môn Toán, nhom Kinh tế/quan tri/Luật/Thiết kế my thuat/Du lich phải có môn Toán hoặc Văn, điểm Toán/Văn trong tổ hợp >= 1/3 điểm chuẩn chưa ưu tiên.',
  },
];
