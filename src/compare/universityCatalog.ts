import type { SchoolModule } from '../core/schoolModule';
import { schoolRegistry } from '../schools';
import { normalizeVietnameseText } from './comparisonSelection';
import { programCatalogBySchool, getProgramCatalogEntry as getProgramCatalogEntryFromCatalog, type ProgramCatalogEntry } from './programCatalog';

export type { ProgramCatalogEntry };
export type UniversityCapability = 'exact' | 'partial' | 'eligibility' | 'catalog-only';

export interface UniversityCatalogEntry {
  schoolId: string;
  shortName: string;
  fullName: string;
  region?: string;
  city?: string;
  admissionCode?: string;
  aliases?: readonly string[];
  programs: ProgramCatalogEntry[];
  capability: UniversityCapability;
}

function getCapability(module: SchoolModule): UniversityCapability {
  if (module.capabilities?.exactCalculator) return 'exact';
  if (module.capabilities?.partialCalculator) return 'partial';
  if (module.capabilities?.eligibility) return 'eligibility';
  return module.status === 'supported' ? 'exact' : 'catalog-only';
}

export const universityCatalog: UniversityCatalogEntry[] = Object.values(schoolRegistry)
  .map((module) => ({
    schoolId: module.id,
    shortName: module.shortName,
    fullName: module.name,
    region: module.id === 'agu' ? 'Mien Tay' : 'TP.HCM va vung lan can',
    city: module.id === 'agu' ? 'An Giang' : 'TP.HCM',
    admissionCode: module.admissionCode,
    aliases: module.aliases,
    programs: programCatalogBySchool[module.id] ?? [],
    capability: getCapability(module),
  }));

export function getUniversityCatalogEntry(schoolId: string): UniversityCatalogEntry | undefined {
  return universityCatalog.find((entry) => entry.schoolId === schoolId);
}

export const getProgramCatalogEntry = getProgramCatalogEntryFromCatalog;

/**
 * Nhãn nói UniScoreVN LÀM ĐƯỢC GÌ với trường này — KHÔNG nói gì về kết quả tuyển sinh, cũng KHÔNG
 * nói hồ sơ của thí sinh đã đủ input hay chưa (đó là trạng thái thứ ba, chỉ biết được sau khi
 * chọn xong ngành + chạy evaluator, xem `evaluationDisplayLabel`).
 *
 * 'exact' trước đây hiển thị "Chinh xac" — vừa mất dấu tiếng Việt, vừa dễ bị đọc thành "kết quả
 * chính xác/cam kết đúng". Nay "Tính đầy đủ điểm", đồng bộ với nhãn "Tính đầy đủ" của kết quả.
 */
export function getCapabilityLabel(capability: UniversityCapability, schoolId?: string): string {
  if (schoolId === 'ussh' && capability === 'exact') return 'Tính đầy đủ (hồ sơ phù hợp)';
  if (capability === 'exact') return 'Tính đầy đủ điểm';
  if (capability === 'partial') return 'Tính được một phần';
  if (capability === 'eligibility') return 'Chỉ kiểm tra điều kiện';
  return 'Có quy tắc tuyển sinh';
}

/** Trạng thái RIÊNG: có danh mục ngành hay không — tách khỏi nhãn năng lực tính điểm ở trên, vì
 * "trường có công thức" và "trường có dữ liệu ngành" là hai chuyện khác nhau. Trước đây hiển thị
 * "0 ngành có dữ liệu", đọc như một lỗi/số liệu trống chứ không nói rõ nghĩa. */
export function getProgramCatalogLabel(programCount: number): string {
  return programCount === 0 ? 'Chưa có dữ liệu ngành' : `${programCount} ngành trong danh mục`;
}

export function searchUniversityCatalog(query: string, entries: readonly UniversityCatalogEntry[] = universityCatalog): UniversityCatalogEntry[] {
  const normalizedQuery = normalizeVietnameseText(query);
  if (!normalizedQuery) return [...entries];
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);
  return entries.filter((entry) =>
    [entry.schoolId, entry.shortName, entry.fullName, entry.city, entry.region, entry.admissionCode, ...(entry.aliases ?? [])].some((value) => {
      const normalizedValue = normalizeVietnameseText(value ?? '');
      return normalizedValue.includes(normalizedQuery) || queryTokens.every((token) => normalizedValue.includes(token));
    })
  );
}

export function searchProgramCatalog(query: string, programs: readonly ProgramCatalogEntry[]): ProgramCatalogEntry[] {
  const normalizedQuery = normalizeVietnameseText(query);
  if (!normalizedQuery) return [...programs];
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);
  return programs.filter((program) =>
    [program.programId, program.code, program.name, program.campus, program.track].some((value) => {
      const normalizedValue = normalizeVietnameseText(value ?? '');
      return normalizedValue.includes(normalizedQuery) || queryTokens.every((token) => normalizedValue.includes(token));
    })
  );
}
