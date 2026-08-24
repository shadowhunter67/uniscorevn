import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { uahAdmissionMethods } from './methods';

export const uahModule: SchoolModule = {
  id: 'uah',
  name: 'Truong Dai hoc Kien truc TP.HCM',
  shortName: 'UAH',
  about: 'Public architecture and design university headquartered in Ho Chi Minh City, with campuses in Can Tho and Da Lat.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'UAH 2026 THPT floor scores are cross-checked from state-run press coverage (Tuoi Tre) of the official 08/07/2026 notice (975/TB-HDTS), since the PDF text on uah.edu.vn could not be fetched directly: per-program floors range 15-21/30 depending on major (design majors highest, infrastructure engineering lowest). Ability-assessment admission and score-equivalence conversion rules are documented as knowledge gaps.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(uahAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Official 2026 admission page (confirms 975/TB-HDTS floor-score notice)',
      url: 'https://uah.edu.vn/tuyen-sinh-dai-hoc-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Press coverage of the 2026 floor-score announcement (Tuoi Tre)',
      url: 'https://tuoitre.vn/diem-san-truong-dai-hoc-kien-truc-tphcm-2026-nhieu-nganh-tu-17-diem-100260709165701113.htm',
      type: 'secondary',
      checkedAt: '2026-08-24',
    },
  ],
};
