/**
 * MKU (Trường Đại học Cửu Long, mã trường DCL) 2026 — điểm chuẩn trúng tuyển 33/42 ngành đại học
 * chính quy, nhánh xét kết quả thi TN THPT 2026, đọc trực tiếp từ PDF text CHÍNH CHỦ "Quyết định số
 * 3018/QĐ-ĐHCL công bố điểm chuẩn trúng tuyển của các ngành hệ Đại học chính quy năm 2026, khóa 27"
 * (`sources.ts:mku-cutoff-2026`) — PDF có text layer đọc trực tiếp được, không cần vision. Chỉ mô
 * hình hoá 33/42 ngành KHÔNG thuộc khối sức khỏe (9 ngành Y khoa/YHCT/RHM/Dược/KT hình ảnh y học/Hộ
 * sinh/KT xét nghiệm y học/KT phục hồi chức năng/Điều dưỡng — threshold 18-22, có điều kiện phụ theo
 * Quyết định 1962/QĐ-BGDĐT chưa đối chiếu kỹ) — bỏ qua theo đúng khuyến nghị tránh nhóm mơ hồ.
 *
 * 30 ngành có điểm chuẩn FLAT 15,0/30 + 3 ngành khối Luật (Luật, Luật kinh tế, Luật hiến pháp và
 * luật hành chính) FLAT 20,0/30 — cả 2 mức đều đồng nhất trong nhóm, xác nhận qua đối chiếu với
 * "Thông báo ngưỡng đảm bảo chất lượng đầu vào" (`sources.ts:mku-floor-2026`, điểm sàn = điểm chuẩn
 * cho toàn bộ 33 ngành này, tức không có cạnh tranh vượt sàn — khác nhóm sức khỏe/luật nơi ngưỡng
 * Bộ GD&ĐT áp đặt).
 *
 * Tổ hợp môn theo cụm ngành lấy từ CÙNG PDF (cột "Tổ hợp môn xét tuyển") — MKU công bố nhiều tổ hợp
 * hơn số combo hiện có trong `COMMON_SUBJECT_COMBINATIONS`; chỉ giữ lại các tổ hợp có ĐÚNG thành
 * phần 3 môn khớp với combo đã có (A03, X04, X08, X10, X12, X16, X17, C07 dùng "Công nghệ nông
 * nghiệp"/"Lịch sử" ở vị trí không khớp bất kỳ SubjectId nào hiện có hoặc không có mã tổ hợp tương
 * ứng — bỏ qua, xem `knowledgeGaps.ts`).
 */
export interface MkuFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn Quyết định 3018/QĐ-ĐHCL. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

// Cụm 1 (8 ngành kinh tế, hàng 10-17): tổ hợp môn là MỘT ô gộp (rowspan) trải từ hàng 10 đến 17,
// xác nhận qua ảnh "Điểm sàn 2" (đường viền bảng rõ ràng hơn ảnh Quyết định 3018) — 12 tổ hợp công
// bố dùng chung cho CẢ 8 ngành: A00/A01/A03/C03/C04/D01/X02/X17/X21/X05/X08/X26. A03/X17 (không có
// combo tương ứng) và X08 (Toán, Vật Lý, Công nghệ NN — "Công nghệ NN" không phải SubjectId) bị loại;
// giữ lại 9 tổ hợp khớp: A00/A01/C03/C04/D01/X02/X21/X05/X26.
const CLUSTER1_SHARED = ['A00', 'A01', 'C03', 'C04', 'D01', 'X02', 'X21', 'X05', 'X26'] as const;
// Cụm 2 (Thiết kế đồ họa, hàng 18): toàn bộ 9 tổ hợp công bố đều khớp combo hiện có.
const CLUSTER2 = ['A00', 'A01', 'A07', 'C01', 'C04', 'D01', 'D09', 'D10', 'X02'] as const;
// Cụm 3 (khối Luật, hàng 19-21): C07/X17 không khớp combo hiện có, bỏ qua.
const CLUSTER3 = ['A00', 'A01', 'C00', 'C03', 'D01', 'X02', 'X21'] as const;
// Cụm 4 (Quản trị dịch vụ du lịch và lữ hành, hàng 22): C07/X17 không khớp, bỏ qua.
const CLUSTER4 = ['A00', 'A01', 'C00', 'C03', 'C04', 'D01', 'X21'] as const;
// Cụm 5 (CNTT, Trí tuệ nhân tạo, hàng 23-24): X04 (Công nghệ nông nghiệp) không khớp, bỏ qua.
const CLUSTER5 = ['A00', 'A01', 'C01', 'D01', 'D07', 'X02', 'X06', 'X26'] as const;
// Cụm 6 (6 ngành kỹ thuật, hàng 25-30): A03/X08 (Công nghệ NN)/X10 (thành phần khác X10 hiện có)
// không khớp, bỏ qua.
const CLUSTER6 = ['A00', 'A01', 'C01', 'D01', 'X06', 'X07', 'X11'] as const;
// Cụm 7 (Công nghệ thực phẩm, hàng 31): A10 không có combo tương ứng, bỏ qua.
const CLUSTER7 = ['A00', 'A01', 'A02', 'B00', 'C01', 'D01', 'D07', 'X11'] as const;
// Cụm 8 (Nông học/Bảo vệ thực vật/Nuôi trồng thủy sản/Thú y, hàng 32-35): X12/X16 (Công nghệ NN)
// không khớp, bỏ qua.
const CLUSTER8 = ['A00', 'A01', 'A02', 'B00', 'B03', 'B08', 'D01'] as const;
// Cụm 9 (5 ngành khoa học xã hội, hàng 36-40): A03 không khớp, bỏ qua.
const CLUSTER9 = ['A01', 'C00', 'C01', 'C03', 'C04', 'D01', 'D14', 'D15'] as const;
// Cụm 10 (Truyền thông đa phương tiện, hàng 41): toàn bộ 9 tổ hợp công bố đều khớp combo hiện có.
const CLUSTER10 = ['A00', 'A01', 'C00', 'C01', 'C03', 'C04', 'D01', 'X02', 'X06'] as const;
// Cụm 11 (Ngôn ngữ Anh, hàng 42): toàn bộ 9 tổ hợp công bố đều khớp combo hiện có.
const CLUSTER11 = ['A01', 'D01', 'D07', 'D08', 'D09', 'D10', 'D14', 'D15', 'X78'] as const;

