import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VnuumpSource {
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

export const vnuumpSources: VnuumpSource[] = [
  {
    id: 'vnuump-admission-notice-2026',
    publisher: 'Truong Dai hoc Y Duoc - Dai hoc Quoc gia Ha Noi (VNU-UMP)',
    title: 'Thong tin tuyen sinh dai hoc chinh quy nam 2026 (Hinh thuc dao tao: Chinh quy)',
    url: 'https://ump.vnu.edu.vn/article-thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-(hinh-thuc-dao-tao-chinh-quy)-19647-3439.html',
    accessedAt: '2026-08-25',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official 2026 page (fetched directly, text-readable) lists 4 pathways (2% straight admission, 96% THPT exam, HSA-included, 2% ethnic-minority prep), 6 majors with combos (Y khoa/Rang Ham Mat/Ky thuat xet nghiem/Ky thuat hinh anh/Dieu duong: B00+D08; Duoc hoc: A00+D07), quotas (Y khoa 300, Duoc 180, Rang Ham Mat 60, Ky thuat xet nghiem 60, Ky thuat hinh anh 60, Dieu duong 60, tong 780), the common THPT-exam floor (total >=15.00/30), HSA-specific thresholds, and the general score formula (3-subject total + bonus + priority, capped at 30).',
  },
];
