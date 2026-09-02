import type { AdmissionSource } from '../../core/sourceRegistry';

export const tluSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'tlu-threshold-2025',
    publisher: 'Cổng Thông tin điện tử Chính phủ (dẫn thông báo chính thức Trường Đại học Thủy lợi)',
    title: 'Điểm chuẩn Trường Đại học Thủy lợi 2025',
    url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-truong-dai-hoc-thuy-loi-2025-119250823164239007.htm',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-25',
    sourceType: 'government',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cổng TTĐT Chính phủ đăng lại nguyên văn bảng điểm chuẩn chính thức của Trường Đại học Thủy lợi (43 ngành đại học chính quy hệ tiêu chuẩn, KHÔNG gồm phân hiệu TLS cơ sở 2), gồm 3 cột PT1 (điểm chuẩn xét điểm thi TN THPT 2025, thang 30), PT2 (xét học bạ kết hợp ưu tiên, thang riêng), PT3 (xét kết quả thi đánh giá tư duy, thang riêng) và cột "Tiêu chí phụ" (giới hạn thứ tự nguyện vọng TTNV ≤ N cho phần lớn ngành; riêng Luật/Luật kinh tế có thêm điều kiện "Ngữ văn ≥ 6 hoặc Toán+Ngữ văn ≥ 12"). Batch này CHỈ mô hình hoá cột PT1 (điểm chuẩn thi TN THPT, ĐÂY LÀ ĐIỂM CHUẨN TRÚNG TUYỂN THỰC TẾ, không phải điểm sàn) — KHÔNG mô hình hoá PT2/PT3 (thang điểm khác, công thức khác) và KHÔNG áp dụng tiêu chí phụ TTNV/điều kiện môn phụ (xem `knowledgeGaps.ts`). Trang không có tuyên bố riêng về việc PT1 đã cộng điểm ưu tiên khu vực/đối tượng hay chưa — áp dụng quy ước chuẩn quốc gia (điểm chuẩn xét điểm thi THPT luôn là điểm xét tuyển đã cộng ưu tiên, xem `priority.ts`).',
  },
  {
    id: 'tlu-scheme-2025',
    publisher: 'Tuyensinh247 (đăng lại đề án tuyển sinh Trường Đại học Thủy lợi)',
    title: 'Đề án tuyển sinh Trường Đại Học Thủy Lợi — tổ hợp xét tuyển theo ngành',
    url: 'https://diemthi.tuyensinh247.com/de-an-tuyen-sinh/dai-hoc-thuy-loi-co-so-1-TLA.html',
    accessedAt: '2026-09-02',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng mã ngành → tổ hợp môn xét tuyển đầy đủ 43 ngành hệ tiêu chuẩn của TLU (dùng để xác định tổ hợp hợp lệ cho từng mã ngành khớp với bảng điểm chuẩn `tlu-threshold-2025`). Batch này CHỈ mô hình hoá tổ hợp có đủ môn trong `SubjectId` hiện có (A00/A01/B00/C00/C01/C02/C03/C04/D01/D07/D09/D10/D14) — loại trừ các tổ hợp riêng của trường (X02/X06/X10/X14/X26/X78/K00, A02, C05, D04/D08/D45/D55/D63, B01/B02/B03) không xác định chắc chắn thành phần môn hoặc dùng ngoại ngữ/môn không có trong danh mục dùng chung. Nguồn thứ cấp (không phải văn bản gốc trường tự đăng) — cross-check với thứ tự/tên ngành trong `tlu-threshold-2025` (khớp theo mã ngành).',
  },
];
