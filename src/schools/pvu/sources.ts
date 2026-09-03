import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface PvuSource {
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

export const pvuSources: PvuSource[] = [
  {
    id: 'pvu-admission-info-2026',
    publisher: 'Trường Đại học Dầu khí Việt Nam (pvu.edu.vn, tên miền chính chủ)',
    title: 'Thông tin Tuyển sinh Đại học Chính quy năm 2026',
    url: 'https://www.pvu.edu.vn/tuyen-sinh/tuyen-sinh-2026/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026',
    accessedAt: '2026-09-03',
    publishedAt: '2026-07-01',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính thức PT1 (mã 100, xét kết quả thi TN THPT 2026): 11 tổ hợp xét tuyển (A00, A01, A02, B00, C01, C02, D07, X06, X07, X10, X11). Điều kiện xét tuyển: "thí sinh có tổng điểm ba môn thi tốt nghiệp THPT tương ứng tổ hợp xét tuyển đạt tối thiểu 15 theo thang điểm 30" — xác nhận công thức Điểm xét tuyển = tổng thô 3 môn (không nêu hệ số/nhân môn chính) + điểm ưu tiên (điểm 15 chỉ là điều kiện nộp hồ sơ, thấp hơn điểm chuẩn trúng tuyển thực tế công bố riêng ở `pvu-threshold-2026`, cùng năm 2026). Không công bố điểm cộng thành tích/chứng chỉ riêng cho PT1.',
  },
  {
    id: 'pvu-threshold-2026',
    publisher: 'Trường Đại học Dầu khí Việt Nam (pvu.edu.vn, tên miền chính chủ)',
    title: 'Thông báo điểm chuẩn trúng tuyển đợt 1 trình độ đại học hệ chính quy và hệ liên kết năm 2026',
    url: 'https://www.pvu.edu.vn/tuyen-sinh/tuyen-sinh-2026/thong-bao-diem-chuan-trung-tuyen-dot-1-trinh-do-dai-hoc-he-chinh-quy-va-he-lien-ket-nam-2026',
    accessedAt: '2026-09-03',
    publishedAt: '2026-08-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông báo điểm chuẩn trúng tuyển đợt 1 năm 2026, Hội đồng tuyển sinh họp 09/08/2026. Phương thức 1 (xét kết quả thi TN THPT 2026): điểm chuẩn hệ chính quy trong nước = 22,50/30, áp dụng CHUNG (một mức duy nhất, không tách theo ngành/tổ hợp) cho cả 3 ngành tuyển sinh 2026 (Kỹ thuật Địa chất, Kỹ thuật Dầu khí, Kỹ thuật Hóa học) và tất cả 11 tổ hợp môn (A00, A01, A02, B00, C01, C02, D07, X06, X07, X10, X11) — trích nguyên văn "đã cộng điểm ưu tiên khu vực và đối tượng". Hệ liên kết quốc tế (19,00/30) KHÔNG mô hình hoá (khác chương trình, học phí, và không thuộc phạm vi "hệ chính quy trong nước" mà module này target).',
  },
];
