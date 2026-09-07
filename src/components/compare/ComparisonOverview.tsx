import type { summarizeApplicantProfile } from '../../core/applicantProfileSummary';

interface ComparisonOverviewProps {
  selectionCount: number;
  uniqueSchoolCount: number;
  statusCounts: {
    exact: number;
    partial: number;
    unavailable: number;
  };
  profileSummary: ReturnType<typeof summarizeApplicantProfile>;
  onEditProfile: () => void;
}

function ProfileFactSummary({ profileSummary }: { profileSummary: ReturnType<typeof summarizeApplicantProfile> }) {
  const facts = [
    profileSummary.vactTotal !== undefined ? { label: 'ĐGNL', done: true, value: String(profileSummary.vactTotal) } : { label: 'ĐGNL', done: false },
    profileSummary.thptSubjectCount > 0 ? { label: 'THPT', done: true, value: `${profileSummary.thptSubjectCount} môn` } : { label: 'THPT', done: false },
    profileSummary.transcriptSubjectCount > 0 ? { label: 'Học bạ', done: true, value: `${profileSummary.transcriptSubjectCount} môn` } : { label: 'Học bạ', done: false },
  ];

  return (
    <div className="mt-2 flex flex-wrap gap-2 text-[13px]">
      {facts.map((fact) => (
        <span
          key={fact.label}
          className={`rounded-md border px-2 py-1 ${fact.done ? 'border-border bg-surface text-ink' : 'border-dashed border-border bg-surface text-muted'}`}
        >
          {fact.done ? `✓ ${fact.label}: ${fact.value}` : `${fact.label}: chưa nhập`}
        </span>
      ))}
    </div>
  );
}

export function ComparisonOverview({ selectionCount, uniqueSchoolCount, statusCounts, profileSummary, onEditProfile }: ComparisonOverviewProps) {
  return (
    <>
      <header className="mt-4">
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">So sánh nguyện vọng</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted">
          Một hồ sơ dùng chung, mỗi nguyện vọng đi qua evaluator riêng của trường. Điểm chuẩn chỉ hiện khi dùng cùng ngữ cảnh, phương thức, ngành và thang điểm.
        </p>
        {/* Chip tóm tắt: viền/nền trung tính, chỉ khác nhau ở sắc độ rất nhẹ theo trạng thái —
            không mỗi trạng thái một màu mạnh. */}
        <div className="mt-3 flex flex-wrap gap-2 text-[13px]">
          <span className="rounded-md border border-border bg-surface px-2.5 py-1 font-medium text-ink">
            {selectionCount} nguyện vọng
            {uniqueSchoolCount > 0 ? ` thuộc ${uniqueSchoolCount} trường` : ''}
          </span>
          <span className="rounded-md border border-success/25 bg-success/5 px-2.5 py-1 text-ink">{statusCounts.exact} tính đầy đủ</span>
          <span className="rounded-md border border-warning/25 bg-warning/5 px-2.5 py-1 text-ink">{statusCounts.partial} tính một phần</span>
          <span className="rounded-md border border-border bg-surface-soft px-2.5 py-1 text-ink">{statusCounts.unavailable} cần thêm dữ liệu</span>
        </div>
      </header>

      <section className="mt-5 rounded-md border border-accent/20 bg-accent/5 p-4 text-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-medium text-ink">Dữ liệu hồ sơ</p>
            <ProfileFactSummary profileSummary={profileSummary} />
          </div>
          <button
            type="button"
            onClick={onEditProfile}
            className="inline-flex min-h-9 shrink-0 cursor-pointer items-center rounded-md px-1.5 text-[13px] font-medium text-accent underline-offset-2 transition-colors duration-150 hover:bg-accent/10 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            Chỉnh sửa hồ sơ
          </button>
        </div>
      </section>
    </>
  );
}
