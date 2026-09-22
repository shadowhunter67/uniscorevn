import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { nttuKnowledgeGaps } from './knowledgeGaps';

const gapById = (id: string) => nttuKnowledgeGaps.filter((gap) => gap.id === id);

const transcriptGaps = [
  ...gapById('nttu-transcript-methodology-unpublished'),
  ...gapById('nttu-priority-bonus-table-not-found'),
  ...gapById('nttu-program-catalog-not-imported'),
  ...gapById('nttu-dgnl-methods-not-modeled'),
  ...gapById('nttu-source-publish-date-unavailable'),
];

/**
 * NTTU 2026 — 1/nhiều phương thức có ngưỡng đọc được từ nguồn (Phương thức học bạ, 6 nhóm ngành);
 * ĐGNL ĐHQG TP.HCM/Hà Nội có ngưỡng công bố nhưng ngoài scope batch này
 * (`nttu-dgnl-methods-not-modeled`). `eligibility: true` (ngưỡng đã verified từ 1 nguồn official-
 * school) nhưng `scoreConversion`/`bonus`/`priority`/`exactCalculator` đều `false` — chặn bởi gap
 * thật (phương pháp tính điểm học bạ chưa nêu rõ, bảng ưu tiên/điểm cộng chưa tìm thấy, danh mục
 * ngành chưa import).
 */
export const nttuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'nttu-transcript-2026',
    schoolId: 'nttu',
    name: 'Xét kết quả học tập THPT (học bạ)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: transcriptGaps,
  },
  /**
   * Nhánh exact — điểm chuẩn thật (công bố 09/8/2026) theo 6 nhóm ngành, phương thức thi TN THPT.
   * So RAW — nguồn không có anchor điểm ưu tiên/điểm cộng (xem `nttu-priority-bonus-recheck-2026-08-28`,
   * `sources.ts:nttu-cutoff-2026`) nên KHÔNG hiển thị điểm ưu tiên kể cả dạng tham khảo. KHÔNG gắn
   * `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'nttu-thpt-exam-exact-2026',
    schoolId: 'nttu',
    name: 'Xét kết quả thi TN THPT — điểm chuẩn theo nhóm ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 6 nhóm ngành NTTU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: true },
  },
];
