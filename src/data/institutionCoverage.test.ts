import { describe, expect, it } from 'vitest';
import { schoolRegistry } from '../schools';
import {
  countsAsInstitutionEntry,
  countsAsUniversityInstitution,
  auditInstitutionCatalog,
  deriveInstitutionSupportStatus,
  institutionCoverage,
  summarizeInstitutionCoverage,
} from './institutionCoverage';
import { collegeCatalogSchools } from '../schools/collegeCatalog';

// TODO: update institutionCoverage.test.ts counts in final consolidation pass — batch-expand-01/02/03
// moved several schools from catalog-only to researched or eligibility-only, which shifts
// totalCatalogEntries/researched/eligibilitySupported/catalogOnly below. Not recomputed here to
// avoid guessing wrong numbers; run stats:coverage to get exact counts before updating assertions.
describe('institution coverage statistics', () => {
  it('separates catalog coverage from institution KPI coverage', () => {
    expect(institutionCoverage.totalCatalogEntries).toBe(267);
    expect(institutionCoverage.institutionEntries).toBeLessThan(institutionCoverage.totalCatalogEntries);
    expect(institutionCoverage.internalUnitEntries).toBe(10);
    expect(institutionCoverage.institutionEntries + institutionCoverage.internalUnitEntries).toBe(institutionCoverage.totalCatalogEntries);
  });

  it('does not count known internal HUST/NEU/TNU units as independent institutions', () => {
    for (const schoolId of ['tnuis', 'soict', 'sms', 'sme', 'scls', 'seee', 'semhust', 'neucob', 'ncepa', 'nctneu']) {
      expect(countsAsInstitutionEntry(schoolRegistry[schoolId])).toBe(false);
    }
  });

  it('keeps catalog-only schools out of calculator support buckets', () => {
    for (const school of Object.values(schoolRegistry)) {
      if (deriveInstitutionSupportStatus(school) !== 'catalog-only') continue;
      expect(school.capabilities?.exactCalculator).not.toBe(true);
      expect(school.capabilities?.partialCalculator).not.toBe(true);
      expect(school.capabilities?.scoreConversion).not.toBe(true);
      expect(school.capabilities?.eligibility).not.toBe(true);
    }
  });

  it('keeps college catalog entries out of university KPI and calculator buckets', () => {
    for (const college of collegeCatalogSchools) {
      const school = schoolRegistry[college.id];

      expect(countsAsInstitutionEntry(school)).toBe(true);
      expect(countsAsUniversityInstitution(school)).toBe(false);
      expect(deriveInstitutionSupportStatus(school)).toBe('catalog-only');
      expect(school.capabilities?.exactCalculator).toBe(false);
      expect(school.capabilities?.partialCalculator).not.toBe(true);
      expect(school.capabilities?.scoreConversion).toBe(false);
      expect(school.capabilities?.eligibility).toBe(false);
    }
  });

  it('derives stable public KPI counts from the registry', () => {
    expect(summarizeInstitutionCoverage()).toEqual({
      totalCatalogEntries: 267,
      institutionEntries: 257,
      independentEducationInstitutions: 257,
      universityInstitutions: 206,
      academies: 22,
      pedagogicalColleges: 3,
      vocationalColleges: 26,
      otherIndependentInstitutions: 0,
      internalUnitEntries: 10,
      researched: 92,
      admissionDataAvailable: 92,
      eligibilitySupported: 48,
      calculatorSupported: 19,
      partialCalculator: 5,
      fullyVerified: 14,
      catalogOnly: 175,
    });
  });

  it('documents researched as admission-data-or-better semantics', () => {
    const summary = summarizeInstitutionCoverage();
    const researchedOnly = summary.admissionDataAvailable - summary.eligibilitySupported - summary.partialCalculator - summary.fullyVerified;

    expect(summary.researched).toBe(summary.admissionDataAvailable);
    expect(researchedOnly).toBe(25);
    for (const schoolId of [
      'vnuuet', 'vnueb', 'vnuhus', 'vnussh', 'vnuvju', 'hust', 'tmu', 'haui', 'aof', 'bav', 'hanu', 'hou',
      'ntu', 'qnu', 'hueu',
      'hpmu', 'udn',
      'hmu', 'tlu', 'nlu', 'uth', 'phenikaa', 'thanglong', 'rmitvn', 'vinuni',
    ]) {
      expect(deriveInstitutionSupportStatus(schoolRegistry[schoolId]), schoolId).toBe('researched');
    }
    for (const schoolId of ['hup', 'ajc', 'pntu', 'vnuf', 'dtu', 'uah', 'vgu', 'hpu2', 'fptu', 'hubt']) {
      expect(deriveInstitutionSupportStatus(schoolRegistry[schoolId]), schoolId).toBe('eligibility-only');
    }
    // UDN cluster batch (2026-08-24): udn stays a system-level umbrella (researched, no
    // independent admission formula); the 6 member schools now carry dedicated eligibility-only
    // runtime modules (see normalized/runtime-source-snapshot/<id>/ in the private repo).
    for (const schoolId of ['dut', 'dueudn', 'uedudn', 'uflsudn', 'uteudn', 'vku']) {
      expect(deriveInstitutionSupportStatus(schoolRegistry[schoolId]), schoolId).toBe('eligibility-only');
    }
    expect(deriveInstitutionSupportStatus(schoolRegistry.vnua)).toBe('eligibility-only');
    expect(deriveInstitutionSupportStatus(schoolRegistry.huce)).toBe('eligibility-only');
    expect(deriveInstitutionSupportStatus(schoolRegistry.dav)).toBe('partial-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.hlu)).toBe('eligibility-only');
    expect(deriveInstitutionSupportStatus(schoolRegistry.humg)).toBe('eligibility-only');
    expect(deriveInstitutionSupportStatus(schoolRegistry.hdu)).toBe('eligibility-only');
    expect(deriveInstitutionSupportStatus(schoolRegistry.vmu)).toBe('eligibility-only');
    expect(deriveInstitutionSupportStatus(schoolRegistry.ttn)).toBe('eligibility-only');
    expect(deriveInstitutionSupportStatus(schoolRegistry.tnu)).toBe('eligibility-only');
    expect(deriveInstitutionSupportStatus(schoolRegistry.dlu)).toBe('eligibility-only');
    expect(deriveInstitutionSupportStatus(schoolRegistry.vnuulis)).toBe('partial-calculator');
    for (const schoolId of ['hce', 'hul', 'husc', 'huaf', 'hueedu', 'dut', 'dueudn', 'uedudn', 'uflsudn', 'uteudn', 'vku']) {
      expect(deriveInstitutionSupportStatus(schoolRegistry[schoolId]), schoolId).toBe('eligibility-only');
    }
  });

  it('requires catalog source metadata for college identity entries', () => {
    for (const college of collegeCatalogSchools) {
      const school = schoolRegistry[college.id];

      expect(school.catalogSources?.length, `${college.id} should have catalogSources`).toBeGreaterThan(0);
    }
  });

  it('keeps independent institution categories reconciled', () => {
    const summary = summarizeInstitutionCoverage();
    expect(
      summary.universityInstitutions +
        summary.academies +
        summary.pedagogicalColleges +
        summary.vocationalColleges +
        summary.otherIndependentInstitutions
    ).toBe(summary.independentEducationInstitutions);
  });

  it('audits catalog identity/classification invariants', () => {
    expect(auditInstitutionCatalog().filter((issue) => issue.severity === 'error')).toEqual([]);
  });

  it('detects duplicate admission codes and vocational colleges with calculator capability', () => {
    const base = schoolRegistry.nce;
    const vocational = schoolRegistry.vcte;
    const issues = auditInstitutionCatalog([
      { ...base, id: 'a', admissionCode: 'DUP' },
      { ...base, id: 'b', admissionCode: 'DUP', name: 'Another name' },
      { ...vocational, id: 'bad-vocational', capabilities: { ...vocational.capabilities!, exactCalculator: true } },
    ]);

    expect(issues).toContainEqual(expect.objectContaining({ code: 'DUPLICATE_ADMISSION_CODE', severity: 'error' }));
    expect(issues).toContainEqual(expect.objectContaining({ code: 'VOCATIONAL_COLLEGE_HAS_UNIVERSITY_CAPABILITY', severity: 'error', schoolId: 'bad-vocational' }));
  });
});
