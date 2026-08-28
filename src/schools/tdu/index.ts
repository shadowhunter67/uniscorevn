import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tduAdmissionMethods } from './methods';

export const tduModule: SchoolModule = {
  id: 'tdu',
  name: 'Truong Dai hoc Tay Do',
  shortName: 'TDU',
  about: 'Private multidisciplinary university based in Can Tho.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'TDU 2026 official Thong bao 725/TB-DHTD (08/7/2026) verified: full per-major threshold table for Phuong thuc 1 (thi TN THPT), 15,0-20,0/30 band across 29 majors. Exact branch covers 24 majors outside Duoc hoc/Dieu duong/Luat/Luat kinh te/Luat quoc te (flat 15/30 threshold, compared against raw total since the notice does not state priority inclusion; priority points applied via judgment call, Dieu 7 TT 06/2026). Transcript, V-SAT, and aptitude-assessment routes are not modeled yet.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tduAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Truong Dai hoc Tay Do chinh thuc cong bo diem trung tuyen dai hoc nam 2026',
      url: 'https://baocantho.com.vn/truong-dai-hoc-tay-do-chinh-thuc-cong-bo-diem-trung-tuyen-dai-hoc-nam-2026-a212116.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
