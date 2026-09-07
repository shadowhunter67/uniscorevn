import { describe, expect, it } from 'vitest';
import {
  averageSubjectAcrossSemesters,
  hasAnySemesterScore,
  sumCombinationAveragesAcrossSemesters,
  TRANSCRIPT_SEMESTER_KEYS,
  type TranscriptBySemester,
} from './transcriptSemesters';

/** TB tay: math (8+8+8+8+8+8)/6 = 8; physics (6+7+8+9+7+7)/6 = 44/6 = 7,3333...; english (9+9+9+9+9+9)/6 = 9. */
const full: TranscriptBySemester = {
  grade10Sem1: { math: 8, physics: 6, english: 9 },
  grade10Sem2: { math: 8, physics: 7, english: 9 },
  grade11Sem1: { math: 8, physics: 8, english: 9 },
  grade11Sem2: { math: 8, physics: 9, english: 9 },
  grade12Sem1: { math: 8, physics: 7, english: 9 },
  grade12Sem2: { math: 8, physics: 7, english: 9 },
};

describe('averageSubjectAcrossSemesters', () => {
  it('tính trung bình cộng đơn giản của đúng 6 học kỳ', () => {
    expect(averageSubjectAcrossSemesters(full, 'math').average).toBe(8);
    expect(averageSubjectAcrossSemesters(full, 'english').average).toBe(9);
    expect(averageSubjectAcrossSemesters(full, 'physics').average).toBeCloseTo(44 / 6, 10);
  });

  it('thiếu 1 học kỳ bất kỳ → không tính trung bình trên tập con', () => {
    const { grade11Sem2: _dropped, ...missingOne } = full;
    const result = averageSubjectAcrossSemesters(missingOne, 'math');
    expect(result.average).toBeUndefined();
    expect(result.missingSemesters).toEqual(['grade11Sem2']);
  });

  it('không có bySemester → báo thiếu cả 6 học kỳ, KHÔNG fallback sang TB năm', () => {
    const result = averageSubjectAcrossSemesters(undefined, 'math');
    expect(result.average).toBeUndefined();
    expect(result.missingSemesters).toEqual([...TRANSCRIPT_SEMESTER_KEYS]);
  });
});

describe('sumCombinationAveragesAcrossSemesters', () => {
  it('tổng TB 3 môn của 6 học kỳ, thang 30 — cộng TB chưa làm tròn rồi mới làm tròn tổng', () => {
    const result = sumCombinationAveragesAcrossSemesters(full, ['math', 'physics', 'english']);
    // 8 + 44/6 + 9 = 24,3333... → 24,33
    expect(result.total30).toBe(24.33);
    expect(result.subjectAverages).toEqual([
      { subjectId: 'math', average: 8 },
      { subjectId: 'physics', average: 7.33 },
      { subjectId: 'english', average: 9 },
    ]);
  });

  it('môn nào thiếu học kỳ thì báo đúng môn đó, tổng để trống', () => {
    const result = sumCombinationAveragesAcrossSemesters(full, ['math', 'chemistry']);
    expect(result.total30).toBeUndefined();
    expect(result.missingBySubject).toEqual([{ subjectId: 'chemistry', missingSemesters: [...TRANSCRIPT_SEMESTER_KEYS] }]);
  });
});

describe('hasAnySemesterScore', () => {
  it('phân biệt hồ sơ chỉ có TB năm với hồ sơ có điểm học kỳ', () => {
    expect(hasAnySemesterScore({ transcript: { grade10: { math: 8 } } })).toBe(false);
    expect(hasAnySemesterScore({})).toBe(false);
    expect(hasAnySemesterScore({ transcript: { bySemester: { grade10Sem1: { math: 8 } } } })).toBe(true);
    expect(hasAnySemesterScore({ transcript: { bySemester: {} } })).toBe(false);
  });
});
