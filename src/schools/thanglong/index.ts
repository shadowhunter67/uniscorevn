import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { thanglongAdmissionMethods } from './methods';

export const thanglongModule: SchoolModule = {
  id: 'thanglong',
  name: 'Trường Đại học Thăng Long',
  shortName: 'TLU-HN',
  about: 'Trường đại học tư thục tại Hà Nội, đào tạo 24 ngành đại học chính quy thuộc 8 khoa (Kinh tế - Quản lý, Ngoại ngữ, Toán - Tin, Điều dưỡng, Du lịch, Truyền thông, Luật, Khoa học sức khoẻ và nghệ thuật).',
  year: 2025,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'TLU-HN 2025 (phương thức 1, xét kết quả thi TN THPT): điểm trúng tuyển theo ngành công bố tại Thông báo số 25082205/TB-ĐHTL (22/8/2025, PDF gốc có chữ ký + con dấu, đọc bằng vision, `sources.ts:thanglong-threshold-2025`) — mức cho tổ hợp gốc của từng nhóm ngành; các tổ hợp khác trong cùng nhóm quy đổi theo Thông báo số 25072301/TB-ĐHTL (23/7/2025, `sources.ts:thanglong-combo-delta-2025`). Điểm ưu tiên dùng khung quốc gia hiện hành (judgment call, cùng tiền lệ HLUV/HAT/HUMP — trường không công bố mức riêng). Mô hình hoá 22/24 ngành đại học chính quy, điểm trúng tuyển từ 16,00 đến 23,75/30 (loại trừ Thanh nhạc, Thiết kế đồ hoạ — Nhóm 4, không có bảng quy đổi tổ hợp).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(thanglongAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo số 25082205/TB-ĐHTL — Điểm trúng tuyển đại học chính quy đợt 1 năm 2025',
      url: 'https://thanglong.edu.vn/thong-bao-diem-trung-tuyen-dai-hoc-chinh-quy-dot-1-nam-2025-21465.html',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Thông báo số 25072301/TB-ĐHTL — Quy tắc quy đổi tương đương mức điểm giữa các tổ hợp và phương thức xét tuyển năm 2025',
      url: 'https://thanglong.edu.vn/thong-bao-quy-tac-quy-doi-tuong-duong-muc-diem-giua-cac-to-hop-va-phuong-thuc-xet-tuyen-dai-hoc-chinh-quy-nam-2025-21442.html',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
  ],
};
