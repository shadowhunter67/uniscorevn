import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { udaAdmissionMethods } from './methods';

export const udaModule: SchoolModule = {
  id: 'uda',
  name: 'Trường Đại học Đông Á',
  shortName: 'UDA',
  about: 'Trường đại học tư thục tại Đà Nẵng, đào tạo đa ngành.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'Nguồn tuyển sinh UDA 2026 chính thức (donga.edu.vn) xác nhận điểm sàn xét tuyển bằng kết quả thi TN THPT là 15/30 cho nhóm ngành thường, KHÔNG cộng điểm ưu tiên/điểm cộng — đủ để có nhánh exact so trực tiếp tổng thô với ngưỡng, không cần judgment call. Nhóm sức khỏe (Y khoa, Dược, Điều dưỡng...) và Luật có ngưỡng riêng cao hơn kèm điều kiện học lực, chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(udaAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường Đại học Đông Á công bố điểm sàn xét tuyển Đại học chính quy đợt 1 năm 2026',
      url: 'https://donga.edu.vn/tuyensinh/ts-chi-tiet/truong-dai-hoc-dong-a-cong-bo-diem-san-xet-tuyen-dai-hoc-chinh-quy-dot-1-nam-2026-44346',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
