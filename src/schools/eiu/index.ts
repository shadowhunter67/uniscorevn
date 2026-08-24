import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { eiuAdmissionMethods } from './methods';

/**
 * Module EIU (Trường Đại học Quốc tế Miền Đông) — research 2026-08-24, đọc trực tiếp trang đề án
 * tuyển sinh chính thức `eiu.edu.vn` (xem `sources.ts`). Ngưỡng chung 3 phương thức có input khớp
 * `ApplicantProfile`: thi TN THPT (thang 30, ≥15), học bạ (thang 30, điểm trung bình chung 6 học
 * kỳ, ≥18), ĐGNL ĐHQG-HCM (thang 1200, ≥600). Ngành Điều dưỡng dùng ngưỡng riêng của Bộ GD&ĐT,
 * chưa model. Chưa có `Page` riêng (chỉ data/eligibility layer, như TDMU/HUB/CTU) — bảng điểm
 * ưu tiên/điểm cộng riêng của trường vẫn là knowledge gap (xem `knowledgeGaps.ts`).
 */
export const eiuModule: SchoolModule = {
  id: 'eiu',
  name: 'Trường Đại học Quốc tế Miền Đông',
  shortName: 'EIU',
  about: 'Trường đại học tư thục tại Bình Dương, đào tạo đa ngành kỹ thuật, công nghệ thông tin, kinh tế, điều dưỡng.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'Ngưỡng đầu vào chung đã xác minh từ đề án tuyển sinh chính thức eiu.edu.vn cho 3 phương thức: thi TN THPT (thang 30 — ≥15), học bạ (thang 30, điểm trung bình chung 6 học kỳ lớp 10/11/12 — ≥18, thí sinh tốt nghiệp từ 2026 cần thêm điều kiện thi TN THPT), ĐGNL ĐHQG-HCM (thang 1200 — ≥600, cùng điều kiện kết hợp). Ngành Điều dưỡng dùng ngưỡng riêng của Bộ GD&ĐT, chưa model · Đây là điểm SÀN NHẬN HỒ SƠ, KHÔNG PHẢI điểm chuẩn trúng tuyển cuối — bảng điểm ưu tiên/điểm cộng riêng của trường chưa tìm được nguồn.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(eiuAdmissionMethods),
  },
};
