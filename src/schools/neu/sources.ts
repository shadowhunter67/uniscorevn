import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface NeuSource {
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

export const neuSources: NeuSource[] = [
  {
    id: 'neu-threshold-equivalence-2026',
    publisher: 'National Economics University (NEU)',
    title: 'Notice 1613/TB-DHKTQD dated 2026-07-03 on admission thresholds and equivalent admitted-score conversion between methods',
    url: 'https://neu.edu.vn/wp-content/uploads/2026/07/Thong-Bao-so-1613-ngay-03.7.2026-Ve-nguong-DBCL-dau-vao-va-quy-doi-tuong-duong-diem-trung-tuyen-giua-cac-phuong-thuc-xet-tuyen-DHCQ-nam-2026.pdf',
    accessedAt: '2026-08-21',
    publishedAt: '2026-07-03',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official signed PDF linked from neu.edu.vn. Page 1 lists the 22/30 threshold for A00/A01/D01/D07. Page 2 lists equivalent admitted-score bands for THPT, HSA, SAT, V-ACT, and TSA.',
  },
  {
    id: 'neu-admission-info-2026',
    publisher: 'National Economics University (NEU)',
    title: 'Decision publishing regular undergraduate admission information 2026',
    url: 'https://neu.edu.vn/wp-content/uploads/2026/03/Thong-tin-TS-nam-2026-hinh-thuc-dao-tao-DHCQ.pdf',
    accessedAt: '2026-08-21',
    publishedAt: '2026-03-06',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official signed admission-information PDF linked from neu.edu.vn. Trang 3 (mục 2.2): "ĐHKTQD sử dụng 04 tổ hợp xét tuyển là A00, A01, D01, D07, các môn trong tổ hợp là hệ số 1" cho PTXT5 (thi TN THPT). Trang 9 (mục 7.1): công thức điểm ưu tiên chính chủ đầy đủ (KV1/KV2-NT/KV2/KV3, ƯT1/ƯT2, công thức giảm dần khi tổng ≥22,5/30).',
  },
  {
    id: 'neu-cutoff-2026',
    publisher: 'Trường Đại học Kinh tế Quốc dân (Hội đồng tuyển sinh)',
    title: 'Thông báo 1890/TB-ĐHKTQD (09/8/2026): Điểm chuẩn trúng tuyển đại học chính quy năm 2026',
    url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-trung-tuyen-dai-hoc-kinh-te-quoc-dan-2026-119260809120816394.htm',
    accessedAt: '2026-09-22',
    publishedAt: '2026-08-09',
    sourceType: 'official-republication',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Cổng TTĐT Chính phủ đăng lại nguyên văn Thông báo 1890/TB-ĐHKTQD (ảnh văn bản ký/đóng dấu Giám đốc, đọc bằng chrome-devtools screenshot + vision). Bảng 88 mã tuyển sinh. Ghi chú cuối bảng: "Điểm chuẩn trúng tuyển là điểm quy đổi tương đương giữa các phương thức xét tuyển, tổ hợp xét tuyển thang điểm 30 theo điểm TN THPT năm 2026" — áp dụng mọi phương thức. Runtime CHỈ dùng 42/88 mã ngành CHUẨN (mã 7 chữ số, không gồm TT1/TT2/CLC1-3/POHEx/EPxx — các mã này thuộc chương trình tiên tiến/chất lượng cao/xét tuyển kết hợp riêng, dùng phương thức/tổ hợp khác PTXT5).',
  },
];

