import type { FieldId } from './fields';

export type MajorMappingSource = 'name-rule' | 'official-document' | 'editorial';

/**
 * Lớp field gắn THÊM vào 1 ngành đã có sẵn trong `programCatalogBySchool` (compare/programCatalog.ts)
 * — KHÔNG lưu lại name/code (tránh trùng lặp source-of-truth), chỉ khai fieldIds + xuất xứ mapping,
 * khóa theo (schoolId, programId).
 */
export interface MajorOffering {
  schoolId: string;
  programId: string;
  fieldIds: readonly FieldId[];
  mappingSource: MajorMappingSource;
  mappedAt: string;
}
