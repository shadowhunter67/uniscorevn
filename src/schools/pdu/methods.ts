import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * PDU (Trường Đại học Phạm Văn Đồng) 2026 — điểm trúng tuyển theo MÃ NGÀNH (13/14 chương trình đại
 * học chính quy, 15,00–22,30/30, loại trừ Giáo dục Mầm non — trình độ cao đẳng + tổ hợp năng khiếu),
 * nguồn PDF ký tên/đóng dấu + PDF Quyết định công bố công khai (`sources.ts`), năm 2026. Chỉ 1
 * method — nhánh exact theo NGÀNH cụ thể (`exactCalculator: true`), Phương thức 1 (thi TN THPT).
 */
export const pduAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'pdu-thpt-exam-exact-2026',
    schoolId: 'pdu',
    name: 'Xét kết quả thi TN THPT — Điểm trúng tuyển theo ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026, chọn 1 trong 13 ngành đại học chính quy của PDU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
