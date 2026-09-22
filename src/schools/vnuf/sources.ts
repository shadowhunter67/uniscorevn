import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VnufSource {
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

export const vnufSources: VnufSource[] = [
  {
    id: 'vnuf-admission-scheme-2026',
    publisher: 'Vietnam National University of Forestry (Truong Dai hoc Lam nghiep)',
    title: 'Official 2026 admission scheme (De an tuyen sinh trinh do dai hoc nam 2026)',
    url: 'https://daotao.vnuf.edu.vn/thong-bao?_101_assetEntryId=211376951&_101_struts_action=%2Fasset_publisher%2Fview_content&_101_type=content&_101_urlTitle=thong-tin-%C4%91e-an-tuyen-sinh-trinh-%C4%91o-%C4%91ai-hoc-nam-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official VNUF training-affairs office page confirms the 2026 undergraduate admission scheme: 5 methods (100 THPT exam, 200 transcript, 301 direct admission, 402 aptitude assessment, 500 other), total quota 2,000, and numeric thresholds for methods 100/200/402.',
  },
  {
    id: 'vnuf-chinhphu-secondary-2026',
    publisher: 'Cong Thong tin dien tu Chinh phu (xaydungchinhsach.chinhphu.vn)',
    title: 'Secondary government-portal coverage of VNUF 2026 admission notice',
    url: 'https://xaydungchinhsach.chinhphu.vn/truong-dai-hoc-lam-nghiep-tuyen-sinh-2026-119260221155518155.htm',
    accessedAt: '2026-08-24',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note: 'Government policy-news portal republishing of the official VNUF 2026 admission notice; used to cross-check the method-100 threshold (>= 15,0/30) and quota figure.',
  },
  {
    id: 'vnuf-threshold-2026',
    publisher: 'Trường Đại học Lâm nghiệp (Hội đồng tuyển sinh đại học 2026)',
    title:
      'Thông báo (Điểm sàn): Nguồn xét tuyển đầu vào, ngưỡng đảm bảo chất lượng đầu vào và quy tắc quy đổi tương đương các phương thức tuyển sinh đại học năm 2026',
    url: 'https://tuyensinh.vnuf.edu.vn/Detail.aspx?id=23',
    accessedAt: '2026-09-22',
    publishedAt: '2026-07-16',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính chủ tuyensinh.vnuf.edu.vn (SPA, đọc bằng chrome-devtools evaluate_script). Mục I nêu rõ công thức nguồn xét tuyển đầu vào áp dụng mọi phương thức: tổng 3 môn thi TN THPT theo tổ hợp ≥ 15,00/30, "không tính điểm ưu tiên, điểm cộng". Mục 2.1 liệt kê bảng ngưỡng theo từng ngành — cột thi TN THPT đồng nhất 15,00 cho toàn bộ ngành có tổ hợp thường (trừ 2 ngành tổ hợp năng khiếu Kiến trúc cảnh quan/Thiết kế nội thất, ngoài phạm vi).',
  },
  {
    id: 'vnuf-cutoff-2026',
    publisher: 'Trường Đại học Lâm nghiệp (Hội đồng tuyển sinh đại học 2026)',
    title: 'Thông báo Điểm trúng tuyển (điểm chuẩn) các ngành tuyển sinh đại học chính quy đợt 1 năm 2026',
    url: 'https://tuyensinh.vnuf.edu.vn/Detail.aspx?id=26',
    accessedAt: '2026-09-22',
    publishedAt: '2026-08-13',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính chủ, bảng điểm trúng tuyển thật (không phải điểm sàn) cho cả 3 cơ sở (Hà Nội 28 ngành, Đồng Nai 15 ngành, Gia Lai 6 ngành). Cột "Điểm thi tốt nghiệp THPT" = 15,00 đồng nhất mọi ngành có tổ hợp thường ở cả 3 cơ sở — xác nhận điểm chuẩn thật trùng ngưỡng sàn (không phân hoá theo ngành).',
  },
];
