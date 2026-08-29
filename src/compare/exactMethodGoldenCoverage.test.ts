import { describe, expect, it } from 'vitest';
import { schoolSourceRegistries } from '../schools/sourceRegistry';
import { hcmutAdmissionMethods } from '../schools/hcmut/methods';
import { uehAdmissionMethods } from '../schools/ueh/methods';
import { uelAdmissionMethods } from '../schools/uel/methods';
import { uitAdmissionMethods } from '../schools/uit/methods';
import { hcmusAdmissionMethods } from '../schools/hcmus/methods';
import { usshAdmissionMethods } from '../schools/ussh/methods';
import { uhsAdmissionMethods } from '../schools/uhs/methods';
import { iuAdmissionMethods } from '../schools/iu/methods';
import { aguAdmissionMethods } from '../schools/agu/methods';
import { hcmueAdmissionMethods } from '../schools/hcmue/methods';
import { hutechAdmissionMethods } from '../schools/hutech/methods';
import { ufmAdmissionMethods } from '../schools/ufm/methods';
import { hcmulawAdmissionMethods } from '../schools/hcmulaw/methods';
import { iuhAdmissionMethods } from '../schools/iuh/methods';
import { ftuAdmissionMethods } from '../schools/ftu/methods';
import { ctumpAdmissionMethods } from '../schools/ctump/methods';
import { vnuaAdmissionMethods } from '../schools/vnua/methods';
import { pntuAdmissionMethods } from '../schools/pntu/methods';
import { apdAdmissionMethods } from '../schools/apd/methods';
import { bvuAdmissionMethods } from '../schools/bvu/methods';
import { tbuAdmissionMethods } from '../schools/tbu/methods';
import { uhdAdmissionMethods } from '../schools/uhd/methods';
import { ajcAdmissionMethods } from '../schools/ajc/methods';
import { fbuAdmissionMethods } from '../schools/fbu/methods';
import { ushAdmissionMethods } from '../schools/ush/methods';
import { vnuumpAdmissionMethods } from '../schools/vnuump/methods';
import { ltvuniAdmissionMethods } from '../schools/ltvuni/methods';
import { fpfuAdmissionMethods } from '../schools/fpfu/methods';
import { uflsudnAdmissionMethods } from '../schools/uflsudn/methods';
import { hcmupesAdmissionMethods } from '../schools/hcmupes/methods';
import { thanhdoAdmissionMethods } from '../schools/thanhdo/methods';
import { uedudnAdmissionMethods } from '../schools/uedudn/methods';
import { dainamAdmissionMethods } from '../schools/dainam/methods';
import { utmAdmissionMethods } from '../schools/utm/methods';
import { uttAdmissionMethods } from '../schools/utt/methods';
import { hmuAdmissionMethods } from '../schools/hmu/methods';

