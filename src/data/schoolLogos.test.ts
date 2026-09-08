import { describe, expect, it } from 'vitest';
import { isKnownSchoolId, SCHOOL_LOGOS } from './schoolLogos';

describe('schoolLogos', () => {
  it('mọi key trong registry phải trùng schoolId của chính record đó', () => {
    for (const [schoolId, record] of Object.entries(SCHOOL_LOGOS)) {
      expect(record.schoolId, `key ${schoolId} không khớp record.schoolId`).toBe(schoolId);
    }
  });

  it('mọi record (nếu có) phải khai đủ nguồn + ngày lấy + trỏ tới school có thật', () => {
    for (const [schoolId, record] of Object.entries(SCHOOL_LOGOS)) {
      expect(isKnownSchoolId(schoolId), `${schoolId} không có trong schoolRegistry`).toBe(true);
      expect(record.sourceUrl, `${schoolId} thiếu sourceUrl`).toBeTruthy();
      expect(record.retrievedAt, `${schoolId} thiếu retrievedAt`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(record.file, `${schoolId} thiếu file`).toBeTruthy();
    }
  });
});
