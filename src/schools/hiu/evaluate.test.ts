import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHiuThptExamAdmission, evaluateHiuThptExamExactAdmission, evaluateHiuVactAdmission } from './evaluate';

const A01_SUBJECTS = ['math', 'physics', 'english'] as const;

function profileWithThpt(scores: Partial<Record<string, number>>): ApplicantProfile {
  return { thpt: { scores } };
}

function profileWithVact(total: number): ApplicantProfile {
  return { exams: { vact: { total, totalSource: 'user-total-input' } } };
}

describe('evaluateHiuThptExamAdmission', () => {
  it('chưa chọn tổ hợp -> unknown + missingRequirement school-context', () => {
    const evaluation = evaluateHiuThptExamAdmission(profileWithThpt({}));
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'hiu-subject-combination')).toBe(true);
  });

  it('nhóm standard, tổng 15 -> eligible', () => {
    const evaluation = evaluateHiuThptExamAdmission(profileWithThpt({ math: 5, physics: 5, english: 5 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      group: 'standard',
    });
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('nhóm standard, tổng 14.99 -> ineligible', () => {
    const evaluation = evaluateHiuThptExamAdmission(profileWithThpt({ math: 5, physics: 5, english: 4.99 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      group: 'standard',
    });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('nhóm healthLicenseOrLaw -> luôn unknown dù điểm cao (ngưỡng Bộ GD&ĐT quy định, chưa có số)', () => {
    const evaluation = evaluateHiuThptExamAdmission(profileWithThpt({ math: 9, physics: 9, english: 9 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      group: 'healthLicenseOrLaw',
    });
    expect(evaluation.eligibility?.status).toBe('unknown');
  });

  it('confidence luôn partial, không có score', () => {
    const evaluation = evaluateHiuThptExamAdmission(profileWithThpt({ math: 9, physics: 9, english: 9 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.score).toBeUndefined();
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters (reclassified to partial once exact exists)', () => {
    const profile = profileWithThpt({ math: 8, physics: 8, english: 8 });
    const context = { subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS }, group: 'standard' as const };

    // HIU đã có phương thức exact → classifyEvaluation phân loại lại kết quả threshold-only này
    // thành 'partial' (cùng tiền lệ VinhUni/HUB/HLU/CTU/TGU/TDMU/HALONGU/SGU/HUBT/HSU/...).
    expect(evaluateSchool(profile, 'hiu', { context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['hiu'], { hiu: context })[0].status).toBe('partial');
  });
});

describe('evaluateHiuThptExamExactAdmission', () => {
  it('tổng thô 15 -> eligible (so tổng thô)', () => {
    const evaluation = evaluateHiuThptExamExactAdmission(profileWithThpt({ math: 5, physics: 5, english: 5 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.score?.value).toBe(15);
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('tổng thô 14.99 + ưu tiên vẫn ineligible (so tổng thô, không phải ĐXT tham khảo)', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 5, physics: 5, english: 4.99 } },
      priority: { region: 'KV1', category: 'UT1' },
    };

    const evaluation = evaluateHiuThptExamExactAdmission(profile, {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });

    expect(evaluation.eligibility?.status).toBe('ineligible');
    expect(evaluation.score?.value).toBe(17.74);
  });

  it('báo thiếu điểm khi hồ sơ chưa đủ 3 môn', () => {
    const evaluation = evaluateHiuThptExamExactAdmission(profileWithThpt({ math: 6, physics: 6 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hiu-thpt-english' }));
  });

  it('yêu cầu chọn tổ hợp môn khi context rỗng', () => {
    const evaluation = evaluateHiuThptExamExactAdmission(profileWithThpt({ math: 6, physics: 6, english: 6 }));

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hiu-subject-combination' }));
  });
});

describe('evaluateHiuVactAdmission', () => {
  it('chưa có điểm ĐGNL -> unknown + missingRequirement', () => {
    const evaluation = evaluateHiuVactAdmission({});
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'hiu-vact-total')).toBe(true);
  });

  it('nhóm standard, 650 -> eligible', () => {
    const evaluation = evaluateHiuVactAdmission(profileWithVact(650), { group: 'standard' });
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('nhóm medicineDentistryLaw, 699 -> ineligible (ngưỡng 700)', () => {
    const evaluation = evaluateHiuVactAdmission(profileWithVact(699), { group: 'medicineDentistryLaw' });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('nhóm traditionalMedicinePharmacy, 675 -> eligible', () => {
    const evaluation = evaluateHiuVactAdmission(profileWithVact(675), { group: 'traditionalMedicinePharmacy' });
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('methodId khớp phương thức ĐGNL', () => {
    const evaluation = evaluateHiuVactAdmission(profileWithVact(800));
    expect(evaluation.methodId).toBe('hiu-vact-2026');
  });
});
