import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dluAdmissionMethods } from './methods';

export const dluModule: SchoolModule = {
  id: 'dlu',
  name: 'Truong Dai hoc Da Lat',
  shortName: 'DLU',
  about: 'Public multidisciplinary university based in Da Lat, Lam Dong, serving the Central Highlands/South Central region.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển DLU 2026 (thi TN THPT) theo 41 mã ngành: ĐXT = round2(tổng thô 3 môn, không hệ số, không phân biệt tổ hợp + điểm ưu tiên KV/ĐT theo Điều 7 TT 06/2026) — điểm sàn theo mã ngành trích nguyên văn Thông báo 1145/TB-ĐHĐL (09/07/2026, OCR qua chrome-devtools vì dlu.edu.vn chặn curl bằng TLS/WAF), ghi rõ ngưỡng đã gồm điểm ưu tiên. Điều kiện phụ: Ngôn ngữ Anh/Sư phạm Tiếng Anh (Anh ≥6,0), Kỹ thuật hạt nhân (Toán và Lý mỗi môn ≥6,5). Phương thức học bạ và ĐGNL chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(dluAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo 1145/TB-ĐHĐL: Mức điểm sàn đăng ký xét tuyển đại học chính quy 2026',
      url: 'https://dlu.edu.vn/thong-bao-muc-diem-san-dang-ky-xet-tuyen-dai-hoc-he-chinh-quy-nam-2026-truong-dai-hoc-da-lat/',
      type: 'official-institution',
      checkedAt: '2026-08-28',
    },
  ],
};
