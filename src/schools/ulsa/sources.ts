import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface UlsaSource {
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

export const ulsaSources: UlsaSource[] = [
  {
    id: 'ulsa-diemtrungtuyen-2752-2026',
    publisher: 'Trường Đại học Lao động - Xã hội — Hội đồng tuyển sinh ĐH năm 2026',
    title: 'Thông báo số 2752/TB-HĐTSĐH2026 (11/8/2026) — Điểm trúng tuyển đại học hệ chính quy năm 2026',
    url: 'https://ulsa.edu.vn/wp-content/uploads/2026/08/Thong-bao-2752-Diem-trung-tuyen-dai-hoc-he-chinh-quy-nam-2026.pdf',
    accessedAt: '2026-09-09',
    publishedAt: '2026-08-11',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF gốc 5 trang có chữ ký + con dấu, tải trực tiếp từ ulsa.edu.vn (bài "Thông báo điểm trúng tuyển đại học hệ chính quy năm 2026"); không có text layer nên đọc bằng vision. Bảng 1.1 "Địa điểm đào tạo Trụ sở chính Hà Nội (DLX)" liệt kê 28 chương trình đào tạo và bảng 1.2 "Địa điểm đào tạo Cơ sở II - Tp. Hồ Chí Minh (DLS)" liệt kê 14 chương trình, mỗi dòng gồm Mã ngành / Chương trình đào tạo / Tổ hợp xét / Điểm. Cột điểm được gán nhãn nguyên văn "Điểm chuẩn Thi TN THPT (PT 100, PT gốc, thang 30)" — xác nhận TRỰC TIẾP thang 30 và phương thức 100 là PHƯƠNG THỨC GỐC (các cột còn lại là điểm quy đổi tương đương cho PT 200 học bạ và PT 402 HSA/TSA/V-ACT). Lưu ý cấu trúc bảng: cột "Tổ hợp xét" dùng ô GỘP theo cụm mã ngành; dòng 10 trang 2 (7340201B Công nghệ tài chính) có ô trống vì ô gộp "A01, C01, D01, X25" bắt đầu ở dòng 9 trang 1 — đã đối chiếu chéo và khớp với bảng tổ hợp trong `ulsa-thongtin-tuyensinh-2026`.',
  },
  {
    id: 'ulsa-thongtin-tuyensinh-2026',
    publisher: 'Trường Đại học Lao động - Xã hội (ULSA) — Cổng thông tin tuyển sinh',
    title: 'Trường Đại học Lao động - Xã hội tuyển sinh đại học chính quy năm 2026',
    url: 'https://tuyensinh.ulsa.edu.vn/tin-tuc-chung/truong-dai-hoc-lao-dong-xa-hoi-tuyen-sinh-dai-hoc-chinh-quy-nam-2026/',
    accessedAt: '2026-09-09',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang tuyển sinh chính chủ (đọc được text trực tiếp). Mục 4.1 "Phương thức 1: Xét tuyển dựa trên kết quả kỳ thi tốt nghiệp trung học phổ thông năm 2026 (Mã xét tuyển 100)", tiểu mục 4.1.3 "Điểm xét tuyển" ghi nguyên văn: "Từ tổng điểm cao đến thấp, bao gồm cả điểm ưu tiên (nếu có) cho đến khi đủ số lượng tuyển sinh cho từng tổ hợp môn xét tuyển và theo từng ngành đào tạo" — tức Điểm xét tuyển = tổng 3 môn theo tổ hợp + điểm ưu tiên, không hệ số. Mục 3 ghi "Các chính sách ưu tiên trong tuyển sinh thực hiện theo Quy chế tuyển sinh trình độ đại học ban hành tại Quyết định số 783/QĐ-ĐHLĐXH ngày 11/4/2025 của Hiệu trưởng" (dẫn chiếu quy chế nội bộ triển khai khung của Bộ, không in lại bảng mức). Ảnh bảng "Chương trình đào tạo, ngành đào tạo, mã xét tuyển, tổ hợp môn xét tuyển và chỉ tiêu tuyển sinh" (đọc bằng vision) liệt kê tổ hợp theo TÊN MÔN kèm mã (vd. "Toán - GD KTPL - Tiếng Anh (X25)"), dùng để đối chiếu chéo bảng tổ hợp trong thông báo điểm trúng tuyển và để xác nhận ngành nào có chỉ tiêu ở Cơ sở II. Mục 4.1.2 ghi "Quy đổi điểm chứng chỉ tiếng Anh quốc tế (Điểm quy đổi cụ thể sẽ được thông báo sau)" — bảng quy đổi CHƯA công bố tại thời điểm research (xem knowledgeGaps.ts). Điều kiện riêng "điểm tiếng Anh >= 7,0" của ngành Ngôn ngữ Anh chỉ áp dụng cho Phương thức 2 (học bạ) và Phương thức 5 (dự bị đại học), KHÔNG áp dụng cho Phương thức 1.',
  },
  {
    id: 'ulsa-priority-national-2026',
    publisher: 'Bộ Giáo dục và Đào tạo',
    title: 'Thông tư 06/2026/TT-BGDĐT — Quy chế tuyển sinh các ngành đào tạo trình độ đại học và ngành Giáo dục Mầm non trình độ cao đẳng, Điều 7 (Chính sách ưu tiên trong tuyển sinh)',
    url: 'https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/3/06-bgddt.pdf',
    accessedAt: '2026-09-09',
    publishedAt: '2026-02-15',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Khung điểm ưu tiên quốc gia. ULSA không in lại bảng mức riêng mà dẫn chiếu Quy chế tuyển sinh nội bộ (Quyết định 783/QĐ-ĐHLĐXH) vốn triển khai quy chế của Bộ — judgment call cùng tiền lệ EPU/HVU/HBU/VTTU/DLA/PVU. Điều 7: KV1 = 0,75; KV2-NT = 0,5; KV2 = 0,25; KV3 = 0; nhóm đối tượng 1 = 2,00; nhóm đối tượng 2 = 1,00 (thang 30); khoản 4: "Điểm ưu tiên = [(30 − Tổng điểm đạt được)/7,50] × Mức điểm ưu tiên quy định" khi tổng điểm đạt từ 22,50/30 trở lên.',
  },
];
