import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hmtuAdmissionMethods } from './methods';

export const hmtuModule: SchoolModule = {
  id: 'hmtu',
  name: 'Trường Đại học Kỹ thuật Y tế Hải Dương',
  shortName: 'HMTU',
  about:
    'Trường đại học công lập trực thuộc Bộ Y tế (mã trường DKY), trụ sở số 1 đường Vũ Hựu, phường Lê Thanh Nghị. Năm 2026 tuyển 5 ngành đại học chính quy: Y khoa, Điều dưỡng (Điều dưỡng đa khoa / Nha khoa / Gây mê hồi sức), Kỹ thuật Xét nghiệm y học, Kỹ thuật Hình ảnh y học và Kỹ thuật Phục hồi chức năng (Vật lý trị liệu / Hoạt động trị liệu / Ngôn ngữ trị liệu).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'HMTU 2026 (Phương thức 2 — xét kết quả điểm thi TN THPT): công thức CÓ HỆ SỐ, nhân đôi môn Toán rồi quy về thang 30 — "Điểm xét tuyển = (2*Điểm A + Điểm B + Điểm C)*3/4 + ƯT + KK" với Điểm A luôn là môn Toán học, trần 30 — trích nguyên văn Thông tin tuyển sinh trình độ Đại học (Chính quy) năm 2026 (`sources.ts:hmtu-thongtin-tuyensinh-2026`, PDF gốc 11 trang nhúng Google Drive trên cổng chính chủ tuyensinh.hmtu.edu.vn, tải trực tiếp và đọc bằng vision). Tổ hợp xét tuyển dùng CHUNG cho cả 5 ngành (B00, A00, D07, B08/D08) và trường xác nhận điểm xét tuyển "không phụ thuộc vào tổ hợp môn xét tuyển", nên mỗi ngành chỉ có 1 mức điểm chuẩn. Điểm trúng tuyển CHÍNH THỨC cho cả 5/5 ngành (22,50–25,00/30) từ Thông báo số 706/TB-ĐHKTYTHD ngày 10/8/2026 (`sources.ts:hmtu-diemtrungtuyen-706-2026`, ảnh scan văn bản gốc có con dấu trên cùng cổng, đọc bằng vision), cột "THPT". Điểm ưu tiên dùng khung quốc gia hiện hành (Điều 7 Thông tư 06/2026/TT-BGDĐT) vì trường chỉ khai thành phần "ƯT" mà không in bảng mức (judgment call, cùng tiền lệ VUTM/HUPH/ULSA/EPU). ĐIỂM QUAN TRỌNG về phạm vi: rào HỌC LỰC xếp loại khá/giỏi của khối ngành sức khỏe chỉ áp cho nhánh dự bị đại học (mục 5.1.1), học bạ (5.1.3) và ĐGNL/ĐGTD (5.1.4) — mục 5.1.2 dành cho nhánh thi TN THPT KHÔNG có rào học lực, nên nhánh đã mô hình hoá không bị chặn bởi trường dữ liệu mà hồ sơ dùng chung không có. CHƯA mô hình hoá: thành phần KK (điểm cộng khuyến khích — công thức có nêu nhưng không có bảng giá trị), ngưỡng đảm bảo chất lượng đầu vào (Thông báo 594/TB-ĐHKTYTHD), và 3 phương thức còn lại — xem `knowledgeGaps.ts`.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hmtuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh trình độ Đại học (Chính quy) năm 2026 — Trường Đại học Kỹ thuật Y tế Hải Dương',
      url: 'https://tuyensinh.hmtu.edu.vn/?p=12709',
      type: 'official-institution',
      checkedAt: '2026-09-11',
    },
    {
      title: 'Thông báo số 706/TB-ĐHKTYTHD (10/8/2026) — Điểm trúng tuyển đại học chính quy năm 2026',
      url: 'https://tuyensinh.hmtu.edu.vn/?p=14759',
      type: 'official-institution',
      checkedAt: '2026-09-11',
    },
  ],
};
