/**
 * Phenikaa 2026 (Trường Đại học Phenikaa) — "Đại học Phenikaa công bố ngưỡng điểm nhận hồ sơ xét
 * tuyển đại học hệ chính quy đợt 1 năm 2026" (`sources.ts:phenikaa-threshold-2026`, đọc trực tiếp
 * qua curl 2026-08-29, HTTP 200 — nội dung + bảng ngưỡng là ảnh JPG embed trong CMS Next.js, đọc
 * bằng vision). Cột "Điểm thi tốt nghiệp THPT 2026" (thang 30) công bố ngưỡng theo LĨNH VỰC/NGÀNH
 * cụ thể (không phải campus/loại chương trình như AOF — mọi ngành trong mỗi dòng được liệt kê đích
 * danh bằng tên), áp dụng cho phương thức xét kết quả thi TN THPT: "không nhân hệ số, không tính
 * điểm cộng, không phân biệt kết quả thi của thí sinh học chương trình 2006 và 2018" (câu chữ gốc,
 * áp cho thí sinh khu vực 3) => điểm xét = tổng thô 3 môn, không hệ số, không điểm cộng.
 */
export type PhenikaaFieldId =
  | 'talent-cs'
  | 'talent-semiconductor'
  | 'law'
  | 'health-medicine-dentistry'
  | 'health-traditional-pharmacy'
  | 'health-nursing-technician'
  | 'other';

export interface PhenikaaFieldThreshold {
  fieldId: PhenikaaFieldId;
  /** Tên lĩnh vực/ngành đúng nguyên văn bảng công bố. */
  fieldName: string;
  /** Ngưỡng điểm nhận hồ sơ — tổng thô 3 môn thi TN THPT 2026, thang 30, KHÔNG nhân hệ số. */
  threshold30: number;
}

export const PHENIKAA_FIELD_THRESHOLDS_2026: readonly PhenikaaFieldThreshold[] = [
  { fieldId: 'talent-cs', fieldName: 'Khoa học máy tính (CTĐT tài năng theo Đề án của Chính phủ)', threshold30: 24 },
  { fieldId: 'talent-semiconductor', fieldName: 'Khoa học và công nghệ bán dẫn (CTĐT tài năng theo Đề án của Chính phủ)', threshold30: 24 },
  {
    fieldId: 'law',
    fieldName: 'Lĩnh vực Pháp luật: Luật kinh tế, Luật kinh doanh, Luật, Luật quốc tế, Luật thương mại quốc tế, Luật hình sự và tố tụng hình sự',
    threshold30: 20,
  },
  { fieldId: 'health-medicine-dentistry', fieldName: 'Lĩnh vực Sức khỏe: Y khoa, Răng Hàm Mặt', threshold30: 22 },
  { fieldId: 'health-traditional-pharmacy', fieldName: 'Lĩnh vực Sức khỏe: Y học cổ truyền, Dược', threshold30: 20 },
  {
    fieldId: 'health-nursing-technician',
    fieldName: 'Lĩnh vực Sức khỏe: Điều dưỡng, Hộ sinh, Kỹ thuật xét nghiệm y học, Kỹ thuật hình ảnh y học, Kỹ thuật phục hồi chức năng',
    threshold30: 18,
  },
  { fieldId: 'other', fieldName: 'Các ngành/CTĐT khác', threshold30: 15 },
];

export const PHENIKAA_FIELD_THRESHOLD_BY_ID: ReadonlyMap<PhenikaaFieldId, PhenikaaFieldThreshold> = new Map(
  PHENIKAA_FIELD_THRESHOLDS_2026.map((entry) => [entry.fieldId, entry])
);
