import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TguSource {
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

export const tguSources: TguSource[] = [
  {
    id: 'tgu-admission-scheme-2026',
    publisher: 'Trường Đại học Tiền Giang',
    title: 'Đề án tuyển sinh trình độ đại học, cao đẳng hệ chính quy năm 2026 (bản cập nhật, ký số)',
    url: 'https://tgu.edu.vn/topic/?19966',
    accessedAt: '2026-08-28',
    publishedAt: '2026-06-19',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bài đăng nhúng PDF qua thẻ <object> (tgu.edu.vn/upload/files/trinhky_capnhat_thongtintuyensinh_chinhquy_signed_signed.pdf, 16 trang, có text layer nhưng không lộ qua fetch tĩnh — tìm bằng chrome-devtools quét <object data=...>), tải trực tiếp + đọc 2026-08-28. Mục 3.1.1 (Phương thức 1 — thi TN THPT): "Đối với các ngành khác: ĐXT phải từ 15,00 điểm trở lên ... trong đó điểm môn Toán hoặc Ngữ văn trong tổ hợp xét tuyển phải có điểm từ 1/3 của điểm xét tuyển". Ngành Luật: ĐXT ≥18,00 + điều kiện học lực lớp 12 (Tốt/Giỏi) hoặc điểm xét tốt nghiệp ≥8,5 (không model — điều kiện học lực). Giáo dục Mầm non: điều kiện năng khiếu riêng (không model). Không in công thức "ĐXT = ... + điểm ưu tiên" tường minh cho Phương thức 1 (chỉ có ở Phương thức 2 — học bạ); áp dụng judgment call theo Điều 7 TT 06/2026, cùng tiền lệ `schools/ctu`.',
  },
  {
    id: 'tgu-admission-info-2026',
    publisher: 'Trường Đại học Tiền Giang (Tien Giang University)',
    title: 'Điểm chuẩn / Ngưỡng đảm bảo chất lượng đầu vào Trường Đại học Tiền Giang năm 2026',
    url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-tien-giang-TTG.html',
    accessedAt: '2026-08-24',
    publishedAt: '2026-08-10',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Tổng hop điểm chuẩn công bố 10/08/2026 của TGU (2045 chỉ tiêu, 5 phương thức). Cong thuc ngưỡng được trích dẫn nhat quan giữa nhieu nguồn độc lập (bao gồm bao địa phương nhà nước baodongthap.vn): tổng 3 môn thi TN THPT >= 15,0/30 (kem điều kiện môn Toán/Văn >= 1/3 điểm xét tuyển); riêng ngành Luật >= 18,0/30 (Toán hoặc Văn >= 6,0). Da đối chiếu voi để an tuyen sinh chính thức (`tgu-admission-scheme-2026`) — khớp nhau.',
  },
];
