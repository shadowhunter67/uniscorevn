import { programCatalogBySchool } from '../compare/programCatalog';
import { mapProgramNameToFields, MAJOR_FIELD_OVERRIDES } from './fieldMappingRules';
import type { MajorOffering } from './majorOffering';

/** Ngày build danh sách này — cập nhật khi rule/alias thay đổi thật, không phải mỗi lần chạy. */
const MAPPED_AT = '2026-09-07';

/**
 * Map field cho toàn bộ ngành đã có trong `programCatalogBySchool` (11 trường có dữ liệu ngành
 * thật). KHÔNG chạy cho 296 trường còn lại — không có dữ liệu ngành thật thì không có gì để map,
 * tránh suy diễn field cho ngành không tồn tại trong hệ thống. Ngành không khớp rule nào ⇒
 * `fieldIds: []`, không đoán field gần đúng.
 */
export function buildMajorOfferings(): MajorOffering[] {
  const offerings: MajorOffering[] = [];
  for (const [schoolId, programs] of Object.entries(programCatalogBySchool)) {
    for (const program of programs) {
      const overrideKey = `${schoolId}:${program.programId}`;
      const override = MAJOR_FIELD_OVERRIDES[overrideKey];
      const fieldIds = override ?? mapProgramNameToFields(program.name);
      offerings.push({
        schoolId,
        programId: program.programId,
        fieldIds,
        mappingSource: override ? 'editorial' : 'name-rule',
        mappedAt: MAPPED_AT,
      });
    }
  }
  return offerings;
}

export const MAJOR_OFFERINGS: readonly MajorOffering[] = buildMajorOfferings();
