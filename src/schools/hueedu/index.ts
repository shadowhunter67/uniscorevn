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
    'Tính chính xác Điểm xét tuyển HUED 2026 theo thi TN THPT cho 2 ngành ngoài đào tạo giáo viên (Tâm lý học giáo dục, Hệ thống thông tin — ngưỡng 16,00/30): tổng thô 3 môn (không hệ số) + điểm cộng (tùy chọn) + điểm ưu tiên theo Bảng 1 của Đại học Huế. Các ngành đào tạo giáo viên vẫn chỉ kiểm tra ngưỡng do phải đạt đồng thời ngưỡng khối đào tạo giáo viên theo Điều 9 Thông tư 06/2026/TT-BGDĐT (chưa đối chiếu); Vật lý kỹ thuật, Sư phạm Âm nhạc, GDMN, INSA CVL có điều kiện phụ nên ngoài phạm vi.',
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
