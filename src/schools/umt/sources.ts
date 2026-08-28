import type { AdmissionSource } from '../../core/sourceRegistry';

export const umtSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'umt-threshold-notice-2026',
    publisher: 'Trường Đại học Quản lý và Công nghệ TP.HCM (UMT)',
    title: 'Thông báo số 57/2026/TB-UMT về điểm ngưỡng đảm bảo chất lượng đầu vào và quy tắc quy đổi điểm tương đương tuyển sinh đại học chính quy năm 2026',
    url: 'https://umt.edu.vn/tin-tuc/truong-dai-hoc-umt-cong-bo-muc-diem-nhan-ho-so-xet-tuyen-nam-2026',
    accessedAt: '2026-08-28',
    publishedAt: '2026-07-06',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Tìm được qua chrome-devtools (trang chủ umt.edu.vn liệt kê bài "UMT công bố mức điểm nhận hồ sơ 2026") — trước đó chỉ có nguồn báo chí thứ cấp. Trang tin nhúng PDF chính thức (sdn.umt.edu.vn/TB_57_2026_..., 3 trang scan, OCR 2026-08-28). Mục 1: "Điểm ngưỡng ĐBCLĐV = Điểm quy đổi thang 30 + Điểm cộng (nếu có) + Điểm ưu tiên (nếu có)". Mục 2 bảng: PT01 (thi TN THPT) = 15/30, PT02 (học bạ) = 18/30, PT03 (ĐGNL ĐHQG-HCM) = 15/30 quy đổi, PT04 (V-SAT) = 15/30 quy đổi — ĐỒNG NHẤT cho cả 10 ngành. Mục 3: bảng quy đổi tương đương liên phương thức (công thức y=c+(x−a)/(b−a)×(d−c)) — ngoài phạm vi PT01.',
  },
];
