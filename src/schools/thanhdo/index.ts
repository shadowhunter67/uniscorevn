import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { thanhdoAdmissionMethods } from './methods';

export const thanhdoModule: SchoolModule = {
  id: 'thanhdo',
  name: 'Truong Dai hoc Thanh Do',
  shortName: 'ThanhDo',
  about: 'Private multidisciplinary university based in Hanoi.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'ThanhDo 2026 THPT-exam-route thresholds are modeled directly from the official cutoff announcement: 16,0-20,0/30 across 14 majors. Runtime models the band conservatively (ineligible below 16, unresolved above); per-major mapping, transcript route, and aptitude/critical-thinking-test route are not modeled yet.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(thanhdoAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Truong Dai hoc Thanh Do chinh thuc cong bo diem chuan trung tuyen dai hoc chinh quy nam 2026',
      url: 'https://thanhdo.edu.vn/truong-dai-hoc-thanh-do-chinh-thuc-cong-bo-diem-chuan-trung-tuyen-dai-hoc-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
