import { useEffect, useMemo, useState, type ReactNode } from 'react';
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
import { ProfileSummary } from './ProfileSummary';
import { StickyProfileBar } from './StickyProfileBar';
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

const REGION_LABELS: Record<SchoolRegion, string> = { hcm: 'TP.HCM', hanoi: 'H\u00e0 N\u1ed9i', other: 'Khu v\u1ef1c kh\u00e1c' };

const ENTITY_FILTER_LABELS: Record<Exclude<LandingEntityFilter, 'all'>, string> = {
  university: '\u0110\u1ea1i h\u1ecdc',
  academy: 'H\u1ecdc vi\u1ec7n',
  college: 'Cao \u0111\u1eb3ng',
  college_pedagogy: 'C\u0110 s\u01b0 ph\u1ea1m/GDMN',
  vocational_college: 'C\u0110 ngh\u1ec1',
};

const SORT_LABELS: Record<LandingSortMode, string> = {
  useful: 'H\u1eefu \u00edch nh\u1ea5t',
  az: 'T\u00ean A-Z',
};

const FILTER_LABELS = {
  region: 'Khu v\u1ef1c',
  entity: 'Lo\u1ea1i tr\u01b0\u1eddng',
  system: 'C\u1ee5m \u0110H',
  sort: 'S\u1eafp x\u1ebfp',
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
    <label className="flex min-h-(--ui-tap-min) items-center gap-1.5 text-sm font-medium text-ink-soft">
      <span className="shrink-0">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as OptionalLandingFilter<T>)}
        className="min-h-(--ui-tap-min) rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm font-normal text-ink transition-colors duration-150 hover:border-border-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <option value="all">T&#7845;t c&#7843;</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function CoverageStat({ value, children }: { value: number; children: ReactNode }) {
  return (
    <div>
      <dt className="text-sm leading-snug text-muted">{children}</dt>
      <dd className="mt-1 font-display text-2xl font-semibold leading-none text-ink sm:text-3xl">{value.toLocaleString('vi-VN')}</dd>
    </div>
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
  const [profileEditorOpen, setProfileEditorOpen] = useState(false);
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
    if (typeof window !== 'undefined' && !window.confirm('X\u00f3a to\u00e0n b\u1ed9 h\u1ed3 s\u01a1 \u0111i\u1ec3m d\u00f9ng chung \u0111\u00e3 l\u01b0u? H\u00e0nh \u0111\u1ed9ng n\u00e0y kh\u00f4ng th\u1ec3 ho\u00e0n t\u00e1c.')) {
      return;
    }
    clearProfile();
  }

  return (
    <div className="py-6 sm:py-9">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-start lg:gap-8">
        <div className="text-left">
          <h1 className="text-3xl font-bold text-ink sm:text-4xl">{siteConfig.name}</h1>
          <p className="mt-2 max-w-2xl text-2xl font-semibold leading-tight text-ink sm:text-3xl">
            &#272;i&#7875;m c&#7911;a b&#7841;n ph&#249; h&#7907;p v&#7899;i tr&#432;&#7901;ng, ng&#224;nh n&#224;o?
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            Nh&#7853;p &#273;i&#7875;m m&#7897;t l&#7847;n, {siteConfig.name} &#225;p theo quy t&#7855;c tuy&#7875;n sinh ri&#234;ng c&#7911;a t&#7915;ng tr&#432;&#7901;ng r&#7891;i &#273;&#7889;i chi&#7871;u v&#7899;i &#273;i&#7875;m chu&#7849;n &#273;&#227; c&#244;ng b&#7889;.
          </p>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => setProfileEditorOpen(true)}
              className="inline-flex min-h-(--ui-tap-min) w-full cursor-pointer items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 sm:w-auto"
            >
              {profileSummary.hasData ? <>Ch&#7881;nh s&#7917;a &#273;i&#7875;m c&#7911;a b&#7841;n</> : <>Nh&#7853;p &#273;i&#7875;m c&#7911;a b&#7841;n</>}
            </button>
            <button
              type="button"
              onClick={onOpenFieldBrowse}
              className="inline-flex min-h-(--ui-tap-min) w-full cursor-pointer items-center justify-center rounded-md border border-accent/40 bg-surface px-5 py-2 text-sm font-semibold text-accent transition-colors duration-150 hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 sm:w-auto"
            >
              Xem theo ng&#224;nh
            </button>
          </div>
        </div>

        <div id="ho-so-diem" className="rounded-md border border-border bg-surface px-4 py-4 text-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <p className="font-medium text-ink">H&#7891; s&#417; &#273;i&#7875;m d&#249;ng chung</p>
            <div className="flex flex-wrap items-center gap-x-2">
              <button
                type="button"
                onClick={() => setProfileEditorOpen((current) => !current)}
                aria-expanded={profileEditorOpen}
                aria-controls="ho-so-diem-editor"
                className="inline-flex min-h-(--ui-tap-min) cursor-pointer items-center rounded-md px-2 text-sm font-medium text-accent underline-offset-2 transition-colors duration-150 hover:bg-accent/10 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                {profileEditorOpen ? <>Thu g&#7885;n</> : profileSummary.hasData ? <>Ch&#7881;nh s&#7917;a</> : <>Nh&#7853;p &#273;i&#7875;m</>}
              </button>
              {profileSummary.hasData && (
                <button
                  type="button"
                  onClick={handleClearProfile}
                  className="inline-flex min-h-(--ui-tap-min) shrink-0 cursor-pointer items-center rounded-md px-2 text-sm font-medium text-muted underline-offset-2 hover:text-danger hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                >
                  X&#243;a h&#7891; s&#417;
                </button>
              )}
            </div>
          </div>

          {profileSummary.hasData ? (
            <ProfileSummary summary={profileSummary} profile={profile} />
          ) : (
            <p className="mt-2 text-muted">Ch&#432;a c&#243; &#273;i&#7875;m n&#224;o. Nh&#7853;p m&#7897;t l&#7847;n &#7903; &#273;&#226;y, {siteConfig.name} &#225;p cho t&#7915;ng c&#417; s&#7903;; thi&#7871;u g&#236; s&#7869; b&#225;o khi so s&#225;nh.</p>
          )}

          {profileEditorOpen && (
            <div id="ho-so-diem-editor">
              <SharedProfileEditor profile={profile} updateProfile={updateProfile} updateVactTotal={updateVactTotal} />
            </div>
          )}

          {profileSummary.hasData && (
            <button
              type="button"
              onClick={onOpenCompare}
              className="mt-3 min-h-(--ui-tap-min) rounded-md border border-accent/40 bg-surface px-3 py-1.5 text-sm font-medium text-accent transition hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              So s&#225;nh nguy&#7879;n v&#7885;ng v&#7899;i h&#7891; s&#417; n&#224;y
            </button>
          )}
        </div>

        <dl className="grid grid-cols-1 gap-3 border-y border-border py-4 sm:grid-cols-3 lg:col-start-1">
          <CoverageStat value={institutionCoverage.totalCatalogEntries}>m&#7909;c tra c&#7913;u</CoverageStat>
          <CoverageStat value={institutionCoverage.independentEducationInstitutions}>c&#417; s&#7903; &#273;&#7897;c l&#7853;p</CoverageStat>
          <CoverageStat value={institutionCoverage.fullyVerified}>t&#237;nh &#273;&#432;&#7907;c &#273;&#7847;y &#273;&#7911; &#273;i&#7875;m</CoverageStat>
        </dl>
      </div>

      <StickyProfileBar
        summary={profileSummary}
        anchorId="ho-so-diem"
        onEdit={() => {
          setProfileEditorOpen(true);
          document.getElementById('ho-so-diem')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-ink sm:text-xl">Ch&#7885;n c&#417; s&#7903; &#273;&#7875; b&#7855;t &#273;&#7847;u</h2>

        <div className="mt-3">
          <label htmlFor="school-search" className="sr-only">
            T&#236;m c&#417; s&#7903; theo t&#234;n, m&#227; tr&#432;&#7901;ng ho&#7863;c t&#234;n vi&#7871;t t&#7855;t
          </label>
          <input
            id="school-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={'T\u00ecm theo t\u00ean, m\u00e3 tr\u01b0\u1eddng ho\u1eb7c t\u00ean vi\u1ebft t\u1eaft...'}
            className="min-h-(--ui-tap-min) w-full rounded-md border border-border bg-surface px-4 py-2.5 text-base text-ink placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          />
        </div>

        <div className="mt-3 rounded-md border border-border bg-surface px-3 py-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <FilterSelect
              label={FILTER_LABELS.region}
              value={regionFilter}
              onChange={setRegionFilter}
              options={(Object.entries(REGION_LABELS) as [SchoolRegion, string][]).map(([value, label]) => ({
                value,
                label,
              }))}
            />
            <FilterSelect
              label={FILTER_LABELS.entity}
              value={entityFilter}
              onChange={setEntityFilter}
              options={(Object.entries(ENTITY_FILTER_LABELS) as [Exclude<LandingEntityFilter, 'all'>, string][]).map(([value, label]) => ({
                value,
                label,
              }))}
            />
            <label className="flex min-h-(--ui-tap-min) cursor-pointer items-center gap-2 rounded-md px-1 text-sm font-medium text-ink-soft transition-colors duration-150 hover:text-ink">
              <input
                type="checkbox"
                checked={onlyEvaluable}
                onChange={(event) => setOnlyEvaluable(event.target.checked)}
                className="h-5 w-5 cursor-pointer rounded border-border-strong text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              />
              Ch&#7881; hi&#7879;n tr&#432;&#7901;ng t&#244;i c&#243; th&#7875; &#273;&#225;nh gi&#225;
            </label>

            <Disclosure summary="B&#7897; l&#7885;c n&#226;ng cao" className="basis-full">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2" role="group" aria-label={'L\u1ecdc theo m\u1ee9c h\u1ed7 tr\u1ee3'}>
                  <button
                    type="button"
                    onClick={() => setTierFilter('all')}
                    aria-pressed={tierFilter === 'all'}
                    className={[
                      'min-h-(--ui-tap-min) rounded-md border px-3 py-1.5 text-sm font-medium transition',
                      tierFilter === 'all' ? 'border-accent bg-accent/10 text-accent' : 'border-border bg-surface text-muted hover:border-border-strong',
                    ].join(' ')}
                  >
                    T&#7845;t c&#7843; ({schools.length})
                  </button>
                  {SUPPORT_TIER_ORDER.filter((tier) => tierCounts[tier] > 0).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setTierFilter(tier)}
                      aria-pressed={tierFilter === tier}
                      className={[
                        'min-h-(--ui-tap-min) rounded-md border px-3 py-1.5 text-sm font-medium transition',
                        tierFilter === tier ? 'border-accent bg-accent/10 text-accent' : 'border-border bg-surface text-muted hover:border-border-strong',
                      ].join(' ')}
                    >
                      {SUPPORT_STATUS_LABELS[tier]} ({tierCounts[tier]})
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <FilterSelect
                    label={FILTER_LABELS.system}
                    value={systemFilter}
                    onChange={setSystemFilter}
                    options={UNIVERSITY_SYSTEMS.map((system) => ({ value: system.id, label: system.shortLabel }))}
                  />
                  <label className="flex min-h-(--ui-tap-min) items-center gap-1.5 text-sm font-medium text-ink-soft">
                    <span className="shrink-0">{FILTER_LABELS.sort}</span>
                    <select
                      value={sortMode}
                      onChange={(event) => setSortMode(event.target.value as LandingSortMode)}
                      className="min-h-(--ui-tap-min) rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm font-normal text-ink transition-colors duration-150 hover:border-border-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
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
                className="min-h-(--ui-tap-min) rounded-md border border-border px-3 py-1.5 text-sm font-medium text-muted transition hover:border-danger/30 hover:text-danger focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                X&#243;a b&#7897; l&#7885;c
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 text-sm text-muted" aria-live="polite">
          {filteredSchools.length} k&#7871;t qu&#7843;
          {filteredSchools.length > 0 ? ' \u00b7 \u0110ang hi\u1ec3n th\u1ecb ' + visibleSchools.length : ''}
        </div>

        {filteredSchools.length === 0 ? (
          <div className="mt-4 rounded-md border border-border bg-surface p-5 text-center text-sm text-muted">
            <p>Kh&#244;ng t&#236;m th&#7845;y c&#417; s&#7903; ph&#249; h&#7907;p.</p>
            <p className="mt-1 text-sm">Th&#7917; t&#234;n kh&#225;c, m&#227; tr&#432;&#7901;ng ho&#7863;c b&#7887; b&#7899;t b&#7897; l&#7885;c.</p>
            {filtersActive && (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-3 min-h-(--ui-tap-min) rounded-md border border-accent/30 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent transition hover:bg-accent/20"
              >
                X&#243;a b&#7897; l&#7885;c
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
              className="min-h-(--ui-tap-min) rounded-md border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              Xem th&#234;m {Math.min(VISIBLE_SCHOOL_INCREMENT, filteredSchools.length - visibleSchools.length)}
            </button>
          </div>
        )}

        <AboutDataSection />
      </div>
    </div>
  );
}
