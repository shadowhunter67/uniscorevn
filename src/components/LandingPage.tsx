import { useEffect, useMemo, useState } from 'react';
import { schoolRegistry } from '../schools';
import { siteConfig } from '../config/site';
import type { SchoolRegion } from '../core/schoolModule';
import { useApplicantProfile } from '../core/applicantProfileContextCore';
import { summarizeApplicantProfile } from '../core/applicantProfileSummary';
import {
  deriveInstitutionSupportStatus,
  institutionCoverage,
  SUPPORT_STATUS_LABELS,
  type InstitutionSupportStatus,
} from '../data/institutionCoverage';
import { UNIVERSITY_SYSTEMS } from '../data/universitySystems';
import { Disclosure } from './Disclosure';
import { SharedProfileEditor } from './SharedProfileEditor';
import { AboutDataSection } from './AboutDataSection';
import { SchoolListItem } from './SchoolListItem';
import {
  filterSchoolsForLanding,
  hasActiveLandingFilters,
  INITIAL_VISIBLE_SCHOOL_COUNT,
  SUPPORT_TIER_ORDER,
  VISIBLE_SCHOOL_INCREMENT,
  type LandingEntityFilter,
  type LandingSortMode,
  type OptionalLandingFilter,
} from './landingCatalog';

interface LandingPageProps {
  onSelectSchool: (schoolId: string) => void;
  onOpenCompare: () => void;
  onOpenFieldBrowse: () => void;
}

type CapabilityTier = InstitutionSupportStatus;

const REGION_LABELS: Record<SchoolRegion, string> = { hcm: 'TP.HCM', hanoi: 'Hà Nội', other: 'Khu vực khác' };

const ENTITY_FILTER_LABELS: Record<Exclude<LandingEntityFilter, 'all'>, string> = {
  university: 'Đại học',
  academy: 'Học viện',
  college: 'Cao đẳng',
  college_pedagogy: 'CĐ sư phạm/GDMN',
  vocational_college: 'CĐ nghề',
};

const SORT_LABELS: Record<LandingSortMode, string> = {
  useful: 'Hữu ích nhất',
  az: 'Tên A-Z',
};

