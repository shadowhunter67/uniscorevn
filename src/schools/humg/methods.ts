import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { humgKnowledgeGaps } from './knowledgeGaps';

export const humgAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'humg-thpt-exam-2026',
    schoolId: 'humg',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: humgKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm Xét (exact), phương thức xét kết quả thi TN THPT. Toàn bộ quy tắc ảnh
   * hưởng điểm đọc trực tiếp từ Thông báo ngưỡng điểm xét tuyển đợt 1 năm 2026 (`humg-admission-2026`,
   * mục 7106):
   *  - Công thức: "Điểm Xét = Min[(Môn 1 + Môn 2 + Môn 3) + Điểm Cộng, 30] + Điểm ưu tiên"
   *    (`calculator.ts`) — tổng thô 3 môn, không hệ số
   *  - Điểm ưu tiên: công thức giảm ≥ 22,5 in nguyên văn; bảng mức KV/ĐT theo Điều 7 TT 08/2022
   *    (nguồn chỉ nêu "gồm Khu vực, Đối tượng") — judgment call như `schools/utc`/`schools/hup`
   *  - Ngưỡng theo mã xét tuyển: toàn bộ 53 mã (`thresholds.ts`), thang 30
   * Phạm vi: caller chọn `programId` khớp `thresholds.ts`. Điểm cộng (mục 3, QĐ 674/QĐ-MĐC) do
   * caller tự cung cấp (mặc định 0) — bảng dựa trên bậc CEFR/loại giải, không map trực tiếp field
   * hồ sơ dùng chung. KHÔNG mã ngành nào có điều kiện phụ. KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'humg-thpt-exam-exact-2026',
    schoolId: 'humg',
    name: 'Xét kết quả thi TN THPT — Điểm Xét (toàn bộ 53 mã xét tuyển, ngưỡng theo mã)',
    year: 2026,
    applicantTypes: [
      'Thí sinh xét bằng kết quả thi TN THPT 2026 vào một mã xét tuyển HUMG (đã chọn mã để xác định ngưỡng)',
    ],
    capabilities: { eligibility: true, scoreConversion: false, bonus: true, priority: true, exactCalculator: true },
  },
];
