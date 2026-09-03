import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface MkuSource {
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
 * Trường Đại học Cửu Long (MKU, mã trường DCL) — cổng tuyển sinh chính thức tuyensinh.mku.edu.vn.
 * Khác DLA/BMTU (bảng số liệu đăng dưới dạng ảnh, phải đọc bằng vision), MKU đăng Quyết định công bố
 * điểm chuẩn dưới dạng PDF CÓ TEXT LAYER thật (đọc trực tiếp được bằng công cụ đọc PDF thường, không
 * cần chrome-devtools/vision) — 4 trang, "Read" tool trích xuất đầy đủ nguyên văn cả quyết định lẫn
 * bảng 42 ngành.
 */
export const mkuSources: MkuSource[] = [
  {
    id: 'mku-cutoff-2026',
    publisher: 'Trường Đại học Cửu Long (Hiệu trưởng PGS.TS Lương Minh Cừ)',
    title: 'Quyết định số 3018/QĐ-ĐHCL (10/8/2026) — Công bố điểm chuẩn trúng tuyển của các ngành hệ Đại học chính quy năm 2026, khóa 27 (kèm phụ lục "Danh sách điểm chuẩn trúng tuyển")',
    url: 'https://tuyensinh.mku.edu.vn/quyet-dinh-cong-bo-diem-chuan-trung-tuyen-cua-cac-nganh-he-dai-hoc-chinh-quy-nam-2026-khoa-27',
    accessedAt: '2026-09-03',
    publishedAt: '2026-08-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF đính kèm (link trực tiếp /image/files/QĐ CONG BO ĐIEM CHUAN TRUNG TUYEN CUA CAC NGANH HE ĐAI HOC CHINH QUY NAM 2026, KHOA 27.pdf) — 4 trang, text layer đọc trực tiếp được. Trang 1: quyết định (căn cứ Thông tư 06/2026/TT-BGDĐT, Quyết định 1961/QĐ-BGDĐT khối pháp luật và 1962/QĐ-BGDĐT khối sức khỏe). Trang 2-4: bảng 42 ngành, 3 cột điểm chuẩn theo phương thức (Điểm thi tốt nghiệp THPT / Học bạ / V-SAT). Module này CHỈ dùng cột "Điểm chuẩn điểm thi tốt nghiệp THPT" (thang 30, không hệ số) và CHỈ mô hình hoá 33/42 ngành KHÔNG thuộc khối sức khỏe (loại 9 ngành Y khoa/YHCT/RHM/Dược/KT hình ảnh y học/Hộ sinh/KT xét nghiệm y học/KT phục hồi chức năng/Điều dưỡng, threshold 18-22 kèm điều kiện phụ riêng theo Quyết định 1962/QĐ-BGDĐT chưa đối chiếu). 30/33 ngành mô hình hoá có điểm chuẩn FLAT 15,0/30; riêng khối Luật (Luật, Luật kinh tế, Luật hiến pháp và luật hành chính) FLAT 20,0/30 theo Quyết định 1961/QĐ-BGDĐT.',
  },
  {
    id: 'mku-floor-2026',
    publisher: 'Trường Đại học Cửu Long (Hiệu trưởng)',
    title: 'Thông báo số 2613/TB-ĐHCL (08/7/2026) — Ngưỡng đảm bảo chất lượng đầu vào (điểm sàn xét tuyển) của các ngành hệ Đại học chính quy năm 2026, khóa 27',
    url: 'https://tuyensinh.mku.edu.vn/thong-bao-ve-nguong-dam-bao-chat-luong-dau-vao-diem-san-xet-tuyen-cua-cac-nganh-he-dai-hoc-chinh-quy-nam-2026-khoa-27',
    accessedAt: '2026-09-03',
    publishedAt: '2026-07-08',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Ảnh "Điểm sàn 1-4" (đọc bằng vision) xác nhận: với 33 ngành module này mô hình hoá, điểm sàn xét tuyển (ngưỡng đầu vào) TRÙNG với điểm chuẩn trúng tuyển thực tế công bố sau đó (`mku-cutoff-2026`) — tức không có cạnh tranh vượt sàn cho nhóm ngành này (khác nhóm sức khỏe/luật nơi Bộ GD&ĐT áp ngưỡng riêng). Trang nêu rõ "điểm sàn xét tuyển mỗi ngành bằng nhau giữa các tổ hợp xét tuyển" — xác nhận không có hệ số ưu tiên riêng theo tổ hợp.',
  },
  {
    id: 'mku-admission-notice-2026',
    publisher: 'Trường Đại học Cửu Long (Trung tâm Tuyển sinh)',
    title: 'Thông báo số 2344/TB-ĐHCL (12/6/2026) — Tuyển sinh hệ Đại học chính quy năm 2026, khóa 27 (danh mục ngành, mã ngành, tổ hợp môn xét tuyển)',
    url: 'https://tuyensinh.mku.edu.vn/thong-bao-tuyen-sinh-he-dai-hoc-chinh-quy-nam-2026-khoa-27',
    accessedAt: '2026-09-03',
    publishedAt: '2026-06-12',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Ảnh "Untitled-1..4" (đọc bằng vision) — bảng đầy đủ 42 ngành/mã ngành/tổ hợp môn xét tuyển (khớp 100% với bảng trong Quyết định 3018/QĐ-ĐHCL), cộng mục "II. PHƯƠNG THỨC TUYỂN SINH" xác nhận 3 phương thức: (1) học bạ THPT, (2) kết quả thi TN THPT 2026, (3) điểm thi V-SAT. Trường công bố NHIỀU tổ hợp hơn số combo hiện có trong `COMMON_SUBJECT_COMBINATIONS` — chỉ giữ tổ hợp khớp đúng thành phần 3 môn, xem `thresholds.ts` và `knowledgeGaps.ts`.',
  },
];
