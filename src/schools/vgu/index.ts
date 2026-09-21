import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vguAdmissionMethods } from './methods';

export const vguModule: SchoolModule = {
  id: 'vgu',
  name: 'Truong Dai hoc Viet Duc',
  shortName: 'VGU',
  about: 'Public transnational university based in Binh Duong, established as a joint Vietnam-Germany model university.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'VGU 2026, phương thức 5 (thi TN THPT), 12 ngành (trừ Kiến trúc), tổ hợp A00/A01/A02/B00/D01/D07 theo từng ngành: đủ điều kiện xét tuyển ⟺ tổng 3 môn (không hệ số, môn Anh có thể thay bằng IELTS quy đổi) + điểm ưu tiên giảm dần ≥ điểm sàn của ngành (17–22/30, bảng chính thức 09/07/2026, đã gồm ưu tiên/điểm cộng) VÀ tổng thô ≥ 15 VÀ đạt yêu cầu tiếng Anh (IELTS ≥ 5,0 hoặc điểm TB Anh 3 năm ≥ 8,0; Xây dựng ≥ 7,5). Đúng cho thí sinh không có điểm cộng riêng; thí sinh chỉ đạt tiếng Anh qua bài thi VGU (75/100) sẽ ở trạng thái chưa kết luận. Ngoài phạm vi: Kiến trúc, tổ hợp D03/D05/D26, TOEFL iBT, IELTS 5,5, phương thức 1–4 (TestAS, học bạ, chứng chỉ quốc tế, xét thẳng).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vguAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Official 2026 floor-score announcement (Diem san xet tuyen)',
      url: 'https://tuyensinh.vgu.edu.vn/post/tr%C6%B0%E1%BB%9Dng-%C4%91%E1%BA%A1i-h%E1%BB%8Dc-vi%E1%BB%87t-%C4%91%E1%BB%A9c-c%C3%B4ng-b%E1%BB%91-%C4%91i%E1%BB%83m-s%C3%A0n-x%C3%A9t-tuy%E1%BB%83n-v%C3%A0o-c%C3%A1c-ch%C6%B0%C6%A1ng-tr%C3%ACnh-%C4%91%C3%A0o-t%E1%BA%A1o-b%E1%BA%ADc-%C4%91%E1%BA%A1i-h%E1%BB%8Dc-n%C4%83m-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Press coverage with per-program floor scores (SGGP)',
      url: 'https://www.sggp.org.vn/truong-dai-hoc-viet-duc-cong-bo-diem-san-xet-tuyen-dai-hoc-nam-2026-post862214.html',
      type: 'secondary',
      checkedAt: '2026-08-24',
    },
  ],
};
