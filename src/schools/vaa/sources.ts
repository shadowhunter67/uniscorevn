import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VaaSource {
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

export const vaaSources: VaaSource[] = [
  {
    id: 'vaa-admission-notice-2026',
    publisher: 'Vietnam Aviation Academy (Học viện Hàng không Việt Nam)',
    title: 'Tuyển sinh Đại học chính quy năm 2026',
    url: 'https://tuyensinh.vaa.edu.vn/vi/tuyen-sinh/dai-hoc/tuyen-sinh-dai-hoc-chinh-quy-nam-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official VAA admissions-portal page (tuyensinh.vaa.edu.vn), fetched directly. Confirms 5 admission methods for 2026 (THPT exam score, THPT transcript, ĐGNL of VNU Hanoi/HCM, international certificates SAT/ACT/IB, direct admission for award winners) and enrollment target of over 6,800 students.',
  },
  {
    id: 'vaa-hocba-notice-2026',
    publisher: 'Vietnam Aviation Academy (Học viện Hàng không Việt Nam)',
    title: 'LÀM SAO ĐỂ XÉT HỌC BẠ VÀO HỌC VIỆN HÀNG KHÔNG VIỆT NAM 2026?',
    url: 'https://tuyensinh.vaa.edu.vn/vi/tin-tuc/lam-sao-de-xet-hoc-ba-vao-hoc-vien-hang-khong-viet-nam-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official VAA news page, fetched directly. States the transcript/ĐGNL gate condition verbatim: "đảm bảo 3 môn thi từ 15 điểm trở lên ĐỂ ĐƯỢC XÉT HỌC BẠ/ĐGNL" (must ensure total of 3 THPT exam subjects reaches at least 15 points to be eligible for transcript/ĐGNL review). Also references transcript-method passing scores ranging 18-27/30 by program, but the per-program table itself was not extracted in this pass.',
  },
];
