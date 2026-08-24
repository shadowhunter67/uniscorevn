import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface UahSource {
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

export const uahSources: UahSource[] = [
  {
    id: 'uah-official-notice-2026',
    publisher: 'University of Architecture Ho Chi Minh City (Truong Dai hoc Kien truc TP.HCM)',
    title: 'Official 2026 undergraduate admission page (confirms Thong bao 975/TB-HDTS floor-score notice)',
    url: 'https://uah.edu.vn/tuyen-sinh-dai-hoc-chinh-quy-nam-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'incomplete',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official UAH page confirms Thong bao 975/TB-HDTS (posted 08/07/2026, "Ngưỡng đảm bảo chất lượng đầu vào") and a score-equivalence conversion document exist, but their PDF content is not directly readable via fetch. See uah-floor-score-press-2026 for the cross-checked numeric table.',
  },
  {
    id: 'uah-floor-score-press-2026',
    publisher: 'Tuoi Tre Online (state-run news, reporting the official UAH 2026 notice)',
    title: 'Press coverage of UAH 2026 floor-score announcement',
    url: 'https://tuoitre.vn/diem-san-truong-dai-hoc-kien-truc-tphcm-2026-nhieu-nganh-tu-17-diem-100260709165701113.htm',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-09',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note: 'Reports the per-program numeric floor scores (15-21/30) from the official 08/07/2026 UAH notice (975/TB-HDTS).',
  },
];
