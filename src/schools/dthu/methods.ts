import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { dthuKnowledgeGaps } from './knowledgeGaps';

export const dthuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dthu-thpt-exam-2026',
    schoolId: 'dthu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (Phương thức 100)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: dthuKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Ngưỡng đầu vào / điểm xét (exact), phương thức 100 (xét thi TN THPT). Trích
   * nguyên văn Thông báo điểm sàn 09/07/2026 (`sources.ts:dthu-quality-threshold-2026`):
   *  - Mục 1.3: NĐV = tổng thô 3 môn tổ hợp + điểm ưu tiên (KV + đối tượng), làm tròn 2 chữ số
   *    (`eligibility.ts:calculateDthuThptExamScore`).
   *  - Điểm ưu tiên: Điều 7 Thông tư 06/2026/TT-BGDĐT + công thức giảm ≥ 22,5 — nguyên văn
   *    (`priority.ts`).
   *  - Ngưỡng: 20/30 (nhóm sư phạm đại học), 15/30 (ngành khác) — so với NĐV (đã gồm ưu tiên).
   * Phạm vi: nhóm `standard` + `teacherTraining` dùng tổ hợp văn hóa chuẩn. Ngoài phạm vi: ngành
   * năng khiếu (công thức 2 môn hoặc 1 môn + ưu tiên nhân hệ số) và nhóm `law` (điều kiện phụ về
   * học lực lớp 12 / điểm xét tốt nghiệp — không có field trong hồ sơ). KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'dthu-thpt-exam-exact-2026',
    schoolId: 'dthu',
    name: 'Xét kết quả thi TN THPT (Phương thức 100) — Ngưỡng đầu vào / điểm xét (trừ ngành năng khiếu và Luật)',
    year: 2026,
    applicantTypes: [
      'Thí sinh tốt nghiệp THPT 2026 xét Phương thức 100 vào một ngành DThU dùng tổ hợp văn hóa chuẩn (ngoài nhóm năng khiếu và ngành Luật)',
    ],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
