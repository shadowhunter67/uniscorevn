import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface Hpu2Source {
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

export const hpu2Sources: Hpu2Source[] = [
  {
    id: 'hpu2-admission-info-2026',
    publisher: 'Hanoi Pedagogical University 2 (Truong Dai hoc Su pham Ha Noi 2)',
    title: 'Official 2026 undergraduate admission information',
    url: 'https://tuyensinh.hpu2.edu.vn/chi-tiet/tuyen-sinh-dai-hoc-chinh-quy-nam-2026.html',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official HPU2 admissions-portal page: 25 programs, 6 method categories (direct/priority, THPT exam, transcript, SP2E, H-SCA, combined aptitude test), numeric thresholds by program group (teacher-training >=18/30 or >=8,5/10; other programs >=15/30; PE >=11/30 2-subject; Early Childhood >=12/30 2-subject), and bonus-point cap rules.',
  },
];
