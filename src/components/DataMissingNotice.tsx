import { ExternalLink } from 'lucide-react';
import type { MissingRequirement } from '../core/admissionEvaluation';
import { Disclosure } from './Disclosure';
import {
  groupMissingRequirements,
  MISSING_OWNER_DESCRIPTIONS,
  MISSING_OWNER_TITLES,
  type MissingRequirementOwner,
} from '../compare/missingRequirementGroups';

/**
 * Hiển thị phần "còn thiếu" của một nguyện vọng, TÁCH HẲN 2 nguồn gốc (xem
 * `compare/missingRequirementGroups.ts`):
 *
 * - "Bạn cần bổ sung…"  — có việc để làm, nền accent nhạt + link hành động.
 * - "UniScoreVN chưa có đủ dữ liệu…" — giới hạn của công cụ, nền trung tính, KHÔNG có link kiểu
 *   "nhập thêm" (sẽ gợi ý sai rằng thí sinh sửa được).
 *
 * Khác nhau ở cả chữ (tiêu đề nói rõ ai thiếu), ký hiệu (→ / ○) lẫn nền — không truyền trạng thái
 * chỉ bằng màu.
 */
function OwnerBlock({ owner, requirements, limit }: { owner: MissingRequirementOwner; requirements: MissingRequirement[]; limit: number }) {
  if (requirements.length === 0) return null;
  const isUser = owner === 'user';
  const shown = requirements.slice(0, limit);
  const overflow = requirements.length - shown.length;

  // Ghi chú "hệ thống chưa có" đôi khi là cả đoạn kỹ thuật dài (vd ghi chú knowledge-gap của UHS
  // dài ~600 ký tự). Để nguyên inline thì một card cao gấp 3 card bên cạnh trong lưới 2 cột. Chỉ
  // gấp phần LIỆT KÊ — tiêu đề "UniScoreVN chưa có đủ dữ liệu…" vẫn luôn hiện, nên thí sinh không
  // bao giờ mất thông tin "đây là giới hạn của công cụ, không phải lỗi của bạn".
  const shouldCollapseList = shown.reduce((total, item) => total + item.label.length, 0) > 220;

  const list = (
    <ul className="space-y-1 text-muted">
      {shown.map((requirement) => (
        <li key={requirement.code}>
          {requirement.label}
          {isUser && requirement.action && (
            <a
              href={requirement.action.href}
              className="ml-2 inline-flex items-center gap-1 font-medium text-accent underline-offset-2 hover:underline"
            >
              {requirement.action.label}
              <ExternalLink size={11} aria-hidden="true" />
            </a>
          )}
        </li>
      ))}
      {overflow > 0 && <li className="text-muted">…và {overflow} mục nữa.</li>}
    </ul>
  );

  return (
    <div className={`rounded-md p-3 text-sm ${isUser ? 'bg-accent/5' : 'bg-surface-soft'}`}>
      <p className="font-medium text-ink">
        <span aria-hidden="true" className="mr-1.5 text-muted">
          {isUser ? '→' : '○'}
        </span>
        {MISSING_OWNER_TITLES[owner]}
      </p>
      <p className="mt-0.5 text-muted">{MISSING_OWNER_DESCRIPTIONS[owner]}</p>
      {shouldCollapseList ? (
        <Disclosure variant="inline" summary={`Xem chi tiết (${requirements.length} mục)`} className="mt-1.5">
          {list}
        </Disclosure>
      ) : (
        <div className="mt-1.5">{list}</div>
      )}
    </div>
  );
}

export function DataMissingNotice({ requirements, limit = 5 }: { requirements: readonly MissingRequirement[]; limit?: number }) {
  const grouped = groupMissingRequirements(requirements);
  if (grouped.user.length === 0 && grouped.system.length === 0) return null;

  return (
    <div className="space-y-2">
      <OwnerBlock owner="user" requirements={grouped.user} limit={limit} />
      <OwnerBlock owner="system" requirements={grouped.system} limit={limit} />
    </div>
  );
}
