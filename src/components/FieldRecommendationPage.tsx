import { useMemo } from 'react';
import { useApplicantProfile } from '../core/applicantProfileContextCore';
import { summarizeApplicantProfile } from '../core/applicantProfileSummary';
import type { FieldId } from '../taxonomy/fields';
import { getField } from '../taxonomy/fields';
import { recommendSchoolsForField, type FieldMatch } from '../recommend/fieldRecommendation';
import { groupInsufficientMatches, INSUFFICIENT_REASON_HINTS, INSUFFICIENT_REASON_LABELS } from '../recommend/insufficientDataBreakdown';
import { COMPETITIVENESS_BAND_LABELS, COMPETITIVENESS_DISCLAIMER } from '../evaluation/competitiveness/competitivenessLanguage';
import { CONFIDENCE_LABELS } from '../evaluation/competitiveness/competitivenessConfidence';
import { describeMarginSentence, describeReferenceLabel } from '../evaluation/competitiveness/marginLanguage';
import { Disclosure } from './Disclosure';
import { SharedProfileEditor } from './SharedProfileEditor';

interface FieldRecommendationPageProps {
  fieldId: FieldId;
  onBackToFields: () => void;
  onOpenSchool: (schoolId: string) => void;
}

/**
 * Một lựa chọn trường/ngành trong lĩnh vực.
 *
 * Thứ bậc CỐ Ý theo spec UX: tên NGÀNH nổi nhất (thí sinh đang chọn ngành, trường là bối cảnh) ->
 * band đánh giá -> câu chênh lệch dễ hiểu -> năm tham chiếu + độ tin cậy -> hành động.
 * Số kỹ thuật (chênh lệch thô/thang điểm) nằm sau, trong "Xem cách tính" — không bỏ, chỉ hạ lớp.
 */
function MatchRow({ match, onOpenSchool }: { match: FieldMatch; onOpenSchool: (schoolId: string) => void }) {
  const { competitiveness } = match;
  const band = competitiveness.band === 'insufficient-data' ? undefined : competitiveness.band;

  return (
    <li className="py-4">
      <p className="text-base font-semibold text-ink">{match.programName || match.shortName}</p>
      <p className="mt-0.5 text-sm text-muted">{match.shortName}</p>

      {band && <p className="mt-2 text-sm font-medium text-ink">{COMPETITIVENESS_BAND_LABELS[band]}</p>}
      {competitiveness.rawMargin !== undefined && (
        <p className="mt-0.5 text-sm text-ink-soft">
          {describeMarginSentence(competitiveness.rawMargin, competitiveness.referenceType ?? 'current', competitiveness.referenceYear)}
        </p>
      )}
      <p className="mt-1 text-[13px] text-muted">
        {competitiveness.referenceYear !== undefined
          ? `Đối chiếu ${describeReferenceLabel(competitiveness.referenceType ?? 'current', competitiveness.referenceYear)}`
          : 'Chưa có mốc đối chiếu'}
        {band ? ` · Độ tin cậy: ${CONFIDENCE_LABELS[competitiveness.confidence]}` : ''}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
        {competitiveness.rawMargin !== undefined && competitiveness.scale !== undefined && (
          <Disclosure summary="Xem cách tính" className="border-0 bg-transparent px-0">
            <div className="space-y-1 text-[13px] text-muted">
              <p>
                Chênh lệch so với mốc đối chiếu: {competitiveness.rawMargin >= 0 ? '+' : ''}
                {competitiveness.rawMargin.toFixed(2)} / {competitiveness.scale}.
              </p>
              {competitiveness.source?.url && (
                <p>
                  Nguồn:{' '}
                  <a href={competitiveness.source.url} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-2 hover:underline">
                    {competitiveness.source.label ?? 'Xem nguồn'}
                  </a>
                </p>
              )}
            </div>
          </Disclosure>
        )}
        <button
          type="button"
          onClick={() => onOpenSchool(match.schoolId)}
          className="inline-flex min-h-9 cursor-pointer items-center rounded-md px-1.5 text-sm font-medium text-accent underline-offset-2 transition-colors duration-150 hover:bg-accent/10 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          Xem {match.shortName} →
        </button>
      </div>
    </li>
  );
}

function GroupSection({ title, hint, matches, onOpenSchool }: { title: string; hint: string; matches: FieldMatch[]; onOpenSchool: (schoolId: string) => void }) {
  if (matches.length === 0) return null;
  return (
    <section className="mt-7">
      <h2 className="text-lg font-semibold text-ink">
        {title} <span className="font-normal text-muted">({matches.length})</span>
      </h2>
      <p className="mt-0.5 text-sm text-muted">{hint}</p>
      <ul className="mt-2 divide-y divide-border border-y border-border">
        {matches.map((match) => (
          <MatchRow key={`${match.schoolId}:${match.programId}`} match={match} onOpenSchool={onOpenSchool} />
        ))}
      </ul>
    </section>
  );
}

