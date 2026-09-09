import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface UnetiSource {
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

export const unetiSources: UnetiSource[] = [
  {
    id: 'uneti-thongtin-tuyensinh-2026',
    publisher: 'Trường Đại học Kinh tế - Kỹ thuật Công nghiệp (UNETI, mã trường DKK) — Bộ Công Thương',
    title: 'Thông tin tuyển sinh năm 2026 (hình thức đào tạo: Chính quy)',
    url: 'https://uneti.edu.vn/wp-content/uploads/2026/04/Thong-tin-tuyen-sinh-2026-final-1-1.doc',
    accessedAt: '2026-09-09',
    publishedAt: '2026-04-21',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'File Word gốc (20 trang) đăng trực tiếp trên uneti.edu.vn/thong-tin-tuyen-sinh-nam-2026/, tải và trích text. Mục II.2.2.2 "Xác định điểm xét tuyển" của Phương thức 2 (xét kết quả kỳ thi tốt nghiệp THPT năm 2026) ghi nguyên văn: "ĐXT = (ĐPT2 + KK) + UT", "ĐPT2 = (M1 x 4.5 + M2 x 3.5 + M3 x 2) x 3/10", "M1, M2, M3 là kết quả điểm thi tốt nghiệp THPT năm 2026 của các môn thi trong tổ hợp xét tuyển", "UT: Điểm ưu tiên khu vực và điểm ưu tiên đối tượng theo Quy chế tuyển sinh của Bộ GD&ĐT", kèm ghi chú "(Điểm xét tuyển không vượt mức điểm tối đa của thang điểm xét)". Mục II.2.2.1 nêu điều kiện riêng: "Đối với ngành Ngôn ngữ Anh, điểm môn tiếng Anh trong tổ hợp xét tuyển tối thiểu đạt từ 6,00 điểm trở lên". Mục II.1.c nêu nguồn tuyển: tổng 3 môn theo tổ hợp đạt tối thiểu 15,00/30. Mục II.4 liệt kê mã xét tuyển / ngành / chỉ tiêu và NHÓM tổ hợp xét tuyển (nhóm 1-4) cho từng ngành ở cả 2 cơ sở Hà Nội (hậu tố DKK) và Ninh Bình (hậu tố DKD). Mục 5.3 công bố bảng điểm xét thưởng thành tích (0,25-1,50) và mục 5.2 bảng quy đổi/điểm khuyến khích chứng chỉ ngoại ngữ — cả hai CHƯA wired vào runtime (xem knowledgeGaps.ts).',
  },
  {
    id: 'uneti-thongtin-tuyensinh-capnhat-2026',
    publisher: 'Trường Đại học Kinh tế - Kỹ thuật Công nghiệp (UNETI)',
    title: 'Thông tin tuyển sinh năm 2026 CẬP NHẬT (Hình thức đào tạo: Đại học chính quy)',
    url: 'https://uneti.edu.vn/wp-content/uploads/2026/06/4.-Cap-nhat-thong-tin-tuyen-sinh-2026.docx',
    accessedAt: '2026-09-09',
    publishedAt: '2026-06-01',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bản cập nhật (.docx, đọc trực tiếp từ word/document.xml) đăng trên uneti.edu.vn/thong-tin-tuyen-sinh-2026-cap-nhat/. Mục II "Thông tin mã xét tuyển, ngành, tổ hợp đăng ký xét tuyển và chỉ tiêu tuyển sinh" xác nhận lại ánh xạ MÃ XÉT TUYỂN -> NHÓM TỔ HỢP cho đủ 27 mã cơ sở Hà Nội và 22 mã cơ sở Ninh Bình (chỉ chỉ tiêu thay đổi so với bản tháng 4; nhóm tổ hợp không đổi). Mục I.1.2 xác nhận quy tắc chứng chỉ tiếng Anh: với phương thức thi TN THPT "Thí sinh được quy đổi điểm thành môn ngoại ngữ trong tổ hợp đăng ký xét tuyển nếu điểm quy đổi cao hơn" (CHƯA wired, xem knowledgeGaps.ts).',
  },
  {
    id: 'uneti-tohop-dkxt-2026',
    publisher: 'Trường Đại học Kinh tế - Kỹ thuật Công nghiệp (UNETI) — Cổng đăng ký xét tuyển dkxt.uneti.edu.vn',
    title: 'Tính điểm đăng ký xét tuyển năm 2026 (tham khảo) — công cụ tính điểm chính thức của Nhà trường',
    url: 'https://dkxt.uneti.edu.vn/tinh-diem',
    accessedAt: '2026-09-09',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang tính điểm CHÍNH CHỦ trên tên miền con của trường (dkxt.uneti.edu.vn — cổng đăng ký xét tuyển). Mã nguồn trang tự khai đầy đủ danh mục 4 NHÓM TỔ HỢP kèm THỨ TỰ MÔN (`window.groups`, mỗi phần tử `{m: [Môn 1, Môn 2, Môn 3], c: "<mã tổ hợp>"}`) — dữ liệu KHÔNG có trong bảng Word (bảng nhóm tổ hợp trong file .doc bị mất nội dung ô khi trích text), và thứ tự môn là BẮT BUỘC vì công thức có hệ số theo vị trí (4.5/3.5/2). Trang cũng cài đặt đúng công thức của Thông tin tuyển sinh: `raw = (M1*4.5 + M2*3.5 + M3*2) * 0.3`, điểm ưu tiên KV1=0.75 / KV2-NT=0.5 / KV2=0.25 / KV3=0, đối tượng DT1-DT4 = 2, DT5-DT7 = 1, giảm dần `((30 - preUT)/7.5) * totalUT` khi điểm > 22,5 và trần `Math.min(30, ...)`. LƯU Ý bất nhất: trang này CỘNG THÊM 3,0 điểm cho thí sinh chọn cơ sở Ninh Bình (`if (isNamDinh) raw += 3;`) để so sánh với điểm chuẩn cơ sở Hà Nội, trong khi Thông báo 826/TB-ĐHKTKTCN công bố BẢNG ĐIỂM CHUẨN RIÊNG (thấp hơn) cho cơ sở Ninh Bình — module này KHÔNG áp dụng cộng 3,0 và dùng thẳng điểm chuẩn riêng của từng cơ sở (xem knowledgeGaps.ts:uneti-ninhbinh-calculator-offset-not-applied).',
  },
  {
    id: 'uneti-diemtrungtuyen-826-2026',
    publisher: 'Trường Đại học Kinh tế - Kỹ thuật Công nghiệp (UNETI) — Hội đồng tuyển sinh',
    title: 'Thông báo số 826/TB-ĐHKTKTCN (09/8/2026) — Điểm trúng tuyển đại học hệ chính quy năm 2026',
    url: 'https://tuyensinh.uneti.edu.vn/tb-tt-2026.html',
    accessedAt: '2026-09-09',
    publishedAt: '2026-08-09',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'File Word gốc đính kèm bài đăng chính chủ tuyensinh.uneti.edu.vn (media.uneti.edu.vn/.../1-thong-bao-diem-trung-tuyen-dai-hoc-nam-2026-...doc), tải và trích text. Căn cứ Thông tư 06/2026/TT-BGDĐT, Thông tin tuyển sinh năm 2026 của trường và kết luận cuộc họp Hội đồng tuyển sinh ngày 09/08/2026. Bảng điểm chuẩn 4 cột phương thức (KQ thi TN THPT / Kết quả học bạ / Kết quả ĐGNL / Kết quả ĐGTD) cho 27 mã xét tuyển cơ sở Hà Nội (hậu tố DKK) và 22 mã xét tuyển cơ sở Ninh Bình (hậu tố DKD). Ghi chú của thông báo: "Điểm chuẩn của phương thức kết quả thi tốt nghiệp THPT và phương thức kết quả học bạ được xác định theo thang điểm 30, điểm chuẩn của phương thức kết quả thi ĐGNL theo thang điểm 150, điểm chuẩn của phương thức kết quả thi ĐGTD theo thang điểm 100." Module này chỉ dùng cột "KQ thi TN THPT" (20,00-24,50/30 cơ sở Hà Nội; 19,00-21,00/30 cơ sở Ninh Bình).',
  },
  {
    id: 'uneti-priority-national-2026',
    publisher: 'Bộ Giáo dục và Đào tạo',
    title: 'Thông tư 06/2026/TT-BGDĐT — Quy chế tuyển sinh các ngành đào tạo trình độ đại học và ngành Giáo dục Mầm non trình độ cao đẳng, Điều 7 (Chính sách ưu tiên trong tuyển sinh)',
    url: 'https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/3/06-bgddt.pdf',
    accessedAt: '2026-09-09',
    publishedAt: '2026-02-15',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Khung điểm ưu tiên quốc gia được Thông tin tuyển sinh 2026 của UNETI dẫn chiếu ("theo Quy chế tuyển sinh của Bộ GD&ĐT"). KHÔNG phải judgment call thuần: công cụ tính điểm chính chủ dkxt.uneti.edu.vn cài đặt TRỰC TIẾP đúng các mức này (KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm đối tượng 1 = 2,0; nhóm đối tượng 2 = 1,0) và đúng công thức giảm dần quanh mốc 22,50/30 — hai nguồn khớp nhau.',
  },
];
