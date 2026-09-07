import { getProgramCatalogEntry, programCatalogBySchool } from '../compare/programCatalog';
import type { FieldId } from './fields';
import { MAJOR_OFFERINGS } from './majorOfferings';
import type { MajorOffering } from './majorOffering';

/**
 * Query layer — file DUY NHẤT trong `src/taxonomy/` được phép cần `schoolRegistry` gián tiếp qua
 * consumer (chính file này không import `schoolRegistry`, nhưng gọi từ UI đã có sẵn schoolRegistry
 * — giữ tách bạch để `fieldMappingRules`/`majorOfferings` không phụ thuộc registry, tránh lặp lại
 * rủi ro circular-import mà `programCatalog.ts` đã né).
 */
export function getFieldsForSchool(schoolId: string): FieldId[] {
  const fields = new Set<FieldId>();
  for (const offering of MAJOR_OFFERINGS) {
    if (offering.schoolId !== schoolId) continue;
    for (const fieldId of offering.fieldIds) fields.add(fieldId);
  }
  return [...fields];
}

export function getSchoolIdsForField(fieldId: FieldId): string[] {
  const schoolIds = new Set<string>();
  for (const offering of MAJOR_OFFERINGS) {
    if (offering.fieldIds.includes(fieldId)) schoolIds.add(offering.schoolId);
  }
  return [...schoolIds];
}

export interface MajorForField {
  schoolId: string;
  programId: string;
  name: string;
  code?: string;
}

export function getMajorsForSchoolField(schoolId: string, fieldId: FieldId): MajorForField[] {
  const results: MajorForField[] = [];
  for (const offering of MAJOR_OFFERINGS) {
    if (offering.schoolId !== schoolId || !offering.fieldIds.includes(fieldId)) continue;
    const entry = getProgramCatalogEntry(schoolId, offering.programId);
    if (entry) results.push({ schoolId, programId: entry.programId, name: entry.name, code: entry.code });
  }
  return results;
}

/** Danh sách schoolId đã có ít nhất 1 ngành trong `programCatalogBySchool` — dùng để biết trường
 * nào CÓ dữ liệu ngành thật (khác với "chưa research" — taxonomy chỉ phủ đúng tập này). */
export function getSchoolIdsWithProgramData(): string[] {
  return Object.keys(programCatalogBySchool);
}

export function getUnmappedMajorOfferings(): MajorOffering[] {
  return MAJOR_OFFERINGS.filter((offering) => offering.fieldIds.length === 0);
}
