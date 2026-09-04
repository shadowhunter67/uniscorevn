import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * VYA (Học viện Thanh thiếu niên Việt Nam) 2026 — điểm trúng tuyển CHÍNH THỨC theo NGÀNH (9/9
 * ngành đại học chính quy tại Hà Nội, `sources.ts:vya-cutoff-2026`), công thức + tổ hợp CHÍNH CHỦ
 * (`sources.ts:vya-thong-tin-tuyen-sinh-2026`). 2 method:
 * - method[0] mã 100 (thi TN THPT 2026) — 9/9 ngành, wired vào comparisonAdapter.
 * - method[1] mã 200 (học bạ lớp 10/11/12) — 7/9 ngành (Luật/Quan hệ công chúng "Không xét").
 */
export const vyaAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vya-thpt-exam-exact-2026',
    schoolId: 'vya',
    name: 'Xét kết quả thi TN THPT 2026 (mã 100) — Điểm trúng tuyển theo ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026, chọn 1 trong 9 ngành đại học chính quy của VYA (cơ sở Hà Nội)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
  {
    id: 'vya-transcript-exact-2026',
    schoolId: 'vya',
    name: 'Xét học bạ THPT lớp 10/11/12 (mã 200) — Điểm trúng tuyển theo ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét học bạ THPT lớp 10/11/12, chọn 1 trong 7 ngành đại học chính quy của VYA (cơ sở Hà Nội) có xét phương thức này'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
