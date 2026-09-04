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
      eligibilitySupported: 22,
      calculatorSupported: 133,
      partialCalculator: 3,
      fullyVerified: 130,
      catalogOnly: 42,
    });
  });

  it('documents researched as admission-data-or-better semantics', () => {
    const summary = summarizeInstitutionCoverage();
    const researchedOnly = summary.admissionDataAvailable - summary.eligibilitySupported - summary.partialCalculator - summary.fullyVerified;

    expect(summary.researched).toBe(summary.admissionDataAvailable);
    expect(researchedOnly).toBe(70);
    expect(deriveInstitutionSupportStatus(schoolRegistry.uah), 'uah').toBe('verified-calculator');
    for (const schoolId of [
      'vnuvju', 'hanu',
      'ntu', 'hueu',
      'udn',
      'uth', 'rmitvn', 'vinuni',
    ]) {
      expect(deriveInstitutionSupportStatus(schoolRegistry[schoolId]), schoolId).toBe('researched');
    }
    // Batch (2026-09-03, roadmap 100 -> 150): TLU-HN (Trường Đại học Thăng Long) graduated to
    // verified-calculator — official Thông báo số 25082205/TB-ĐHTL (22/8/2025, PDF gốc có chữ ký +
    // con dấu, đọc bằng vision) publishes per-ngành điểm trúng tuyển for the "tổ hợp gốc" of each
    // group, cross-referenced with the official combo-delta conversion Thông báo số 25072301/TB-ĐHTL
    // (23/7/2025) to convert to any other combo within the same group. 22/24 ngành modeled (excludes
    // Thanh nhạc/Thiết kế đồ hoạ — Nhóm 4, no conversion table).
    expect(deriveInstitutionSupportStatus(schoolRegistry.thanglong)).toBe('verified-calculator');
    // Batch (2026-09-03, roadmap 100 -> 150): BLU (Trường Đại học Bạc Liêu) graduated to
    // verified-calculator — official tuyensinh.blu.edu.vn: ảnh "ĐIỂM CHUẨN TRÚNG TUYỂN NĂM 2026"
    // (Quyết định số 426/QĐ-ĐHBL, 10/8/2026, đọc bằng vision) + trang HTML chính thức tổ hợp môn theo
    // ngành + trang HTML chính thức công thức điểm ưu tiên (xác nhận KV1=0,75/nhóm ĐT2=1,00 qua ví
    // dụ minh hoạ). 13/15 ngành đại học chính quy modeled, nhánh thi TN THPT (loại trừ Giáo dục Mầm
    // non — trình độ cao đẳng khác cấp + tổ hợp năng khiếu).
    expect(deriveInstitutionSupportStatus(schoolRegistry.blu)).toBe('verified-calculator');
    // Batch (2026-08-29): HUST graduated to eligibility-only — official ts.hust.edu.vn 2026
    // quality-assurance threshold read via vision from the embedded image, banded by khối nhóm
    // ngành (Kỹ thuật >=20/30; Kinh tế/Giáo dục/Ngoại ngữ >=19,5/30); no per-program mapping found.
    for (const schoolId of ['vnuf', 'vgu', 'hpu2']) {
      expect(deriveInstitutionSupportStatus(schoolRegistry[schoolId]), schoolId).toBe('eligibility-only');
    }
    // Batch (2026-09-03, roadmap 100 -> 150, Phase A remainder): HUST graduated to verified-
    // calculator — found the ACTUAL per-chương-trình/tổ-hợp cutoff table for the adjacent 2025
    // cycle (tuyensinh247, cross-check TUYỆT ĐỐI 4 mức top/bottom qua vnexpress/nhandan/chinhphu.vn)
    // plus the official ts.hust.edu.vn "Điểm xét" weighted-formula page — added as an independent
    // method[1] (`hust-thpt-exam-exact-2025`) alongside the still-banded 2026 method[0].
    expect(deriveInstitutionSupportStatus(schoolRegistry.hust)).toBe('verified-calculator');
    // Batch (2026-08-29): AOF (Học viện Tài chính) shipped as a brand-new eligibility-only module —
    // official PDF "Thông tin tuyển sinh đại học năm 2026" (hvtc.edu.vn, downloaded via curl)
    // publishes the phương thức 3 (THPT-exam) threshold banded by campus/program-type (16-20/30),
    // not per individual program — no per-program mapping extracted in this batch.
    // Batch (2026-09-02, roadmap 100 -> 150, Phase A): graduated to verified-calculator — found a
    // per-ngành/chương trình điểm CHUẨN TRÚNG TUYỂN table for the adjacent 2025 cycle (Báo Hà Tĩnh,
    // cross-check TUYỆT ĐỐI qua tuyensinh247, 34/34 ngành/chương trình khớp), added as an
    // independent method[1] (`aof-thpt-exam-exact-2025`) alongside the still-banded 2026 method[0].
    expect(deriveInstitutionSupportStatus(schoolRegistry.aof)).toBe('verified-calculator');
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
    for (const schoolId of ['dut', 'dueudn', 'uteudn']) {
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
    // Batch (2026-08-28): ThanhDo graduated to verified-calculator — thanhdo.edu.vn xác nhận công
    // thức (tổng 3 môn, không tính điểm cộng) + bảng ngưỡng đầy đủ 14/14 ngành (6 mức); điểm ưu
    // tiên KV/ĐT dùng judgment call (nguồn im lặng đúng 1 điểm này, không loại trừ như điểm cộng).
    expect(deriveInstitutionSupportStatus(schoolRegistry.thanhdo)).toBe('verified-calculator');
    // Batch (2026-08-28): UED graduated to verified-calculator — ảnh chính thức tuyensinh.ued.udn.vn
    // xác nhận trực tiếp công thức "tổng 3 môn + điểm ưu tiên KV/ĐT" (mục GHI CHÚ) + bảng ngưỡng
    // đầy đủ 37 ngành (33 dùng công thức chuẩn); UTE (ĐHĐN) vẫn eligibility-only (chưa tìm được
    // ảnh/bảng tương đương).
    expect(deriveInstitutionSupportStatus(schoolRegistry.uedudn)).toBe('verified-calculator');
    // Batch (2026-08-28): Đại Nam (dainam, catalog shortName DNU-HN — distinct from Đồng Nai's
    // 'dnu') graduated to verified-calculator — thông báo chính thức tuyensinh.dainam.edu.vn
    // (mục 1) xác nhận TRỰC TIẾP ngưỡng 15,0/30 (thi TN THPT, ngành ngoài Sức khoẻ/Pháp luật)
    // KHÔNG bao gồm điểm cộng, điểm ưu tiên khu vực/đối tượng — không cần judgment call cho điểm
    // ưu tiên (nguồn loại trừ trực tiếp, không im lặng). 80 -> reaches full verified-exact goal.
    expect(deriveInstitutionSupportStatus(schoolRegistry.dainam)).toBe('verified-calculator');
    // Batch (2026-08-29): UTM graduated to verified-calculator — utm.edu.vn (đọc trực tiếp qua curl,
    // khắc phục lần trước bị 403) xác nhận ngưỡng 15/30 (thi TN THPT, ngành ngoài Luật/Luật kinh
    // tế); điểm ưu tiên KV/ĐT dùng judgment call chuẩn quốc gia (nguồn im lặng đúng điểm này).
    // 80 -> 81.
    expect(deriveInstitutionSupportStatus(schoolRegistry.utm)).toBe('verified-calculator');
    // Batch (2026-08-29): UTT graduated to verified-calculator — utt.edu.vn "Thông báo điểm sàn
    // đăng ký xét tuyển giữa các phương thức xét tuyển năm 2026" xác nhận công thức trực tiếp
    // (ĐXT = tổng 3 môn + điểm ưu tiên) + bảng ngưỡng đầy đủ 75 mã xét tuyển, ngưỡng đã gồm điểm
    // ưu tiên; giá trị bảng KV/ĐT dùng judgment call chuẩn quốc gia. 81 -> 82.
    expect(deriveInstitutionSupportStatus(schoolRegistry.utt)).toBe('verified-calculator');
    // Batch (2026-08-29): HMU shipped as a brand-new verified-calculator module — Thông báo số
    // 3142/TB-ĐHYHN (10/07/2026) công bố ngưỡng đảm bảo chất lượng đầu vào theo 20 mã ngành (tổng
    // thô 3 môn, không hệ số, không cộng điểm ưu tiên/điểm khuyến khích) — no primary PDF located,
    // corroborated across multiple independent official-citing press sources (cross-checked).
    // 82 -> 83.
    expect(deriveInstitutionSupportStatus(schoolRegistry.hmu)).toBe('verified-calculator');
    // Batch (2026-08-29): HAUI graduated to verified-calculator — haui.edu.vn "Ngưỡng đảm bảo chất
    // lượng đầu vào và Quy tắc quy đổi điểm xét tuyển..." (đọc trực tiếp qua curl) công bố bảng
    // ngưỡng đầy đủ 72 mã xét tuyển; điểm ưu tiên KV/ĐT dùng judgment call chuẩn quốc gia (nguồn
    // im lặng ở mục phương thức 3). 83 -> 84.
    expect(deriveInstitutionSupportStatus(schoolRegistry.haui)).toBe('verified-calculator');
    // Batch (2026-08-29): BAV shipped as a brand-new verified-calculator module — hvnh.edu.vn
    // "Thông báo về ngưỡng đảm bảo chất lượng đầu vào..." (Số 3508/TB-HVNH, đọc bằng vision qua PDF
    // scan) công bố công thức (Toán nhân đôi, quy đổi thang 30) + ngưỡng theo loại chương trình
    // (chuẩn/CLC 21,50; liên kết quốc tế 19,00); "Thông tin tuyển sinh năm 2026" (QĐ 2028/QĐ-HVNH)
    // công bố bảng đầy đủ 45 mã xét tuyển với tổ hợp + môn chính (42/45 đưa vào tính toán, 3 mã Luật
    // loại trừ vì ngưỡng chưa công bố); điểm ưu tiên dùng công thức BAV tự công bố với giá trị bảng
    // theo khung quốc gia (judgment call). 84 -> 85.
    expect(deriveInstitutionSupportStatus(schoolRegistry.bav)).toBe('verified-calculator');
    // Batch (2026-08-29): Phenikaa shipped as a brand-new verified-calculator module —
    // phenikaa-uni.edu.vn "công bố ngưỡng điểm nhận hồ sơ xét tuyển..." (bảng ngưỡng dạng ảnh, đọc
    // bằng vision) công bố ngưỡng theo 7 nhóm lĩnh vực/ngành nêu đích danh (công thức đơn giản:
    // không nhân hệ số, không điểm cộng); 2 CTĐT tài năng loại trừ tuyệt đối điểm ưu tiên, các ngành
    // khác dùng judgment call chuẩn quốc gia. 85 -> 86.
    expect(deriveInstitutionSupportStatus(schoolRegistry.phenikaa)).toBe('verified-calculator');
    // Batch (2026-08-29): HOU (Trường Đại học Mở Hà Nội) shipped as a brand-new verified-calculator
    // module — hou.edu.vn "Ngưỡng bảo đảm chất lượng đầu vào Đại học chính quy năm 2026..." (đọc
    // trực tiếp qua curl, ảnh PNG gốc, đọc bằng vision) công bố ngưỡng theo 22 ngành; batch này mô
    // hình hoá 16/22 ngành dùng tổ hợp THPT chuẩn (loại 4 ngành năng khiếu vẽ + Ngôn ngữ Anh/Trung
    // dùng tổ hợp hệ số 2 chưa suy diễn chắc chắn được cách quy đổi). Nguồn xác nhận TRỰC TIẾP điểm
    // ưu tiên KV/ĐT được cộng vào tổng trước khi so ngưỡng; giá trị bảng dùng judgment call chuẩn
    // quốc gia (nguồn im lặng đúng phần này). 86 -> 87.
    expect(deriveInstitutionSupportStatus(schoolRegistry.hou)).toBe('verified-calculator');
    // Batch (2026-08-30): LHU (Trường Đại học Lạc Hồng) graduated to verified-calculator — a prior
    // batch (2026-08-24) left this researched-only because tuyensinh.lhu.edu.vn exposed no
    // extractable numeric text. This batch fetched lhu.edu.vn/640/52289/... (the "năm học 2026-2027"
    // page, distinct from a similarly-named but stale "2025-2026" page still live on the same
    // domain) directly via curl and confirmed verbatim "Điểm môn 1 + Điểm môn 2 + Điểm môn 3 >= 15
    // điểm" (all ngành except Dược/Luật/Luật kinh tế, which follow a separate MOET-published
    // threshold, not modeled). Priority silent -> judgment call chuẩn quốc gia, same as schools/utm.
    // 87 -> 88.
    expect(deriveInstitutionSupportStatus(schoolRegistry.lhu)).toBe('verified-calculator');
    // Batch (2026-08-30): HNMU (Trường Đại học Thủ đô Hà Nội) graduated to verified-calculator —
    // no primary PDF located (same as schools/hmu), but the threshold is quoted verbatim and
    // identically across 2 independent official-citing press outlets (giadinh.suckhoedoisong.vn,
    // vietnamnet.vn), fetched directly via curl. Ngưỡng theo nhóm ngành, KV3, tổng thô không nhân
    // hệ số, không tính điểm cộng: giáo viên 20/30 (GDTC 19/30), pháp luật 20/30, khác 16/30. No
    // priority added to displayed score (same no-priority precedent as schools/hmu). 88 -> 89.
    expect(deriveInstitutionSupportStatus(schoolRegistry.hnmu)).toBe('verified-calculator');
    // Batch (2026-08-30): CMCU (Trường Đại học CMC) graduated to verified-calculator — a prior
    // batch (2026-08-24) only found the "điểm chuẩn" page (image not extractable) and left this
    // researched-only. This batch found a different official page — "Thông báo điểm sàn nộp hồ sơ
    // xét tuyển..." (10/07/2026) — whose threshold table image WAS readable via vision. Formula:
    // môn chính (Toán, or Toán/Văn for Truyền thông Đa phương tiện) x2 + 2 môn bất kỳ, thang 40,
    // 9 named lĩnh vực/ngành (22/40, 21/40, or 20/40). Priority silent -> judgment call chuẩn quốc
    // gia, quy đổi x4/3 sang thang 40 (same technique as schools/ajc). 89 -> 90.
    expect(deriveInstitutionSupportStatus(schoolRegistry.cmcu)).toBe('verified-calculator');
    // Batch (2026-09-02): HDIU (Trường Đại học Đông Đô) graduated from catalog-only/researched to
    // verified-calculator. Quyết định 129/QĐ-ĐHĐD (26/3/2025, PDF gốc có chữ ký/con dấu) confirms
    // điểm xét = tổng thô 3 môn (làm tròn 0,25) + điểm ưu tiên KV/ĐT, and ngưỡng đảm bảo chất lượng
    // đầu vào GỒM CẢ điểm ưu tiên (no judgment call needed for whether priority applies). Specific
    // per-ngành floors (VietNamNet, reporting the school's own announcement): Dược học 19,00/30;
    // Điều dưỡng/KTXN y học 17,00/30; Luật kinh tế 18,00/30; 12 ngành còn lại 14,00/30. Priority
    // VALUE still judgment call (chuẩn quốc gia). 90 -> 91.
    expect(deriveInstitutionSupportStatus(schoolRegistry.hdiu)).toBe('verified-calculator');
    // Batch (2026-09-02): TLU (Trường Đại học Thủy lợi) graduated from researched to
    // verified-calculator. Điểm chuẩn PT1 (xét điểm thi TN THPT) theo ngành đăng lại nguyên văn
    // trên Cổng TTĐT Chính phủ (`sources.ts:tlu-threshold-2025`) — điểm chuẩn trúng tuyển thực tế
    // (không phải điểm sàn), 43/43 ngành đại học chính quy hệ tiêu chuẩn. Priority VALUE judgment
    // call (chuẩn quốc gia, trường không tự công bố mức cụ thể). 92 -> 93.
    expect(deriveInstitutionSupportStatus(schoolRegistry.tlu)).toBe('verified-calculator');
    // Batch (2026-09-02): HPMU (Trường Đại học Y Dược Hải Phòng) graduated from researched to
    // verified-calculator. Điểm chuẩn theo ngành cross-checked qua 2 báo độc lập (VietNamNet,
    // Công lý — nguồn gốc chính thức Cổng TTĐT Chính phủ chỉ đăng dạng ảnh SPA), xác nhận TRỰC
    // TIẾP điểm chuẩn đã cộng điểm ưu tiên/điểm thưởng. 7/7 ngành, điểm chuẩn 19,35-25,33/30.
    // Priority VALUE judgment call (chuẩn quốc gia). 93 -> 94.
    expect(deriveInstitutionSupportStatus(schoolRegistry.hpmu)).toBe('verified-calculator');
    // Batch (2026-09-02): VNU-UEB (Trường Đại học Kinh tế - ĐHQGHN) graduated from researched to
    // verified-calculator. Điểm chuẩn theo ngành cross-checked qua 2 báo độc lập (tuyensinh247,
    // Sforum/CellphoneS — cổng tuyển sinh chính thức trả HTTP 403 khi truy cập trực tiếp), xác
    // nhận TRỰC TIẾP điểm chuẩn = "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có". 6/6 ngành
    // đại học chính quy, điểm chuẩn 24,20-25,72/30, tổ hợp D01/A01/D09/D10/C01/C03/C04/X01 (X01
    // thêm vào core/subjects.ts trong batch này). Priority VALUE judgment call (chuẩn quốc gia).
    // 94 -> 95.
    expect(deriveInstitutionSupportStatus(schoolRegistry.vnueb)).toBe('verified-calculator');
    // Batch (2026-09-02): VNU-UED (Trường Đại học Giáo dục - ĐHQGHN) graduated from researched to
    // verified-calculator. Điểm chuẩn theo ngành + tổ hợp, nguồn tuyensinh247 (cross-check dải
    // điểm với VnExpress; cổng chính thức chỉ đăng ảnh). Xác nhận TRỰC TIẾP điểm chuẩn = "tổng
    // điểm các môn xét tuyển + điểm ưu tiên nếu có". 10/11 ngành (loại trừ nhóm "Khoa học giáo dục
    // và khác" — gộp nhiều chuyên ngành, không rõ 1 mã ngành), điểm chuẩn 25,37-29,84/30, mỗi
    // ngành có tập tổ hợp riêng. Priority VALUE judgment call (chuẩn quốc gia). 95 -> 96.
    expect(deriveInstitutionSupportStatus(schoolRegistry.vnued)).toBe('verified-calculator');
    // Batch (2026-09-02): TVU (Trường Đại học Trà Vinh) graduated from researched to
    // verified-calculator. Điểm chuẩn 5/47+ ngành (khối sức khỏe) cross-checked qua 2 báo độc lập
    // (FPTShop, Sforum/CellphoneS — cổng chính thức chỉ đăng lại ảnh từ VTC News). Xác nhận TRỰC
    // TIẾP điểm chuẩn = "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có". Y khoa 21,25, RHM
    // 20,75, Dược học 19,00, Điều dưỡng 17,25, KTXN y học 21,50/30, tổ hợp A00/B00/B08 (đã có sẵn).
    // Priority VALUE judgment call (chuẩn quốc gia). 96 -> 97.
    expect(deriveInstitutionSupportStatus(schoolRegistry.tvu)).toBe('verified-calculator');
    // Batch (2026-09-02): QNU (Trường Đại học Quy Nhơn) graduated from researched to
    // verified-calculator. Điểm chuẩn 10/52 ngành (khối sư phạm/giáo dục, không nhân hệ số) cross-
    // checked qua 2-3 báo độc lập (trangedu.com, Sforum/CellphoneS, Báo Gia Lai — cổng chính thức
    // chỉ đăng ảnh). Điểm chuẩn công bố là mức ĐXT tối thiểu (ĐXT = 3 môn + điểm ưu tiên theo công
    // thức trường công bố) — đã bao hàm ưu tiên theo định nghĩa. Sư phạm Lịch sử 27,21 xuống Sư
    // phạm Tiếng Anh 23,59/30. Loại trừ ngành khối Kinh tế/Kỹ thuật (nhân hệ số, 2 nguồn lệch
    // nhau). Priority VALUE judgment call (chuẩn quốc gia). 97 -> 98.
    expect(deriveInstitutionSupportStatus(schoolRegistry.qnu)).toBe('verified-calculator');
    // Batch (2026-09-02): QBU (Trường Đại học Quảng Bình) graduated from researched to
    // verified-calculator. Điểm chuẩn 14/15 ngành (loại Giáo dục Mầm non — tổ hợp năng khiếu chưa
    // xác minh), THEO TỪNG TỔ HỢP (không phải 1 mức chung/ngành), cross-checked qua 5 nguồn độc
    // lập (Tuyensinh247/Taro.edu.vn bảng chi tiết theo tổ hợp — khớp tuyệt đối 72/72 cặp ngành/tổ
    // hợp; FPTShop/Sforum/Navigates bảng mức thấp nhất/ngành — khớp tuyệt đối). Nguồn xác nhận
    // TOÀN BỘ 15 ngành KHÔNG nhân hệ số, điểm chuẩn công bố ứng với thí sinh khu vực 3 (điểm ưu
    // tiên = 0) — tương đương mức ĐXT tối thiểu. Dải điểm chuẩn 15,00-26,86/30. Priority VALUE
    // judgment call (chuẩn quốc gia). 98 -> 99.
    expect(deriveInstitutionSupportStatus(schoolRegistry.qbu)).toBe('verified-calculator');
    // Batch (2026-09-02): QNamU (Trường Đại học Quảng Nam) graduated from researched to
    // verified-calculator — MILESTONE: 100th verified-exact calculator, campaign complete (60 ->
    // 100). Điểm chuẩn 8/13 ngành (loại Giáo dục Mầm non — tổ hợp năng khiếu; loại 5 ngành hiển
    // thị mức nhận hồ sơ "14" — xác nhận qua Vietjack.com KHÔNG PHẢI điểm trúng tuyển thật), THEO
    // TỪNG TỔ HỢP, cross-checked TUYỆT ĐỐI qua Trangedu.com + Sforum/CellphoneS (29/29 cặp ngành/
    // tổ hợp). Công thức xác nhận trực tiếp qua Vietjack.com (trích đề án tuyển sinh trường):
    // "Điểm trúng tuyển là tổng điểm 3 môn theo tổ hợp xét tuyển (không nhân hệ số) và điểm ưu
    // tiên" + công thức giảm dần điểm ưu tiên khớp tuyệt đối khung quốc gia (ngưỡng 22,5, số chia
    // 7,5). Dải điểm chuẩn 23,00-26,27/30. Priority VALUE judgment call (chuẩn quốc gia). 99 -> 100.
    expect(deriveInstitutionSupportStatus(schoolRegistry.qnamu)).toBe('verified-calculator');
    // Batch (2026-09-02): VNU-UET (Trường Đại học Công nghệ - ĐHQGHN) graduated from researched to
    // verified-calculator (new roadmap 100 -> 150, batch 1). Điểm chuẩn 20/20 ngành đại học chính
    // quy, nguồn tuyensinh247 (`sources.ts`), cross-check dải điểm với VnExpress. Trường tự công bố
    // "Điểm trúng tuyển của một ngành là như nhau giữa các tổ hợp xét tuyển" (chinhphu.vn) và xác
    // nhận trực tiếp điểm chuẩn ĐÃ CỘNG ưu tiên. Dải điểm chuẩn 22,00-28,19/30. Tổ hợp hỗ trợ
    // A00/A01/D01 (+B00 cho 2 ngành khối nông nghiệp/sinh học) — không cần thêm subject combo mới.
    // Mã ngành dùng mã nội bộ trường (CN1-CN21). Priority VALUE judgment call (chuẩn quốc gia).
    // 100 -> 101.
    expect(deriveInstitutionSupportStatus(schoolRegistry.vnuuet)).toBe('verified-calculator');
    // Batch (2026-09-02): VNU-HUS (Trường Đại học Khoa học Tự nhiên - ĐHQGHN) graduated from
    // researched to verified-calculator (roadmap 100 -> 150, batch 1, Phase B). Điểm chuẩn 28/28
    // ngành đại học chính quy, nguồn tuyensinh247, cross-check dải điểm với Đại biểu Nhân dân
    // (20,5-26 khớp). Mỗi ngành 1 mức điểm chuẩn chung cho mọi tổ hợp công bố (giống VNU-UET).
    // Dải điểm chuẩn 20,05-26,00/30. Tổ hợp hỗ trợ A00/A01/A02/A07/B00/B03/B08/C01/C02/C04/D01/
    // D07/D08/D09/D10/X01 (mọi ngành đều có A00). Mã ngành dùng mã trường (QHT01-QHT99). Priority
    // VALUE judgment call (chuẩn quốc gia). 101 -> 102.
    expect(deriveInstitutionSupportStatus(schoolRegistry.vnuhus)).toBe('verified-calculator');
    // Batch (2026-09-02): VNU-USSH (Trường Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN) graduated
    // from researched to verified-calculator (roadmap 100 -> 150, batch 1, Phase B). Điểm chuẩn
    // 28/29 ngành đại học chính quy (loại Truyền thông đa phương tiện — không có trong bảng nhánh
    // THPT thu thập được), nguồn tuyensinh247, cross-check với VietnamNet. MỖI NGÀNH có mức điểm
    // RIÊNG theo TỪNG tổ hợp (giống QBU, khác VNU-UET/VNU-HUS). Dải điểm chuẩn 21,75-29,00/30. Tổ
    // hợp hỗ trợ C00/C03/C04/D01/D14/D15 (loại D66/D04/D06/DD2 — ngoại ngữ Trung/Nhật/Hàn chưa có
    // SubjectId). Mã ngành dùng mã trường (QHX01-QHX28). Priority VALUE judgment call (chuẩn quốc
    // gia). 102 -> 103.
    expect(deriveInstitutionSupportStatus(schoolRegistry.vnussh)).toBe('verified-calculator');
    // Batch (2026-09-02): HUC (Trường Đại học Văn hóa Hà Nội) graduated from researched to
    // verified-calculator (roadmap 100 -> 150, batch 1, Phase B). Trang tuyển sinh chính thức là
    // SPA render JS (nguyên nhân trước đây bị đánh giá "chưa research được") — retry thành công qua
    // 2 nguồn báo đăng lại dạng text (tuyensinh247 + Báo Hà Tĩnh), khớp TUYỆT ĐỐI 20/20 ngành x tổ
    // hợp. Xác nhận trực tiếp điểm chuẩn "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có". MỖI
    // NGÀNH có 3 mức theo nhóm tổ hợp (D01 riêng; {C03,C04,D14,D15,X01} 1 mức; C00 mức cao nhất) —
    // loại X70/X78 (thành phần môn của trường chưa xác minh). Dải điểm chuẩn 22,80-27,55/30. Mã
    // ngành dùng mã ngành trường. Priority VALUE judgment call (chuẩn quốc gia). 103 -> 104.
    expect(deriveInstitutionSupportStatus(schoolRegistry.huc)).toBe('verified-calculator');
    // Batch (2026-09-02): HUNRE (Trường Đại học Tài nguyên và Môi trường Hà Nội) graduated from
    // researched to verified-calculator (roadmap 100 -> 150, batch 1, Phase B). Điểm chuẩn 22/22
    // ngành đại học chính quy, nguồn Viettelstore, cross-check dải điểm + ngành cao nhất (Marketing)
    // với Giaoduc.net.vn (khớp tuyệt đối). Xác nhận trực tiếp điểm chuẩn "đã bao gồm điểm ưu tiên
    // (nếu có)". Mỗi ngành công bố 1 mức chung (không phân biệt theo tổ hợp) — CHỈ modeled tổ hợp
    // D01 (dải điểm D01 xác nhận riêng khớp chính xác bảng công bố). Dải điểm chuẩn 15,00-26,65/30.
    // Mã ngành dùng mã ngành đào tạo chuẩn quốc gia. Priority VALUE judgment call (chuẩn quốc gia).
    // 104 -> 105.
    expect(deriveInstitutionSupportStatus(schoolRegistry.hunre)).toBe('verified-calculator');
    // Batch (2026-09-02): HUMP (Trường Đại học Y - Dược, Đại học Huế) graduated from researched to
    // verified-calculator (roadmap 100 -> 150, batch 1, Phase B — Huế cluster). Điểm chuẩn 11/11
    // ngành đại học chính quy, nguồn tuyensinh247, cross-check TUYỆT ĐỐI qua Báo Hà Tĩnh (10/11
    // ngành khớp từng số theo tổ hợp). Xác nhận trực tiếp điểm chuẩn "tổng điểm các môn xét tuyển +
    // điểm ưu tiên nếu có". Mỗi ngành 1 mức chung mọi tổ hợp (giống VNU-UET/VNU-HUS/HUNRE). Dải
    // điểm chuẩn 17,00-25,17/30. Tổ hợp A00/B00/B08/D07 (đã có sẵn). Mã ngành dùng mã ngành chuẩn
    // quốc gia (series 772xxxx). Priority VALUE judgment call (chuẩn quốc gia). 105 -> 106.
    expect(deriveInstitutionSupportStatus(schoolRegistry.hump)).toBe('verified-calculator');
    // Batch (2026-09-02): TMU (Trường Đại học Thương mại) graduated from catalog-only/researched to
    // verified-calculator. Thông báo điểm sàn chính thức (đăng lại nguyên văn trên Cổng TTĐT Chính
    // phủ) confirms a SINGLE flat threshold (20/30, no per-ngành variation, "Không có sự chênh lệch
    // điểm ... giữa các tổ hợp xét tuyển") that already includes priority points ("đã bao gồm điểm
    // ưu tiên đối tượng, ưu tiên khu vực") — simpler than HDIU/HOU (no per-field table needed).
    // Models 7/10 published tổ hợp (A00/A01/D01/D07/D09/D10/D84). 91 -> 92.
    expect(deriveInstitutionSupportStatus(schoolRegistry.tmu)).toBe('verified-calculator');
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
    for (const schoolId of ['dut', 'dueudn', 'uteudn']) {
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
