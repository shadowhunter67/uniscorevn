import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface HtuSource {
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

export const htuSources: HtuSource[] = [
  {
    id: 'htu-threshold-2025',
    publisher: 'Trường Đại học Hà Tĩnh (mã trường HHT, ts.htu.edu.vn, tên miền chính chủ)',
    title: 'Thông báo số 72/TB-HĐTSCQ ngày 22/8/2025 — Điểm trúng tuyển đại học hệ chính quy đợt 1, năm 2025',
    url: 'https://ts.htu.edu.vn/ts-dh/diem-trung-tuyen-dot-1-nam-2025',
    accessedAt: '2026-09-03',
    publishedAt: '2025-08-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Văn bản 2 trang, có chữ ký Hiệu trưởng (Đoàn Hoài Sơn, TM. Hội đồng tuyển sinh - Chủ tịch) + con dấu Trường Đại học Hà Tĩnh, ảnh scan lưu trực tiếp trên ts.htu.edu.vn (không qua bên thứ ba). Bảng liệt kê 18 ngành/chương trình, mỗi ngành có điểm trúng tuyển riêng cho 6 cột phương thức (Thi TN THPT gốc, Học bạ THPT, ĐGNL ĐHQG TPHCM, ĐGNL ĐHQG Hà Nội, ĐGTD ĐHBK Hà Nội, ĐGNL ĐHSP Hà Nội). Cột "Thi TN THPT (gốc)" là điểm trúng tuyển thang 30 dùng cho phương thức 1 (xét kết quả thi TN THPT 2025) — GIÁ TRỊ NÀY module dùng làm ngưỡng exact. Riêng ngành Giáo dục Tiểu học (7140202) có điểm khác nhau theo từng tổ hợp (D01: 25.85; B03/C04/C14/X01: 26.35); 17 ngành còn lại công bố MỘT mức chung áp dụng cho mọi tổ hợp xét tuyển của ngành đó. Ghi chú cuối văn bản: ngành Luật có điều kiện phụ "tổng điểm môn Toán và Văn >= 12 điểm" — diễn đạt này KHÁC với mục 5.c của `htu-dean-2025` ("điểm môn Toán và Văn phải từ 6 điểm trở lên", có thể hiểu là mỗi môn riêng lẻ) nên module KHÔNG mô hình hoá điều kiện phụ này (xem `knowledgeGaps.ts`) — chỉ áp ngưỡng tổng điểm xét tuyển 18/30 đã công bố trong bảng.',
  },
  {
    id: 'htu-dean-2025',
    publisher: 'Trường Đại học Hà Tĩnh (ts.htu.edu.vn, tên miền chính chủ)',
    title: 'Thông tin tuyển sinh năm 2025 (Hình thức đào tạo: Chính quy) — bản update',
    url: 'https://ts.htu.edu.vn/images/Tuyensinh/Thong_tin_tuyen_sinh_2025_chinh_quy-update.pdf',
    accessedAt: '2026-09-03',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Đề án tuyển sinh 2025 dạng PDF (13 trang), công bố trực tiếp trên ts.htu.edu.vn, mã cơ sở đào tạo HHT. Mục 2.1 (Phương thức 1 — Mã 100): "Xét tuyển dựa vào tổ hợp các môn thi tốt nghiệp THPT năm 2025". Mục 4 là bảng 18 mã xét tuyển + chỉ tiêu. Mục 5.d là bảng chi tiết TỔ HỢP XÉT TUYỂN theo từng mã xét tuyển (dùng để dựng `thresholds.ts`). Mục 5.d cũng nêu công thức phương thức 3 (IELTS quy đổi) và đoạn quan trọng cho điểm ưu tiên: "Xét tuyển theo thang điểm 30 và làm tròn đến hai chữ số thập phân"; "Đối với thí sinh có điểm xét tuyển đạt từ 22.5 điểm trở lên, điểm ưu tiên (nếu có) được tính theo công thức: Mức điểm ưu tiên thí sinh được hưởng = [(30 - tổng điểm đạt được của thí sinh)/7,5] x tổng điểm ưu tiên được xác định thông thường" — công thức giảm điểm ưu tiên GIỐNG HỆT văn bản hợp nhất 02/VBHN-BGDĐT (đã dùng ở CTUET/TNUT). Mục 5.a nêu "Điểm cộng được tính theo hướng dẫn của Bộ Giáo dục và Đào tạo" — trường KHÔNG tự công bố bảng điểm cộng riêng (không mô hình hoá, xem `knowledgeGaps.ts`). Mục 5.c (Ngưỡng đảm bảo chất lượng) nêu điều kiện phụ ngành Luật: "tổng điểm xét tuyển tối thiểu phải đạt từ 18 điểm trở lên, điểm môn Toán và Văn phải từ 6 điểm trở lên".',
  },
];
