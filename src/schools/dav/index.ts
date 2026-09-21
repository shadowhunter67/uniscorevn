import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { davAdmissionMethods } from './methods';

export const davModule: SchoolModule = {
  id: 'dav',
  name: 'Hoc vien Ngoai giao',
  shortName: 'DAV',
  about: 'Public academy under the Ministry of Foreign Affairs.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'DAV 2026, phương thức 4 (thi TN THPT), 9 ngành không phải Luật, tổ hợp A00/A01/C00/D01/D07/D09/D10/D14/D15: điểm xét = tổng 3 môn (môn Anh tự chọn phương án có lợi hơn giữa điểm thi và IELTS/TOEFL iBT quy đổi) + điểm ưu tiên giảm dần [(30 − tổng)/7,5] × mức khi tổng ≥ 22,5, so ngưỡng 22,0 (C00: 23,0) — ngưỡng theo thông báo 10/07/2026 đã bao gồm điểm cộng và ưu tiên. Kết quả đúng cho thí sinh KHÔNG có điểm xét thưởng học sinh giỏi (Bảng 5, chưa có trong hồ sơ). Ngoài phạm vi: ngành Luật quốc tế/Luật thương mại quốc tế, tổ hợp ngoại ngữ Pháp/Trung/Nhật/Hàn (D03/D04/D06/DD2), chứng chỉ ngoài tiếng Anh; các phương thức học bạ + chứng chỉ, SAT/ACT + chứng chỉ chỉ kiểm tra ngưỡng, xét tuyển thẳng chưa tính được. Chưa có điểm chuẩn 2026 để so sánh.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    partialCalculator: true,
    ...aggregateSchoolCapabilities(davAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'DAV 2026 undergraduate admission information',
      url: 'https://static.dav.edu.vn/files/2026/05/20/hqt-thong-tin-tuyen-sinh-2026-dav-updated-18-05-2026.pdf',
      type: 'official-institution',
      checkedAt: '2026-08-22',
    },
    {
      title: 'DAV 2026 thresholds and equivalent cutoff conversion',
      url: 'https://static.dav.edu.vn/files/2026/07/11/hqt-nguong-do-lech-va-bang-quy-doi.pdf',
      type: 'official-institution',
      checkedAt: '2026-08-22',
    },
  ],
};
