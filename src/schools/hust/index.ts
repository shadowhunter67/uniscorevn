import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hustAdmissionMethods } from './methods';

export const hustModule: SchoolModule = {
  id: 'hust',
  name: 'Đại học Bách khoa Hà Nội',
  shortName: 'HUST',
  about: 'Public technical university in Hanoi (mã trường BKA).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'HUST 2026 THPT threshold is modeled from the official ts.hust.edu.vn press release (read directly, threshold table read from the embedded image via vision): quality-assurance floor is published per khối nhóm ngành (2 groups) rather than per program — Kỹ thuật group requires >= 20,0/30, Kinh tế/Giáo dục/Ngoại ngữ group requires >= 19,5/30. The program-to-group mapping for the 68 training programs, priority points, bonus points, and the Xét tuyển tài năng/Đánh giá tư duy (TSA) methods remain unresolved.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hustAdmissionMethods),
  },
  catalogSources: [
    {
      title:
        'Thông cáo báo chí về độ lệch giữa các tổ hợp xét tuyển, bảng quy đổi điểm chuẩn và dự báo mức điểm trúng tuyển vào các ngành của Đại học Bách khoa Hà Nội năm 2026',
      url: 'https://ts.hust.edu.vn/tin-tuc/thong-cao-bao-chi-ve-do-lech-giua-cac-to-hop-xet-tuyen-bang-quy-doi-diem-chuan-va-du-bao-muc-diem-trung-tuyen-vao-cac-nganh-cua-dai-hoc-bach-khoa-ha-noi-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-29',
    },
  ],
};
