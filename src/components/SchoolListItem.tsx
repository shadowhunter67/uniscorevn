import { ArrowRight } from 'lucide-react';
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
    <li className="card flex flex-col gap-3 p-4 transition-shadow duration-150 hover:shadow-lg">
      <div className="flex items-start gap-3">
        <SchoolLogo schoolId={school.id} shortName={school.shortName} name={school.name} size="md" />
        <p className="min-w-0 flex-1 text-base font-semibold leading-snug text-ink">{school.name}</p>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm text-muted">
          {school.shortName} {'·'} {getEntityLevelLabel(school)}
          {school.ownership === 'public' ? ' · Công lập' : school.ownership === 'private' ? ' · Tư thục' : ''}
        </p>
        {fieldIds.length > 0 && (
          <p className="mt-2 flex flex-wrap gap-1.5 text-sm text-muted">
            {fieldIds.map((fieldId) => (
              <span key={fieldId} className="rounded-full bg-surface-soft px-2 py-0.5">
                {getField(fieldId)?.shortName ?? fieldId}
              </span>
            ))}
          </p>
        )}
        <p className={`mt-2 flex items-center gap-1.5 text-sm font-medium ${isFullyVerified ? 'text-success' : 'text-ink-soft'}`}>
          <span aria-hidden="true">{statusMark(supportStatus)}</span>
          {SUPPORT_STATUS_LABELS[supportStatus]}
        </p>
      </div>

      <div>
        {hasCtaAction ? (
          <button
            type="button"
            onClick={() => {
              if (ctaAction.kind === 'compare') onOpenCompare();
              else onSelectSchool(school.id);
            }}
            className={[
              'inline-flex min-h-(--ui-tap-min) w-full cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
              isFullyVerified
                ? 'border-primary bg-primary text-white hover:bg-primary/90'
                : 'border-accent/40 bg-surface text-accent hover:bg-accent/10',
            ].join(' ')}
          >
            {buttonLabel}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        ) : (
          <span className="block text-sm font-medium text-muted">Chưa có dữ liệu chi tiết</span>
        )}
      </div>
    </li>
  );
}
