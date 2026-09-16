import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TnueSource {
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

export const tnueSources: TnueSource[] = [
  {
    id: 'tnue-threshold-2026',
    publisher: 'Dai hoc Thai Nguyen (Thai Nguyen University) - Truong Dai hoc Su pham',
    title: 'Truong Dai hoc Su pham - Dai hoc Thai Nguyen cong bo nguong dam bao chat luong dau vao nam 2026',
    url: 'https://tnu.edu.vn/dao-tao/thong-tin-tuyen-sinh/thong-tin-tuyen-sinh-dh-cd/truong-dai-hoc-su-pham-dai-hoc-thai-nguyen-cong-bo-nguong-dam-bao-chat-luong-dau-vao-nam-2026.html',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'superseded', supersededBy: 'tnue-cutoff-2026' },
    note:
      'Trang chinh thuc he thong Dai hoc Thai Nguyen (tnu.edu.vn) cong bo nguong dam bao chat luong dau vao 2026 cho truong thanh vien TNUE, theo diem thi TN THPT, phan hoa 17,00-22,50/30 theo nhom nganh. To hop mon cu the tung nganh va cong thuc tinh chi tiet (uu tien/cong diem) chua duoc trang nay neu ro. Bị thay thế bởi điểm chuẩn trúng tuyển chính thức theo NGÀNH `tnue-cutoff-2026` — giữ lại làm nguồn lịch sử điểm sàn (trước kỳ thi).',
  },
  {
    id: 'tnue-cutoff-2026',
    publisher: 'Trường Đại học Sư phạm - Đại học Thái Nguyên (Hội đồng tuyển sinh)',
    title: 'Thông báo điểm trúng tuyển đại học chính quy năm 2026',
    url: 'https://tuyensinh.tnue.edu.vn/thong-bao-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026',
    accessedAt: '2026-09-16',
    publishedAt: '2026-08-09',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính chủ tuyensinh.tnue.edu.vn — bảng "BẢNG ĐIỂM CHUẨN NĂM 2026" trình bày dưới dạng HTML text THẬT (đọc trực tiếp được, không cần vision), đầy đủ 22 ngành: STT, tên ngành, mã ngành, "TỔ HỢP GỐC" (1 tổ hợp duy nhất mỗi ngành), điểm trúng tuyển (thang 30). Một số ngành có "Tiêu chí phụ" (vd Sư phạm Hoá học: Điểm cộng=0 & Điểm Hoá>=9,00) áp dụng CHỈ cho thí sinh ở cuối danh sách trúng tuyển (bằng điểm chuẩn) — không mô hình hoá, xem `knowledgeGaps.ts`. Loại 3 ngành dùng tổ hợp năng khiếu (Giáo dục Thể chất T01, Sư phạm Âm nhạc N01, Huấn luyện thể thao T11) — không có SubjectId tương ứng.',
  },
];
