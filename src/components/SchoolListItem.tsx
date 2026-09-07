import type { SchoolModule } from '../core/schoolModule';
import { deriveSchoolCtaAction, deriveSchoolCtaLabel } from '../core/schoolCta';
import { deriveInstitutionSupportStatus, getEntityLevelLabel, SUPPORT_STATUS_LABELS } from '../data/institutionCoverage';
import { getField } from '../taxonomy/fields';
import { getFieldsForSchool } from '../taxonomy/taxonomyQueries';
import { SchoolLogo } from './SchoolLogo';

/**
 * Ký hiệu đi kèm chữ (KHÔNG chỉ dùng màu làm tín hiệu) — xem docs/design-system.md. Chưa có logo
 * thật cho trường nào (P1 backlog, xem plan) nên dùng initials làm placeholder — không tự bịa logo.
 */
function statusMark(status: ReturnType<typeof deriveInstitutionSupportStatus>): string {
  if (status === 'verified-calculator') return '✓';
  if (status === 'partial-calculator' || status === 'eligibility-only') return '!';
  if (status === 'researched') return '!';
  return '○';
}

interface SchoolListItemProps {
  school: SchoolModule;
  onSelectSchool: (schoolId: string) => void;
  onOpenCompare: () => void;
}

/** Một dòng trong danh sách trường — thay cho card lồng trong grid trước đây. Danh sách > card:
 * dễ scan, không nhồi thông tin (logo/initials, tên, loại+khu vực, trạng thái, CTA). */
export function SchoolListItem({ school, onSelectSchool, onOpenCompare }: SchoolListItemProps) {
  const ctaAction = deriveSchoolCtaAction(school);
  const hasCtaAction = ctaAction.kind !== 'none';
  const buttonLabel = deriveSchoolCtaLabel(school);
  const supportStatus = deriveInstitutionSupportStatus(school);
  // Chỉ 11 trường đã có dữ liệu ngành thật (programCatalogBySchool) trả về field — không đoán field
  // cho 296 trường còn lại, nên phần lớn danh sách sẽ không có chip field (đúng trạng thái, không
  // phải lỗi hiển thị).
  const fieldIds = getFieldsForSchool(school.id).slice(0, 4);

  return (
    <li className="-mx-2 flex flex-col gap-3 rounded-md px-2 py-4 transition-colors duration-150 hover:bg-surface-soft/60 sm:flex-row sm:items-center sm:gap-4">
      <SchoolLogo schoolId={school.id} shortName={school.shortName} name={school.name} size="md" />

      <div className="min-w-0 flex-1">
        <p className="text-base font-semibold text-ink sm:text-lg">{school.name}</p>
        <p className="mt-0.5 text-sm text-muted">
          {school.shortName} · {getEntityLevelLabel(school)}
          {school.province ? ` · ${school.province}` : ''}
          {school.ownership === 'public' ? ' · Công lập' : school.ownership === 'private' ? ' · Tư thục' : ''}
        </p>
        {fieldIds.length > 0 && (
          <p className="mt-1 flex flex-wrap gap-x-1.5 gap-y-1 text-sm text-muted">
            {fieldIds.map((fieldId) => (
              <span key={fieldId} className="rounded-sm border border-border px-1.5 py-0.5">
                {getField(fieldId)?.shortName ?? fieldId}
              </span>
            ))}
          </p>
        )}
        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
          <span aria-hidden="true">{statusMark(supportStatus)}</span>
          {SUPPORT_STATUS_LABELS[supportStatus]}
        </p>
      </div>

      {/* CTA có bề ngang tối thiểu cố định để mép nút thẳng hàng giữa các dòng dù nhãn dài ngắn khác nhau. */}
      <div className="shrink-0 sm:w-44 sm:pl-2 sm:text-right">
        {hasCtaAction ? (
          <button
            type="button"
            onClick={() => {
              if (ctaAction.kind === 'compare') onOpenCompare();
              else onSelectSchool(school.id);
            }}
            className="min-h-[--ui-tap-min] w-full cursor-pointer rounded-md border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors duration-150 hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            {buttonLabel}
          </button>
        ) : (
          <span className="block text-sm font-medium text-muted">Chưa có dữ liệu chi tiết</span>
        )}
      </div>
    </li>
  );
}
