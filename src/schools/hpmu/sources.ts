import type { AdmissionSource } from '../../core/sourceRegistry';

export const hpmuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'hpmu-threshold-2025',
    publisher: 'VietNamNet (tường thuật thông báo chính thức Trường Đại học Y Dược Hải Phòng)',
    title: 'Điểm chuẩn Trường Đại học Y Dược Hải Phòng năm 2025',
    url: 'https://vietnamnet.vn/diem-chuan-truong-dai-hoc-y-duoc-hai-phong-nam-2025-2435066.html',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bài báo tường thuật thông báo điểm chuẩn chính thức của trường (không phải suy luận phóng viên), trích nguyên văn: "Điểm trúng tuyển đã bao gồm điểm ưu tiên khu vực, ưu tiên đối tượng và điểm thưởng" (xác nhận TRỰC TIẾP đã cộng ưu tiên) và "Điểm trúng tuyển là điểm đã quy đổi tương đương giữa 2 phương thức xét kết quả thi tốt nghiệp THPT năm 2025 và xét học bạ THPT" (ngưỡng công bố là 1 số áp dụng chung cho cả 2 phương thức sau quy đổi — batch này chỉ mô hình hoá nhánh thi TN THPT, thang điểm trùng thang công bố nên không cần quy đổi thêm). Bảng điểm chuẩn 7 ngành: Y khoa 25,33; Răng-Hàm-Mặt 24,63; Y học cổ truyền 24,03; Kỹ thuật xét nghiệm y học 23,23; Điều dưỡng 22,22; Dược học 20,00; Y học dự phòng 19,35 (thang 30). Tiêu chí phụ khi bằng điểm: ưu tiên thí sinh có điểm Toán cao hơn, sau đó điểm Hóa.',
  },
  {
    id: 'hpmu-threshold-secondary-2025',
    publisher: 'Báo Công lý (tường thuật thông báo chính thức Trường Đại học Y Dược Hải Phòng)',
    title: 'Đại học Y Dược và Đại học Hải Phòng công bố điểm chuẩn',
    url: 'https://congly.vn/dai-hoc-y-duoc-va-dai-hoc-hai-phong-cong-bo-diem-chuan-489767.html',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cross-check độc lập với `hpmu-threshold-2025` (VietNamNet) — cùng dải điểm 19,35-25,33, cùng câu xác nhận nguyên văn "Điểm trúng tuyển đã bao gồm điểm ưu tiên khu vực, ưu tiên đối tượng, điểm thưởng". Hai báo độc lập khớp số liệu — dùng kỹ thuật cross-check 2 nguồn báo khi không có bản PDF/text gốc đọc được trực tiếp từ trường (bản gốc trên Cổng TTĐT Chính phủ chỉ có ảnh chụp màn hình, SPA render, không trích xuất được bằng text, xem `hpmu-threshold-chinhphu-2025`).',
  },
  {
    id: 'hpmu-threshold-chinhphu-2025',
    publisher: 'Cổng Thông tin điện tử Chính phủ',
    title: 'Điểm chuẩn Trường Đại học Y Dược Hải Phòng 2025',
    url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-truong-dai-hoc-y-duoc-hai-phong-2025-119250823183818928.htm',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-23',
    sourceType: 'government',
    verification: 'incomplete',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Trang xác nhận đã đăng thông báo điểm chuẩn chính thức của trường nhưng bảng số liệu chỉ hiển thị dạng ẢNH (trang render bằng JS/SPA) — không trích xuất được bằng text extraction thông thường. KHÔNG dùng làm nguồn số liệu chính (dùng `hpmu-threshold-2025`/`hpmu-threshold-secondary-2025` — 2 báo độc lập, khớp số liệu) — chỉ liệt kê để tham chiếu, xác nhận thông báo có tồn tại trên kênh chính thức.',
  },
  {
    id: 'hpmu-scheme-2025',
    publisher: 'Tuyensinh247 (đăng lại đề án tuyển sinh Trường Đại học Y Dược Hải Phòng)',
    title: 'Đề án tuyển sinh Trường Đại Học Y Dược Hải Phòng — tổ hợp xét tuyển theo ngành',
    url: 'https://diemthi.tuyensinh247.com/de-an-tuyen-sinh/dai-hoc-y-duoc-hai-phong-YPB.html',
    accessedAt: '2026-09-02',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng mã ngành → tổ hợp: cả 7/7 ngành đại học chính quy hệ thi TN THPT (Y khoa 7720101, Y học dự phòng 7720110, Y học cổ truyền 7720115, Dược học 7720201, Điều dưỡng 7720301, Răng-Hàm-Mặt 7720501, Kỹ thuật xét nghiệm y học 7720601) đều dùng chung 5 tổ hợp: A00, A01, B00, D07, D08 — toàn bộ đã có trong `SubjectId`/`COMMON_SUBJECT_COMBINATIONS` (D08 = Toán/Sinh/Anh, thêm vào `core/subjects.ts` trong batch này).',
  },
];
