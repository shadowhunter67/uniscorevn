import type { AdmissionSource } from '../../core/sourceRegistry';

export const tvuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'tvu-threshold-2025',
    publisher: 'FPTShop (tường thuật thông báo chính thức Trường Đại học Trà Vinh)',
    title: 'Điểm chuẩn Đại học Trà Vinh 2025 chính thức',
    url: 'https://fptshop.com.vn/tin-tuc/danh-gia/diem-chuan-dai-hoc-tra-vinh-2025-185720',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng điểm chuẩn đầy đủ 47 ngành đại học chính quy, phương thức 100 (xét kết quả thi TN THPT 2025), kèm mã ngành. Batch này chỉ dùng 5/47 ngành khối sức khỏe: Kỹ thuật xét nghiệm y học (7720601) 21,50; Y khoa (7720101) 21,25; Răng - Hàm - Mặt (7720501) 20,75; Dược học (7720201) 19,00; Điều dưỡng (7720301) 17,25 (thang 30). Trang tuyensinh247 (cùng trích dẫn nguồn công bố của trường) ghi nguyên văn: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" — xác nhận TRỰC TIẾP đã cộng ưu tiên (câu mẫu áp dụng chung cho các trang điểm chuẩn của tuyensinh247).',
  },
  {
    id: 'tvu-threshold-secondary-2025',
    publisher: 'Sforum / CellphoneS (tường thuật thông báo chính thức Trường Đại học Trà Vinh)',
    title: 'DVT - Điểm chuẩn Trường Y Dược - Đại học Trà Vinh 2025 đầy đủ',
    url: 'https://cellphones.com.vn/sforum/diem-chuan-dai-hoc-y-tra-vinh-2025',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cross-check độc lập với `tvu-threshold-2025` (FPTShop) cho 5/5 ngành khối sức khỏe — khớp số liệu và tổ hợp: Y khoa B00/B08 21,25; Răng-Hàm-Mặt B00/B08 20,75; Dược học A00/B00 19,00; Điều dưỡng B00/B08 17,25; Kỹ thuật xét nghiệm y học A00/B00 21,50. Cũng xác nhận Y khoa/Răng-Hàm-Mặt/Dược học KHÔNG xét học bạ (phương thức 200), chỉ xét điểm thi TN THPT.',
  },
  {
    id: 'tvu-admission-scheme-2026',
    publisher: 'Tuyensinh247 (đăng lại đề án tuyển sinh Trường Đại học Trà Vinh)',
    title: 'Đề án tuyển sinh Đại Học Trà Vinh 2026 và các năm',
    url: 'https://diemthi.tuyensinh247.com/de-an-tuyen-sinh/dai-hoc-tra-vinh-DVT.html',
    accessedAt: '2026-09-02',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bảng mã ngành → tổ hợp xét tuyển: xác nhận 5 ngành khối sức khỏe dùng B00/B08 (Y khoa, Răng-Hàm-Mặt, Điều dưỡng) và A00/B00 (Dược học, Kỹ thuật xét nghiệm y học) — khớp với `tvu-threshold-secondary-2025`. Dữ liệu tổ hợp gắn nhãn 2026 nhưng trường xác nhận "8 phương thức xét tuyển giống với năm 2024" (tổ hợp ổn định qua các năm) — chấp nhận dùng cho batch 2025 theo tiền lệ dữ liệu 2026 hợp lệ khi trường không đổi cơ chế (TLU/HPMU/BAV/Phenikaa).',
  },
  {
    id: 'tvu-official-portal-2025',
    publisher: 'Trường Đại học Trà Vinh',
    title: 'Đại học Trà Vinh công bố điểm chuẩn đại học',
    url: 'https://cce.tvu.edu.vn/dai-hoc-tra-vinh-cong-bo-diem-chuan-dai-hoc/',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'government',
    verification: 'incomplete',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note: 'Trang chính thức của trường xác nhận đã đăng thông báo điểm chuẩn, nhưng chỉ đăng lại 4 ảnh chụp từ VTC News, không có bảng dạng text. KHÔNG dùng làm nguồn số liệu chính, chỉ liệt kê để tham chiếu.',
  },
];
