import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hluvAdmissionMethods } from './methods';

export const hluvModule: SchoolModule = {
  id: 'hluv',
  name: 'Trường Đại học Hoa Lư',
  shortName: 'HLUV',
  about: 'Trường đại học công lập tại Ninh Bình, đào tạo khối ngành sư phạm (Giáo dục Tiểu học, Giáo dục Mầm non, Sư phạm Toán, Sư phạm Khoa học tự nhiên, Sư phạm Lịch sử - Địa lý) và ngoài sư phạm (Kế toán, Quản trị kinh doanh, Du lịch, Công nghệ thông tin).',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'HLUV 2025 (nhánh xét kết quả thi TN THPT, phương thức 100): điểm trúng tuyển theo ngành, nguồn ảnh chụp thông báo gốc của Hội đồng tuyển sinh (22/8/2025, đọc bằng vision, `sources.ts:hluv-threshold-2025`) + 2 nguồn tổng hợp/báo cross-check khớp TUYỆT ĐỐI (Hướng nghiệp HOCMAI `hluv-combination-2025`, Báo Hà Tĩnh `hluv-combination-secondary-2025`) — nguồn gốc chính thức hluv.edu.vn không fetch được text sạch (news-portal template). Nguồn tổng hợp trích công thức tự công bố "Điểm xét tuyển = Tổng điểm 3 môn + Điểm ưu tiên" (đã cộng ưu tiên). Điểm ưu tiên dùng khung quốc gia hiện hành (judgment call, cùng tiền lệ HAT/HUMP). Mô hình hoá 8/9 ngành đại học chính quy, điểm trúng tuyển từ 16,00 đến 27,07/30 (loại trừ Giáo dục Mầm non — tổ hợp năng khiếu). 4 ngành có nhánh học bạ song song cùng mức điểm — module này chỉ tính nhánh thi TN THPT.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hluvAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo mức điểm trúng tuyển đại học chính quy năm 2025 — Trường Đại học Hoa Lư (ảnh chụp, đăng lại trên tuyensinh247)',
      url: 'https://thi.tuyensinh247.com/diem-chuan-trung-tuyen-dai-hoc-hoa-lu-nam-2025-c24a87053.html',
      type: 'secondary',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Trường Đại Học Hoa Lư — Đề án tuyển sinh (Hướng nghiệp HOCMAI)',
      url: 'https://huongnghiep.hocmai.vn/de-an/truong-dai-hoc-hoa-lu',
      type: 'secondary',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Điểm chuẩn Trường Đại Học Hoa Lư 2025 – Theo ngành và tổ hợp xét tuyển (Báo Hà Tĩnh)',
      url: 'https://baohatinh.vn/cong-cu/diem-chuan/dnb-truong-dai-hoc-hoa-lu',
      type: 'secondary',
      checkedAt: '2026-09-03',
    },
  ],
};
