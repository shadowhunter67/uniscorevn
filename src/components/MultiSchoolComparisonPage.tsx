import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { activeAdmissionConfig } from '../schools/hcmut/config/admission-2026';
import { validateBonusComponent, validatePriorityRaw } from '../schools/hcmut/validation';
import { validateRange } from '../core/rangeValidation';
import { USH_SUBJECT_PAIRS, USH_TALENT_MAX_10 } from '../schools/ush/eligibility';
import { HCMUPES_SUBJECT_PAIRS, HCMUPES_TALENT_MAX_10 } from '../schools/hcmupes/eligibility';
import { ScoreInput } from './ScoreInput';
import { buildSelectionFromDraft, EMPTY_DRAFT, SCHOOLS_REQUIRING_COMBINATION, selectionToDraft, type PickerDraft } from './compare/pickerDraft';
import { useApplicantProfile } from '../core/applicantProfileContextCore';
import { summarizeApplicantProfile } from '../core/applicantProfileSummary';
import { COMMON_SUBJECT_COMBINATIONS } from '../core/subjects';
import { evaluateComparisonSelections } from '../compare/evaluateApplicantAcrossSchools';
import { getEvaluationDisplayStatus } from '../compare/evaluationDisplay';
import {
  addComparisonSelection,
  COMPARE_SELECTION_HARD_LIMIT,
  COMPARE_SELECTION_SOFT_LIMIT,
  isDuplicateComparisonSelection,
  loadStoredComparisonSelections,
  moveComparisonSelection,
  parseComparisonSelectionsFromUrl,
  removeComparisonSelection,
  saveStoredComparisonSelections,
  updateComparisonSelection,
  type ComparisonSelection,
} from '../compare/comparisonSelection';
import {
  getCapabilityLabel,
  getProgramCatalogEntry,
  getUniversityCatalogEntry,
  searchProgramCatalog,
  searchUniversityCatalog,
  universityCatalog,
  type ProgramCatalogEntry,
  type UniversityCatalogEntry,
} from '../compare/universityCatalog';
import { ComparisonEntryCard } from './compare/ComparisonEntryCard';
import { ComparisonOverview } from './compare/ComparisonOverview';
import type { ProgramOption } from './compare/types';

interface MultiSchoolComparisonPageProps {
  onBackHome: () => void;
  onOpenSchool: (schoolId: string) => void;
}

function loadInitialSelections(): ComparisonSelection[] {
  if (typeof window === 'undefined') return [];
  const params = new URLSearchParams(window.location.search);
  const sharedSelections = parseComparisonSelectionsFromUrl(params.get('s'));
  const focusedSchoolId = params.get('school');
  if (sharedSelections.length === 0 && focusedSchoolId && getUniversityCatalogEntry(focusedSchoolId)) {
    return [{ id: 'focused-school', schoolId: focusedSchoolId }];
  }
  return sharedSelections.length > 0 ? sharedSelections : loadStoredComparisonSelections();
}

function toProgramOption(program: ProgramCatalogEntry | undefined): ProgramOption | undefined {
  return program
    ? {
        id: program.programId,
        code: program.code,
        name: program.name,
        campus: program.campus,
      }
    : undefined;
}

function CapabilityBadge({ school }: { school: UniversityCatalogEntry }) {
  const tone =
    school.capability === 'exact'
      ? 'border-success/25 bg-success/5 text-ink-soft'
      : school.capability === 'partial'
        ? 'border-warning/25 bg-warning/5 text-ink-soft'
        : 'border-border bg-surface-soft text-muted';
  return (
    <span className={`shrink-0 rounded-md border px-1.5 py-0.5 text-xs font-medium ${tone}`}>
      {getCapabilityLabel(school.capability, school.schoolId)}
    </span>
  );
}

/** Ô tìm kiếm trong modal — 2 cột (chọn trường / chọn ngành) dùng CHUNG một style, trước đây mỗi
 * bên tự viết class nên lệch nhau. */
