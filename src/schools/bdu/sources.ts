import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface BduSource {
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

export const bduSources: BduSource[] = [
  {
    id: 'bdu-admission-2026',
    publisher: 'Trường Đại học Bình Dương (Binh Duong University)',
    title: 'Trường Đại học Bình Dương (Mã trường: DBD) chính thức công bố các khối xét tuyển và điểm sàn hệ đại học chính quy 2026',
    url: 'https://tuyensinh.bdu.edu.vn/dai-hoc-chinh-quy/truong-dai-hoc-binh-duong-ma-truong-dbd-chinh-thuc-cong-bo-cac-khoi-xet-tuyen-va-diem-san-he-dai-hoc-chinh-quy-745.html',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official BDU admission-portal page (tuyensinh.bdu.edu.vn) fetched live: 103 subject combinations (A00-Y11), and per-major-group THPT-exam floor scores: 15,0/30 for most majors, 20,0/30 for Luật/Luật Kinh tế and for Dược học (each of which also has a separate, cộng điểm ưu tiên transcript-method threshold not modeled here). Scholarship policy (50-70% tuition based on transcript/exam performance) documented but not modeled.',
  },
];
