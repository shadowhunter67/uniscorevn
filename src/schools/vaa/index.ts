import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vaaAdmissionMethods } from './methods';

export const vaaModule: SchoolModule = {
  id: 'vaa',
  name: 'Học viện Hàng không Việt Nam',
  shortName: 'VAA',
  about: 'Public academy in TP.HCM under the Ministry of Transport, training aviation-industry programs.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'Official 2026 VAA sources confirm a common eligibility gate for transcript/ĐGNL-based admission: total of 3 THPT exam subjects must reach at least 15/30. Transcript-method passing scores (18-27/30, varying by program) and other methods (direct admission, ĐGNL, international certificates) are not modeled yet.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vaaAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Tuyển sinh Đại học chính quy năm 2026',
      url: 'https://tuyensinh.vaa.edu.vn/vi/tuyen-sinh/dai-hoc/tuyen-sinh-dai-hoc-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'LÀM SAO ĐỂ XÉT HỌC BẠ VÀO HỌC VIỆN HÀNG KHÔNG VIỆT NAM 2026?',
      url: 'https://tuyensinh.vaa.edu.vn/vi/tin-tuc/lam-sao-de-xet-hoc-ba-vao-hoc-vien-hang-khong-viet-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
