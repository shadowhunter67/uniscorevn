import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { huscAdmissionMethods } from './methods';

export const huscModule: SchoolModule = {
  id: 'husc',
  name: 'Trường Đại học Khoa học, Đại học Huế',
  shortName: 'HUSC',
  about: 'Trường đại học công lập thành viên Đại học Huế, đào tạo các ngành khoa học tự nhiên, khoa học xã hội, kỹ thuật và công nghệ.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Nguồn tuyển sinh HUSC 2026 chính thức (Thông báo 42/TB-HĐTSĐH) đã xác minh mức điểm xét tuyển thi TN THPT từ 15,00/30 (phần lớn ngành) đến 22,75/30 (ngành đặc thù). UniscoreVN mới kiểm tra được ngưỡng theo khoảng, chưa có bảng ngưỡng từng ngành cụ thể.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(huscAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Các phương thức tuyển sinh đại học hệ chính quy năm 2026',
      url: 'https://tuyensinh.husc.edu.vn/baiviet.php?name=intro',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Ngưỡng đảm bảo chất lượng đầu vào (điểm sàn) tuyển sinh đại học hệ chính quy năm 2026',
      url: 'https://tuyensinh.husc.edu.vn/thongbao.php?id=77',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
