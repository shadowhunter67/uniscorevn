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

  /**
   * Audit alias rộng 'kinh doanh' (2026-09-08) — 3 ngành LUẬT của UEL bị alias này kéo nhầm vào
   * `kinh-te-quan-tri`. Tên ngành là "Luật kinh doanh ...": danh từ chính là "Luật", "kinh doanh"
   * chỉ là bổ ngữ chỉ LĨNH VỰC LUẬT ĐIỀU CHỈNH, không biến ngành luật thành ngành kinh doanh.
   * Đây đúng lớp lỗi mà alias 'toán' từng gây với "Kế toán".
   *
   * Vì sao ghi đè thay vì siết alias: 'kinh doanh' vẫn cần thiết và ĐÚNG cho 13 ngành khác
   * ("Kinh doanh số", "Kinh doanh nông nghiệp", "Thống kê kinh doanh"...), và siết theo ranh giới
   * từ cũng không cứu được — "Luật kinh doanh" có "kinh doanh" đứng đúng ranh giới từ. Lỗi nằm ở
   * TRẬT TỰ TỪ (bổ ngữ đứng sau danh từ chính), thứ mà so khớp substring không biểu diễn được.
   *
   * Ghi đè REPLACE cả danh sách field (xem `buildMajorOfferings`), nên tiện thể sửa luôn một lỗi
   * thứ hai của biến thể "(Tiếng Anh)": hậu tố này chỉ nói ngành DẠY BẰNG tiếng Anh, nhưng alias
   * 'tiếng anh' của field `ngon-ngu-quoc-te` bắt phải — ngành luật không phải ngành ngoại ngữ.
   */
  'uel:luat-kinh-doanh': ['luat'],
  'uel:luat-thuong-mai-quoc-te': ['luat'],
  'uel:luat-thuong-mai-quoc-te-ta': ['luat'],
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