function PickerSearchField({
  id,
  label,
  value,
  placeholder,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <>
      <label className="text-sm font-medium text-ink" htmlFor={id}>
        {label}
      </label>
      <div className="mt-1.5 flex h-10 items-center gap-2 rounded-md border border-border bg-surface px-3 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25">
        <Search size={15} className="shrink-0 text-muted" aria-hidden="true" />
        <input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
        />
      </div>
    </>
  );
}

/**
 * Câu giải thích vì sao nút "Thêm vào so sánh" đang bị khóa. THUẦN HIỂN THỊ — điều kiện thật vẫn do
 * `buildSelectionFromDraft` quyết định (hàm này chỉ đọc lại draft để diễn giải), không tự nới/siết
 * điều kiện nào. Nhánh cuối là fallback cho trường hợp còn ô nhập sai range.
 */
function describeBlockedSubmit(draft: PickerDraft, selectedSchool: UniversityCatalogEntry | undefined, duplicate: boolean): string | null {
  if (duplicate) return 'Nguyện vọng này đã có trong danh sách.';
  if (!draft.schoolId) return 'Chọn một trường ở cột bên trái để tiếp tục.';
  if (selectedSchool && selectedSchool.programs.length > 0 && !draft.programId) return 'Chọn một ngành để tiếp tục.';
  if (SCHOOLS_REQUIRING_COMBINATION.has(draft.schoolId) && !draft.combinationId) return 'Chọn tổ hợp môn để tiếp tục.';
  if (draft.schoolId === 'ush' && !draft.ushPairId) return 'Chọn tổ hợp USH để tiếp tục.';
  if (draft.schoolId === 'hcmupes' && !draft.hcmupesPairId) return 'Chọn tổ hợp HCMUPES để tiếp tục.';
  return 'Còn ô nhập chưa hợp lệ — sửa ô đang báo lỗi ở trên để tiếp tục.';
}

