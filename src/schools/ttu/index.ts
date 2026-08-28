import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { ttuAdmissionMethods } from './methods';

export const ttuModule: SchoolModule = {
  id: 'ttu',
  name: 'Truong Dai hoc Tan Tao',
  shortName: 'TTU',
  about: 'Private university based in Duc Hoa, Long An, with a health-sciences focus.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển TTU 2026 (thi TN THPT, trừ Y khoa) theo nhóm ngành: ĐXT = round2(tổng thô 3 môn + điểm ưu tiên KV/ĐT theo Điều 7 TT 06/2026); đủ điều kiện xét tuyển khi ĐXT ≥ ngưỡng nhóm (khối kỹ thuật/công nghệ/kinh tế/ngôn ngữ 15 / Điều dưỡng-KTXN y học 18 / Luật 20) — trích nguyên văn Công bố điểm sàn chính thức 09/07/2026; công thức tổng thô + ưu tiên là judgment call vì thông báo không in công thức tường minh. Ngành Y khoa (22, điều kiện kép tổ hợp + Sinh học bạ) ngoài phạm vi.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(ttuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Official 2026 floor-score announcement (Cong bo diem san chinh thuc)',
      url: 'https://ttu.edu.vn/cong-bo-diem-san-chinh-thuc-cua-truong-dai-hoc-tan-tao-2026/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
