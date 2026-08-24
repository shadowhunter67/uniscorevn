import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tuafAdmissionMethods } from './methods';

export const tuafModule: SchoolModule = {
  id: 'tuaf',
  name: 'Truong Dai hoc Nong Lam - Dai hoc Thai Nguyen',
  shortName: 'TUAF',
  about: 'Public agriculture and forestry member school of Thai Nguyen University.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'TUAF 2026 THPT floor score is modeled from the official 727/TB-DHNL notice (07/07/2026): a flat 16,0/30 threshold (including priority points) applies uniformly across all majors for Round 1 THPT-exam admission. Transcript, V-SAT, and direct-admission routes are not modeled yet.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tuafAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Official 2026 undergraduate admission floor-score notice (727/TB-DHNL)',
      url: 'https://tuaf.edu.vn/bai-viet/truong-dai-hoc-nong-lam-thai-nguyen-cong-bo-nguong-dam-bao-chat-luong-dau-vao-diem-san-dai-hoc-he-chinh-quy-dot-1-nam-2026-43603.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
