import { useMemo } from 'react';
import type { SchoolModule } from '../core/schoolModule';
import { useApplicantProfile } from '../core/applicantProfileContextCore';
import { COMMON_SUBJECT_COMBINATIONS, SUBJECT_LABELS } from '../core/subjects';
import { SharedProfileEditor } from './SharedProfileEditor';
import { evaluateSchool, type GenericSchoolEvaluationResult } from '../evaluation/schoolEvaluation';
import { deriveInstitutionSupportStatus, SUPPORT_STATUS_LABELS } from '../data/institutionCoverage';
import { getField } from '../taxonomy/fields';
import { getFieldsForSchool, getMajorsForSchoolField } from '../taxonomy/taxonomyQueries';
import { RankingReferenceSection } from './RankingReferenceSection';
import { userFacingText } from '../core/userFacingText';

interface InstitutionProfilePageProps {
  school: SchoolModule;
  onChangeSchool: () => void;
  onOpenCompare: (schoolId: string) => void;
}

function buildGenericContext(preferredCombinationId: string | undefined) {
  const combination = COMMON_SUBJECT_COMBINATIONS.find((item) => item.id === preferredCombinationId);
  return combination ? { subjectContext: { combinationId: combination.id, subjects: combination.subjects } } : {};
}

function statusLabel(result: GenericSchoolEvaluationResult): string {
  switch (result.status) {
    case 'calculated':
      return 'Đã tính được điểm';
    case 'partial':
      return 'Tính được một phần';
    case 'eligible':
      return 'Đủ điều kiện trong phạm vi đã biết';
    case 'ineligible':
      return 'Không đủ điều kiện';
    case 'missing-input':
      return 'Cần bổ sung dữ liệu';
    case 'unsupported':
      return 'Chưa hỗ trợ tính';
  }
}

function resultTone(result: GenericSchoolEvaluationResult): string {
  if (result.status === 'calculated' || result.status === 'eligible') return 'border-success/25 bg-success/5';
  if (result.status === 'ineligible') return 'border-danger/25 bg-danger/5';
  if (result.status === 'partial' || result.status === 'missing-input') return 'border-warning/25 bg-warning/5';
  return 'border-border bg-surface';
}

function renderScore(result: GenericSchoolEvaluationResult) {
  if (result.score === undefined || result.scoreScale === undefined) return null;
  return (
    <p className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
      {result.score.toFixed(2)} <span className="text-base font-medium text-muted">/ {result.scoreScale}</span>
    </p>
  );
}

