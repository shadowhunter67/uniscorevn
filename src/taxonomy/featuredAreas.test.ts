import { describe, expect, it } from 'vitest';
import { deriveLargeTrainingAreas, MANUAL_FEATURED_AREAS } from './featuredAreas';
import { MAJOR_OFFERINGS } from './majorOfferings';

describe('featuredAreas', () => {
  it('MANUAL_FEATURED_AREAS rỗng là trạng thái hợp lệ (chưa research nguồn)', () => {
    expect(MANUAL_FEATURED_AREAS).toEqual([]);
  });

  it('mọi entry thủ công (nếu có) đều phải có evidenceUrl + retrievedAt, trừ large_training_area', () => {
    for (const area of MANUAL_FEATURED_AREAS) {
      if (area.reason === 'large_training_area') continue;
      expect(area.evidenceUrl, `${area.schoolId}/${area.fieldId} thiếu evidenceUrl`).toBeTruthy();
      expect(area.retrievedAt, `${area.schoolId}/${area.fieldId} thiếu retrievedAt`).toBeTruthy();
    }
  });

  it('large_training_area chỉ derive cho trường có ít nhất 1 ngành đã map field', () => {
    const derived = deriveLargeTrainingAreas();
    const mappedSchoolIds = new Set(MAJOR_OFFERINGS.filter((o) => o.fieldIds.length > 0).map((o) => o.schoolId));
    for (const area of derived) {
      expect(mappedSchoolIds.has(area.schoolId)).toBe(true);
      expect(area.note).toContain('ngành đã phân loại');
    }
  });

  it('không derive area cho trường không có trong programCatalogBySchool', () => {
    const derived = deriveLargeTrainingAreas();
    expect(derived.every((area) => area.schoolId !== 'not-a-real-school')).toBe(true);
  });
});
