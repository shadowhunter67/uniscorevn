import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hduKnowledgeGaps } from './knowledgeGaps';

export const hduAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hdu-thpt-exam-2026',
    schoolId: 'hdu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (PT1)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, ngành Luật/Luật Kinh tế'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hduKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), Phương thức 1 (xét thi TN THPT), phạm vi 2 ngành
   * Luật + Luật Kinh tế. Toàn bộ quy tắc trích nguyên văn Thông tin tuyển sinh 2026
   * (`hdu-admission-2026`):
   *  - Công thức (mục 7.5.b): Tổng điểm đạt được = A + B (kẹp trần 30); C = [(30 − A − B)/7,5] ×
   *    Mức ưu tiên khi (A+B) > 22,5; ĐXT = Tổng điểm đạt được + C (`calculator.ts` + `priority.ts`)
   *  - Ngưỡng (mục 6.1): tổng 3 môn ≥ 18,00 (không gồm ưu tiên) + Ngữ văn ≥ 6,00 (`thresholds.ts`)
   *  - Điểm ưu tiên KV/ĐT (mục 7.1): theo Điều 7 quy chế hiện hành
   * Phạm vi: điểm khuyến khích B (mục 7.2) "Nhà trường thông báo sau khi có hướng dẫn Bộ + UBND
   * tỉnh" → nhánh exact chỉ cho thí sinh KHÔNG có điểm khuyến khích (B = 0, caller có thể cung cấp
   * nếu đã tính). KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'hdu-thpt-exam-exact-2026',
    schoolId: 'hdu',
    name: 'Xét kết quả thi TN THPT (PT1) — Điểm xét tuyển ngành Luật / Luật Kinh tế',
    year: 2026,
    applicantTypes: [
      'Thí sinh xét PT1 (thi TN THPT 2026) vào ngành Luật hoặc Luật Kinh tế của HDU, không có điểm khuyến khích (giải HSG cấp tỉnh / lớp chuyên)',
    ],
    capabilities: { eligibility: true, scoreConversion: false, bonus: true, priority: true, exactCalculator: true },
  },
];
