import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hpuAdmissionMethods } from './methods';

export const hpuModule: SchoolModule = {
  id: 'hpu',
  name: 'Trường Đại học Quản lý và Công nghệ Hải Phòng',
  shortName: 'HPU',
  about: 'Trường đại học tư thục tại Hải Phòng, đào tạo 7 mã ngành khối kỹ thuật, kinh tế, ngôn ngữ.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'Kiểm tra điểm chuẩn HPU 2026 (thi TN THPT) theo 7 mã ngành: Công nghệ thông tin 16,0/30, Công nghệ kỹ thuật điện-điện tử 18,0/30, Kỹ thuật môi trường 15,0/30, Quản trị kinh doanh 18,5/30, Việt Nam học 16,0/30, Ngôn ngữ Anh 15,0/30, Ngôn ngữ Trung Quốc 16,0/30 — điểm chuẩn TRÚNG TUYỂN thật đã công bố 13/8/2026. Nguồn không nói rõ đã gồm điểm ưu tiên hay chưa → so RAW, điểm ưu tiên chỉ hiển thị tham khảo. Phương thức học bạ chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(hpuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm trúng tuyển đại học chính quy Đợt 1 năm 2026 — HPU',
      url: 'https://hpu.edu.vn/blogs/thong-tin-tuyen-sinh/diem-trung-tuyen-dai-hoc-chinh-quy-dot-1-nam-2026-dai-hoc-hpu',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
  ],
};
