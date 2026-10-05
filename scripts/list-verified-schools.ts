/**
 * In ra (stdout, JSON một dòng) danh sách id các trường đang ở mức `verified-calculator`, lấy từ
 * `schoolRegistry` + `deriveInstitutionSupportStatus` — cùng nguồn với `npm run stats:coverage`.
 *
 * Dùng bởi `uniscorevn-data/pipelines/source-watch/checkSources.ts` (repo private) để biết trường nào
 * đã xác minh mà không phải đoán bằng regex trên file. Script chỉ đọc, không ghi gì.
 *
 * Usage: npm run -s list:verified
 */
import { schoolRegistry } from '../src/schools';
import { deriveInstitutionSupportStatus } from '../src/data/institutionCoverage';

const ids = Object.entries(schoolRegistry)
  .filter(([, school]) => deriveInstitutionSupportStatus(school) === 'verified-calculator')
  .map(([id]) => id)
  .sort();

process.stdout.write(`${JSON.stringify(ids)}\n`);
