import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { ttnAdmissionMethods } from './methods';

export const ttnModule: SchoolModule = {
  id: 'ttn',
  name: 'Truong Dai hoc Tay Nguyen',
  shortName: 'TTN',
  about: 'Public multidisciplinary university based in Buon Ma Thuot, Dak Lak, serving the Central Highlands region.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển TTN 2026 (phương thức 100 — thi TN THPT) theo nhóm ngưỡng: ĐXT = round2(tổng thô 3 môn + điểm ưu tiên KV/ĐT theo Điều 7 TT 06/2026); đủ điều kiện xét tuyển ⟺ ĐXT ≥ ngưỡng nhóm (Y khoa 22 / sư phạm 20 / Điều dưỡng-KTXN y học 18 / còn lại 15) — bảng ngưỡng trích nguyên văn Thông báo mức điểm nhận hồ sơ 2026 (37 mã xét tuyển); công thức tổng thô + ưu tiên là judgment call vì thông báo không in công thức tường minh · Ngoài phạm vi: Giáo dục Mầm non / Giáo dục Thể chất (phương thức 405 năng khiếu), phương thức học bạ / ĐGNL.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(ttnAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Official 2026 regular undergraduate admission information notice',
      url: 'https://tuyensinh.ttn.edu.vn/2026/04/10/tttsdhcqnam2026/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Official 2026 application receipt threshold notice',
      url: 'https://tuyensinh.ttn.edu.vn/2026/07/10/tbmdnhsxtdh2026/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
