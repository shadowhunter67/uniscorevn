import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { bduAdmissionMethods } from './methods';

export const bduModule: SchoolModule = {
  id: 'bdu',
  name: 'Trường Đại học Bình Dương',
  shortName: 'BDU',
  about: 'Private multidisciplinary university headquartered in Binh Duong.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'BDU 2026 THPT eligibility is modeled from the official admission-portal page. An exact branch now covers 2 groups: standard (15,0/30, compared against the raw total) and lawOrPharmacy (Luật/Luật Kinh tế/Dược học, 20,0/30, compared against DXT since the source states the floor already includes priority points, applied via judgment call per Điều 7 TT 06/2026). The transcript-based (học bạ) method is not modeled yet.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(bduAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường Đại học Bình Dương (Mã trường: DBD) chính thức công bố các khối xét tuyển và điểm sàn hệ đại học chính quy 2026',
      url: 'https://tuyensinh.bdu.edu.vn/dai-hoc-chinh-quy/truong-dai-hoc-binh-duong-ma-truong-dbd-chinh-thuc-cong-bo-cac-khoi-xet-tuyen-va-diem-san-he-dai-hoc-chinh-quy-745.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
