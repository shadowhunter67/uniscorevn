import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hueeduKnowledgeGaps } from './knowledgeGaps';

export const hueeduAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hueedu-thpt-exam-2026',
    schoolId: 'hueedu',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hueeduKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), phương thức xét kết quả thi TN THPT — CHỈ 2 ngành
   * ngoài đào tạo giáo viên và không có điều kiện phụ: Tâm lý học giáo dục (7310403) và Hệ thống
   * thông tin (7480104), cùng ngưỡng 16,00/30 (Phụ lục 1 mục VI, `hueedu-hueu-threshold-appendix-2026`).
   * Công thức (mục 2, `hueedu-hueuni-ttts-2026`) + điểm ưu tiên Bảng 1 giống mọi trường Đại học Huế.
   * Các ngành đào tạo giáo viên bị chặn bởi Ghi chú 2 (Điều 9 Thông tư 06/2026/TT-BGDĐT chưa đối
   * chiếu); Vật lý kỹ thuật dùng chung mã cho 2 chương trình 2 ngưỡng; Sư phạm Âm nhạc/GDMN cần
   * điểm năng khiếu; INSA CVL cần Toán ≥ 7,5 — tất cả ngoài phạm vi. KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'hueedu-thpt-exam-exact-2026',
    schoolId: 'hueedu',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển (Tâm lý học giáo dục, Hệ thống thông tin — ngưỡng 16,00/30)',
    year: 2026,
    applicantTypes: [
      'Thí sinh xét bằng kết quả thi TN THPT 2026 vào ngành Tâm lý học giáo dục hoặc Hệ thống thông tin của Trường Đại học Sư phạm, Đại học Huế',
    ],
    capabilities: { eligibility: true, scoreConversion: false, bonus: true, priority: true, exactCalculator: true },
  },
];
