import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { ajcAdmissionMethods } from './methods';

export const ajcModule: SchoolModule = {
  id: 'ajc',
  name: 'Học viện Báo chí và Tuyên truyền',
  shortName: 'AJC',
  about: 'Học viện công lập tại Hà Nội, đào tạo khối ngành báo chí, truyền thông, lý luận chính trị.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Đã xác minh Thông báo 293/TB-HVBCTT-ĐT (10/07/2026) ngưỡng đảm bảo chất lượng đầu vào theo 2 nhóm ngành: Báo chí-Xuất bản 25/40 (Văn nhân hệ số 2), các nhóm còn lại 18/30. Bảng phân bổ chi tiết từng chuyên ngành vào nhóm, điều kiện học bạ/hạnh kiểm, và công thức cộng điểm ưu tiên chưa được model hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(ajcAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trang thông tin tuyển sinh 2026',
      url: 'https://ajc.hcma.vn/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Thông báo 293/TB-HVBCTT-ĐT: Ngưỡng đảm bảo chất lượng đầu vào và Bảng quy đổi tương đương mức điểm chuẩn 2026',
      url: 'https://ajc.hcma.vn/thong-bao-nguong-dam-bao-chat-luong-dau-vao-va-bang-quy-doi-tuong-duong-muc-diem-chuan-giua-cac-phuong-thuc-xet-tuyen-dai-hoc-chinh-quy-nam-2026-15139.htm',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
