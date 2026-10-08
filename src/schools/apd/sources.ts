import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface ApdSource {
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

export const apdSources: ApdSource[] = [
  {
    id: 'apd-admission-2026',
    publisher: 'Academy of Policy and Development (Học viện Chính sách và Phát triển)',
    title: 'Dự kiến điểm sàn, điểm chuẩn Học viện Chính sách và Phát triển (APD) năm 2026',
    url: 'https://xaydungchinhsach.chinhphu.vn/du-kien-diem-san-diem-chuan-hoc-vien-chinh-sach-va-phat-trien-apd-nam-2026-11926070213145361.htm',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-05',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Government policy-news portal (xaydungchinhsach.chinhphu.vn) republishing APD official 2026 ngưỡng đảm bảo chất lượng đầu vào announcement (05/07/2026): 19,0/30 tai Trụ sở chính Hà Nội, 16,0/30 tai 2 phan hieu moi (Bắc Ninh, Đà Nẵng), áp dụng đồng nhất không phân biệt tổ hợp. Cross-checked against APD own domain (apd.edu.vn) headline article with matching figures (19,0-23,0 điểm chuẩn du kien tai phan hieu, thấp hơn 3,0 điểm số voi tru so chinh), though the apd.edu.vn article body itself could not be fully extracted in this pass.',
  },
  {
    id: 'apd-threshold-notice-180-2026',
    publisher: 'Học viện Chính sách và Phát triển (APD)',
    title: 'Thông báo 180/TB-HVCSPT (02/07/2026): Về ngưỡng đảm bảo chất lượng và phương án quy đổi mức điểm chuẩn tương đương giữa các phương thức tuyển sinh đại học chính quy năm 2026',
    url: 'https://tuyensinh.apd.edu.vn/wp-content/uploads/2026/07/Tb-180-dam-bao-nguong-diem.pdf',
    accessedAt: '2026-08-28',
    publishedAt: '2026-07-02',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF chính thức APD (bản scan, đọc trực tiếp qua vision từng trang). Xác nhận 3 ngưỡng theo cơ sở đào tạo (Trụ sở chính Hà Nội 19,0/30; Phân hiệu Bắc Ninh và Đà Nẵng 16,0/30) và trích nguyên văn: "Mức điểm ngưỡng đảm bảo chất lượng của tất cả các phương thức xét tuyển bao gồm cả điểm cộng, điểm ưu tiên đối tượng, khu vực (nếu có)" — tức điểm ưu tiên CỘNG vào tổng trước khi so ngưỡng. Không công bố bảng mức điểm ưu tiên cụ thể (chỉ dẫn nguyên tắc) và không công bố điểm cộng cụ thể cho 2026.',
  },
];
