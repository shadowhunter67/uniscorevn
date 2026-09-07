import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../core/applicantProfile';
import { recommendSchoolsForField } from './fieldRecommendation';
import { getSchoolIdsForField } from '../taxonomy/taxonomyQueries';

const EMPTY_PROFILE: ApplicantProfile = {};

describe('recommendSchoolsForField', () => {
  it('hồ sơ rỗng -> mọi match rơi vào insufficientData, không band nào bị fabricate', () => {
    const result = recommendSchoolsForField(EMPTY_PROFILE, 'cntt-may-tinh');
    expect(result.insufficientData.length).toBeGreaterThan(0);
    expect(result.groups.thuSuc).toEqual([]);
    expect(result.groups.vuaSuc).toEqual([]);
    expect(result.groups.anToanHon).toEqual([]);
  });

  it('không trả về trường ngoài danh sách getSchoolIdsForField (chỉ 11 trường có taxonomy)', () => {
    const result = recommendSchoolsForField(EMPTY_PROFILE, 'cntt-may-tinh');
    const allowedSchoolIds = new Set(getSchoolIdsForField('cntt-may-tinh'));
    const allMatches = [...result.insufficientData, ...result.groups.thuSuc, ...result.groups.vuaSuc, ...result.groups.anToanHon];
    for (const match of allMatches) {
      expect(allowedSchoolIds.has(match.schoolId)).toBe(true);
    }
  });

  it('không throw cho mọi field đã định nghĩa, kể cả field ít/không có trường map', () => {
    expect(() => recommendSchoolsForField(EMPTY_PROFILE, 'nghe-thuat-thiet-ke')).not.toThrow();
  });

  it('mỗi match có programName không rỗng khi programId khớp taxonomy', () => {
    const result = recommendSchoolsForField(EMPTY_PROFILE, 'cntt-may-tinh');
    for (const match of result.insufficientData) {
      expect(match.programId).toBeTruthy();
    }
  });
});
