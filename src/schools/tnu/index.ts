import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tnuAdmissionMethods } from './methods';

export const tnuModule: SchoolModule = {
  id: 'tnu',
  name: 'Dai hoc Thai Nguyen',
  shortName: 'TNU',
  about: 'Public multi-member university system based in Thai Nguyen, with member universities/schools and branch campuses in Lao Cai, Ha Giang, and Dien Bien.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  entityLevel: 'university_system',
  summary:
    'Official 2026 TNU sources are normalized for THPT eligibility at the system level: the common 16/30 baseline is modeled, with the highest published category floors (teacher-training 18-22.5, Medicine/Dentistry 22-23, semiconductor technology 22.5, Law 20) documented as knowledge gaps. TNU is a multi-member system; each member school/branch campus may publish its own program-level threshold, which is not individually modeled here.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tnuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Official 2026 regular undergraduate and college admission information (system-level)',
      url: 'https://tnu.edu.vn/dao-tao/thong-tin-tuyen-sinh/thong-tin-tuyen-sinh-dai-hoc-cao-dang-nam-2026-hinh-thuc-dao-tao-chinh-quy-cap-nhat-ngay-16-6-2026-3.html?categoryId=101886793',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Official 2026 system-wide quality assurance input threshold announcement',
      url: 'https://tnu.edu.vn/dao-tao/thong-tin-tuyen-sinh/dai-hoc-thai-nguyen-cong-bo-nguong-dam-bao-chat-luong-dau-vao-dai-hoc-cao-dang-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