import { hcmutGoldenCases, hcmutNoDgnlGoldenCase } from '../schools/hcmut/__fixtures__/officialExamples2026';
import { uehGoldenCases, uehOfficialFinalConversionCase } from '../schools/ueh/__fixtures__/officialExamples2026';
import { uelGoldenCases } from '../schools/uel/__fixtures__/officialExamples2026';
import { hcmusGoldenCase, hcmusVactConversionGoldenCases } from '../schools/hcmus/__fixtures__/officialExamples2026';
import { usshGoldenCases } from '../schools/ussh/__fixtures__/officialExamples2026';
import { iuGoldenCases } from '../schools/iu/__fixtures__/officialExamples2026';
import { hutechThptGoldenCases, hutechDgnlGoldenCases } from '../schools/hutech/__fixtures__/officialExamples2026';
import { ufmThptGoldenCases, ufmDgnlGoldenCases, ufmHocbaGoldenCases, ufmVsatGoldenCases } from '../schools/ufm/__fixtures__/officialExamples2026';
import { hcmulawThpt5GoldenCases, hcmulawVsat4GoldenCases } from '../schools/hcmulaw/__fixtures__/officialExamples2026';
import { iuhCombinedGoldenCases } from '../schools/iuh/__fixtures__/officialExamples2026';
import { ftuDomesticExamGoldenCases } from '../schools/ftu/__fixtures__/officialExamples2026';
import { hcmueThptExamExactGoldenCases } from '../schools/hcmue/__fixtures__/officialExamples2026';
import { ctumpThptExamExactGoldenCases } from '../schools/ctump/__fixtures__/officialExamples2026';
import { vnuaThptExamExactGoldenCases } from '../schools/vnua/__fixtures__/officialExamples2026';
import { pntuThptExamExactGoldenCases } from '../schools/pntu/__fixtures__/officialExamples2026';
import { apdThptExamExactGoldenCases } from '../schools/apd/__fixtures__/officialExamples2026';
import { bvuThptExamExactGoldenCases } from '../schools/bvu/__fixtures__/officialExamples2026';
import { tbuThptExamExactGoldenCases } from '../schools/tbu/__fixtures__/officialExamples2026';
import { uhdThptExamExactGoldenCases } from '../schools/uhd/__fixtures__/officialExamples2026';
import { ajcThptExamExactGoldenCases } from '../schools/ajc/__fixtures__/officialExamples2026';
import { fbuThptExamExactGoldenCases } from '../schools/fbu/__fixtures__/officialExamples2026';
import { ushThptExamExactGoldenCases } from '../schools/ush/__fixtures__/officialExamples2026';
import { vnuumpThptExamExactGoldenCases } from '../schools/vnuump/__fixtures__/officialExamples2026';
import { ltvuniThptExamExactGoldenCases } from '../schools/ltvuni/__fixtures__/officialExamples2026';
import { fpfuThptExamExactGoldenCases } from '../schools/fpfu/__fixtures__/officialExamples2026';
import { uflsudnTeacherTrainingExactGoldenCases } from '../schools/uflsudn/__fixtures__/officialExamples2026';
import { hcmupesGdtcExactGoldenCases } from '../schools/hcmupes/__fixtures__/officialExamples2026';
import { thanhdoThptExamExactGoldenCases } from '../schools/thanhdo/__fixtures__/officialExamples2026';
import { uedudnThptExamExactGoldenCases } from '../schools/uedudn/__fixtures__/officialExamples2026';
import { dainamThptExamExactGoldenCases } from '../schools/dainam/__fixtures__/officialExamples2026';
import { utmThptExamExactGoldenCases } from '../schools/utm/__fixtures__/officialExamples2026';
import { uttThptExamExactGoldenCases } from '../schools/utt/__fixtures__/officialExamples2026';
import { hmuThptExamExactGoldenCases } from '../schools/hmu/__fixtures__/officialExamples2026';

/**
 * Invariant CI bắt buộc: MỌI method có `capabilities.exactCalculator === true` phải có ÍT NHẤT 1
 * golden fixture source-anchored (Tier A/B/C, xem `core/goldenAdmissionCase.ts`). Không cho phép
 * bypass bằng comment `TODO` — nếu 1 exact method mới được thêm mà quên golden fixture, test này
 * FAIL rõ ràng ngay, không im lặng.
 *
 * `exactMethodGoldenCoverage` KHÔNG phải 1 Set khai tay (dễ lệch, y hệt bug `COMPARE_SCHOOL_ORDER`
 * cũ) — nó ĐƯỢC DERIVE trực tiếp từ chính các mảng `*GoldenCases`/`*GoldenCase` thật đang tồn tại
 * (mỗi golden case đã tự khai `schoolId`/`methodId`). Thêm 1 school/method mới có exact=true mà
 * quên tạo fixture → set `exactMethods` có entry mới, set `coveredMethods` không đổi → test dưới
 * fail ngay, chỉ đúng ra "thiếu golden coverage cho X" chứ không phải lỗi mơ hồ.
 */
