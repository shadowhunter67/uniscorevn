import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { ukhAdmissionMethods } from './methods';

export const ukhModule: SchoolModule = {
  id: 'ukh',
  name: 'Trường Đại học Khánh Hòa',
  shortName: 'UKH',
  about: 'Trường đại học công lập trực thuộc UBND tỉnh Khánh Hòa, 2 cơ sở tại TP Nha Trang, đào tạo khối ngành sư phạm (Ngữ văn/Lịch sử-Địa lý/Tiếng Anh/Toán/Vật lý/Khoa học tự nhiên, Giáo dục Tiểu học) và ngoài sư phạm (Sinh học ứng dụng, Hóa học, Quản trị kinh doanh, Quản trị khách sạn, Du lịch, Việt Nam học, Văn học, Văn hóa học, Ngôn ngữ Anh, Ngôn ngữ học, Ngôn ngữ Trung Quốc, Truyền thông đa phương tiện, Marketing).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'UKH 2026 (xét kết quả thi TN THPT): điểm trúng tuyển đợt 1 theo ngành, nguồn CHÍNH CHỦ ukh.edu.vn/tuyensinh — PDF "Thông báo điểm trúng tuyển đợt 1" ký tên Chủ tịch HĐTS + đóng dấu đỏ (Số 07/TB-HĐTS, 09/8/2026, `sources.ts:ukh-cutoff-2026`) + PDF "Thông tin tuyển sinh năm 2026 (cập nhật)" (bảng tổ hợp môn theo ngành + Phụ lục IV điểm ưu tiên đầy đủ, `ukh-scheme-2026`). Mô hình hoá 21/21 ngành đại học chính quy, điểm trúng tuyển từ 15,00 đến 24,88/30 (loại tổ hợp có môn Tiếng Trung — chưa có SubjectId tương ứng). Điểm cộng thành tích (tối đa 3,00) KHÔNG mô hình hoá — kết quả "chưa đạt" chỉ là cận dưới cho thí sinh có thành tích (xem knowledgeGaps.ts). Chỉ tính nhánh thi TN THPT — UKH còn nhánh học bạ và ĐGNL ĐHQG-HCM đã công bố điểm chuẩn song song, chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(ukhAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo điểm trúng tuyển đại học chính quy đợt 1 năm 2026 — Trường Đại học Khánh Hòa',
      url: 'https://ukh.edu.vn/tuyensinh/vi-vn/chi-tiet-tin/id/6394/Thong-bao-diem-trung-tuyen-dot-1-cac-nganh-dao-tao-trinh-do-dai-hoc-chinh-quy,-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
    {
      title: 'Thông tin tuyển sinh năm 2026 (cập nhật) — Trường Đại học Khánh Hòa',
      url: 'https://ukh.edu.vn/tuyensinh/vi-vn/chi-tiet-tin/id/6346/THONG-TIN-TUYEN-SINH-NAM-2026-(CAP-NHAT)',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
  ],
};
