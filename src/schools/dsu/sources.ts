import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface DsuSource {
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

export const dsuSources: DsuSource[] = [
  {
    id: 'dsu-qd1088-diemchuan-2025',
    publisher: 'Trường Đại học Thể dục thể thao Đà Nẵng (dsu.edu.vn, tên miền chính chủ, Bộ Văn hoá, Thể thao và Du lịch)',
    title: 'Quyết định số 1088/QĐ-TDTTĐN-HĐTS ngày 22/8/2025 — Về việc phê duyệt mức điểm chuẩn trúng tuyển các ngành trình độ đại học hệ chính quy năm 2025',
    url: 'https://dsu.edu.vn/resources/1/VanBan/QD1088%20NGUONG%20DIEM%20CHUAN%20TRUNG%20TUYEN%202025.docx638915696831705549.pdf',
    accessedAt: '2026-09-04',
    publishedAt: '2025-08-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'PDF gốc có chữ ký Hiệu trưởng (PGS.TS Phan Thanh Hài) + con dấu "TRƯỜNG ĐẠI HỌC THỂ DỤC THỂ THAO ĐÀ NẴNG", đăng trực tiếp trên trang tuyển sinh chính chủ dsu.edu.vn (link liệt kê tại https://dsu.edu.vn/chi-tiet/thong-bao-muc-diem-chuan-va-quyet-dinh-cong-nhan-thi-sinh-trung-tuyen-dai-hoc-he-chinh-quy-khoa-19-n-12376). Bảng "Mức điểm chuẩn trúng tuyển các ngành trình độ đại học hệ chính quy năm 2025" (trang 2) liệt kê 3 ngành x 4 phương thức (100/200/405/406, thang điểm 30): Quản lý TDTT (7810301) 21,50 (mã 100) / 22,10 (mã 200) / 21,00 (mã 405) / 21,73 (mã 406); Huấn luyện thể thao (7810302) chỉ có mã 405/406 (22,50 / 23,38) — thực tế trường không xét mã 100/200 cho ngành này (khớp Thông báo 247/TB-TDTTĐN mục 4, phương thức 100/200 "đối với ngành Quản lý Thể dục thể thao - 7810301" mà thôi); Giáo dục thể chất (7140206, có ghi chú (*) theo Nghị định 116/2020/NĐ-CP + 60/2025/NĐ-CP) chỉ có mã 405/406 (27,63 / 28,60), kèm điều kiện học lực khá trở lên. Cột "Điều kiện" của bảng ghi "Điểm NK ≥6.0" và "Điểm môn Toán hoặc điểm môn Văn trong tổ hợp xét tuyển đạt 25% của điểm trúng tuyển" cho hàng Quản lý TDTT/Huấn luyện thể thao — điều kiện "Điểm NK ≥6.0" chỉ áp dụng cho các phương thức có thi năng khiếu (303/405/406, xác nhận chéo qua Thông báo 58/TB-TDTTĐN năm 2026 tách rõ mục 5.1 "Bắt buộc đối với các ngành/chuyên ngành đào tạo (Trừ phương thức 4 – mã 100 và phương thức 5 – mã 200)"); điều kiện sàn môn Toán/Văn 25% CHƯA xác định rõ có áp dụng cho mã 100 hay không — không enforce trong module này (xem `knowledgeGaps.ts`).',
  },
  {
    id: 'dsu-tb247-tuyensinh-2025',
    publisher: 'Trường Đại học Thể dục thể thao Đà Nẵng (dsu.edu.vn, tên miền chính chủ)',
    title: 'Thông báo số 247/TB-TDTTĐN ngày 07/3/2025 — Tuyển sinh đại học chính quy năm 2025',
    url: 'https://dsu.edu.vn/resources/1014/File%20th%C3%B4ng%20b%C3%A1o%20tuy%E1%BB%83n%20sinh/THONG%20BAO%20TUYEN%20SINH%202025%20(ban%20hanh)638772823853145775.pdf',
    accessedAt: '2026-09-04',
    publishedAt: '2025-03-07',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'PDF gốc có chữ ký Hiệu trưởng (Phan Thanh Hài) + con dấu, đăng trực tiếp trên trang chính chủ dsu.edu.vn (thư mục /resources/1014/File thông báo tuyển sinh/). Mục 4 "Phương thức tuyển sinh" liệt kê 6 phương thức (301 tuyển thẳng/ưu tiên; 303 miễn thi năng khiếu cho VĐV huy chương; 405 điểm thi THPT + năng khiếu TDTT; 406 điểm học tập THPT + năng khiếu TDTT; 100 "Xét kết quả điểm thi tốt nghiệp THPT — đối với ngành Quản lý Thể dục thể thao 7810301"; 200 tương tự dùng điểm học tập THPT). Mục 5 "Tổ hợp xét tuyển" xác nhận: ngành Giáo dục thể chất/Huấn luyện thể thao/Quản lý TDTT dùng tổ hợp có NK (T00/T02/T04/T08/T09: Toán + 1 môn văn hoá + NK TDTT) cho phương thức 301/303/405/406; RIÊNG ngành Quản lý TDTT còn có phương thức 100 (tổ hợp B03: Toán–Ngữ văn–Sinh học; C14: Toán–Ngữ văn–GDCD) và phương thức 200 (tổ hợp T10: Toán–Ngữ văn–Giáo dục kinh tế và pháp luật) — hai phương thức này KHÔNG cần điểm thi năng khiếu. Văn bản không nêu rõ công thức tính điểm xét tuyển bằng chữ (khác TVUni); vì phương thức 100 là hình thức xét tuyển thuần theo kết quả kỳ thi tốt nghiệp THPT quốc gia (đăng ký qua hệ thống chung của Bộ GD&ĐT tại thisinh.thithptquocgia.edu.vn) trên thang điểm 30 không kèm hệ số/nhân hệ số nào được công bố, suy ra công thức chuẩn = tổng thô điểm 3 môn tổ hợp (thang 30) + điểm ưu tiên KV/ĐT theo quy chế tuyển sinh của Bộ GD&ĐT (Văn bản hợp nhất 02/VBHN-BGDĐT, dẫn trực tiếp trong "Căn cứ" của Quyết định 1088/QĐ-TDTTĐN-HĐTS) — đây là suy luận có căn cứ (thang điểm 30 + không hệ số công bố), không phải phỏng đoán tuỳ ý, nhưng vẫn ghi nhận là suy luận (không phải câu chữ công thức trực tiếp) trong `knowledgeGaps.ts`.',
  },
  {
    id: 'dsu-quyche-577-2025',
    publisher: 'Trường Đại học Thể dục thể thao Đà Nẵng (dsu.edu.vn, tên miền chính chủ)',
    title: 'Quyết định số 577/QĐ-TDTTĐN ngày 12/5/2025 — Ban hành Quy chế tuyển sinh đại học của Trường Đại học Thể dục thể thao Đà Nẵng (kèm Phụ lục 1/2)',
    url: 'https://dsu.edu.vn/resources/post_tailieu/371d39d5-a4df-4e0a-b430-64421a5662ba.pdf',
    accessedAt: '2026-09-04',
    publishedAt: '2025-05-12',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'PDF gốc (18 trang) có chữ ký Hiệu trưởng (Phan Thanh Hài) + con dấu, đăng trực tiếp trên trang tuyển sinh chính chủ dsu.edu.vn (liệt kê tại https://dsu.edu.vn/tuyensinh/chi-tiet/quy-che-tuyen-sinh-dai-hoc-nam-2025-12297). Điều 7 "Chính sách ưu tiên trong tuyển sinh": khoản 1 ưu tiên khu vực theo Phụ lục 1 (KV1 = 0,75 điểm; KV2-NT = 0,5 điểm; KV2 = 0,25 điểm; KV3 = 0 điểm — thang điểm 10/môn, tổng 30); khoản 2 ưu tiên đối tượng theo Phụ lục 2 (UT1 — đối tượng 01-04 — = 2,0 điểm; UT2 — đối tượng 05-07 — = 1,0 điểm); khoản 3 xác nhận mức điểm ưu tiên tương ứng tổng điểm 3 môn thang 10/môn (không nhân hệ số); khoản 4: "Điểm ưu tiên đối với thí sinh đạt tổng điểm từ 22,5 trở lên (khi quy đổi về điểm theo thang 10 và tổng điểm 3 môn tối đa là 30) được xác định theo công thức: Điểm ưu tiên = [(30 − Tổng điểm đạt được)/7,5] × Mức điểm ưu tiên quy định". Đây là quy chế TỰ BAN HÀNH của trường (căn cứ Văn bản hợp nhất 02/VBHN-BGDĐT), lặp lại nguyên văn khung điểm ưu tiên quốc gia hiện hành nhưng là nguồn CHÍNH CHỦ trực tiếp cho cả bảng lẫn công thức, không phải judgment call. Điều 6 khoản 3.a cũng xác nhận nguyên tắc thiết kế tổ hợp: "phải có môn toán hoặc ngữ văn với trọng số tính điểm xét không dưới 25%" — đây là ĐIỀU KIỆN THIẾT KẾ TỔ HỢP (mức trọng số trong công thức), không phải ngưỡng điểm thô tối thiểu áp cho từng thí sinh; tổ hợp B03/C14 dùng trọng số đều 1/3 mỗi môn (~33,3% > 25%) nên tự động thoả mãn — không cần enforce thêm ở runtime (xem `knowledgeGaps.ts` về điều kiện "Điểm môn Toán/Văn đạt 25% điểm trúng tuyển" ghi trong bảng của `dsu-qd1088-diemchuan-2025`, khả năng cao là cách diễn đạt khác của cùng nguyên tắc này).',
  },
];
