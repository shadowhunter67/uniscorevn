import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vuiAdmissionMethods } from './methods';

export const vuiModule: SchoolModule = {
  id: 'vui',
  name: 'Trường Đại học Công nghiệp Việt Trì',
  shortName: 'VUI',
  about: 'Trường đại học công lập tại Phú Thọ (Bộ Công Thương), đào tạo 18 ngành khối kỹ thuật, hóa học, kinh tế.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Kiểm tra điểm chuẩn VUI 2026 (thi TN THPT): đủ điều kiện ⟺ tổng thô 3 môn ≥15,0/30, đồng nhất cả 18 ngành — điểm chuẩn TRÚNG TUYỂN thật, Thông báo 121/ĐHCNVT (9/7/2026), trích qua báo Công Thương (cơ quan chủ quản trực tiếp của trường). Nguồn không nói rõ đã gồm điểm ưu tiên hay chưa → so RAW, điểm ưu tiên chỉ hiển thị tham khảo. Phương thức học bạ, ĐGNL/ĐGTD chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(vuiAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo 121/ĐHCNVT về điểm trúng tuyển đại học chính quy đợt 1 năm 2026',
      url: 'https://congthuong.vn/truong-dai-hoc-cong-nghiep-viet-tri-cong-bo-diem-chuan-2026-468558.html',
      type: 'official-institution',
      checkedAt: '2026-09-17',
    },
  ],
};
