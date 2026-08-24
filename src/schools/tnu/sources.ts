import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TnuSource {
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

export const tnuSources: TnuSource[] = [
  {
    id: 'tnu-admission-notice-2026',
    publisher: 'Thai Nguyen University',
    title: 'Official 2026 regular undergraduate and college admission information (system-level)',
    url: 'https://tnu.edu.vn/dao-tao/thong-tin-tuyen-sinh/thong-tin-tuyen-sinh-dai-hoc-cao-dang-nam-2026-hinh-thuc-dao-tao-chinh-quy-cap-nhat-ngay-16-6-2026-3.html?categoryId=101886793',
    accessedAt: '2026-08-24',
    publishedAt: '2026-06-16',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Confirms Thai Nguyen University (TNU) is a multi-member university system (member universities plus schools/institutes/branch campuses in Lao Cai, Ha Giang, Dien Bien) offering 238 undergraduate programs (23,931 quota) using its own computer-based V-SAT assessment; individual member schools and branch campuses publish their own program-level thresholds.',
  },
  {
    id: 'tnu-threshold-notice-2026',
    publisher: 'Thai Nguyen University',
    title: 'Official 2026 system-wide quality assurance input threshold announcement',
    url: 'https://tnu.edu.vn/dao-tao/thong-tin-tuyen-sinh/dai-hoc-thai-nguyen-cong-bo-nguong-dam-bao-chat-luong-dau-vao-dai-hoc-cao-dang-nam-2026.html',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-08',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official TNU 2026 system-wide threshold notice. States a general minimum of 16.00/30 (THPT exam route, without subject coefficients, priority points included) for most programs, applying across all TNU member schools, with published higher floors for teacher-training (18.00-22.50), Medicine/Dentistry (22.00-23.00), semiconductor technology (22.50, with Math >= 7.50), and Law (20.00). Also references a V-SAT-to-THPT percentile/linear-interpolation conversion rule that is not modeled in this runtime yet, and notes member schools retain discretion to publish their own specific thresholds.',
  },
];
