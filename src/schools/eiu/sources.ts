import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface EiuSource {
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

/**
 * Nguồn đã xác minh cho Trường Đại học Quốc tế Miền Đông (EIU) 2026 — đọc trực tiếp qua fetch
 * thật, domain chính thức `eiu.edu.vn`.
 */
export const eiuSources: EiuSource[] = [
  {
    id: 'eiu-admission-scheme-2026',
    publisher: 'Trường Đại học Quốc tế Miền Đông (EIU)',
    title: 'Đề án tuyển sinh 2026 của Trường Đại học Quốc tế Miền Đông',
    url: 'https://eiu.edu.vn/tuyen-sinh/tuyen-sinh-2026/de-an-tuyen-sinh/',
    accessedAt: '2026-08-24',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang đề án tuyển sinh chính thức EIU, đọc trực tiếp qua fetch thật. Nội dung: 4 phương thức xét tuyển 2026 — (1) thi TN THPT 2026 (thang 30, điểm thô, ≥15,00, tổ hợp A00/A01/X05/X06/A07/B00/C01-C04/X01/D01/X02/D07/D09/D10/X25/X26); (2) học bạ (điểm trung bình chung 6 học kỳ lớp 10/11/12 của 3 môn tổ hợp, thang 30, ≥18,00 — thí sinh tốt nghiệp từ 2026 phải đồng thời đạt ≥15,00/30 ở kỳ thi TN THPT); (3) ĐGNL ĐHQG-HCM 2026 (thang 1200, điểm thô, ≥600 — cùng điều kiện kết hợp với thí sinh tốt nghiệp 2026 như phương thức học bạ); (4) xét tuyển thẳng/ưu tiên theo Điều 8 Quy chế tuyển sinh (không có ngưỡng điểm, không model). Ngành Điều dưỡng dùng ngưỡng đảm bảo chất lượng đầu vào do Bộ GD&ĐT công bố hàng năm ở CẢ 3 phương thức (không dùng ngưỡng chung EIU) — không model, xem knowledgeGaps. Ngưỡng công bố là điểm SÀN NHẬN HỒ SƠ, không phải điểm chuẩn trúng tuyển cuối — bảng điểm ưu tiên/điểm cộng riêng của EIU chưa tìm được nguồn dạng bảng số.',
  },
];
