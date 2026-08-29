import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface HustSource {
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

export const hustSources: HustSource[] = [
  {
    id: 'hust-threshold-2026',
    publisher: 'Đại học Bách khoa Hà Nội (HUST)',
    title:
      'Thông cáo báo chí về độ lệch giữa các tổ hợp xét tuyển, bảng quy đổi điểm chuẩn và dự báo mức điểm trúng tuyển vào các ngành của Đại học Bách khoa Hà Nội năm 2026',
    url: 'https://ts.hust.edu.vn/tin-tuc/thong-cao-bao-chi-ve-do-lech-giua-cac-to-hop-xet-tuyen-bang-quy-doi-diem-chuan-va-du-bao-muc-diem-trung-tuyen-vao-cac-nganh-cua-dai-hoc-bach-khoa-ha-noi-nam-2026',
    accessedAt: '2026-08-29',
    publishedAt: '2026-07-03',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính thức ts.hust.edu.vn (đọc trực tiếp qua curl 2026-08-29). Ảnh "Ngưỡng đảm bảo chất lượng" (https://ts.hust.edu.vn/storage/app/public/posts/July2026/b7.jpg, đọc bằng vision) công bố ngưỡng đảm bảo chất lượng đầu vào 2026 theo 2 khối nhóm ngành cho Điểm thi TN THPT (thang 30): Khối nhóm ngành Kỹ thuật >= 20,0 ; Khối nhóm ngành Kinh tế, Giáo dục, Ngoại ngữ >= 19,5. Ngưỡng công bố theo KHỐI NHÓM NGÀNH (2 nhóm), KHÔNG theo từng chương trình/mã ngành cụ thể trong số 68 chương trình đào tạo — bảng ánh xạ chương trình -> khối nhóm ngành chưa tìm được nguồn HUST tự công bố dạng bảng, nên KHÔNG mô hình hoá chọn ngành cụ thể. Trang không đề cập điểm ưu tiên khu vực/đối tượng hay điểm cộng cho phương thức thi TN THPT trong nội dung đọc được.',
  },
];