export const MKU_FIELD_THRESHOLDS_2026: readonly MkuFieldThreshold[] = [
  { code: '7340115', name: 'Marketing', threshold30: 15, combinationIds: CLUSTER1_SHARED },
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 15, combinationIds: CLUSTER1_SHARED },
  { code: '7310110', name: 'Quản lý kinh tế', threshold30: 15, combinationIds: CLUSTER1_SHARED },
  { code: '7310109', name: 'Kinh tế số', threshold30: 15, combinationIds: CLUSTER1_SHARED },
  { code: '7340121', name: 'Kinh doanh thương mại', threshold30: 15, combinationIds: CLUSTER1_SHARED },
  { code: '7340201', name: 'Tài chính - Ngân hàng', threshold30: 15, combinationIds: CLUSTER1_SHARED },
  { code: '7340205', name: 'Công nghệ tài chính', threshold30: 15, combinationIds: CLUSTER1_SHARED },
  { code: '7340301', name: 'Kế toán', threshold30: 15, combinationIds: CLUSTER1_SHARED },
  { code: '7210403', name: 'Thiết kế đồ họa', threshold30: 15, combinationIds: CLUSTER2 },
  { code: '7380101', name: 'Luật', threshold30: 20, combinationIds: CLUSTER3 },
  { code: '7380107', name: 'Luật kinh tế', threshold30: 20, combinationIds: CLUSTER3 },
  { code: '7380102', name: 'Luật hiến pháp và luật hành chính', threshold30: 20, combinationIds: CLUSTER3 },
  { code: '7810103', name: 'Quản trị dịch vụ du lịch và lữ hành', threshold30: 15, combinationIds: CLUSTER4 },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 15, combinationIds: CLUSTER5 },
  { code: '7480107', name: 'Trí tuệ nhân tạo', threshold30: 15, combinationIds: CLUSTER5 },
  { code: '7510102', name: 'Công nghệ kỹ thuật công trình xây dựng', threshold30: 15, combinationIds: CLUSTER6 },
  { code: '7510301', name: 'Công nghệ kỹ thuật điện, điện tử', threshold30: 15, combinationIds: CLUSTER6 },
  { code: '7520212', name: 'Kỹ thuật y sinh', threshold30: 15, combinationIds: CLUSTER6 },
  { code: '7580205', name: 'Kỹ thuật xây dựng công trình giao thông', threshold30: 15, combinationIds: CLUSTER6 },
  { code: '7510205', name: 'Công nghệ kỹ thuật ô tô', threshold30: 15, combinationIds: CLUSTER6 },
  { code: '7510201', name: 'Công nghệ kỹ thuật cơ khí', threshold30: 15, combinationIds: CLUSTER6 },
  { code: '7540101', name: 'Công nghệ thực phẩm', threshold30: 15, combinationIds: CLUSTER7 },
  { code: '7620109', name: 'Nông học', threshold30: 15, combinationIds: CLUSTER8 },
  { code: '7620112', name: 'Bảo vệ thực vật', threshold30: 15, combinationIds: CLUSTER8 },
  { code: '7620301', name: 'Nuôi trồng thủy sản', threshold30: 15, combinationIds: CLUSTER8 },
  { code: '7640101', name: 'Thú y', threshold30: 15, combinationIds: CLUSTER8 },
  { code: '7220101', name: 'Tiếng Việt & Văn hóa Việt Nam', threshold30: 15, combinationIds: CLUSTER9 },
  { code: '7310630', name: 'Việt Nam học', threshold30: 15, combinationIds: CLUSTER9 },
  { code: '7310608', name: 'Đông phương học', threshold30: 15, combinationIds: CLUSTER9 },
  { code: '7320108', name: 'Quan hệ công chúng', threshold30: 15, combinationIds: CLUSTER9 },
  { code: '7760101', name: 'Công tác xã hội', threshold30: 15, combinationIds: CLUSTER9 },
  { code: '7320104', name: 'Truyền thông đa phương tiện', threshold30: 15, combinationIds: CLUSTER10 },
  { code: '7220201', name: 'Ngôn ngữ Anh', threshold30: 15, combinationIds: CLUSTER11 },
] as const;

export type MkuFieldCode = (typeof MKU_FIELD_THRESHOLDS_2026)[number]['code'];

export const MKU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, MkuFieldThreshold> = new Map(
  MKU_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
