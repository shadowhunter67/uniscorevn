import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface DluSource {
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

export const dluSources: DluSource[] = [
  {
    id: 'dlu-official-notice-2026',
    publisher: 'Dalat University',
    title: 'Official 2026 admission floor score notice (muc diem san dang ky xet tuyen)',
    url: 'https://dlu.edu.vn/thong-bao-muc-diem-san-dang-ky-xet-tuyen-dai-hoc-he-chinh-quy-nam-2026-truong-dai-hoc-da-lat/',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'incomplete',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note: 'Official DLU notice URL identified via search, but dlu.edu.vn could not be fetched directly (TLS certificate/WAF handshake failure: "unable to verify the first certificate"). Content not directly verified; see dlu-threshold-press-2026 for cross-checked press coverage of the same notice.',
  },
  {
    id: 'dlu-threshold-press-2026',
    publisher: 'Tuoi Tre / Thanh Nien (state-run news, reporting the official DLU 2026 notice)',
    title: 'Press coverage of DLU 2026 admission floor score announcement',
    url: 'https://thanhnien.vn/truong-dh-da-lat-cong-bo-diem-san-2026-cac-nganh-su-pham-cao-nhat-185260709110001808.htm',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-09',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Cross-checked against a second independent report (Tuoi Tre, https://tuoitre.vn/diem-san-su-pham-truong-dh-da-lat-cao-hon-quy-dinh-cua-bo-1-diem-100260709093811603.htm, accessed 2026-08-24). Both report the same 2026-07-09 official DLU notice: social sciences 16/30, engineering/technology 17-18/30, law 18/30 (plus Class-12 English transcript average >= 7), teacher-training majors (Math/Vietnamese/English/Primary Education) 21/30 (no transcript route), nuclear engineering requires Math and Physics THPT scores >= 6.5 each. Primary DLU site fetch blocked (TLS/WAF); numbers not yet confirmed against the primary PDF/notice text.',
  },
];
