import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface BvuSource {
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

export const bvuSources: BvuSource[] = [
  {
    id: 'bvu-admission-2026',
    publisher: 'Truong Dai hoc Ba Ria - Vung Tau (BVU)',
    title: 'Phuong thuc tuyen sinh - Thong tin tuyen sinh Truong Dai hoc Ba Ria - Vung Tau 2026',
    url: 'https://tuyensinh.bvu.edu.vn/phuong-thuc-tuyen-sinh/',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official BVU admission-portal page (tuyensinh.bvu.edu.vn) fetched live twice (homepage + phuong-thuc-tuyen-sinh page): confirms 5 independent admission methods, and for the hoc ba (transcript) method a computation formula of diem trung binh lop 12 cua 3 mon to hop + diem uu tien, with a general floor of 18,0/30 for most majors/programs, excluding Duoc hoc, Dieu duong, and the Cu nhan tai nang track. Per-exception numbers (Duoc hoc 24,0/30, Dieu duong 19,5/30, Cu nhan tai nang 22,0/30) are marked du kien (provisional) by the source and cross-checked via secondary aggregator coverage of the same page content. NOTE (2026-08-28): tuyensinh.bvu.edu.vn/phuong-thuc-tuyen-sinh/ now returns HTTP 404 (superseded by `bvu-diem-trung-tuyen-2026` below) — kept for historical/audit trail only, do not treat as current for 2026.',
  },
  {
    id: 'bvu-diem-trung-tuyen-2026',
    publisher: 'Trường Đại học Bà Rịa - Vũng Tàu (BVU)',
    title: 'Trường Đại học Bà Rịa - Vũng Tàu công bố điểm trúng tuyển đại học chính quy và xét tuyển bổ sung năm 2026',
    url: 'https://bvu.edu.vn/truong-dai-hoc-ba-ria-vung-tau-cong-bo-diem-trung-tuyen-dai-hoc-chinh-quy-va-xet-tuyen-bo-sung-nam-2026/',
    accessedAt: '2026-08-28',
    publishedAt: '2026-08-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bài đăng chính thức BVU (10/08/2026), đọc trực tiếp qua fetch thật, thay thế nguồn `bvu-admission-2026` (trang cũ nay 404). Xác nhận rõ, cho phương thức xét điểm thi TN THPT: "Điểm 3 môn thi tốt nghiệp theo tổ hợp xét tuyển ... đạt từ 15 điểm, không cộng điểm ưu tiên khu vực, đối tượng" — tức KHÔNG cộng điểm ưu tiên (khác đa số trường khác). Bảng ngưỡng theo nhóm ngành (cả học bạ và thi THPT): Dược học 20/20, Điều dưỡng 18/18, Luật 20/20, các ngành khác 18(học bạ)/15(thi THPT). Không đề cập điểm cộng nào khác. Không xác nhận được liệu ngưỡng học bạ (cột thứ nhất) có áp dụng cùng quy tắc "không cộng ưu tiên" hay không — chỉ áp dụng judgment "không cộng ưu tiên" cho phương thức thi THPT (câu trích dẫn rõ ràng thuộc phương thức này).',
  },
];