const allMethodsBySchool = {
  hcmut: hcmutAdmissionMethods,
  ueh: uehAdmissionMethods,
  uel: uelAdmissionMethods,
  uit: uitAdmissionMethods,
  hcmus: hcmusAdmissionMethods,
  ussh: usshAdmissionMethods,
  uhs: uhsAdmissionMethods,
  iu: iuAdmissionMethods,
  agu: aguAdmissionMethods,
  hcmue: hcmueAdmissionMethods,
  hutech: hutechAdmissionMethods,
  ufm: ufmAdmissionMethods,
  hcmulaw: hcmulawAdmissionMethods,
  iuh: iuhAdmissionMethods,
  ftu: ftuAdmissionMethods,
  ctump: ctumpAdmissionMethods,
  vnua: vnuaAdmissionMethods,
  pntu: pntuAdmissionMethods,
  apd: apdAdmissionMethods,
  bvu: bvuAdmissionMethods,
  tbu: tbuAdmissionMethods,
  uhd: uhdAdmissionMethods,
  ajc: ajcAdmissionMethods,
  fbu: fbuAdmissionMethods,
  ush: ushAdmissionMethods,
  vnuump: vnuumpAdmissionMethods,
  ltvuni: ltvuniAdmissionMethods,
  fpfu: fpfuAdmissionMethods,
  uflsudn: uflsudnAdmissionMethods,
  hcmupes: hcmupesAdmissionMethods,
  thanhdo: thanhdoAdmissionMethods,
  uedudn: uedudnAdmissionMethods,
  dainam: dainamAdmissionMethods,
  utm: utmAdmissionMethods,
  utt: uttAdmissionMethods,
  hmu: hmuAdmissionMethods,
};

function methodKey(schoolId: string, methodId: string): string {
  return `${schoolId}:${methodId}`;
}

const exactMethods = new Set<string>();
for (const [schoolId, methods] of Object.entries(allMethodsBySchool)) {
  for (const method of methods) {
    if (method.capabilities.exactCalculator) exactMethods.add(methodKey(schoolId, method.id));
  }
}

/** Mỗi golden case (mọi tier) tự khai `schoolId`/`methodId` — cộng lại thành danh sách coverage
 * thật. Tier B (bảng/converter — vd `hcmusVactConversionGoldenCases`) VẪN tính là coverage hợp lệ
 * cho method exact tương ứng vì nó anchor 1 rule score-affecting THẬT của method đó (không phải
 * mọi rule của method, nhưng đủ để không rơi vào "hoàn toàn không có golden nào"). */
const allGoldenCases = [
  ...hcmutGoldenCases,
  hcmutNoDgnlGoldenCase,
  ...uehGoldenCases,
  uehOfficialFinalConversionCase,
  ...uelGoldenCases,
  hcmusGoldenCase,
  ...hcmusVactConversionGoldenCases,
  ...usshGoldenCases,
  ...iuGoldenCases,
  ...hutechThptGoldenCases,
  ...hutechDgnlGoldenCases,
  ...ufmThptGoldenCases,
  ...ufmDgnlGoldenCases,
  ...ufmHocbaGoldenCases,
  ...ufmVsatGoldenCases,
  ...hcmulawThpt5GoldenCases,
  ...hcmulawVsat4GoldenCases,
  ...iuhCombinedGoldenCases,
  ...ftuDomesticExamGoldenCases,
  ...hcmueThptExamExactGoldenCases,
  ...ctumpThptExamExactGoldenCases,
  ...vnuaThptExamExactGoldenCases,
  ...pntuThptExamExactGoldenCases,
  ...apdThptExamExactGoldenCases,
  ...bvuThptExamExactGoldenCases,
  ...tbuThptExamExactGoldenCases,
  ...uhdThptExamExactGoldenCases,
  ...ajcThptExamExactGoldenCases,
  ...fbuThptExamExactGoldenCases,
  ...ushThptExamExactGoldenCases,
  ...vnuumpThptExamExactGoldenCases,
  ...ltvuniThptExamExactGoldenCases,
  ...fpfuThptExamExactGoldenCases,
  ...uflsudnTeacherTrainingExactGoldenCases,
  ...hcmupesGdtcExactGoldenCases,
  ...thanhdoThptExamExactGoldenCases,
  ...uedudnThptExamExactGoldenCases,
  ...dainamThptExamExactGoldenCases,
  ...utmThptExamExactGoldenCases,
  ...uttThptExamExactGoldenCases,
  ...hmuThptExamExactGoldenCases,
];

