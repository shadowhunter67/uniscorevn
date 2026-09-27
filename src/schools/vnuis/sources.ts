import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VnuisSource {
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

export const vnuisSources: VnuisSource[] = [
  {
    id: 'vnuis-cutoff-vnu-2026',
    publisher: 'Đại học Quốc gia Hà Nội',
    title: 'Điểm chuẩn (điểm trúng tuyển) đại học chính quy năm 2026',
    url: 'https://vnu.edu.vn/diem-chuan-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-post40358.html',
    accessedAt: '2026-09-27',
    publishedAt: '2026-08-09',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Mục 10 "Trường Quốc tế" (mã trường QHQ), bảng 14 chương trình, cột "Điểm trúng tuyển 2026": QHQ01 Kinh doanh quốc tế 20,5; QHQ02 Kế toán/Phân tích/Kiểm toán 20; QHQ03 HTTT quản lý 19; QHQ04 Tin học và KTMT 19; QHQ05 Phân tích dữ liệu KD 20; QHQ06 Marketing 19; QHQ07 Quản lý 19; QHQ08 Tự động hóa và Tin học 19; QHQ09 Ngôn ngữ Anh 21,25; QHQ10 CNTT ứng dụng 19; QHQ11 CN tài chính và KD số 19,25; QHQ12 KT hệ thống CN và Logistics 19,5; QHQ13 Kinh doanh số 21; QHQ14 Truyền thông số 21. Ghi chú nguyên văn: "Điểm trúng tuyển theo các phương thức xét tuyển... được quy về thang điểm 30, đã bao gồm điểm cộng, điểm ưu tiên khu vực, đối tượng (nếu có)".',
  },
  {
    id: 'vnuis-notice-2026',
    publisher: 'Trường Quốc tế - Đại học Quốc gia Hà Nội',
    title: 'Thông tin tuyển sinh đại học chính quy năm 2026',
    url: 'https://www.is.vnu.edu.vn/truong-quoc-te-thong-bao-thong-tin-du-kien-tuyen-sinh-dhcq-nam-2026/',
    accessedAt: '2026-09-27',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Mục 3.4 công bố nguyên văn công thức "Điểm xét tuyển = Tổng điểm 03 môn + Điểm cộng (nếu có) + Điểm ưu tiên (nếu có)". Bảng 4 "Tổ hợp xét tuyển vào Trường Quốc tế năm 2026" liệt kê đủ 14 mã xét tuyển (QHQ01-QHQ14) và tổ hợp áp dụng, toàn bộ đã có SubjectId tương ứng trong hệ thống (A00/A01/D01/D07/D08/D09/D10/C01/C02/X02/X26). Lưu ý đặc biệt: QHQ04/QHQ08/QHQ10/QHQ12 yêu cầu điểm Toán >= 6,0/10 nếu dùng tổ hợp D01. Mục 4.2 công bố nguyên văn bảng điểm ưu tiên khu vực/đối tượng đầy đủ (khớp khung quốc gia hiện hành) và công thức giảm dần từ 22,5/30. Điểm cộng thành tích (mục 4.1, tối đa 5% thang điểm xét tuyển) KHÔNG mô hình hoá.',
  },
];
