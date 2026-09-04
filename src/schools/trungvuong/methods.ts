import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * TVUni (Trường Đại học Trưng Vương, mã trường DVP) 2025 — Phương thức 2 (Thông báo 387/TB-ĐHTV,
 * `sources.ts:trungvuong-thongbao-387-2025`): xét kết quả thi TN THPT 2025, công thức "ĐXT = TN1 +
 * TN2 + TN3 + Điểm ưu tiên (nếu có)". Điểm trúng tuyển CHÍNH THỨC theo NGÀNH đối chiếu chéo 3 nguồn
 * độc lập (`sources.ts:trungvuong-diemchuan-2025-crosscheck`). Chỉ 1 method — nhánh exact theo NGÀNH
 * cụ thể (`exactCalculator: true`). Phương thức 1 (học bạ, công thức khác không cộng ưu tiên) và các
 * phương thức 3/4 (tuyển thẳng, ĐGNL/ĐGTD) chưa mô hình hoá.
 */
export const trungvuongAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'trungvuong-thpt-exam-exact-2025',
    schoolId: 'trungvuong',
    name: 'Xét kết quả thi TN THPT — Điểm trúng tuyển theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2025, chọn 1 trong 16 ngành đại học chính quy của TVUni'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
