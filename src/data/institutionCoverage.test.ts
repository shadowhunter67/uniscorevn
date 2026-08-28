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

describe('institution coverage statistics', () => {
  it('separates catalog coverage from institution KPI coverage', () => {
    expect(institutionCoverage.totalCatalogEntries).toBe(267);
    expect(institutionCoverage.institutionEntries).toBeLessThan(institutionCoverage.totalCatalogEntries);
    expect(institutionCoverage.internalUnitEntries).toBe(12);
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
    // Batch-expand-11 (2026-08-24): some colleges with a verified official 2026 admission source
    // but no extractable formula graduated from flat 'catalog-only' to 'researched' (same pattern
    // used for universities in finalCatalog.ts/remainingCatalog.ts/southernCatalog.ts) — see
    // collegeCatalog.ts researchedAdmissionSources. Neither tier grants calculator/eligibility
    // capabilities, so the KPI/capability invariants below still hold for both.
    for (const college of collegeCatalogSchools) {
      const school = schoolRegistry[college.id];

      expect(countsAsInstitutionEntry(school)).toBe(true);
      expect(countsAsUniversityInstitution(school)).toBe(false);
      expect(['catalog-only', 'researched']).toContain(deriveInstitutionSupportStatus(school));
      expect(school.capabilities?.exactCalculator).toBe(false);
      expect(school.capabilities?.partialCalculator).not.toBe(true);
      expect(school.capabilities?.scoreConversion).toBe(false);
      expect(school.capabilities?.eligibility).toBe(false);
    }
  });

  it('derives stable public KPI counts from the registry', () => {
    expect(summarizeInstitutionCoverage()).toEqual({
      totalCatalogEntries: 267,
      institutionEntries: 255,
      independentEducationInstitutions: 255,
      universityInstitutions: 204,
      academies: 22,
      pedagogicalColleges: 3,
      vocationalColleges: 26,
      otherIndependentInstitutions: 0,
      internalUnitEntries: 12,
      researched: 225,
      admissionDataAvailable: 225,
      eligibilitySupported: 27,
      calculatorSupported: 80,
      partialCalculator: 3,
      fullyVerified: 77,
      catalogOnly: 42,
    });
  });

  it('documents researched as admission-data-or-better semantics', () => {
    const summary = summarizeInstitutionCoverage();
    const researchedOnly = summary.admissionDataAvailable - summary.eligibilitySupported - summary.partialCalculator - summary.fullyVerified;

    expect(summary.researched).toBe(summary.admissionDataAvailable);
    expect(researchedOnly).toBe(118);
    expect(deriveInstitutionSupportStatus(schoolRegistry.uah), 'uah').toBe('verified-calculator');
    for (const schoolId of [
      'vnuuet', 'vnueb', 'vnuhus', 'vnussh', 'vnuvju', 'hust', 'tmu', 'haui', 'aof', 'bav', 'hanu', 'hou',
      'ntu', 'qnu', 'hueu',
      'hpmu', 'udn',
      'hmu', 'tlu', 'uth', 'phenikaa', 'thanglong', 'rmitvn', 'vinuni',
    ]) {
      expect(deriveInstitutionSupportStatus(schoolRegistry[schoolId]), schoolId).toBe('researched');
    }
    for (const schoolId of ['vnuf', 'vgu', 'hpu2']) {
      expect(deriveInstitutionSupportStatus(schoolRegistry[schoolId]), schoolId).toBe('eligibility-only');
    }
    // Batch (2026-08-28): FPTU (điều kiện tổ hợp thô, mọi ngành) and HCMUE (ngưỡng theo ngành, 47
    // ngành trụ sở chính TP.HCM) graduated to verified-calculator — reaches 62 verified.
    expect(deriveInstitutionSupportStatus(schoolRegistry.fptu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.hcmue)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.dtu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.hubt)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.hsu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.hiu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.tdu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.uda)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.bdu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.ou)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.huce)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.tbdu)).toBe('verified-calculator');
    // UDN cluster batch (2026-08-24): udn stays a system-level umbrella (researched, no
    // independent admission formula); its member schools carry dedicated runtime modules. Five
    // stay eligibility-only; VKU graduated to a verified exact calculator (2026-08-27, combined
    // method) and is asserted separately below.
    for (const schoolId of ['dut', 'dueudn', 'uedudn', 'uteudn']) {
      expect(deriveInstitutionSupportStatus(schoolRegistry[schoolId]), schoolId).toBe('eligibility-only');
    }
    // UFLS graduated to verified-calculator (2026-08-28) — 4 ngành đào tạo giáo viên ngoại ngữ,
    // ngưỡng thô + điểm ưu tiên; các ngành cử nhân còn lại vẫn eligibility-only (cần học bạ).
    expect(deriveInstitutionSupportStatus(schoolRegistry.uflsudn)).toBe('verified-calculator');
    // Batch (2026-08-28): VNUA graduated to verified-calculator — ngưỡng theo nhóm ngành (19/23
    // nhóm) đã xác minh, điểm ưu tiên KV/ĐT hiển thị tham khảo (trích công thức từ chính thông báo).
    expect(deriveInstitutionSupportStatus(schoolRegistry.vnua)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.dav)).toBe('partial-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.hlu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.hdu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.ptit)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.hub)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.ctu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.vinhuni)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.ttn)).toBe("verified-calculator");
    expect(deriveInstitutionSupportStatus(schoolRegistry.tnu)).toBe('eligibility-only');
    expect(deriveInstitutionSupportStatus(schoolRegistry.dlu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.eaut)).toBe('eligibility-only');
    expect(deriveInstitutionSupportStatus(schoolRegistry.vwa)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.hau)).toBe('verified-calculator');
    // Batch (2026-08-28): CTUMP graduated to verified-calculator — mức điểm nhận hồ sơ đợt 1 (4
    // nhóm ngành) đã gồm điểm ưu tiên theo đúng công thức giảm dần trích từ chính TB 197/TB-ĐHYDCT.
    expect(deriveInstitutionSupportStatus(schoolRegistry.ctump)).toBe('verified-calculator');
    // Batch 4 (2026-08-28): APD/BVU/TBU/UHD graduated to verified-calculator — mỗi trường đọc
    // trực tiếp 1 văn bản/PDF chính thức xác nhận công thức điểm ưu tiên (hoặc xác nhận rõ KHÔNG
    // cộng ưu tiên, trường hợp BVU) + ngưỡng đầy đủ. TBU: sửa lại giả định cũ (Luật PT1 = 18,0 là
    // SAI — ngưỡng Luật ở PT1 do Bộ GD&ĐT phối hợp Bộ Tư pháp quyết định hàng năm, không cố định;
    // exact chỉ phủ nhóm "các ngành khác"). EIU vẫn eligibility-only (không tìm được nguồn EIU tự
    // xác nhận cách áp dụng điểm ưu tiên/điểm cộng).
    expect(deriveInstitutionSupportStatus(schoolRegistry.apd)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.bvu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.tbu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.uhd)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.eiu)).toBe('eligibility-only');
    expect(deriveInstitutionSupportStatus(schoolRegistry.dthu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.ltvuni)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.fpfu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.dhv)).toBe('eligibility-only');
    expect(deriveInstitutionSupportStatus(schoolRegistry.pyu)).toBe('eligibility-only');
    expect(deriveInstitutionSupportStatus(schoolRegistry.nlu)).toBe('verified-calculator');
    // Batch 5 (2026-08-28): AJC/FBU/USH/VNU-UMP graduated to verified-calculator — mỗi trường đọc
    // trực tiếp 1 văn bản/PDF chính thức (hoặc đối chiếu chéo báo chí cho AJC, PDF gốc host nội bộ
    // không truy cập công khai được) xác nhận công thức điểm xét tuyển + ngưỡng đầy đủ. DHV vẫn
    // eligibility-only (không tìm được nguồn DHV tự xác nhận công thức điểm ưu tiên/điểm cộng, dù
    // đã thử tuyensinh.dhv.edu.vn, dhv.edu.vn/en/enrollment và nhiều tìm kiếm khác).
    expect(deriveInstitutionSupportStatus(schoolRegistry.ajc)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.fbu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.ush)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.vnuump)).toBe('verified-calculator');
    // Batch (2026-08-28): HCMUPES graduated to verified-calculator — Thông báo 05/TB-HĐTS công bố
    // ĐẦY ĐỦ bảng ngưỡng theo khu vực ưu tiên (KV1-KV3), không cần judgment call cho điểm ưu tiên.
    expect(deriveInstitutionSupportStatus(schoolRegistry.hcmupes)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.vnuulis)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.hce)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.hul)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.hcmute)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.vku)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.utc)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.hup)).toBe('verified-calculator');
    for (const schoolId of ['husc', 'huaf', 'hueedu', 'humg', 'vmu']) {
      expect(deriveInstitutionSupportStatus(schoolRegistry[schoolId]), schoolId).toBe('verified-calculator');
    }
    for (const schoolId of ['dut', 'dueudn', 'uedudn', 'uteudn']) {
      expect(deriveInstitutionSupportStatus(schoolRegistry[schoolId]), schoolId).toBe('eligibility-only');
    }
    // UFLS graduated to verified-calculator (2026-08-28) — 4 ngành đào tạo giáo viên ngoại ngữ,
    // ngưỡng thô + điểm ưu tiên; các ngành cử nhân còn lại vẫn eligibility-only (cần học bạ).
    expect(deriveInstitutionSupportStatus(schoolRegistry.uflsudn)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.ntuhn)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.umt)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.ttu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.tgu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.tdmu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.halongu)).toBe('verified-calculator');
    expect(deriveInstitutionSupportStatus(schoolRegistry.sgu)).toBe('verified-calculator');
    // Batch 3 (2026-08-28): PNTU graduated to verified-calculator — ngưỡng đầu vào 14/14 ngành
    // (cross-checked, 2 nguồn báo chí độc lập khớp tuyệt đối) + điểm ưu tiên KV/ĐT cộng vào tổng
    // theo đúng công thức giảm dần trích nguyên văn Quyết định 671/QĐ-TĐHYKPNT. DUT/HUIT/NTTU/VAA
    // vẫn eligibility-only (thiếu công thức quy đổi/bảng ngưỡng đầy đủ máy đọc được — xem knowledgeGaps).
    expect(deriveInstitutionSupportStatus(schoolRegistry.pntu)).toBe('verified-calculator');
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
