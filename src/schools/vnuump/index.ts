import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vnuumpAdmissionMethods } from './methods';

export const vnuumpModule: SchoolModule = {
  id: 'vnuump',
  name: 'Truong Dai hoc Y Duoc - Dai hoc Quoc gia Ha Noi',
  shortName: 'VNU-UMP',
  about: 'Public medicine and pharmacy school under Vietnam National University, Hanoi (VNU-UMP), based in Hanoi.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  entityLevel: 'school',
  vnuhcm: false,
  summary:
    'VNU-UMP 2026 (phuong thuc thi TN THPT, 96% chi tieu) da mo hinh hoa nguong dau vao dong nhat: tong 3 mon >=15,00/30 cho ca 6 nganh. Phuong thuc HSA (co dieu kien diem trung binh mon rieng), xet tuyen thang, du bi dan toc, va cong thuc diem cong/uu tien chua duoc mo hinh hoa.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vnuumpAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thong tin tuyen sinh dai hoc chinh quy nam 2026 - VNU-UMP',
      url: 'https://ump.vnu.edu.vn/article-thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-(hinh-thuc-dao-tao-chinh-quy)-19647-3439.html',
      type: 'official-institution',
      checkedAt: '2026-08-25',
    },
  ],
};
