import type { MissingRequirement } from '../core/admissionEvaluation';
import { groupMissingRequirements } from '../compare/missingRequirementGroups';
import type { FieldMatch } from './fieldRecommendation';

/**
 * "Chưa đủ dữ liệu để đánh giá" hiện đang là một danh sách dài không phân loại — thí sinh nhìn vào
 * chỉ thấy "mình thiếu gì đó" mà không biết thiếu gì, và quan trọng hơn: không phân biệt được
 * trường hợp CHÍNH CÔNG CỤ chưa có dữ liệu. Hàm này xếp mỗi lựa chọn vào đúng một lý do, để UI nói
 * được "Để đánh giá thêm: N cần bạn nhập điểm, N chưa có mốc điểm chuẩn đối chiếu…".
 *
 * Thuần logic, không React. KHÔNG tự đánh giá lại gì — chỉ đọc `evaluation`/`competitiveness` đã có.
 *
 * Thứ tự ưu tiên khi một lựa chọn vướng nhiều thứ: việc thí sinh TỰ LÀM ĐƯỢC xếp trước, vì đó là
 * lý do duy nhất họ có thể hành động.
 */
export type InsufficientReason = 'needs-user-input' | 'missing-system-rule' | 'no-comparable-cutoff';

export const INSUFFICIENT_REASON_LABELS: Record<InsufficientReason, string> = {
  'needs-user-input': 'Cần bạn nhập thêm điểm',
  'missing-system-rule': 'UniScoreVN chưa có đủ công thức/quy định',
  'no-comparable-cutoff': 'Chưa có mốc điểm chuẩn đối chiếu được',
};

export const INSUFFICIENT_REASON_HINTS: Record<InsufficientReason, string> = {
  'needs-user-input': 'Bổ sung điểm trong hồ sơ là đánh giá được.',
  'missing-system-rule': 'Giới hạn dữ liệu của công cụ — không phải do hồ sơ của bạn thiếu.',
  'no-comparable-cutoff': 'Trường chưa công bố, hoặc điểm chuẩn không cùng thang/phương thức để so.',
};

function collectRequirements(match: FieldMatch): MissingRequirement[] {
  const evaluation = match.evaluation;
  if ((evaluation.missingRequirements ?? []).length > 0) return [...(evaluation.missingRequirements ?? [])];
  return [
    ...evaluation.missingInputs.map((label, index) => ({ kind: 'profile-input' as const, code: `input-${index}`, label })),
    ...evaluation.missingRules.map((label, index) => ({ kind: 'official-rule' as const, code: `rule-${index}`, label })),
  ];
}

export function classifyInsufficientMatch(match: FieldMatch): InsufficientReason {
  const grouped = groupMissingRequirements(collectRequirements(match));
  if (grouped.user.length > 0) return 'needs-user-input';
  if (grouped.system.length > 0) return 'missing-system-rule';
  return 'no-comparable-cutoff';
}

export interface InsufficientDataGroup {
  reason: InsufficientReason;
  matches: FieldMatch[];
}

/** Nhóm theo lý do, giữ đúng thứ tự ưu tiên của `InsufficientReason`; nhóm rỗng bị loại bỏ. */
export function groupInsufficientMatches(matches: readonly FieldMatch[]): InsufficientDataGroup[] {
  const order: InsufficientReason[] = ['needs-user-input', 'missing-system-rule', 'no-comparable-cutoff'];
  const byReason = new Map<InsufficientReason, FieldMatch[]>(order.map((reason) => [reason, []]));
  for (const match of matches) byReason.get(classifyInsufficientMatch(match))!.push(match);
  return order.map((reason) => ({ reason, matches: byReason.get(reason)! })).filter((group) => group.matches.length > 0);
}
