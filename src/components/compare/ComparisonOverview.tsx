import { FileText, Pencil } from 'lucide-react';
import type { summarizeApplicantProfile } from '../../core/applicantProfileSummary';
import { COMPETITIVENESS_DISCLAIMER } from '../../evaluation/competitiveness/competitivenessLanguage';

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
          className={`rounded-full border px-3 py-1 ${fact.done ? 'border-emerald-500/30 bg-emerald-500/5 text-ink' : 'border-dashed border-border bg-surface text-muted'}`}
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
      <header className="relative mt-4">
        <h1 className="relative text-3xl font-extrabold text-ink sm:text-4xl">So sánh nguyện vọng</h1>
        {/* Disclaimer đặt MỘT LẦN ở đầu trang (trước đây lặp trong từng card) — trong card chỉ còn
            năm tham chiếu, độ tin cậy và nguồn. */}
        <p className="relative mt-2 max-w-3xl text-sm text-muted">
          Mỗi nguyện vọng được tính theo quy tắc tuyển sinh riêng của từng trường, từ cùng một hồ sơ điểm. Điểm chuẩn chỉ đem ra
          đối chiếu khi cùng phương thức, ngành và thang điểm. {COMPETITIVENESS_DISCLAIMER}
        </p>
        {/* Chip tóm tắt: viền/nền trung tính, chỉ khác nhau ở sắc độ rất nhẹ theo trạng thái —
            không mỗi trạng thái một màu mạnh. */}
        <div className="mt-3 flex flex-wrap gap-2 text-[13px]">
          <span className="rounded-full bg-accent/10 px-3 py-1 font-semibold text-accent">
            {selectionCount} nguyện vọng
            {uniqueSchoolCount > 0 ? ` thuộc ${uniqueSchoolCount} trường` : ''}
          </span>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-medium text-emerald-800">{statusCounts.exact} tính đầy đủ</span>
          <span className="rounded-full bg-orange-500/10 px-3 py-1 font-medium text-orange-800">{statusCounts.partial} tính một phần</span>
          <span className="rounded-full bg-slate-500/10 px-3 py-1 font-medium text-slate-700">{statusCounts.unavailable} cần thêm dữ liệu</span>
        </div>
      </header>

      <section className="card mt-5 p-4 text-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="flex items-center gap-2 font-semibold text-ink"><FileText size={18} className="text-accent" aria-hidden="true" />Dữ liệu hồ sơ</p>
            <ProfileFactSummary profileSummary={profileSummary} />
          </div>
          <button
            type="button"
            onClick={onEditProfile}
            className="inline-flex min-h-9 shrink-0 cursor-pointer items-center rounded-md px-1.5 text-[13px] font-medium text-accent underline-offset-2 transition-colors duration-150 hover:bg-accent/10 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            <Pencil size={14} className="mr-1.5" aria-hidden="true" />
            Chỉnh sửa hồ sơ →
          </button>
        </div>
      </section>
    </>
  );
}
