import { describe, expect, it } from 'vitest';
import { mapProgramNameToFields } from './fieldMappingRules';
import { FIELDS } from './fields';

describe('fieldMappingRules', () => {
  it('ngành không khớp alias nào trả về mảng rỗng — không đoán field', () => {
    expect(mapProgramNameToFields('Kỹ thuật hạt nhân vũ trụ')).toEqual([]);
  });

  it('map đúng field cho tên ngành rõ ràng', () => {
    expect(mapProgramNameToFields('Công nghệ thông tin')).toContain('cntt-may-tinh');
    expect(mapProgramNameToFields('Khoa học dữ liệu')).toContain('ai-du-lieu');
    expect(mapProgramNameToFields('Luật kinh tế')).toEqual(expect.arrayContaining(['luat', 'kinh-te-quan-tri']));
  });

  it('accent-insensitive — không phân biệt hoa/thường/dấu', () => {
    expect(mapProgramNameToFields('CONG NGHE THONG TIN')).toContain('cntt-may-tinh');
  });

  it('mọi field trong FIELDS đều có ít nhất 1 alias', () => {
    for (const field of FIELDS) {
      expect(field.aliases.length, `field ${field.id} không có alias nào`).toBeGreaterThan(0);
    }
  });

  it('id field là duy nhất', () => {
    const ids = FIELDS.map((field) => field.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
