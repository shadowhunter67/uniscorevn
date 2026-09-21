import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hnueKnowledgeGaps } from './knowledgeGaps';

export const hnueAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hnue-thpt-exam-2026',
    schoolId: 'hnue',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hnueKnowledgeGaps,
  },
  /**
   * Nhánh HẸP exact — kiểm tra điểm sàn 2026 theo ngành (bảng chính thức tuyensinh.hnue.edu.vn/thong-bao/667,
   * 51/57 ngành; trừ 6 ngành năng khiếu). Điểm sàn: tổng 3 môn thi TN THPT KHÔNG nhân hệ số, KHÔNG tính điểm
   * cộng, xác định cho thí sinh khu vực 3, dùng chung mọi tổ hợp. `eligible` ⟺ tổng thô ≥ sàn; `ineligible`
   * ⟺ ngay cả cộng ưu tiên tối đa vẫn < sàn; vùng giữa (cần biết ưu tiên tính trước/sau sàn) ⇒ `unknown`.
   * Không trả `score`: HNUE có điểm xét tuyển riêng (hệ số môn, quy đổi) chưa mô hình hoá.
   */
  {
    id: 'hnue-thpt-exam-floor-exact-2026',
    schoolId: 'hnue',
    name: 'Kiểm tra điểm sàn thi TN THPT 2026 theo ngành (51 ngành)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi tốt nghiệp THPT 2026 (khu vực 3 là mốc xác định điểm sàn)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: true },
  },
];
