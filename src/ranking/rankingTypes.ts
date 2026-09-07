/**
 * Ranking (QS/THE/CWUR/VNUR...) là subsystem TÁCH BIỆT hoàn toàn khỏi admission scoring/
 * competitiveness — chỉ dùng để tham khảo/ưu tiên research/filter/sort, KHÔNG BAO GIỜ feed vào
 * đánh giá cạnh tranh (xem `rankingIsolation.test.ts`). Ranking của "trường mẹ" (university_system,
 * vd ĐHQG Hà Nội) KHÔNG được tự động gán cho trường thành viên — xem `rankingEntities.ts`.
 */
export type RankingSystem = 'qs-world' | 'qs-asia' | 'the-world' | 'the-asia' | 'cwur' | 'arwu' | 'usnews' | 'vnur';

export type RankingEntityScope = 'institution' | 'university_system';

export interface RankingEntity {
  entityId: string;
  displayName: string;
  scope: RankingEntityScope;
  /** Có nếu scope === 'institution' — khớp `schoolRegistry` id. */
  schoolId?: string;
  /** Có nếu scope === 'university_system' — danh sách schoolId thành viên (KHÔNG được suy ra
   * ranking cho các id này từ record của entity cha). */
  memberSchoolIds?: readonly string[];
}

export interface RankingRecord {
  entityId: string;
  system: RankingSystem;
  edition: string;
  kind: 'overall' | 'subject';
  subject?: string;
  rank?: number;
  rankRangeLabel?: string;
  sourceUrl: string;
  sourceTitle: string;
  retrievedAt: string;
  note?: string;
}

export const RANKING_SYSTEM_LABELS: Record<RankingSystem, string> = {
  'qs-world': 'QS World University Rankings',
  'qs-asia': 'QS Asia University Rankings',
  'the-world': 'Times Higher Education World',
  'the-asia': 'Times Higher Education Asia',
  cwur: 'CWUR',
  arwu: 'ARWU (Shanghai Ranking)',
  usnews: 'U.S. News Best Global Universities',
  vnur: 'VNUR (Bảng xếp hạng đại học Việt Nam)',
};
