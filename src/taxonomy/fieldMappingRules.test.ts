import { describe, expect, it } from 'vitest';
import { mapProgramNameToFields, MAJOR_FIELD_OVERRIDES } from './fieldMappingRules';
import { FIELDS } from './fields';
import { MAJOR_OFFERINGS } from './majorOfferings';

describe('fieldMappingRules', () => {
  it('ngành không khớp alias nào trả về mảng rỗng — không đoán field', () => {
    expect(mapProgramNameToFields('Khảo cổ học thiên văn ngoài hành tinh')).toEqual([]);
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

/**
 * Audit 2 alias RỘNG thêm ở batch trước ('kinh doanh', 'giáo dục') — 2026-09-08. Đã duyệt tay toàn
 * bộ 45 ngành mà alias đó là lý do DUY NHẤT khiến ngành được gán field (16 ngành với 'kinh doanh',
 * 29 ngành với 'giáo dục'). Kết quả: 3 false positive, đều là ngành Luật của UEL.
 */
describe('audit alias rộng: "kinh doanh"', () => {
  it('vẫn bắt đúng những ngành kinh doanh mà alias hẹp hơn không cứu được', () => {
    for (const name of ['Kinh doanh số', 'Kinh doanh nông nghiệp', 'Thống kê kinh doanh', 'Kinh doanh thương mại']) {
      expect(mapProgramNameToFields(name), name).toContain('kinh-te-quan-tri');
    }
  });

  it('FALSE POSITIVE đã sửa: "Luật kinh doanh ..." là ngành LUẬT, không phải ngành kinh doanh', () => {
    // Rule chung vẫn map sai (substring không biểu diễn được trật tự từ) — đó là lý do phải override.
    expect(mapProgramNameToFields('Luật kinh doanh (Chuyên ngành Luật Kinh doanh)')).toContain('kinh-te-quan-tri');
    for (const key of ['uel:luat-kinh-doanh', 'uel:luat-thuong-mai-quoc-te', 'uel:luat-thuong-mai-quoc-te-ta']) {
      expect(MAJOR_FIELD_OVERRIDES[key], key).toEqual(['luat']);
    }
  });

  it('override thắng rule chung trong danh sách ngành thật', () => {
    for (const programId of ['luat-kinh-doanh', 'luat-thuong-mai-quoc-te', 'luat-thuong-mai-quoc-te-ta']) {
      const offering = MAJOR_OFFERINGS.find((o) => o.schoolId === 'uel' && o.programId === programId);
      expect(offering?.fieldIds, programId).toEqual(['luat']);
      expect(offering?.mappingSource).toBe('editorial');
    }
  });
});

describe('audit alias rộng: "giáo dục"', () => {
  it('KHÔNG có false positive — mọi ngành chứa "giáo dục" đều thuộc lĩnh vực giáo dục', () => {
    // Mẫu đại diện cho 29 ngành đã duyệt tay, gồm cả các tên dài dễ nghi ngờ nhất.
    for (const name of [
      'Giáo dục Mầm non',
      'Giáo dục Quốc phòng - An ninh',
      'Giáo dục Thể chất',
      'Công nghệ giáo dục',
      'Quản trị chất lượng giáo dục',
      'Ho tro Giao duc nguoi khuyet tat',
    ]) {
      expect(mapProgramNameToFields(name), name).toContain('su-pham-giao-duc');
    }
  });

  it('"Tâm lý học giáo dục" map ĐỒNG THỜI 2 field (đúng, không phải false positive)', () => {
    expect(mapProgramNameToFields('Tâm lý học giáo dục')).toEqual(expect.arrayContaining(['su-pham-giao-duc', 'khoa-hoc-xa-hoi']));
  });
});
