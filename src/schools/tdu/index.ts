import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tduAdmissionMethods } from './methods';

export const tduModule: SchoolModule = {
  id: 'tdu',
  name: 'Trường Đại học Tây Đô',
  shortName: 'TDU',
  about: 'Private multidisciplinary university based in Cần Tho.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'TDU 2026 official Thông báo 725/TB-DHTD (08/7/2026) verified: full per-major threshold table for Phương thức 1 (thi TN THPT), 15,0-20,0/30 band across 29 majors. Exact branch covers 24 majors outside Dược học/Điều dưỡng/Luật/Luật kinh tế/Luật quốc tế (flat 15/30 threshold, compared against raw total since the notice does not state priority inclusion; priority points applied via judgment call, Điều 7 TT 06/2026). Transcript, V-SAT, and aptitude-assessment routes are not modeled yet.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tduAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường Đại học Tây Đô chính thức công bố điểm trúng tuyển đại học năm 2026',
      url: 'https://baocantho.com.vn/truong-dai-hoc-tay-do-chinh-thuc-cong-bo-diem-trung-tuyen-dai-hoc-nam-2026-a212116.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
