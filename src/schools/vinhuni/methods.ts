import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vinhuniKnowledgeGaps } from './knowledgeGaps';

export const vinhuniAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vinhuni-thpt-exam-2026',
    schoolId: 'vinhuni',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (Phương thức 100)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vinhuniKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), Phương thức 100 (xét thi TN THPT). Trích nguyên văn
   * Phụ lục 1 (`vinhuni-quality-threshold-conversion-2026`):
   *  - Công thức (mục I.1): Điểm xét tuyển = [Điểm thi + Điểm thưởng] + Điểm ưu tiên; điểm 3 môn
   *    không hệ số, làm tròn 2 chữ số thập phân (`calculator.ts`)
   *  - Điểm ưu tiên: Điều 7 quy chế hiện hành + công thức giảm ≥ 22,5 (`priority.ts`)
   *  - Ngưỡng theo mã ngành (`thresholds.ts`): 55 mã ngành có PT100, so với (tổng 3 môn + điểm ưu
   *    tiên); ngoài ra không môn nào ≤ 1,0
   * Phạm vi: điểm thưởng do caller cung cấp (mặc định 0). Ngoài phạm vi: ngành có năng khiếu
   * (GDMN/GDTC/Kiến trúc), Sư phạm Tiếng Anh và Ngôn ngữ Trung (điều kiện ngoại ngữ nhiều lựa
   * chọn). KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'vinhuni-thpt-exam-exact-2026',
    schoolId: 'vinhuni',
    name: 'Xét kết quả thi TN THPT (PT100) — Điểm xét tuyển, 55 mã ngành ngoài nhóm năng khiếu',
    year: 2026,
    applicantTypes: [
      'Thí sinh xét PT100 (thi TN THPT 2026) vào một mã ngành Trường Đại học Vinh có PT100 (ngoài nhóm ngành năng khiếu, Sư phạm Tiếng Anh, Ngôn ngữ Trung Quốc)',
    ],
    capabilities: { eligibility: true, scoreConversion: false, bonus: true, priority: true, exactCalculator: true },
  },
];
