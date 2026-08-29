import type { SubjectId } from '../../core/subjects';

/**
 * Trường Đại học Mở Hà Nội (HOU) 2026 — "Trường Đại học Mở Hà Nội công bố mức điểm sàn và bảng
 * quy đổi tương đương giữa các phương thức xét tuyển đại học chính quy năm 2026" (`sources.ts:
 * hou-threshold-2026`, đọc trực tiếp qua curl 2026-08-29, HTTP 200, trang tin tức chính thức
 * hou.edu.vn — bảng ngưỡng dạng ảnh PNG, đọc bằng vision, chữ rõ không cần OCR). Bảng liệt kê
 * "Ngưỡng bảo đảm chất lượng đầu vào" theo TỪNG NGÀNH cụ thể (22 ngành, nêu đích danh), cột
 * "Điểm thi tốt nghiệp THPT/Kết hợp năng khiếu vẽ (thang 30)". Nguyên văn: "Thí sinh có tổng điểm
 * các môn thi/bài thi trong tổ hợp xét tuyển CỘNG điểm ưu tiên khu vực, ưu tiên đối tượng từ mức
 * ngưỡng bảo đảm chất lượng đầu vào trở lên... đủ điều kiện đăng ký xét tuyển" => ngưỡng so với
 * TỔNG (đã CỘNG điểm ưu tiên), không phải tổng thô như Phenikaa/AOF.
 *
 * CHỈ mô hình hoá 17/22 ngành dùng tổ hợp THPT chuẩn (SubjectId hiện có). LOẠI TRỪ 5 ngành:
 * - Thiết kế đồ hoạ, Thiết kế thời trang, Kiến trúc, Thiết kế nội thất: tổ hợp có môn năng khiếu
 *   vẽ do trường tự tổ chức thi (HÌNH HỌA, VẼ MỸ THUẬT, Bố cục màu) — không phải môn thi TN THPT,
 *   không có trong `SubjectId`.
 * - Ngôn ngữ Trung Quốc: tổ hợp bắt buộc môn Tiếng Trung — không có trong `SubjectId`.
 * Xem `knowledgeGaps.ts` cho chi tiết loại trừ.
 *
 * Riêng ngành Ngôn ngữ Anh (TT21): tổ hợp "TIẾNG ANH, NGỮ VĂN, Toán" — Tiếng Anh viết HOA/đậm
 * trong bảng gốc => hệ số 2, "tổ hợp xét tuyển có hai môn nhân hệ số 2 được tính theo thang điểm
 * 50 đã được quy đổi về thang điểm 30" (câu chữ gốc) — nhưng bảng TT21 chỉ có 1 môn hệ số 2 (Tiếng
 * Anh), không phải 2 môn; áp dụng cách quy đổi tương tự cho 1 môn hệ số 2: thang tối đa = 40
 * (10+10+20), quy đổi về 30 theo tỷ lệ `raw40 * 30 / 40` — GHI RÕ đây là suy diễn từ câu chữ gốc
 * (chỉ nêu rõ trường hợp 2 môn hệ số 2, không nêu rõ trường hợp 1 môn) vì trong 22 ngành công bố,
 * không có ngành nào có đúng 1 môn hệ số 2 để đối chiếu — coi là knowledge gap, không tính vào
 * nhánh "exact" (xem `knowledgeGaps.ts:hou-english-weighted-combo-not-modeled`).
 */
export type HouFieldId =
  | 'accounting'
  | 'finance-banking'
  | 'insurance'
  | 'business-admin'
  | 'ecommerce'
  | 'law'
  | 'international-law'
  | 'law-economics'
  | 'biotechnology'
  | 'food-technology'
  | 'computer-engineering'
  | 'information-technology'
  | 'electronics-telecom'
  | 'automation-control'
  | 'tourism-hospitality'
  | 'hotel-management';

export interface HouFieldThreshold {
  fieldId: HouFieldId;
  /** Tên ngành đúng nguyên văn bảng công bố. */
  fieldName: string;
  /** Ngưỡng bảo đảm chất lượng đầu vào — thang 30, ĐÃ tính cả điểm ưu tiên (không phải tổng thô). */
  threshold30: number;
}

export const HOU_FIELD_THRESHOLDS_2026: readonly HouFieldThreshold[] = [
  { fieldId: 'accounting', fieldName: 'Kế toán', threshold30: 18.5 },
  { fieldId: 'finance-banking', fieldName: 'Tài chính - Ngân hàng', threshold30: 18.5 },
  { fieldId: 'insurance', fieldName: 'Bảo hiểm', threshold30: 18.5 },
  { fieldId: 'business-admin', fieldName: 'Quản trị kinh doanh', threshold30: 18.5 },
  { fieldId: 'ecommerce', fieldName: 'Thương mại điện tử', threshold30: 20 },
  { fieldId: 'law', fieldName: 'Luật', threshold30: 20 },
  { fieldId: 'international-law', fieldName: 'Luật quốc tế', threshold30: 20 },
  { fieldId: 'law-economics', fieldName: 'Luật kinh tế', threshold30: 20 },
  { fieldId: 'biotechnology', fieldName: 'Công nghệ sinh học', threshold30: 17 },
  { fieldId: 'food-technology', fieldName: 'Công nghệ thực phẩm', threshold30: 17 },
  { fieldId: 'computer-engineering', fieldName: 'Kỹ thuật máy tính', threshold30: 18 },
  { fieldId: 'information-technology', fieldName: 'Công nghệ thông tin', threshold30: 19 },
  { fieldId: 'electronics-telecom', fieldName: 'Công nghệ kỹ thuật điện tử - viễn thông', threshold30: 18 },
  { fieldId: 'automation-control', fieldName: 'Công nghệ kỹ thuật điều khiển và tự động hóa', threshold30: 18 },
  { fieldId: 'tourism-hospitality', fieldName: 'Quản trị dịch vụ du lịch và lữ hành', threshold30: 18 },
  { fieldId: 'hotel-management', fieldName: 'Quản trị khách sạn', threshold30: 18 },
];

export const HOU_FIELD_THRESHOLD_BY_ID: ReadonlyMap<HouFieldId, HouFieldThreshold> = new Map(
  HOU_FIELD_THRESHOLDS_2026.map((entry) => [entry.fieldId, entry])
);

/** Chỉ dùng để thông báo lỗi rõ ràng nếu ai đó truyền subject không thuộc combo phổ biến — không
 * validate combo theo ngành (xem knowledgeGaps.ts). */
export const HOU_UNSUPPORTED_SUBJECTS: readonly SubjectId[] = [];
