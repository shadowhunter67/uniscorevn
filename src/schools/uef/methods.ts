import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { uefKnowledgeGaps } from './knowledgeGaps';

const gapById = (id: string) => uefKnowledgeGaps.filter((gap) => gap.id === id);

const sharedGaps = [...gapById('uef-priority-bonus-table-not-found'), ...gapById('uef-program-catalog-not-imported'), ...gapById('uef-dgnl-vsat-methods-not-modeled')];

const thptExamGaps = [...sharedGaps];
const transcriptGaps = [...gapById('uef-transcript-methodology-unpublished'), ...sharedGaps];

/**
 * UEF 2026 — 2/4 phương thức có ngưỡng đọc được (thi TN THPT: 15 chuẩn/20 Luật; học bạ: 18 chuẩn,
 * Luật dùng điều kiện rank+điểm thay thế). ĐGNL ĐHQG TP.HCM/V-SAT có ngưỡng công bố nhưng ngoài
 * scope batch này (`uef-dgnl-vsat-methods-not-modeled`). Cả 2 method `eligibility: true` nhưng
 * `scoreConversion`/`bonus`/`priority`/`exactCalculator` đều `false`.
 */
export const uefAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'uef-thpt-exam-2026',
    schoolId: 'uef',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: thptExamGaps,
  },
  {
    id: 'uef-transcript-2026',
    schoolId: 'uef',
    name: 'Xét học bạ THPT (điểm trung bình tổ hợp 3 môn, 6 học kỳ)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: transcriptGaps,
  },
  /**
   * Batch 2026-08-26 — đọc trực tiếp Đề án tuyển sinh 2026 (PDF 91 trang, `uef-de-an-tuyen-sinh-2026`)
   * qua Google Drive: mục 2 (tổ hợp môn theo ngành, phương thức 100 áp dụng đồng thời mọi ngành),
   * mục 5.b ("Điểm cộng: không" — không hệ số, không bonus), mục 7 (bảng ưu tiên đầy đủ + công thức
   * giảm điểm ưu tiên) đều verified → `exactCalculator: true` cho nhóm ngành ngoài Luật (ngưỡng
   * 15/30 chung, `name` đã nêu rõ phạm vi). KHÔNG gắn `knowledgeGaps` (auditMethods() coi
   * exactCalculator:true + knowledgeGaps non-empty là lỗi EXACT_METHOD_HAS_UNRESOLVED_GAPS) — các
   * gap còn lại của UEF (nhóm Luật, ĐGNL/V-SAT, học bạ theo học kỳ, danh mục ngành đầy đủ) đều
   * KHÔNG chặn exact cho đúng phạm vi phương thức này.
   */
  {
    id: 'uef-thpt-exam-standard-2026',
    schoolId: 'uef',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026 (nhóm ngành ngoài Luật)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, nhóm ngành ngoài Luật/Luật Kinh tế/Luật quốc tế/Luật Thương mại quốc tế'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
