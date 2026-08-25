import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TuafSource {
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

export const tuafSources: TuafSource[] = [
  {
    id: 'tuaf-admission-info-2026',
    publisher: 'Thai Nguyen University of Agriculture and Forestry (Truong Dai hoc Nong Lam - Dai hoc Thai Nguyen)',
    title: 'Official 2026 undergraduate admission floor-score notice (727/TB-DHNL)',
    url: 'https://tuaf.edu.vn/bai-viet/truong-dai-hoc-nong-lam-thai-nguyen-cong-bo-nguong-dam-bao-chat-luong-dau-vao-diem-san-dai-hoc-he-chinh-quy-dot-1-nam-2026-43603.html',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-07',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official Notice 727/TB-DHNL (07/07/2026): floor score (nguong dam bao chat luong dau vao / diem san) for Round 1, 2026 regular undergraduate admission is 16/30 (already including priority points), applied uniformly across all majors ("Muc diem san ap dung dong nhat cho tat ca cac nganh la 16 diem").',
  },
];
