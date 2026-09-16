import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { thuvAdmissionMethods } from './methods';

export const thuvModule: SchoolModule = {
  id: 'thuv',
  name: 'Trường Đại học Y khoa Tokyo Việt Nam',
  shortName: 'THUV',
  about: 'Trường đại học tư thục hợp tác Việt-Nhật tại Hưng Yên, đào tạo khối ngành sức khỏe (Điều dưỡng, Kỹ thuật y học).',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển THUV 2026 (Phương thức 2 — thi TN THPT, thí sinh không chứng chỉ JLPT): ĐXT = round2(tổng thô 3 môn + điểm ưu tiên KV/ĐT theo Điều 7 TT 06/2026) — trích nguyên văn Quyết định 260306/001/QĐ-THUV mục 2.2 ("ĐXT = Đ1 + Đ2 + Đ3 + ƯT + KK"); đủ điều kiện trúng tuyển khi ĐXT ≥ 18,0/30, điểm chuẩn thật đã công bố 09/8/2026 (Thông báo 260809/001/TB-THUV), đồng nhất cả 4 ngành. Phạm vi 6 tổ hợp chung (A00/A01/A02/B00/B08/D07); các phương thức xét tuyển thẳng, học bạ, ĐGNL (HSA/SPT) và điểm cộng JLPT chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(thuvAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Quyết định 260306/001/QĐ-THUV — Thông tin tuyển sinh trình độ Đại học năm 2026',
      url: 'https://tokyo-human.edu.vn/wp-content/uploads/2026/03/THU-Thong-tin-tuyen-sinh-2026-QD.pdf',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
    {
      title: 'Thông báo 260809/001/TB-THUV — Điểm trúng tuyển và hướng dẫn thủ tục nhập học năm 2026',
      url: 'https://tokyo-human.edu.vn/wp-content/uploads/2026/08/TB-diem-trung-tuyen-huong-dan-thu-tuc-nhap-hoc-2026.pdf',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
  ],
};
