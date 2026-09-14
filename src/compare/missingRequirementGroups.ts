import type { MissingRequirement } from '../core/admissionEvaluation';

/**
 * Tách "CÒN THIẾU" thành 2 nguồn gốc KHÁC HẲN NHAU về mặt trách nhiệm:
 *
 * - `user`   — thí sinh chưa cung cấp đủ (chưa nhập điểm, chưa chọn tổ hợp/ngành). Có thể tự xử lý.
 * - `system` — UniScoreVN chưa có đủ công thức/quy định/dữ liệu ngành để tính tiếp. Thí sinh nhập
 *              thêm bao nhiêu cũng không thay đổi được.
 *
 * Trước đây cả hai gộp chung dưới một tiêu đề "Còn thiếu", nên trường hợp hệ thống thiếu công thức
 * bị đọc thành "mình khai thiếu gì đó" — user tự trách mình vì một giới hạn của công cụ. Đây là
 * hàm thuần, không import React, để test được độc lập với UI.
 *
 * Mapping theo `MissingRequirementKind` (KHÔNG đổi enum gốc, chỉ phân loại lại khi hiển thị):
 * - 'profile-input'  -> user (thiếu điểm trong hồ sơ)
 * - 'school-context' -> user (chưa chọn ngành/tổ hợp/ngữ cảnh riêng của trường)
 * - 'official-rule'  -> system (trường chưa công bố / UniScoreVN chưa số hoá quy định)
 * - 'unsupported'    -> system (UniScoreVN chưa hỗ trợ nhánh tính này)
 */
export type MissingRequirementOwner = 'user' | 'system';

export function getMissingRequirementOwner(requirement: MissingRequirement): MissingRequirementOwner {
  return requirement.kind === 'profile-input' || requirement.kind === 'school-context' ? 'user' : 'system';
}

export interface GroupedMissingRequirements {
  user: MissingRequirement[];
  system: MissingRequirement[];
}

export function groupMissingRequirements(requirements: readonly MissingRequirement[]): GroupedMissingRequirements {
  const grouped: GroupedMissingRequirements = { user: [], system: [] };
  for (const requirement of requirements) grouped[getMissingRequirementOwner(requirement)].push(requirement);
  return grouped;
}

/** Tiêu đề mỗi nhóm — nói rõ AI thiếu, không dùng chữ "Còn thiếu" mơ hồ cho cả hai. */
export const MISSING_OWNER_TITLES: Record<MissingRequirementOwner, string> = {
  user: 'Bạn cần bổ sung',
  system: 'UniScoreVN chưa có đủ dữ liệu để tính tiếp',
};

export const MISSING_OWNER_DESCRIPTIONS: Record<MissingRequirementOwner, string> = {
  user: 'Nhập thêm những mục sau là tính được đầy đủ nguyện vọng này.',
  system: 'Đây là giới hạn dữ liệu của công cụ, không phải do hồ sơ của bạn thiếu. Những phần sau chưa số hoá được:',
};
