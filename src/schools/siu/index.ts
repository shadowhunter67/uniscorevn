import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { siuAdmissionMethods } from './methods';

export const siuModule: SchoolModule = {
  id: 'siu',
  name: 'Trường Đại học Quốc tế Sài Gòn',
  shortName: 'SIU',
  about: 'Trường đại học tư thục tại TP.HCM, đào tạo đa ngành theo hướng quốc tế hóa.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'Kiểm tra ngưỡng điểm xét SIU 2026 (thi TN THPT, nhóm ngành thường): đủ điều kiện ⟺ tổng thô 3 môn ≥15,0/30, đồng nhất mọi ngành TRỪ Luật kinh tế (ngưỡng riêng theo quy định Bộ GD&ĐT cho nhóm ngành pháp luật, chưa công bố số cụ thể). Nguồn không nói rõ ngưỡng đã gồm điểm ưu tiên hay chưa → so RAW, điểm ưu tiên chỉ hiển thị tham khảo. Phương thức học bạ và ĐGNL ĐHQG-HCM chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(siuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'SIU công bố ngưỡng đảm bảo chất lượng đầu vào năm 2026',
      url: 'https://siu.edu.vn/siu-cong-bo-nguong-dam-bao-chat-luong-dau-vao-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
  ],
};
