import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hvtaAdmissionMethods } from './methods';

export const hvtaModule: SchoolModule = {
  id: 'hvta',
  name: 'Học viện Tòa án',
  shortName: 'HVTA',
  about: 'Cơ sở đào tạo đại học ngành Luật trực thuộc Tòa án nhân dân tối cao, tuyển sinh có điều kiện sơ tuyển riêng.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Kiểm tra ngưỡng điều kiện xét tuyển HVTA 2026 (ngành Luật duy nhất, thi TN THPT): đủ điều kiện ⟺ tổng thô 3 môn ≥ 18,0/30 (Chuẩn chương trình đào tạo lĩnh vực Pháp luật QĐ 678/QĐ-BGDĐT — 60% thang điểm, cao hơn ngưỡng riêng 15,0/30 của trường) VÀ điểm Toán/Ngữ văn (môn có trong tổ hợp A00/A01/C00/D01) ≥ 6/10. Điểm ưu tiên chỉ hiển thị tham khảo (nguồn không nói rõ ngưỡng đã gồm ưu tiên hay chưa). LƯU Ý QUAN TRỌNG: HVTA còn yêu cầu thí sinh phải "Đạt sơ tuyển" tại Tòa án nhân dân nơi hộ khẩu/tạm trú hoặc tại Học viện (hồ sơ, sức khỏe, lý lịch) — điều kiện pass/fail ngoài phạm vi điểm số, UniscoreVN KHÔNG kiểm tra được; "đủ điều kiện xét tuyển" ở đây chỉ có nghĩa đạt ngưỡng điểm. Phương thức học bạ, xét thẳng và điểm cộng (ưu tiên, chứng chỉ ngoại ngữ) chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hvtaAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh năm 2026 — Học viện Tòa án',
      url: 'https://cdn.tuyensinh247.com/picture/2026/0615/thong-tin-tuyen-sinh-hoc-vien-toa-an-2026.pdf',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
  ],
};
