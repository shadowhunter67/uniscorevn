import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tguAdmissionMethods } from './methods';

export const tguModule: SchoolModule = {
  id: 'tgu',
  name: 'Truong Dai hoc Tien Giang',
  shortName: 'TGU',
  about: 'Public multidisciplinary university based in Tien Giang.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'TGU 2026 co mot nhanh tinh du Diem xet tuyen (exact) cho Phuong thuc 1 (thi TN THPT), pham vi "cac nganh khac" (tru Luat va Giao duc Mam non), trich nguyen van De an tuyen sinh chinh thuc: DXT = tong tho 3 mon + diem uu tien (judgment call theo Dieu 7 TT 06/2026), dieu kien ĐXT >= 15,0/30 VA diem Toan hoac Ngu van >= 1/3 DXT. Nganh Luat va cac phuong thuc khac (hoc ba, V-SAT, danh gia nang luc) van o muc threshold-only/chua model.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tguAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Diem chuan / Nguong dam bao chat luong dau vao Truong Dai hoc Tien Giang nam 2026',
      url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-tien-giang-TTG.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
