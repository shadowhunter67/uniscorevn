import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tuuAdmissionMethods } from './methods';

export const tuuModule: SchoolModule = {
  id: 'tuu',
  name: 'Trường Đại học Công đoàn',
  shortName: 'TUU',
  about: 'Trường đại học công lập trực thuộc Tổng Liên đoàn Lao động Việt Nam, trụ sở Hà Nội, thương hiệu tuyển sinh LDA, đào tạo 25 ngành/chương trình (kinh tế, kinh doanh, luật, công nghệ, xã hội học, quan hệ lao động...).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'TUU 2026 (thi TN THPT, mã phương thức 100): Điểm xét tuyển = tổng thô 3 môn (không nhân hệ số) + điểm ưu tiên, so với điểm chuẩn thật theo 21/25 ngành (15,06-22,78/30), nguồn Cổng TTĐT Chính phủ đăng lại thông báo chính chủ có chữ ký + con dấu (10/8/2026). Loại Luật/Luật kinh tế/Ngôn ngữ Anh/QTKD-IPOP (điều kiện phụ ngoài tổng điểm, chưa mô hình hoá). Điểm ưu tiên dùng judgment call khung quốc gia (đề án chỉ nêu công thức đầy đủ cho phương thức chị em, không lặp lại nhưng cũng không loại trừ cho PT thi THPT). Điểm cộng thành tích chưa tính.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(tuuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo điểm trúng tuyển đại học hệ chính quy, đợt 1 năm 2026 — Trường Đại học Công đoàn',
      url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-truong-dai-hoc-cong-doan-2026-119260811100437761.htm',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
  ],
};
