import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vnuhsbAdmissionMethods } from './methods';

export const vnuhsbModule: SchoolModule = {
  id: 'vnuhsb',
  name: 'Trường Quản trị và Kinh doanh - Đại học Quốc gia Hà Nội',
  shortName: 'VNU-HSB',
  about:
    'Trường thành viên Đại học Quốc gia Hà Nội (mã trường QHD, tên tiếng Anh Hanoi School of Business & Management), đào tạo 6 chương trình đại học chính quy mô hình hoá được: Quản trị doanh nghiệp và công nghệ (MET), Marketing và truyền thông (MAC), Quản trị nhân lực và nhân tài (HAT), Quản trị và An ninh (MAS), Quản trị An ninh phi truyền thống (BNS), Quản trị dịch vụ khách hàng và Chăm sóc sức khỏe (HAS).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'VNU-HSB 2026 (Phương thức 100, xét kết quả thi TN THPT): điểm trúng tuyển theo chương trình, nguồn điểm chuẩn CHÍNH THỨC từ thông báo tổng hợp của ĐHQGHN (`sources.ts:vnuhsb-cutoff-vnu-2026`) + thông báo chi tiết tổ hợp của chính HSB (`vnuhsb-notice-2026`, xác nhận cả 6 chương trình dùng chung 1 bộ tổ hợp, "Chênh lệch điểm xét tuyển: Không quy định"). Mô hình hoá đủ 6/7 chương trình, điểm trúng tuyển từ 19,00 đến 20,75/30. Điểm ưu tiên dùng khung quốc gia hiện hành (trường không tự công bố bảng riêng). Chương trình BBNS (thông báo riêng) chưa mô hình hoá (xem knowledgeGaps.ts).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vnuhsbAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn (điểm trúng tuyển) đại học chính quy năm 2026 — Đại học Quốc gia Hà Nội (mục 11, Trường Quản trị và Kinh doanh)',
      url: 'https://vnu.edu.vn/diem-chuan-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-post40358.html',
      type: 'official-institution',
      checkedAt: '2026-09-28',
    },
    {
      title: 'Thông tin tuyển sinh Đại học năm 2026 — Trường Quản trị và Kinh doanh, ĐHQGHN (HSB)',
      url: 'https://www.hsb.edu.vn/admissions/undergrad-admissions-2026',
      type: 'official-institution',
      checkedAt: '2026-09-28',
    },
  ],
};
