import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dthuAdmissionMethods } from './methods';

export const dthuModule: SchoolModule = {
  id: 'dthu',
  name: 'Trường Đại học Đồng Tháp',
  shortName: 'DTHU',
  about: 'Trường đại học công lập tại tỉnh Đồng Tháp, đào tạo đa ngành, thế mạnh sư phạm.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Tính chính xác Ngưỡng đầu vào / điểm xét DThU 2026 (Phương thức 100 — thi TN THPT) cho nhóm sư phạm (đại học) và ngành không sư phạm: NĐV = round2(tổng thô 3 môn + điểm ưu tiên KV/ĐT) — công thức và mức ưu tiên (Điều 7 TT 06/2026, công thức giảm ≥ 22,5) trích nguyên văn Thông báo điểm sàn 09/07/2026; đạt NĐV ≥ 20/30 (sư phạm) hoặc ≥ 15/30 (ngành khác) là đủ điều kiện xét tuyển · Ngoài phạm vi: 6 ngành năng khiếu (công thức 2 môn / 1 môn + ưu tiên nhân hệ số) và ngành Luật (điều kiện phụ về học lực lớp 12 / điểm xét tốt nghiệp).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(dthuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo ngưỡng bảo đảm chất lượng đầu vào đại học, cao đẳng chính quy theo phương thức kết quả thi tốt nghiệp THPT năm 2026',
      url: 'https://tuyensinh.dthu.edu.vn/thong-bao-nguong-bao-dam-chat-luong-dau-vao-dai-hoc-cao-dang-chinh-quy-theo-phuong-thuc-ket-qua-thi-tot-nghiep-thpt-nam-2026-va-cac-dieu-kien-dang-ky-072818.html',
      type: 'official-institution',
      checkedAt: '2026-08-25',
    },
  ],
};
