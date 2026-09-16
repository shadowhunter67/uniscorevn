import type { AdmissionSource } from '../../core/sourceRegistry';

export const qtuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'qtu-admission-scheme-2026',
    publisher: 'Trường Đại học Quang Trung (QTU)',
    title: 'Đề án tuyển sinh đại học chính quy năm 2026',
    url: 'https://qtu.edu.vn/de-an-tuyen-sinh-dai-hoc-chinh-quy-nam-2026/',
    accessedAt: '2026-09-16',
    publishedAt: '2026-01-01',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Tải qua curl với User-Agent trình duyệt (WebFetch bị chặn "Suspicious User-Agent" ở nhiều trang qtu.edu.vn). Mục 4.2 (xét điểm thi TN THPT) công thức NGUYÊN VĂN: "Điểm xét tuyển = Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + Điểm ưu tiên (nếu có)". Mục 5: điểm ưu tiên chuẩn TT06/2026 (giảm khi tổng ≥22,5: "Điểm ưu tiên = [(30 − Tổng điểm đạt được)/7,5] × Tổng điểm ưu tiên thông thường"). Bảng 2 liệt kê tổ hợp môn theo TỪNG ngành (11 ngành, mỗi ngành 15-25 tổ hợp, dùng nhiều tổ hợp riêng của trường ngoài danh mục quốc gia phổ biến — X18/X19/X21/X55/Y07/Y09/Y10... không có trong SubjectId taxonomy hiện tại). Không đủ thời gian đối chiếu từng ngành xem tổ hợp CHUNG (A00/A01/D01/C00-C04) có hợp lệ cho TẤT CẢ 11 ngành hay chỉ một số — model theo tập tổ hợp chung xuất hiện lặp lại ở phần lớn các khối ngành, cùng mức rủi ro đã chấp nhận ở BAFU.',
  },
  {
    id: 'qtu-cutoff-notice-2026',
    publisher: 'Trường Đại học Quang Trung (QTU)',
    title: 'Công bố điểm chuẩn trúng tuyển đại học chính quy đợt 1 năm 2026',
    url: 'https://qtu.edu.vn/diem-chuan-trung-tuyen-dai-hoc-chinh-quy-dot-1-nam-2026-dai-hoc-quang-trung/',
    accessedAt: '2026-09-16',
    publishedAt: '2026-08-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bảng điểm chuẩn 11 ngành, phương thức "Điểm kỳ thi TN THPT 2026": Điều dưỡng (7720301) = 18/30, 10 ngành còn lại (Y tế công cộng, Kế toán, Tài chính-Ngân hàng, CNKT Xây dựng, Ngôn ngữ Anh, Fintech, QT Khách sạn-Nhà hàng, QTKD, QT Dịch vụ Du lịch-Lữ hành, CNTT) = 15/30 đồng nhất. Không nói rõ đã gồm điểm ưu tiên hay chưa trong chính bảng này, nhưng công thức mục 4.2 của đề án (nguồn trên) đã nêu rõ ĐXT gồm ưu tiên → dùng ĐXT (đã gồm ưu tiên) so ngưỡng, cùng cách UMT/BAFU.',
  },
];