function FilterSelect<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: OptionalLandingFilter<T>;
  onChange: (value: OptionalLandingFilter<T>) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <label className="flex items-center gap-1.5 text-sm font-medium text-ink-soft">
      <span className="shrink-0">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as OptionalLandingFilter<T>)}
        className="min-h-[--ui-tap-min] rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm font-normal text-ink transition-colors duration-150 hover:border-border-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <option value="all">Tất cả</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function LandingPage({ onSelectSchool, onOpenCompare, onOpenFieldBrowse }: LandingPageProps) {
  const [query, setQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState<OptionalLandingFilter<SchoolRegion>>('all');
  const [tierFilter, setTierFilter] = useState<OptionalLandingFilter<CapabilityTier>>('all');
  const [entityFilter, setEntityFilter] = useState<LandingEntityFilter>('all');
  const [systemFilter, setSystemFilter] = useState<OptionalLandingFilter<string>>('all');
  const [sortMode, setSortMode] = useState<LandingSortMode>('useful');
  const [onlyEvaluable, setOnlyEvaluable] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_SCHOOL_COUNT);
  const schools = useMemo(() => Object.values(schoolRegistry), []);
  const filters = useMemo(
    () => ({ query, entityFilter, regionFilter, tierFilter, systemFilter, sortMode, onlyEvaluable }),
    [query, entityFilter, regionFilter, tierFilter, systemFilter, sortMode, onlyEvaluable]
  );
  const filteredSchools = useMemo(() => filterSchoolsForLanding(schools, filters), [schools, filters]);
  const visibleSchools = filteredSchools.slice(0, visibleCount);
  const hasMore = visibleCount < filteredSchools.length;
  const filtersActive = hasActiveLandingFilters(filters);
  const tierCounts = useMemo(() => {
    const counts: Record<CapabilityTier, number> = {
      'verified-calculator': 0,
      'partial-calculator': 0,
      'eligibility-only': 0,
      researched: 0,
      'catalog-only': 0,
    };
    for (const school of schools) counts[deriveInstitutionSupportStatus(school)] += 1;
    return counts;
  }, [schools]);

  const { profile, updateProfile, updateVactTotal, clearProfile } = useApplicantProfile();
  const profileSummary = summarizeApplicantProfile(profile);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_SCHOOL_COUNT);
  }, [query, entityFilter, regionFilter, tierFilter, systemFilter, sortMode, onlyEvaluable]);

  function resetFilters() {
    setQuery('');
    setEntityFilter('all');
    setRegionFilter('all');
    setTierFilter('all');
    setSystemFilter('all');
    setSortMode('useful');
    setOnlyEvaluable(false);
  }

  function handleClearProfile() {
    if (typeof window !== 'undefined' && !window.confirm('Xóa toàn bộ hồ sơ điểm dùng chung đã lưu? Hành động này không thể hoàn tác.')) {
      return;
    }
    clearProfile();
  }

  return (
    <div className="py-6 sm:py-9">
      {/* Hero compact: navbar đã có logo nên phần này không lặp lại logo, chỉ giữ H1 (tên brand —
          không đổi để không ảnh hưởng SEO), tagline, số liệu phủ dữ liệu và 2 lối vào rõ ràng. */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">{siteConfig.name}</h1>
        <p className="mt-1.5 text-base text-ink-soft sm:text-lg">{siteConfig.tagline}</p>
        <p className="mx-auto mt-3 text-base leading-relaxed text-muted">
          Hiện có {institutionCoverage.fullyVerified} trường có thể tính điểm xét tuyển đầy đủ, trong tổng số {institutionCoverage.independentEducationInstitutions} cơ sở
          giáo dục độc lập. Nhập điểm một lần, so sánh theo quy tắc tuyển sinh riêng của từng cơ sở.
        </p>
        <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted">
          <span>Đã có trường muốn xem? Tìm bên dưới.</span>
          <button
            type="button"
            onClick={onOpenFieldBrowse}
            className="inline-flex min-h-9 items-center rounded-md px-1.5 font-medium text-accent underline-offset-2 transition-colors duration-150 hover:bg-accent/10 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            Chưa biết nên chọn trường nào? Xem theo lĩnh vực →
          </button>
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-3xl rounded-md border border-accent/20 bg-accent/5 px-4 py-3 text-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-ink">
            <span className="font-medium">Hồ sơ điểm dùng chung.</span>{' '}
            <span className="text-muted">Nhập ở đây, rồi {siteConfig.name} áp cho từng cơ sở; thiếu gì sẽ báo khi so sánh.</span>
          </p>
          {profileSummary.hasData && (
            <button
              type="button"
              onClick={handleClearProfile}
              className="shrink-0 text-sm font-medium text-muted underline-offset-2 hover:text-danger hover:underline"
            >
              Xóa hồ sơ đã lưu
            </button>
          )}
        </div>
        {profileSummary.hasData && (
          <p className="mt-1.5 text-sm text-muted">
            {[
              profileSummary.vactTotal !== undefined ? `ĐGNL: ${profileSummary.vactTotal}` : null,
              profileSummary.thptSubjectCount > 0 ? `THPT: ${profileSummary.thptSubjectCount} môn đã lưu` : null,
              profileSummary.transcriptSubjectCount > 0 ? `Học bạ: ${profileSummary.transcriptSubjectCount} môn đã lưu` : null,
            ]
              .filter(Boolean)
              .join(' · ')}
          </p>
        )}
        <Disclosure summary="Nhập / chỉnh sửa điểm" defaultOpen={profileSummary.hasData} className="mt-2.5">
          <SharedProfileEditor profile={profile} updateProfile={updateProfile} updateVactTotal={updateVactTotal} />
        </Disclosure>
        {profileSummary.hasData && (
          <button
            type="button"
            onClick={onOpenCompare}
            className="mt-3 min-h-[--ui-tap-min] rounded-md border border-accent/30 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent transition hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            So sánh với hồ sơ này
          </button>
        )}
      </div>

      {/* Danh sách trường dùng hết bề ngang container (max-w-6xl ≈ 1150px ở App.tsx) — trước đây bị
          bó thêm ở max-w-5xl nên màn hình lớn thừa nhiều khoảng trắng hai bên. */}
      <div className="mt-9">
        <h2 className="text-lg font-semibold text-ink sm:text-xl">Chọn cơ sở để bắt đầu</h2>

        <div className="mt-3 max-w-2xl">
          <label htmlFor="school-search" className="sr-only">
            Tìm cơ sở theo tên, mã trường hoặc tên viết tắt
          </label>
          <input
            id="school-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm theo tên, mã trường hoặc tên viết tắt..."
            className="min-h-[--ui-tap-min] w-full rounded-md border border-border bg-surface px-4 py-2.5 text-base text-ink placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <FilterSelect
            label="Khu vực"
            value={regionFilter}
            onChange={setRegionFilter}
            options={(Object.entries(REGION_LABELS) as [SchoolRegion, string][]).map(([value, label]) => ({
              value,
              label,
            }))}
          />
          <FilterSelect
            label="Loại trường"
            value={entityFilter}
            onChange={setEntityFilter}
            options={(Object.entries(ENTITY_FILTER_LABELS) as [Exclude<LandingEntityFilter, 'all'>, string][]).map(([value, label]) => ({
              value,
              label,
            }))}
          />
          <label className="flex min-h-[--ui-tap-min] cursor-pointer items-center gap-2 rounded-md px-1 text-sm font-medium text-ink-soft transition-colors duration-150 hover:text-ink">
            <input
              type="checkbox"
              checked={onlyEvaluable}
              onChange={(event) => setOnlyEvaluable(event.target.checked)}
              className="h-5 w-5 cursor-pointer rounded border-border-strong text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            />
            Chỉ hiện trường tôi có thể đánh giá
          </label>
        </div>

        <Disclosure summary="Bộ lọc nâng cao" className="mt-3 max-w-2xl">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc theo mức hỗ trợ">
              <button
                type="button"
                onClick={() => setTierFilter('all')}
                aria-pressed={tierFilter === 'all'}
                className={`min-h-[--ui-tap-min] rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                  tierFilter === 'all' ? 'border-accent bg-accent/10 text-accent' : 'border-border bg-surface text-muted hover:border-border-strong'
                }`}
              >
                Tất cả ({schools.length})
              </button>
              {SUPPORT_TIER_ORDER.filter((tier) => tierCounts[tier] > 0).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setTierFilter(tier)}
                  aria-pressed={tierFilter === tier}
                  className={`min-h-[--ui-tap-min] rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                    tierFilter === tier ? 'border-accent bg-accent/10 text-accent' : 'border-border bg-surface text-muted hover:border-border-strong'
                  }`}
                >
                  {SUPPORT_STATUS_LABELS[tier]} ({tierCounts[tier]})
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <FilterSelect
                label="Cụm ĐH"
                value={systemFilter}
                onChange={setSystemFilter}
                options={UNIVERSITY_SYSTEMS.map((system) => ({ value: system.id, label: system.shortLabel }))}
              />
              <label className="flex items-center gap-1.5 text-sm font-medium text-ink-soft">
                <span className="shrink-0">Sắp xếp</span>
                <select
                  value={sortMode}
                  onChange={(event) => setSortMode(event.target.value as LandingSortMode)}
                  className="min-h-[--ui-tap-min] rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm font-normal text-ink transition-colors duration-150 hover:border-border-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                >
                  {(Object.entries(SORT_LABELS) as [LandingSortMode, string][]).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </Disclosure>

        {filtersActive && (
          <button
            type="button"
            onClick={resetFilters}
            className="mt-2 min-h-[--ui-tap-min] rounded-md border border-border px-3 py-1.5 text-sm font-medium text-muted transition hover:border-danger/30 hover:text-danger focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            Xóa bộ lọc
          </button>
        )}

        <div className="mt-4 text-sm text-muted" aria-live="polite">
          {filteredSchools.length} kết quả
          {filteredSchools.length > 0 ? ` · Đang hiển thị ${visibleSchools.length}` : ''}
        </div>

        {filteredSchools.length === 0 ? (
          <div className="mt-4 rounded-md border border-border bg-surface p-5 text-center text-sm text-muted">
            <p>Không tìm thấy cơ sở phù hợp.</p>
            <p className="mt-1 text-sm">Thử tên khác, mã trường hoặc bỏ bớt bộ lọc.</p>
            {filtersActive && (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-3 min-h-[--ui-tap-min] rounded-md border border-accent/30 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent transition hover:bg-accent/20"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {visibleSchools.map((school) => (
              <SchoolListItem key={school.id} school={school} onSelectSchool={onSelectSchool} onOpenCompare={onOpenCompare} />
            ))}
          </ul>
        )}

        {hasMore && (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((current) => Math.min(current + VISIBLE_SCHOOL_INCREMENT, filteredSchools.length))}
              className="min-h-[--ui-tap-min] rounded-md border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              Xem thêm {Math.min(VISIBLE_SCHOOL_INCREMENT, filteredSchools.length - visibleSchools.length)}
            </button>
          </div>
        )}

        <AboutDataSection />
      </div>
    </div>
  );
}
