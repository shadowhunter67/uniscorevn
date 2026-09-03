import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { bluAdmissionMethods } from './methods';

export const bluModule: SchoolModule = {
  id: 'blu',
  name: 'Trường Đại học Bạc Liêu',
  shortName: 'BLU',
  about: 'Trường đại học công lập tại Bạc Liêu (mã trường DBL), đào tạo khối ngành sư phạm (Giáo dục Tiểu học, Sư phạm Toán học, Sư phạm Hóa học, Sư phạm Sinh học, Giáo dục Mầm non) và ngoài sư phạm (Ngôn ngữ Anh, Tiếng Việt và Văn hóa Việt Nam, Quản trị kinh doanh, Tài chính – Ngân hàng, Kế toán, Khoa học môi trường, Công nghệ thông tin, Chăn nuôi, Bảo vệ thực vật, Nuôi trồng thủy sản).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'BLU 2026 (nhánh xét kết quả thi TN THPT, mã phương thức 100/405): điểm trúng tuyển đợt 1 theo ngành, nguồn CHÍNH CHỦ tuyensinh.blu.edu.vn — ảnh "ĐIỂM CHUẨN TRÚNG TUYỂN NĂM 2026" đính kèm Thông báo 10/8/2026 (căn cứ Quyết định số 426/QĐ-ĐHBL, đọc bằng vision, `sources.ts:blu-cutoff-2026`) + trang HTML chính thức "Ngành, tổ hợp và số lượng tuyển sinh" (tổ hợp môn theo ngành, `blu-combination-2026`) + trang HTML chính thức "Chính sách ưu tiên trong tuyển sinh" (công thức điểm ưu tiên tự công bố, xác nhận mức KV1=0,75/nhóm ĐT2=1,00 qua ví dụ minh hoạ, khớp khung quốc gia hiện hành, `blu-priority-2026`). Mô hình hoá 13/15 ngành đại học chính quy, điểm trúng tuyển từ 15,00 đến 24,66/30 (loại trừ Giáo dục Mầm non — trình độ cao đẳng khác cấp, tổ hợp năng khiếu M00 không có SubjectId). Chỉ tính nhánh thi TN THPT — BLU còn nhánh học bạ và ĐGNL V-ACT đã công bố điểm chuẩn song song, chưa mô hình hoá (xem knowledgeGaps.ts).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(bluAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo công bố điểm chuẩn trúng tuyển các ngành đào tạo trình độ đại học và ngành Giáo dục Mầm non trình độ cao đẳng đợt 1 năm 2026 — Trường Đại học Bạc Liêu',
      url: 'https://tuyensinh.blu.edu.vn/thong-bao-cong-bo-diem-chuan-trung-tuyen-cac-nganh-dao-tao-trinh-do-dai-hoc-va-nganh-giao-duc-mam-non-trinh-do-cao-dang-dot-1-nam-2026-11292',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Ngành, tổ hợp và số lượng tuyển sinh năm 2026 — Trường Đại học Bạc Liêu',
      url: 'https://tuyensinh.blu.edu.vn/tuyensinh/nganh-to-hop-va-so-luong-tuyen-sinh-11145',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Chính sách ưu tiên trong tuyển sinh năm 2026 — Trường Đại học Bạc Liêu',
      url: 'https://tuyensinh.blu.edu.vn/tuyensinh/chinh-sach-uu-tien-trong-tuyen-sinh-11146',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
  ],
};
