import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { ttnAdmissionMethods } from './methods';

export const ttnModule: SchoolModule = {
  id: 'ttn',
  name: 'Truong Dai hoc Tay Nguyen',
  shortName: 'TTN',
  about: 'Public multidisciplinary university based in Buon Ma Thuot, Dak Lak, serving the Central Highlands region.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Official 2026 TTN sources are normalized for THPT eligibility: the common 15/30 baseline is modeled, with the highest published program-specific floors (Nursing/Medical Lab 18, teacher-training 20, Medicine 22) documented as knowledge gaps. Transcript, VNU aptitude-test, and combined-aptitude routes are not modeled yet.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(ttnAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Official 2026 regular undergraduate admission information notice',
      url: 'https://tuyensinh.ttn.edu.vn/2026/04/10/tttsdhcqnam2026/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Official 2026 application receipt threshold notice',
      url: 'https://tuyensinh.ttn.edu.vn/2026/07/10/tbmdnhsxtdh2026/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
