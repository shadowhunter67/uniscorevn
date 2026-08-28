import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TduSource {
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

export const tduSources: TduSource[] = [
  {
    id: 'tdu-quality-threshold-2026',
    publisher: 'Hội đồng tuyển sinh Trường Đại học Tây Đô (TDU)',
    title: 'Thông báo số 725/TB-ĐHTĐ ngày 08 tháng 7 năm 2026 về việc công bố ngưỡng bảo đảm chất lượng đầu vào các phương thức xét tuyển trình độ đại học chính quy năm 2026',
    url: 'https://tdu.edu.vn/bai-viet/2867/thong-bao-so-725tb-dhtd-ngay-08-thang-7-nam-2026-ve-viec-cong-bo-nguong-dam-bao-chat-luong-dau-vao-cac-phuong-thuc-xet-tuyen-trinh-do-dai-hoc-chinh-quy-nam-2026',
    accessedAt: '2026-08-28',
    publishedAt: '2026-07-08',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF đính kèm (attachment-1783607424.pdf, 3 trang, có text layer) tải trực tiếp từ tdu.edu.vn, đọc 2026-08-28. Bảng đầy đủ 29 mã xét tuyển × 5 phương thức. Phương thức 1 (thi TN THPT 2026, thang 30): Dược học 20, Điều dưỡng 18, Luật/Luật kinh tế/Luật quốc tế 20, 24 ngành còn lại 15. Không có công thức "ĐXT = ... + điểm ưu tiên" tường minh cho PT1 (chỉ nêu ngưỡng theo mã ngành) — áp dụng judgment call theo Điều 7 TT 06/2026, cùng tiền lệ `schools/ctu`. Ghi chú cuối thông báo (điều kiện học lực cho Dược/Điều dưỡng/Luật) CHỈ áp dụng cho thí sinh tốt nghiệp từ 2025 trở về trước dùng PT2-5 thay điểm thi THPT 2026 — KHÔNG áp dụng cho PT1 (thí sinh tốt nghiệp 2026, dùng điểm thi THPT 2026 trực tiếp). Do tính nhạy cảm của các ngành có điều kiện phụ, nhánh exact loại trừ toàn bộ nhóm Dược/Điều dưỡng/Luật (5 mã), chỉ model 24 mã còn lại (ngưỡng phẳng 15/30).',
  },
  {
    id: 'tdu-admission-info-2026',
    publisher: 'Truong Dai hoc Tay Do (Tay Do University)',
    title: 'Truong Dai hoc Tay Do chinh thuc cong bo diem trung tuyen dai hoc nam 2026',
    url: 'https://baocantho.com.vn/truong-dai-hoc-tay-do-chinh-thuc-cong-bo-diem-trung-tuyen-dai-hoc-nam-2026-a212116.html',
    accessedAt: '2026-08-24',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bao Can Tho (bao dang dia phuong nha nuoc) dua tin truc tiep viec TDU "chinh thuc cong bo" diem trung tuyen 2026 qua 5 phuong thuc: thi TN THPT (15-20/30, cao nhat Duoc/Luat/Luat kinh te/Luat quoc te 20,0), hoc ba (16,5-21,8), DGNL DHQG TPHCM (500-600), V-SAT (225-270), hoc ba+phong van (16,5-21,8). Trang truong (tdu.edu.vn) xac nhan 5 phuong thuc va to hop mon qua anh nhung khong lo van ban trich xuat duoc.',
  },
];