export function InstitutionProfilePage({ school, onChangeSchool, onOpenCompare }: InstitutionProfilePageProps) {
  const { profile, updateProfile, updateVactTotal } = useApplicantProfile();
  const context = useMemo(() => buildGenericContext(profile.preferredCombinationId), [profile.preferredCombinationId]);
  const result = useMemo(() => evaluateSchool(profile, school.id, { context }), [profile, school.id, context]);
  const supportStatus = deriveInstitutionSupportStatus(school);
  const selectedCombination = COMMON_SUBJECT_COMBINATIONS.find((item) => item.id === profile.preferredCombinationId);
  const sources = school.catalogSources ?? [];
  const canEvaluate = supportStatus === 'verified-calculator' || supportStatus === 'partial-calculator' || supportStatus === 'eligibility-only';
  const fieldIds = getFieldsForSchool(school.id);

  return (
    <div className="min-h-svh bg-bg pb-16 lg:pb-0">
      {canEvaluate && (
        <div className="sticky bottom-0 z-10 border-t border-border bg-surface lg:hidden" aria-live="polite">
          <a
            href="#generic-result"
            className="mx-auto flex min-h-(--ui-tap-min) w-full max-w-6xl items-center justify-between gap-3 px-4 py-2.5 text-sm"
          >
            <span className="text-ink-soft">{result.score !== undefined ? 'Kết quả tạm tính' : statusLabel(result)}</span>
            <span className="font-semibold text-accent underline-offset-2">
              {result.score !== undefined ? `${result.score.toFixed(2)} / ${result.scoreScale} — Xem chi tiết` : 'Xem chi tiết'}
            </span>
          </a>
        </div>
      )}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <button
          type="button"
          onClick={onChangeSchool}
          className="-ml-1.5 inline-flex min-h-9 cursor-pointer items-center rounded-md px-1.5 text-sm font-medium text-accent underline-offset-2 transition-colors duration-150 hover:bg-accent/10 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          ← Về trang chủ
        </button>

        <header className="mt-5 border-b border-border pb-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-ink-soft">
            {school.admissionCode && <span className="rounded-md bg-accent/10 px-2.5 py-1 text-accent">{school.admissionCode}</span>}
            <span className="rounded-md border border-border bg-surface px-2.5 py-1">{SUPPORT_STATUS_LABELS[supportStatus]}</span>
            <span className="rounded-md border border-border bg-surface px-2.5 py-1">Nguồn {school.year}</span>
          </div>
          <h1 className="mt-3 max-w-4xl text-3xl font-bold text-ink sm:text-4xl">{school.name}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{userFacingText(school.summary ?? school.about ?? 'Thông tin tuyển sinh đang được chuẩn hóa.')}</p>
          <button
            type="button"
            onClick={() => onOpenCompare(school.id)}
            className="mt-4 inline-flex min-h-(--ui-tap-min) items-center rounded-md border border-accent/30 bg-accent/10 px-4 text-sm font-medium text-accent transition-colors duration-150 hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            So sánh trường này
          </button>
        </header>

        {fieldIds.length > 0 && (
          <section className="mt-5 rounded-md border border-border bg-surface p-4">
            <h2 className="text-sm font-semibold text-ink">Lĩnh vực đào tạo</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {fieldIds.map((fieldId) => {
                const field = getField(fieldId);
                const majorCount = getMajorsForSchoolField(school.id, fieldId).length;
                return (
                  <li key={fieldId} className="rounded-md border border-border px-2.5 py-1 text-xs text-ink-soft">
                    {field?.name ?? fieldId}
                    {majorCount > 0 ? ` (${majorCount} ngành)` : ''}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <section className="mt-5 rounded-md border border-border bg-surface p-4">
          <h2 className="text-sm font-semibold text-ink">Hồ sơ dùng chung</h2>
          <p className="mt-1 text-xs text-muted">
            {selectedCombination
              ? `Tổ hợp đang dùng: ${selectedCombination.id} (${selectedCombination.subjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' - ')})`
              : 'Chưa chọn tổ hợp môn dùng chung.'}
          </p>
          <details className="mt-3 rounded-md border border-border bg-surface-soft px-3 py-2">
            <summary className="min-h-(--ui-tap-min) cursor-pointer py-1 text-xs font-medium text-ink">Nhập / chỉnh sửa điểm</summary>
            <SharedProfileEditor profile={profile} updateProfile={updateProfile} updateVactTotal={updateVactTotal} />
          </details>
        </section>

        <section id="generic-result" className={`mt-5 scroll-mt-16 rounded-md border p-4 ${resultTone(result)}`} aria-live="polite">
          <p className="text-xs font-medium uppercase text-muted">Kết quả theo hồ sơ hiện tại</p>
          <h2 className="mt-1 text-lg font-semibold text-ink">{canEvaluate ? statusLabel(result) : 'Thông tin tuyển sinh'}</h2>
          {canEvaluate ? (
            <>
              {renderScore(result)}
              {result.score !== undefined && <p className="mt-1 text-sm text-muted">Thang điểm: {result.scoreScale}</p>}
              {result.notes.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-ink">Phạm vi hỗ trợ</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted">
                    {result.notes.slice(0, 6).map((note) => (
                      <li key={note}>{userFacingText(note)}</li>
                    ))}
                  </ul>
                </div>
              )}
              {result.missingInputs.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-ink">Cần bổ sung</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted">
                    {result.missingInputs.map((item) => (
                      <li key={item}>{userFacingText(item)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <p className="mt-2 text-sm text-muted">UniScoreVN đã có nguồn tuyển sinh công khai cho trường này, nhưng chưa đủ dữ liệu để tính điểm hoặc kết luận điều kiện.</p>
          )}
        </section>

        {sources.length > 0 && (
          <section className="mt-5 rounded-md border border-border bg-surface p-4">
            <h2 className="text-sm font-semibold text-ink">Nguồn chính thức</h2>
            <ul className="mt-2 space-y-2 text-sm">
              {sources.map((source) => (
                <li key={`${userFacingText(source.title)}-${source.url}`}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:no-underline">
                    {userFacingText(source.title)}
                  </a>
                  {source.checkedAt ? <span className="text-xs text-muted"> · kiểm tra {source.checkedAt}</span> : null}
                </li>
              ))}
            </ul>
          </section>
        )}

        <RankingReferenceSection schoolId={school.id} />
      </div>
    </div>
  );
}
