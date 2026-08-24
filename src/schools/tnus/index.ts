import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tnusAdmissionMethods } from './methods';

export const tnusModule: SchoolModule = {
  id: 'tnus',
  name: 'Truong Dai hoc Khoa hoc - Dai hoc Thai Nguyen',
  shortName: 'TNUS',
  about: 'Public science-focused member school of Thai Nguyen University.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'TNUS 2026 THPT-exam-route cutoff is modeled from the official Thai Nguyen University system page: a per-major band of 16,35-22,50/30. Runtime models the band conservatively (ineligible below 16.35, unresolved above); per-major mapping and other admission methods are not modeled yet.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tnusAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Truong Dai hoc Khoa hoc - Dai hoc Thai Nguyen cong bo diem chuan trung tuyen dai hoc chinh quy nam 2026',
      url: 'https://tnu.edu.vn/dao-tao/truong-dai-hoc-khoa-hoc-dai-hoc-thai-nguyen-cong-bo-diem-chuan-trung-tuyen-dai-hoc-chinh-quy-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
