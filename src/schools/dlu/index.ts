import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dluAdmissionMethods } from './methods';

export const dluModule: SchoolModule = {
  id: 'dlu',
  name: 'Truong Dai hoc Da Lat',
  shortName: 'DLU',
  about: 'Public multidisciplinary university based in Da Lat, Lam Dong, serving the Central Highlands/South Central region.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'DLU 2026 THPT thresholds are cross-checked from two independent press reports of the official 2026-07-09 notice (primary dlu.edu.vn site blocked by TLS/WAF): a 16/30 baseline for social sciences, with higher published group floors (Engineering/Technology 17-18, Law 18, teacher-training majors 21) documented as knowledge gaps. Program-specific subject conditions (Law English transcript, Nuclear Engineering Math/Physics minimums) and the aptitude-test admission route are not modeled yet.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(dluAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Official 2026 admission floor score notice',
      url: 'https://dlu.edu.vn/thong-bao-muc-diem-san-dang-ky-xet-tuyen-dai-hoc-he-chinh-quy-nam-2026-truong-dai-hoc-da-lat/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Press coverage of the 2026 admission floor score announcement (Thanh Nien)',
      url: 'https://thanhnien.vn/truong-dh-da-lat-cong-bo-diem-san-2026-cac-nganh-su-pham-cao-nhat-185260709110001808.htm',
      type: 'secondary',
      checkedAt: '2026-08-24',
    },
  ],
};
