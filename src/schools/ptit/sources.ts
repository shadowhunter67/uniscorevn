import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface PtitSource {
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

export const ptitSources: PtitSource[] = [
  {
    id: 'ptit-admission-methods-2026',
    publisher: 'Posts and Telecommunications Institute of Technology (PTIT)',
    title: 'Official 2026 undergraduate admission methods notice',
    url: 'https://tuyensinh.ptit.edu.vn/thong-baophuong-thuc-tuyen-sinh-dai-hoc-he-chinh-quy-nam-2026/',
    accessedAt: '2026-08-21',
    publishedAt: '2026-04-03',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official PTIT admissions page. It publishes method list, domestic exam thresholds, raw-score formula for DGNL/DGTD, THPT formula, and bonus tables.',
  },
  {
    id: 'ptit-thpt-threshold-2026',
    publisher: 'Posts and Telecommunications Institute of Technology (PTIT)',
    title: 'Thông báo Ngưỡng đảm bảo chất lượng đầu vào trình độ đại học chính quy đợt 1 năm 2026',
    url: 'https://tuyensinh.ptit.edu.vn/thong-bao-nguong-dam-bao-chat-luong-dau-vao-trinh-do-dai-hoc-chinh-quy-dot-1-nam-2026/',
    accessedAt: '2026-08-27',
    publishedAt: '2026-07-06',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PT5 (thi TN THPT): cơ sở phía Bắc (BVH) ≥ 20,00; cơ sở phía Nam (BVS) ≥ 16,50 trên thang 30 (05 tổ hợp A00/A01/D01/X06/X26). Ngưỡng đã bao gồm điểm ưu tiên KV/ĐT. Chương trình thạc sĩ tài năng và Vi mạch bán dẫn: công bố sau.',
  },
];

