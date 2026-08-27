import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { huafAdmissionMethods } from './methods';

export const huafModule: SchoolModule = {
  id: 'huaf',
  name: 'Trường Đại học Nông Lâm, Đại học Huế',
  shortName: 'HUAF',
  about: 'Trường đại học công lập thành viên Đại học Huế, đào tạo các lĩnh vực nông nghiệp, lâm nghiệp, thủy sản, thú y, cơ khí và quản lý tài nguyên.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển HUAF 2026 theo thi TN THPT cho toàn bộ 19 mã ngành Trường Đại học Nông Lâm (mã DHL): tổng thô 3 môn (không hệ số) + điểm cộng (tùy chọn) + điểm ưu tiên theo Bảng 1 của Đại học Huế (công thức giảm khi tổng ≥ 22,5), so với ngưỡng theo ngành 15/16/17 trên thang 30 — công thức và bảng ưu tiên trích từ Thông tin tuyển sinh 2026 của Đại học Huế, ngưỡng từ Phụ lục 1 Thông báo 42/TB-HĐTSĐH. Phương thức học bạ vẫn chỉ kiểm tra ngưỡng đồng thời; quy đổi chứng chỉ ngoại ngữ và điểm cộng thành tích chưa nhập.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(huafAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh đại học chính quy năm 2026 của Trường Đại học Nông Lâm, Đại học Huế',
      url: 'https://tuyensinh.huaf.edu.vn/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2025-cua-truong-dai-hoc-nong-lam-dai-hoc-hue-chinh-thuc-2/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
