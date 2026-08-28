import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tbduAdmissionMethods } from './methods';

export const tbduModule: SchoolModule = {
  id: 'tbdu',
  name: 'Truong Dai hoc Thai Binh Duong',
  shortName: 'TBDU',
  about: 'Private multidisciplinary university based in Nha Trang, Khanh Hoa.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'TBDU 2026 THPT threshold is modeled from the official admission page: a common 15,0/30 baseline for most majors. An exact branch now covers this general group: raw 3-subject total compared directly to the 15/30 floor (the notice is silent on priority inclusion), with a priority-adjusted reference score shown for context (judgment call, Dieu 7 TT 06/2026). Law and Economic Law follow a separate 3-condition rule and remain out of scope. Transcript and combined transcript+aptitude routes are not modeled yet.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tbduAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thong tin tuyen sinh dai hoc he chinh quy nam 2026',
      url: 'https://tbd.edu.vn/tin-tuc/thong-tin-tuyen-sinh-dai-hoc-he-chinh-quy-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
