import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vnulawAdmissionMethods } from './methods';

export const vnulawModule: SchoolModule = {
  id: 'vnulaw',
  name: 'Truong Dai hoc Luat - Dai hoc Quoc gia Ha Noi',
  shortName: 'VNU-LS',
  about: 'Public law school under Vietnam National University, Hanoi (VNU-UL), based in Hanoi.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  entityLevel: 'school',
  vnuhcm: false,
  summary:
    'VNU-Luat 2026 (phuong thuc thi TN THPT) da mo hinh hoa nguong dau vao: tong 3 mon >=18/30 (60% max) va diem Toan/Ngu van trong to hop >=6/10, ap dung dong nhat cho 3 nganh. Diem uu tien khu vuc/doi tuong, 3 phuong thuc con lai (tuyen thang, HSA, du bi dai hoc), quy doi chung chi tieng Anh, va lua chon CLC sau nhap hoc chua duoc mo hinh hoa.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vnulawAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thong tin tuyen sinh Dai hoc chinh quy nam 2026 - VNU-UL',
      url: 'https://law.vnu.edu.vn/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-08-25',
    },
  ],
};
