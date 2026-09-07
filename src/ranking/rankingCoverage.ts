import { deriveInstitutionSupportStatus, getSchoolEntityLevel } from '../data/institutionCoverage';
import { schoolRegistry } from '../schools';
import { getUniversitySystemId } from '../data/universitySystems';
import { RANKING_ENTITIES } from './rankingEntities';
import { RANKING_RECORDS } from './rankingRecords';
import type { RankingSystem } from './rankingTypes';

export interface RankingCoverageBySystem {
  system: RankingSystem;
  recordCount: number;
  entityCount: number;
}

export function summarizeRankingCoverageBySystem(): RankingCoverageBySystem[] {
  const bySystem = new Map<RankingSystem, { records: number; entities: Set<string> }>();
  for (const record of RANKING_RECORDS) {
    const bucket = bySystem.get(record.system) ?? { records: 0, entities: new Set<string>() };
    bucket.records += 1;
    bucket.entities.add(record.entityId);
    bySystem.set(record.system, bucket);
  }
  return [...bySystem.entries()].map(([system, bucket]) => ({ system, recordCount: bucket.records, entityCount: bucket.entities.size }));
}

const SUPPORT_TIER_WEIGHT: Record<ReturnType<typeof deriveInstitutionSupportStatus>, number> = {
  'verified-calculator': 3,
  'partial-calculator': 2,
  'eligibility-only': 1,
  researched: 0.5,
  'catalog-only': 0.2,
};

export interface RankingResearchPriorityEntry {
  schoolId: string;
  schoolName: string;
  /** Internal, KHÔNG expose cho end-user — chỉ dùng để dev sắp xếp thứ tự research. */
  priorityScore: number;
  reasons: string[];
}

/**
 * Priority score NỘI BỘ (dev tooling only) — ưu tiên research ranking cho trường: đã có support
 * tier cao (nhiều người dùng thật quan tâm) + thuộc 1 cụm đại học lớn (ranking hệ thống liên quan)
 * + CHƯA có ranking record riêng nào (tránh lặp lại research đã xong). Không phải model khoa học,
 * chỉ là heuristic sắp xếp thứ tự — xem `stats-ranking-coverage.ts`.
 */
export function computeRankingResearchPriority(): RankingResearchPriorityEntry[] {
  const schoolsWithOwnRecord = new Set(RANKING_RECORDS.map((record) => record.entityId));

  return Object.values(schoolRegistry)
    .filter((school) => getSchoolEntityLevel(school) !== 'faculty' && getSchoolEntityLevel(school) !== 'school')
    .map((school) => {
      const tierWeight = SUPPORT_TIER_WEIGHT[deriveInstitutionSupportStatus(school)];
      const inSystem = getUniversitySystemId(school.id) !== undefined;
      const hasOwnRecord = schoolsWithOwnRecord.has(school.id);
      const reasons: string[] = [];
      let score = tierWeight;
      reasons.push(`support-tier-weight=${tierWeight}`);
      if (inSystem) {
        score += 0.5;
        reasons.push('member-of-university-system');
      }
      if (hasOwnRecord) {
        score *= 0.1;
        reasons.push('already-has-ranking-record (giảm ưu tiên)');
      }
      return { schoolId: school.id, schoolName: school.name, priorityScore: score, reasons };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);
}

export function getRankingEntityCounts() {
  return {
    totalEntities: RANKING_ENTITIES.length,
    institutionEntities: RANKING_ENTITIES.filter((e) => e.scope === 'institution').length,
    systemEntities: RANKING_ENTITIES.filter((e) => e.scope === 'university_system').length,
  };
}
