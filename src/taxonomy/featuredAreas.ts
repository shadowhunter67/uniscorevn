import type { FieldId } from './fields';
import { MAJOR_OFFERINGS } from './majorOfferings';

/**
 * "Lĩnh vực trọng điểm/mũi nhọn" — KHÔNG được tự viết "trường X mạnh CNTT" nếu không có evidence.
 * Mỗi entry phải nói rõ LÝ DO:
 * - official_priority: trường tự công bố đây là lĩnh vực trọng điểm (cần nguồn chính thức).
 * - large_training_area: trường có nhiều chương trình trong lĩnh vực này (derive được từ số liệu
 *   thật, KHÔNG cần nguồn ngoài — nhưng chỉ là "đào tạo nhiều", không phải "mạnh").
 * - subject_ranking: có xếp hạng ngành/lĩnh vực từ nguồn ranking (cần nguồn).
 * - editorial_verified: biên tập viên xác minh thủ công có nguồn cụ thể.
 */
export type FeaturedAreaReason = 'official_priority' | 'large_training_area' | 'subject_ranking' | 'editorial_verified';

export interface FeaturedArea {
  schoolId: string;
  fieldId: FieldId;
  reason: FeaturedAreaReason;
  /** Bắt buộc với 3/4 reason (trừ large_training_area — tự derive từ dữ liệu ngành đã có, không
   * cần nguồn ngoài vì số liệu đã có nguồn từ chính programCatalog). */
  evidenceUrl?: string;
  evidenceTitle?: string;
  retrievedAt?: string;
  note: string;
}

/**
 * Rỗng — chưa có entry nào cho official_priority/subject_ranking/editorial_verified vì chưa
 * research nguồn. Thêm entry mới PHẢI kèm evidenceUrl + retrievedAt thật, xem test
 * `featuredAreas.test.ts`. Đây là backlog P3 (research thủ công từng trường).
 */
export const MANUAL_FEATURED_AREAS: readonly FeaturedArea[] = [];

const LARGE_TRAINING_AREA_MIN_COUNT = 5;
const LARGE_TRAINING_AREA_MIN_SHARE = 0.25;

/**
 * Duy nhất reason tự derive được — dựa trên số ngành THẬT đã map field cho từng trường (không cần
 * research thêm vì programCatalog đã có nguồn). Ngưỡng: field đó có >=5 ngành VÀ chiếm >=25% tổng
 * số ngành đã map field của trường đó.
 */
export function deriveLargeTrainingAreas(): FeaturedArea[] {
  const countBySchoolField = new Map<string, number>();
  const totalMappedBySchool = new Map<string, number>();

  for (const offering of MAJOR_OFFERINGS) {
    if (offering.fieldIds.length === 0) continue;
    totalMappedBySchool.set(offering.schoolId, (totalMappedBySchool.get(offering.schoolId) ?? 0) + 1);
    for (const fieldId of offering.fieldIds) {
      const key = `${offering.schoolId}:${fieldId}`;
      countBySchoolField.set(key, (countBySchoolField.get(key) ?? 0) + 1);
    }
  }

  const result: FeaturedArea[] = [];
  for (const [key, count] of countBySchoolField) {
    const [schoolId, fieldId] = key.split(':') as [string, FieldId];
    const total = totalMappedBySchool.get(schoolId) ?? 0;
    if (count < LARGE_TRAINING_AREA_MIN_COUNT) continue;
    if (total === 0 || count / total < LARGE_TRAINING_AREA_MIN_SHARE) continue;
    result.push({
      schoolId,
      fieldId,
      reason: 'large_training_area',
      note: `Đào tạo ${count}/${total} ngành đã phân loại thuộc lĩnh vực này.`,
    });
  }
  return result;
}

export function getFeaturedAreasForSchool(schoolId: string): FeaturedArea[] {
  return [...MANUAL_FEATURED_AREAS, ...deriveLargeTrainingAreas()].filter((area) => area.schoolId === schoolId);
}
