import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { eiuKnowledgeGaps } from './knowledgeGaps';

/**
 * EIU 2026 — 3 phương thức có ngưỡng đọc được từ nguồn chính thức
 * (`sources.ts:eiu-admission-scheme-2026`) VÀ có input khớp `ApplicantProfile`:
 * - Thi TN THPT 2026: điểm thô thang 30, không cần quy đổi (≥15).
 * - Học bạ: điểm trung bình chung 6 học kỳ (lớp 10/11/12) của 3 môn tổ hợp, thang 30 (≥18); với
 *   thí sinh tốt nghiệp THPT 2026, còn cần đồng thời đạt ≥15/30 ở kỳ thi TN THPT 2026.
 * - ĐGNL ĐHQG-HCM: điểm thô thang 1200, khớp trực tiếp `ApplicantProfile.exams.vact.total` (≥600);
 *   cùng điều kiện kết hợp với thí sinh tốt nghiệp 2026 như phương thức học bạ.
 * Phương thức 4 (xét tuyển thẳng/ưu tiên theo Điều 8 Quy chế tuyển sinh) KHÔNG model — không có
 * ngưỡng điểm, chỉ là diện đối tượng theo quy chế chung. Ngành Điều dưỡng dùng ngưỡng riêng do Bộ
 * GD&ĐT công bố hàng năm — KHÔNG model (xem `eiu-nursing-moet-threshold-not-modeled`). Cả 3
 * method đều `eligibility: true` nhưng `bonus`/`priority`/`exactCalculator` đều `false` — ngưỡng
 * công bố là điểm SÀN NHẬN HỒ SƠ, không phải điểm chuẩn trúng tuyển cuối.
 */
export const eiuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'eiu-thpt-exam-2026',
    schoolId: 'eiu',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026', 'Thí sinh tốt nghiệp THPT năm 2025 trở về trước'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: eiuKnowledgeGaps,
  },
  {
    id: 'eiu-transcript-2026',
    schoolId: 'eiu',
    name: 'Xét học bạ THPT',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026', 'Thí sinh tốt nghiệp THPT năm 2025 trở về trước'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: eiuKnowledgeGaps,
  },
  {
    id: 'eiu-vact-2026',
    schoolId: 'eiu',
    name: 'Xét kết quả thi ĐGNL ĐHQG-HCM năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026', 'Thí sinh tốt nghiệp THPT năm 2025 trở về trước'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: eiuKnowledgeGaps,
  },
];
