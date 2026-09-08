import { describe, expect, it } from 'vitest';
import { assertGoldenCaseProvenance } from '../../core/goldenAdmissionCase';
import { calculateHcmulawSubjectGroupScore, calculateHcmulawThpt5FinalScore, calculateHcmulawPriorityHighschool3FinalScore } from './calculator';
import { calculateHcmulawPriority30, lookupHcmulawStandardPriority30 } from './priority';
import { convertHcmulawVsatSubjectScore, convertHcmulawTranscriptCombinationScore, HCMULAW_TRANSCRIPT_K_BY_COMBINATION } from './conversionTable';
import { hcmulawThpt5GoldenCases, hcmulawVsat4GoldenCases, hcmulawTranscript3GoldenCases, hcmulawCombined2GoldenCases } from './__fixtures__/officialExamples2026';
import { calculateHcmulawCombined2FinalScore } from './calculator';
import { calculateHcmulawMethod2Bonus } from './bonus';
import type { HcmulawProgramId } from './programs';
import { hcmulawPrograms } from './programs';

describe('HCMULAW 2026 golden conformance — Phương thức 5, thi TN THPT (Tier C — sourceId hcmulaw-method-notice-2026)', () => {
  assertGoldenCaseProvenance(hcmulawThpt5GoldenCases);

  it.each(hcmulawThpt5GoldenCases)('$id', (goldenCase) => {
    const subjectGroupScore30 = calculateHcmulawSubjectGroupScore(goldenCase.input);
    expect(subjectGroupScore30).toBe(goldenCase.expected.subjectGroupScore30);

    const standardPriority30 = lookupHcmulawStandardPriority30(goldenCase.input.priorityRegion, goldenCase.input.priorityCategory);
    const priority = calculateHcmulawPriority30({ academicScore30: subjectGroupScore30, standardPriority30 });
    const finalScore = calculateHcmulawThpt5FinalScore({ subjectGroupScore30, priority30: priority.effectivePriority30 });
    expect(finalScore).toBe(goldenCase.expected.finalScore);
  });
});

describe('HCMULAW 2026 golden conformance — Phương thức 4, V-SAT (Tier A official worked example — sourceId hcmulaw-equivalence-notice-2026)', () => {
  assertGoldenCaseProvenance(hcmulawVsat4GoldenCases);

  it.each(hcmulawVsat4GoldenCases)('$id', (goldenCase) => {
    const y = convertHcmulawVsatSubjectScore(goldenCase.input.subjectId, goldenCase.input.x);
    expect(y).toBe(goldenCase.expected.y);
  });
});

describe('HCMULAW 2026 golden conformance — Phương thức 2, học bạ quy đổi + điểm khuyến khích chứng chỉ (mục 2(c)(ii))', () => {
  assertGoldenCaseProvenance(hcmulawCombined2GoldenCases);

  it.each(hcmulawCombined2GoldenCases)('$id', (goldenCase) => {
    const converted30 = convertHcmulawTranscriptCombinationScore(goldenCase.input.combinationCode, goldenCase.input.x30);
    expect(converted30).toBe(goldenCase.expected.converted30);

    const bonus = calculateHcmulawMethod2Bonus(goldenCase.input.certificates, goldenCase.input.programId as HcmulawProgramId);
    expect(bonus.bonus30).toBe(goldenCase.expected.bonus30);

    const standardPriority30 = lookupHcmulawStandardPriority30(goldenCase.input.priorityRegion, goldenCase.input.priorityCategory);
    const priority = calculateHcmulawPriority30({ academicScore30: converted30!, standardPriority30 });
    const finalScore = calculateHcmulawCombined2FinalScore({ subjectGroupScore30: converted30!, bonus30: bonus.bonus30!, priority30: priority.effectivePriority30 });
    expect(finalScore).toBe(goldenCase.expected.finalScore);
  });
});

describe('HCMULAW 2026 golden conformance — Phương thức 3, học bạ quy đổi y = x - k (mục 2.1)', () => {
  assertGoldenCaseProvenance(hcmulawTranscript3GoldenCases);

  it.each(hcmulawTranscript3GoldenCases)('$id', (goldenCase) => {
    const converted30 = convertHcmulawTranscriptCombinationScore(goldenCase.input.combinationCode, goldenCase.input.x30);
    expect(converted30).toBe(goldenCase.expected.converted30);

    const standardPriority30 = lookupHcmulawStandardPriority30(goldenCase.input.priorityRegion, goldenCase.input.priorityCategory);
    const priority = calculateHcmulawPriority30({ academicScore30: converted30!, standardPriority30 });
    const finalScore = calculateHcmulawPriorityHighschool3FinalScore({ subjectGroupScore30: converted30!, priority30: priority.effectivePriority30 });
    expect(finalScore).toBe(goldenCase.expected.finalScore);
  });

  it('bảng "độ lệch k" phủ HẾT mọi mã tổ hợp mà danh mục ngành HCMULAW đang dùng', () => {
    const usedCodes = new Set(hcmulawPrograms.flatMap((program) => program.combinations.map((c) => c.code)));
    const uncovered = [...usedCodes].filter((code) => HCMULAW_TRANSCRIPT_K_BY_COMBINATION[code] === undefined);
    expect(uncovered, `Tổ hợp thiếu độ lệch k: ${uncovered.join(', ')}`).toEqual([]);
  });

  it('mọi mã trong cùng 1 nhóm của bảng gốc có CÙNG giá trị k (transcribe đúng cấu trúc nhóm)', () => {
    for (const group of [
      ['D01', 'D03', 'D04', 'D06'],
      ['D11', 'D53', 'D54', 'D55'],
      ['D12', 'D48', 'D49', 'D50'],
      ['D14', 'D63', 'D64', 'D65'],
      ['D15', 'D43', 'D44', 'D45'],
      ['X78', 'X86', 'X90', 'X98'],
      ['D28', 'D29', 'D30'],
      ['D07', 'D23', 'D24', 'D25'],
      ['D09', 'D38', 'D39', 'D40'],
      ['D10', 'D18', 'D19', 'D20'],
      ['X25', 'X33', 'X37', 'X45'],
    ]) {
      const values = new Set(group.map((code) => HCMULAW_TRANSCRIPT_K_BY_COMBINATION[code]));
      expect(values.size, `Nhóm ${group.join('/')} không đồng nhất giá trị k`).toBe(1);
      expect([...values][0]).not.toBeUndefined();
    }
  });

  it('tổ hợp ngoài bảng công bố -> undefined (không đoán k)', () => {
    expect(convertHcmulawTranscriptCombinationScore('B00', 25)).toBeUndefined();
    expect(convertHcmulawTranscriptCombinationScore(undefined, 25)).toBeUndefined();
  });
});