const coveredMethods = new Set(allGoldenCases.map((goldenCase) => methodKey(goldenCase.schoolId, goldenCase.methodId)));

describe('exact method golden coverage invariant', () => {
  it('every exactCalculator=true method currently in the registry has at least one golden fixture', () => {
    const uncovered = [...exactMethods].filter((key) => !coveredMethods.has(key));
    expect(uncovered, `Exact method(s) missing golden/domain-conformance coverage: ${uncovered.join(', ')}`).toEqual([]);
  });

  it('the exact-method set is non-empty (sanity check — proves this test is not vacuously true)', () => {
    expect(exactMethods.size).toBeGreaterThan(0);
  });

  it('every golden case references a schoolId/methodId that is actually exactCalculator=true (no stale/misfiled fixtures)', () => {
    for (const goldenCase of allGoldenCases) {
      const key = methodKey(goldenCase.schoolId, goldenCase.methodId);
      expect(exactMethods.has(key), `Golden case "${goldenCase.id}" references "${key}" which is not an exactCalculator=true method`).toBe(true);
    }
  });

  it('every golden case sourceId exists in the real schoolSourceRegistries (no invented/typo-ed sourceId)', () => {
    for (const goldenCase of allGoldenCases) {
      const registry = schoolSourceRegistries[goldenCase.schoolId] ?? [];
      const found = registry.some((source) => source.id === goldenCase.sourceId);
      expect(found, `Golden case "${goldenCase.id}" references sourceId "${goldenCase.sourceId}" not found in ${goldenCase.schoolId}'s source registry`).toBe(true);
    }
  });

  it('reports the current exact-method inventory (documentation aid, not a strict assertion)', () => {
    expect([...exactMethods].sort()).toEqual(
      [
        'hcmut:hcmut-comprehensive-2026',
        'hcmus:hcmus-method2-2026',
        'iu:iu-method2-2026',
        'ueh:ueh-integrated-2026',
        'uel:uel-comprehensive-2026',
        'ussh:ussh-integrated-2026',
        'hutech:hutech-thpt-2026',
        'hutech:hutech-dgnl-2026',
        'ufm:ufm-thpt-2026',
        'ufm:ufm-hocba-2026',
        'ufm:ufm-dgnl-2026',
        'ufm:ufm-vsat-2026',
        'hcmulaw:hcmulaw-thpt5-2026',
        'hcmulaw:hcmulaw-vsat4-2026',
        'iuh:iuh-combined-2026',
        'ftu:ftu-domestic-exam-2026',
        'hcmue:hcmue-thpt-exam-exact-2026',
        'ctump:ctump-thpt-exam-exact-2026',
        'vnua:vnua-thpt-exam-exact-2026',
        'pntu:pntu-thpt-exam-exact-2026',
        'apd:apd-thpt-exam-exact-2026',
        'bvu:bvu-thpt-exam-exact-2026',
        'tbu:tbu-thpt-exam-exact-2026',
        'uhd:uhd-thpt-exam-exact-2026',
        'ajc:ajc-thpt-exam-exact-2026',
        'fbu:fbu-thpt-exam-exact-2026',
        'ush:ush-thpt-plus-talent-exact-2026',
        'vnuump:vnuump-thpt-exam-exact-2026',
        'ltvuni:ltvuni-thpt-exam-exact-2026',
        'fpfu:fpfu-thpt-exam-exact-2026',
        'uflsudn:uflsudn-teacher-training-exact-2026',
        'hcmupes:hcmupes-thpt-plus-talent-2026',
        'thanhdo:thanhdo-thpt-exam-exact-2026',
        'uedudn:uedudn-thpt-exam-exact-2026',
        'dainam:dainam-thpt-exam-exact-2026',
        'utm:utm-thpt-exam-exact-2026',
        'utt:utt-thpt-exam-exact-2026',
        'hmu:hmu-thpt-exam-exact-2026',
      ].sort()
    );
  });
});

