import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VnuumpSource {
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

export const vnuumpSources: VnuumpSource[] = [
  {
    id: 'vnuump-admission-notice-2026',
    publisher: 'Trường Đại học Y Dược - Đại học Quốc gia Hà Nội (VNU-UMP)',
    title: 'Thông tin tuyen sinh đại học chính quy năm 2026 (Hinh thuc dao tao: Chinh quy)',
    url: 'https://ump.vnu.edu.vn/article-thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-(hinh-thuc-dao-tao-chinh-quy)-19647-3439.html',
    accessedAt: '2026-08-25',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official 2026 page (fetched directly, text-readable) lists 4 pathways (2% straight admission, 96% THPT exam, HSA-included, 2% ethnic-minority prep), 6 majors with combos (Y khoa/Răng Hàm Mặt/Kỹ thuật xét nghiệm/Kỹ thuật hình ảnh/Điều dưỡng: B00+D08; Dược học: A00+D07), quotas (Y khoa 300, Dược 180, Răng Hàm Mặt 60, Kỹ thuật xét nghiệm 60, Kỹ thuật hình ảnh 60, Điều dưỡng 60, tổng 780), and the general score formula: "điểm xét tuyển được xác định bằng tổng điểm các môn thi trong tổ hợp xét tuyển theo kết quả ky thi tốt nghiệp THPT cộng điểm cộng va điểm ưu tiên đối tượng/khu vực (nêu co)", xác nhận áp dụng "Điều 7 của Quy chế tuyen sinh đại học của Bộ GD&ĐT" cho phan ưu tiên. Con bảng ngưỡng 15,00/30 chung o note cu (2026-08-25) đã được THAY THẾ boi bảng ngưỡng theo từng ngành chính xác hon trong `vnuump-thongbao-2468-2026` (2026-08-28) - xem `thresholds.ts`.',
  },
  {
    id: 'vnuump-thongbao-2468-2026',
    publisher: 'Trường Đại học Y Dược - Đại học Quốc gia Hà Nội (VNU-UMP)',
    title: 'Thông báo 2468/TB-DHYD (08/07/2026): Ve ngưỡng đảm bảo chất lượng đầu vào va quy đối tượng duong điểm trúng tuyển giữa các phương thức xét tuyển đại học chính quy năm 2026',
    url: 'https://ump.vnu.edu.vn/article-thong-bao-ve-nguong-bao-dam-chat-luong-dau-vao-va-quy-doi-tuong-duong-diem-trung-tuyen-giua-cac-phuong-thuc-xet-tuyen-dai-hoc-chinh-quy-nam-2026-19782-3490.html',
    accessedAt: '2026-08-28',
    publishedAt: '2026-07-08',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang thông báo chỉ dẫn chiếu file đính kèm Google Drive (link công khai, tải trực tiếp va đọc qua vision - 3 trang, bản scan rõ nét, không phải secondary). Mức 1: bảng ngưỡng theo ngành (Y khoa 22,0; Răng-Hàm-Mặt 22,0; Dược học 20,0; Kỹ thuật xét nghiệm y học 19,0; Kỹ thuật hình ảnh y học 19,0; Điều dưỡng 19,0), nói rõ "đối với thí sinh khu vực 3 có mức điểm tối thiểu (không nhân hệ số)... không tính điểm cộng". Mức 2: không có chênh lệch điểm giữa các tổ hợp. Mức 3: bằng quy đổi HSA-THPT (không dùng cho nhánh THPT thuần túy).',
  },
];
