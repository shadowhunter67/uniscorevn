import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vnufAdmissionMethods } from './methods';

export const vnufModule: SchoolModule = {
  id: 'vnuf',
  name: 'Truong Dai hoc Lam nghiep',
  shortName: 'VNUF',
  about: 'Public forestry-focused university headquartered in Xuan Mai, Hanoi.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'VNUF 2026 THPT eligibility is modeled from the official training-affairs office admission scheme: a single common baseline (total 3 subjects >= 15,0/30) for the THPT exam method. Transcript, aptitude-assessment, and direct-admission methods, plus any per-program variation and priority-point calculation, remain unresolved.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vnufAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Official 2026 admission scheme (De an tuyen sinh)',
      url: 'https://daotao.vnuf.edu.vn/thong-bao?_101_assetEntryId=211376951&_101_struts_action=%2Fasset_publisher%2Fview_content&_101_type=content&_101_urlTitle=thong-tin-%C4%91e-an-tuyen-sinh-trinh-%C4%91o-%C4%91ai-hoc-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
