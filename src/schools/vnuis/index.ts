import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vnuisAdmissionMethods } from './methods';

export const vnuisModule: SchoolModule = {
  id: 'vnuis',
  name: 'Trường Quốc tế - Đại học Quốc gia Hà Nội',
  shortName: 'VNU-IS',
  about:
    'Trường thành viên Đại học Quốc gia Hà Nội (mã trường QHQ), đào tạo 14 chương trình đại học chính quy: Kinh doanh quốc tế, Kế toán/Phân tích/Kiểm toán, Hệ thống thông tin quản lý, Tin học và Kỹ thuật máy tính, Phân tích dữ liệu kinh doanh, Marketing, Quản lý, Tự động hóa và Tin học, Ngôn ngữ Anh, Công nghệ thông tin ứng dụng, Công nghệ tài chính và Kinh doanh số, Kỹ thuật hệ thống công nghiệp và Logistics, Kinh doanh số, Truyền thông số.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'VNU-IS 2026 (xét kết quả thi TN THPT): điểm trúng tuyển theo chương trình, nguồn điểm chuẩn CHÍNH THỨC từ thông báo tổng hợp của ĐHQGHN (`sources.ts:vnuis-cutoff-vnu-2026`) + thông báo chi tiết công thức và tổ hợp của chính Trường Quốc tế (`vnuis-notice-2026`, công bố nguyên văn "Điểm xét tuyển = Tổng điểm 03 môn + Điểm cộng (nếu có) + Điểm ưu tiên (nếu có)" và bảng điểm ưu tiên khu vực/đối tượng ĐẦY ĐỦ, khớp khung quốc gia hiện hành). Mô hình hoá đủ 14/14 chương trình, điểm trúng tuyển từ 19,00 đến 21,25/30. 4 chương trình (QHQ04/08/10/12) có điều kiện phụ: điểm Toán >= 6,0/10 nếu dùng tổ hợp D01. Điểm cộng thành tích và 2 phương thức khác (CCTA+THPT, HSA) chưa mô hình hoá (xem knowledgeGaps.ts).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vnuisAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn (điểm trúng tuyển) đại học chính quy năm 2026 — Đại học Quốc gia Hà Nội (mục 10, Trường Quốc tế)',
      url: 'https://vnu.edu.vn/diem-chuan-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-post40358.html',
      type: 'official-institution',
      checkedAt: '2026-09-27',
    },
    {
      title: 'Thông tin tuyển sinh đại học chính quy năm 2026 — Trường Quốc tế - ĐHQGHN',
      url: 'https://www.is.vnu.edu.vn/truong-quoc-te-thong-bao-thong-tin-du-kien-tuyen-sinh-dhcq-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-09-27',
    },
  ],
};
