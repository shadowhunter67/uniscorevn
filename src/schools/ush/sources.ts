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
  {
    id: 'ush-quyetdinh-58-2026',
    publisher: 'Trường Đại học Thể dục Thể thao Thành phố Hồ Chí Minh',
    title: 'Quyết định 58/QĐ-TDTTHCM (06/03/2026): Thông tin tuyển sinh năm 2026 (Hình thức đào tạo: Chính quy)',
    url: 'https://ush.edu.vn/thong-bao/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-1500.html',
    accessedAt: '2026-08-28',
    publishedAt: '2026-03-06',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Tải trực tiếp PDF đính kèm (7ush_58_2026_thong-tin-tuyen-sinh-nam-2026-hinh-thuc-dao-tao_chinh-quy.pdf) và đọc toàn văn qua vision (13 trang). Đây là văn bản Đề án/Thông tin tuyển sinh ĐẦY ĐỦ (Thông báo 10/TB-TDTTHCM chỉ là bản tóm tắt ngắn hơn, cùng số liệu). Mục 2.1: ĐXT = ĐVH1 + ĐVH2 + ĐNK + Điểm ưu tiên + Điểm cộng (nếu có). Mục 3.2.b: ngưỡng đầu vào PT1 nhóm Huấn luyện thể thao/Quản lý TDTT/Y sinh học TDTT = tổng thô 2 môn văn hóa + NK ≥ 15,00/30 (KHÔNG cộng ưu tiên), đồng thời NK ≥ 5,00/10. Mục 7.1: "Chế độ ưu tiên theo khu vực và đối tượng: Thực hiện theo Điều 7 Quy chế tuyển sinh trình độ đại học của Trường". Mục 8.b: "Điểm cộng (nếu có): do Trường quy định... được công bố công khai trên trang thông tin điện tử của Trường trước thời điểm xét tuyển" (không có bảng cụ thể trong văn bản này). Mục 9 (trang 9): công thức giảm dần điểm ưu tiên khi tổng điểm ≥22,50, khớp khung Điều 7 Thông tư 06/2026/TT-BGDĐT.',
  },
];
