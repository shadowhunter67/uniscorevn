import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface BvuSource {
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

export const bvuSources: BvuSource[] = [
  {
    id: 'bvu-admission-2026',
    publisher: 'Truong Dai hoc Ba Ria - Vung Tau (BVU)',
    title: 'Phuong thuc tuyen sinh - Thong tin tuyen sinh Truong Dai hoc Ba Ria - Vung Tau 2026',
    url: 'https://tuyensinh.bvu.edu.vn/phuong-thuc-tuyen-sinh/',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official BVU admission-portal page (tuyensinh.bvu.edu.vn) fetched live twice (homepage + phuong-thuc-tuyen-sinh page): confirms 5 independent admission methods, and for the hoc ba (transcript) method a computation formula of diem trung binh lop 12 cua 3 mon to hop + diem uu tien, with a general floor of 18,0/30 for most majors/programs, excluding Duoc hoc, Dieu duong, and the Cu nhan tai nang track. Per-exception numbers (Duoc hoc 24,0/30, Dieu duong 19,5/30, Cu nhan tai nang 22,0/30) are marked du kien (provisional) by the source and cross-checked via secondary aggregator coverage of the same page content.',
  },
];
