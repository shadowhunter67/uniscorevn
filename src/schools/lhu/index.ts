import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { lhuAdmissionMethods } from './methods';

export const lhuModule: SchoolModule = {
  id: 'lhu',
  name: 'Trường Đại học Lạc Hồng',
  shortName: 'LHU',
  about: 'Trường đại học tư thục tại Biên Hòa, Đồng Nai, đào tạo đa ngành với thế mạnh kỹ thuật, công nghệ và ngoại ngữ Nhật/Hoa.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển LHU 2026 (phương thức thi TN THPT, ngành ngoài Dược/Luật/Luật kinh tế): thông báo chính thức lhu.edu.vn (đọc trực tiếp qua curl 2026-08-30) xác nhận NGUYÊN VĂN "Điểm môn 1 + Điểm môn 2 + Điểm môn 3 ≥ 15 điểm" (thang 30, không nhân hệ số). Nguồn im lặng về điểm ưu tiên khu vực/đối tượng => áp judgment call chuẩn quốc gia (Điều 7 Thông tư 06/2026/TT-BGDĐT). Ngành Dược/Luật/Luật kinh tế có ngưỡng riêng theo Bộ GD&ĐT công bố (chưa mô hình hoá); phương thức học bạ, đánh giá năng lực, V-SAT, xét tuyển thẳng chưa được chuẩn hoá vào runtime.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(lhuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường Đại học Lạc Hồng công bố phương thức xét tuyển và chính sách học bổng "khủng" dành cho Tân sinh viên năm học 2026 - 2027',
      url: 'https://lhu.edu.vn/640/52289/Truong-Dai-hoc-Lac-Hong-cong-bo-phuong-thuc-xet-tuyen-va-chinh-sach-hoc-bong-khung-danh-cho-Tan-sinh-vien-nam-hoc-2026-2027.html',
      type: 'official-institution',
      checkedAt: '2026-08-30',
    },
  ],
};
