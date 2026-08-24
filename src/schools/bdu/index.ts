import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { bduAdmissionMethods } from './methods';

export const bduModule: SchoolModule = {
  id: 'bdu',
  name: 'Truong Dai hoc Binh Duong',
  shortName: 'BDU',
  about: 'Private multidisciplinary university headquartered in Binh Duong.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'BDU 2026 THPT eligibility is modeled from the official admission-portal page: a common 15,0/30 baseline, with a higher published floor (20,0/30) for Luat/Luat Kinh te and Duoc hoc documented as a knowledge gap until program selection is modeled. The transcript-based (hoc ba) method and priority points are not modeled yet.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(bduAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Truong Dai hoc Binh Duong (Ma truong: DBD) chinh thuc cong bo cac khoi xet tuyen va diem san he dai hoc chinh quy 2026',
      url: 'https://tuyensinh.bdu.edu.vn/dai-hoc-chinh-quy/truong-dai-hoc-binh-duong-ma-truong-dbd-chinh-thuc-cong-bo-cac-khoi-xet-tuyen-va-diem-san-he-dai-hoc-chinh-quy-745.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
