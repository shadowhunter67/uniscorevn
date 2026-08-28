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
    'Calculator exact cho phương thức xét điểm thi TN THPT (Phương thức 100): đọc trực tiếp Thông báo 269/TB-ĐHLTV (09/07/2026, PDF chính thức đọc qua vision, đủ 11/11 ngành) xác nhận công thức Điểm xét tuyển = Môn1+Môn2+Môn3+điểm ƯT (điểm ưu tiên CỘNG vào tổng trước khi so ngưỡng, không có điểm cộng) và bảng ngưỡng: 20,0/30 (Y học cổ truyền), 18,0/30 (Kỹ thuật phục hồi chức năng), 15,0/30 (9 ngành còn lại). Mức điểm ưu tiên KV/ĐT cụ thể dùng chuẩn toàn quốc (judgment call). Chưa có bảng tổ hợp môn cụ thể theo ngành.',
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