function ComparePicker({
  selections,
  editingSelectionId,
  draft,
  onDraftChange,
  onClose,
  onSubmit,
}: {
  selections: readonly ComparisonSelection[];
  editingSelectionId?: string;
  draft: PickerDraft;
  onDraftChange: (draft: PickerDraft) => void;
  onClose: () => void;
  onSubmit: () => void;
}) {
  const [schoolQuery, setSchoolQuery] = useState('');
  const [programQuery, setProgramQuery] = useState('');
  const selectedSchool = getUniversityCatalogEntry(draft.schoolId);
  const selectedProgram = getProgramCatalogEntry(draft.schoolId, draft.programId);
  const candidate = buildSelectionFromDraft(draft);
  const duplicate = candidate ? isDuplicateComparisonSelection(selections, candidate, editingSelectionId) : false;
  const canSubmit = candidate !== undefined && !duplicate;
  const blockedReason = canSubmit ? null : describeBlockedSubmit(draft, selectedSchool, duplicate);
  const schools = searchUniversityCatalog(schoolQuery).slice(0, 30);
  const programs = selectedSchool ? searchProgramCatalog(programQuery, selectedSchool.programs).slice(0, 80) : [];
  const dialogRef = useFocusTrap<HTMLDivElement>(onClose);

  function selectSchool(schoolId: string) {
    onDraftChange({ ...EMPTY_DRAFT, schoolId });
    setProgramQuery('');
  }

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex bg-ink/40 p-3 outline-none sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-picker-title"
    >
      {/* max-h-full + flex-col: phần thân cuộn được, header và footer luôn nằm trong khung nhìn. */}
      <div className="m-auto flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-md border border-border bg-surface shadow-card">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border p-4">
          <div>
            <h2 id="compare-picker-title" className="text-base font-semibold text-ink sm:text-lg">
              {editingSelectionId ? 'Đổi nguyện vọng' : 'Thêm trường/ngành'}
            </h2>
            <p className="mt-0.5 text-[13px] text-muted">Chọn trường, ngành và ngữ cảnh riêng của trường. Hồ sơ cá nhân không nằm trong lựa chọn này.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border text-muted transition-colors duration-150 hover:bg-surface-soft hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            aria-label="Đóng"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Mobile: 1 cột, cuộn chung cả khối. Từ md trở lên: 2 cột, mỗi cột tự cuộn. */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto md:grid md:grid-cols-[0.9fr_1.1fr] md:overflow-hidden">
          <section className="border-b border-border p-4 md:min-h-0 md:overflow-y-auto md:border-b-0 md:border-r">
            <PickerSearchField
              id="school-search"
              label="Chọn trường"
              value={schoolQuery}
              placeholder="hcmut, bách khoa, nhân văn..."
              onChange={setSchoolQuery}
            />
            <div className="mt-3 space-y-2">
              {schools.map((school) => (
                <button
                  key={school.schoolId}
                  type="button"
                  onClick={() => selectSchool(school.schoolId)}
                  aria-pressed={draft.schoolId === school.schoolId}
                  className={`w-full cursor-pointer rounded-md border p-3 text-left transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                    draft.schoolId === school.schoolId
                      ? 'border-accent bg-accent/5 ring-1 ring-accent/30'
                      : 'border-border hover:border-border-strong hover:bg-surface-soft'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-semibold text-ink">{school.shortName}</span>
                    <CapabilityBadge school={school} />
                  </div>
                  <p className="mt-1 text-[13px] text-muted">{school.fullName}</p>
                  <p className="mt-0.5 text-xs text-muted">{school.programs.length} ngành có dữ liệu</p>
                </button>
              ))}
            </div>
          </section>

          <section className="p-4 md:min-h-0 md:overflow-y-auto">
            {selectedSchool ? (
              <>
                {selectedSchool.programs.length > 0 ? (
                  <>
                    <PickerSearchField
                      id="program-search"
                      label="Chọn ngành"
                      value={programQuery}
                      placeholder="7480101, khoa học máy tính, báo chí..."
                      onChange={setProgramQuery}
                    />
                    <div className="mt-3 max-h-64 space-y-1 overflow-y-auto rounded-md border border-border p-2">
                      {programs.map((program) => (
                        <button
                          key={`${selectedSchool.schoolId}-${program.programId}`}
                          type="button"
                          onClick={() => onDraftChange({ ...draft, programId: program.programId })}
                          aria-pressed={draft.programId === program.programId}
                          className={`w-full cursor-pointer rounded-md p-2 text-left text-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                            draft.programId === program.programId ? 'bg-accent/10 font-medium text-ink' : 'text-ink-soft hover:bg-surface-soft'
                          }`}
                        >
                          <span className="font-medium text-ink">{program.code ? `${program.code} - ` : ''}</span>
                          {program.name}
                          {program.campus ? <span className="text-[13px] text-muted"> ({program.campus})</span> : null}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="rounded-md bg-surface-soft p-3 text-[13px] text-muted">
                    Trường này chưa có danh mục ngành chi tiết trong UniScoreVN — vẫn thêm được vào so sánh, chỉ không chọn được ngành cụ thể.
                  </p>
                )}

                {SCHOOLS_REQUIRING_COMBINATION.has(draft.schoolId) && (
                  <label className="mt-4 block text-sm font-medium text-ink">
                    Tổ hợp
                    <select
                      value={draft.combinationId}
                      onChange={(event) => onDraftChange({ ...draft, combinationId: event.target.value })}
                      className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-2.5 text-sm text-ink outline-none transition-colors duration-150 hover:border-border-strong focus:border-accent focus:ring-2 focus:ring-accent/25"
                    >
                      <option value="">Chưa chọn</option>
                      {COMMON_SUBJECT_COMBINATIONS.map((combination) => (
                        <option key={combination.id} value={combination.id}>
                          {combination.id}
                        </option>
                      ))}
                    </select>
                  </label>
                )}

                {draft.schoolId === 'hcmut' && (
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <ScoreInput
                      id="compare-hcmut-priority"
                      label="Điểm ưu tiên thang 30"
                      hint={`0 - ${activeAdmissionConfig.priority.maxRaw30Scale}`}
                      value={draft.hcmutPriority}
                      error={validatePriorityRaw(draft.hcmutPriority, activeAdmissionConfig).error}
                      onChange={(value) => onDraftChange({ ...draft, hcmutPriority: value })}
                      compact
                    />
                    <ScoreInput
                      id="compare-hcmut-reward"
                      label="Thưởng"
                      value={draft.hcmutReward}
                      error={validateBonusComponent(draft.hcmutReward).error}
                      onChange={(value) => onDraftChange({ ...draft, hcmutReward: value })}
                      compact
                    />
                    <ScoreInput
                      id="compare-hcmut-consideration"
                      label="Xét thưởng"
                      value={draft.hcmutConsiderationReward}
                      error={validateBonusComponent(draft.hcmutConsiderationReward).error}
                      onChange={(value) => onDraftChange({ ...draft, hcmutConsiderationReward: value })}
                      compact
                    />
                    <ScoreInput
                      id="compare-hcmut-encouragement"
                      label="Khuyến khích"
                      value={draft.hcmutEncouragement}
                      error={validateBonusComponent(draft.hcmutEncouragement).error}
                      onChange={(value) => onDraftChange({ ...draft, hcmutEncouragement: value })}
                      compact
                    />
                  </div>
                )}

                {draft.schoolId === 'ush' && (
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-ink">
                      Tổ hợp USH
                      <select
                        value={draft.ushPairId}
                        onChange={(event) => onDraftChange({ ...draft, ushPairId: event.target.value })}
                        className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-2.5 text-sm text-ink outline-none transition-colors duration-150 hover:border-border-strong focus:border-accent focus:ring-2 focus:ring-accent/25"
                      >
                        <option value="">Chưa chọn</option>
                        {USH_SUBJECT_PAIRS.map((pair) => (
                          <option key={pair.id} value={pair.id}>
                            {pair.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <ScoreInput
                      id="compare-ush-talent-score"
                      label="Điểm năng khiếu TDTT"
                      hint={`0 - ${USH_TALENT_MAX_10}`}
                      value={draft.ushTalentScore10}
                      error={validateRange(draft.ushTalentScore10, 0, USH_TALENT_MAX_10).error}
                      onChange={(value) => onDraftChange({ ...draft, ushTalentScore10: value })}
                      compact
                    />
                  </div>
                )}

                {draft.schoolId === 'hcmupes' && (
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-ink">
                      Tổ hợp HCMUPES
                      <select
                        value={draft.hcmupesPairId}
                        onChange={(event) => onDraftChange({ ...draft, hcmupesPairId: event.target.value })}
                        className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-2.5 text-sm text-ink outline-none transition-colors duration-150 hover:border-border-strong focus:border-accent focus:ring-2 focus:ring-accent/25"
                      >
                        <option value="">Chưa chọn</option>
                        {HCMUPES_SUBJECT_PAIRS.map((pair) => (
                          <option key={pair.id} value={pair.id}>
                            {pair.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <ScoreInput
                      id="compare-hcmupes-talent-score"
                      label="Điểm năng khiếu TDTT"
                      hint={`0 - ${HCMUPES_TALENT_MAX_10}`}
                      value={draft.hcmupesTalentScore10}
                      error={validateRange(draft.hcmupesTalentScore10, 0, HCMUPES_TALENT_MAX_10).error}
                      onChange={(value) => onDraftChange({ ...draft, hcmupesTalentScore10: value })}
                      compact
                    />
                    <p className="text-xs text-muted sm:col-span-2">
                      Ngưỡng HCMUPES phụ thuộc khu vực ưu tiên — chọn khu vực ở mục "Điểm ưu tiên khu vực/đối tượng" trong hồ sơ dùng chung.
                    </p>
                  </div>
                )}

                {draft.schoolId === 'ussh' && (
                  <label className="mt-4 flex items-center gap-2 text-xs font-medium text-ink">
                    <input
                      type="checkbox"
                      checked={draft.hasUsshBonusAchievement}
                      onChange={(event) => onDraftChange({ ...draft, hasUsshBonusAchievement: event.target.checked })}
                    />
                    Thí sinh có thành tích cộng điểm USSH
                  </label>
                )}

                <div className="mt-5 rounded-md bg-surface-soft p-3 text-xs text-muted">
                  {selectedProgram ? (
                    <p>
                      Đang chọn: <span className="font-medium text-ink">{selectedSchool.shortName}</span> - {selectedProgram.code ? `${selectedProgram.code} ` : ''}
                      {selectedProgram.name}
                    </p>
                  ) : selectedSchool.programs.length > 0 ? (
                    <p>Chọn một ngành để tiếp tục.</p>
                  ) : (
                    <p>
                      Đang chọn: <span className="font-medium text-ink">{selectedSchool.shortName}</span> (chưa chọn ngành cụ thể).
                    </p>
                  )}
                  {duplicate && <p className="mt-1 text-danger">Nguyện vọng này đã có trong danh sách.</p>}
                </div>
              </>
            ) : (
              <div className="rounded-md bg-surface-soft p-4 text-sm text-muted">Chọn trường trước, rồi chọn ngành từ registry thật của trường.</div>
            )}
          </section>
        </div>

        {/* Footer dính đáy modal (shrink-0 trong flex-col) — luôn thấy nút kể cả khi danh sách dài.
            Khi nút bị khóa, nói rõ CÒN THIẾU GÌ thay vì để user đoán. */}
        <div className="shrink-0 border-t border-border p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p aria-live="polite" className="text-[13px] text-muted">
              {blockedReason ?? ''}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[--ui-tap-min] cursor-pointer rounded-md border border-border px-4 text-sm font-medium text-ink-soft transition-colors duration-150 hover:bg-surface-soft hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={onSubmit}
                disabled={!canSubmit}
                className="min-h-[--ui-tap-min] cursor-pointer rounded-md bg-primary px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:bg-border-strong disabled:text-surface"
              >
                {editingSelectionId ? 'Lưu thay đổi' : 'Thêm vào so sánh'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MultiSchoolComparisonPage({ onBackHome, onOpenSchool }: MultiSchoolComparisonPageProps) {
  const { profile } = useApplicantProfile();
  const profileSummary = summarizeApplicantProfile(profile);
  const [selections, setSelections] = useState<ComparisonSelection[]>(loadInitialSelections);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [editingSelectionId, setEditingSelectionId] = useState<string | undefined>();
  const [draft, setDraft] = useState<PickerDraft>(EMPTY_DRAFT);

  useEffect(() => {
    saveStoredComparisonSelections(selections);
  }, [selections]);

  const summaries = useMemo(() => evaluateComparisonSelections(profile, selections), [profile, selections]);
  const statusCounts = useMemo(
    () =>
      summaries.reduce(
        (counts, summary) => {
          counts[getEvaluationDisplayStatus(summary.evaluation.confidence)] += 1;
          return counts;
        },
        { exact: 0, partial: 0, unavailable: 0 }
      ),
    [summaries]
  );
  const uniqueSchoolCount = useMemo(() => new Set(selections.map((selection) => selection.schoolId)).size, [selections]);

  function openAddPicker() {
    setEditingSelectionId(undefined);
    setDraft(EMPTY_DRAFT);
    setPickerOpen(true);
  }

  function openEditPicker(selection: ComparisonSelection) {
    setEditingSelectionId(selection.id);
    setDraft(selectionToDraft(selection));
    setPickerOpen(true);
  }

  function submitPicker() {
    const nextSelection = buildSelectionFromDraft(draft);
    if (!nextSelection) return;
    setSelections((current) =>
      editingSelectionId
        ? updateComparisonSelection(current, editingSelectionId, nextSelection)
        : addComparisonSelection(current, nextSelection, `cmp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`)
    );
    setPickerOpen(false);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <div inert={pickerOpen || undefined} aria-hidden={pickerOpen || undefined}>
      <button
        type="button"
        onClick={onBackHome}
        className="-ml-1.5 inline-flex min-h-9 cursor-pointer items-center rounded-md px-1.5 text-sm font-medium text-accent underline-offset-2 transition-colors duration-150 hover:bg-accent/10 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        ← Về trang chủ
      </button>

      <ComparisonOverview
        selectionCount={selections.length}
        uniqueSchoolCount={uniqueSchoolCount}
        statusCounts={statusCounts}
        profileSummary={profileSummary}
        onEditProfile={onBackHome}
      />

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={openAddPicker}
          disabled={selections.length >= COMPARE_SELECTION_HARD_LIMIT}
          className="inline-flex min-h-[--ui-tap-min] cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:bg-border-strong disabled:text-surface"
        >
          <Plus size={16} aria-hidden="true" />
          Thêm trường/ngành
        </button>
        {selections.length > COMPARE_SELECTION_SOFT_LIMIT && (
          <p className="text-[13px] text-muted">Bạn đang so sánh nhiều nguyện vọng. Nên giữ khoảng 3-6 để dễ đọc.</p>
        )}
      </div>

      {selections.length === 0 ? (
        <section className="mt-6 rounded-md border border-dashed border-border-strong bg-surface p-8 text-center">
          <h2 className="text-lg font-semibold text-ink sm:text-xl">Chưa có nguyện vọng nào</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted">Chọn trường và ngành bạn muốn so sánh. Dữ liệu hồ sơ chỉ cần nhập một lần.</p>
          <button
            type="button"
            onClick={openAddPicker}
            className="mt-5 inline-flex min-h-[--ui-tap-min] cursor-pointer items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            <Plus size={16} aria-hidden="true" />
            Thêm trường/ngành
          </button>
          <div className="mt-5 flex flex-wrap justify-center gap-2 text-[13px]">
            {universityCatalog
              .filter((school) => school.capability === 'exact' || school.capability === 'partial')
              .slice(0, 6)
              .map((school) => (
                <button
                  key={school.schoolId}
                  type="button"
                  onClick={() => {
                    setEditingSelectionId(undefined);
                    setDraft({ ...EMPTY_DRAFT, schoolId: school.schoolId });
                    setPickerOpen(true);
                  }}
                  className="min-h-9 cursor-pointer rounded-md border border-border px-3 font-medium text-ink-soft transition-colors duration-150 hover:border-border-strong hover:bg-surface-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                >
                  {school.shortName}
                </button>
              ))}
          </div>
        </section>
      ) : (
        <section className="mt-5 grid gap-4 lg:grid-cols-2">
          {summaries.map((summary, index) => {
            const selection = selections.find((item) => item.id === summary.selectionId);
            const program = toProgramOption(getProgramCatalogEntry(summary.schoolId, selection?.programId));
            return (
              <ComparisonEntryCard
                key={summary.selectionId ?? `${summary.schoolId}-${index}`}
                summary={summary}
                program={program}
                combinationId={selection?.context?.combinationId}
                canMoveUp={index > 0}
                canMoveDown={index < selections.length - 1}
                onEdit={() => selection && openEditPicker(selection)}
                onRemove={() => selection && setSelections((current) => removeComparisonSelection(current, selection.id))}
                onMoveUp={() => selection && setSelections((current) => moveComparisonSelection(current, selection.id, 'up'))}
                onMoveDown={() => selection && setSelections((current) => moveComparisonSelection(current, selection.id, 'down'))}
                onOpenSchool={onOpenSchool}
              />
            );
          })}
        </section>
      )}
      </div>

      {pickerOpen && (
        <ComparePicker
          selections={selections}
          editingSelectionId={editingSelectionId}
          draft={draft}
          onDraftChange={setDraft}
          onClose={() => setPickerOpen(false)}
          onSubmit={submitPicker}
        />
      )}
    </div>
  );
}
