import { useMemo, type ReactNode } from 'react';
import { BarChart3, CheckCircle2, ChevronDown, Clock, Database, FileText, GraduationCap, ShieldCheck, Target } from 'lucide-react';
import { SchoolLogo } from './SchoolLogo';
import { StatWave } from './StatWave';
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

type BandTone = { pill: string; icon: ReactNode };
const BAND_TONE: Record<string, BandTone> = {
  hard: { pill: 'bg-orange-500/10 text-orange-800', icon: <BarChart3 size={14} aria-hidden="true" /> },
  low: { pill: 'bg-orange-500/10 text-orange-800', icon: <BarChart3 size={14} aria-hidden="true" /> },
  borderline: { pill: 'bg-accent/10 text-accent', icon: <BarChart3 size={14} aria-hidden="true" /> },
  competitive: { pill: 'bg-accent/10 text-accent', icon: <BarChart3 size={14} aria-hidden="true" /> },
  safer: { pill: 'bg-emerald-500/10 text-emerald-800', icon: <ShieldCheck size={14} aria-hidden="true" /> },
};

function MatchRow({ match, onOpenSchool }: { match: FieldMatch; onOpenSchool: (schoolId: string) => void }) {
  const { competitiveness } = match;
  const band = competitiveness.band === 'insufficient-data' ? undefined : competitiveness.band;
  const tone = band ? BAND_TONE[band] : undefined;

  return (
    <li className="grid gap-3 py-4 md:grid-cols-[minmax(0,1.3fr)_auto_minmax(0,1.4fr)_auto] md:items-center md:gap-5">
      <div className="flex min-w-0 items-center gap-3">
        <SchoolLogo schoolId={match.schoolId} shortName={match.shortName} size="sm" />
        <div className="min-w-0">
          <p className="text-base font-semibold text-ink">{match.programName || match.shortName}</p>
          <p className="mt-0.5 text-sm text-muted">{match.shortName}</p>
        </div>
      </div>

      <div>
        {band && tone && (
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${tone.pill}`}>
            {tone.icon}
            {COMPETITIVENESS_BAND_LABELS[band]}
          </span>
        )}
      </div>

      <div className="text-sm">
        {competitiveness.rawMargin !== undefined && (
          <p className="font-medium text-ink">
            {describeMarginSentence(competitiveness.rawMargin, competitiveness.referenceType ?? 'current', competitiveness.referenceYear)}
          </p>
        )}
        <p className="mt-0.5 text-[13px] text-muted">
          {competitiveness.referenceYear !== undefined
            ? `Đối chiếu ${describeReferenceLabel(competitiveness.referenceType ?? 'current', competitiveness.referenceYear)}`
            : 'Chưa có mốc đối chiếu'}
          {band ? ` · Độ tin cậy: ${CONFIDENCE_LABELS[competitiveness.confidence]}` : ''}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm md:justify-end">
        {competitiveness.rawMargin !== undefined && competitiveness.scale !== undefined && (
          <Disclosure variant="inline" summary="Xem cách tính">
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
          className="inline-flex min-h-9 shrink-0 cursor-pointer items-center rounded-lg px-2 text-sm font-semibold text-accent underline-offset-2 transition-colors duration-150 hover:bg-accent/10 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          Xem {match.shortName} →
        </button>
      </div>
    </li>
  );
}

function GroupSection({
  title,
  hint,
  icon,
  tone,
  matches,
  onOpenSchool,
}: {
  title: string;
  hint: string;
  icon: ReactNode;
  tone: string;
  matches: FieldMatch[];
  onOpenSchool: (schoolId: string) => void;
}) {
  if (matches.length === 0) return null;
  return (
    <section className="card mt-5 px-5 py-4">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tone}`}>
          {icon}
        </span>
        <div>
          <h2 className="text-lg font-bold text-ink">
            {title} <span className="font-normal text-muted">({matches.length})</span>
          </h2>
          <p className="text-sm text-muted">{hint}</p>
        </div>
      </div>
      <ul className="mt-2 divide-y divide-border">
        {matches.map((match) => (
          <MatchRow key={`${match.schoolId}:${match.programId}`} match={match} onOpenSchool={onOpenSchool} />
        ))}
      </ul>
    </section>
  );
}

function StatCard({ label, value, icon, tone, wave, valueTone = 'text-ink' }: { label: string; value: number; icon: ReactNode; tone: string; wave: string; valueTone?: string }) {
  return (
    <div className="card relative flex items-center gap-3 overflow-hidden px-4 py-3">
      <span aria-hidden="true" className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${tone}`}>
        {icon}
      </span>
      <div className="relative z-10">
        <dt className="text-sm text-muted">{label}</dt>
        <dd className={`font-display text-3xl font-bold leading-tight ${valueTone}`}>{value}</dd>
      </div>
      <StatWave color={wave} />
    </div>
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
  const needsUserInputCount = insufficientGroups.find((group) => group.reason === 'needs-user-input')?.matches.length ?? 0;
  const blockedByDataCount = result.insufficientData.length - needsUserInputCount;
  const shouldPromptForInput = assessedCount === 0 && needsUserInputCount > 0;

  return (
    <div className="min-h-svh bg-bg">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
        <button
          type="button"
          onClick={onBackToFields}
          className="-ml-1.5 inline-flex min-h-9 cursor-pointer items-center rounded-md px-1.5 text-sm font-medium text-accent underline-offset-2 hover:bg-accent/10 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          ← Về danh sách lĩnh vực
        </button>

        <header className="relative mt-4">
          <h1 className="relative max-w-2xl text-3xl font-extrabold text-ink sm:text-4xl">{field?.name ?? fieldId}</h1>
          <p className="relative mt-2 max-w-2xl text-sm leading-relaxed text-muted">{COMPETITIVENESS_DISCLAIMER}</p>
        </header>

        <section className="mt-5" aria-label="Tóm tắt kết quả theo lĩnh vực">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Lựa chọn" value={totalFound} icon={<GraduationCap size={20} />} tone="bg-accent/10 text-accent" wave="#2563eb" valueTone="text-accent" />
            <StatCard label="Đánh giá được" value={assessedCount} icon={<CheckCircle2 size={20} />} tone="bg-emerald-500/10 text-emerald-700" wave="#10b981" valueTone="text-emerald-700" />
            <StatCard label="Cần bổ sung" value={needsUserInputCount} icon={<Clock size={20} />} tone="bg-orange-500/10 text-orange-700" wave="#f97316" valueTone="text-orange-600" />
            <StatCard label="Chưa đủ dữ liệu" value={blockedByDataCount} icon={<Database size={20} />} tone="bg-slate-500/10 text-slate-700" wave="#64748b" />
          </dl>
        </section>

        <details id="field-profile-editor" className="card mt-4 px-4 py-2.5 scroll-mt-20">
          <summary className="flex min-h-(--ui-tap-min) cursor-pointer list-none items-center gap-3 py-1 [&::-webkit-details-marker]:hidden">
            <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <FileText size={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-bold text-ink">
                {profileSummary.hasData ? 'Hồ sơ dùng chung (đã có dữ liệu)' : 'Nhập hồ sơ để xem kết quả phù hợp với bạn'}
              </span>
              <span className="block text-sm text-muted">
                {profileSummary.hasData ? 'Đang sử dụng hồ sơ từ trang chủ để đánh giá mức độ phù hợp.' : 'Nhập điểm một lần, kết quả sẽ hiện theo từng lựa chọn.'}
              </span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-surface-soft px-3 py-2 text-sm font-medium text-accent">
              {profileSummary.hasData ? 'Xem chi tiết hồ sơ' : 'Nhập hồ sơ'}
              <ChevronDown size={16} aria-hidden="true" />
            </span>
          </summary>
          <SharedProfileEditor profile={profile} updateProfile={updateProfile} updateVactTotal={updateVactTotal} />
        </details>

        <p className="mt-5 text-sm text-muted" aria-live="polite">
          {totalFound === 0
            ? 'Chưa có trường/ngành nào trong lĩnh vực này có dữ liệu để đối chiếu.'
            : `Tìm thấy ${totalFound} lựa chọn, trong đó ${assessedCount} lựa chọn đánh giá được với hồ sơ hiện tại.`}
        </p>

        {shouldPromptForInput && (
          <section className="card mt-5 p-5">
            <h2 className="text-lg font-semibold text-ink">Chưa có lựa chọn đánh giá được</h2>
            <p className="mt-1 text-sm text-muted">Nhập điểm thi THPT để xem trường nào đánh giá được cho lĩnh vực này.</p>
            <a
              href="#field-profile-editor"
              className="mt-3 inline-flex min-h-(--ui-tap-min) items-center rounded-md bg-primary px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              Nhập điểm thi THPT
            </a>
          </section>
        )}

        <GroupSection
          title="Thử sức" icon={<Target size={20} />} tone="bg-orange-500/10 text-orange-700"
          hint="Điểm của bạn đang thấp hơn mốc đối chiếu."
          matches={result.groups.thuSuc}
          onOpenSchool={onOpenSchool}
        />
        <GroupSection
          title="Vừa sức" icon={<BarChart3 size={20} />} tone="bg-accent/10 text-accent"
          hint="Điểm của bạn đang quanh mốc đối chiếu."
          matches={result.groups.vuaSuc}
          onOpenSchool={onOpenSchool}
        />
        <GroupSection
          title="An toàn hơn" icon={<ShieldCheck size={20} />} tone="bg-emerald-500/10 text-emerald-700"
          hint="Điểm của bạn đang cao hơn mốc đối chiếu một khoảng rõ rệt."
          matches={result.groups.anToanHon}
          onOpenSchool={onOpenSchool}
        />

        {result.insufficientData.length > 0 && (
          <section className="card mt-5 px-5 py-4">
            <h2 className="text-lg font-bold text-ink">
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
      </div>
    </div>
  );
}
