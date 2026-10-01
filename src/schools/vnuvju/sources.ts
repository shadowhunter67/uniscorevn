import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VnuvjuSource {
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

export const vnuvjuSources: VnuvjuSource[] = [
  {
    id: 'vnuvju-cutoff-vnu-2026',
    publisher: 'Đại học Quốc gia Hà Nội',
    title: 'Điểm chuẩn (điểm trúng tuyển) đại học chính quy năm 2026',
    url: 'https://vnu.edu.vn/diem-chuan-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-post40358.html',
    accessedAt: '2026-10-01',
    publishedAt: '2026-08-09',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Mục "Trường Đại học Việt Nhật", 9 chương trình (thang 30): Nhật Bản học 21; Khoa học và Kỹ thuật máy tính 20,75; Kỹ thuật cơ điện tử 20,5; Công nghệ thực phẩm và sức khỏe 20; Nông nghiệp thông minh và bền vững 20; Kỹ thuật xây dựng 20; Đổi mới và phát triển toàn cầu 20; Công nghệ kỹ thuật Chip bán dẫn 21,25; Điều khiển thông minh và Tự động hóa 20,25. Phương thức chấp nhận ghi 100, 401, 415, 501 (cơ điện tử chỉ 100, 401, 415); ghi chú nguyên văn: điểm đã bao gồm điểm ưu tiên theo khu vực, đối tượng và khuyến khích (nếu có). Mã ngành in trên bảng này (7480101, 7540101, 7519002...) khác mã trên thông báo của chính VJU — ghép chương trình theo tên.',
  },
  {
    id: 'vnuvju-notice-2026',
    publisher: 'Trường Đại học Việt Nhật - Đại học Quốc gia Hà Nội (VJU)',
    title: 'Thông tin tuyển sinh đại học chính quy năm 2026',
    url: 'https://vju.ac.vn/tuyensinhdaihoc/thong-tin-tuyen-sinh-2026/',
    accessedAt: '2026-10-01',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Tài liệu PDF 37 trang đính kèm trang tuyển sinh (đọc bằng vision cho mục 3.3 và 3.5). Mục 2.2: Phương thức 100 = thi TN THPT 2026, thang 30, điểm xét gồm điểm quy đổi chứng chỉ ngoại ngữ (nếu dùng) + điểm 02 môn còn lại trong tổ hợp. Mục 3.3.2: ưu tiên khu vực/đối tượng theo quy định của Bộ GD&ĐT, thí sinh từ 22,5 điểm trở lên được giảm theo [(30 − tổng điểm)/7,5] × mức ưu tiên. Mục 3.3.3: "không có độ chênh lệch điểm chuẩn giữa các tổ hợp". Mục 3.5: tổ hợp của VJU1..VJU9 (VJU1: C00, D01, D06, D11, D53, D14, D63, D15, D43, X78, X98; VJU2/3/6/9: A00, A01, D28, C01, C02, D01, D06, D07, D23; VJU4: + B00, D08, D33; VJU5: + B00, D08, D33, D10, D18; VJU7: D01, D11, D12, D14, D15, X78; VJU8: A00, A01, D28, A02, C01, C02, D07, D23). Phụ lục II: chương trình chất lượng cao có điều kiện ngoại ngữ đầu vào, riêng Kỹ thuật Xây dựng không áp dụng. Tổ hợp có Tiếng Nhật được mô hình hoá từ 2026-10-01 (SubjectId `japanese`).',
  },
];
