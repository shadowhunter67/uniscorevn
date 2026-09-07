import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hutechKnowledgeGaps } from './knowledgeGaps';

const vsatGap = hutechKnowledgeGaps.filter((gap) => gap.id === 'hutech-vsat-scale-conflicting');

/**
 * HUTECH 2026 — 4 phương thức xét tuyển (tên mô tả thay vì số hiệu PT, xem `sources.ts` lý do).
 *
 * `exactCalculator: true` cho thpt/dgnl/hocba, theo đúng semantics conditional-exact đã dùng ở
 * USSH/IU/TDTU/HUFLIT: exact trong phạm vi thí sinh KHÔNG có thành tích cộng điểm (bảng điểm
 * thưởng/khuyến khích CHƯA tìm được nguồn, xem `knowledgeGaps.ts`). KHÔNG gắn `knowledgeGaps` vào 3
 * descriptor này (cùng lý do USSH/IU/TDTU/HUFLIT — `auditMethods()` coi `exactCalculator:true` +
 * `knowledgeGaps` non-empty là lỗi EXACT_METHOD_HAS_UNRESOLVED_GAPS).
 *
 * `hocba` lên `exactCalculator: true` (batch "6 học kỳ") — blocker duy nhất trước đây là độ chi tiết
 * dữ liệu (`hutech-hocba-semester-granularity-gap`, ĐÃ ĐÓNG: `ApplicantProfile.transcript.bySemester`
 * nay lưu đủ 6 học kỳ, xem `core/transcriptSemesters.ts`). Thiếu dữ liệu học kỳ của thí sinh cụ thể
 * là "thiếu input" (evaluator trả `partial` + liệt kê ô còn thiếu), KHÔNG phải gap tri thức.
 * `vsat` giữ eligibility-only — thang điểm/công thức quy đổi chưa xác định rõ ràng
 * (`knowledgeGaps.ts:hutech-vsat-scale-conflicting`).
 */
export const hutechAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hutech-thpt-2026',
    schoolId: 'hutech',
    name: 'Xét kết quả thi tốt nghiệp THPT 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, không có thành tích cộng điểm'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: true, exactCalculator: true },
  },
  {
    id: 'hutech-hocba-2026',
    schoolId: 'hutech',
    name: 'Xét học bạ THPT (6 học kỳ)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT, không có thành tích cộng điểm'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: true, exactCalculator: true },
  },
  {
    id: 'hutech-vsat-2026',
    schoolId: 'hutech',
    name: 'Xét kết quả V-SAT 2026',
    year: 2026,
    applicantTypes: ['Thí sinh có kết quả V-SAT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vsatGap,
  },
  {
    id: 'hutech-dgnl-2026',
    schoolId: 'hutech',
    name: 'Xét kết quả ĐGNL ĐHQG TP.HCM 2026',
    year: 2026,
    applicantTypes: ['Thí sinh có kết quả ĐGNL ĐHQG-HCM 2026'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: true, exactCalculator: true },
  },
];
