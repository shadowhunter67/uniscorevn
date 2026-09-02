import type { AdmissionSource } from '../../core/sourceRegistry';

export const tmuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'tmu-threshold-2025',
    publisher: 'Cổng Thông tin điện tử Chính phủ (dẫn thông báo chính thức Trường Đại học Thương mại)',
    title: 'Điểm sàn Trường đại học Thương mại năm 2025',
    url: 'https://xaydungchinhsach.chinhphu.vn/diem-san-va-bang-quy-doi-tuong-duong-muc-diem-chuan-truong-dai-hoc-thuong-mai-11925072319444325.htm',
    accessedAt: '2026-09-02',
    publishedAt: '2025-07-23',
    sourceType: 'government',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cổng TTĐT Chính phủ đăng lại nguyên văn thông báo chính thức của Trường Đại học Thương mại (không phải tường thuật diễn giải). Nguyên văn: "Ngưỡng đảm bảo chất lượng đầu vào áp dụng đối với tất cả thí sinh đăng ký xét tuyển, tính theo tổng điểm của 3 bài thi/môn thi TN THPT 2025 theo tổ hợp tối ưu nhất tương ứng với ngành đăng ký xét tuyển: phải đạt từ 20 điểm trở lên (thang điểm 30, đã bao gồm điểm ưu tiên đối tượng, ưu tiên khu vực)." và "Không có sự chênh lệch điểm trúng tuyển, điểm xét tuyển giữa các tổ hợp xét tuyển." => NGƯỠNG DUY NHẤT (20/30) áp dụng cho TOÀN BỘ ngành/tổ hợp, ĐÃ GỒM điểm ưu tiên khu vực/đối tượng (khác HDIU/HOU chỉ xác nhận có cộng mà không nêu số cụ thể — TMU không công bố mức điểm ưu tiên cụ thể theo KV/ĐT nên vẫn cần judgment call cho GIÁ TRỊ bảng, chỉ khác ở việc ngưỡng là 1 số DUY NHẤT không phân theo ngành). Thí sinh có chứng chỉ ngoại ngữ/chứng chỉ khảo thí quốc tế được dùng điểm quy đổi để xét ngưỡng (không mô hình hoá batch này).',
  },
  {
    id: 'tmu-admission-methods-2025',
    publisher: 'Cổng Thông tin điện tử Chính phủ (dẫn thông báo chính thức Trường Đại học Thương mại)',
    title: 'Trường Đại học Thương mại tuyển sinh đại học năm 2025',
    url: 'https://xaydungchinhsach.chinhphu.vn/tuyen-sinh-2025-phuong-thuc-chi-tieu-tuyen-sinh-cua-truong-dai-hoc-thuong-mai-119250225173829102.htm',
    accessedAt: '2026-09-02',
    publishedAt: '2025-02-25',
    sourceType: 'government',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Liệt kê "Phương thức 100 — Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2025 theo từng tổ hợp bài thi/môn thi" và danh sách tổ hợp: A00 (Toán, Lý, Hóa), A01 (Toán, Lý, Anh), D01 (Toán, Văn, Anh), D03 (Toán, Văn, Tiếng Pháp), D04 (Toán, Văn, Tiếng Trung), D07 (Toán, Hóa, Anh), D09 (Toán, Sử, Anh), D10 (Toán, Địa, Anh), D84 (Toán, GDKTPL, Anh), và tổ hợp riêng "TMU" (Toán, Tin học/Công nghệ, Anh). Batch này CHỈ mô hình hoá 7/10 tổ hợp có đủ môn trong `SubjectId` (A00, A01, D01, D07, D09, D10, D84) — loại trừ D03 (Tiếng Pháp), D04 (Tiếng Trung), và "TMU" (môn Tin học/Công nghệ nhị nguyên không xác định chắc chắn môn nào áp dụng ngành nào).',
  },
];
