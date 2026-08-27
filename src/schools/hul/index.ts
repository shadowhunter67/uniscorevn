import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hulAdmissionMethods } from './methods';

export const hulModule: SchoolModule = {
  id: 'hul',
  name: 'Trường Đại học Luật, Đại học Huế',
  shortName: 'HUL',
  about: 'Trường đại học công lập thành viên Đại học Huế, đào tạo ngành Luật và Luật Kinh tế.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Tính chính xác điểm xét tuyển HUL 2026 theo thi TN THPT cho cả 2 ngành Luật và Luật Kinh tế (ngưỡng 20/30 chung, không hệ số môn, cộng điểm ưu tiên theo Bảng 1 — Thông tin tuyển sinh 2026 của Đại học Huế, PDF 77 trang). Phương thức xét học bạ vẫn chỉ ở mức kiểm tra ngưỡng.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hulAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Các phương thức tuyển sinh và tổ hợp xét tuyển vào Trường Đại học Luật, Đại học Huế năm 2026',
      url: 'https://tuyensinh.hul.edu.vn/News/Detail/cac-phuong-thuc-tuyen-sinh-va-to-hop-xet-tuyen-vao-truong-dai-hoc-luat-dai-hoc-hue-nam-2026_20260227210356',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Ngưỡng đảm bảo chất lượng đầu vào và điểm chuẩn năm 2026',
      url: 'https://hul.edu.vn/vi/news/detail/nguong-dam-bao-chat-luong-dau-vao-va-diem-chuan-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Thông tin tuyển sinh đại học hệ chính quy năm 2026 của Đại học Huế',
      url: 'https://tuyensinh.hueuni.edu.vn/News/Detail/thong-tin-tuyen-sinh-dai-hoc-cao-dang-he-chinh-quy-nam-2026-cua-dai-hoc-hue_20260501150542',
      type: 'official-institution',
      checkedAt: '2026-08-26',
    },
  ],
};
