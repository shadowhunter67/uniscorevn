import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hauKnowledgeGaps } from './knowledgeGaps';

export const hauAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hau-thpt-exam-2026',
    schoolId: 'hau',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (nhóm ngành không yêu cầu năng khiếu)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hauKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact) cho thí sinh KHÔNG có điểm cộng thành tích. Trích
   * nguyên văn Quyết định 406/QĐ-ĐHKT-ĐT (`sources.ts:hau-quality-threshold-2026`, Điều 1): "mức
   * điểm nhận hồ sơ ... là tổng điểm các môn trong tổ hợp xét tuyển, điểm ưu tiên và điểm cộng
   * (nếu có)" ⇒ với thí sinh không có điểm cộng, ĐXT = tổng thô 3 môn + điểm ưu tiên. Điểm ưu
   * tiên: Điều 7 Thông tư 06/2026/TT-BGDĐT (judgment call, `priority.ts`). Ngưỡng: 15/30 (nhóm
   * hạ tầng/giao thông/cấp thoát nước) hoặc 18/30 (nhóm xây dựng/kinh tế/CNTT).
   * Phạm vi: 9 mã ngành tổ hợp văn hóa chuẩn (A00/A01/C01/C02/D01), không điểm cộng thành tích.
   * Ngoài phạm vi: 13 ngành năng khiếu, thí sinh có điểm cộng. KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'hau-thpt-exam-exact-2026',
    schoolId: 'hau',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển (9 ngành tổ hợp văn hóa chuẩn, không điểm cộng)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 9 mã ngành HAU dùng tổ hợp văn hóa chuẩn, không có điểm cộng thành tích'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
