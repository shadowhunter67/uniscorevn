import { useEffect, useState, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { Disclosure } from './Disclosure';
import {
  loadStoredProfileSections,
  PROFILE_SECTION_IDS,
  PROFILE_SECTION_META,
  resolveVisibleSections,
  saveStoredProfileSections,
  type ProfileSectionId,
} from '../core/profileSections';
import { CEFR_LEVELS, HSK_LEVELS, JLPT_LEVELS, type ApplicantProfile } from '../core/applicantProfile';
import type { CERTIFICATE_RANGES } from '../core/applicantProfileStorage';
import type { ApplicantProfileContextValue } from '../core/applicantProfileContextCore';
import type { SubjectId } from '../core/subjects';
import { COMMON_SUBJECT_COMBINATIONS, SUBJECT_LABELS } from '../core/subjects';
import { summarizeApplicantProfile } from '../core/applicantProfileSummary';
import {
  hasAnySemesterScore,
  TRANSCRIPT_SEMESTER_KEYS,
  TRANSCRIPT_SEMESTER_LABELS,
  type TranscriptSemesterKey,
} from '../core/transcriptSemesters';
import { validateCertificateScore, validateThptScore, validateTranscriptScore, validateVactTotal } from '../core/profileValidationMessages';

const ALL_SUBJECT_IDS = Object.keys(SUBJECT_LABELS) as SubjectId[];

/** Style select dùng chung trong panel hồ sơ — cùng chiều cao/viền/radius với `ScoreInput` để các
 * control trong một form không mỗi cái một kiểu. */
const SELECT_CLASS =
  'h-10 rounded-md border border-border bg-surface px-2.5 text-sm text-ink outline-none transition-colors duration-150 hover:border-border-strong focus:border-accent focus:ring-2 focus:ring-accent/25';
import { ScoreInput } from './ScoreInput';

interface SharedProfileEditorProps {
  profile: ApplicantProfile;
  updateProfile: ApplicantProfileContextValue['updateProfile'];
  updateVactTotal: ApplicantProfileContextValue['updateVactTotal'];
}

/** Mã khu vực/đối tượng ưu tiên CHUẨN Bộ GD&ĐT — dùng chung nguyên trạng ở 10 trường (mỗi trường
 * tự tra bảng điểm riêng từ CÙNG bộ mã này, xem `schools/iu/priority.ts`). Không hiện số điểm
 * kèm theo ở đây vì điểm khác nhau theo từng trường — hiện số sẽ gây hiểu nhầm là dùng chung. */
const PRIORITY_REGION_OPTIONS = [
  { code: 'KV1', label: 'KV1' },
  { code: 'KV2-NT', label: 'KV2-NT' },
  { code: 'KV2', label: 'KV2' },
  { code: 'KV3', label: 'KV3' },
];

const PRIORITY_CATEGORY_OPTIONS = [
  { code: 'UT1', label: 'UT1 (đối tượng 01-03)' },
  { code: 'UT2', label: 'UT2 (đối tượng 04-06)' },
];

type CertificateScoreKey = keyof typeof CERTIFICATE_RANGES;

const CERTIFICATE_FIELDS: { key: CertificateScoreKey; label: string; hint: string }[] = [
  { key: 'ielts', label: 'IELTS', hint: '0 - 9' },
  { key: 'toeflIbt', label: 'TOEFL iBT', hint: '0 - 120' },
  { key: 'toeic', label: 'TOEIC', hint: '0 - 990' },
  { key: 'sat', label: 'SAT', hint: '0 - 1600' },
  { key: 'act', label: 'ACT', hint: '0 - 36' },
  { key: 'ib', label: 'IB', hint: '0 - 45' },
];

/**
 * Chứng chỉ tính theo BẬC, không theo điểm — dùng `<select>` (cùng kiểu với ô Khu vực/Đối tượng ưu
 * tiên ở trên) thay vì ô nhập số: người dùng chọn đúng nhãn in trên chứng chỉ ("B2", "N2", "HSK4"),
 * không phải tự quy nhãn đó ra một con số. Bậc trong `options` xếp TỪ CAO XUỐNG THẤP để bậc hay gặp
 * ở hồ sơ xét tuyển nằm gần đầu danh sách.
 */
const CERTIFICATE_LEVEL_FIELDS: { key: 'delf' | 'tcf' | 'jlpt' | 'hsk'; label: string; options: readonly string[] }[] = [
  { key: 'delf', label: 'DELF (tiếng Pháp)', options: [...CEFR_LEVELS].reverse() },
  { key: 'tcf', label: 'TCF (tiếng Pháp)', options: [...CEFR_LEVELS].reverse() },
  { key: 'jlpt', label: 'JLPT (tiếng Nhật)', options: [...JLPT_LEVELS].reverse() },
  { key: 'hsk', label: 'HSK (tiếng Trung)', options: [...HSK_LEVELS].reverse() },
];

function parseScore(raw: string): number | undefined {
  const trimmed = raw.trim();
  if (trimmed === '') return undefined;
  const value = Number(trimmed);
  return Number.isFinite(value) ? value : undefined;
}

/**
 * Ô nhập giữ string cục bộ trong lúc gõ, chỉ commit ra ngoài (parse + gọi `onCommit`) khi blur —
 * tránh việc `value` bị format lại (mất dấu chấm thập phân dở dang) sau mỗi keystroke do
 * `committedValue` từ profile dội ngược vào input đang gõ.
 */
function BufferedScoreInput({
  id,
  label,
  hideLabel,
  committedValue,
  onCommit,
  validate,
}: {
  id: string;
  label: string;
  hideLabel?: boolean;
  committedValue: number | undefined;
  onCommit: (raw: string) => void;
  /** Trả về thông báo lỗi bằng tiếng người (`core/profileValidationMessages.ts`) hoặc `null` nếu
   * hợp lệ/chưa nhập — bỏ trống thì ô này không hiện lỗi (dùng cho field không có range cố định). */
  validate?: (raw: string) => string | null;
}) {
  const [raw, setRaw] = useState(() => committedValue?.toString() ?? '');

  useEffect(() => {
    setRaw(committedValue?.toString() ?? '');
  }, [committedValue]);

  return (
    <ScoreInput
      id={id}
      label={label}
      hideLabel={hideLabel}
      value={raw}
      error={validate?.(raw) ?? null}
      onChange={setRaw}
      onBlur={() => onCommit(raw)}
      compact
    />
  );
}

/**
 * Nút xóa 1 môn đã thêm. TRƯỚC ĐÂY là chữ thật "Xóa {môn}" cạnh tên môn — đúng về khả năng đọc
 * nhưng lặp lại ở mọi dòng khiến hành động phá hủy nổi ngang với chính tên môn (nhiễu thị giác).
 * NAY: icon X nhỏ, màu muted, chỉ chuyển sang đỏ khi hover/focus. Vẫn giữ nguyên khả năng tiếp
 * cận — `aria-label`/`title` là câu đầy đủ "Xóa môn {tên}", vùng bấm ≥ --ui-tap-min, và nút LUÔN
 * hiển thị (không ẩn tới khi hover) để dùng được trên cảm ứng và với người mắt kém.
 */
function RemoveSubjectButton({
  label,
  onRemove,
  className = 'inline-flex',
}: {
  label: string;
  onRemove: () => void;
  /** BẮT BUỘC chứa class display (`inline-flex`, hoặc cặp `hidden sm:inline-flex`). Cố ý không đặt
   * `inline-flex` sẵn trong class gốc: nếu vừa có `inline-flex` gốc vừa có `hidden` từ caller thì
   * hai utility cùng specificity, thứ tự trong CSS quyết định — đã từng làm nút "chỉ desktop" vẫn
   * hiện trên mobile. */
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      aria-label={`Xóa môn ${label}`}
      title={`Xóa môn ${label}`}
      className={`h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-danger/10 hover:text-danger focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${className}`}
    >
      <X size={16} aria-hidden="true" />
    </button>
  );
}

const TRANSCRIPT_YEARS = [
  { key: 'grade10', label: 'Lớp 10', shortLabel: 'L10' },
  { key: 'grade11', label: 'Lớp 11', shortLabel: 'L11' },
  { key: 'grade12', label: 'Lớp 12', shortLabel: 'L12' },
] as const;

/**
 * 6 học kỳ gom theo NĂM HỌC — trên mobile 6 ô nằm ngang một hàng bị bóp còn ~45px/ô, nhãn
 * "Lớp 10 · HK1" bị cắt cụt nên không đọc được ô nào là học kỳ nào. Nhóm theo năm cho phép mobile
 * xếp 3 khối dọc (Lớp 10: HK1 HK2 / Lớp 11: … / Lớp 12: …), desktop vẫn trải đủ 6 cột ngang.
 */
const TRANSCRIPT_SEMESTER_YEAR_GROUPS = [
  { year: 'Lớp 10', keys: ['grade10Sem1', 'grade10Sem2'] },
  { year: 'Lớp 11', keys: ['grade11Sem1', 'grade11Sem2'] },
  { year: 'Lớp 12', keys: ['grade12Sem1', 'grade12Sem2'] },
] as const satisfies readonly { year: string; keys: readonly TranscriptSemesterKey[] }[];

const SEMESTER_SHORT_LABELS: Record<TranscriptSemesterKey, string> = {
  grade10Sem1: 'HK1',
  grade10Sem2: 'HK2',
  grade11Sem1: 'HK1',
  grade11Sem2: 'HK2',
  grade12Sem1: 'HK1',
  grade12Sem2: 'HK2',
};

/**
 * Bước đầu tiên của form: hỏi thí sinh CÓ NHỮNG LOẠI ĐIỂM NÀO trước khi render ô nhập nào. Mục
 * nào đã có dữ liệu thì checkbox bị khoá ở trạng thái bật (`lockedIds`) — bỏ tick sẽ ẩn mất điểm
 * đã nhập, gây cảm giác "mất dữ liệu"; muốn bỏ thì xoá điểm trong chính mục đó.
 */
function ScoreTypeChooser({
  chosen,
  lockedIds,
  onToggle,
  idPrefix,
}: {
  chosen: Set<ProfileSectionId>;
  lockedIds: Set<ProfileSectionId>;
  onToggle: (id: ProfileSectionId, next: boolean) => void;
  idPrefix: string;
}) {
  return (
    <fieldset className="space-y-1">
      <legend className="sr-only">Chọn các loại điểm có trong hồ sơ của bạn</legend>
      {PROFILE_SECTION_IDS.map((id) => {
        const meta = PROFILE_SECTION_META[id];
        const locked = lockedIds.has(id);
        return (
          <label
            key={id}
            htmlFor={`${idPrefix}-${id}`}
            className="flex min-h-[--ui-tap-min] cursor-pointer items-start gap-2.5 rounded-md px-1.5 py-1.5 transition-colors duration-150 hover:bg-surface-soft"
          >
            <input
              id={`${idPrefix}-${id}`}
              type="checkbox"
              checked={chosen.has(id)}
              disabled={locked}
              onChange={(event) => onToggle(id, event.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-border-strong text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed"
            />
            <span className="min-w-0">
              <span className="block text-sm font-medium text-ink">
                {meta.label}
                {meta.advanced && <span className="ml-1.5 font-normal text-muted">(nâng cao)</span>}
              </span>
              <span className="block text-sm leading-snug text-muted">
                {locked ? 'Đã có dữ liệu trong hồ sơ — xoá điểm trong mục này nếu muốn bỏ.' : meta.hint}
              </span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}

/** 1 mục trong checklist hồ sơ — gấp lại mặc định trừ khi đã có dữ liệu, dòng tóm tắt "Đã nhập"/
 * "Chưa có" đứng ngay dưới tiêu đề (progressive disclosure, không hiện hết mọi mục 1 lúc). */
function ProfileChecklistSection({
  title,
  statusLabel,
  hint,
  hasData,
  children,
}: {
  title: string;
  statusLabel: string;
  /** "Khi nào cần / để làm gì" — hiện ngay đầu mục khi mở, để không phải đoán mục này phục vụ gì. */
  hint?: string;
  hasData: boolean;
  children: ReactNode;
}) {
  return (
    <Disclosure
      summary={title}
      defaultOpen={hasData}
      meta={<span className={hasData ? 'font-medium text-ink-soft' : undefined}>{hasData ? `✓ ${statusLabel}` : statusLabel}</span>}
    >
      {hint && <p className="mb-2.5 text-sm leading-snug text-muted">{hint}</p>}
      {children}
    </Disclosure>
  );
}

/**
 * Nhập/sửa trực tiếp hồ sơ điểm dùng chung (ĐGNL tổng, môn THPT/học bạ, kể cả thêm môn mới lần
 * đầu qua AddSubjectPicker) — dùng được ngay từ landing page, không bắt buộc phải mở một trường
 * cụ thể trước. Compare (`MultiSchoolComparisonPage`) tự báo thiếu input theo từng trường.
 */
/** Môn thêm thủ công nhưng chưa gõ điểm — vẫn phải hiện ô nhập dù `ApplicantProfile` chưa có giá
 * trị (missing ≠ 0, nên không thể "thêm môn" bằng cách ghi placeholder 0 vào profile). */
function AddSubjectPicker({
  id,
  label,
  availableIds,
  onAdd,
}: {
  id: string;
  label: string;
  availableIds: SubjectId[];
  onAdd: (subjectId: SubjectId) => void;
}) {
  const [selected, setSelected] = useState('');
  if (availableIds.length === 0) return null;
  return (
    <div className="mt-1.5 flex items-center gap-2">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className={SELECT_CLASS}
      >
        <option value="">+ Thêm môn...</option>
        {availableIds.map((subjectId) => (
          <option key={subjectId} value={subjectId}>
            {SUBJECT_LABELS[subjectId]}
          </option>
        ))}
      </select>
      <button
        type="button"
        disabled={selected === ''}
        onClick={() => {
          if (selected === '') return;
          onAdd(selected as SubjectId);
          setSelected('');
        }}
        className="h-10 cursor-pointer rounded-md border border-accent/30 bg-accent/10 px-3 text-sm font-medium text-accent transition-colors duration-150 hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-soft disabled:text-muted"
      >
        Thêm
      </button>
    </div>
  );
}

export function SharedProfileEditor({ profile, updateProfile, updateVactTotal }: SharedProfileEditorProps) {
  const [componentsClearedNotice, setComponentsClearedNotice] = useState(false);
  // Môn user vừa bấm "Thêm" nhưng chưa gõ điểm nên chưa có trong profile — vẫn phải hiện ô nhập.
  const [pendingThptSubjects, setPendingThptSubjects] = useState<SubjectId[]>([]);
  const [pendingTranscriptSubjects, setPendingTranscriptSubjects] = useState<SubjectId[]>([]);
  // Loại điểm người dùng CHỌN hiển thị (pref, không phải dữ liệu điểm — xem core/profileSections.ts).
  const [chosenSections, setChosenSections] = useState<ProfileSectionId[]>(loadStoredProfileSections);

  function toggleSection(id: ProfileSectionId, next: boolean) {
    setChosenSections((current) => {
      const updated = next ? [...new Set([...current, id])] : current.filter((item) => item !== id);
      saveStoredProfileSections(updated);
      return updated;
    });
  }

  function commitVactTotal(raw: string) {
    const value = parseScore(raw);
    if (value === undefined) return;
    const { componentsCleared } = updateVactTotal(value, 'user-total-input');
    setComponentsClearedNotice(componentsCleared);
  }

  function commitThptScore(subjectId: SubjectId, raw: string) {
    const value = parseScore(raw);
    updateProfile((current) => ({
      ...current,
      thpt: { scores: { ...current.thpt?.scores, [subjectId]: value } },
    }));
  }

  function commitTranscriptScore(year: 'grade10' | 'grade11' | 'grade12', subjectId: SubjectId, raw: string) {
    const value = parseScore(raw);
    updateProfile((current) => ({
      ...current,
      transcript: { ...current.transcript, [year]: { ...current.transcript?.[year], [subjectId]: value } },
    }));
  }

  /** Ghi 1 ô điểm học kỳ — chỉ đụng nhánh `transcript.bySemester`, KHÔNG chạm `grade10/11/12`
   * (2 nhóm field độc lập, xem `core/transcriptSemesters.ts`). */
  function commitSemesterScore(semester: TranscriptSemesterKey, subjectId: SubjectId, raw: string) {
    const value = parseScore(raw);
    updateProfile((current) => ({
      ...current,
      transcript: {
        ...current.transcript,
        bySemester: {
          ...current.transcript?.bySemester,
          [semester]: { ...current.transcript?.bySemester?.[semester], [subjectId]: value },
        },
      },
    }));
  }

  function removeThptSubject(subjectId: SubjectId) {
    updateProfile((current) => {
      const { [subjectId]: _removed, ...rest } = current.thpt?.scores ?? {};
      return { ...current, thpt: { scores: rest } };
    });
    setPendingThptSubjects((current) => current.filter((id) => id !== subjectId));
  }

  function removeTranscriptSubject(subjectId: SubjectId) {
    updateProfile((current) => {
      const stripSubject = (year: Partial<Record<SubjectId, number>> | undefined) => {
        if (!year) return year;
        const { [subjectId]: _removed, ...rest } = year;
        return rest;
      };
      // Xóa môn phải cắt CẢ điểm học kỳ chi tiết của môn đó — nếu không, môn "đã xóa" vẫn còn dữ
      // liệu ẩn trong `bySemester` và sẽ hiện lại ở mục học kỳ.
      const bySemester = current.transcript?.bySemester;
      const nextBySemester = bySemester
        ? Object.fromEntries(TRANSCRIPT_SEMESTER_KEYS.filter((key) => bySemester[key]).map((key) => [key, stripSubject(bySemester[key])]))
        : undefined;
      return {
        ...current,
        transcript: {
          grade10: stripSubject(current.transcript?.grade10),
          grade11: stripSubject(current.transcript?.grade11),
          grade12: stripSubject(current.transcript?.grade12),
          bySemester: nextBySemester,
        },
      };
    });
    setPendingTranscriptSubjects((current) => current.filter((id) => id !== subjectId));
  }

  function commitPreferredCombination(combinationId: string) {
    updateProfile((current) => ({ ...current, preferredCombinationId: combinationId || undefined }));
    const combination = COMMON_SUBJECT_COMBINATIONS.find((c) => c.id === combinationId);
    if (!combination) return;
    // Chọn tổ hợp → tự hiện luôn ô nhập điểm cho đúng 3 môn của tổ hợp đó (không ghi đè môn đã có).
    setPendingThptSubjects((current) => [...new Set([...current, ...combination.subjects])]);
  }

  function commitPriorityRegion(region: string) {
    updateProfile((current) => ({ ...current, priority: { ...current.priority, region: region || undefined } }));
  }

  function commitPriorityCategory(category: string) {
    updateProfile((current) => ({ ...current, priority: { ...current.priority, category: category || undefined } }));
  }

  function commitCertificate(key: CertificateScoreKey, raw: string) {
    const value = parseScore(raw);
    updateProfile((current) => ({ ...current, certificates: { ...current.certificates, [key]: value } }));
  }

  /** Chuỗi rỗng = "Không chọn" -> `undefined` (xoá khỏi hồ sơ), không lưu chuỗi rỗng. */
  function commitCertificateLevel(key: 'delf' | 'tcf' | 'jlpt' | 'hsk', raw: string) {
    updateProfile((current) => ({ ...current, certificates: { ...current.certificates, [key]: raw || undefined } }));
  }

  function commitToeflExamDate(raw: string) {
    updateProfile((current) => ({ ...current, certificates: { ...current.certificates, toeflIbtExamDate: raw || undefined } }));
  }

  const thptSubjectIds = new Set<SubjectId>(pendingThptSubjects);
  for (const [subjectId, value] of Object.entries(profile.thpt?.scores ?? {})) {
    if (value !== undefined) thptSubjectIds.add(subjectId as SubjectId);
  }

  const transcriptSubjectIds = new Set<SubjectId>(pendingTranscriptSubjects);
  for (const year of [profile.transcript?.grade10, profile.transcript?.grade11, profile.transcript?.grade12]) {
    if (!year) continue;
    for (const [subjectId, value] of Object.entries(year)) {
      if (value !== undefined) transcriptSubjectIds.add(subjectId as SubjectId);
    }
  }

  // Mục học kỳ dùng LẠI đúng danh sách môn của mục TB năm (không bắt chọn lại môn), cộng thêm môn
  // chỉ có ở dữ liệu học kỳ (hồ sơ nhập học kỳ trước, chưa nhập TB năm).
  const semesterSubjectIds = new Set<SubjectId>(transcriptSubjectIds);
  for (const semester of TRANSCRIPT_SEMESTER_KEYS) {
    for (const [subjectId, value] of Object.entries(profile.transcript?.bySemester?.[semester] ?? {})) {
      if (value !== undefined) semesterSubjectIds.add(subjectId as SubjectId);
    }
  }
  const hasSemesterData = hasAnySemesterScore(profile);

  const summary = summarizeApplicantProfile(profile);
  const visibleSections = resolveVisibleSections(profile, chosenSections);
  const lockedSections = resolveVisibleSections(profile, []);
  const hiddenSectionCount = PROFILE_SECTION_IDS.filter((id) => !visibleSections.has(id)).length;

  // Chưa chọn gì và chưa có điểm nào: CHỈ hiện bước chọn loại điểm, không render một ô nhập nào.
  if (visibleSections.size === 0) {
    return (
      <div className="mt-2 mb-3 text-sm">
        <p className="text-sm font-medium text-ink">Hồ sơ của bạn có những loại điểm nào?</p>
        <p className="mt-1 mb-2.5 text-sm text-muted">
          Chọn loại điểm bạn đang có — chỉ những mục đó mới hiện ô nhập. Có thể thêm loại khác bất cứ lúc nào.
        </p>
        <ScoreTypeChooser chosen={visibleSections} lockedIds={lockedSections} onToggle={toggleSection} idPrefix="profile-section-start" />
      </div>
    );
  }

  return (
    <div className="mt-2 mb-3 space-y-2.5 text-sm">
      {visibleSections.has('vact') && (
      <ProfileChecklistSection
        title="Đánh giá năng lực (ĐGNL)"
        hint={PROFILE_SECTION_META.vact.hint}
        statusLabel={summary.hasVact ? `${summary.vactTotal}` : 'Chưa có'}
        hasData={summary.hasVact}
      >
        <p className="text-sm font-medium text-ink">ĐGNL (tổng điểm)</p>
        <div className="mt-1.5 max-w-[180px]">
          <BufferedScoreInput
            id="shared-profile-vact-total"
            label="Tổng điểm ĐGNL"
            hideLabel
            committedValue={profile.exams?.vact?.total}
            onCommit={commitVactTotal}
            validate={validateVactTotal}
          />
        </div>
        {componentsClearedNotice && (
          <p className="mt-1 text-sm text-warning">
            4 điểm thành phần ĐGNL (nếu đã nhập ở HCMUT) đã bị xóa vì không còn khớp tổng mới — nhập lại ở trang HCMUT nếu cần.
          </p>
        )}
      </ProfileChecklistSection>
      )}

      {visibleSections.has('thpt') && (
      <ProfileChecklistSection
        title="Điểm thi THPT"
        hint={PROFILE_SECTION_META.thpt.hint}
        statusLabel={summary.hasThpt ? `Đã nhập ${summary.thptSubjectCount} môn` : 'Chưa có'}
        hasData={summary.hasThpt}
      >
        <div>
          <label htmlFor="shared-profile-preferred-combination" className="text-sm font-medium text-ink">
            Tổ hợp môn
          </label>
          <select
            id="shared-profile-preferred-combination"
            value={profile.preferredCombinationId ?? ''}
            onChange={(e) => commitPreferredCombination(e.target.value)}
            className={`mt-1.5 block w-full max-w-md ${SELECT_CLASS}`}
          >
            <option value="">Không chọn</option>
            {COMMON_SUBJECT_COMBINATIONS.map((combination) => (
              <option key={combination.id} value={combination.id}>
                {combination.id} ({combination.subjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' - ')})
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-muted">
            Chọn tổ hợp sẽ tự hiện ô nhập điểm đúng 3 môn bên dưới — hoặc bỏ qua bước này, tự thêm từng môn. Đây chỉ
            là gợi ý nhanh, không tự áp dụng cho trường nào; nếu một trường tính điểm không khớp tổ hợp bạn chọn ở
            đây, vào trang chi tiết của trường đó để chọn/sửa lại tổ hợp riêng cho trường đó.
          </p>
        </div>

        {thptSubjectIds.size > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2.5 sm:grid-cols-3">
            {[...thptSubjectIds].map((subjectId) => (
              <div key={subjectId}>
                <div className="flex min-h-8 items-center justify-between gap-1">
                  <label htmlFor={`shared-profile-thpt-${subjectId}`} className="truncate text-sm font-medium text-ink">
                    {SUBJECT_LABELS[subjectId]}
                  </label>
                  <RemoveSubjectButton label={SUBJECT_LABELS[subjectId]} onRemove={() => removeThptSubject(subjectId)} />
                </div>
                <BufferedScoreInput
                  id={`shared-profile-thpt-${subjectId}`}
                  label={SUBJECT_LABELS[subjectId]}
                  hideLabel
                  committedValue={profile.thpt?.scores?.[subjectId]}
                  onCommit={(raw) => commitThptScore(subjectId, raw)}
                  validate={(raw) => validateThptScore(SUBJECT_LABELS[subjectId], raw)}
                />
              </div>
            ))}
          </div>
        )}
        <div className="mt-2">
          <AddSubjectPicker
            id="shared-profile-add-thpt-subject"
            label="Thêm môn cho điểm THPT"
            availableIds={ALL_SUBJECT_IDS.filter((id) => !thptSubjectIds.has(id))}
            onAdd={(subjectId) => setPendingThptSubjects((current) => [...current, subjectId])}
          />
        </div>
      </ProfileChecklistSection>
      )}

      {visibleSections.has('transcript') && (
      <ProfileChecklistSection
        title="Điểm học bạ"
        hint={PROFILE_SECTION_META.transcript.hint}
        statusLabel={summary.hasTranscript ? `Đã nhập ${summary.transcriptSubjectCount} môn` : 'Chưa có'}
        hasData={summary.hasTranscript}
      >
        {/* 3 ô mỗi môn = điểm trung bình môn của LỚP 10 / 11 / 12 (xem `commitTranscriptScore` và
            `ApplicantProfile.transcript.grade10|grade11|grade12`), không phải 3 kỳ/3 năm nào khác.
            Trước đây 3 ô này không có tiêu đề cột nên không đọc được ô nào là lớp nào. */}
        {transcriptSubjectIds.size > 0 && (
          <div className="space-y-2.5">
            <div className="hidden grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))_2rem] items-end gap-x-2.5 sm:grid">
              <span className="text-sm font-medium text-ink-soft">Môn</span>
              {TRANSCRIPT_YEARS.map((year) => (
                <span key={year.key} className="text-center text-sm font-medium text-ink-soft">
                  {year.label}
                </span>
              ))}
              <span className="sr-only">Xóa môn</span>
            </div>

            {[...transcriptSubjectIds].map((subjectId) => (
              <div
                key={subjectId}
                className="grid grid-cols-3 items-start gap-x-2 gap-y-1.5 border-t border-border pt-2.5 sm:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))_2rem] sm:items-center sm:gap-x-2.5 sm:border-t-0 sm:pt-0"
              >
                <div className="col-span-3 flex items-center justify-between gap-2 sm:col-span-1 sm:min-w-0">
                  <span className="truncate text-sm font-medium text-ink">{SUBJECT_LABELS[subjectId]}</span>
                  <RemoveSubjectButton
                    label={SUBJECT_LABELS[subjectId]}
                    onRemove={() => removeTranscriptSubject(subjectId)}
                    className="inline-flex sm:hidden"
                  />
                </div>
                {TRANSCRIPT_YEARS.map((year) => (
                  <div key={year.key}>
                    {/* Dưới sm không có hàng tiêu đề cột nên mỗi ô tự mang nhãn ngắn L10/L11/L12. */}
                    <span aria-hidden="true" className="mb-0.5 block text-center text-xs font-medium text-muted sm:hidden">
                      {year.shortLabel}
                    </span>
                    <BufferedScoreInput
                      id={`shared-profile-transcript-${year.key}-${subjectId}`}
                      label={`${SUBJECT_LABELS[subjectId]} ${year.label}`}
                      hideLabel
                      committedValue={profile.transcript?.[year.key]?.[subjectId]}
                      onCommit={(raw) => commitTranscriptScore(year.key, subjectId, raw)}
                      validate={(raw) => validateTranscriptScore(SUBJECT_LABELS[subjectId], year.label.toLowerCase(), raw)}
                    />
                  </div>
                ))}
                <RemoveSubjectButton
                  label={SUBJECT_LABELS[subjectId]}
                  onRemove={() => removeTranscriptSubject(subjectId)}
                  className="hidden sm:inline-flex"
                />
              </div>
            ))}
          </div>
        )}
        <div className="mt-2">
          <AddSubjectPicker
            id="shared-profile-add-transcript-subject"
            label="Thêm môn cho điểm học bạ"
            availableIds={ALL_SUBJECT_IDS.filter((id) => !transcriptSubjectIds.has(id))}
            onAdd={(subjectId) => setPendingTranscriptSubjects((current) => [...current, subjectId])}
          />
        </div>
      </ProfileChecklistSection>
      )}

      {/* Mục PHỤ, mặc định gấp — đường đi chính vẫn là TB cả năm ở trên. Chỉ mở khi thí sinh xét
          những trường công bố công thức tính trên 6 học kỳ. */}
      {visibleSections.has('semesters') && (
      <ProfileChecklistSection
        title="Điểm học bạ theo từng học kỳ (nâng cao)"
        statusLabel={hasSemesterData ? `Đã nhập ${semesterSubjectIds.size} môn` : 'Không bắt buộc — chưa có'}
        hasData={hasSemesterData}
      >
        <p className="text-sm text-muted">
          Một số trường (VLU, HUTECH, ĐH Luật TP.HCM) tính điểm học bạ bằng trung bình cộng của <strong>6 học kỳ</strong>,
          không dùng điểm trung bình cả năm ở mục trên — hai cách tính này ra số khác nhau nên không suy được từ nhau.
          Chỉ cần nhập ở đây nếu bạn xét những trường đó; phải đủ cả 6 học kỳ của một môn thì mới tính được.
        </p>
        {semesterSubjectIds.size === 0 ? (
          <p className="mt-2 text-sm text-muted">Thêm môn ở mục "Điểm học bạ" phía trên trước, các môn đó sẽ tự hiện ở đây.</p>
        ) : (
          <div className="mt-3 space-y-4">
            {[...semesterSubjectIds].map((subjectId) => (
              <div key={subjectId} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
                <p className="text-sm font-medium text-ink">{SUBJECT_LABELS[subjectId]}</p>
                {/* Mobile: 1 khối / năm học (nhãn năm + 2 ô HK1-HK2). Từ sm: 3 khối nằm ngang thành
                    đủ 6 cột như trước. Nhãn năm dùng `aria-hidden` vì mỗi ô đã có label đầy đủ. */}
                <div className="mt-1.5 grid gap-x-3 gap-y-2.5 sm:grid-cols-3">
                  {TRANSCRIPT_SEMESTER_YEAR_GROUPS.map((group) => (
                    <div key={group.year} className="min-w-0">
                      <span aria-hidden="true" className="block text-xs font-medium text-muted">
                        {group.year}
                      </span>
                      <div className="mt-0.5 grid grid-cols-2 gap-2">
                        {group.keys.map((semester) => (
                          <div key={semester} className="min-w-0">
                            <label
                              htmlFor={`shared-profile-transcript-semester-${semester}-${subjectId}`}
                              className="block truncate text-xs text-muted"
                            >
                              {SEMESTER_SHORT_LABELS[semester]}
                            </label>
                            <BufferedScoreInput
                              id={`shared-profile-transcript-semester-${semester}-${subjectId}`}
                              label={`${SUBJECT_LABELS[subjectId]} ${TRANSCRIPT_SEMESTER_LABELS[semester]}`}
                              hideLabel
                              committedValue={profile.transcript?.bySemester?.[semester]?.[subjectId]}
                              onCommit={(raw) => commitSemesterScore(semester, subjectId, raw)}
                              validate={(raw) =>
                                validateTranscriptScore(SUBJECT_LABELS[subjectId], TRANSCRIPT_SEMESTER_LABELS[semester], raw)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </ProfileChecklistSection>
      )}

      <ProfileChecklistSection
        title="Khu vực & đối tượng ưu tiên"
        statusLabel={summary.hasPriority ? [profile.priority?.region, profile.priority?.category].filter(Boolean).join(' · ') : 'Chưa có'}
        hasData={summary.hasPriority}
      >
        <div className="flex flex-wrap gap-4">
          <div>
            <label htmlFor="shared-profile-priority-region" className="text-sm font-medium text-ink">
              Khu vực
            </label>
            <select
              id="shared-profile-priority-region"
              value={profile.priority?.region ?? ''}
              onChange={(e) => commitPriorityRegion(e.target.value)}
              className={`mt-1 block w-40 ${SELECT_CLASS}`}
            >
              <option value="">Không chọn</option>
              {PRIORITY_REGION_OPTIONS.map(({ code, label }) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="shared-profile-priority-category" className="text-sm font-medium text-ink">
              Đối tượng ưu tiên
            </label>
            <select
              id="shared-profile-priority-category"
              value={profile.priority?.category ?? ''}
              onChange={(e) => commitPriorityCategory(e.target.value)}
              className={`mt-1 block w-60 max-w-full ${SELECT_CLASS}`}
            >
              <option value="">Không chọn</option>
              {PRIORITY_CATEGORY_OPTIONS.map(({ code, label }) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-1 text-sm text-muted">Mã chuẩn Bộ GD&ĐT — mỗi trường tự quy đổi ra điểm cộng riêng, không hiện số điểm chung ở đây.</p>
      </ProfileChecklistSection>

      {visibleSections.has('certificates') && (
      <ProfileChecklistSection
        title="Chứng chỉ quốc tế"
        statusLabel={summary.hasCertificates ? `Đã nhập ${summary.certificateCount} chứng chỉ` : 'Không bắt buộc — chưa có'}
        hasData={summary.hasCertificates}
      >
        <p className="text-sm text-muted">Dùng để tính điểm thưởng/khuyến khích ở trường có hỗ trợ quy đổi.</p>
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CERTIFICATE_FIELDS.map(({ key, label, hint }) => (
            <BufferedScoreInput
              key={key}
              id={`shared-profile-certificate-${key}`}
              label={`${label} (${hint})`}
              committedValue={profile.certificates?.[key]}
              onCommit={(raw) => commitCertificate(key, raw)}
              validate={(raw) => validateCertificateScore(key, label, raw)}
            />
          ))}
        </div>

        {/* Ngày dự thi TOEFL chỉ hiện khi ĐÃ có điểm TOEFL — hỏi ngày của một kỳ thi chưa nhập điểm
            là câu hỏi thừa. Một số trường (vd HCMULAW) quy đổi TOEFL iBT theo 2 thang điểm khác
            nhau tuỳ ngày dự thi, nên cùng một con số có thể ra 2 mức điểm cộng khác nhau. */}
        {profile.certificates?.toeflIbt !== undefined && (
          <div className="mt-3">
            <label htmlFor="shared-profile-certificate-toefl-date" className="text-sm font-medium text-ink">
              Ngày dự thi TOEFL iBT
            </label>
            <input
              id="shared-profile-certificate-toefl-date"
              type="date"
              value={profile.certificates?.toeflIbtExamDate ?? ''}
              onChange={(e) => commitToeflExamDate(e.target.value)}
              className={`mt-1 block w-52 max-w-full ${SELECT_CLASS}`}
            />
            <p className="mt-1 text-sm text-muted">
              ETS đã đổi thang điểm TOEFL iBT — có trường quy đổi điểm cộng theo 2 bảng khác nhau tuỳ ngày dự thi. Nhập ngày ghi trên chứng chỉ.
            </p>
          </div>
        )}

        <p className="mt-4 text-sm font-medium text-ink">Chứng chỉ theo bậc</p>
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CERTIFICATE_LEVEL_FIELDS.map(({ key, label, options }) => (
            <div key={key}>
              <label htmlFor={`shared-profile-certificate-${key}`} className="text-sm font-medium text-ink">
                {label}
              </label>
              <select
                id={`shared-profile-certificate-${key}`}
                value={profile.certificates?.[key] ?? ''}
                onChange={(e) => commitCertificateLevel(key, e.target.value)}
                className={`mt-1 block w-full ${SELECT_CLASS}`}
              >
                <option value="">Không chọn</option>
                {options.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </ProfileChecklistSection>
      )}

      {hiddenSectionCount > 0 && (
        <Disclosure summary={`Thêm loại điểm khác (${hiddenSectionCount})`}>
          <ScoreTypeChooser chosen={visibleSections} lockedIds={lockedSections} onToggle={toggleSection} idPrefix="profile-section-more" />
        </Disclosure>
      )}

      <p className="text-sm text-muted">Sửa xong bấm ra ngoài ô là tự lưu.</p>
    </div>
  );
}
