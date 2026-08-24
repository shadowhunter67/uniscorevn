import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VguSource {
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

export const vguSources: VguSource[] = [
  {
    id: 'vgu-admission-notice-2026',
    publisher: 'Vietnamese-German University (Truong Dai hoc Viet Duc)',
    title: 'Official 2026 floor-score announcement (Diem san xet tuyen)',
    url: 'https://tuyensinh.vgu.edu.vn/post/tr%C6%B0%E1%BB%9Dng-%C4%91%E1%BA%A1i-h%E1%BB%8Dc-vi%E1%BB%87t-%C4%91%E1%BB%A9c-c%C3%B4ng-b%E1%BB%91-%C4%91i%E1%BB%83m-s%C3%A0n-x%C3%A9t-tuy%E1%BB%83n-v%C3%A0o-c%C3%A1c-ch%C6%B0%C6%A1ng-tr%C3%ACnh-%C4%91%C3%A0o-t%E1%BA%A1o-b%E1%BA%ADc-%C4%91%E1%BA%A1i-h%E1%BB%8Dc-n%C4%83m-2026',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-09',
    sourceType: 'official-admission',
    verification: 'incomplete',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official VGU announcement states 5 admission methods, THPT floor range 17-22 (including priority/bonus points), English score requirement (avg >=8,0/10, or >=7,5 for Construction), and international certificate minimums (SAT>=1150, ACT>=23, IB>=28); the per-program numeric table is embedded as images, not machine-readable text.',
  },
  {
    id: 'vgu-floor-score-press-2026',
    publisher: 'Sai Gon Giai Phong (state-run news, reporting the official VGU 2026 notice)',
    title: 'Press coverage of VGU 2026 floor-score announcement with per-program numbers',
    url: 'https://www.sggp.org.vn/truong-dai-hoc-viet-duc-cong-bo-diem-san-xet-tuyen-dai-hoc-nam-2026-post862214.html',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-09',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Transcribes the per-program floor scores from the same 09/07/2026 VGU notice (Mechatronics 22, Business/Finance/CS/Mech/Econ/Digital Mgmt 19, Electrical & Computing 18.5, Architecture 18, Construction 17); loosely cross-checked against dantri.com.vn reporting actual admitted THPT scores in the 18.00-26.01 range for the same intake.',
  },
];
