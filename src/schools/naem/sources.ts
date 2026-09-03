import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface NaemSource {
  id: string;
  publisher: string;
  title: string;
  url: string;
  accessedAt: string;
  publishedAt?: string;
  sourceType?: SourceType;
  verification: VerificationLevel;
  lifecycle?: SourceLifecycle;
  note?: string;
}

export const naemSources: NaemSource[] = [
  {
    id: 'naem-threshold-2025',
    publisher: 'Học viện Quản lý giáo dục (NAEM, naem.edu.vn, tên miền chính chủ)',
    title: 'Thông báo Điểm trúng tuyển đại học chính quy năm 2025 vào Học viện Quản lý Giáo dục',
    url: 'https://naem.edu.vn/vi/tin-tuc/thong-bao-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2025-vao-hoc-vien-quan-ly-giao-duc',
    accessedAt: '2026-09-03',
    publishedAt: '2025-08-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng điểm trúng tuyển 2025 theo 7/7 ngành đại học chính quy, cột "Điểm trúng tuyển" cho phương thức xét kết quả thi TN THPT (mã phương thức 100) là MỘT mức điểm áp dụng chung cho ngành đó (không tách theo tổ hợp trong số 6 tổ hợp được công bố cho ngành, xem `naem-thongtin-2025`): Quản lý giáo dục 24,68; Tâm lý học giáo dục 24,87; Quản trị văn phòng 24,38; Giáo dục học (GD trẻ rối loạn phát triển) 24,83; Kinh tế 21,4625 (giữ nguyên 4 chữ số thập phân như bảng công bố, không làm tròn thêm); Ngôn ngữ Anh 25,5; Công nghệ thông tin 15,0 — thang 30. Trang cũng liệt kê điểm chuẩn các phương thức khác (học bạ, ĐGTD/TSA, ĐGNL/HSA, SPT của trường khác) không thuộc phạm vi mô hình hoá ở đây. Thời hạn xác nhận nhập học trực tuyến 17h00 ngày 30/8/2025.',
  },
  {
    id: 'naem-thongtin-2025',
    publisher: 'Học viện Quản lý giáo dục (NAEM, naem.edu.vn, tên miền chính chủ)',
    title: 'Thông tin tuyển sinh đại học chính quy năm 2025',
    url: 'https://naem.edu.vn/vi/tin-tuc/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2025-1',
    accessedAt: '2026-09-03',
    publishedAt: '2025-06-08',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng "Ngành đào tạo — Mã ngành — Chỉ tiêu — Tổ hợp xét tuyển" liệt kê 7 ngành, mỗi ngành có 6 tổ hợp môn công bố dùng chung cho MỌI phương thức xét tuyển (không riêng phương thức 100): Quản lý giáo dục (7140114) A00/A01/C00/D01/X70/X74; Ngôn ngữ Anh (7220201) A01/D01/D10/D14/X78/X25; Kinh tế (7310101) A00/A01/D01/D10/X25/X26; Tâm lý học giáo dục (7310403) A00/B00/C00/D01/X70/X74; Quản trị văn phòng (7340406) A00/A01/C00/D01/X70/X74; Giáo dục học - Trẻ rối loạn phát triển (7140101) A00/B00/C00/D01/X70/X74; Công nghệ thông tin (7480201) A00/A01/D01/D10/X26/X06. Trang "Xét tuyển sử dụng kết quả thi tốt nghiệp THPT (Phương thức 100)" (cùng site) ghi công thức "Điểm xét tuyển (làm tròn đến 2 chữ số thập phân) = M1 + M2 + M3 + Điểm ưu tiên (nếu có)" — không có bảng điểm cộng/khuyến khích riêng. Không tìm thấy số hiệu văn bản/chữ ký chính thức trên trang tin tức (khác định dạng "Quyết định" có PDF ký tên đóng dấu của một số trường khác) — cùng dạng bằng chứng "trang tin chính chủ" như TUEBA/PVU/TNUT/HTU/DUMTP.',
  },
  {
    id: 'naem-priority-formula-2025',
    publisher: 'Học viện Quản lý giáo dục (NAEM, naem.edu.vn, tên miền chính chủ)',
    title: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT (Phương thức 100)',
    url: 'https://naem.edu.vn/vi/tin-tuc/xet-tuyen-su-dung-ket-qua-thi-tot-nghiep-thpt-phuong-thuc-100',
    accessedAt: '2026-09-03',
    publishedAt: '2025-06-08',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Ghi rõ công thức "Điểm ưu tiên = [(30 - Tổng điểm đạt được)/7,5] x Mức điểm ưu tiên (Điểm ưu tiên theo khu vực và đối tượng)" — trùng công thức giảm dần quốc gia (Điều 7 Thông tư 08/2022/TT-BGDĐT sửa đổi bởi Thông tư 06/2025/TT-BGDĐT) áp dụng khi tổng điểm đạt được (đã quy đổi thang 30) từ 22,5 trở lên, KHÔNG tự công bố bảng "Mức điểm ưu tiên" theo khu vực/đối tượng cụ thể — dùng khung quốc gia hiện hành làm judgment call cho GIÁ TRỊ bảng (xem `priority.ts`, `knowledgeGaps.ts`), cùng tiền lệ DNU/TUEBA/PVU/HUST. Trang cũng có bảng quy đổi chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL iBT/APTIS ESOL/Cambridge) sang điểm môn Tiếng Anh trong tổ hợp — KHÔNG mô hình hoá (không có field chuẩn tương ứng trong context xét tuyển).',
  },
];