export function FieldRecommendationPage({ fieldId, onBackToFields, onOpenSchool }: FieldRecommendationPageProps) {
  const field = getField(fieldId);
  const { profile, updateProfile, updateVactTotal } = useApplicantProfile();
  const profileSummary = summarizeApplicantProfile(profile);
  const result = useMemo(() => recommendSchoolsForField(profile, fieldId), [profile, fieldId]);
  const assessedCount = result.groups.thuSuc.length + result.groups.vuaSuc.length + result.groups.anToanHon.length;
  const totalFound = assessedCount + result.insufficientData.length;
  const insufficientGroups = useMemo(() => groupInsufficientMatches(result.insufficientData), [result.insufficientData]);

  return (
    <div className="min-h-svh bg-bg">
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <button
          type="button"
          onClick={onBackToFields}
          className="-ml-1.5 inline-flex min-h-9 cursor-pointer items-center rounded-md px-1.5 text-sm font-medium text-accent underline-offset-2 hover:bg-accent/10 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          ← Về danh sách lĩnh vực
        </button>

        <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">{field?.name ?? fieldId}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{COMPETITIVENESS_DISCLAIMER}</p>

        <details open={!profileSummary.hasData} className="mt-4 rounded-md border border-accent/20 bg-accent/5 px-3 py-2.5">
          <summary className="min-h-9 cursor-pointer py-1 text-sm font-medium text-ink">
            {profileSummary.hasData ? 'Hồ sơ dùng chung (đã có dữ liệu)' : 'Nhập hồ sơ để xem kết quả phù hợp với bạn'}
          </summary>
          <SharedProfileEditor profile={profile} updateProfile={updateProfile} updateVactTotal={updateVactTotal} />
        </details>

        <p className="mt-5 text-sm text-muted" aria-live="polite">
          {totalFound === 0
            ? 'Chưa có trường/ngành nào trong lĩnh vực này có dữ liệu để đối chiếu.'
            : `Tìm thấy ${totalFound} lựa chọn, trong đó ${assessedCount} lựa chọn đánh giá được với hồ sơ hiện tại.`}
        </p>

        <GroupSection
          title="Thử sức"
          hint="Điểm của bạn đang thấp hơn mốc đối chiếu."
          matches={result.groups.thuSuc}
          onOpenSchool={onOpenSchool}
        />
        <GroupSection
          title="Vừa sức"
          hint="Điểm của bạn đang quanh mốc đối chiếu."
          matches={result.groups.vuaSuc}
          onOpenSchool={onOpenSchool}
        />
        <GroupSection
          title="An toàn hơn"
          hint="Điểm của bạn đang cao hơn mốc đối chiếu một khoảng rõ rệt."
          matches={result.groups.anToanHon}
          onOpenSchool={onOpenSchool}
        />

        {/* Trước đây danh sách này luôn xổ hết, dài hơn cả 3 nhóm có ích ở trên và không nói được
            vì sao. Nay: gấp mặc định, và chia theo LÝ DO — tách rõ phần thí sinh tự bổ sung được
            với phần chính UniScoreVN còn thiếu. */}
        {result.insufficientData.length > 0 && (
          <section className="mt-7">
            <h2 className="text-lg font-semibold text-ink">
              Chưa đủ dữ liệu để đánh giá <span className="font-normal text-muted">({result.insufficientData.length})</span>
            </h2>
            <ul className="mt-2 space-y-1 text-sm">
              {insufficientGroups.map((group) => (
                <li key={group.reason} className="text-ink-soft">
                  <span className="font-medium text-ink">{group.matches.length}</span> · {INSUFFICIENT_REASON_LABELS[group.reason]}{' '}
                  <span className="text-muted">— {INSUFFICIENT_REASON_HINTS[group.reason]}</span>
                </li>
              ))}
            </ul>

            <Disclosure summary={`Xem danh sách (${result.insufficientData.length})`} className="mt-3">
              <div className="space-y-4">
                {insufficientGroups.map((group) => (
                  <div key={group.reason}>
                    <p className="text-sm font-medium text-ink">{INSUFFICIENT_REASON_LABELS[group.reason]}</p>
                    <ul className="mt-1 divide-y divide-border border-y border-border">
                      {group.matches.map((match) => (
                        <li key={`${match.schoolId}:${match.programId}`} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-2.5">
                          <p className="text-sm text-ink">
                            {match.programName || match.shortName} <span className="text-muted">· {match.shortName}</span>
                          </p>
                          <button
                            type="button"
                            onClick={() => onOpenSchool(match.schoolId)}
                            className="inline-flex min-h-9 shrink-0 cursor-pointer items-center rounded-md px-1.5 text-sm font-medium text-accent underline-offset-2 hover:bg-accent/10 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                          >
                            Xem {match.shortName} →
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Disclosure>
          </section>
        )}
      </main>
    </div>
  );
}
