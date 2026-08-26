import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHauThptExamAdmission } from './evaluate';

const combo = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };
const infra = { ...combo, group: 'infrastructureEngineering' as const };
const construction = { ...combo, group: 'constructionEconomicsIt' as const };

describe('HAU THPT-exam eligibility 2026 (nhóm ngành không năng khiếu)', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateHauThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hau-subject-combination' }));
  });

  it('applies the 15/30 infrastructure-engineering floor', () => {
    const below: ApplicantProfile = { thpt: { scores: { math: 4, physics: 5, chemistry: 5.5 } } };
    const at: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    expect(evaluateHauThptExamAdmission(below, infra).eligibility?.status).toBe('ineligible');
    expect(evaluateHauThptExamAdmission(at, infra).eligibility?.status).toBe('eligible');
  });

  it('applies the higher 18/30 construction-economics-IT floor', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateHauThptExamAdmission(profile, construction);

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'hau-quality-threshold-2026' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    expect(evaluateSchool(profile, 'hau', { context: infra }).status).toBe('eligible');
    expect(evaluateSchools(profile, ['hau'], { hau: infra })[0].status).toBe('eligible');
  });
});
