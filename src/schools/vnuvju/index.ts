import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vnuvjuAdmissionMethods } from './methods';

export const vnuvjuModule: SchoolModule = {
  id: 'vnuvju',
  name: 'Trường Đại học Việt Nhật - Đại học Quốc gia Hà Nội',
  shortName: 'VJU',
  about:
    'Trường thành viên Đại học Quốc gia Hà Nội (mã trường VJU, tên tiếng Anh VNU Vietnam Japan University), đào tạo 9 chương trình đại học chính quy: Nhật Bản học, Khoa học và Kỹ thuật máy tính, Cơ điện tử thông minh và Sản xuất theo phương thức Nhật Bản, Công nghệ thực phẩm và Sức khỏe, Nông nghiệp thông minh và Bền vững, Kỹ thuật Xây dựng, Đổi mới và Phát triển toàn cầu, Công nghệ kỹ thuật Chip bán dẫn, Điều khiển thông minh và Tự động hóa.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'VJU 2026 (Phương thức 100, xét kết quả thi TN THPT): điểm trúng tuyển theo chương trình, nguồn điểm CHÍNH THỨC từ thông báo tổng hợp của ĐHQGHN (`sources.ts:vnuvju-cutoff-vnu-2026`) + thông tin tuyển sinh chi tiết của chính VJU (`vnuvju-notice-2026`: tổ hợp từng chương trình, "không có độ chênh lệch điểm chuẩn giữa các tổ hợp", không hệ số môn). Mô hình hoá đủ 9/9 chương trình, điểm trúng tuyển từ 20,00 đến 21,25/30. Điểm ưu tiên dùng khung quốc gia hiện hành (xem knowledgeGaps.ts). Tổ hợp có Tiếng Nhật và quy đổi IELTS/TOEFL iBT/JLPT đã mô hình hoá; điều kiện ngoại ngữ đầu vào, Vstep và điểm thưởng/khuyến khích chưa (xem knowledgeGaps.ts).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vnuvjuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn (điểm trúng tuyển) đại học chính quy năm 2026 — Đại học Quốc gia Hà Nội (mục Trường Đại học Việt Nhật)',
      url: 'https://vnu.edu.vn/diem-chuan-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-post40358.html',
      type: 'official-institution',
      checkedAt: '2026-10-01',
    },
    {
      title: 'Thông tin tuyển sinh đại học chính quy năm 2026 — Trường Đại học Việt Nhật, ĐHQGHN (VJU)',
      url: 'https://vju.ac.vn/tuyensinhdaihoc/thong-tin-tuyen-sinh-2026/',
      type: 'official-institution',
      checkedAt: '2026-10-01',
    },
  ],
};
