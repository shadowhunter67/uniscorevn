import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hubKnowledgeGaps } from './knowledgeGaps';

const gapById = (id: string) => hubKnowledgeGaps.filter((gap) => gap.id === id);

/** Gap dùng chung mọi phương thức: bảng ưu tiên/điểm cộng, danh mục ngành, khu vực Luật khác KV3,
 * bảng quy đổi IELTS-tương-đương Elite Class. */
const sharedGaps = [
  ...gapById('hub-priority-bonus-table-not-found'),
  ...gapById('hub-program-catalog-not-imported'),
  ...gapById('hub-law-other-priority-zones-threshold-unknown'),
  ...gapById('hub-elite-ielts-equivalent-table-not-found'),
];

const thptExamGaps = [...sharedGaps];
const comprehensiveGaps = [
  ...sharedGaps,
  ...gapById('hub-appendix2-comprehensive-conversion-table-unparsed'),
  ...gapById('hub-comprehensive-vsat-pre2026-graduate-not-modeled'),
];
const vsatGaps = [
  ...sharedGaps,
  ...gapById('hub-appendix1-vsat-percentile-table-unparsed'),
  ...gapById('hub-comprehensive-vsat-pre2026-graduate-not-modeled'),
];

/**
 * HUB 2026 — 3 phương thức xét tuyển đại học chính quy đều có ngưỡng đảm bảo chất lượng đầu vào
 * đọc được từ nguồn chính thức (`sources.ts:hub-quality-threshold-2026`): Phương thức 1 (thi TN
 * THPT), Phương thức Tổng hợp, Phương thức V-SAT. Cả 3 method đều `eligibility: true` nhưng
 * `scoreConversion`/`bonus`/`priority`/`exactCalculator` đều `false` — đây là threshold/eligibility
 * checker, KHÔNG phải calculator chính xác:
 * - Phương thức Tổng hợp/V-SAT quy đổi điểm trúng tuyển tương đương cần Phụ lục I/II (bảng phân
 *   vị/khung quy đổi) — official-but-unparsed, chặn `scoreConversion`/`exactCalculator`.
 * - Phương thức 1 (thi TN THPT) có thể hiển thị điểm thi trực tiếp làm điểm xét tuyển KHÔNG cần
 *   quy đổi, NHƯNG bảng điểm ưu tiên khu vực/đối tượng cụ thể áp dụng cho HUB và bảng điểm cộng
 *   thành tích chưa tìm được nguồn riêng (`hub-priority-bonus-table-not-found`) — giữ
 *   `exactCalculator: false` cho an toàn (không claim "điểm xét tuyển cuối" khi thiếu điểm ưu
 *   tiên/điểm cộng).
 */
export const hubAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hub-thpt-exam-2026',
    schoolId: 'hub',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026 (Phương thức 1)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: thptExamGaps,
  },
  {
    id: 'hub-comprehensive-2026',
    schoolId: 'hub',
    name: 'Xét tuyển Phương thức Tổng hợp',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026', 'Thí sinh tốt nghiệp THPT năm 2025 trở về trước'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: comprehensiveGaps,
  },
  {
    id: 'hub-vsat-2026',
    schoolId: 'hub',
    name: 'Xét tuyển bằng điểm thi V-SAT',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026', 'Thí sinh tốt nghiệp THPT năm 2025 trở về trước'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vsatGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact) — Phương thức 1 (thi TN THPT), khối Luật (Luật, Luật
   * kinh tế, Luật kinh tế TA bán phần), thí sinh khu vực 3. Trích nguyên văn
   * `hub-quality-threshold-2026`:
   *  - Công thức: "Điểm xét tuyển = Tổng điểm + điểm ưu tiên (khu vực, đối tượng, thang 30 theo
   *    quy định)"; khối Luật không có điểm cộng ⇒ ĐXT = tổng thô 3 môn + điểm ưu tiên
   *  - Ngưỡng: 20/30 (KV3, không hệ số, không điểm cộng) + Toán ≥ 6 (tổ hợp A00/A01/D07) hoặc
   *    Toán ≥ 6 và Ngữ văn ≥ 6 (tổ hợp C01/C02/D01) — `eligibility.ts:checkHubLawThptExamThreshold`
   *  - Điểm ưu tiên: Điều 7 quy chế hiện hành ("theo quy định") + công thức giảm ≥ 22,5 —
   *    judgment call như `schools/utc`/`schools/ptit`
   * Phạm vi: chỉ thí sinh khu vực 3 (ngưỡng KV khác chưa công bố — `hub-law-other-priority-zones-threshold-unknown`).
   * KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'hub-law-thpt-exam-exact-2026',
    schoolId: 'hub',
    name: 'Xét kết quả thi TN THPT (Phương thức 1) — Điểm xét tuyển khối Luật, thí sinh khu vực 3',
    year: 2026,
    applicantTypes: [
      'Thí sinh khu vực 3 xét Phương thức 1 (thi TN THPT 2026) vào ngành Luật / Luật kinh tế / Luật kinh tế (tiếng Anh bán phần) của HUB',
    ],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
