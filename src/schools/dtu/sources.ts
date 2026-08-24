import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface DtuSource {
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

export const dtuSources: DtuSource[] = [
  {
    id: 'dtu-admission-info-2026',
    publisher: 'Duy Tan University (Truong Dai hoc Duy Tan)',
    title: 'Official 2026 undergraduate admission information',
    url: 'https://duytan.edu.vn/tuyen-sinh/page/EnrollArticleViewDetail.aspx?id=1010',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official DTU admission page: 6 methods (direct admission, THPT exam, transcript, VNU-HCM aptitude assessment, V-SAT, international high-school graduates), per-major-group numeric thresholds for THPT exam and transcript methods, and an IELTS-to-scaled-score conversion table.',
  },
  {
    id: 'dtu-floor-score-press-2026',
    publisher: 'Thanh Nien (state-run news)',
    title: 'Press coverage of DTU 2026 floor-score announcement',
    url: 'https://thanhnien.vn/dai-hoc-duy-tan-cong-bo-diem-san-xet-tuyen-nam-2026-185260703143254128.htm',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-03',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note: 'Cross-checks the per-major-group THPT floor scores reported on the official admission page.',
  },
];
