import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hcmueKnowledgeGaps } from './knowledgeGaps';

export const hcmueAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hcmue-thpt-threshold-2026',
    schoolId: 'hcmue',
    name: 'Kiem tra nguong dau vao THPT 2026',
    year: 2026,
    capabilities: {
      eligibility: true,
      scoreConversion: false,
      bonus: false,
      priority: false,
      exactCalculator: false,
    },
    knowledgeGaps: hcmueKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ ngưỡng đầu vào (exact), phương thức thi TN THPT, CHỈ 47 ngành có ngưỡng
   * công bố tại trụ sở chính TP.HCM (`data/programs.ts`, `thptThreshold30` xác định) — 15 ngành 2
   * phân hiệu Long An/Gia Lai KHÔNG có ngưỡng công bố riêng, ngoài phạm vi nhánh này (không suy
   * đoán bằng số trụ sở chính). Trang công thức chính thức (`hcmue-methods-2026`) công bố ĐXT =
   * M1+M2+M3+ĐƯT nhưng thông báo ngưỡng (`hcmue-thresholds-2026`) KHÔNG nêu rõ ngưỡng so với tổng
   * thô hay ĐXT đã gồm ưu tiên — nguồn im lặng nên so TỔNG THÔ với ngưỡng (judgment call, cùng
   * tiền lệ `schools/tbdu`, `schools/ctu`); điểm ưu tiên (Điều 7 TT 06/2026, `priority.ts`) chỉ
   * dùng để hiển thị ĐXT tham khảo, không dùng để so ngưỡng. Tổ hợp môn theo ngành vẫn do người
   * dùng tự chọn (`hcmue-program-combination-map-2026` — non-blocking, xem knowledgeGaps).
   */
  {
    id: 'hcmue-thpt-exam-exact-2026',
    schoolId: 'hcmue',
    name: 'Xét kết quả thi TN THPT — Ngưỡng đầu vào theo ngành (47 ngành trụ sở chính TP.HCM)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 47 ngành HCMUE tại trụ sở chính TP.HCM'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
