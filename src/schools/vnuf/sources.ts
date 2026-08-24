import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VnufSource {
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

export const vnufSources: VnufSource[] = [
  {
    id: 'vnuf-admission-scheme-2026',
    publisher: 'Vietnam National University of Forestry (Truong Dai hoc Lam nghiep)',
    title: 'Official 2026 admission scheme (De an tuyen sinh trinh do dai hoc nam 2026)',
    url: 'https://daotao.vnuf.edu.vn/thong-bao?_101_assetEntryId=211376951&_101_struts_action=%2Fasset_publisher%2Fview_content&_101_type=content&_101_urlTitle=thong-tin-%C4%91e-an-tuyen-sinh-trinh-%C4%91o-%C4%91ai-hoc-nam-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official VNUF training-affairs office page confirms the 2026 undergraduate admission scheme: 5 methods (100 THPT exam, 200 transcript, 301 direct admission, 402 aptitude assessment, 500 other), total quota 2,000, and numeric thresholds for methods 100/200/402.',
  },
  {
    id: 'vnuf-chinhphu-secondary-2026',
    publisher: 'Cong Thong tin dien tu Chinh phu (xaydungchinhsach.chinhphu.vn)',
    title: 'Secondary government-portal coverage of VNUF 2026 admission notice',
    url: 'https://xaydungchinhsach.chinhphu.vn/truong-dai-hoc-lam-nghiep-tuyen-sinh-2026-119260221155518155.htm',
    accessedAt: '2026-08-24',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note: 'Government policy-news portal republishing of the official VNUF 2026 admission notice; used to cross-check the method-100 threshold (>= 15,0/30) and quota figure.',
  },
];
