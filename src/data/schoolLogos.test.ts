import { describe, expect, it } from 'vitest';
import { isKnownSchoolId, SCHOOL_LOGOS } from './schoolLogos';

describe('schoolLogos', () => {
  it('registry rỗng vẫn là trạng thái hợp lệ (chưa có logo thật nào được xác minh)', () => {
    expect(SCHOOL_LOGOS).toEqual({});
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
