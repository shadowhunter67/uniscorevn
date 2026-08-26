import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface UefSource {
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

/**
 * Nguồn đã xác minh cho UEF (Trường Đại học Kinh tế - Tài chính TP.HCM) 2026 — research 2026-08-21,
 * browser thật (chrome-devtools, đọc trực tiếp `www.uef.edu.vn`, KHÔNG qua mirror/tổng hợp bên thứ
 * ba). Domain chính thức: `uef.edu.vn`.
 */
export const uefSources: UefSource[] = [
  {
    id: 'uef-quality-threshold-2026',
    publisher: 'Trường Đại học Kinh tế - Tài chính TP.HCM (UEF) — Trung tâm Thông tin - Truyền thông',
    title:
      'UEF công bố điểm nhận hồ sơ xét tuyển các phương thức năm 2026 — mức điểm nhận hồ sơ cho 38 ngành đào tạo song ngữ + 4 ngành đào tạo tài năng (100% tiếng Anh) theo 4 phương thức (thi TN THPT/học bạ 6 học kỳ/ĐGNL ĐHQG TP.HCM/V-SAT), điều kiện riêng nhóm ngành Luật',
    url: 'https://www.uef.edu.vn/tin-tuyen-sinh/uef-cong-bo-diem-nhan-ho-so-xet-tuyen-nam-2026-37211',
    accessedAt: '2026-08-21',
    publishedAt: '2026-07-06',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đọc trực tiếp qua chrome-devtools (`document.body.innerText`) 2026-08-21 — trang ghi rõ "06/07/2026". Mức điểm nhận hồ sơ: thi TN THPT ≥15/30 (tổng 3 môn tổ hợp); học bạ 6 học kỳ ≥18/30; ĐGNL ĐHQG TP.HCM ≥600/1200; V-SAT ≥225/400. Riêng nhóm ngành Luật (Luật, Luật Kinh tế, Luật quốc tế, Luật Thương mại quốc tế): phương thức thi TN THPT áp ngưỡng Bộ GD&ĐT ≥20/30; các phương thức KHÔNG dùng kết quả thi TN THPT (học bạ/ĐGNL/V-SAT) cần ĐỒNG THỜI học lực cả năm lớp 12 xếp loại Tốt/Giỏi trở lên VÀ (tổng 3 môn thi TN THPT theo tổ hợp ≥18,00 HOẶC điểm xét tốt nghiệp THPT ≥8,5).',
  },
  {
    id: 'uef-de-an-tuyen-sinh-2026',
    publisher: 'Trường Đại học Kinh tế - Tài chính TP.HCM (UEF)',
    title: 'THÔNG TIN TUYỂN SINH NĂM 2026 (Đề án tuyển sinh, PDF 91 trang, cập nhật 03/07/2026)',
    url: 'https://www.uef.edu.vn/tin-tuyen-sinh/uef-cong-bo-thong-tin-tuyen-sinh-nam-2026-33917',
    accessedAt: '2026-08-26',
    publishedAt: '2026-07-03',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đọc trực tiếp bản PDF gốc (91 trang) qua Google Drive viewer (link "Xem thông tin tuyển sinh 2026 chi tiết tại đây" trên trang tin chính thức). Mục 2 (bảng tổ hợp môn theo từng ngành, mã phương thức 100 = thi TN THPT, áp dụng đồng thời cho tất cả các ngành); mục 5.b "Điểm cộng: không"; mục 7 (Chính sách ưu tiên — Quyết định 202/QĐ-UEF 26/02/2026, căn cứ Điều 7: bảng đầy đủ khu vực×đối tượng KV1=0,75/KV2-NT=0,50/KV2=0,25/KV3=0, UT1=2,00/UT2=1,00, công thức giảm điểm ưu tiên khi tổng ≥22,50/30).',
  },
];
