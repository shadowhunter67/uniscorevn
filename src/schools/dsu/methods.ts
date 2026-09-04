import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * DSU (Trường Đại học Thể dục thể thao Đà Nẵng, mã trường TTD) 2025 — Phương thức mã 100 ("Xét kết
 * quả điểm thi tốt nghiệp THPT", `sources.ts:dsu-tb247-tuyensinh-2025` mục 4 — chỉ áp dụng cho ngành
 * Quản lý TDTT — 7810301, không cần điểm thi năng khiếu TDTT). Điểm xét = tổng thô 3 môn tổ hợp
 * (thang 30, không hệ số) + điểm ưu tiên KV/ĐT — so với điểm trúng tuyển chính thức đã công bố
 * (`sources.ts:dsu-qd1088-diemchuan-2025`). Chỉ 1 method — nhánh exact theo ngành Quản lý TDTT
 * (`exactCalculator: true`). Phương thức 200 (học bạ), 405/406 (kết hợp năng khiếu TDTT, áp dụng cho
 * cả 3 ngành) và 301/303 (tuyển thẳng/ưu tiên) chưa mô hình hoá.
 */
export const dsuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dsu-thpt-exam-exact-2025',
    schoolId: 'dsu',
    name: 'Xét kết quả điểm thi tốt nghiệp THPT (mã 100) — ngành Quản lý TDTT',
    year: 2025,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2025, ngành Quản lý TDTT (7810301) của DSU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
