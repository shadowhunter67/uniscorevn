import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tdmuKnowledgeGaps } from './knowledgeGaps';

const gapById = (id: string) => tdmuKnowledgeGaps.filter((gap) => gap.id === id);

const sharedGaps = [...gapById('tdmu-priority-bonus-table-not-found'), ...gapById('tdmu-program-catalog-not-imported'), ...gapById('tdmu-gdmn-kientruc-xaydung-special-condition-not-modeled')];

const thptExamGaps = [...sharedGaps, ...gapById('tdmu-law-additional-input-standard-not-found')];
const transcriptGaps = [...sharedGaps, ...gapById('tdmu-law-additional-input-standard-not-found')];
const vactGaps = [...sharedGaps, ...gapById('tdmu-law-additional-input-standard-not-found')];

/**
 * TDMU 2026 — 3 phương thức có ngưỡng đọc được từ nguồn chính thức
 * (`sources.ts:tdmu-quality-threshold-2026`) VÀ có input khớp `ApplicantProfile`:
 * - Thi TN THPT 2026: điểm thô thang 30, không cần quy đổi — áp dụng cả 3 nhóm (standard/law/teacher).
 * - Học bạ: điểm trung bình 3 môn tổ hợp qua 6 học kỳ (lớp 10/11/12), thang 30, cộng trực tiếp
 *   KHÔNG qua bảng quy đổi trung gian — chỉ áp dụng standard/law (teacher không dùng phương thức
 *   này theo nguồn).
 * - ĐGNL ĐHQG-HCM: điểm thô thang 1200, khớp trực tiếp `ApplicantProfile.exams.vact.total` — chỉ
 *   áp dụng standard/law.
 * Phương thức ĐGNL Trường ĐH Sư phạm Hà Nội KHÔNG model (không có field profile tương ứng, xem
 * `tdmu-dgnl-hanoi-not-modeled`). Cả 3 method đều `eligibility: true` nhưng
 * `bonus`/`priority`/`exactCalculator` đều `false` — ngưỡng công bố là điểm SÀN NHẬN HỒ SƠ, không
 * phải điểm chuẩn trúng tuyển cuối (thiếu bảng điểm ưu tiên/điểm cộng riêng của trường).
 */
export const tdmuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tdmu-thpt-exam-2026',
    schoolId: 'tdmu',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026', 'Thí sinh tốt nghiệp THPT năm 2025 trở về trước'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: thptExamGaps,
  },
  {
    id: 'tdmu-transcript-2026',
    schoolId: 'tdmu',
    name: 'Xét học bạ THPT',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026', 'Thí sinh tốt nghiệp THPT năm 2025 trở về trước'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: transcriptGaps,
  },
  {
    id: 'tdmu-vact-2026',
    schoolId: 'tdmu',
    name: 'Xét kết quả thi ĐGNL ĐHQG-HCM năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026', 'Thí sinh tốt nghiệp THPT năm 2025 trở về trước'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vactGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), phương thức thi TN THPT, phạm vi nhóm `standard`
   * (45 ngành, TRỪ Kiến trúc 7580101 và Kỹ thuật xây dựng 7580201 — điều kiện phụ riêng, xem
   * `tdmu-gdmn-kientruc-xaydung-special-condition-not-modeled`, caller tự xác nhận
   * `isGeneralProgram: true`) và nhóm `law` (ngành Luật 7380101, ĐK "chuẩn đầu vào QĐ 678/QĐ-BGDĐT"
   * ngoài phạm vi điểm số — xem `tdmu-law-additional-input-standard-not-found`). Nhóm `teacher`
   * KHÔNG đưa vào exact (gồm Giáo dục Mầm non 7140201 với công thức riêng, xem gap). Ngưỡng đầu
   * vào ≥15 (standard)/≥20 (law), so với TỔNG ĐIỂM THÔ (nguồn không nói ngưỡng đã gồm ưu tiên —
   * đây là "điểm sàn nhận hồ sơ", xem `sources.ts`). Điểm xét tuyển hiển thị = tổng thô + điểm ưu
   * tiên judgment call (Điều 7 TT 06/2026, `priority.ts`) — chỉ để tham khảo, KHÔNG dùng để so
   * ngưỡng. KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'tdmu-thpt-exam-exact-2026',
    schoolId: 'tdmu',
    name: 'Xét kết quả thi TN THPT — ngưỡng đầu vào ("các ngành khác" trừ Kiến trúc/Xây dựng, và ngành Luật)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một ngành TDMU thuộc nhóm standard (trừ Kiến trúc/Kỹ thuật xây dựng) hoặc ngành Luật'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
