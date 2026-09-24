import type { AdmissionSource } from '../../core/sourceRegistry';

/**
 * Trường Đại học Kiên Giang (VNKGU, mã trường TKG) — cổng chính thức tuyensinh.vnkgu.edu.vn (HTML
 * fetch được trực tiếp, PDF gốc nhúng qua iframe test2/index.php?file=... — tải file PDF trực tiếp
 * từ URL `storage/app/uploads/files/...`).
 *
 * LƯU Ý: batch trước (research VNKGU, xem docs/school-status.md) đã dừng vì KHÔNG tìm được phát biểu
 * chính chủ về cách cấu thành Điểm xét tuyển (có cộng điểm ưu tiên hay không) và bảng mức điểm ưu
 * tiên đầy đủ, dù đã có đủ điểm chuẩn + tổ hợp + ngưỡng đầu vào. Batch này tìm thấy 2 nguồn bổ sung
 * giải quyết đúng gap đó (`vnkgu-scheme-2026` — Đề án tuyển sinh 2026 chính thức có công thức tường
 * minh; `vnkgu-priority-2026` — trang chính thức có bảng điểm ưu tiên đầy đủ) — không phải re-research
 * trùng lặp, mà là tìm ra nguồn mới bổ khuyết đúng lỗ hổng cũ.
 */
