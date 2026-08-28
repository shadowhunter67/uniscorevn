import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { sguAdmissionMethods } from './methods';

export const sguModule: SchoolModule = {
  id: 'sgu',
  name: 'Trường Đại học Sài Gòn',
  shortName: 'SGU',
  about: 'Trường đại học công lập trực thuộc UBND TP. Hồ Chí Minh, đào tạo đa ngành, nổi bật ở nhóm sư phạm, kinh tế, xã hội, công nghệ và nghệ thuật.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'Đã xác minh Thông báo 1098/TB-HĐTS (10/7/2026): bảng ngưỡng đầu vào đủ 47 ngành/chương trình (16-23/30) và công thức ĐXT = ĐTHGXT + ĐC + ĐƯT (mục 4.5, trích nguyên văn). Có nhánh exact cho 29 ngành ngoài sư phạm/Luật, tổ hợp không hệ số, không điểm cộng (ĐC=0): ĐXT = tổng thô + điểm ưu tiên (Điều 7 Quy chế tuyển sinh, trích dẫn trực tiếp — không phải judgment call). Nhóm sư phạm/Luật (điều kiện phụ riêng), phụ lục quy đổi chứng chỉ/V-SAT/ĐGNL và bảng điểm cộng chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(sguAdmissionMethods),
  },
};
