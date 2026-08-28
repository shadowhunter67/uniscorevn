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
    publisher: 'Truong Dai hoc Tien Giang (Tien Giang University)',
    title: 'Diem chuan / Nguong dam bao chat luong dau vao Truong Dai hoc Tien Giang nam 2026',
    url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-tien-giang-TTG.html',
    accessedAt: '2026-08-24',
    publishedAt: '2026-08-10',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Tong hop diem chuan cong bo 10/08/2026 cua TGU (2045 chi tieu, 5 phuong thuc). Cong thuc nguong duoc trich dan nhat quan giua nhieu nguon doc lap (bao gom bao dia phuong nha nuoc baodongthap.vn): tong 3 mon thi TN THPT >= 15,0/30 (kem dieu kien mon Toan/Van >= 1/3 diem xet tuyen); rieng nganh Luat >= 18,0/30 (Toan hoac Van >= 6,0). Da doi chieu voi de an tuyen sinh chinh thuc (`tgu-admission-scheme-2026`) — khop nhau.',
  },
];
