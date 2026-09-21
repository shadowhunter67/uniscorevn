import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { huitKnowledgeGaps } from './knowledgeGaps';

const gapById = (id: string) => huitKnowledgeGaps.filter((gap) => gap.id === id);

const sharedGaps = [
  ...gapById('huit-priority-bonus-table-not-found'),
  ...gapById('huit-program-catalog-not-imported'),
  ...gapById('huit-dgnl-methods-not-modeled'),
  ...gapById('huit-earlier-notice-provisional-superseded'),
];

const thptExamGaps = [...sharedGaps];
const transcriptGaps = [...gapById('huit-transcript-methodology-unpublished'), ...sharedGaps];

/**
 * HUIT 2026 — 2/4 phương thức có ngưỡng đọc được từ nguồn (Phương thức thi TN THPT + Phương thức
 * học tập THPT); ĐGNL ĐHQG TP.HCM và ĐGNL chuyên biệt HCMUE có ngưỡng công bố nhưng ngoài scope
 * batch này (`huit-dgnl-methods-not-modeled`). Cả 2 method `eligibility: true` nhưng
 * `scoreConversion`/`bonus`/`priority`/`exactCalculator` đều `false` — chặn bởi gap thật (bảng ưu
 * tiên/điểm cộng chưa tìm thấy, danh mục ngành chưa import, và với transcript thêm gap phương pháp
 * tính điểm chưa nêu rõ).
 */
export const huitAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'huit-thpt-exam-2026',
    schoolId: 'huit',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: thptExamGaps,
  },
  {
    id: 'huit-transcript-2026',
    schoolId: 'huit',
    name: 'Xét kết quả học tập THPT (học bạ)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: transcriptGaps,
  },
  /**
   * Nhánh HẸP exact — kiểm tra ngưỡng thi TN THPT 2026 theo ngành (39 ngành đại học chính quy, bảng tổ hợp mục 1.3
   * Thông tin tuyển sinh; trừ 5 chương trình liên kết quốc tế). Ngưỡng cuối (bài 10/07/2026): Luật, Luật kinh tế
   * ≥ 20/30 kèm Toán/Ngữ văn (môn có trong tổ hợp) ≥ 6,0; các ngành còn lại ≥ 16/30; mọi ngành tổng thô ≥ 15.
   * `eligible` ⟺ tổng thô ≥ ngưỡng; `ineligible` ⟺ cộng ưu tiên tối đa vẫn < ngưỡng; vùng giữa ⇒ `unknown` (nguồn
   * không nói ưu tiên tính trước hay sau ngưỡng). Không trả `score`: điểm xét tuyển cuối/điểm chuẩn chưa công bố.
   */
  {
    id: 'huit-thpt-exam-program-exact-2026',
    schoolId: 'huit',
    name: 'Kiểm tra ngưỡng thi TN THPT 2026 theo ngành (39 ngành chính quy)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi tốt nghiệp THPT 2026 vào chương trình đại học chính quy'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: true },
  },
];
