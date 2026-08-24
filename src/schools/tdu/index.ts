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
    'TDU 2026 THPT thresholds are cross-checked from state-press coverage of the official announcement: a 15,0-20,0/30 band across 29 majors, with Duoc hoc/Luat/Luat kinh te/Luat quoc te at the top (20,0). Runtime models the band conservatively (ineligible below 15, unresolved above); per-major mapping, transcript, V-SAT, and aptitude-assessment routes are not modeled yet.',
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
