import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TumpSource {
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

export const tumpSources: TumpSource[] = [
  {
    id: 'tump-threshold-2025',
    publisher: 'Trường Đại học Y - Dược, Đại học Thái Nguyên (mã trường DTY, tuyensinh.tump.edu.vn, tên miền chính chủ)',
    title: 'Thông báo số 996/TB-ĐHYD ngày 22/8/2025 — Điểm trúng tuyển và danh sách thí sinh trúng tuyển đại học chính quy năm 2025',
    url: 'http://tuyensinh.tump.edu.vn/article/thong-bao-diem-trung-tuyen-va-danh-sach-thi-sinh-trung-tuyen-dai-hoc-chinh-quy-nam-2025',
    accessedAt: '2026-09-03',
    publishedAt: '2025-08-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Văn bản có chữ ký Hiệu trưởng - Chủ tịch Hội đồng tuyển sinh (PGS.TS. Nguyễn Tiến Dũng) + con dấu. Bảng "Điểm trúng tuyển đại học chính quy năm 2025" liệt kê 9 ngành với MỘT cột "Điểm trúng tuyển" duy nhất mỗi ngành (thang 30), dao động 18,30 (Y học dự phòng) đến 26,15 (Răng - Hàm - Mặt). Chú thích cuối trang: "Điểm trúng tuyển là điểm quy đổi đã bao gồm điểm cộng, điểm ưu tiên khu vực/đối tượng (nếu có)" — áp dụng chung cho mọi phương thức/tổ hợp sau khi quy đổi (mục 2 của `tump-thongtin-2025` mô tả công thức quy đổi tương đương giữa các phương thức). File PDF gốc (41 trang, kèm danh sách thí sinh trúng tuyển — KHÔNG trích dẫn dữ liệu cá nhân thí sinh vào hệ thống) đính kèm trên trang.',
  },
  {
    id: 'tump-thongtin-2025',
    publisher: 'Trường Đại học Y - Dược, Đại học Thái Nguyên (tuyensinh.tump.edu.vn, tên miền chính chủ)',
    title: 'Thông báo số 688/TB-ĐHYD ngày 13/6/2025 — Công khai thông tin tuyển sinh đại học năm 2025',
    url: 'https://tuyensinh.tump.edu.vn/article/thong-tin-tuyen-sinh-dai-hoc-nam-2025',
    accessedAt: '2026-09-03',
    publishedAt: '2025-06-13',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'File PDF "THÔNG TIN TUYỂN SINH ĐẠI HỌC NĂM 2025" (26 trang, biểu mẫu theo Công văn 2457/BGDĐT-GDĐH và 2835/BGDĐT-GDĐH), có chữ ký + con dấu. Mục II.1.1 (PTXT 100, xét kết quả thi TN THPT): điều kiện dự tuyển là đạt ngưỡng đảm bảo chất lượng đầu vào từ điểm thi TN THPT do Bộ GD&ĐT công bố năm 2025; nguyên tắc xét tuyển "Điểm xét tuyển (ĐXT) là tổng điểm 3 môn (kỳ thi TN THPT 2025) thuộc tổ hợp môn xét tuyển... cộng với điểm cộng, điểm ưu tiên (nếu có)... làm tròn đến 2 chữ số thập phân"; môn Tiếng Anh được lấy điểm cao nhất giữa điểm thi TN THPT và điểm quy đổi chứng chỉ IELTS (mục 2.2) — module này KHÔNG áp dụng phần thay thế này (xem `knowledgeGaps.ts`). Mục 3 "Ngành tuyển sinh, chỉ tiêu tuyển sinh, phương thức tuyển sinh và tổ hợp xét tuyển" liệt kê đầy đủ 9 ngành đại học chính quy với tổ hợp PTXT 100 riêng cho từng ngành (bảng DTY101–DTY603). Mục 4.2 "Điểm cộng" có bảng mức điểm cộng riêng của trường (IELTS 5.5–9.0: 2,50–3,00; giải HSG quốc gia: 2,25–3,00; giải HSG cấp tỉnh/thành phố: 1,00–1,50; học lực giỏi cả 3 năm THPT: 1,00) + công thức giảm điểm cộng khi tổng điểm đạt được từ 25 trở lên: "Điểm cộng = [(30 − Tổng điểm đạt được)/5] × (Mức điểm cộng)". Mục 4.3 "Điểm ưu tiên" dẫn chiếu chính sách ưu tiên khu vực/đối tượng theo quy chế tuyển sinh hiện hành của Bộ GD&ĐT (mục 6: Văn bản hợp nhất số 02/VBHN-BGDĐT ngày 02/4/2025) — KHÔNG tự công bố mức điểm cụ thể — kèm công thức giảm khi tổng điểm đạt được từ 22,5 trở lên: "Điểm ưu tiên = [(30 − Tổng điểm đạt được)/7,5] × (Mức điểm ưu tiên)", cùng cấu trúc công thức quốc gia (Điều 7, Thông tư 08/2022/TT-BGDĐT sửa đổi bởi Thông tư 06/2025/TT-BGDĐT) đã dùng ở CTUET/TUEBA/DNU.',
  },
];
