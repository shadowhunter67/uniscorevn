import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { huscKnowledgeGaps } from './knowledgeGaps';

export const huscAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'husc-thpt-exam-2026',
    schoolId: 'husc',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: huscKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), phương thức xét kết quả thi TN THPT. Đại học Huế ban
   * hành một văn bản tuyển sinh chung cho mọi trường thành viên (`husc-hueuni-ttts-2026`, PDF 77
   * trang) + Phụ lục 1 ngưỡng theo mã ngành (`husc-hueu-threshold-appendix-2026`). Trích nguyên
   * văn cho nhánh này:
   *  - Công thức (mục 2): ĐXT = (M1×H1 + M2×H2 + M3×H3)/(H1+H2+H3) × 3 + Điểm cộng + Điểm ưu tiên;
   *    tổ hợp DHT không hệ số ⇒ tổng thô 3 môn (`calculator.ts`)
   *  - Điểm ưu tiên (mục V.2.a + Bảng 1): bảng KV/ĐT Đại học Huế tự công bố + công thức giảm khi
   *    tổng ≥ 22,5 (`priority.ts`)
   *  - Ngưỡng (Phụ lục 1, mục VII, mã trường DHT): 26 mã ngành xét điểm thi TN THPT đều 15,00/30
   *    (`thresholds.ts`)
   * Phạm vi: loại trừ 7440102SC / 7510302IC (22,75 + nhóm 20% Toán toàn quốc — không có dữ liệu
   * bách phân vị) và 7580101 Kiến trúc (phải thi năng khiếu). Điểm cộng (Phụ lục 2) do caller tự
   * cung cấp nếu đã tính (mặc định 0). KHÔNG gắn `knowledgeGaps` (auditMethods() coi
   * exactCalculator:true + knowledgeGaps non-empty là lỗi EXACT_METHOD_HAS_UNRESOLVED_GAPS).
   */
  {
    id: 'husc-thpt-exam-exact-2026',
    schoolId: 'husc',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển (26 mã ngành DHT ngưỡng 15,00/30, không điều kiện phụ)',
    year: 2026,
    applicantTypes: [
      'Thí sinh xét bằng kết quả thi TN THPT 2026 vào một ngành Trường Đại học Khoa học, Đại học Huế có ngưỡng 15,00/30 (ngoài chương trình vi mạch bán dẫn và ngành Kiến trúc có môn năng khiếu)',
    ],
    capabilities: { eligibility: true, scoreConversion: false, bonus: true, priority: true, exactCalculator: true },
  },
];
