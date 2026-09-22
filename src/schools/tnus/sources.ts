import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TnusSource {
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

export const tnusSources: TnusSource[] = [
  {
    id: 'tnus-cutoff-2026',
    publisher: 'Dai hoc Thai Nguyen (Thai Nguyen University) - Truong Dai hoc Khoa hoc',
    title: 'Truong Dai hoc Khoa hoc - Dai hoc Thai Nguyen cong bo diem chuan trung tuyen dai hoc chinh quy nam 2026',
    url: 'https://tnu.edu.vn/dao-tao/truong-dai-hoc-khoa-hoc-dai-hoc-thai-nguyen-cong-bo-diem-chuan-trung-tuyen-dai-hoc-chinh-quy-nam-2026.html',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'superseded', supersededBy: 'tnus-cutoff-image-2026' },
    note:
      'Trang tin tuc chinh thuc tnu.edu.vn cong bo bang so tay diem chuan 2026, dao dong 16,35-22,50/30, nhung khong co bang day du 40 nganh. Bi thay the boi `tnus-cutoff-image-2026` (anh infographic chinh chu day du) — giu lam nguon lich su.',
  },
  {
    id: 'tnus-methods-2026',
    publisher: 'Trường Đại học Khoa học - Đại học Thái Nguyên',
    title: 'Thông báo 386/TB-ĐHKH ngày 11/3/2026 về các phương thức xét tuyển Đại học chính quy năm 2026',
    url: 'https://tuyensinh.tnus.edu.vn/uploads/docs/2026/03/thong-bao-ve-cac-phuong-thuc-xet-tuyen-dai-hoc-chinh-quy-nam-2026.pdf',
    accessedAt: '2026-09-22',
    publishedAt: '2026-03-11',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF chính chủ tuyensinh.tnus.edu.vn liệt kê 6 phương thức xét tuyển 2026, trong đó mã 100 = "Xét tuyển kết quả thi THPT năm 2026". Không có công thức điểm chi tiết (nằm ở `tnus-threshold-2026`).',
  },
  {
    id: 'tnus-threshold-2026',
    publisher: 'Trường Đại học Khoa học - Đại học Thái Nguyên',
    title:
      'Thông báo Ngưỡng bảo đảm chất lượng đầu vào tuyển sinh đại học chính quy đợt 1 năm 2026 (số 517/TB-ĐHKH, PDF ngưỡng ngày 11/7/2026)',
    url: 'https://tuyensinh.tnus.edu.vn/uploads/docs/2026/07/thong-bao-nguong-bao-dam-chat-luong-dau-vao-tuyen-sinh-dai-hoc-chinh-quy-vao-truong-dai-hoc-khoa-hoc-dai-hoc-thai-nguyen-dot-1-nam-2026.pdf',
    accessedAt: '2026-09-22',
    publishedAt: '2026-07-11',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF chính chủ, bảng ngưỡng điểm xét tuyển 40 mã xét tuyển (thang 30). Ghi chú cuối bảng (trang 3) nêu RÕ công thức: "Ngưỡng điểm xét tuyển theo điểm thi tốt nghiệp THPT năm 2026 là tổng điểm 3 môn thi trong tổ hợp đăng ký xét tuyển cộng với điểm cộng (nếu có) và điểm ưu tiên khu vực, đối tượng (nếu có)... tính theo thang điểm 30", làm tròn 2 chữ số. Kèm 2 điều kiện phụ: (a) Luật/Luật kinh tế — ngưỡng 20,0 VÀ điểm Toán hoặc Ngữ văn (tuỳ tổ hợp) ≥ 6,0; (b) Công nghệ bán dẫn — điểm Toán ≥ 7,5. Ngành Ngôn ngữ Anh định hướng giảng dạy (7220201GV) có thêm điều kiện thay thế theo IELTS/học bạ riêng — KHÔNG mô hình hoá, xem `knowledgeGaps.ts`.',
  },
  {
    id: 'tnus-nganh-2026',
    publisher: 'Trường Đại học Khoa học - Đại học Thái Nguyên',
    title: 'Thông báo 517/TB-ĐHKH ngày 26/3/2026 về các ngành/chương trình đào tạo tuyển sinh Đại học chính quy năm 2026',
    url: 'https://tuyensinh.tnus.edu.vn/uploads/docs/2026/04/thong-bao-ve-cac-nganh-chuong-trinh-dao-tao-tuyen-sinh-dai-hoc-chinh-quy-nam-2026.pdf',
    accessedAt: '2026-09-22',
    publishedAt: '2026-03-26',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note: 'PDF chính chủ danh mục 40 mã ngành/CTĐT (đối chiếu mã ngành ↔ mã tuyển sinh dùng trong thresholds.ts).',
  },
  {
    id: 'tnus-cutoff-image-2026',
    publisher: 'Trường Đại học Khoa học - Đại học Thái Nguyên (đăng lại qua giaoduc.net.vn)',
    title: 'Điểm chuẩn Đại học chính quy năm 2026 — infographic chính chủ TNUS, 40 ngành/chương trình',
    url: 'https://giaoduc.net.vn/truong-dai-hoc-khoa-hoc-dh-thai-nguyen-cong-bo-diem-chuan-2026-post261987.gd',
    accessedAt: '2026-09-22',
    publishedAt: '2026-08-10',
    sourceType: 'official-republication',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Ảnh infographic mang logo/thương hiệu TNUS (đọc bằng chrome-devtools screenshot + vision, ảnh gốc dạng .avif không đọc được text trực tiếp) — nội dung do trường tự phát hành, giaoduc.net.vn chỉ đăng lại nguyên ảnh. Bảng đầy đủ 40 ngành: STT, tên ngành/chương trình, điểm chuẩn (thang 30). Đối chiếu với `tnus-threshold-2026`: nhiều mã khớp đúng ngưỡng sàn (Luật/Luật kinh tế 20,00, Công nghệ bán dẫn 22,50), các mã còn lại có điểm chuẩn thật CAO HƠN ngưỡng sàn — xác nhận đây là điểm TRÚNG TUYỂN thật, không phải ngưỡng nhận hồ sơ.',
  },
];
