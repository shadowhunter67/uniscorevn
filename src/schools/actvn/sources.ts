import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface ActvnSource {
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

export const actvnSources: ActvnSource[] = [
  {
    id: 'actvn-cutoff-2026',
    publisher: 'Học viện Kỹ thuật Mật mã',
    title: 'Thông báo điểm chuẩn trúng tuyển vào đại học hệ chính quy năm 2026 (Quyết định số 44/QĐ-HĐTS ngày 13/08/2026)',
    url: 'https://tuyensinh.actvn.edu.vn/thong-bao-diem-chuan-trung-tuyen-vao-dai-hoc-he-chinh-quy-nam-2026/',
    accessedAt: '2026-10-01',
    publishedAt: '2026-08-13',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang tuyển sinh chính thức của Học viện, nội dung là 2 ảnh scan (quyết định + phụ lục) đọc bằng vision. Phụ lục: An toàn thông tin (phía Bắc) 7480202KA 25,8; Công nghệ thông tin 7480201KA 24,63; Kỹ thuật Điện tử - Viễn thông 7520207KA 23,96; An toàn thông tin (phía Nam) 7480202KP 24,63. Ghi chú nguyên văn: "Điểm chuẩn trúng tuyển được quy đổi tương đương về điểm thi THPT (thang điểm 30) và bao gồm điểm ưu tiên, điểm cộng (nếu có)"; riêng Kỹ thuật Điện tử - Viễn thông chỉ xét kết quả thi tốt nghiệp THPT 2026.',
  },
  {
    id: 'actvn-notice-2026',
    publisher: 'Học viện Kỹ thuật Mật mã',
    title: 'Thông báo tuyển sinh đại học chính quy năm 2026 (chính thức) và Phương thức tuyển sinh đại học chính quy năm 2026',
    url: 'https://tuyensinh.actvn.edu.vn/thong-bao-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-2/',
    accessedAt: '2026-10-01',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Phương thức xét kết quả thi TN THPT 2026: các môn trong tổ hợp hệ số 1, "không có chênh lệch điểm xét tuyển giữa các tổ hợp"; tổ hợp 7480202KA/7480201KA/7480202KP = A00, A01, X26, X06, C01; 7520207KA = A00, A01, X06, X07. Điểm cộng chứng chỉ tiếng Anh: IELTS 5,5-6,0 (TOEIC 650-749) +0,5; IELTS 6,5-7,0 (TOEIC 750-849) +1; IELTS 7,5+ (TOEIC 850+) +1,5; điểm cộng không vượt 10% điểm tối đa (3 điểm trên thang 30); không cộng TOEFL iBT Home Edition. Học viện không dùng tiêu chí phụ riêng. Trang không in bảng mức điểm ưu tiên riêng.',
  },
];
