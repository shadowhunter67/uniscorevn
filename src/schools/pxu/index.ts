import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { pxuAdmissionMethods } from './methods';

export const pxuModule: SchoolModule = {
  id: 'pxu',
  name: 'Trường Đại học Phú Xuân',
  shortName: 'PXU',
  about: 'Trường đại học tư thục tại Huế (mã trường DPX, tên miền cũ phuxuan.edu.vn nay 301-redirect sang pxu.edu.vn), đào tạo đa ngành ứng dụng.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'PXU 2026 — 2 phương thức exact đọc trực tiếp từ Thông tin tuyển sinh năm 2026 (Số 041/TB-PXU, 19/3/2026, PDF scan chính chủ pxu.edu.vn có chữ ký + con dấu Hiệu trưởng, đọc qua vision) và bảng điểm trúng tuyển chính thức 16/8/2026 (ảnh, đọc qua vision). Phương thức 1 (thi TN THPT): Điểm xét = (T1+T2+T3) + điểm ưu tiên KV/ĐT, điểm trúng tuyển CHÍNH THỨC 15,00/30 đồng nhất 9/9 ngành. Phương thức 2 (học bạ): Điểm xét = (H1+H2+H3, TB cả năm lớp 10/11/12 mỗi môn) + điểm ưu tiên, điểm trúng tuyển CHÍNH THỨC 18,00/30 đồng nhất 9/9 ngành (khác ngưỡng đầu vào 16,00 công bố hồi tháng 3 — dùng giá trị cuối). Điểm ưu tiên KV/ĐT lấy TRỰC TIẾP từ bảng + công thức giảm dần tự công bố của trường (mục 5.3), không phải judgment call. Điểm cộng theo thành tích/chứng chỉ ngoại ngữ (mục 5.2, đã đọc đủ giá trị) và 4 tổ hợp có môn Tiếng Trung Quốc (D04/D45/D65/X37, "chinese" chưa có trong `core/subjects.ts`) CHƯA wired vào runtime — xem `knowledgeGaps.ts`. Phương thức 3 (kết hợp chứng chỉ ngoại ngữ), 4 (ĐGNL ĐHQG), 5 (tuyển thẳng) chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(pxuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh năm 2026 (Số 041/TB-PXU) — Trường Đại học Phú Xuân',
      url: 'https://pxu.edu.vn/api/files/migrated/2026/05/Thong-tin-tuyen-sinh-chinh-quy-nam-2026-4.pdf',
      type: 'official-institution',
      checkedAt: '2026-09-04',
    },
    {
      title: 'PXU công bố điểm trúng tuyển đại học chính quy năm 2026',
      url: 'https://pxu.edu.vn/news/diem-trung-tuyen-dai-hoc-phu-xuan-2026',
      type: 'official-institution',
      checkedAt: '2026-09-04',
    },
  ],
};
