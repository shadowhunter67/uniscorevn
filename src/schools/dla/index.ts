import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dlaAdmissionMethods } from './methods';

export const dlaModule: SchoolModule = {
  id: 'dla',
  name: 'Trường Đại học Kinh tế Công nghiệp Long An',
  shortName: 'DLA',
  about: 'Trường đại học tư thục (mã trường DLA, trụ sở Tây Ninh — tên cũ Long An), đào tạo 9 ngành đại học chính quy khối kinh tế/kỹ thuật/ngôn ngữ: Kế toán, Quản trị kinh doanh, Marketing, Tài chính - Ngân hàng, Luật Kinh tế, Công nghệ thông tin, Công nghệ Kỹ thuật Xây dựng, Ngôn ngữ Anh, Quản trị dịch vụ du lịch và lữ hành.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'DLA 2026 (nhánh xét kết quả thi TN THPT): điểm trúng tuyển theo ngành, nguồn CHÍNH CHỦ tuyensinh.daihoclongan.edu.vn — 2 ảnh nhúng Google Drive đọc bằng vision qua chrome-devtools: "CÔNG BỐ ĐIỂM CHUẨN TRÚNG TUYỂN ĐẠI HỌC CHÍNH QUY 2026" (`sources.ts:dla-cutoff-2026`, cột "Điểm THPT" thang 30) và "NGÀNH / MÃ NGÀNH / TỔ HỢP MÔN" (`dla-combination-2026`). Mô hình hoá 9/9 ngành đại học chính quy, điểm trúng tuyển từ 15,00 đến 20,00/30 (Luật Kinh tế cao nhất). Công thức "tổng 3 môn + điểm ưu tiên" cross-check qua tuyensinh247.com (thứ cấp, `dla-formula-crosscheck-2026`); điểm ưu tiên dùng khung quốc gia hiện hành (trường không tự công bố bảng riêng, judgment call). Chỉ mô hình hoá nhánh thi TN THPT — DLA còn nhánh học bạ và ĐGNL ĐHQG-HCM đã công bố điểm chuẩn song song, chưa mô hình hoá (xem knowledgeGaps.ts).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(dlaAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'DLA chính thức công bố điểm chuẩn đại học năm 2026',
      url: 'https://tuyensinh.daihoclongan.edu.vn/tin-tuc-tuyen-sinh/750-dla-chinh-thuc-cong-bo-diem-chuan-dai-hoc-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Trường Đại học Kinh tế Công nghiệp Long An (DLA) công bố các phương thức tuyển sinh năm 2026',
      url: 'https://tuyensinh.daihoclongan.edu.vn/tin-tuc-tuyen-sinh/742-truong-dai-hoc-kinh-te-cong-nghiep-long-an-dla-cong-bo-cac-phuong-thuc-tuyen-sinh-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
  ],
};