export const vnkguSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'vnkgu-identity-2026',
    publisher: 'Trường Đại học Kiên Giang',
    title: 'Trang chủ chính thức Trường Đại học Kiên Giang',
    url: 'https://www.vnkgu.edu.vn/',
    accessedAt: '2026-09-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note: 'Xác nhận danh tính: trường đại học công lập trực thuộc Bộ Giáo dục và Đào tạo, mã trường tuyển sinh TKG, trụ sở Số 320A Quốc lộ 61, thị trấn Minh Lương, huyện Châu Thành, tỉnh Kiên Giang.',
  },
  {
    id: 'vnkgu-scheme-2026',
    publisher: 'Trường Đại học Kiên Giang (Hội đồng tuyển sinh)',
    title: 'Thông tin tuyển sinh đại học chính quy năm 2026 (Đề án tuyển sinh)',
    url: 'https://tuyensinh.vnkgu.edu.vn/bai-viet/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-de-an-tuyen-sinh',
    accessedAt: '2026-09-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF gốc 43 trang (ảnh scan, đọc bằng vision) — Đề án tuyển sinh chính thức năm 2026. Trang 8 công bố nguyên văn công thức "Phương thức 2: Phương thức tuyển sinh dựa trên kết quả các môn thi tốt nghiệp THPT năm 2026": "Công thức tính điểm xét tuyển: Điểm xét tuyển = [(Điểm thi môn 1 + Điểm thi môn 2 + Điểm thi môn 3) + Điểm cộng (nếu có)] + Điểm ưu tiên (nếu có)" — xác nhận nền tảng tổng thô 3 môn (không hệ số) + điểm cộng (nếu có) + điểm ưu tiên (nếu có), GIẢI QUYẾT đúng gap "cách cấu thành Điểm xét tuyển" mà batch nghiên cứu trước không tìm ra.',
  },
  {
    id: 'vnkgu-combination-2026',
    publisher: 'Trường Đại học Kiên Giang (Hội đồng tuyển sinh)',
    title: 'Chỉ tiêu tuyển sinh theo từng phương thức và tổ hợp môn xét tuyển',
    url: 'https://tuyensinh.vnkgu.edu.vn/bai-viet/chi-tieu-tuyen-sinh-theo-tung-phuong-thuc-va-to-hop-mon-xet-tuyen',
    accessedAt: '2026-09-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang HTML (ngày hiển thị 19/07/2022 nhưng nội dung bảng tổ hợp môn khớp ĐÚNG với PDF Đề án tuyển sinh 2026 chính thức đã đọc song song ở `vnkgu-scheme-2026`, phần "DANH MỤC NGÀNH, CHỈ TIÊU VÀ TỔ HỢP MÔN XÉT TUYỂN" — xác nhận nội dung vẫn hiện hành cho năm 2026, trường chỉ không cập nhật ngày đăng). Liệt kê đủ 28 mã xét tuyển với tổ hợp môn Phương thức 2 (thi TN THPT, mã 100) + bảng chú giải mã tổ hợp đầy đủ (khối A/B/C/D/X, dùng "GDCD" — cùng 3 môn thành phần với "GDKTPL" các trường khác dùng, cùng SubjectId `civic-economic-law`).',
  },
  {
    id: 'vnkgu-cutoff-2026',
    publisher: 'Hội đồng tuyển sinh Trường Đại học Kiên Giang',
    title: 'Thông báo công bố Điểm trúng tuyển Đại học chính quy năm 2026 — Số 04/TB-HĐTS',
    url: 'https://tuyensinh.vnkgu.edu.vn/bai-viet/thong-bao-diem-chuan-trung-tuyen-dai-hoc-chinh-quy-nam-2026',
    accessedAt: '2026-09-22',
    publishedAt: '2026-08-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF gốc 3 trang (căn cứ Thông tư 06/2026/TT-BGDĐT + Quyết định 555/QĐ-ĐHKG + Biên bản họp 05/BB-HĐTS ngày 10/8/2026, có chữ ký Hiệu trưởng TS. Nguyễn Hữu Thọ + con dấu đỏ, đọc bằng vision). Bảng "1. Điểm trúng tuyển (điểm chuẩn)" cột "Kết quả thi tốt nghiệp THPT (thang điểm 30)" theo 28/28 mã xét tuyển: 7140209 Sư phạm Toán học 28,55; 7140202 Giáo dục Tiểu học 26,70; 7140231 Sư phạm Tiếng Anh 26,10; 7140201 Giáo dục Mầm non 21,55; 7380101 Luật 20,00; 7220101 Tiếng Việt và văn hóa Việt Nam 18,00; 7220201 Ngôn ngữ Anh 16,00; 7810101 Du lịch 16,00; 7340301 Kế toán 15,00; 7340101 Quản trị kinh doanh 15,00; 7340201 Tài chính - Ngân hàng 15,00; 7340120 Kinh doanh quốc tế 15,00; 7340122 Thương mại điện tử 15,00; 7420201 Công nghệ sinh học 15,00; 7480201 Công nghệ thông tin 15,00; 7510103 Công nghệ kỹ thuật xây dựng 15,00; 7510205 Công nghệ kỹ thuật ô tô 15,00; 7510406 Công nghệ kỹ thuật môi trường 15,00; 7520216 Kỹ thuật điều khiển và tự động hóa 15,00; 7540101 Công nghệ thực phẩm 15,00; 7620110 Khoa học cây trồng 15,00; 7320104 Truyền thông đa phương tiện 15,00; 7850101 Quản lý tài nguyên và môi trường 15,00; 7620301 Nuôi trồng thủy sản 15,00; 7620105 Chăn nuôi 15,00; 7480107 Trí tuệ nhân tạo 15,00; 7640101 Thú y 15,00; 7810202 Quản trị nhà hàng và Dịch vụ ăn uống 15,00. "Điểm trúng tuyển giữa các tổ hợp xét tuyển... là điểm xét tuyển của thí sinh cuối cùng trong danh sách trúng tuyển và gọi là Điểm chuẩn trúng tuyển của ngành" (định nghĩa nguyên văn từ `vnkgu-tieuchi-2026`) — xác nhận cột này CHÍNH LÀ Điểm xét tuyển (đã gồm điểm ưu tiên theo công thức `vnkgu-scheme-2026`).',
  },
  {
    id: 'vnkgu-priority-2026',
    publisher: 'Trường Đại học Kiên Giang (Hội đồng tuyển sinh)',
    title: 'Điểm cộng và điểm Ưu tiên trong tuyển sinh',
    url: 'https://tuyensinh.vnkgu.edu.vn/bai-viet/diem-cong-va-diem-uu-tien-trong-tuyen-sinh',
    accessedAt: '2026-09-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang HTML mục "5.4. Điểm ưu tiên" công bố ĐẦY ĐỦ bảng số (không phải judgment call/khung quốc gia thay thế): Mức điểm ưu tiên = Mức điểm khu vực tuyển sinh (KVTS) + Mức điểm đối tượng ưu tiên (ĐTƯT). KVTS (thang 30): KV1=0,75; KV2-NT=0,50; KV2=0,25; KV3=0. ĐTƯT (thang 30): nhóm đối tượng 01/02/03=2,00; nhóm 04/05/06=1,00 — khớp đúng khung quốc gia hiện hành (TT 06/2026/TT-BGDĐT). Công thức giảm dần: "Trường hợp 2: Tổng điểm tổ hợp xét tuyển của thí sinh từ 22,50 điểm trở lên thì điểm ưu tiên... = [(30 - Tổng điểm đạt được)/7,50] * Mức điểm ưu tiên quy định" — kèm bảng ví dụ minh hoạ đầy đủ (23,50đ->87%; 24,50đ->73%...30đ->0%) xác nhận đúng công thức.',
  },
  {
    id: 'vnkgu-tieuchi-2026',
    publisher: 'Trường Đại học Kiên Giang (Hội đồng tuyển sinh)',
    title: 'Các thông tin cần thiết để thí sinh đăng ký xét tuyển (nguyên tắc, điều kiện sơ tuyển, các loại điểm cộng, điểm ưu tiên, các tiêu chí xét tuyển...)',
    url: 'https://tuyensinh.vnkgu.edu.vn/bai-viet/cac-thong-tin-can-thiet-de-thi-sinh-dang-ky-xet-tuyen-nguyen-tac-dieu-kien-so-tuyen-cac-loai-diem-cong-diem-uu-tien-cac-tieu-chi-xet-tuyen-va-nguyen-tac-xac-nhan-nhap-hoc-bao-luu-ket-qua',
    accessedAt: '2026-09-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang HTML — mục "5.4.2. Tiêu chí xét tuyển" định nghĩa nguyên văn: "Điểm trúng tuyển giữa các tổ hợp xét tuyển hoặc điểm bài thi trong cùng 1 ngành là bằng nhau và được xác định theo ngành. Đây chính là điểm xét tuyển của thí sinh cuối cùng trong danh sách trúng tuyển và gọi là Điểm chuẩn trúng tuyển của ngành" — xác nhận Điểm chuẩn = Điểm xét tuyển (đã gồm ưu tiên + điểm cộng theo công thức `vnkgu-scheme-2026`), không phải điểm thô riêng lẻ. Mục "5.3. Điểm cộng": "Không nhân hệ số môn thi trong các tổ hợp môn xét tuyển" — xác nhận nền tảng tổng thô.',
  },
];
