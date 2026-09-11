import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface NdunSource {
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

export const ndunSources: NdunSource[] = [
  {
    id: 'ndun-thongtin-tuyensinh-1155-2026',
    publisher: 'Trường Đại học Điều dưỡng Nam Định (NDUN, mã trường YDD) — Bộ Y tế',
    title: 'Thông tin tuyển sinh đại học năm 2026 (ban hành kèm Quyết định số 1155/QĐ-ĐDN ngày 15/5/2026 của Hiệu trưởng)',
    url: 'https://tcvb.ndun.edu.vn/public/docs/ts26/1155tttsdh.pdf',
    accessedAt: '2026-09-11',
    publishedAt: '2026-05-15',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF gốc 15 trang trên hệ thống văn bản chính chủ tcvb.ndun.edu.vn (nhúng qua pdf.js viewer trong bài "Thông báo tuyển sinh Đại học chính quy năm 2026" của ndun.edu.vn — lấy trực tiếp URL file trong thuộc tính `file=` của iframe), không có text layer nên đọc bằng vision. Mục 2 "Mô tả phương thức tuyển sinh" liệt kê 4 phương thức (100 thi TN THPT, 301 tuyển thẳng, 200 học bạ, 402 ĐGNL HSA ĐHQG Hà Nội). Mục 2.2.2 "Xác định điểm xét tuyển" của Phương thức xét kết quả kỳ thi tốt nghiệp THPT năm 2026 ghi nguyên văn: "ĐXT = (ĐPT2 + KK) + UT", "(Điểm xét tuyển không vượt mức điểm tối đa của thang điểm xét)", "ĐPT2 = (M1 + M2 + M3)", "M1, M2, M3 là kết quả điểm thi tốt nghiệp THPT năm 2026 của các môn thi trong tổ hợp xét tuyển", "KK: Điểm xét thưởng đối với thí sinh có thành tích hoặc có năng khiếu đặc biệt và điểm khuyến khích cho các thí sinh có chứng chỉ ngoại ngữ", "UT: Điểm ưu tiên khu vực và điểm ưu tiên đối tượng theo Quy chế tuyển sinh của Bộ GD&ĐT". Mục 1 nêu nguồn tuyển: tổng 3 môn theo tổ hợp (hoặc Toán, Ngữ văn và một môn khác) đạt tối thiểu 16,50 điểm với ngành Điều dưỡng và Hộ sinh, 15,0 điểm với ngành Dinh dưỡng, thang 30.',
  },
  {
    id: 'ndun-nguong-dochenh-2026',
    publisher: 'Trường Đại học Điều dưỡng Nam Định — Hội đồng tuyển sinh năm 2026',
    title: 'Thông báo (09/7/2026) — Ngưỡng đảm bảo chất lượng, độ chênh giữa các tổ hợp xét tuyển theo phương thức xét điểm thi THPT và bảng quy đổi điểm tương đương giữa các phương thức xét tuyển năm 2026',
    url: 'https://tcvb.ndun.edu.vn/public/docs/ts26/nguongdbcl.pdf',
    accessedAt: '2026-09-11',
    publishedAt: '2026-07-09',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF gốc 2 trang trên tcvb.ndun.edu.vn (có text layer, đọc trực tiếp; bản scan chất lượng thấp nên dấu tiếng Việt bị lỗi nhưng số liệu và mã tổ hợp rõ ràng). Căn cứ Hướng dẫn 2304/BGDĐT-GDĐH (04/5/2026), Quyết định 1962/QĐ-BGDĐT (07/7/2026) về ngưỡng khối ngành sức khỏe, Hướng dẫn 4228/BGDĐT-GDĐH (06/7/2026) và Nghị quyết 1710/NQ-HĐTS (09/7/2026). Mục 1 công bố ngưỡng đảm bảo chất lượng (điểm xét tối thiểu, không nhân hệ số, thang 30, không tính điểm cộng) cho phương thức điểm thi TN THPT: Điều dưỡng 18,0; Hộ sinh 18,0; Dinh dưỡng 15,0. MỤC 2 LÀ NGUỒN QUAN TRỌNG NHẤT cho module này — "Độ chênh lệch giữa các tổ hợp xét tuyển trong phương thức xét tuyển kết quả kỳ thi tốt nghiệp THPT năm 2026 (độ chênh của các tổ hợp so với tổ hợp B00 - tổ hợp gốc)": ngành Điều dưỡng và Hộ sinh liệt kê B00, A00, A01, B03, B08, C02, D01, D07 với độ chênh 0 cho TẤT CẢ; ngành Dinh dưỡng liệt kê B00, A00, A01, B03, B04, B08, C02, C20, D01, D07 cũng độ chênh 0 cho TẤT CẢ. Bảng này vừa cho danh mục tổ hợp theo từng ngành, vừa xác nhận KHÔNG có chênh lệch điểm giữa các tổ hợp (nên mỗi ngành chỉ cần 1 mức điểm chuẩn). Mục 3 là bảng quy đổi điểm tương đương giữa các phương thức (không dùng trong module này).',
  },
  {
    id: 'ndun-diemchuan-2058-2026',
    publisher: 'Trường Đại học Điều dưỡng Nam Định — Hội đồng tuyển sinh năm 2026',
    title: 'Thông báo số 2058/TB-ĐDN (10/8/2026) — Điểm chuẩn trúng tuyển đại học chính quy năm 2026 vào trường Đại học Điều dưỡng Nam Định',
    url: 'https://ndun.edu.vn/bai_viet/3859/thong-bao-diem-chuan-trung-tuyen-dai-hoc-chinh-quy-nam-2026.html',
    accessedAt: '2026-09-11',
    publishedAt: '2026-08-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Ảnh scan văn bản gốc có chữ ký Hiệu trưởng kiêm Chủ tịch Hội đồng tuyển sinh (Trương Tuấn Anh) + con dấu, được Cổng thông tin điện tử Chính phủ (xaydungchinhsach.chinhphu.vn) đăng lại nguyên trang ở độ phân giải đầy đủ — tải trực tiếp từ CDN và đọc bằng vision. Căn cứ Thông tư 06/2026/TT-BGDĐT, Quy chế tuyển sinh đại học ban hành kèm Quyết định 1051/QĐ-ĐDN (06/5/2026), Thông tin tuyển sinh đại học năm 2026 ban hành kèm Quyết định 1155/QĐ-ĐDN (15/5/2026) và Nghị quyết 2044/NQ-HĐTS (họp 08/8/2026). Bảng 3 dòng, cột "Phương thức xét tuyển điểm thi TN THPT 2026" dưới tiêu đề chung "Điểm trúng tuyển (HSPT-KV3)": Điều dưỡng 7720301 = 21,10; Hộ sinh 7720302 = 18,30; Dinh dưỡng 7720401 = 16,25. Ghi chú: "Điểm trúng tuyển của các ngành đã bao gồm điểm cộng, điểm ưu tiên (nếu có)" — tức điểm chuẩn được niêm yết theo nhóm quy chiếu HSPT-KV3 và Điểm xét tuyển của thí sinh (đã gồm điểm cộng/ưu tiên của chính thí sinh) được so với mức này.',
  },
  {
    id: 'ndun-priority-national-2026',
    publisher: 'Bộ Giáo dục và Đào tạo',
    title: 'Thông tư 06/2026/TT-BGDĐT — Quy chế tuyển sinh các ngành đào tạo trình độ đại học và ngành Giáo dục Mầm non trình độ cao đẳng, Điều 7 (Chính sách ưu tiên trong tuyển sinh)',
    url: 'https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/3/06-bgddt.pdf',
    accessedAt: '2026-09-11',
    publishedAt: '2026-02-15',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông tin tuyển sinh NDUN định nghĩa "UT: Điểm ưu tiên khu vực và điểm ưu tiên đối tượng theo Quy chế tuyển sinh của Bộ GD&ĐT" mà không in bảng mức — dùng Điều 7 Thông tư 06/2026/TT-BGDĐT (KV1 = 0,75; KV2-NT = 0,5; KV2 = 0,25; KV3 = 0; nhóm đối tượng 1 = 2,00; nhóm đối tượng 2 = 1,00; công thức giảm "[(30 − Tổng điểm đạt được)/7,50] × Mức điểm ưu tiên" khi tổng điểm từ 22,50/30 trở lên). Judgment call cùng tiền lệ HMTU/VUTM/HUPH/ULSA/EPU.',
  },
];
