import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vutmAdmissionMethods } from './methods';

export const vutmModule: SchoolModule = {
  id: 'vutm',
  name: 'Học viện Y Dược học cổ truyền Việt Nam',
  shortName: 'VUTM',
  about:
    'Học viện công lập trực thuộc Bộ Y tế (mã trường HYD, Hà Nội), đào tạo 3 ngành đại học chính quy: Y khoa, Y học cổ truyền và Dược học.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'VUTM 2026 (phương thức xét kết quả thi tốt nghiệp THPT): toàn bộ dữ liệu cần thiết nằm trong MỘT văn bản CHÍNH CHỦ duy nhất — Thông báo số 3036/TB-HVYDCT ngày 10/8/2026 "Điểm chuẩn và thời hạn xác nhận nhập học, tuyển sinh đại học chính quy năm 2026" (`sources.ts:vutm-diemchuan-3036-2026`, PDF gốc trên vutm.edu.vn có chữ ký Giám đốc Nguyễn Quốc Huy + con dấu, đọc bằng vision). Bảng "I. Điểm chuẩn" cho cả 3/3 ngành kèm mã ngành VÀ tổ hợp xét tuyển: Y khoa 7720101 = 24,50; Y học cổ truyền 7720115 = 22,30; Dược học 7720201 = 22,00 (thang 30). Công thức nằm ngay dưới bảng: "Điểm xét tuyển của thí sinh là tổng điểm các bài thi/môn thi theo thang điểm 10 đối với từng bài thi/môn thi của tổ hợp xét tuyển cộng với điểm cộng, điểm ưu tiên đối tượng, khu vực theo quy định hiện hành và được làm tròn đến hai chữ số thập phân" — không hệ số môn, điểm chuẩn không phân biệt theo tổ hợp. Điểm ưu tiên dùng khung quốc gia hiện hành (Điều 7 Thông tư 06/2026/TT-BGDĐT) vì văn bản chỉ dẫn chiếu "quy định hiện hành" (judgment call, cùng tiền lệ HUPH/ULSA/EPU/HVU). CHƯA mô hình hoá: thành phần "điểm cộng" (văn bản có nêu trong công thức nhưng KHÔNG in bảng giá trị và không tìm thấy ở nguồn chính chủ khác — thiếu nguồn), tổ hợp D35 của ngành Y học cổ truyền (chưa có trong danh mục tổ hợp dùng chung, văn bản không chú giải thành phần môn), phương thức xét tuyển thẳng, và ngưỡng đảm bảo chất lượng đầu vào khối ngành sức khỏe theo quy định của Bộ Y tế (điểm chuẩn cuối đều cao hơn ngưỡng nên không làm sai kết quả) — xem `knowledgeGaps.ts`.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vutmAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo số 3036/TB-HVYDCT (10/8/2026) — Điểm chuẩn và thời hạn xác nhận nhập học, tuyển sinh đại học chính quy năm 2026',
      url: 'https://vutm.edu.vn/vi/tuyen-sinh-dai-hoc.nd/thong-bao-diem-chuan-va-thoi-han-xac-nhan-nhap-hoc-tuyen-sinh-dai-hoc-chinh-quy-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-09-09',
    },
  ],
};
