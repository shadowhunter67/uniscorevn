import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tnueAdmissionMethods } from './methods';

export const tnueModule: SchoolModule = {
  id: 'tnue',
  name: 'Truong Dai hoc Su pham - Dai hoc Thai Nguyen',
  shortName: 'TNUE',
  about: 'Public teacher-training member school of Thai Nguyen University.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'TNUE 2026 THPT threshold is modeled from the official Thai Nguyen University system page: a per-category band of 17,00-22,50/30. Runtime models the band conservatively (ineligible below 17, unresolved above); per-major mapping and other admission methods are not modeled yet.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tnueAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Truong Dai hoc Su pham - Dai hoc Thai Nguyen cong bo nguong dam bao chat luong dau vao nam 2026',
      url: 'https://tnu.edu.vn/dao-tao/thong-tin-tuyen-sinh/thong-tin-tuyen-sinh-dh-cd/truong-dai-hoc-su-pham-dai-hoc-thai-nguyen-cong-bo-nguong-dam-bao-chat-luong-dau-vao-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
