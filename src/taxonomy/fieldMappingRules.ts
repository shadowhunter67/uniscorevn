import { normalizeForLandingSearch } from '../components/landingCatalog';
import { FIELDS, type FieldId } from './fields';

export interface FieldMappingRule {
  fieldId: FieldId;
  /** Khớp theo substring trên tên ngành đã normalize (bỏ dấu, thường hóa) — không dùng regex đầy
   * đủ vì tên ngành nhập tay không đồng nhất; substring theo alias đã đủ ổn định và dễ audit. */
  pattern: string;
}

/**
 * Sinh rule từ `FIELDS[].aliases` — 1 alias có thể khớp nhiều field (multi-field kỳ vọng, vd
 * "khoa học dữ liệu" khớp cả field ai-du-lieu lẫn không khớp cntt vì alias không trùng — muốn
 * multi-field thật thì khai alias đó ở cả 2 field, xem `MAJOR_FIELD_OVERRIDES` cho ngoại lệ 1-lần).
 */
const RULES: readonly FieldMappingRule[] = FIELDS.flatMap((field) =>
  field.aliases.map((alias) => ({ fieldId: field.id, pattern: normalizeForLandingSearch(alias) }))
);

/**
 * Ghi đè thủ công cho 1 ngành cụ thể của 1 trường khi rule chung map sai/thiếu — key dạng
 * "schoolId:programId". KHÔNG dùng để "gán" field cho ngành chưa rõ nội dung; chỉ sửa lỗi rule.
 */
export const MAJOR_FIELD_OVERRIDES: Readonly<Record<string, readonly FieldId[]>> = {
  // "Rang - Ham - Mat" (tên ngành nhập tay có dấu gạch nối/khoảng trắng khác chuẩn) không khớp
  // substring "răng hàm mặt" do format khác — ghi đè thủ công thay vì nới lỏng rule chung.
  'uhs:uhs-7720501': ['y-duoc-suc-khoe'],
};

/** Map 1 tên ngành (chưa normalize) sang danh sách field khớp — không khớp gì → mảng rỗng, KHÔNG
 * đoán field gần đúng nhất. */
export function mapProgramNameToFields(programName: string): FieldId[] {
  const normalized = normalizeForLandingSearch(programName);
  const matched = new Set<FieldId>();
  for (const rule of RULES) {
    if (normalized.includes(rule.pattern)) matched.add(rule.fieldId);
  }
  return [...matched];
}
