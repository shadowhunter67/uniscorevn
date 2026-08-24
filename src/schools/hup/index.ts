import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hupAdmissionMethods } from './methods';

export const hupModule: SchoolModule = {
  id: 'hup',
  name: 'Trường Đại học Dược Hà Nội',
  shortName: 'HUP',
  about: 'Trường đại học công lập tại Hà Nội, đào tạo Dược học và các ngành hoá - sinh liên quan.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Đã xác minh thông báo ngưỡng đầu vào 2026 chính thức (10/07/2026): ngưỡng PT4 (thi TN THPT) theo từng ngành trong 4 ngành đào tạo (Dược học 22.00, Hoá dược 20.00, Hoá học 19.00, Công nghệ sinh học 19.00, thang 30). Các phương thức khác (PT1-PT3), công thức quy đổi tương đương, và bảng cộng điểm chưa được model hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hupAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Phương thức tuyển sinh đại học dự kiến năm 2026',
      url: 'https://tuyensinh.hup.edu.vn/noidung/1250/THONG-TIN-TUYEN-SINH-DAI-HOC-NAM-2026-HINH-THUC-CHINH-QUY',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Thông báo Ngưỡng đầu vào và quy đổi tương đương điểm trúng tuyển giữa các phương thức xét tuyển đại học chính quy năm 2026',
      url: 'https://tuyensinh.hup.edu.vn/noidung/1258/Thong-bao-Nguong-dau-vao-va-quy-doi-tuong-duong-diem-trung-tuyen-giua-',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
