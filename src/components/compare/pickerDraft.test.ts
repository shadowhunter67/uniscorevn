import { describe, expect, it } from 'vitest';
import { buildSelectionFromDraft, EMPTY_DRAFT } from './pickerDraft';
import { activeAdmissionConfig } from '../../schools/hcmut/config/admission-2026';

const BASE_DRAFT = {
  ...EMPTY_DRAFT,
  schoolId: 'hcmut',
  programId: 'p1',
  combinationId: 'a00',
};

describe('buildSelectionFromDraft — ràng buộc HCMUT (P2.3, tái dùng validateBonusComponent/validatePriorityRaw)', () => {
  it('điền hợp lệ trong ngưỡng thật thì build được context.hcmutBonus đúng giá trị', () => {
    const result = buildSelectionFromDraft({ ...BASE_DRAFT, hcmutReward: '1.5', hcmutPriority: '2' });
    expect(result?.context?.hcmutBonus).toEqual({
      reward: 1.5,
      considerationReward: 0,
      encouragement: 0,
      priorityRaw30Scale: 2,
    });
  });

  it('điểm ưu tiên âm (dưới min business rule = 0) bị chặn submit, không âm thầm cho qua', () => {
    expect(buildSelectionFromDraft({ ...BASE_DRAFT, hcmutPriority: '-1' })).toBeUndefined();
  });

  it('điểm ưu tiên vượt maxRaw30Scale thật của config bị chặn submit', () => {
    const overMax = String(activeAdmissionConfig.priority.maxRaw30Scale + 1);
    expect(buildSelectionFromDraft({ ...BASE_DRAFT, hcmutPriority: overMax })).toBeUndefined();
  });

  it('thưởng âm bị chặn submit (business rule min 0, không có max)', () => {
    expect(buildSelectionFromDraft({ ...BASE_DRAFT, hcmutReward: '-5' })).toBeUndefined();
  });

  it('chuỗi không phải số bị chặn submit', () => {
    expect(buildSelectionFromDraft({ ...BASE_DRAFT, hcmutEncouragement: 'abc' })).toBeUndefined();
  });

  it('trường không phải hcmut không bị áp ràng buộc này', () => {
    const result = buildSelectionFromDraft({ ...BASE_DRAFT, schoolId: 'uel', combinationId: 'a01' });
    expect(result?.context?.hcmutBonus).toBeUndefined();
  });
});

describe('buildSelectionFromDraft — trường không có program catalog (đa số eligibility-only) không bắt buộc chọn ngành', () => {
  it('thêm được vào so sánh dù không có programId, khi trường không có catalog ngành (vd nlu)', () => {
    const result = buildSelectionFromDraft({ ...EMPTY_DRAFT, schoolId: 'nlu', programId: '' });
    expect(result).toEqual({ schoolId: 'nlu', programId: undefined, context: undefined });
  });

  it('trường CÓ program catalog (vd uel) vẫn bắt buộc chọn ngành như cũ', () => {
    expect(buildSelectionFromDraft({ ...EMPTY_DRAFT, schoolId: 'uel', programId: '', combinationId: 'a01' })).toBeUndefined();
  });
});

describe('buildSelectionFromDraft — USH (tổ hợp riêng T00/T01/T04/T06 + điểm năng khiếu TDTT)', () => {
  const USH_DRAFT = { ...EMPTY_DRAFT, schoolId: 'ush', ushPairId: 'T00' };

  it('bắt buộc chọn tổ hợp USH (không dùng combinationId chung)', () => {
    expect(buildSelectionFromDraft({ ...EMPTY_DRAFT, schoolId: 'ush' })).toBeUndefined();
  });

  it('không nhập điểm năng khiếu vẫn thêm được (missing ≠ 0) — context.ushTalentScore10 không có mặt', () => {
    const result = buildSelectionFromDraft(USH_DRAFT);
    expect(result?.context?.ushPairId).toBe('T00');
    expect(result?.context?.ushTalentScore10).toBeUndefined();
    expect('ushTalentScore10' in (result?.context ?? {})).toBe(false);
  });

  it('điểm năng khiếu hợp lệ (0-10) được ghi vào context', () => {
    const result = buildSelectionFromDraft({ ...USH_DRAFT, ushTalentScore10: '6.5' });
    expect(result?.context?.ushTalentScore10).toBe(6.5);
  });

  it('điểm năng khiếu vượt 10 bị chặn submit, không âm thầm clamp', () => {
    expect(buildSelectionFromDraft({ ...USH_DRAFT, ushTalentScore10: '11' })).toBeUndefined();
  });

  it('điểm năng khiếu âm bị chặn submit', () => {
    expect(buildSelectionFromDraft({ ...USH_DRAFT, ushTalentScore10: '-1' })).toBeUndefined();
  });
});
