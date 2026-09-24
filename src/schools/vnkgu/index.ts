import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vnkguAdmissionMethods } from './methods';

export const vnkguModule: SchoolModule = {
  id: 'vnkgu',
  name: 'Trường Đại học Kiên Giang',
  shortName: 'VNKGU',
  about: 'Trường đại học công lập trực thuộc Bộ Giáo dục và Đào tạo, trụ sở tại huyện Châu Thành, tỉnh Kiên Giang, đào tạo khối ngành sư phạm (Toán học, Tiếng Anh, Giáo dục Tiểu học, Giáo dục Mầm non) và ngoài sư phạm (Luật, kinh tế, công nghệ thông tin, kỹ thuật, nông-lâm-ngư nghiệp, ngôn ngữ, du lịch).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'VNKGU 2026 (Phương thức 2 — xét kết quả thi TN THPT): điểm trúng tuyển theo ngành, nguồn CHÍNH CHỦ tuyensinh.vnkgu.edu.vn — PDF "Thông báo công bố Điểm trúng tuyển" ký tên Hiệu trưởng + đóng dấu đỏ (Số 04/TB-HĐTS, 10/8/2026, `sources.ts:vnkgu-cutoff-2026`) + Đề án tuyển sinh 2026 chính thức (công thức Điểm xét tuyển = tổng 3 môn + điểm cộng + điểm ưu tiên, `vnkgu-scheme-2026`) + trang "Điểm cộng và điểm Ưu tiên" (bảng điểm ưu tiên KV/ĐT đầy đủ, `vnkgu-priority-2026`). Mô hình hoá 28/28 ngành đại học chính quy, điểm trúng tuyển từ 15,00 đến 28,55/30. Điểm cộng thành tích (tối đa 3,00) KHÔNG mô hình hoá — kết quả "chưa đạt" chỉ là cận dưới cho thí sinh có thành tích (xem knowledgeGaps.ts). Chỉ tính Phương thức 2 — VNKGU còn Phương thức 1/3/4/5 (tuyển thẳng/học bạ/ĐGNL/V-SAT), chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vnkguAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo công bố Điểm trúng tuyển Đại học chính quy năm 2026 — Trường Đại học Kiên Giang',
      url: 'https://tuyensinh.vnkgu.edu.vn/bai-viet/thong-bao-diem-chuan-trung-tuyen-dai-hoc-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
    {
      title: 'Thông tin tuyển sinh đại học chính quy năm 2026 (Đề án tuyển sinh) — Trường Đại học Kiên Giang',
      url: 'https://tuyensinh.vnkgu.edu.vn/bai-viet/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-de-an-tuyen-sinh',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
  ],
};
