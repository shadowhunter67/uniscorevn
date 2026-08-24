import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hpu2AdmissionMethods } from './methods';

export const hpu2Module: SchoolModule = {
  id: 'hpu2',
  name: 'Truong Dai hoc Su pham Ha Noi 2',
  shortName: 'HPU2',
  about: 'Public teacher-training university based in Xuan Hoa, Phu Tho (formerly Vinh Phuc).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'HPU2 2026 THPT thresholds are modeled from the official admissions portal: teacher-training programs require >= 18,0/30 (or >= 8,5/10 transcript average) and other 3-subject programs require >= 15,0/30. Physical Education, Early Childhood Education, and Sports Management use separate 2-subject-plus-aptitude combinations that are not modeled. Transcript-only, SP2E/H-SCA aptitude assessment, and bonus-point rules remain unresolved.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hpu2AdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Official 2026 undergraduate admission information',
      url: 'https://tuyensinh.hpu2.edu.vn/chi-tiet/tuyen-sinh-dai-hoc-chinh-quy-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
