import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { ouAdmissionMethods } from './methods';

export const ouModule: SchoolModule = {
  id: 'ou',
  name: 'Trường Đại học Mở Thành phố Hồ Chí Minh',
  shortName: 'OU',
  about: 'Trường đại học công lập tại TP. Hồ Chí Minh, đào tạo đa ngành theo định hướng mở, linh hoạt và ứng dụng.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'Đã xác minh thông báo ngưỡng đầu vào OU 2026 (Phụ lục 67 mã) và thông báo quy đổi tương đương chính thức ngày 10/7/2026. Có nhánh exact cho 37 mã chương trình chuẩn: so trực tiếp tổng điểm thô 3 môn với ngưỡng mã ngành (nguồn nói rõ KHÔNG cộng điểm cộng/ưu tiên, không cần judgment call). Nhóm Luật/Ngôn ngữ Anh (điều kiện phụ ≥60%), Tiên tiến, Phân hiệu Đồng Nai, CTLK quốc tế và bảng quy đổi V-SAT/ĐGNL/học bạ chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(ouAdmissionMethods),
  },
};
