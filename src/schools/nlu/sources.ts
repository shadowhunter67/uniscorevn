import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface NluSource {
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

export const nluSources: NluSource[] = [
  {
    id: 'nlu-floor-score-2026',
    publisher: 'Báo Tuổi Trẻ (cơ quan báo chí nhà nước)',
    title: 'Trường đại học công lập đầu tiên tại TP.HCM công bố điểm sàn xét tuyển, nhiều ngành từ 16 điểm',
    url: 'https://tuoitre.vn/truong-dai-hoc-cong-lap-dau-tien-tai-tphcm-cong-bo-diem-san-xet-tuyen-nhieu-nganh-tu-16-diem-100260627073516811.htm',
    accessedAt: '2026-08-26',
    publishedAt: '2026-06-27',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trường Đại học Nông Lâm TP.HCM (NLU) công bố ngưỡng đảm bảo chất lượng đầu vào 2026 trên ts.hcmuaf.edu.vn/chinhphu.vn, nhưng bảng theo ngành nằm trong ảnh đính kèm (nguong-dam-bao-chat-luong-2026.jpg), không trích được text. Số liệu đối chiếu trực tiếp qua bài báo Tuổi Trẻ (cơ quan báo chí nhà nước, 27/06/2026), trích nguyên văn: phương thức thi TN THPT dao động 16-18/30 (đa số ngành 16, các ngành cạnh tranh cao — Ngôn ngữ Anh, Công nghệ thông tin, Công nghệ kỹ thuật hóa học, Công nghệ thực phẩm, Thú y — 18/30). Học bạ 18-20/30, ĐGNL ĐHQG-HCM 601-650/1200. Giáo dục mầm non/Sư phạm kỹ thuật nông nghiệp theo quy định riêng của Bộ GD&ĐT, KHÔNG áp dụng băng điểm này.',
  },
];
