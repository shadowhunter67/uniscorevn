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
    'Tính chính xác Điểm xét tuyển VWA 2026 (thi TN THPT) theo 15 mã xét tuyển: ĐXT = round2(tổng thô 3 môn + điểm ưu tiên KV/ĐT theo Điều 7 TT 06/2026); đủ điều kiện xét tuyển khi ĐXT ≥ ngưỡng theo mã ngành (19 Truyền thông đa phương tiện / 18 nhóm Quản trị-Du lịch-Truyền thông xã hội-Tâm lý / 16 nhóm còn lại) — bảng ngưỡng trích nguyên văn Thông báo 96/TB-HVPNVN. CNTT/Thiết kế phát triển Game: thêm điều kiện Toán ≥6,0. Ngoài phạm vi: Luật/Kinh tế Luật (chưa có số), 2 chương trình Chất lượng cao (cần chứng chỉ ngoại ngữ), phương thức học bạ/HSA/SPT.',
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
