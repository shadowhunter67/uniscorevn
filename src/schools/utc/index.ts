import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { utcAdmissionMethods } from './methods';

export const utcModule: SchoolModule = {
  id: 'utc',
  name: 'Trường Đại học Giao thông vận tải',
  shortName: 'UTC',
  about: 'Trường đại học công lập tại Hà Nội, có phân hiệu TP. Hồ Chí Minh, đào tạo các lĩnh vực giao thông vận tải, logistics, kỹ thuật, kinh tế, công nghệ và quản lý.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Tính đủ Tổng điểm xét tuyển (exact) cho phương thức xét kết quả thi TN THPT: điểm học lực `(Toán×2 + 2 môn còn lại)×3/4` (ngành Ngôn ngữ Anh: tổng thô 3 môn) + điểm cộng IELTS + điểm ưu tiên KV/ĐT (công thức giảm khi ≥ 22,5), so với ngưỡng đảm bảo chất lượng theo ngành (Hà Nội 16-21/30, Phân hiệu TP.HCM 16-20/30) — đều trích nguyên văn từ trang tuyển sinh chính thức 2026 · Chưa mô hình hoá: phương thức HSA/TSA/ĐGNL, phương thức kết hợp học bạ, điểm cộng giải HSG cấp tỉnh.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(utcAdmissionMethods),
  },
};
