import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * BMTU (Trường Đại học Y Dược Buôn Ma Thuột) 2026 — phương thức 1 (xét kết quả thi TN THPT 2026),
 * nguồn CHÍNH CHỦ bmu.edu.vn cho công thức/tổ hợp/điều kiện phụ (`sources.ts:bmtu-dean-2026`) và
 * điểm chuẩn theo ngành (`sources.ts:bmtu-threshold-2026`, cùng năm 2026). Chỉ 1 method — nhánh
 * exact theo NGÀNH cụ thể (`exactCalculator: true`), giới hạn 2/7 ngành (Y khoa, Dược học).
 */
export const bmtuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'bmtu-thpt-exam-exact-2026',
    schoolId: 'bmtu',
    name: 'Xét kết quả thi TN THPT — Điểm chuẩn theo ngành (Y khoa, Dược học)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào BMTU, chọn ngành Y khoa hoặc Dược học'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: true, priority: true, exactCalculator: true },
  },
];
