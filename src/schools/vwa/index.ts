import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vwaAdmissionMethods } from './methods';

export const vwaModule: SchoolModule = {
  id: 'vwa',
  name: 'Học viện Phụ nữ Việt Nam',
  shortName: 'VWA',
  about: 'Học viện công lập trực thuộc Trung ương Hội Liên hiệp Phụ nữ Việt Nam, tại Hà Nội, có phân hiệu TP.HCM.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  entityLevel: 'academy',
  vnuhcm: false,
  summary:
    'Đã xác minh Thông báo 96/TB-HVPNVN (07/07/2026): ngưỡng đảm bảo chất lượng đầu vào theo 3 nhóm ngành — thi TN THPT (thang 30 — 19/18/16 điểm), học bạ (thang 30, điểm trung bình 3 môn tổ hợp 6 học kỳ — 23/21/19 điểm). Ngành Luật/Kinh tế Luật chưa có số cụ thể (theo hướng dẫn Bộ GDĐT). Bảng ánh xạ mã ngành cụ thể -> nhóm/tổ hợp môn và điểm ưu tiên khu vực/đối tượng vẫn là knowledge gap.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vwaAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo 96/TB-HVPNVN: Học viện Phụ nữ Việt Nam công bố ngưỡng điểm xét tuyển đại học năm 2026',
      url: 'https://tuyensinh.hvpnvn.edu.vn/thong-bao/tuyen-sinh-dai-hoc/hoc-vien-phu-nu-viet-nam-cong-bo-nguong-diem-xet-tuyen-dai-hoc-nam-2026-phu-hop-pho-diem-mo-rong-co-hoi-cho-thi-sinh/',
      type: 'official-institution',
      checkedAt: '2026-08-25',
    },
  ],
};
