import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hueeduAdmissionMethods } from './methods';

export const hueeduModule: SchoolModule = {
  id: 'hueedu',
  name: 'Trường Đại học Sư phạm, Đại học Huế',
  shortName: 'HUED',
  about: 'Trường đại học công lập thành viên Đại học Huế, đào tạo giáo viên và các ngành liên quan giáo dục (mã trường DHS).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Nguồn tuyển sinh HUEEDU 2026 chính thức (Phụ lục 1 kèm Thông báo 42/TB-HĐTSĐH ngày 10/7/2026 của Đại học Huế) đã xác minh 22 ngành và mức điểm xét tuyển thi TN THPT từ 16,00/30 đến 22,75/30 tùy ngành. UniscoreVN mới kiểm tra được ngưỡng theo khoảng, chưa có bảng ngưỡng từng ngành cụ thể; ngưỡng khối sư phạm theo Thông tư 06/2026/TT-BGDĐT áp dụng song song cũng chưa được đối chiếu.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hueeduAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Các phương thức tuyển sinh đại học hệ chính quy năm 2026',
      url: 'https://tuyensinh.dhsphue.edu.vn/Modules/Tintuc/front_detail_news.aspx?idmenu=135&idnews=1282',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Thông tin tuyển sinh đại học hệ chính quy năm 2026',
      url: 'https://tuyensinh.dhsphue.edu.vn/Modules/Tintuc/front_detail_news.aspx?idmenu=135&idnews=1285',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Phụ lục 1 - Ngưỡng đảm bảo chất lượng đầu vào Đại học Huế năm 2026 (Thông báo 42/TB-HĐTSĐH)',
      url: 'https://tuyensinh.hueuni.edu.vn/News/Download/10676',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
