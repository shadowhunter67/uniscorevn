import type { RankingRecord } from './rankingTypes';

/**
 * RỖNG — chưa research ranking thật cho bất kỳ trường/cụm nào. KHÔNG bịa số hạng. Mỗi record thêm
 * vào đây bắt buộc: `sourceUrl` + `sourceTitle` + `retrievedAt` trỏ tới ấn bản ranking công khai
 * thật (QS/THE/CWUR/ARWU/VNUR...). Xem `rankingRecords.test.ts` cho invariant bắt buộc.
 */
export const RANKING_RECORDS: readonly RankingRecord[] = [];
