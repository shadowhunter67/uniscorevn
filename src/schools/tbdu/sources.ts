import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TbduSource {
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

export const tbduSources: TbduSource[] = [
  {
    id: 'tbdu-admission-info-2026',
    publisher: 'Trường Đại học Thái Bình Dương (Pacific University)',
    title: 'Thông tin tuyển sinh đại học hệ chính quy năm 2026',
    url: 'https://tbd.edu.vn/tin-tuc/thong-tin-tuyen-sinh-dai-hoc-he-chinh-quy-nam-2026/',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính thức TBDU: 4 phương thức xét tuyển, ngưỡng chung 15,0/30 tổng 3 môn thi TN THPT, va điều kiện riêng cho Luật/Luật kinh tế (3 lua chọn: tổng điểm thi >=20; học lực tot + tổng điểm thi >=18; điểm xét tot nghiep >=8,5).',
  },
];
