import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { ptitKnowledgeGaps } from './knowledgeGaps';

export const ptitAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'ptit-domestic-exam-2026',
    schoolId: 'ptit',
    name: 'Domestic aptitude/thinking exam admission route',
    year: 2026,
    applicantTypes: ['Candidates with TSA/HSA/V-ACT/SPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: ptitKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), Phương thức 5 (xét kết quả thi TN THPT). Trích
   * nguyên văn từ nguồn chính thức:
   *  - Công thức (TB493 mục C.5, `ptit-admission-methods-2026`): ĐXT = M1 + M2 + M3 + Điểm cộng
   *    + Điểm ƯT — tổng thô 3 môn (`calculator.ts`)
   *  - Điểm cộng (TB493 mục D): bảng IELTS 5.5-9.0 → 0,50-1,50; điểm thành tích do caller cung
   *    cấp; trần 3,0 (`bonus.ts`)
   *  - Điểm ưu tiên: "theo Quy chế Bộ GD&ĐT" → Điều 7 TT 06/2026 + công thức giảm ≥ 22,5 —
   *    judgment call như `schools/utc`/`schools/hup` (`priority.ts`)
   *  - Ngưỡng: BVH 20,00 / BVS 16,50 (`ptit-thpt-threshold-2026`), so với ĐXT đã cộng ưu tiên
   * Phạm vi: caller chọn `campusId` + tổ hợp trong 05 tổ hợp công bố. Chương trình thạc sĩ tài
   * năng / Vi mạch bán dẫn (ngưỡng công bố sau) ngoài phạm vi. KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'ptit-thpt-exam-exact-2026',
    schoolId: 'ptit',
    name: 'Xét kết quả thi TN THPT (PT5) — Điểm xét tuyển, theo cơ sở đào tạo BVH/BVS',
    year: 2026,
    applicantTypes: [
      'Thí sinh xét PT5 (thi TN THPT 2026) vào PTIT cơ sở phía Bắc (BVH) hoặc phía Nam (BVS), tổ hợp trong 05 tổ hợp công bố, ngoài chương trình thạc sĩ tài năng / Vi mạch bán dẫn',
    ],
    capabilities: { eligibility: true, scoreConversion: false, bonus: true, priority: true, exactCalculator: true },
  },
];
