import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VutmSource {
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

export const vutmSources: VutmSource[] = [
  {
    id: 'vutm-diemchuan-3036-2026',
    publisher: 'Học viện Y Dược học cổ truyền Việt Nam (VUTM, mã trường HYD) — Hội đồng tuyển sinh, Bộ Y tế',
    title: 'Thông báo số 3036/TB-HVYDCT (10/8/2026) — Điểm chuẩn và thời hạn xác nhận nhập học, tuyển sinh đại học chính quy năm 2026',
    url: 'https://vutm.edu.vn/vi/tuyen-sinh-dai-hoc.nd/thong-bao-diem-chuan-va-thoi-han-xac-nhan-nhap-hoc-tuyen-sinh-dai-hoc-chinh-quy-nam-2026.html',
    accessedAt: '2026-09-09',
    publishedAt: '2026-08-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF gốc 2 trang đính kèm bài đăng chính chủ vutm.edu.vn (đường dẫn /FileUpload/Documents/TUYỂN SINH ĐH 2026/...), có con dấu đỏ và chữ ký TM. Hội đồng tuyển sinh — Chủ tịch HĐTS, Giám đốc Nguyễn Quốc Huy; không có text layer nên đọc bằng vision. Văn bản này TỰ CHỨA ĐỦ 3 thành phần cần thiết: (1) bảng "I. Điểm chuẩn" 3 dòng gồm Tên ngành / Mã ngành / TỔ HỢP XÉT TUYỂN / "Điểm chuẩn Phương thức xét kết quả thi tốt nghiệp THPT năm 2026"; (2) công thức nguyên văn ngay dưới bảng: "Điểm xét tuyển của thí sinh là tổng điểm các bài thi/môn thi theo thang điểm 10 đối với từng bài thi/môn thi của tổ hợp xét tuyển cộng với điểm cộng, điểm ưu tiên đối tượng, khu vực theo quy định hiện hành và được làm tròn đến hai chữ số thập phân"; (3) mã ngành chính thức. Bảng điểm chuẩn KHÔNG phân biệt theo tổ hợp — mỗi ngành 1 mức dùng chung cho mọi tổ hợp đã liệt kê.',
  },
  {
    id: 'vutm-priority-national-2026',
    publisher: 'Bộ Giáo dục và Đào tạo',
    title: 'Thông tư 06/2026/TT-BGDĐT — Quy chế tuyển sinh các ngành đào tạo trình độ đại học và ngành Giáo dục Mầm non trình độ cao đẳng, Điều 7 (Chính sách ưu tiên trong tuyển sinh)',
    url: 'https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/3/06-bgddt.pdf',
    accessedAt: '2026-09-09',
    publishedAt: '2026-02-15',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông báo 3036/TB-HVYDCT dẫn chiếu "điểm ưu tiên đối tượng, khu vực theo quy định hiện hành" mà không in lại bảng mức — dùng Điều 7 Thông tư 06/2026/TT-BGDĐT (KV1 = 0,75; KV2-NT = 0,5; KV2 = 0,25; KV3 = 0; nhóm đối tượng 1 = 2,00; nhóm đối tượng 2 = 1,00; công thức giảm "[(30 − Tổng điểm đạt được)/7,50] × Mức điểm ưu tiên" khi tổng điểm từ 22,50/30 trở lên). Judgment call cùng tiền lệ HUPH/ULSA/EPU/HVU/HBU/VTTU.',
  },
];
