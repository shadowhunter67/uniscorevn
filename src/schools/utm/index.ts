import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { utmAdmissionMethods } from './methods';

export const utmModule: SchoolModule = {
  id: 'utm',
  name: 'Trường Đại học Công nghệ và Quản lý hữu nghị',
  shortName: 'UTM',
  about: 'Trường đại học tư thục tại Hà Nội, đào tạo công nghệ và quản lý.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển UTM 2026 (phương thức thi TN THPT, ngành ngoài Luật/Luật kinh tế): thông báo chính thức utm.edu.vn (đọc trực tiếp qua curl 2026-08-29) xác nhận NGUYÊN VĂN ngưỡng "các ngành đào tạo: từ 15 điểm" (thang 30, không nhân hệ số). Nguồn im lặng về điểm ưu tiên khu vực/đối tượng => áp judgment call chuẩn quốc gia (Điều 7 Thông tư 08/2022/TT-BGDĐT). Ngành Luật/Luật kinh tế có ngưỡng riêng theo quy định Bộ GD&ĐT (chưa mô hình hoá); phương thức học bạ (từ 18/30) và đánh giá năng lực (từ 60 điểm) chưa được chuẩn hoá vào runtime.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(utmAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường Đại học Công nghệ và Quản lý Hữu Nghị công bố ngưỡng đảm bảo chất lượng đầu vào đại học chính quy năm 2026',
      url: 'https://utm.edu.vn/truong-dai-hoc-cong-nghe-va-quan-ly-huu-nghi-cong-bo-nguong-dam-bao-chat-luong-dau-vao-dai-hoc-chinh-quy-nam-2026-1132.html',
      type: 'official-institution',
      checkedAt: '2026-08-29',
    },
  ],
};
