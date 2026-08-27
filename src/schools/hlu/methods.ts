import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hluKnowledgeGaps } from './knowledgeGaps';

export const hluAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hlu-thpt-exam-2026',
    schoolId: 'hlu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, khu vực 3'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hluKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), phương thức xét kết quả thi TN THPT. Trích từ Quy
   * chế HLU (QĐ 633, Điều 6-7 — `sources.ts:hlu-quyche-2026`), Thông báo 1029 (độ chênh tổ hợp)
   * và Thông báo 1010 (ngưỡng 20/30):
   *  - ĐXT (quy về tổ hợp gốc D01, thang 30) = round2(tổng thô 3 môn − độ chênh tổ hợp + điểm ưu
   *    tiên), tối đa 30 (`thresholds.ts` + `priority.ts`). Lĩnh vực pháp luật không có điểm cộng.
   *  - Điểm ưu tiên: Điều 7 Quy chế HLU (mức KV/ĐT + công thức giảm ≥ 22,5) — TRÍCH NGUYÊN VĂN,
   *    không phải judgment call.
   *  - Ngưỡng ĐBCL: tổng thô 3 môn (theo tổ hợp, không quy đổi) ≥ 20,0/30, KV3 (Thông báo 1010).
   *  - So điểm trúng tuyển 2026 theo mã ngành (`hlu-cutoff-2026`) để ước lượng khả năng trúng
   *    tuyển (điểm chuẩn thực tế, có thể đổi theo năm).
   * Phạm vi: tổ hợp D01/A00/A01/C00 (D02-D06 là ngoại ngữ Nga/Pháp/Trung/Đức/Nhật không có trong
   * taxonomy môn). KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'hlu-thpt-exam-exact-2026',
    schoolId: 'hlu',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển (quy về tổ hợp gốc D01), lĩnh vực pháp luật',
    year: 2026,
    applicantTypes: [
      'Thí sinh xét kết quả thi TN THPT 2026 vào một chương trình của Trường Đại học Luật Hà Nội với tổ hợp D01/A00/A01/C00',
    ],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: true, exactCalculator: true },
  },
];
