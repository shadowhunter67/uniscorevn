import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHanuThptExamAdmission, evaluateHanuThptExamExactAdmission } from './evaluate';

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };
const d14Context = { subjectContext: { combinationId: 'D14', subjects: ['literature', 'history', 'english'] as const } };
const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('HANU THPT baseline eligibility 2026', () => {
  it('requires programCode and subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };
    const result = evaluateHanuThptExamAdmission(profile);
    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters (no programCode from /compare -> partial)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };
    expect(evaluateSchool(profile, 'hanu', { context: d01Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['hanu'], { hanu: d01Context })[0].status).toBe('partial');
  });
});

describe('evaluateHanuThptExamExactAdmission (ĐXT thang 40, hệ số Toán/Văn + Ngoại ngữ)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });

  it('chưa chọn mã ngành -> partial', () => {
    const r = evaluateHanuThptExamExactAdmission(p({ math: 8, literature: 8, english: 8 }), d01Context);
    expect(r.confidence).toBe('partial');
  });

  it('chưa chọn tổ hợp -> partial', () => {
    const r = evaluateHanuThptExamExactAdmission(p({ math: 8, literature: 8, english: 8 }), { programCode: '7340101' });
    expect(r.confidence).toBe('partial');
  });

  it('tổ hợp không có tiếng Anh -> partial (ngoài phạm vi)', () => {
    const r = evaluateHanuThptExamExactAdmission(p({ math: 8, physics: 8, chemistry: 8 }), { programCode: '7340101', ...a00Context });
    expect(r.confidence).toBe('partial');
  });

  it('Quản trị kinh doanh (7340101, Toán&NN hệ số 2, ngưỡng 24,13): tính đúng công thức nhân hệ số + quy đổi thang 40', () => {
    // raw50 = math*2 + literature*1 + english*2 = 8*2 + 6 + 8*2 = 38 => raw40 = 38*40/50 = 30.4
    const r = evaluateHanuThptExamExactAdmission(p({ math: 8, literature: 6, english: 8 }), { programCode: '7340101', ...d01Context });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 30.4, scale: 40 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('Quản trị kinh doanh: tổng thấp -> ineligible', () => {
    const r = evaluateHanuThptExamExactAdmission(p({ math: 3, literature: 3, english: 3 }), { programCode: '7340101', ...d01Context });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('Quan hệ quốc tế (7310206, Văn&NN hệ số 2, ngưỡng 30,33), tổ hợp D14 (Văn,Sử,Anh)', () => {
    // raw50 = literature*2 + history*1 + english*2 = 9*2+7+9*2 = 43 => raw40 = 43*0.8 = 34.4
    const r = evaluateHanuThptExamExactAdmission(p({ literature: 9, history: 7, english: 9 }), { programCode: '7310206', ...d14Context });
    expect(r.score).toEqual({ value: 34.4, scale: 40 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('cộng điểm ưu tiên KV1 (×4/3) vào Điểm xét tuyển', () => {
    const r = evaluateHanuThptExamExactAdmission(p({ math: 8, literature: 6, english: 8 }, { region: 'KV1' }), { programCode: '7340101', ...d01Context });
    // raw40=30.4 -> raw30 equiv=22.8 >= 22.5 nen uu tien bi giam: effectivePriority30=round2(((30-22.8)/7.5)*0.75)=0.72 -> priorityAdd40=round2(0.72*4/3)=0.96
    expect(r.score).toEqual({ value: 31.36, scale: 40 });
  });

  it('mã ngành không có trong bảng -> partial', () => {
    const r = evaluateHanuThptExamExactAdmission(p({ math: 8, literature: 8, english: 8 }), { programCode: 'not-a-code', ...d01Context });
    expect(r.confidence).toBe('partial');
  });
});
