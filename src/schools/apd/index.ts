import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { apdAdmissionMethods } from './methods';

export const apdModule: SchoolModule = {
  id: 'apd',
  name: 'Hoc vien Chinh sach va Phat trien',
  shortName: 'APD',
  about: 'Public policy-and-development academy headquartered in Hanoi, with new 2026 branch campuses in Bac Ninh and Da Nang.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  entityLevel: 'academy',
  vnuhcm: false,
  summary:
    'APD 2026 THPT eligibility is modeled from a government-portal republishing of the official nguong dam bao chat luong dau vao announcement: 19,0/30 at the Hanoi main campus, 16,0/30 at both new branch campuses (Bac Ninh, Da Nang), applied uniformly across subject combinations. Transcript-based admission, the exact per-campus selection, and priority-point calculation remain unresolved.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(apdAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Du kien diem san, diem chuan Hoc vien Chinh sach va Phat trien (APD) nam 2026',
      url: 'https://xaydungchinhsach.chinhphu.vn/du-kien-diem-san-diem-chuan-hoc-vien-chinh-sach-va-phat-trien-apd-nam-2026-11926070213145361.htm',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
