import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VaaSource {
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

export const vaaSources: VaaSource[] = [
  {
    id: 'vaa-admission-notice-2026',
    publisher: 'Vietnam Aviation Academy (Học viện Hàng không Việt Nam)',
    title: 'Tuyển sinh Đại học chính quy năm 2026',
    url: 'https://tuyensinh.vaa.edu.vn/vi/tuyen-sinh/dai-hoc/tuyen-sinh-dai-hoc-chinh-quy-nam-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official VAA admissions-portal page (tuyensinh.vaa.edu.vn), fetched directly. Confirms 5 admission methods for 2026 (THPT exam score, THPT transcript, ĐGNL of VNU Hanoi/HCM, international certificates SAT/ACT/IB, direct admission for award winners) and enrollment target of over 6,800 students.',
  },
  {
    id: 'vaa-hocba-notice-2026',
    publisher: 'Vietnam Aviation Academy (Học viện Hàng không Việt Nam)',
    title: 'LÀM SAO ĐỂ XÉT HỌC BẠ VÀO HỌC VIỆN HÀNG KHÔNG VIỆT NAM 2026?',
    url: 'https://tuyensinh.vaa.edu.vn/vi/tin-tuc/lam-sao-de-xet-hoc-ba-vao-hoc-vien-hang-khong-viet-nam-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official VAA news page, fetched directly. States the transcript/ĐGNL gate condition verbatim: "đảm bảo 3 môn thi từ 15 điểm trở lên ĐỂ ĐƯỢC XÉT HỌC BẠ/ĐGNL" (must ensure total of 3 THPT exam subjects reaches at least 15 points to be eligible for transcript/ĐGNL review). Also references transcript-method passing scores ranging 18-27/30 by program, but the per-program table itself was not extracted in this pass.',
  },
  {
    id: 'vaa-cutoff-2026',
    publisher: 'Học viện Hàng không Việt Nam',
    title: 'Chính thức công bố điểm trúng tuyển đại học chính quy VAA 2026',
    url: 'https://vau.edu.vn/chinh-thuc-cong-bo-diem-trung-tuyen-dai-hoc-chinh-quy-vaa-2026/',
    accessedAt: '2026-10-01',
    publishedAt: '2026-08-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính thức của VAA (vaa.edu.vn chuyển hướng sang vau.edu.vn), bảng điểm trúng tuyển là 2 ảnh PNG (3000x1500) đọc bằng vision: 36 mã xét tuyển, cột THPT thang 30 (18-27,5), kèm điểm học bạ/ĐGNL/SAT. Chú thích nguyên văn: "Điểm trúng tuyển theo các PTXT đã có quy đổi tương đương; đã nhân hệ số và quy về thang điểm tối đa của từng PTXT; đã có điểm ưu tiên, điểm cộng, điểm quy đổi từ chứng chỉ ngoại ngữ"; các ngành Ngôn ngữ và học bằng Tiếng Anh (TA01/TA02) có thêm tiêu chí phụ về điều kiện Ngoại ngữ.',
  },
  {
    id: 'vaa-notice-2026',
    publisher: 'Học viện Hàng không Việt Nam',
    title: 'Thông tin tuyển sinh đại học chính quy năm 2026 (Quyết định 1258/QĐ-HVHK ngày 29/05/2026)',
    url: 'https://vau.edu.vn/chi-tiet-sinh-vien/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-chinh-thuc/',
    accessedAt: '2026-10-01',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Tài liệu 19 trang đăng dưới dạng ảnh JPG, đọc bằng vision. Mục 2.2.1: Điểm xét tuyển (PT1, thi TN THPT) = (Điểm môn thứ nhất x 3 + Điểm môn thứ hai x 2 + Điểm môn thứ ba)/2 + Điểm cộng + Điểm ưu tiên, thang 30, làm tròn 2 chữ số. Mục 2.3: bảng điểm cộng theo giải thưởng. Mục 2.4: bảng mức ưu tiên (KV1 0,75; KV2-NT 0,5; KV2 0,25; nhóm ĐT 1 = 2; nhóm ĐT 2 = 1) và công thức giảm từ 22,5. Mục 4.1: nhóm mã THXT TA01 (Ngoại ngữ x3, Văn x2, tự chọn cao nhất x1), TA02 (Ngoại ngữ x3, Toán x2, tự chọn cao nhất x1), DT01 (tự chọn cao nhất x3, Văn x2, tự chọn cao nhì x1), DT02 (tự chọn cao nhất x3, Toán x2, tự chọn cao nhì x1); môn tự chọn lấy trong Toán, Anh, Văn, Sử, Địa, GDKT&PL, Lý, Hóa, Sinh, Tin, Công nghệ (không xét GDCD), không trùng môn đã có; trường không quy định độ lệch giữa các tổ hợp. Mục 4.2: nhóm THXT từng mã xét tuyển.',
  },
];
