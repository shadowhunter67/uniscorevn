import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { bvuAdmissionMethods } from './methods';

export const bvuModule: SchoolModule = {
  id: 'bvu',
  name: 'Truong Dai hoc Ba Ria - Vung Tau',
  shortName: 'BVU',
  about: 'Private multidisciplinary university headquartered in Ba Ria - Vung Tau.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'BVU 2026 transcript (học bạ) eligibility is modeled from the official admission-portal page: a common 18,0/30 baseline (grade-12 3-subject average + priority points), with higher published (provisional) floors for Duoc hoc (24,0/30) and Dieu duong (19,5/30) documented as a knowledge gap until program selection is modeled. THPT-exam and other admission methods are not modeled yet.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(bvuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Phuong thuc tuyen sinh - Thong tin tuyen sinh Truong Dai hoc Ba Ria - Vung Tau 2026',
      url: 'https://tuyensinh.bvu.edu.vn/phuong-thuc-tuyen-sinh/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
