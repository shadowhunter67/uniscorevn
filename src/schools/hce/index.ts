import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hceAdmissionMethods } from './methods';

export const hceModule: SchoolModule = {
  id: 'hce',
  name: 'Trường Đại học Kinh tế, Đại học Huế',
  shortName: 'HCE',
  about: 'Trường đại học công lập thành viên Đại học Huế, đào tạo các lĩnh vực kinh tế, quản trị, tài chính, kế toán.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Tính chính xác điểm xét tuyển HCE 2026 theo thi TN THPT cho toàn bộ 18 ngành Trường Đại học Kinh tế (ngưỡng 15/30 hoặc 17/30 tùy ngành, không hệ số môn, cộng điểm ưu tiên theo Bảng 1 — Thông tin tuyển sinh 2026 của Đại học Huế, PDF 77 trang). Các phương thức khác (xét tuyển thẳng, học bạ, ĐGNL, kết hợp) và các trường thành viên khác của Đại học Huế vẫn chỉ ở mức kiểm tra ngưỡng.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hceAdmissionMethods),
  },
  catalogSources: [
    {
      title: '5 phương thức tuyển sinh năm 2026',
      url: 'https://tuyensinh.hce.edu.vn/5-phuong-thuc-tuyen-sinh-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Điểm sàn xét tuyển đại học năm 2026',
      url: 'https://tuyensinh.hce.edu.vn/diem-san-xet-tuyen-dai-hoc-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Thông tin tuyển sinh đại học hệ chính quy năm 2026 của Đại học Huế',
      url: 'https://tuyensinh.hueuni.edu.vn/News/Detail/thong-tin-tuyen-sinh-dai-hoc-cao-dang-he-chinh-quy-nam-2026-cua-dai-hoc-hue_20260501150542',
      type: 'official-institution',
      checkedAt: '2026-08-26',
    },
  ],
};
