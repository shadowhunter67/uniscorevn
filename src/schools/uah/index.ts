import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { uahAdmissionMethods } from './methods';

export const uahModule: SchoolModule = {
  id: 'uah',
  name: 'Truong Dai hoc Kien truc TP.HCM',
  shortName: 'UAH',
  about: 'Public architecture and design university headquartered in Ho Chi Minh City, with campuses in Can Tho and Da Lat.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'UAH 2026 THPT floor scores (15-21/30, varies by major) are cross-checked from state-run press coverage of the official 08/07/2026 notice (975/TB-HDTS). One major — Kỹ thuật cơ sở hạ tầng (7580210) — now has a full exact calculator (raw score + priority) verified directly from the original PDFs (391/TB-HĐTS + 975/TB-HĐTS) read via browser. Other majors, talent-exam (V/H) subject coefficients, ability-assessment admission, and score-equivalence conversion remain eligibility-only or unmodeled.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(uahAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Official 2026 admission page (confirms 975/TB-HDTS floor-score notice)',
      url: 'https://uah.edu.vn/tuyen-sinh-dai-hoc-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Press coverage of the 2026 floor-score announcement (Tuoi Tre)',
      url: 'https://tuoitre.vn/diem-san-truong-dai-hoc-kien-truc-tphcm-2026-nhieu-nganh-tu-17-diem-100260709165701113.htm',
      type: 'secondary',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Thông báo số 391/TB-HĐTS (27/03/2026) — tuyển sinh đại học chính quy 2026 (tổ hợp, công thức, ưu tiên)',
      url: 'https://uah.edu.vn/thong-bao-so-391tb-hdts-ngay-27032026-ve-viec-tuyen-sinh-trinh-do-dai-hoc-hinh-thuc-dao-tao-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-26',
    },
    {
      title: 'Thông báo số 975/TB-HĐTS (08/07/2026) — ngưỡng đảm bảo chất lượng đầu vào theo ngành',
      url: 'https://uah.edu.vn/thong-bao-ve-nguong-dam-bao-chat-luong-dau-vao-diem-san-cac-chuong-trinh-dao-tao-trong-ky-tuyen-sinh-trinh-do-dai-hoc-hinh-thuc-dao-tao-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-26',
    },
  ],
};
