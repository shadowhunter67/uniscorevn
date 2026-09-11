import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VmuVinhSource {
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

export const vmuvinhSources: VmuVinhSource[] = [
  {
    id: 'vmuvinh-thongtin-tuyensinh-2026',
    publisher: 'Trường Đại học Y khoa Vinh (VMU-Vinh, mã trường YKV) — UBND tỉnh Nghệ An',
    title: 'Thông tin tuyển sinh đại học năm 2026 (ban hành kèm Quyết định của Hiệu trưởng Trường Đại học Y khoa Vinh)',
    url: 'https://www.vmu.edu.vn/cdn/vmu/Assets/Documents/290.%20thong%20tin%20tuyen%20sinh%202026.pdf',
    accessedAt: '2026-09-11',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF gốc 14 trang đăng trực tiếp trên vmu.edu.vn (bài "Thông tin tuyển sinh đại học năm 2026"); lớp text là OCR hỏng dấu nên đọc bằng vision. Mục IV.4.1.a "Quy định về điểm xét tuyển" ghi nguyên văn: "Điểm xét tuyển đối với phương thức xét kết quả kỳ thi tốt nghiệp THPT năm 2026: là tổng điểm thi tốt nghiệp THPT năm 2026 của các môn theo tổ hợp môn đăng ký xét tuyển cộng với điểm ưu tiên, điểm cộng (nếu có) và được làm tròn đến 2 chữ số thập phân"; "Điểm xét tuyển tối đa là 30 điểm, các môn trong tổ hợp môn xét tuyển có trọng số ngang nhau. Không quy định điểm chênh lệch giữa các tổ hợp môn xét tuyển và giữa các năm tốt nghiệp THPT". Mục III.3.1 "Ngành và chỉ tiêu tuyển sinh" liệt kê 5 chương trình đại học chính quy kèm mã xét tuyển, mã ngành và tổ hợp theo từng phương thức; mục III.3.2 chú giải tổ hợp (A00: Toán, Vật lý, Hóa học; B00: Toán, Hóa học, Sinh học; D07: Toán, Hóa học, Tiếng anh). Mục II.2.2.5 nêu điều kiện nhánh thi TN THPT: điểm các môn thuộc tổ hợp "(đã bao gồm điểm cộng, điểm ưu tiên) đạt ngưỡng đảm bảo chất lượng đầu vào của Bộ GD&ĐT và Bộ Y tế quy định" — rào HỌC LỰC xếp loại giỏi/khá chỉ đặt ở mục II.2.2.6 (xét học bạ), KHÔNG áp cho nhánh thi TN THPT. Mục IV.4.1.b nêu tiêu chí phụ khi bằng điểm (ưu tiên 1: thí sinh có điểm cộng thấp hơn) — không mô hình hoá.',
  },
  {
    id: 'vmuvinh-diemtrungtuyen-809-2026',
    publisher: 'Trường Đại học Y khoa Vinh — Hội đồng tuyển sinh',
    title: 'Thông báo số 809/TB-ĐHYKV (10/8/2026) — Điểm trúng tuyển hệ đại học đợt 1 năm 2026',
    url: 'https://www.vmu.edu.vn/tuyen-sinh-dao-tao/dai-hoc-chinh-quy/tuyen-sinh/diem-trung-tuyen-he-dai-hoc-dot-1-nam-2026-a9913',
    accessedAt: '2026-09-11',
    publishedAt: '2026-08-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF gốc 1 trang có chữ ký Hiệu trưởng Nguyễn Văn Tuấn + con dấu, tải trực tiếp từ vmu.edu.vn/cdn/vmu/Assets/Documents/2026_ĐiemChuanDH.pdf, đọc bằng vision. Bảng mục I gồm Tên ngành / Mã xét tuyển / TỔ HỢP XÉT TUYỂN / Điểm trúng tuyển theo 2 phương thức (xét kết quả thi THPT và xét học bạ THPT) — module này chỉ dùng cột thi THPT: Y khoa 7720101 (A00, B00) = 23,50; Dược học 7720201 (A00, B00, D07) = 20,00; Y học dự phòng 7720110 (A00, B00, D07) = 18,00; Điều dưỡng 7720301 (A00, B00, D07) = 19,00; Kỹ thuật xét nghiệm y học 7720601 (A00, B00, D07) = 23,25. Dòng 6 "Điều dưỡng liên thông" (LT7720301, tổ hợp B00) chỉ có điểm ở cột học bạ ("–" ở cột thi THPT) nên KHÔNG mô hình hoá. Bảng tổ hợp trong thông báo này khớp tuyệt đối với mục III.3.1 của Thông tin tuyển sinh.',
  },
  {
    id: 'vmuvinh-priority-national-2026',
    publisher: 'Bộ Giáo dục và Đào tạo',
    title: 'Thông tư 06/2026/TT-BGDĐT — Quy chế tuyển sinh các ngành đào tạo trình độ đại học và ngành Giáo dục Mầm non trình độ cao đẳng, Điều 7 (Chính sách ưu tiên trong tuyển sinh)',
    url: 'https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/3/06-bgddt.pdf',
    accessedAt: '2026-09-11',
    publishedAt: '2026-02-15',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông tin tuyển sinh VMU-Vinh chỉ nêu thành phần "điểm ưu tiên" và căn cứ Thông tư 06/2026/TT-BGDĐT mà không in bảng mức — dùng Điều 7 (KV1 = 0,75; KV2-NT = 0,5; KV2 = 0,25; KV3 = 0; nhóm đối tượng 1 = 2,00; nhóm đối tượng 2 = 1,00; công thức giảm "[(30 − Tổng điểm đạt được)/7,50] × Mức điểm ưu tiên" khi tổng điểm từ 22,50/30 trở lên). Judgment call cùng tiền lệ NDUN/HMTU/VUTM/HUPH/ULSA/EPU.',
  },
];
