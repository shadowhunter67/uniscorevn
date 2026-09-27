import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { stuAdmissionMethods } from './methods';

export const stuModule: SchoolModule = {
  id: 'stu',
  name: 'Truong Dai hoc Cong nghe Sai Gon',
  shortName: 'STU',
  about: 'Truong dai hoc ngoai cong lap tai TP. Ho Chi Minh, ma truong DSG, dao tao 20 nganh dai hoc chinh quy nam 2026.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'STU 2026 (PT02 - xet diem thi tot nghiep THPT): DXT = tong diem 3 mon thi trong to hop (thang 30, chua uu tien/diem cong), cong diem uu tien KV/DT theo khung quoc gia de so voi diem chuan PT02 chinh thuc theo 20/20 nganh. Nguon CHINH CHU tuyensinhdaihoc.stu.edu.vn: homepage tuyen sinh 2026 cho cong thuc/dieu kien mon va thong bao diem chuan Dot 1 can cu Quyet dinh 614/QD-DSG-DT ngay 09/08/2026. 19 nganh co PT02 = 15,0/30; rieng Luat kinh te = 20,0/30. Dieu kien mon: nhom Ky thuat - Cong nghe phai co Toan; nhom Kinh te/quan tri/Luat/Thiet ke my thuat/Du lich phai co Toan hoac Van va diem Toan/Van lien quan >= 1/3 diem chuan chua uu tien.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(stuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'STU cong bo diem chuan trung tuyen dai hoc chinh quy nam 2026 - Dot 1',
      url: 'https://tuyensinhdaihoc.stu.edu.vn/2026/08/12/stu-cong-bo-diem-chuan-trung-tuyen-dai-hoc-chinh-quy-nam-2026-dot-1/',
      type: 'official-institution',
      checkedAt: '2026-09-26',
    },
    {
      title: 'Dai hoc Cong nghe Sai Gon (STU) tuyen sinh Dai hoc 2026',
      url: 'https://tuyensinhdaihoc.stu.edu.vn/',
      type: 'official-institution',
      checkedAt: '2026-09-26',
    },
  ],
};
