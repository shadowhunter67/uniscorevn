import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface HmtuSource {
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

export const hmtuSources: HmtuSource[] = [
  {
    id: 'hmtu-thongtin-tuyensinh-2026',
    publisher: 'Trường Đại học Kỹ thuật Y tế Hải Dương (HMTU) — Bộ Y tế',
    title: 'Thông tin tuyển sinh trình độ Đại học (Chính quy) năm 2026',
    url: 'https://tuyensinh.hmtu.edu.vn/?p=12709',
    accessedAt: '2026-09-11',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF gốc 11 trang, nhúng qua Google Drive trên chính bài "Thông tin tuyển sinh trình độ Đại học (Chính quy) năm 2026" của cổng tuyển sinh chính chủ tuyensinh.hmtu.edu.vn — tải trực tiếp file gốc (không chỉ đọc preview), không có text layer nên đọc bằng vision. Mục II.2.2 "Phương thức 2: Xét tuyển căn cứ vào kết quả điểm thi tốt nghiệp THPT năm 2026" liệt kê tổ hợp dùng chung cho MỌI ngành ("Khối B00: Toán học, Hóa học, Sinh học; Khối A00: Toán học, Hóa học, Vật lí; Khối D07: Toán học, Hóa học, Tiếng Anh; Khối B08/D08: Toán học, Sinh học, Tiếng Anh") và ghi nguyên văn công thức CÓ HỆ SỐ: "Điểm xét tuyển = (2*Điểm A + Điểm B + Điểm C)*3/4 + ƯT + KK", với "Điểm A: Kết quả điểm môn Toán học", "Điểm B: Kết quả điểm môn thứ 2 trong tổ hợp xét tuyển", "Điểm C: Kết quả điểm môn thứ 3 trong tổ hợp xét tuyển", "ƯT: Điểm ưu tiên (nếu có)", "KK: Điểm cộng khuyến khích (nếu có)". Mục II.2 "Nguyên tắc xét tuyển" xác nhận "Điểm xét tuyển được tính theo thang điểm 30 (bao gồm điểm ưu tiên, điểm cộng theo quy định nếu có) ... tổng điểm xét tuyển không vượt quá 30 điểm" và "các thí sinh được xét tuyển bình đẳng căn cứ vào điểm xét tuyển đã được quy đổi tương đương giữa các phương thức xét tuyển, KHÔNG PHỤ THUỘC VÀO TỔ HỢP MÔN XÉT TUYỂN" (không chênh điểm giữa tổ hợp). Mục II.4 liệt kê 5 ngành/mã ngành. QUAN TRỌNG: mục 5.1 "Ngưỡng đảm bảo chất lượng đầu vào" đặt rào HỌC LỰC (giỏi cho Y khoa, khá cho 4 ngành còn lại) CHỈ ở 5.1.1 (dự bị đại học), 5.1.3 (học bạ) và 5.1.4 (ĐGNL/ĐGTD); mục 5.1.2 dành cho thí sinh xét bằng kết quả thi TN THPT KHÔNG có rào học lực, chỉ có ngưỡng điểm số công bố sau — nên nhánh đã mô hình hoá trong module này không bị chặn bởi trường dữ liệu học lực mà `ApplicantProfile` không có.',
  },
  {
    id: 'hmtu-diemtrungtuyen-706-2026',
    publisher: 'Trường Đại học Kỹ thuật Y tế Hải Dương — Hội đồng tuyển sinh năm 2026',
    title: 'Thông báo số 706/TB-ĐHKTYTHD (10/8/2026) — Điểm trúng tuyển đại học chính quy năm 2026',
    url: 'https://tuyensinh.hmtu.edu.vn/?p=14759',
    accessedAt: '2026-09-11',
    publishedAt: '2026-08-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Ảnh scan văn bản gốc có con dấu đỏ, đăng trực tiếp trên cổng tuyển sinh chính chủ (wp-content/uploads/2026/08/Diem-trung-tuyen-dh-nam-2026-1.jpg và -2.jpg), tải ở độ phân giải đầy đủ và đọc bằng vision. Căn cứ Thông tin tuyển sinh năm 2026 của Trường, Thông báo 594/TB-ĐHKTYTHD (10/7/2026) về ngưỡng đảm bảo chất lượng đầu vào và quy tắc quy đổi điểm tương đương, và biên bản họp Hội đồng tuyển sinh ngày 08/8/2026. Bảng 5 dòng (STT / Ngành / Mã ngành / Điểm theo phương thức: THPT, 200, TSA, HSA, V-ACT) — module này chỉ dùng cột THPT: Y khoa 7720101 = 25.00; Điều dưỡng 7720301 = 22.50; Kỹ thuật Xét nghiệm y học 7720601 = 23.00; Kỹ thuật Hình ảnh y học 7720602 = 23.20; Kỹ thuật Phục hồi chức năng 7720603 = 24.00.',
  },
  {
    id: 'hmtu-priority-national-2026',
    publisher: 'Bộ Giáo dục và Đào tạo',
    title: 'Thông tư 06/2026/TT-BGDĐT — Quy chế tuyển sinh các ngành đào tạo trình độ đại học và ngành Giáo dục Mầm non trình độ cao đẳng, Điều 7 (Chính sách ưu tiên trong tuyển sinh)',
    url: 'https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/3/06-bgddt.pdf',
    accessedAt: '2026-09-11',
    publishedAt: '2026-02-15',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông tin tuyển sinh HMTU chỉ ghi thành phần "ƯT: Điểm ưu tiên (nếu có)" và "theo Quy chế tuyển sinh hiện hành của Bộ Giáo dục và Đào tạo", không in bảng mức — dùng Điều 7 Thông tư 06/2026/TT-BGDĐT (KV1 = 0,75; KV2-NT = 0,5; KV2 = 0,25; KV3 = 0; nhóm đối tượng 1 = 2,00; nhóm đối tượng 2 = 1,00; công thức giảm "[(30 − Tổng điểm đạt được)/7,50] × Mức điểm ưu tiên" khi tổng điểm từ 22,50/30 trở lên). Judgment call cùng tiền lệ VUTM/HUPH/ULSA/EPU/HVU.',
  },
];
