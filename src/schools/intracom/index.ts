import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { intracomAdmissionMethods } from './methods';

export const intracomModule: SchoolModule = {
  id: 'intracom',
  name: 'Trường Đại học Intracom',
  shortName: 'Intracom',
  about: 'Trường đại học tư thục tại Hưng Yên (tiền thân Trường Đại học Chu Văn An, đổi tên 2026), đào tạo 13 ngành khối kinh tế, kỹ thuật, ngôn ngữ.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'Kiểm tra ngưỡng điểm xét tuyển Intracom University 2026 (thi TN THPT): 12 ngành (Quản trị kinh doanh, Tài chính-Ngân hàng, Kế toán, Kỹ thuật điện, Kỹ thuật xây dựng, Công nghệ thông tin, Kỹ thuật cơ khí, Kiến trúc, Ngôn ngữ Anh, Ngôn ngữ Trung Quốc, Du lịch, Quản trị khách sạn, Quản lý dự án) ≥15,0/30; riêng Luật Kinh tế ≥20,0/30. Nguồn không nói rõ đã gồm điểm ưu tiên hay chưa → so RAW, điểm ưu tiên chỉ hiển thị tham khảo. Phương thức học bạ, ĐGNL, xét thẳng chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(intracomAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường Đại học Intracom công bố ngưỡng điểm xét tuyển năm 2026',
      url: 'https://intracomuni.edu.vn/tin-tuyen-sinh/truong-dai-hoc-intracom-cong-bo-nguong-diem-xet-tuyen-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
  ],
};
