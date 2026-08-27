import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { huafKnowledgeGaps } from './knowledgeGaps';

export const huafAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'huaf-transcript-2026',
    schoolId: 'huaf',
    name: 'Xét tuyển sử dụng kết quả học tập cấp THPT (học bạ)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT từ năm 2026, xét tuyển bằng học bạ'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: huafKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), phương thức xét kết quả thi TN THPT của Trường Đại
   * học Nông Lâm, Đại học Huế (mã trường DHL). Trích nguyên văn:
   *  - Công thức (mục 2, `huaf-hueuni-ttts-2026`): ĐXT = (M1×H1 + M2×H2 + M3×H3)/(H1+H2+H3) × 3
   *    + Điểm cộng + Điểm ưu tiên; tổ hợp DHL không hệ số ⇒ tổng thô 3 môn (`calculator.ts`)
   *  - Điểm ưu tiên (mục V.2.a + Bảng 1): bảng KV/ĐT Đại học Huế + công thức giảm khi tổng ≥ 22,5
   *  - Ngưỡng (Phụ lục 1, mục IV, `huaf-hueu-threshold-appendix-2026`): 19 mã ngành, 15/16/17 trên
   *    thang 30 tùy mã (`thresholds.ts`)
   * Phạm vi: caller chọn `programId` khớp `thresholds.ts`. Điểm cộng (Phụ lục 2) do caller tự cung
   * cấp (mặc định 0). KHÔNG có mã ngành nào có điều kiện phụ. KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'huaf-thpt-exam-exact-2026',
    schoolId: 'huaf',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển (19 mã ngành DHL, ngưỡng theo ngành 15/16/17)',
    year: 2026,
    applicantTypes: [
      'Thí sinh xét bằng kết quả thi TN THPT 2026 vào một ngành Trường Đại học Nông Lâm, Đại học Huế (đã chọn mã ngành để xác định ngưỡng)',
    ],
    capabilities: { eligibility: true, scoreConversion: false, bonus: true, priority: true, exactCalculator: true },
  },
];
