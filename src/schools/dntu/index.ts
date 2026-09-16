import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dntuAdmissionMethods } from './methods';

export const dntuModule: SchoolModule = {
  id: 'dntu',
  name: 'Trường Đại học Công nghệ Đồng Nai',
  shortName: 'DNTU',
  about: 'Trường đại học tư thục tại Đồng Nai, đào tạo 22 ngành khối kỹ thuật, kinh tế, sức khỏe.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'Kiểm tra ngưỡng điểm chuẩn DNTU 2026 (thi TN THPT): tổng thô 3 môn ≥15,0/30 cho hầu hết 22 ngành, riêng Điều dưỡng và Xét nghiệm y học ≥18,0/30 — điểm chuẩn TRÚNG TUYỂN thật đã công bố 09/8/2026. Nguồn không nói rõ đã gồm điểm ưu tiên hay chưa → so RAW, điểm ưu tiên chỉ hiển thị tham khảo. Phương thức học bạ và ĐGNL ĐHQG TP.HCM chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(dntuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn trúng tuyển Đại học chính quy năm 2026 — DNTU',
      url: 'https://dntu.edu.vn/thong-tin-tuyen-sinh-dai-hoc/truong-dai-hoc-cong-nghe-dong-nai-dntu-cong-bo-diem-chuan-trung-tuyen-dai-hoc-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
  ],
};
