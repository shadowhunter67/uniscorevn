import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tnuflAdmissionMethods } from './methods';

export const tnuflModule: SchoolModule = {
  id: 'tnufl',
  name: 'Truong Ngoai ngu - Dai hoc Thai Nguyen',
  shortName: 'TNUFL',
  about: 'Public foreign-language member school of Thai Nguyen University.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'TNUFL 2026 THPT-exam-route cutoff is modeled from the official Thai Nguyen University system page: a per-major band of 16,00-26,60/30. Runtime models the band conservatively (ineligible below 16, unresolved above); per-major mapping and other admission methods are not modeled yet.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tnuflAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Truong Ngoai ngu - Dai hoc Thai Nguyen cong bo diem chuan trung tuyen dai hoc nam 2026',
      url: 'https://tnu.edu.vn/dao-tao/truong-ngoai-ngu-dai-hoc-thai-nguyen-cong-bo-diem-chuan-trung-tuyen-dai-hoc-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
