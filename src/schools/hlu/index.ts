import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hluAdmissionMethods } from './methods';

export const hluModule: SchoolModule = {
  id: 'hlu',
  name: 'Trường Đại học Luật Hà Nội',
  shortName: 'HLU',
  about: 'Trường đại học công lập tại Hà Nội, chuyên đào tạo các ngành thuộc lĩnh vực pháp luật.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Đã xác minh Thông báo 1010/TB-ĐHLHN (08/07/2026): ngưỡng bảo đảm chất lượng đầu vào từ điểm thi TN THPT 2026 là 20,0/30 điểm, áp dụng chung cho mọi chương trình lĩnh vực pháp luật (khu vực 3). Module hiện chỉ kiểm tra ngưỡng chung này, chưa có bảng mã ngành/tổ hợp và điểm ưu tiên khu vực/đối tượng khác.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hluAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Cổng tuyển sinh đại học chính quy năm 2026 (Khóa 51)',
      url: 'https://tuyensinh.hlu.edu.vn/tsnews/details/30532',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Thông báo 1010/TB-ĐHLHN về ngưỡng bảo đảm chất lượng đầu vào 2026 (Khóa 51)',
      url: 'https://tuyensinh.hlu.edu.vn/Images/Post/files/TB1010_B%C4%90CL%C4%90V_K51_2026.pdf',
      type: 'official-document',
      checkedAt: '2026-08-24',
    },
  ],
};
