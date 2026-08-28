import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { uedudnAdmissionMethods } from './methods';

export const uedudnModule: SchoolModule = {
  id: 'uedudn',
  name: 'Trường Đại học Sư phạm - Đại học Đà Nẵng',
  shortName: 'UED',
  about: 'Trường thành viên khối sư phạm của Đại học Đà Nẵng (UDN).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Calculator exact cho phương thức thi TN THPT (33/37 ngành công thức chuẩn): ảnh chính thức tuyensinh.ued.udn.vn (tải trực tiếp qua curl, đọc qua vision 2026-08-28) xác nhận công thức "Ngưỡng đầu vào = tổng điểm 3 môn thi TN THPT theo tổ hợp xét tuyển CỘNG điểm ưu tiên khu vực, đối tượng" (tuyên bố trực tiếp, không phải judgment call) và bảng ngưỡng đầy đủ 37 ngành (3 mức: 15,5/17,0/20,0). Điểm ưu tiên KV/ĐT dùng mức chuẩn toàn quốc (judgment call). 4 ngành công thức riêng (năng khiếu: GD Thể chất, SP Mỹ thuật, GD Mầm non, SP Âm nhạc) chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(uedudnAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo tuyển sinh đại học chính quy năm 2026 của Đại học Đà Nẵng (đợt 1)',
      url: 'https://ts.udn.vn/DHCD/Chinhquy/DHTbao/19360',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'UED - Ngưỡng đảm bảo chất lượng đầu vào và quy tắc quy đổi điểm trúng tuyển năm 2026',
      url: 'https://tuyensinh.ued.udn.vn/index.php/2026/07/10/__trashed/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
