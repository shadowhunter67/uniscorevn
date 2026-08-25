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
    'TGU 2026 THPT threshold is modeled from cross-checked press coverage of the official 2026 announcement: a common 15,0/30 baseline, with Law at 18,0/30. The Toan/Van subscore condition and other admission methods (transcript, V-SAT, aptitude assessment) are not modeled yet.',
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
