import { schoolRegistry } from '../schools';
import { UNIVERSITY_SYSTEMS } from '../data/universitySystems';
import { RANKING_RECORDS } from './rankingRecords';
import type { RankingEntity, RankingRecord } from './rankingTypes';

/**
 * Entity cấp `university_system` — sinh từ `UNIVERSITY_SYSTEMS` (nguồn thật duy nhất về cụm đại
 * học + thành viên, đã dùng cho landing filter). entityId dùng tiền tố `system:` để không trùng
 * namespace với entityId cấp institution (dùng thẳng schoolId).
 */
function buildSystemEntities(): RankingEntity[] {
  return UNIVERSITY_SYSTEMS.map((system) => ({
    entityId: `system:${system.id}`,
    displayName: system.name,
    scope: 'university_system' as const,
    memberSchoolIds: system.memberIds,
  }));
}

function buildInstitutionEntities(): RankingEntity[] {
  return Object.keys(schoolRegistry).map((schoolId) => ({
    entityId: schoolId,
    displayName: schoolRegistry[schoolId].name,
    scope: 'institution' as const,
    schoolId,
  }));
}

export const RANKING_ENTITIES: readonly RankingEntity[] = [...buildSystemEntities(), ...buildInstitutionEntities()];

const ENTITY_BY_ID = new Map(RANKING_ENTITIES.map((entity) => [entity.entityId, entity]));

export function getRankingEntity(entityId: string): RankingEntity | undefined {
  return ENTITY_BY_ID.get(entityId);
}

export interface SchoolRankingResolution {
  /** Ranking record gắn TRỰC TIẾP cho trường này (entityId === schoolId). */
  ownRecords: RankingRecord[];
  /** Ranking record của (các) cụm đại học mà trường này là thành viên — LUÔN tách riêng, không
   * bao giờ gộp/hiển thị như thể là ranking của riêng trường (type-level: 2 mảng khác nhau, không
   * có field nào merge chúng lại). */
  parentSystemRecords: { system: RankingEntity; records: RankingRecord[] }[];
}

/**
 * Điểm truy vấn DUY NHẤT cho UI — không tự query `RANKING_RECORDS` trực tiếp ở component để tránh
 * lặp lại logic phân biệt own/parent (chính là bug-class cần tránh: gán nhầm ranking hệ thống cho
 * trường thành viên).
 */
export function resolveRankingsForSchool(schoolId: string): SchoolRankingResolution {
  const ownRecords = RANKING_RECORDS.filter((record) => record.entityId === schoolId);

  const parentSystems = UNIVERSITY_SYSTEMS.filter((system) => system.memberIds.includes(schoolId));
  const parentSystemRecords = parentSystems
    .map((system) => {
      const entity = getRankingEntity(`system:${system.id}`);
      if (!entity) return undefined;
      const records = RANKING_RECORDS.filter((record) => record.entityId === entity.entityId);
      return records.length > 0 ? { system: entity, records } : undefined;
    })
    .filter((entry): entry is { system: RankingEntity; records: RankingRecord[] } => entry !== undefined);

  return { ownRecords, parentSystemRecords };
}
