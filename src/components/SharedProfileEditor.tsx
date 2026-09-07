import { useEffect, useState, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { Disclosure } from './Disclosure';
import type { ApplicantProfile } from '../core/applicantProfile';
import type { ApplicantProfileContextValue } from '../core/applicantProfileContextCore';
import type { SubjectId } from '../core/subjects';
import { COMMON_SUBJECT_COMBINATIONS, SUBJECT_LABELS } from '../core/subjects';
import { summarizeApplicantProfile } from '../core/applicantProfileSummary';
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

const CERTIFICATE_FIELDS: { key: keyof NonNullable<ApplicantProfile['certificates']>; label: string; hint: string }[] = [
  { key: 'ielts', label: 'IELTS', hint: '0 - 9' },
  { key: 'toeflIbt', label: 'TOEFL iBT', hint: '0 - 120' },
  { key: 'toeic', label: 'TOEIC', hint: '0 - 990' },
  { key: 'sat', label: 'SAT', hint: '0 - 1600' },
  { key: 'act', label: 'ACT', hint: '0 - 36' },
  { key: 'ib', label: 'IB', hint: '0 - 45' },
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

/** 1 mục trong checklist hồ sơ — gấp lại mặc định trừ khi đã có dữ liệu, dòng tóm tắt "Đã nhập"/
 * "Chưa có" đứng ngay dưới tiêu đề (progressive disclosure, không hiện hết mọi mục 1 lúc). */
function ProfileChecklistSection({
  title,
  statusLabel,
  hasData,
  children,
}: {
  title: string;
  statusLabel: string;
  hasData: boolean;
  children: ReactNode;
}) {
  return (
    <Disclosure
      summary={title}
      defaultOpen={hasData}
      meta={<span className={hasData ? 'font-medium text-ink-soft' : undefined}>{hasData ? `✓ ${statusLabel}` : statusLabel}</span>}
    >
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
      return {
        ...current,
        transcript: {
          grade10: stripSubject(current.transcript?.grade10),
          grade11: stripSubject(current.transcript?.grade11),
          grade12: stripSubject(current.transcript?.grade12),
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

  function commitCertificate(key: keyof NonNullable<ApplicantProfile['certificates']>, raw: string) {
    const value = parseScore(raw);
    updateProfile((current) => ({ ...current, certificates: { ...current.certificates, [key]: value } }));
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

  const summary = summarizeApplicantProfile(profile);

  return (
    <div className="mt-2 mb-3 space-y-2.5 text-sm">
      <ProfileChecklistSection
        title="Đánh giá năng lực (ĐGNL)"
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

      <ProfileChecklistSection
        title="Điểm thi THPT"
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

      <ProfileChecklistSection
        title="Điểm học bạ"
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
      </ProfileChecklistSection>

      <p className="text-sm text-muted">Sửa xong bấm ra ngoài ô là tự lưu.</p>
    </div>
  );
}
