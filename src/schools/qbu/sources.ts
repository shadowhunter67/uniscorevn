import type { AdmissionSource } from '../../core/sourceRegistry';

export const qbuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'qbu-threshold-2025',
    publisher: 'Tuyensinh247 (đăng lại thông báo điểm chuẩn chính thức Trường Đại học Quảng Bình)',
    title: 'Điểm chuẩn Trường Đại Học Quảng Bình 2025 chính xác',
    url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-quang-binh-DQB.html',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng điểm chuẩn đầy đủ theo TỪNG NGÀNH x TỪNG TỔ HỢP (không phải 1 mức chung cho cả ngành — mỗi tổ hợp có điểm chuẩn riêng), nhánh xét điểm thi TN THPT 2025. Batch này dùng 14/15 ngành (loại Giáo dục Mầm non — dùng mã tổ hợp năng khiếu M05/M06/M07/M10/M11/M13/M14 chưa xác minh được thành phần môn) và chỉ các tổ hợp trùng với danh mục tổ hợp quốc gia đã có sẵn trong hệ thống (loại các mã tổ hợp riêng X02/X04/X05/X06/X08-X12/X15/X17/X21/X22/X25-X27/X70/X71/X74/X75/X78/X79, C12/C13/C20, D04/D45/D65/D66, A03 — chưa xác minh thành phần môn đủ tin cậy).',
  },
  {
    id: 'qbu-threshold-secondary-2025',
    publisher: 'Taro.edu.vn (tổng hợp điểm chuẩn tuyển sinh)',
    title: 'Điểm chuẩn Trường Đại Học Quảng Bình 2025',
    url: 'https://taro.edu.vn/diem-chuan/dai-hoc-quang-binh-DQB',
    accessedAt: '2026-09-02',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cross-check độc lập với `qbu-threshold-2025` (Tuyensinh247) — khớp số liệu TUYỆT ĐỐI cho toàn bộ 72 cặp ngành x tổ hợp đã mô hình hoá (đối chiếu từng dòng: Giáo dục Tiểu học, Sư phạm Toán học, Sư phạm Ngữ văn, Sư phạm Tiếng Anh, Sư phạm Khoa học tự nhiên, Sư phạm Lịch sử - Địa lí, Ngôn ngữ Anh, Ngôn ngữ Trung Quốc, Quản trị kinh doanh, Kế toán, Công nghệ thông tin, Nông nghiệp, Quản trị dịch vụ du lịch và lữ hành, Quản lý tài nguyên và môi trường).',
  },
  {
    id: 'qbu-threshold-aggregate-2025',
    publisher: 'FPTShop (Sforum/CellphoneS đăng cùng nội dung) — tường thuật thông báo chính thức',
    title: 'Điểm chuẩn Đại học Quảng Bình 2025',
    url: 'https://fptshop.com.vn/tin-tuc/danh-gia/diem-chuan-dai-hoc-quang-binh-2025-186578',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng mức điểm chuẩn THẤP NHẤT theo từng ngành (15 ngành, không tách theo tổ hợp) — khớp tuyệt đối với mức thấp nhất trong bảng chi tiết theo tổ hợp của `qbu-threshold-2025`/`qbu-threshold-secondary-2025` cho toàn bộ 14 ngành đã mô hình hoá (vd Sư phạm Tiếng Anh 19,52 = D09; Giáo dục Tiểu học 23,25 = A01; Ngôn ngữ Anh 15,00 = D09). Trích nguyên văn: "Mức điểm trên áp dụng với thí sinh khu vực 3 và xét 3 môn thi (không nhân hệ số). Điểm này không tính điểm cộng ưu tiên." — xác nhận (a) KHÔNG có ngành nào nhân hệ số trong 15 ngành công bố, (b) điểm chuẩn công bố là mức cho thí sinh KV3 (điểm ưu tiên = 0), tức đã tương đương ĐXT tối thiểu = tổng thô 3 môn + điểm ưu tiên KV/ĐT (nhất quán với mô hình ĐXT chuẩn dùng ở QNU/TVU — không mâu thuẫn, chỉ là cách diễn đạt baseline KV3).',
  },
  {
    id: 'qbu-threshold-aggregate-secondary-2025',
    publisher: 'Sforum / CellphoneS (tường thuật thông báo chính thức Trường Đại học Quảng Bình)',
    title: 'Điểm chuẩn trường Đại Học Quảng Bình 2025',
    url: 'https://cellphones.com.vn/sforum/diem-chuan-truong-dai-hoc-quang-binh-2025',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cross-check độc lập thứ 2 cho mức điểm chuẩn thấp nhất theo ngành — khớp tuyệt đối với `qbu-threshold-aggregate-2025` (FPTShop) cho toàn bộ 15 ngành. Trích nguyên văn: "Điểm chuẩn Đại học Quảng Bình 2025 được tính theo tổ hợp gốc của phương thức xét điểm thi tốt nghiệp THPT và chưa tính điểm cộng" — cùng ý nghĩa baseline KV3 nêu trên.',
  },
  {
    id: 'qbu-threshold-tertiary-2025',
    publisher: 'Navigates.vn (tổng hợp điểm chuẩn tuyển sinh)',
    title: 'Điểm chuẩn Đại học Quảng Bình (QBU) năm 2025',
    url: 'https://navigates.vn/truong-hoc/dai-hoc-quang-binh/diem-chuan/',
    accessedAt: '2026-09-02',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note: 'Cross-check độc lập thứ 3 cho mức điểm chuẩn thấp nhất theo ngành — khớp tuyệt đối với `qbu-threshold-aggregate-2025`/`qbu-threshold-aggregate-secondary-2025` cho toàn bộ 15 ngành.',
  },
];
