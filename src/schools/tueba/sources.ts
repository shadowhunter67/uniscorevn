import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TuebaSource {
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

export const tuebaSources: TuebaSource[] = [
  {
    id: 'tueba-threshold-2026',
    publisher: 'Trường Đại học Kinh tế và Quản trị kinh doanh - Đại học Thái Nguyên (tuyensinh.tueba.edu.vn, tên miền chính chủ)',
    title: 'Thông báo Ngưỡng đảm bảo chất lượng đầu vào và Quy đổi điểm trúng tuyển giữa các Phương thức xét tuyển Đại học Chính quy năm 2026',
    url: 'https://tuyensinh.tueba.edu.vn/bai-viet/Thong-Bao-Nguong-Dam-Bao-Chat-Luong-Dau-Vao-Va-Quy-Doi-Diem-Trung-Tuyen-Giua-Cac-Phuong-Thuc-Xet-Tuyen-Dai-Hoc-Chinh-Quy-Nam-2026-149.html',
    accessedAt: '2026-09-03',
    publishedAt: '2026-07-08',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bảng "Ngưỡng đảm bảo chất lượng đầu vào hệ đại học chính quy năm 2026" — 29 mã ngành, 3 mức điểm sàn (thang 30, phương thức xét kết quả thi TN THPT 2026): 17,0 (Kinh tế đầu tư/Kinh tế phát triển/Quản lý kinh tế, kể cả phân hiệu Hà Giang); 20,0 (Luật kinh tế); 17,5 (23 ngành/chương trình còn lại). Trích nguyên văn: "Ngưỡng điểm nhận hồ sơ xét tuyển bao gồm điểm bài thi/môn thi theo từng tổ hợp xét tuyển theo thang điểm 30 đã bao gồm điểm ưu tiên khu vực và đối tượng (nếu có)" — xác nhận (a) công thức = tổng thô điểm bài thi/môn thi theo tổ hợp (không nêu hệ số) + điểm ưu tiên, và (b) ngưỡng đã CỘNG SẴN điểm ưu tiên. Ngưỡng áp dụng cho phương thức "sử dụng kết quả thi tốt nghiệp THPT năm 2026"; thông báo còn có bảng quy đổi V-SAT/HSA/SPT sang thang THPT (ngoài phạm vi module này). Đây là điểm SÀN/điều kiện nhận hồ sơ — không phải điểm chuẩn trúng tuyển cuối cùng theo ngành (trường công bố riêng, chưa thu thập được ở batch này).',
  },
];
