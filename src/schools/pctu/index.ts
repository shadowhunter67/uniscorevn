import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { pctuAdmissionMethods } from './methods';

export const pctuModule: SchoolModule = {
  id: 'pctu',
  name: 'Trường Đại học Phan Châu Trinh',
  shortName: 'PCTU',
  about: 'Trường đại học tư thục tại Đà Nẵng (Trường Y khoa), đào tạo khối ngành sức khỏe: Y khoa, Răng - Hàm - Mặt, Điều dưỡng, Kỹ thuật xét nghiệm y học, Quản trị bệnh viện.',
  year: 2025,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'PCTU 2025 (Phương thức 2 — xét điểm thi TN THPT thuần): điểm chuẩn theo NGÀNH (chung cho mọi tổ hợp của ngành đó — khác HUC/QBU), nguồn CHÍNH CHỦ pctu.edu.vn cho cả formula ("Điểm xét tuyển = ĐM1 + ĐM2 + ĐM3 + Điểm ƯT", `sources.ts:pctu-admission-info-2025`) và threshold (bảng ảnh 2025 đọc bằng vision, `pctu-threshold-2025`) — CÙNG NĂM 2025, tránh lệch năm so với batch nghiên cứu trước (từng dừng vì trang "năm 2026" có thêm điều kiện xếp loại học lực làm gate mà bảng lúc đó là điểm SÀN chứ không phải điểm CHUẨN trúng tuyển). 6 ngành: Y khoa (21,5/30), Răng-Hàm-Mặt (21,75/30), Điều dưỡng đa khoa/Điều dưỡng Nha khoa/Kỹ thuật xét nghiệm y học (17/30), Quản trị bệnh viện (15/30). Điểm ưu tiên KV/ĐT trường không công bố mức cụ thể — dùng khung quốc gia hiện hành (judgment call giá trị, `priority.ts`). Y khoa/RHM còn có tiêu chí phụ "đã học Sinh học ở phổ thông" chưa mô hình hoá (`knowledgeGaps.ts`) — không ảnh hưởng điểm số, chỉ là điều kiện lọc bổ sung.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(pctuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh đại học năm 2025',
      url: 'https://pctu.edu.vn/vn/thong-tin-tuyen-sinh-dai-hoc-nam-2025.html',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Điểm chuẩn trúng tuyển đại học hệ chính quy năm 2025',
      url: 'https://pctu.edu.vn/vn/diem-chuan-trung-tuyen-dai-hoc-he-chinh-quy-nam-2025.html',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
  ],
};
