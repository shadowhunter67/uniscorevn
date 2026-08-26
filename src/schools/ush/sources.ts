import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface UshSource {
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

export const ushSources: UshSource[] = [
  {
    id: 'ush-admission-notice-2026',
    publisher: 'Trường Đại học Thể dục Thể thao Thành phố Hồ Chí Minh',
    title: 'Thông báo 10/TB-TDTTHCM: Tuyển sinh đại học chính quy năm 2026',
    url: 'https://ush.edu.vn/thong-bao/thong-bao-chinh-thuc-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-1505.html',
    accessedAt: '2026-08-26',
    publishedAt: '2026-03-05',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Tải trực tiếp PDF đính kèm (5ush_10_2026_tb-tuyen-sinh-dai-hoc-chinh-quy-nam-2026.pdf, link download thật tìm được qua trang thông báo — WebFetch không thấy nội dung PDF) và đọc toàn văn. Mục 7.2: ngành Huấn luyện thể thao (7810302)/Quản lý thể dục thể thao (7810301)/Y sinh học thể dục thể thao (7729001), Phương thức 1 (mã 405, thi TN THPT): "Tổng điểm 2 môn văn hóa và điểm thi môn năng khiếu TDTT đạt tối thiểu 15,00 điểm theo thang điểm 30; đồng thời điểm thi môn năng khiếu TDTT đạt từ 5,00 trở lên theo thang điểm 10". Tổ hợp mục 6: T00 (Toán,Sinh,NK), T01 (Toán,Văn,NK), T04 (Toán,Lý,NK), T06 (Toán,Địa,NK). Ngành Giáo dục thể chất (7140206) có ngưỡng riêng "theo quy định Bộ GDĐT" không nêu số cụ thể trong văn bản này — KHÔNG suy đoán, để lại làm knowledge gap. Phương thức 2 (học bạ, mã 406) không mô hình hoá trong lượt này.',
  },
];
