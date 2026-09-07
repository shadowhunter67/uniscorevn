import { institutionCoverage } from '../data/institutionCoverage';

/**
 * KPI (tổng catalog/independent/researched/verified) chuyển từ hero xuống đây — số liệu vẫn lấy
 * từ `institutionCoverage` (generated live từ `schoolRegistry`, xem `npm run stats:coverage`),
 * không hardcode. Hero chỉ còn 1 câu ngắn tham chiếu `institutionCoverage.fullyVerified`.
 */
export function AboutDataSection() {
  const collegeCount = institutionCoverage.pedagogicalColleges + institutionCoverage.vocationalColleges;

  return (
    <section aria-labelledby="about-data-heading" className="mt-10 border-t border-border pt-6">
      <h2 id="about-data-heading" className="text-lg font-semibold text-ink sm:text-xl">
        Về dữ liệu UniScoreVN
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Danh mục gồm {institutionCoverage.independentEducationInstitutions} cơ sở giáo dục độc lập ({institutionCoverage.universityInstitutions} đại học ·{' '}
        {institutionCoverage.academies} học viện · {collegeCount} cao đẳng) và {institutionCoverage.internalUnitEntries} đơn vị nội bộ, tổng{' '}
        {institutionCoverage.totalCatalogEntries} mục danh mục.
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div className="rounded-md border border-border p-3">
          <dt className="text-xs text-muted">Cơ sở & đơn vị</dt>
          <dd className="mt-1 text-lg font-semibold text-ink">{institutionCoverage.totalCatalogEntries}</dd>
        </div>
        <div className="rounded-md border border-border p-3">
          <dt className="text-xs text-muted">Cơ sở độc lập</dt>
          <dd className="mt-1 text-lg font-semibold text-ink">{institutionCoverage.independentEducationInstitutions}</dd>
        </div>
        <div className="rounded-md border border-border p-3">
          <dt className="text-xs text-muted">Có dữ liệu tuyển sinh</dt>
          <dd className="mt-1 text-lg font-semibold text-ink">{institutionCoverage.admissionDataAvailable}</dd>
        </div>
        <div className="rounded-md border border-border p-3">
          <dt className="text-xs text-muted">Tính được điểm xét tuyển</dt>
          <dd className="mt-1 text-lg font-semibold text-ink">{institutionCoverage.fullyVerified}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Xem nguồn &amp; phương pháp dữ liệu tuyển sinh tại{' '}
        <a
          href="https://github.com/shadowhunter67/uniscorevn/blob/main/docs/data-methodology.md"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          tài liệu dữ liệu
        </a>
        .
      </p>
    </section>
  );
}
