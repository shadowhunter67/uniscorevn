import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dtuAdmissionMethods } from './methods';

export const dtuModule: SchoolModule = {
  id: 'dtu',
  name: 'Truong Dai hoc Duy Tan',
  shortName: 'DTU',
  about: 'Large private multidisciplinary university based in Da Nang.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'DTU 2026 THPT thresholds are modeled from the official admission page: a common 15,0/30 baseline, with higher published group floors for Law (18,0), Nursing/Medical Technology (16,5), and licensed health majors (Medicine/Dentistry/Pharmacy, 20,0) documented as knowledge gaps until program selection is modeled. Transcript, V-SAT, aptitude-assessment, and IELTS-conversion routes are not modeled yet.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(dtuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Official 2026 undergraduate admission information',
      url: 'https://duytan.edu.vn/tuyen-sinh/page/EnrollArticleViewDetail.aspx?id=1010',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
