import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { ltvuniAdmissionMethods } from './methods';

export const ltvuniModule: SchoolModule = {
  id: 'ltvuni',
  name: 'Trường Đại học Lương Thế Vinh',
  shortName: 'LTVUni',
  about: 'Trường đại học tư thục, đào tạo đa ngành.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'Đã xác minh trực tiếp Thông báo 269/TB-ĐHLTV (09/07/2026, đọc từ file PDF đính kèm bài đăng chính thức, đủ 11/11 ngành): ngưỡng đầu vào phương thức thi TN THPT — 20,0/30 (Y học cổ truyền), 18,0/30 (Kỹ thuật phục hồi chức năng), 15,0/30 (9 ngành còn lại). Điểm xét tuyển công bố đã bao gồm điểm ưu tiên, runtime hiện chỉ so điểm thô 3 môn. Chưa có bảng tổ hợp môn cụ thể theo ngành.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(ltvuniAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo 269/TB-ĐHLTV: Ngưỡng đảm bảo chất lượng, độ chênh giữa các tổ hợp xét tuyển theo phương thức xét điểm thi THPT năm 2026',
      url: 'https://ltvu.edu.vn/Thong-Bao/191/Thong-bao-Nguong-dam-bao-chat-luong-do-chenh-giua-cac-to-hop-xet-tuyen-theo-phuong-thuc-xet-diem-thi-THPT-va-bang-quy-doi-diem-tuong-duong-giua-cac-phuong-thuc-xet-tuyen-nam-2026-NTB',
      type: 'official-institution',
      checkedAt: '2026-08-25',
    },
  ],
};
