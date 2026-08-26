import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { eautAdmissionMethods } from './methods';

export const eautModule: SchoolModule = {
  id: 'eaut',
  name: 'Trường Đại học Công nghệ Đông Á',
  shortName: 'EAUT',
  about: 'Trường đại học tư thục, đa cơ sở (Hà Nội), đào tạo 34 ngành.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Đã xác minh bài đăng chính thức 2026 (đối chiếu chéo với Congluan.vn, 21/06/2026): phương thức 1 (xét học bạ) có ngưỡng rõ — điểm trung bình tổ hợp 3 môn qua 6 học kỳ >= 18,0/30, kèm điều kiện điểm thi tốt nghiệp THPT >= 15,0/30. Module hiện chỉ kiểm tra được phương thức 1; phương thức 2 (chỉ điểm thi TN THPT) không có ngưỡng công bố riêng, phương thức 3/4 chưa model.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(eautAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường ĐH Công nghệ Đông Á công bố 4 phương thức tuyển sinh năm 2026',
      url: 'https://eaut.edu.vn/tin-tuc/truong-dh-cong-nghe-dong-a-cong-bo-phuong-thuc-tuyen-sinh-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-08-25',
    },
  ],
};
