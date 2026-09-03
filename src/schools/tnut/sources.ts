import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TnutSource {
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

export const tnutSources: TnutSource[] = [
  {
    id: 'tnut-threshold-2025',
    publisher: 'Trường Đại học Kỹ thuật Công nghiệp - Đại học Thái Nguyên (mã trường DTK, tnut.edu.vn, tên miền chính chủ)',
    title: 'Thông báo số 818/TB-ĐHKTCN ngày 22/8/2025 — Điểm trúng tuyển đại học chính quy năm 2025 (đợt 1)',
    url: 'https://tnut.edu.vn/thong-bao-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2025-dot-1-vao-truong-dai-hoc-ky-thuat-cong-nghiep-dz20043.html',
    accessedAt: '2026-09-03',
    publishedAt: '2025-08-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Văn bản có chữ ký Hiệu trưởng (PGS.TS. Đỗ Trung Hải) + con dấu, căn cứ Quyết định 1996/QĐ-ĐHKTCN (22/8/2025) và Văn bản hợp nhất 02/VBHN-BGDĐT (02/4/2025). Bảng "Điểm trúng tuyển (đã quy đổi)" liệt kê 26 mã xét tuyển (thang 30), dao động 15 (Kỹ thuật môi trường, KTM) đến 24,5 (Kỹ thuật điện tử - viễn thông/Công nghệ điện tử, bán dẫn và vi mạch, CBM). Chú thích cuối bảng: "Điểm trúng tuyển (đã quy đổi tương đương) các ngành trên tính theo thang điểm 30 (bao gồm cả điểm ưu tiên)". Nội dung nhúng qua Google Drive PDF (1 trang, tải trực tiếp từ liên kết trong bài — không kèm danh sách thí sinh trúng tuyển).',
  },
  {
    id: 'tnut-huongdan-2025',
    publisher: 'Trường Đại học Kỹ thuật Công nghiệp - Đại học Thái Nguyên (tnut.edu.vn, tên miền chính chủ)',
    title: 'Hướng dẫn xét tuyển Đại học năm 2025 tại Trường Đại học Kỹ thuật Công nghiệp, Đại học Thái Nguyên',
    url: 'https://www.tnut.edu.vn/huong-dan-xet-tuyen-dai-hoc-nam-2025-tai-truong-dai-hoc-ky-thuat-cong-nghiep-dai-hoc-thai-nguyen-dz18957.html',
    accessedAt: '2026-09-03',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Mục I.1.2.1 "Theo điểm thi tốt nghiệp THPT năm 2025": "Điểm thi TN THPT 2025 = Điểm môn 1 + Điểm môn 2 + Điểm môn 3"; "Điểm xét tuyển theo điểm thi TN THPT năm 2025 = Điểm thi TN THPT 2025 + điểm ƯT (nếu có)" — điểm ƯT là điểm ưu tiên khu vực/đối tượng tính theo quy chế tuyển sinh hiện hành (không tự công bố mức riêng); "Điểm xét tuyển không vượt quá 30 điểm"; "Điểm trúng tuyển giữa các tổ hợp là tương đương nhau (không có chênh lệch điểm trúng tuyển giữa các tổ hợp)" — lặp lại tương tự ở mục 1.2.2 (học bạ) và 1.2.3 (V-SAT), và mục 1.2.3 nói thêm "Điểm trúng tuyển được quy đổi tương đương giữa các phương thức xét tuyển" — xác nhận ngưỡng theo `tnut-threshold-2025` áp dụng như nhau cho mọi tổ hợp/phương thức của mã xét tuyển đó.',
  },
  {
    id: 'tnut-nganh-chitieu-2025',
    publisher: 'Trường Đại học Kỹ thuật Công nghiệp - Đại học Thái Nguyên (tnut.edu.vn, tên miền chính chủ)',
    title: 'Ngành và chỉ tiêu tuyển sinh năm 2025',
    url: 'https://tnut.edu.vn/nganh-va-chi-tieu-tuyen-sinh-nam-2025-dz18875.html',
    accessedAt: '2026-09-03',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      '"Tất cả các ngành sử dụng 06 tổ hợp xét tuyển: A00; A01; C01; C02; D01; D07." Riêng 4 nhóm ngoại lệ: (1) Ngành Công nghệ điện tử, bán dẫn và vi mạch (mã xét tuyển CBM) dùng A00, A01, C01; (2) Ngành Quản lý công nghiệp, Kinh tế công nghiệp (mã xét tuyển QLC, QLC1, KCN) dùng A00, A01, D01, D07, X05, X25, A10, D84 ("A10, D84 dành cho thí sinh tự do tốt nghiệp trước năm 2025" — module này KHÔNG mô hình hoá 2 tổ hợp A10/D84 cho nhóm thí sinh tự do, xem `knowledgeGaps.ts`); (3) Ngành Kỹ thuật môi trường (mã xét tuyển KTM) dùng A00, B03, C01, C02, D01, D07; (4) Ngành Ngôn ngữ Anh (mã xét tuyển NNA) dùng A01, D01, D07, D10, D14, D15. Bảng "Ngành và chỉ tiêu tuyển sinh năm 2025" liệt kê tên ngành + mã ngành (7 chữ số) + mã xét tuyển tương ứng cho từng chương trình/chuyên ngành — module dùng mã xét tuyển (theo `tnut-threshold-2025`) làm khoá chính vì phân biệt được chuyên ngành mà mã ngành 7 chữ số không phân biệt (vd CTC và KTC1 cùng mã ngành 7520103 nhưng khác chuyên ngành/mã xét tuyển).',
  },
];
