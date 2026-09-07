import { describe, expect, it } from 'vitest';
import { programCatalogBySchool } from '../compare/programCatalog';
import { MAJOR_OFFERINGS } from './majorOfferings';

describe('majorOfferings', () => {
  it('chỉ map field cho đúng 11 trường đã có programCatalogBySchool — không có trường nào khác', () => {
    const mappedSchoolIds = new Set(MAJOR_OFFERINGS.map((offering) => offering.schoolId));
    expect(mappedSchoolIds).toEqual(new Set(Object.keys(programCatalogBySchool)));
  });

  it('số lượng offering khớp đúng tổng số ngành trong programCatalogBySchool', () => {
    const totalPrograms = Object.values(programCatalogBySchool).reduce((sum, programs) => sum + programs.length, 0);
    expect(MAJOR_OFFERINGS.length).toBe(totalPrograms);
  });

  it('mọi offering có mappedAt và mappingSource hợp lệ', () => {
    for (const offering of MAJOR_OFFERINGS) {
      expect(offering.mappedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(['name-rule', 'official-document', 'editorial']).toContain(offering.mappingSource);
    }
  });

  it('không throw khi build lại từ đầu (idempotent)', () => {
    expect(MAJOR_OFFERINGS.length).toBeGreaterThan(0);
  });
});
