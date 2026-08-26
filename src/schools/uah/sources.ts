import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface UahSource {
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

export const uahSources: UahSource[] = [
  {
    id: 'uah-official-notice-2026',
    publisher: 'University of Architecture Ho Chi Minh City (Truong Dai hoc Kien truc TP.HCM)',
    title: 'Official 2026 undergraduate admission page (confirms Thong bao 975/TB-HDTS floor-score notice)',
    url: 'https://uah.edu.vn/tuyen-sinh-dai-hoc-chinh-quy-nam-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'incomplete',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official UAH page confirms Thong bao 975/TB-HDTS (posted 08/07/2026, "Ngưỡng đảm bảo chất lượng đầu vào") and a score-equivalence conversion document exist, but their PDF content is not directly readable via fetch. See uah-floor-score-press-2026 for the cross-checked numeric table.',
  },
  {
    id: 'uah-floor-score-press-2026',
    publisher: 'Tuoi Tre Online (state-run news, reporting the official UAH 2026 notice)',
    title: 'Press coverage of UAH 2026 floor-score announcement',
    url: 'https://tuoitre.vn/diem-san-truong-dai-hoc-kien-truc-tphcm-2026-nhieu-nganh-tu-17-diem-100260709165701113.htm',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-09',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note: 'Reports the per-program numeric floor scores (15-21/30) from the official 08/07/2026 UAH notice (975/TB-HDTS).',
  },
  {
    id: 'uah-notice-391-2026',
    publisher: 'Trường Đại học Kiến trúc Thành phố Hồ Chí Minh',
    title: 'Thông báo số 391/TB-HĐTS (27/03/2026) về việc tuyển sinh trình độ đại học hình thức đào tạo chính quy năm 2026',
    url: 'https://uah.edu.vn/thong-bao-so-391tb-hdts-ngay-27032026-ve-viec-tuyen-sinh-trinh-do-dai-hoc-hinh-thuc-dao-tao-chinh-quy-nam-2026',
    accessedAt: '2026-08-26',
    publishedAt: '2026-03-27',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đọc trực tiếp PDF gốc qua trình xem Google Drive (không qua fetch — trang uah.edu.vn dẫn link "Tải file PDF"). Mục 3 (bảng tổ hợp xét tuyển theo ngành, mã 7580210 Kỹ thuật cơ sở hạ tầng = C01/A01/D01/D07), mục 4.2 (công thức Điểm xét tuyển khối A/C/D = tổng thô 3 môn + Điểm cộng + Điểm ưu tiên, không hệ số), mục 6 (Chính sách ưu tiên khu vực: KV1=0,75/KV2-NT=0,50/KV2=0,25/KV3=0), mục 7 (điểm ưu tiên đối tượng UT1=2,00/UT2=1,00 + công thức giảm điểm ưu tiên khi tổng ≥22,50/30).',
  },
  {
    id: 'uah-notice-975-pdf-2026',
    publisher: 'Trường Đại học Kiến trúc Thành phố Hồ Chí Minh',
    title: 'Thông báo số 975/TB-HĐTS (08/07/2026) về ngưỡng đảm bảo chất lượng đầu vào các chương trình đào tạo trong kỳ tuyển sinh trình độ đại học hình thức đào tạo chính quy năm 2026',
    url: 'https://uah.edu.vn/thong-bao-ve-nguong-dam-bao-chat-luong-dau-vao-diem-san-cac-chuong-trinh-dao-tao-trong-ky-tuyen-sinh-trinh-do-dai-hoc-hinh-thuc-dao-tao-chinh-quy-nam-2026',
    accessedAt: '2026-08-26',
    publishedAt: '2026-07-08',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đọc trực tiếp bản PDF gốc (5 trang) qua trình xem Google Drive — bảng "Ngưỡng ĐBCLĐV" theo từng mã ngành, xác nhận trực tiếp: mã 7580210 Kỹ thuật cơ sở hạ tầng (tổ hợp C01/A01/D01/D07) = 16,00/30, khớp đúng số đã cross-check qua Tuổi Trẻ (`uah-floor-score-press-2026`) — nâng verification lên `verified` cho ngành này thay vì chỉ `cross-checked`.',
  },
];
