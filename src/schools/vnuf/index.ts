import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vnufAdmissionMethods } from './methods';

export const vnufModule: SchoolModule = {
  id: 'vnuf',
  name: 'Truong Dai hoc Lam nghiep',
  shortName: 'VNUF',
  about: 'Public forestry-focused university headquartered in Xuan Mai, Hanoi.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'VNUF 2026 (thi TN THPT): Điểm chuẩn thật (công bố 13/8/2026) đồng nhất 15,00/30 cho mọi ngành/cơ sở (Hà Nội, Đồng Nai, Gia Lai), khớp đúng ngưỡng nguồn xét tuyển đầu vào — nguồn nói rõ ngưỡng KHÔNG tính điểm ưu tiên/điểm cộng nên so tổng thô. Loại 2 ngành tổ hợp năng khiếu (Kiến trúc cảnh quan, Thiết kế nội thất). Phương thức học bạ, đánh giá năng lực/tư duy, xét tuyển thẳng chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(vnufAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo (Điểm sàn): Nguồn xét tuyển đầu vào và ngưỡng đảm bảo chất lượng đầu vào năm 2026',
      url: 'https://tuyensinh.vnuf.edu.vn/Detail.aspx?id=23',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
    {
      title: 'Thông báo Điểm trúng tuyển (điểm chuẩn) các ngành tuyển sinh đại học chính quy đợt 1 năm 2026',
      url: 'https://tuyensinh.vnuf.edu.vn/Detail.aspx?id=26',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
  ],
};
