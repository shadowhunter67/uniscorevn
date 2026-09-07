import { describe, expect, it } from 'vitest';
import { schoolRegistry } from '../schools';
import { getUniversitySystemId } from '../data/universitySystems';
import { resolveRankingsForSchool } from './rankingEntities';

/**
 * Dùng `import.meta.glob` (Vite-native, chạy được trong vitest, không cần node:fs/@types/node) để
 * đọc raw source của core/compare/evaluation/recommend — assert KHÔNG file nào import từ
 * `src/ranking` (ranking phải tách biệt hoàn toàn khỏi admission scoring/competitiveness).
 */
const ISOLATED_SOURCE_FILES = import.meta.glob(
  ['../core/**/*.ts', '../core/**/*.tsx', '../compare/**/*.ts', '../compare/**/*.tsx', '../evaluation/**/*.ts', '../evaluation/**/*.tsx', '../recommend/**/*.ts', '../recommend/**/*.tsx'],
  { query: '?raw', import: 'default', eager: true }
) as Record<string, string>;

describe('ranking isolation', () => {
  it('core/compare/evaluation/recommend không import gì từ src/ranking', () => {
    const offenders = Object.entries(ISOLATED_SOURCE_FILES)
      .filter(([path]) => !path.includes('ranking')) // phòng hờ nếu glob pattern lỡ khớp nhầm
      .filter(([, content]) => /from\s+['"][^'"]*\/ranking\//.test(content))
      .map(([path]) => path);

    expect(offenders, `Các file sau import từ src/ranking (vi phạm cách ly): ${offenders.join(', ')}`).toEqual([]);
  });

  it('quét được ít nhất vài chục file (glob pattern không bị sai/rỗng)', () => {
    expect(Object.keys(ISOLATED_SOURCE_FILES).length).toBeGreaterThan(20);
  });

  it('resolveRankingsForSchool trả về ownRecords và parentSystemRecords TÁCH BIỆT (không merge)', () => {
    const result = resolveRankingsForSchool('vnuuet');
    expect(result).toHaveProperty('ownRecords');
    expect(result).toHaveProperty('parentSystemRecords');
    expect(Array.isArray(result.ownRecords)).toBe(true);
    expect(Array.isArray(result.parentSystemRecords)).toBe(true);
  });

  it('trường không thuộc cụm đại học nào -> parentSystemRecords luôn rỗng (không tự gán ranking hệ thống)', () => {
    const standaloneSchoolId = Object.keys(schoolRegistry).find((id) => getUniversitySystemId(id) === undefined);
    expect(standaloneSchoolId).toBeDefined();
    const result = resolveRankingsForSchool(standaloneSchoolId!);
    expect(result.parentSystemRecords).toEqual([]);
  });
});
