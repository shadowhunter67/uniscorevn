import { activeAdmissionConfig } from '../../schools/hcmut/config/admission-2026';
import { validateBonusComponent, validatePriorityRaw } from '../../schools/hcmut/validation';
import { validateRange } from '../../core/rangeValidation';
import { USH_TALENT_MAX_10 } from '../../schools/ush/eligibility';
import { HCMUPES_TALENT_MAX_10 } from '../../schools/hcmupes/eligibility';
import { programCatalogBySchool } from '../../compare/programCatalog';
import type { ComparisonSelection } from '../../compare/comparisonSelection';

/** Trường không có program catalog chi tiết (đa số trường eligibility-only) — không bắt buộc chọn
 * ngành để thêm vào so sánh, khác với các trường có catalog thật (SCHOOLS_REQUIRING_COMBINATION và
 * tương tự vẫn cần catalog ngành riêng). Không có catalog thì `programId` luôn rỗng, ComparisonCard
 * tự hiển thị "chưa chọn ngành" thay vì chặn hẳn việc thêm trường. */
function requiresProgramSelection(schoolId: string): boolean {
  return (programCatalogBySchool[schoolId]?.length ?? 0) > 0;
}

export interface PickerDraft {
  schoolId: string;
  programId: string;
  combinationId: string;
  hcmutReward: string;
  hcmutConsiderationReward: string;
  hcmutEncouragement: string;
  hcmutPriority: string;
  hasUsshBonusAchievement: boolean;
  ushPairId: string;
  ushTalentScore10: string;
  hcmupesPairId: string;
  hcmupesTalentScore10: string;
}

export const EMPTY_DRAFT: PickerDraft = {
  schoolId: '',
  programId: '',
  combinationId: '',
  hcmutReward: '0',
  hcmutConsiderationReward: '0',
  hcmutEncouragement: '0',
  hcmutPriority: '0',
  hasUsshBonusAchievement: false,
  ushPairId: '',
  ushTalentScore10: '',
  hcmupesPairId: '',
  hcmupesTalentScore10: '',
};

export const SCHOOLS_REQUIRING_COMBINATION = new Set(['hcmut', 'uel', 'hcmus', 'ussh', 'uhs', 'iu', 'agu', 'hcmue']);

export function selectionToDraft(selection: ComparisonSelection): PickerDraft {
  return {
    ...EMPTY_DRAFT,
    schoolId: selection.schoolId,
    programId: selection.programId ?? '',
    combinationId: selection.context?.combinationId ?? '',
    hcmutReward: String(selection.context?.hcmutBonus?.reward ?? 0),
    hcmutConsiderationReward: String(selection.context?.hcmutBonus?.considerationReward ?? 0),
    hcmutEncouragement: String(selection.context?.hcmutBonus?.encouragement ?? 0),
    hcmutPriority: String(selection.context?.hcmutBonus?.priorityRaw30Scale ?? 0),
    hasUsshBonusAchievement: selection.context?.hasUsshBonusAchievement === true,
    ushPairId: selection.context?.ushPairId ?? '',
    ushTalentScore10: selection.context?.ushTalentScore10 !== undefined ? String(selection.context.ushTalentScore10) : '',
    hcmupesPairId: selection.context?.hcmupesPairId ?? '',
    hcmupesTalentScore10: selection.context?.hcmupesTalentScore10 !== undefined ? String(selection.context.hcmupesTalentScore10) : '',
  };
}

/**
 * Ràng buộc min/max của các field HCMUT tái dùng nguyên `validateBonusComponent`/
 * `validatePriorityRaw` (P2.3) — cùng business rule thật đang dùng ở HcmutCalculatorPage, không
 * bịa ngưỡng riêng cho form so sánh. Field có lỗi (ngoài range/không phải số) chặn submit thay vì
 * âm thầm clamp rồi cho qua.
 */
export function buildSelectionFromDraft(draft: PickerDraft): Omit<ComparisonSelection, 'id'> | undefined {
  if (!draft.schoolId) return undefined;
  if (requiresProgramSelection(draft.schoolId) && !draft.programId) return undefined;
  if (SCHOOLS_REQUIRING_COMBINATION.has(draft.schoolId) && !draft.combinationId) return undefined;
  if (draft.schoolId === 'ush' && !draft.ushPairId) return undefined;
  if (draft.schoolId === 'hcmupes' && !draft.hcmupesPairId) return undefined;

  const context: ComparisonSelection['context'] = {};
  if (draft.combinationId) context.combinationId = draft.combinationId;
  if (draft.schoolId === 'ussh') context.hasUsshBonusAchievement = draft.hasUsshBonusAchievement;
  if (draft.schoolId === 'ush') {
    if (draft.ushPairId) context.ushPairId = draft.ushPairId;
    const talentScore = validateRange(draft.ushTalentScore10, 0, USH_TALENT_MAX_10);
    if (talentScore.error !== null) return undefined;
    // "missing ≠ 0": ô trống nghĩa là CHƯA nhập, không phải điểm 0 — không ghi 0 vào context.
    if (!talentScore.isEmpty) context.ushTalentScore10 = talentScore.value;
  }
  if (draft.schoolId === 'hcmupes') {
    if (draft.hcmupesPairId) context.hcmupesPairId = draft.hcmupesPairId;
    const talentScore = validateRange(draft.hcmupesTalentScore10, 0, HCMUPES_TALENT_MAX_10);
    if (talentScore.error !== null) return undefined;
    if (!talentScore.isEmpty) context.hcmupesTalentScore10 = talentScore.value;
  }
  if (draft.schoolId === 'hcmut') {
    const reward = validateBonusComponent(draft.hcmutReward);
    const considerationReward = validateBonusComponent(draft.hcmutConsiderationReward);
    const encouragement = validateBonusComponent(draft.hcmutEncouragement);
    const priorityRaw30Scale = validatePriorityRaw(draft.hcmutPriority, activeAdmissionConfig);
    if ([reward, considerationReward, encouragement, priorityRaw30Scale].some((field) => field.error !== null)) return undefined;
    context.hcmutBonus = {
      reward: reward.value,
      considerationReward: considerationReward.value,
      encouragement: encouragement.value,
      priorityRaw30Scale: priorityRaw30Scale.value,
    };
  }

  return {
    schoolId: draft.schoolId,
    programId: draft.programId || undefined,
    context: Object.keys(context).length > 0 ? context : undefined,
  };
}
