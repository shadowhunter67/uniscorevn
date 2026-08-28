import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { fpfuKnowledgeGaps } from './knowledgeGaps';

export const fpfuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'fpfu-thpt-exam-2026',
    schoolId: 'fpfu',
    name: 'Xét tuyển hệ dân sự theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, hệ dân sự (ngoài ngành Công an)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: fpfuKnowledgeGaps,
  },
  /**
   * Nhánh exact — hệ dân sự, 4 tổ hợp A00/A01/D07/D01. Trang tuyển sinh chính thức 2026
   * (?p=210262) xác nhận công thức Điểm xét tuyển = Môn1+Môn2+Môn3+điểm ưu tiên (điểm ưu tiên
   * khu vực/đối tượng theo Điều 7 Thông tư 06/2026/TT-BGDĐT); ngưỡng 15,00/30 (cross-checked qua
   * Dân Trí + VietNamNet). Trang gốc không fetch trực tiếp được (DNS bị chặn trong môi trường
   * research) nên nội dung dựa trên 2 lượt tra cứu độc lập cùng khớp chi tiết — xem
   * `fpfu-primary-source-unverified`.
   */
  {
    id: 'fpfu-thpt-exam-exact-2026',
    schoolId: 'fpfu',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển đầy đủ (hệ dân sự)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, hệ dân sự (ngoài ngành Công an)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
