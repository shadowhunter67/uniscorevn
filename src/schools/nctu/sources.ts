import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface NctuSource {
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

export const nctuSources: NctuSource[] = [
  {
    id: 'nctu-threshold-notice-2026',
    publisher: 'Truong Dai hoc Nam Can Tho',
    title: 'Thong bao nguong dam bao chat luong dau vao (diem san) xet tuyen dai hoc chinh quy nam 2026',
    url: 'https://nctu.edu.vn/truong-dai-hoc-nam-can-tho-cong-bo-diem-san-xet-tuyen-dai-hoc-chinh-quy-nam-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official NCTU 2026 notice (fetched via WebSearch summary; direct WebFetch of nctu.edu.vn failed with an expired TLS certificate in this pass, cross-checked against the independent government-affiliated republication phobienphapluat.vn). Confirms a common floor of 15/30 for the THPT-exam method across the majority of NCTU\'s 48 programs, while Health-group majors (Y khoa, RHM, Duoc) and Law-group majors (Luat, Luat Kinh te) require both an academic-rank gate (hoc luc lop 12 xep loai Tot) and a higher score (>=20/30 or diem xet tot nghiep >=8.5 for Health; >=18/30 for Law). Also documents separate hoc ba (18-23/30) and V-SAT (225-290) floor tables not modeled here.',
  },
];
