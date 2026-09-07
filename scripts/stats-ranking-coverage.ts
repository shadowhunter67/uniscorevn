import { computeRankingResearchPriority, getRankingEntityCounts, summarizeRankingCoverageBySystem } from '../src/ranking/rankingCoverage';
import { RANKING_SYSTEM_LABELS } from '../src/ranking/rankingTypes';

const entityCounts = getRankingEntityCounts();
console.log('=== UniScoreVN Ranking Coverage ===');
console.log('');
console.log(`Ranking entities: ${entityCounts.totalEntities} (${entityCounts.institutionEntities} institution + ${entityCounts.systemEntities} university_system)`);
console.log('');

const bySystem = summarizeRankingCoverageBySystem();
if (bySystem.length === 0) {
  console.log('Chưa có ranking record nào (RANKING_RECORDS rỗng) — chưa research nguồn thật cho hệ thống nào.');
} else {
  console.log('Theo hệ thống ranking:');
  for (const entry of bySystem) {
    console.log(`  ${RANKING_SYSTEM_LABELS[entry.system]}: ${entry.recordCount} record, ${entry.entityCount} entity`);
  }
}

console.log('');
console.log('Priority gaps (nội bộ, không hiển thị end-user) — top 15 trường nên research trước:');
const priority = computeRankingResearchPriority().slice(0, 15);
priority.forEach((entry, index) => {
  console.log(`  ${index + 1}. ${entry.schoolName} (${entry.schoolId}) — score ${entry.priorityScore.toFixed(2)} [${entry.reasons.join(', ')}]`);
});
