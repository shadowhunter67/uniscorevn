import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { stuAdmissionMethods } from './methods';

export const stuModule: SchoolModule = {
  id: 'stu',
  name: 'Trường Đại học Công nghệ Sài Gòn',
  shortName: 'STU',
  about: 'Trường đại học ngoài công lập tại TP. Hồ Chí Minh, mã trường DSG, đào tạo 20 ngành đại học chính quy năm 2026.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'STU 2026 (PT02 - xét điểm thi tốt nghiệp THPT): DXT = tổng điểm 3 môn thi trong tổ hợp (thang 30, chưa ưu tiên/điểm cộng), cộng điểm ưu tiên KV/ĐT theo khung quốc gia để so với điểm chuẩn PT02 chính thức theo 20/20 ngành. Nguon CHINH CHU tuyensinhdaihoc.stu.edu.vn: homepage tuyen sinh 2026 cho công thức/điều kiện môn va thông báo điểm chuẩn Dot 1 căn cứ Quyết định 614/QD-DSG-DT ngay 09/08/2026. 19 ngành co PT02 = 15,0/30; riêng Luật kinh tế = 20,0/30. Điều kiện mon: nhom Kỹ thuật - Công nghệ phải có Toán; nhom Kinh tế/quan tri/Luật/Thiết kế my thuat/Du lich phải có Toán hoặc Văn va điểm Toán/Văn liên quan >= 1/3 điểm chuẩn chưa ưu tiên.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(stuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'STU công bố điểm chuẩn trúng tuyển đại học chính quy năm 2026 - Đợt 1',
      url: 'https://tuyensinhdaihoc.stu.edu.vn/2026/08/12/stu-cong-bo-diem-chuan-trung-tuyen-dai-hoc-chinh-quy-nam-2026-dot-1/',
      type: 'official-institution',
      checkedAt: '2026-09-26',
    },
    {
      title: 'Đại học Công nghệ Sài Gòn (STU) tuyển sinh Đại học 2026',
      url: 'https://tuyensinhdaihoc.stu.edu.vn/',
      type: 'official-institution',
      checkedAt: '2026-09-26',
    },
  ],
};
