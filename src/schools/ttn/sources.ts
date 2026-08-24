import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TtnSource {
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

export const ttnSources: TtnSource[] = [
  {
    id: 'ttn-admission-notice-2026',
    publisher: 'Tay Nguyen University',
    title: 'Official 2026 regular undergraduate admission information notice',
    url: 'https://tuyensinh.ttn.edu.vn/2026/04/10/tttsdhcqnam2026/',
    accessedAt: '2026-08-24',
    publishedAt: '2026-04-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official TTN 2026 admission page links a full information PDF (methods, programs, subject combinations); the PDF itself is a scanned/binary layout that could not be text-extracted, so program-level detail beyond the threshold notice below remains unparsed.',
  },
  {
    id: 'ttn-threshold-notice-2026',
    publisher: 'Tay Nguyen University',
    title: 'Official 2026 application receipt threshold notice (muc diem nhan ho so xet tuyen)',
    url: 'https://tuyensinh.ttn.edu.vn/2026/07/10/tbmdnhsxtdh2026/',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official TTN 2026 threshold notice. States a common baseline of total three THPT exam subjects >= 15.00/30 for most programs, with higher published floors for Medicine (22), teacher-training programs (20), and Nursing/Medical Laboratory Technology (18). Also references transcript (PT200) and VNU aptitude-test (PT402) alternative criteria and a combined-aptitude route (PT405) with a separate core-subject minimum, which are not modeled in this runtime yet.',
  },
];
