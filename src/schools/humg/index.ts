import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { humgAdmissionMethods } from './methods';

export const humgModule: SchoolModule = {
  id: 'humg',
  name: 'Trường Đại học Mỏ - Địa chất',
  shortName: 'HUMG',
  about: 'Trường đại học công lập tại Hà Nội, đào tạo các ngành mỏ, địa chất, kỹ thuật, công nghệ thông tin, kinh tế và ngôn ngữ.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Đã xác minh thông báo ngưỡng điểm xét tuyển đợt 1 năm 2026 (04/07/2026, mục 7106). Bảng ngưỡng đầy đủ có khoảng 53 chương trình (15-21/30), nhưng module hiện chỉ nhập được 7 mã ngành có tên tiếng Việt + mã ngành xác nhận chắc chắn; các mã ngành khác chưa được nhập để tránh suy diễn sai.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(humgAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo ngưỡng điểm xét tuyển đợt 1 hệ đại học năm 2026',
      url: 'https://ts.humg.edu.vn/tuyen-sinh/Pages/Thong-tin-tuyen-sinh.aspx?ItemID=7106',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
