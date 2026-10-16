import type { ReactNode } from 'react';
import { Building2, Database, FileText, BarChart3, Users } from 'lucide-react';
import { institutionCoverage } from '../data/institutionCoverage';

function DataTile({ icon, value, label, tone }: { icon: ReactNode; value: number; label: string; tone: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
      <span aria-hidden="true" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tone}`}>
        {icon}
      </span>
      <div>
        <dd className="font-display text-xl font-bold leading-tight text-ink">{value}</dd>
        <dt className="text-xs leading-tight text-muted">{label}</dt>
      </div>
    </div>
  );
}

/**
 * KPI (tổng catalog/independent/researched/verified) — số liệu lấy từ `institutionCoverage`
 * (generated live từ `schoolRegistry`, xem `npm run stats:coverage`), không hardcode.
 */
export function AboutDataSection() {
  const collegeCount = institutionCoverage.pedagogicalColleges + institutionCoverage.vocationalColleges;

  return (
    <section aria-labelledby="about-data-heading" className="card mt-10 grid gap-5 px-6 py-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] lg:items-center">
      <div className="flex items-start gap-4">
        <span aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Database size={26} />
        </span>
        <div>
          <h2 id="about-data-heading" className="text-xl font-bold text-ink">
            Về dữ liệu UniScoreVN
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Danh mục gồm {institutionCoverage.independentEducationInstitutions} cơ sở giáo dục độc lập ({institutionCoverage.universityInstitutions} đại học ·{' '}
            {institutionCoverage.academies} học viện · {collegeCount} cao đẳng) và {institutionCoverage.internalUnitEntries} đơn vị nội bộ, tổng{' '}
            {institutionCoverage.totalCatalogEntries} mục danh mục. Xem nguồn &amp; phương pháp dữ liệu tuyển sinh tại{' '}
            <a
              href="https://github.com/shadowhunter67/uniscorevn/blob/main/docs/data-methodology.md"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline underline-offset-2"
            >
              tài liệu dữ liệu
            </a>
            .
          </p>
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-3 grid-cols-2 xl:grid-cols-4">
        <DataTile icon={<Building2 size={20} />} value={institutionCoverage.totalCatalogEntries} label="Cơ sở & đơn vị" tone="bg-accent/10 text-accent" />
        <DataTile icon={<Users size={20} />} value={institutionCoverage.independentEducationInstitutions} label="Cơ sở độc lập" tone="bg-indigo-500/10 text-indigo-700" />
        <DataTile icon={<FileText size={20} />} value={institutionCoverage.admissionDataAvailable} label="Có dữ liệu tuyển sinh" tone="bg-sky-500/10 text-sky-700" />
        <DataTile icon={<BarChart3 size={20} />} value={institutionCoverage.fullyVerified} label="Tính được điểm xét tuyển" tone="bg-emerald-500/10 text-emerald-700" />
      </dl>
    </section>
  );
}
