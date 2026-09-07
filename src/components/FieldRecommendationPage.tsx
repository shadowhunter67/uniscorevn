import { useMemo } from 'react';
import { useApplicantProfile } from '../core/applicantProfileContextCore';
import { summarizeApplicantProfile } from '../core/applicantProfileSummary';
import type { FieldId } from '../taxonomy/fields';
import { getField } from '../taxonomy/fields';
import { recommendSchoolsForField, type FieldMatch } from '../recommend/fieldRecommendation';
import { CompetitivenessRow } from './CompetitivenessRow';
import { CompetitivenessExplanation } from './CompetitivenessExplanation';
import { COMPETITIVENESS_DISCLAIMER } from '../evaluation/competitiveness/competitivenessLanguage';
import { SharedProfileEditor } from './SharedProfileEditor';

interface FieldRecommendationPageProps {
  fieldId: FieldId;
  onBackToFields: () => void;
  onOpenSchool: (schoolId: string) => void;
}

function MatchRow({ match, onOpenSchool }: { match: FieldMatch; onOpenSchool: (schoolId: string) => void }) {
  return (
    <li className="py-3.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="text-base font-medium text-ink">
          {match.shortName} <span className="font-normal text-muted">· {match.programName}</span>
        </p>
        <button
          type="button"
          onClick={() => onOpenSchool(match.schoolId)}
          className="text-sm font-medium text-accent underline-offset-2 hover:underline"
        >
          Xem {match.shortName}
        </button>
      </div>
      <div className="mt-1">
        <CompetitivenessRow assessment={match.competitiveness} />
        <CompetitivenessExplanation assessment={match.competitiveness} />
      </div>
    </li>
  );
}

function GroupSection({ title, matches, onOpenSchool }: { title: string; matches: FieldMatch[]; onOpenSchool: (schoolId: string) => void }) {
  if (matches.length === 0) return null;
  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold text-ink">
        {title} <span className="font-normal text-muted">({matches.length})</span>
      </h2>
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
  const totalFound = result.groups.thuSuc.length + result.groups.vuaSuc.length + result.groups.anToanHon.length + result.insufficientData.length;

  return (
    <div className="min-h-svh bg-bg">
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <button type="button" onClick={onBackToFields} className="text-sm font-medium text-accent underline-offset-2 hover:underline">
          Về danh sách lĩnh vực
        </button>

        <h1 className="mt-5 text-2xl font-bold text-ink sm:text-3xl">{field?.name ?? fieldId}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{COMPETITIVENESS_DISCLAIMER}</p>

        <details open={!profileSummary.hasData} className="mt-4 rounded-md border border-accent/20 bg-accent/5 px-3 py-2.5">
          <summary className="cursor-pointer text-sm font-medium text-ink">
            {profileSummary.hasData ? 'Hồ sơ dùng chung (đã có dữ liệu)' : 'Nhập hồ sơ để xem kết quả phù hợp với bạn'}
          </summary>
          <SharedProfileEditor profile={profile} updateProfile={updateProfile} updateVactTotal={updateVactTotal} />
        </details>

        <p className="mt-4 text-sm text-muted" aria-live="polite">
          Tìm thấy {totalFound} lựa chọn
        </p>

        <GroupSection title="THỬ SỨC" matches={result.groups.thuSuc} onOpenSchool={onOpenSchool} />
        <GroupSection title="VỪA SỨC" matches={result.groups.vuaSuc} onOpenSchool={onOpenSchool} />
        <GroupSection title="AN TOÀN HƠN" matches={result.groups.anToanHon} onOpenSchool={onOpenSchool} />

        {result.insufficientData.length > 0 && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold text-ink">
              Chưa đủ dữ liệu để đánh giá <span className="font-normal text-muted">({result.insufficientData.length})</span>
            </h2>
            <p className="mt-1 text-sm text-muted">
              Trường/ngành có trong lĩnh vực này nhưng hồ sơ của bạn chưa đủ dữ liệu (thiếu điểm, hoặc chưa có điểm chuẩn đối
              chiếu được) để xếp vào 1 trong 3 nhóm trên.
            </p>
            <ul className="mt-2 divide-y divide-border border-y border-border">
              {result.insufficientData.map((match) => (
                <li key={`${match.schoolId}:${match.programId}`} className="flex items-center justify-between gap-3 py-3">
                  <p className="text-sm text-ink">
                    {match.shortName} <span className="text-muted">· {match.programName}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenSchool(match.schoolId)}
                    className="shrink-0 text-sm font-medium text-accent underline-offset-2 hover:underline"
                  >
                    Xem {match.shortName}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
