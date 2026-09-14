import { describe, expect, it } from 'vitest';
import type { MissingRequirement } from '../core/admissionEvaluation';
import { getMissingRequirementOwner, groupMissingRequirements, MISSING_OWNER_TITLES } from './missingRequirementGroups';

function requirement(kind: MissingRequirement['kind'], code: string): MissingRequirement {
  return { kind, code, label: code };
}

describe('missingRequirementGroups', () => {
  it('thiếu điểm hồ sơ / chưa chọn ngữ cảnh = phía người dùng', () => {
    expect(getMissingRequirementOwner(requirement('profile-input', 'a'))).toBe('user');
    expect(getMissingRequirementOwner(requirement('school-context', 'b'))).toBe('user');
  });

  it('quy định chưa công bố / nhánh chưa hỗ trợ = phía hệ thống', () => {
    expect(getMissingRequirementOwner(requirement('official-rule', 'c'))).toBe('system');
    expect(getMissingRequirementOwner(requirement('unsupported', 'd'))).toBe('system');
  });

  it('group giữ nguyên thứ tự và không làm mất mục nào', () => {
    const input = [
      requirement('profile-input', 'p1'),
      requirement('official-rule', 'r1'),
      requirement('profile-input', 'p2'),
      requirement('unsupported', 'u1'),
    ];
    const grouped = groupMissingRequirements(input);
    expect(grouped.user.map((item) => item.code)).toEqual(['p1', 'p2']);
    expect(grouped.system.map((item) => item.code)).toEqual(['r1', 'u1']);
    expect(grouped.user.length + grouped.system.length).toBe(input.length);
  });

  it('tiêu đề 2 nhóm phải khác nhau và không dùng chữ "Còn thiếu" mơ hồ', () => {
    expect(MISSING_OWNER_TITLES.user).not.toBe(MISSING_OWNER_TITLES.system);
    for (const title of Object.values(MISSING_OWNER_TITLES)) expect(title).not.toBe('Còn thiếu');
    // Nhóm hệ thống phải nêu đích danh công cụ để không bị đọc thành lỗi của thí sinh.
    expect(MISSING_OWNER_TITLES.system).toContain('UniScoreVN');
  });
});
