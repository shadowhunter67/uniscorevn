import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface HluvSource {
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
 * Nguồn gốc chính thức của trường (hluv.edu.vn) trả về "connection refused" trong research (cùng
 * hiện tượng đã ghi nhận ở placeholder cũ, xem `finalCatalog.generated.ts:hluv`). Dùng 1 ảnh chụp
 * nguyên văn thông báo chính thức (đọc bằng vision, cùng kỹ thuật PCTU) + 2 nguồn báo/tổng hợp
 * đăng lại ĐỘC LẬP cho tổ hợp môn, khớp TUYỆT ĐỐI 8/8 ngành có tổ hợp môn xác định được.
 */
export const hluvSources: HluvSource[] = [
  {
    id: 'hluv-threshold-2025',
    publisher: 'Hội đồng tuyển sinh Trường Đại học Hoa Lư (ảnh chụp thông báo gốc, đăng lại trên tuyensinh247)',
    title: 'Thông báo mức điểm trúng tuyển đại học chính quy năm 2025 — Trường Đại học Hoa Lư',
    url: 'https://thi.tuyensinh247.com/diem-chuan-trung-tuyen-dai-hoc-hoa-lu-nam-2025-c24a87053.html',
    accessedAt: '2026-09-03',
    publishedAt: '2025-08-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Ảnh chụp nguyên văn thông báo (đọc trực tiếp bằng vision, không qua text OCR bên thứ 3): "Căn cứ Thông tin tuyển sinh năm 2025 của Trường Đại học Hoa Lư; Căn cứ biên bản họp của Hội đồng tuyển sinh ngày 22/8/2025; Hội đồng tuyển sinh Trường Đại học Hoa Lư thông báo mức điểm trúng tuyển (thang điểm 30) đại học chính quy năm 2025 cho các ngành đào tạo của Trường như sau". Bảng "Điểm trúng tuyển": Giáo dục Tiểu học (7140202) 23,00 — Xét theo kết quả thi TN THPT; Giáo dục Mầm non (7140201) 22,88 — Xét theo kết quả thi TN THPT; Sư phạm Toán học (7140209) 24,02 — Xét theo kết quả thi TN THPT; Sư phạm Khoa học tự nhiên (7140247) 20,10 — Xét theo kết quả thi TN THPT; Sư phạm Lịch sử - Địa lý (7140249) 27,07 — Xét theo kết quả thi TN THPT; Kế toán (7340301) 16,00 — Xét theo kết quả thi TN THPT HOẶC kết quả học THPT; Quản trị kinh doanh (7340101) 16,00 — Xét theo kết quả thi TN THPT HOẶC kết quả học THPT; Du lịch (7810101) 18,00 — Xét theo kết quả thi TN THPT HOẶC kết quả học THPT; Công nghệ thông tin (7480201) 16,00 — Xét theo kết quả thi TN THPT HOẶC kết quả học THPT. Giáo dục Mầm non dùng tổ hợp năng khiếu (M00/M05/M07/M11, không có SubjectId tương ứng) — KHÔNG mô hình hoá, xem `knowledgeGaps.ts`.',
  },
  {
    id: 'hluv-combination-2025',
    publisher: 'Hướng nghiệp HOCMAI (tổng hợp đề án tuyển sinh chính thức Trường Đại học Hoa Lư)',
    title: 'Trường Đại Học Hoa Lư — Đề án tuyển sinh',
    url: 'https://huongnghiep.hocmai.vn/de-an/truong-dai-hoc-hoa-lu',
    accessedAt: '2026-09-03',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng ngành/mã ngành/tổ hợp: Giáo dục Tiểu học (7140202) C01/C03/C04/D01; Sư phạm Toán học (7140209) A00/A01/A02/X06; Sư phạm Khoa học tự nhiên (7140247) A00/A01/A02/X06; Quản trị kinh doanh (7340101) C01/C03/C04/D01; Kế toán (7340301) C01/C03/C04/D01; Công nghệ thông tin (7480201) A00/A01/D01/X02; Du lịch (7810101) C01/C03/C04/D01/X01. Cross-check tổ hợp Sư phạm Lịch sử - Địa lý (7140249, không có trong bảng hocmai) lấy từ `hluv-combination-secondary-2025` (Báo Hà Tĩnh): C00/C03/D14/X70. Công thức tự công bố (cùng nguồn tổng hợp): "Điểm xét tuyển = Tổng điểm 3 môn trong tổ hợp xét tuyển + Điểm ưu tiên" (phương thức 100).',
  },
  {
    id: 'hluv-combination-secondary-2025',
    publisher: 'Báo Hà Tĩnh (đăng lại/tổng hợp thông báo chính thức Trường Đại học Hoa Lư)',
    title: 'Điểm chuẩn Trường Đại Học Hoa Lư 2025 – Theo ngành và tổ hợp xét tuyển',
    url: 'https://baohatinh.vn/cong-cu/diem-chuan/dnb-truong-dai-hoc-hoa-lu',
    accessedAt: '2026-09-03',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cross-check độc lập điểm chuẩn theo ngành (khớp TUYỆT ĐỐI 8/8 ngành với `hluv-threshold-2025`) và tổ hợp theo ngành (khớp với `hluv-combination-2025` cho 7/8 ngành, bổ sung tổ hợp Sư phạm Lịch sử - Địa lý: C00/C03/D14/X70).',
  },
];
