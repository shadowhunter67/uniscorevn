import type { SchoolModule } from '../core/schoolModule';
import { deriveSchoolCtaAction, deriveSchoolCtaLabel } from '../core/schoolCta';
import { deriveInstitutionSupportStatus, getEntityLevelLabel, SUPPORT_STATUS_LABELS } from '../data/institutionCoverage';
import { getField } from '../taxonomy/fields';
import { getFieldsForSchool } from '../taxonomy/taxonomyQueries';
import { SchoolLogo } from './SchoolLogo';

function statusMark(status: ReturnType<typeof deriveInstitutionSupportStatus>): string {
  if (status === 'verified-calculator') return '\u2713';
  if (status === 'partial-calculator' || status === 'eligibility-only') return '!';
  if (status === 'researched') return '!';
  return '\u25cb';
}

interface SchoolListItemProps {
  school: SchoolModule;
  onSelectSchool: (schoolId: string) => void;
  onOpenCompare: () => void;
}

export function SchoolListItem({ school, onSelectSchool, onOpenCompare }: SchoolListItemProps) {
  const ctaAction = deriveSchoolCtaAction(school);
  const hasCtaAction = ctaAction.kind !== 'none';
  const buttonLabel = deriveSchoolCtaLabel(school);
  const supportStatus = deriveInstitutionSupportStatus(school);
  const isFullyVerified = supportStatus === 'verified-calculator';
  const fieldIds = getFieldsForSchool(school.id).slice(0, 4);

  return (
    <li className="-mx-2 flex flex-col gap-3 rounded-md px-2 py-4 transition-colors duration-150 hover:bg-surface-soft/60 sm:flex-row sm:items-center sm:gap-4">
      <SchoolLogo schoolId={school.id} shortName={school.shortName} name={school.name} size="md" />

      <div className="min-w-0 flex-1">
        <p className="text-base font-semibold text-ink sm:text-lg">{school.name}</p>
        <p className="mt-0.5 text-sm text-muted">
          {school.shortName} {'\u00b7'} {getEntityLevelLabel(school)}
          {school.province ? ' \u00b7 ' + school.province : ''}
          {school.ownership === 'public' ? ' \u00b7 C\u00f4ng l\u1eadp' : school.ownership === 'private' ? ' \u00b7 T\u01b0 th\u1ee5c' : ''}
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

      <div className="shrink-0 sm:w-44 sm:pl-2 sm:text-right">
        {hasCtaAction ? (
          <button
            type="button"
            onClick={() => {
              if (ctaAction.kind === 'compare') onOpenCompare();
              else onSelectSchool(school.id);
            }}
            className={[
              'min-h-(--ui-tap-min) w-full cursor-pointer rounded-md border px-4 py-2 text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
              isFullyVerified
                ? 'border-primary bg-primary text-white hover:bg-primary/90'
                : 'border-accent/40 bg-surface text-accent hover:bg-accent/10',
            ].join(' ')}
          >
            {buttonLabel}
          </button>
        ) : (
          <span className="block text-sm font-medium text-muted">Ch&#432;a c&#243; d&#7919; li&#7879;u chi ti&#7871;t</span>
        )}
      </div>
    </li>
  );
}
