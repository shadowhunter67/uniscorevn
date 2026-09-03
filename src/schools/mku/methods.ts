import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * MKU (Trường Đại học Cửu Long) 2026 — điểm chuẩn trúng tuyển theo NGÀNH (33/42 ngành đại học chính
 * quy, 15,00 hoặc 20,00/30), nguồn CHÍNH CHỦ tuyensinh.mku.edu.vn cho cả điểm chuẩn (`sources.ts:
 * mku-cutoff-2026`) lẫn tổ hợp môn (`mku-admission-notice-2026`), năm 2026. Chỉ 1 method — nhánh
 * exact theo NGÀNH cụ thể (`exactCalculator: true`), nhánh xét kết quả thi TN THPT 2026.
 */
export const mkuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'mku-thpt-exam-exact-2026',
    schoolId: 'mku',
    name: 'Xét kết quả thi TN THPT — Điểm chuẩn theo ngành (33/42 ngành, khối sức khỏe chưa mô hình hoá)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào MKU, chọn 1 trong 33 ngành đại học chính quy KHÔNG thuộc khối sức khỏe'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
