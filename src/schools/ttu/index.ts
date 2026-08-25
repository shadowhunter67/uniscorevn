import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { ttuAdmissionMethods } from './methods';

export const ttuModule: SchoolModule = {
  id: 'ttu',
  name: 'Truong Dai hoc Tan Tao',
  shortName: 'TTU',
  about: 'Private university based in Duc Hoa, Long An, with a health-sciences focus.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'TTU 2026 THPT floor scores are modeled from the official 09/07/2026 announcement: a common 15,0/30 baseline for most majors, with higher published group floors for Nursing/Medical Laboratory Technology (18,0), Law (20,0), and Medicine (22,0, highest) documented as a knowledge gap until program selection is modeled.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(ttuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Official 2026 floor-score announcement (Cong bo diem san chinh thuc)',
      url: 'https://ttu.edu.vn/cong-bo-diem-san-chinh-thuc-cua-truong-dai-hoc-tan-tao-2026/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
