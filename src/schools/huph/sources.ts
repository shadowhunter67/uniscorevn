import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface HuphSource {
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

export const huphSources: HuphSource[] = [
  {
    id: 'huph-thongtin-tuyensinh-314-2026',
    publisher: 'Trường Đại học Y tế công cộng (HUPH, mã trường YTC) — Bộ Y tế',
    title: 'Thông tin tuyển sinh đại học chính quy năm 2026 (ban hành kèm Quyết định số 314/QĐ-ĐHYTCC ngày 28/5/2026)',
    url: 'https://tuyensinh.huph.edu.vn/upload/2026/06/15/Thong%20tin%20tuyen%20sinh%20dai%20hoc%20chinh%20quy%202026_final_1781516617.pdf',
    accessedAt: '2026-09-09',
    publishedAt: '2026-05-28',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF gốc 25 trang đăng trực tiếp trên cổng tuyển sinh chính chủ tuyensinh.huph.edu.vn (không có text layer, đọc bằng vision). Mục 5.3.5 "Phương thức xét tuyển: Xét tuyển dựa trên kết quả thi THPT năm 2026" ghi nguyên văn: "Điểm xét tuyển được tính trên thang điểm 30", "Điểm xét tuyển = [Điểm Môn 1 + Điểm Môn 2 + Điểm Môn 3 + Điểm khuyến khích (nếu có)] + Điểm ưu tiên (nếu có)", "Khi [Điểm Môn 1 + Điểm Môn 2 + Điểm Môn 3 + Điểm khuyến khích (nếu có)] vượt qua 30 điểm sẽ quy về 30 điểm", "Điểm ưu tiên là điểm ưu tiên đối tượng, khu vực theo quy định của Bộ GDĐT, giảm dần khi [Điểm Môn 1 + Điểm Môn 2 + Điểm Môn 3 + Điểm khuyến khích (nếu có)] từ 22,5 điểm trở lên theo quy chế tuyển sinh trình độ đại học hiện hành". Mục 5 xác nhận "Trường Đại học Y tế công cộng không quy định chênh lệch điểm xét tuyển giữa các tổ hợp đối với các thí sinh đăng ký xét tuyển cùng một ngành học" và "Điểm xét tuyển được làm tròn đến 2 chữ số thập phân sau dấu phẩy". Bảng 1 "Số lượng tuyển sinh năm 2026" (trang 4-8) liệt kê 6 ngành với mã ngành, chỉ tiêu, phương thức và TỔ HỢP MÔN XÉT TUYỂN (kèm chú giải tên môn đầy đủ cho từng mã tổ hợp). Bảng 2 (trang 10) là bảng quy đổi/điểm khuyến khích chứng chỉ tiếng Anh quốc tế, tối đa 1,50 điểm thang 30 (CHƯA wired, xem knowledgeGaps.ts).',
  },
  {
    id: 'huph-diemtrungtuyen-743-2026',
    publisher: 'Trường Đại học Y tế công cộng — Hội đồng tuyển sinh đại học chính quy năm 2026',
    title: 'Thông báo số 743/TB-ĐHYTCC (09/8/2026) — Điểm trúng tuyển đại học chính quy năm 2026 đợt 1',
    url: 'https://huph.edu.vn/upload/2026/08/09/743.8.26%20final%20Thong%20bao%20diem%20trung%20tuyen%202026_final_1786270423.pdf',
    accessedAt: '2026-09-09',
    publishedAt: '2026-08-09',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF gốc 2 trang có chữ ký Hiệu trưởng kiêm Chủ tịch Hội đồng tuyển sinh (Hoàng Văn Minh), tải trực tiếp từ huph.edu.vn; text layer đọc được. Căn cứ Thông tư 06/2026/TT-BGDĐT, Quyết định 314/QĐ-ĐHYTCC (28/5/2026), Thông báo 591/TB-ĐHYTCC (25/6/2026) đính chính, Thông báo 641/TB-ĐHYTCC (10/7/2026) về ngưỡng đảm bảo chất lượng đầu vào & quy đổi tương đương, và kết luận Hội đồng tuyển sinh họp 08/8/2026. Bảng 6 dòng (ngành / mã ngành / điểm trúng tuyển / tiêu chí phụ). Ghi chú nguyên văn: "Điểm trúng tuyển theo thang điểm 30 (không nhân hệ số) và đã bao gồm điểm khuyến khích (nếu có), điểm ưu tiên khu vực, ưu tiên đối tượng theo quy định của Bộ Giáo dục & Đào tạo và theo Thông tin tuyển sinh của Trường Đại học Y tế công cộng"; "Điểm trúng tuyển là điểm quy đổi tương đương về phương thức gốc (phương thức xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026)". Tiêu chí phụ TTNV<=2 chỉ áp dụng ngành Kỹ thuật phục hồi chức năng (không mô hình hoá — xem knowledgeGaps.ts).',
  },
  {
    id: 'huph-priority-national-2026',
    publisher: 'Bộ Giáo dục và Đào tạo',
    title: 'Thông tư 06/2026/TT-BGDĐT — Quy chế tuyển sinh các ngành đào tạo trình độ đại học và ngành Giáo dục Mầm non trình độ cao đẳng, Điều 7 (Chính sách ưu tiên trong tuyển sinh)',
    url: 'https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/3/06-bgddt.pdf',
    accessedAt: '2026-09-09',
    publishedAt: '2026-02-15',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'HUPH dẫn chiếu trực tiếp "điểm ưu tiên đối tượng, khu vực theo quy định của Bộ GDĐT" và mô tả đúng cơ chế giảm dần từ 22,5/30 nhưng KHÔNG in lại bảng mức — dùng Điều 7 Thông tư 06/2026/TT-BGDĐT (KV1 = 0,75; KV2-NT = 0,5; KV2 = 0,25; KV3 = 0; nhóm đối tượng 1 = 2,00; nhóm đối tượng 2 = 1,00; công thức giảm "[(30 − Tổng điểm đạt được)/7,50] × Mức điểm ưu tiên"). Judgment call cùng tiền lệ ULSA/EPU/HVU/HBU/VTTU.',
  },
];
