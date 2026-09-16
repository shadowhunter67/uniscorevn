import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TnuflSource {
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

export const tnuflSources: TnuflSource[] = [
  {
    id: 'tnufl-cutoff-2026',
    publisher: 'Dai hoc Thai Nguyen (Thai Nguyen University) - Truong Ngoai ngu',
    title: 'Truong Ngoai ngu - Dai hoc Thai Nguyen cong bo diem chuan trung tuyen dai hoc nam 2026',
    url: 'https://tnu.edu.vn/dao-tao/truong-ngoai-ngu-dai-hoc-thai-nguyen-cong-bo-diem-chuan-trung-tuyen-dai-hoc-nam-2026.html',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chinh thuc he thong Dai hoc Thai Nguyen (tnu.edu.vn) cong bo diem chuan trung tuyen 2026 cho truong thanh vien TNUFL, dao dong 16,00-26,60/30 theo 5 nganh: Ngôn ngữ Hàn Quốc 16,00; Ngôn ngữ Anh 18,20; Ngôn ngữ Trung Quốc 20,60; Sư phạm Tiếng Anh 25,60; Sư phạm Tiếng Trung Quốc 26,60. Chỉ mô hình hoá 2/5 ngành (Ngôn ngữ Anh, Sư phạm Tiếng Anh) — 3 ngành còn lại dùng điểm ngoại ngữ Trung/Hàn không có SubjectId tương ứng.',
  },
  {
    id: 'tnufl-combinations-2026',
    publisher: 'Dai hoc Thai Nguyen (Thai Nguyen University) - Truong Ngoai ngu',
    title: 'Trường Ngoại ngữ – Đại học Thái Nguyên công bố phương thức xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    url: 'https://tnu.edu.vn/dao-tao/thong-tin-tuyen-sinh/truong-ngoai-ngu-dai-hoc-thai-nguyen-cong-bo-phuong-thuc-xet-tuyen-theo-ket-qua-thi-tot-nghiep-thpt-nam-2026.html',
    accessedAt: '2026-09-16',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Công bố 8 tổ hợp toàn trường cho phương thức thi TN THPT: D01, D04, D14, D65, D15, D45, X78, X90. D04/D65/D45/X90 dùng ngoại ngữ Trung/Hàn ở vị trí môn thứ 3 — không có SubjectId tương ứng. Giữ 4 tổ hợp khớp hệ thống (đều có thành phần Tiếng Anh): D01, D14, D15, X78. Trang KHÔNG xác nhận riêng ngành Ngôn ngữ Anh/Sư phạm Tiếng Anh dùng đúng tập con nào trong 8 tổ hợp — chấp nhận cả 4 tổ hợp khớp hệ thống cho cả 2 ngành, cùng cách xử lý DHV (không giới hạn tổ hợp theo ngành cụ thể khi nguồn không nêu rõ).',
  },
];
