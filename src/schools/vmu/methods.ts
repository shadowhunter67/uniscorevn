import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vmuKnowledgeGaps } from './knowledgeGaps';

export const vmuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vmu-thpt-exam-2026',
    schoolId: 'vmu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (PT1)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vmuKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact) cho Phương thức 1 (PT1 — xét kết quả thi TN THPT).
   * Trích nguyên văn Thông báo 1329/TB-ĐHHHVN ngày 04/6/2026 (`vmu-admission-2026`):
   *  - Công thức (mục 2.2.1): ĐXT = Tổng điểm 3 môn tổ hợp + điểm ưu tiên (`calculator.ts`) —
   *    tổng thô, không hệ số, PT1 không có điểm cộng
   *  - Điểm ưu tiên: theo Điều 7 quy chế hiện hành (TT 06/2026) + công thức giảm ≥ 22,5 —
   *    judgment call như `schools/utc`/`schools/hup` (`priority.ts`)
   * Ngưỡng: Thông báo chỉ công bố nguyên văn ngưỡng sàn CHUNG 15,00/30 (mục 2.1); mức theo khối
   * ngành chưa đối chiếu lại nguồn 2026 ⇒ evaluator trả `score` exact nhưng `eligibility.status =
   * 'unknown'` khi tổng ≥ 15 (tiền lệ `schools/vku`). Loại trừ D127 (sơ tuyển Vẽ mỹ thuật).
   * KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'vmu-thpt-exam-exact-2026',
    schoolId: 'vmu',
    name: 'Xét kết quả thi TN THPT (PT1) — Điểm xét tuyển, phạm vi ngoài ngành có sơ tuyển năng khiếu',
    year: 2026,
    applicantTypes: [
      'Thí sinh xét PT1 (thi TN THPT 2026) vào một chương trình VMU không yêu cầu sơ tuyển năng khiếu',
    ],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
