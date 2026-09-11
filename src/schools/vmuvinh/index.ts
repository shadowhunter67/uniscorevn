import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vmuvinhAdmissionMethods } from './methods';

export const vmuvinhModule: SchoolModule = {
  id: 'vmuvinh',
  name: 'Trường Đại học Y khoa Vinh',
  shortName: 'VMU-Vinh',
  about:
    'Trường đại học công lập trực thuộc UBND tỉnh Nghệ An (mã trường YKV, số 161 Nguyễn Phong Sắc, phường Trường Vinh), thành lập theo Quyết định 1077/QĐ-TTg (13/07/2010). Năm 2026 tuyển 5 chương trình đại học chính quy: Y khoa, Dược học, Y học dự phòng, Điều dưỡng, Kỹ thuật xét nghiệm y học (ngoài ra còn chương trình Điều dưỡng liên thông chỉ tuyển bằng phương thức học bạ).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'VMU-Vinh 2026 (Phương thức 100 — xét kết quả kỳ thi TN THPT): công thức CHÍNH CHỦ từ Thông tin tuyển sinh đại học năm 2026 (`sources.ts:vmuvinh-thongtin-tuyensinh-2026`, PDF gốc 14 trang trên vmu.edu.vn; lớp text là OCR hỏng dấu nên đọc bằng vision), mục IV.4.1.a: "Điểm xét tuyển ... là tổng điểm thi tốt nghiệp THPT năm 2026 của các môn theo tổ hợp môn đăng ký xét tuyển cộng với điểm ưu tiên, điểm cộng (nếu có) và được làm tròn đến 2 chữ số thập phân", kèm 2 khẳng định quan trọng: "Điểm xét tuyển tối đa là 30 điểm, các môn trong tổ hợp môn xét tuyển có trọng số ngang nhau" và "Không quy định điểm chênh lệch giữa các tổ hợp môn xét tuyển" — nên mỗi ngành chỉ có 1 mức điểm trúng tuyển. Điểm trúng tuyển đợt 1 CHÍNH THỨC cho cả 5/5 chương trình đại học chính quy (18,00–23,50/30) từ Thông báo số 809/TB-ĐHYKV ngày 10/8/2026 (`sources.ts:vmuvinh-diemtrungtuyen-809-2026`, PDF gốc có chữ ký Hiệu trưởng Nguyễn Văn Tuấn + con dấu, đọc bằng vision) — thông báo này in luôn cột TỔ HỢP XÉT TUYỂN, khớp tuyệt đối với mục III.3.1 của Thông tin tuyển sinh. Điểm ưu tiên dùng khung quốc gia hiện hành (Điều 7 Thông tư 06/2026/TT-BGDĐT, judgment call cùng tiền lệ NDUN/HMTU/VUTM/HUPH). Như HMTU, rào HỌC LỰC xếp loại giỏi/khá của khối ngành sức khỏe chỉ đặt ở mục II.2.2.6 (xét học bạ) — nhánh thi TN THPT (mục II.2.2.5) chỉ yêu cầu đạt ngưỡng điểm số, nên nhánh đã mô hình hoá không cần trường "học lực". CHƯA mô hình hoá: thành phần "điểm cộng" (nêu trong công thức nhưng không có bảng giá trị), ngưỡng đảm bảo chất lượng đầu vào (thông báo riêng 10/7/2026, chưa đọc), 3 phương thức còn lại (tuyển thẳng, học bạ, phương thức khác) và chương trình Điều dưỡng liên thông LT7720301 (chỉ tuyển bằng học bạ) — xem `knowledgeGaps.ts`.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vmuvinhAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh đại học năm 2026 — Trường Đại học Y khoa Vinh',
      url: 'https://www.vmu.edu.vn/tuyen-sinh-dao-tao/dai-hoc-chinh-quy/tuyen-sinh/thong-tin-tuyen-sinh-dai-hoc-nam-2026-a9800',
      type: 'official-institution',
      checkedAt: '2026-09-11',
    },
    {
      title: 'Thông báo số 809/TB-ĐHYKV (10/8/2026) — Điểm trúng tuyển hệ đại học đợt 1 năm 2026',
      url: 'https://www.vmu.edu.vn/tuyen-sinh-dao-tao/dai-hoc-chinh-quy/tuyen-sinh/diem-trung-tuyen-he-dai-hoc-dot-1-nam-2026-a9913',
      type: 'official-institution',
      checkedAt: '2026-09-11',
    },
  ],
};
