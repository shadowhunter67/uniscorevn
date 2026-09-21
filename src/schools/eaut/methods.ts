import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { eautKnowledgeGaps } from './knowledgeGaps';

export const eautAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'eaut-transcript-2026',
    schoolId: 'eaut',
    name: 'Xét tuyển học bạ THPT (điểm trung bình 6 học kỳ) kèm điều kiện điểm thi tốt nghiệp THPT 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: eautKnowledgeGaps,
  },
  /**
   * Nhánh HẸP exact — Phương thức 1 (xét học bạ) 24/26 mã ngành (trừ khối Sức khỏe: ngưỡng do Bộ công bố).
   * Đủ điều kiện ⟺ tổng TB 6 HỌC KỲ của 3 môn trong tổ hợp của ngành ≥ 18,0/30 VÀ tổng điểm thi TN THPT 2026 của
   * tổ hợp đó ≥ 15,0/30 (nguyên văn bài công bố). Khác nhánh baseline: dùng đúng dữ liệu 6 học kỳ
   * (`transcript.bySemester`, không lấy TB năm làm proxy), kiểm tra tổ hợp thuộc ngành. Điểm ưu tiên không được
   * nhắc trong điều kiện nên không cộng. Ngoài phạm vi: PT2 (chỉ điểm thi, chưa công bố ngưỡng), PT3, PT4.
   */
  {
    id: 'eaut-transcript-program-exact-2026',
    schoolId: 'eaut',
    name: 'Xét học bạ 6 học kỳ kèm điều kiện điểm thi TN THPT 2026 (theo ngành, trừ khối Sức khỏe)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026 có học bạ đủ 6 học kỳ và điểm thi tốt nghiệp THPT'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: true },
  },
];
