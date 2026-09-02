import type { SubjectId } from '../../core/subjects';

/**
 * Trường Đại học Đông Đô (HDIU/DDU) 2025 — "Quyết định số 129/QĐ-ĐHĐD ngày 26/3/2025 v/v ban hành
 * Thông tin tuyển sinh năm 2025" (`sources.ts:hdiu-admission-info-2025`, PDF gốc tải qua
 * images.tuyensinh247.com, đọc bằng vision, 27 trang) + bài báo VietNamNet "Trường Đại học Đông
 * Đô công bố điểm sàn xét tuyển đại học chính quy năm 2025" (`sources.ts:hdiu-threshold-2025`)
 * công bố cụ thể mức "điểm sàn" (ngưỡng đảm bảo chất lượng đầu vào) theo NGÀNH cho phương thức
 * 100 (xét điểm thi TN THPT 2025). Quyết định 129 (mục 2.1) xác nhận nguyên văn: "Điểm xét tuyển
 * là tổng điểm các bài thi/môn thi theo thang điểm 10 đối với bài thi/môn thi của từng tổ hợp xét
 * tuyển và được làm tròn đến 0,25; cộng với điểm ưu tiên/khuyến khích đối tượng, khu vực" và
 * "Ngưỡng đảm bảo chất lượng đầu vào: ... có tổng điểm 3 bài thi/môn thi ... GỒM CẢ điểm ưu tiên/
 * khuyến khích theo khu vực không dưới điểm sàn ..." => ngưỡng so với TỔNG ĐÃ CỘNG ưu tiên (không
 * phải tổng thô) — KHÔNG cần judgment call cho việc "có cộng ưu tiên hay không" (khác Phenikaa/
 * AOF), chỉ cần judgment call cho GIÁ TRỊ bảng điểm ưu tiên cụ thể (trường không tự công bố mức,
 * `priority.ts`).
 *
 * Mô hình hoá 15/19 ngành đại học chính quy (mã xét tuyển 7xxxxxx, phương thức 100) dùng tổ hợp
 * THPT chuẩn có trong `SubjectId`. LOẠI TRỪ tổ hợp riêng của 3 ngành ngôn ngữ (D04 Tiếng Trung, D06
 * Tiếng Nhật, DD2 Tiếng Hàn) do các ngoại ngữ này không có trong danh mục môn dùng chung — 3 ngành
 * Ngôn ngữ Trung/Nhật/Hàn vẫn mô hình hoá được qua các tổ hợp còn lại (A01/C00/C19/D01/D14). Các
 * mã liên thông/VLVH/LTCD (không phải "Đại học chính quy" hệ thi TN THPT) KHÔNG đưa vào bảng này.
 */
export type HdiuFieldId =
  | 'chinese-language'
  | 'japanese-language'
  | 'korean-language'
  | 'public-administration'
  | 'business-administration'
  | 'ecommerce'
  | 'finance-banking'
  | 'accounting'
  | 'law-economics'
  | 'information-technology'
  | 'automotive-engineering'
  | 'veterinary-medicine'
  | 'pharmacy'
  | 'nursing'
  | 'medical-laboratory-technology';

export interface HdiuFieldThreshold {
  fieldId: HdiuFieldId;
  /** Tên ngành đúng nguyên văn bảng chỉ tiêu tuyển sinh (Quyết định 129/QĐ-ĐHĐD, trang 5-9). */
  fieldName: string;
  /** Ngưỡng đảm bảo chất lượng đầu vào — thang 30, ĐÃ tính cả điểm ưu tiên (không phải tổng thô). */
  threshold30: number;
  /** Mã xét tuyển (mã ngành) — tham chiếu bảng chỉ tiêu Quyết định 129/QĐ-ĐHĐD. */
  admissionCode: string;
}

export const HDIU_FIELD_THRESHOLDS_2025: readonly HdiuFieldThreshold[] = [
  { fieldId: 'chinese-language', fieldName: 'Ngôn ngữ Trung Quốc', threshold30: 14, admissionCode: '7220204' },
  { fieldId: 'japanese-language', fieldName: 'Ngôn ngữ Nhật', threshold30: 14, admissionCode: '7220209' },
  { fieldId: 'korean-language', fieldName: 'Ngôn ngữ Hàn Quốc', threshold30: 14, admissionCode: '7220210' },
  { fieldId: 'public-administration', fieldName: 'Quản lý nhà nước', threshold30: 14, admissionCode: '7310205' },
  { fieldId: 'business-administration', fieldName: 'Quản trị kinh doanh', threshold30: 14, admissionCode: '7340101' },
  { fieldId: 'ecommerce', fieldName: 'Thương mại điện tử', threshold30: 14, admissionCode: '7340122' },
  { fieldId: 'finance-banking', fieldName: 'Tài chính - Ngân hàng', threshold30: 14, admissionCode: '7340201' },
  { fieldId: 'accounting', fieldName: 'Kế toán', threshold30: 14, admissionCode: '7340301' },
  { fieldId: 'law-economics', fieldName: 'Luật kinh tế', threshold30: 18, admissionCode: '7380107' },
  { fieldId: 'information-technology', fieldName: 'Công nghệ thông tin', threshold30: 14, admissionCode: '7480201' },
  { fieldId: 'automotive-engineering', fieldName: 'Công nghệ kỹ thuật ô tô', threshold30: 14, admissionCode: '7510205' },
  { fieldId: 'veterinary-medicine', fieldName: 'Thú y', threshold30: 14, admissionCode: '7640101' },
  { fieldId: 'pharmacy', fieldName: 'Dược học', threshold30: 19, admissionCode: '7720201' },
  { fieldId: 'nursing', fieldName: 'Điều dưỡng', threshold30: 17, admissionCode: '7720301' },
  { fieldId: 'medical-laboratory-technology', fieldName: 'Kỹ thuật xét nghiệm y học', threshold30: 17, admissionCode: '7720601' },
];

export const HDIU_FIELD_THRESHOLD_BY_ID: ReadonlyMap<HdiuFieldId, HdiuFieldThreshold> = new Map(
  HDIU_FIELD_THRESHOLDS_2025.map((entry) => [entry.fieldId, entry])
);

/** Chỉ dùng để thông báo lỗi rõ ràng nếu ai đó truyền subject không thuộc combo phổ biến — không
 * validate combo theo ngành (mỗi ngành công bố 4-6 tổ hợp hợp lệ khác nhau, xem knowledgeGaps.ts,
 * cùng tiền lệ `schools/hou`). */
export const HDIU_UNSUPPORTED_SUBJECTS: readonly SubjectId[] = [];
