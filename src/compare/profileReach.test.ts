import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../core/applicantProfile';
import { measureProfileReach } from './profileReach';

const EMPTY: ApplicantProfile = {};
const RICH: ApplicantProfile = {
  thpt: { scores: { math: 9, literature: 8, english: 8.5, physics: 8, chemistry: 8 } },
  transcript: {
    grade10: { math: 9, literature: 8, english: 8.5 },
    grade11: { math: 9, literature: 8, english: 8.5 },
    grade12: { math: 9, literature: 8, english: 8.5 },
  },
  exams: { vact: { total: 900 } },
  preferredCombinationId: 'A00',
};

describe('profileReach', () => {
  it('hồ sơ rỗng KHÔNG được tính là đã tính ra điểm cho ngành nào', () => {
    const reach = measureProfileReach(EMPTY);
    expect(reach.programsWithScore).toBe(0);
    expect(reach.schoolsWithScore).toBe(0);
  });

  it('có mẫu số thật lấy từ danh mục ngành, không hardcode', () => {
    expect(measureProfileReach(EMPTY).programsConsidered).toBeGreaterThan(0);
  });

  it('hồ sơ đầy đủ tính ra điểm cho nhiều ngành hơn hồ sơ rỗng', () => {
    const rich = measureProfileReach(RICH);
    expect(rich.programsWithScore).toBeGreaterThan(measureProfileReach(EMPTY).programsWithScore);
    expect(rich.schoolsWithScore).toBeGreaterThan(0);
  });

  it('số ngành ra điểm không bao giờ vượt tổng số ngành đem ra thử', () => {
    const rich = measureProfileReach(RICH);
    expect(rich.programsWithScore).toBeLessThanOrEqual(rich.programsConsidered);
  });
});
