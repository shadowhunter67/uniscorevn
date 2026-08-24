import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vguAdmissionMethods } from './methods';

export const vguModule: SchoolModule = {
  id: 'vgu',
  name: 'Truong Dai hoc Viet Duc',
  shortName: 'VGU',
  about: 'Public transnational university based in Binh Duong, established as a joint Vietnam-Germany model university.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'VGU 2026 THPT floor scores are cross-checked from state-run press coverage (SGGP) of the official 09/07/2026 notice, since the score table on tuyensinh.vgu.edu.vn is image-embedded: per-program floors range 17-22/30 (Mechatronics highest, Construction lowest), already including priority/bonus points per VGU\'s own wording. English-score condition, international-certificate route (Method 4), TestAS (Method 1), and transcript (Method 2) are documented as knowledge gaps rather than modeled.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vguAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Official 2026 floor-score announcement (Diem san xet tuyen)',
      url: 'https://tuyensinh.vgu.edu.vn/post/tr%C6%B0%E1%BB%9Dng-%C4%91%E1%BA%A1i-h%E1%BB%8Dc-vi%E1%BB%87t-%C4%91%E1%BB%A9c-c%C3%B4ng-b%E1%BB%91-%C4%91i%E1%BB%83m-s%C3%A0n-x%C3%A9t-tuy%E1%BB%83n-v%C3%A0o-c%C3%A1c-ch%C6%B0%C6%A1ng-tr%C3%ACnh-%C4%91%C3%A0o-t%E1%BA%A1o-b%E1%BA%ADc-%C4%91%E1%BA%A1i-h%E1%BB%8Dc-n%C4%83m-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Press coverage with per-program floor scores (SGGP)',
      url: 'https://www.sggp.org.vn/truong-dai-hoc-viet-duc-cong-bo-diem-san-xet-tuyen-dai-hoc-nam-2026-post862214.html',
      type: 'secondary',
      checkedAt: '2026-08-24',
    },
  ],
};
