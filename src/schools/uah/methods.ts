import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { uahKnowledgeGaps } from './knowledgeGaps';

export const uahAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'uah-thpt-exam-2026',
    schoolId: 'uah',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: uahKnowledgeGaps,
  },
  /**
   * Batch 2026-08-26 — đọc trực tiếp 2 PDF gốc (Thông báo 391/TB-HĐTS + 975/TB-HĐTS) qua Google
   * Drive viewer: công thức khối A/C/D (tổng thô, không hệ số) + điểm ưu tiên (UAH tự công bố mức
   * khu vực + công thức giảm điểm ưu tiên) + ngưỡng riêng ngành Kỹ thuật cơ sở hạ tầng (16,00/30) đều
   * đã verified. KHÔNG gắn `knowledgeGaps` (auditMethods() coi exactCalculator:true + knowledgeGaps
   * non-empty là lỗi EXACT_METHOD_HAS_UNRESOLVED_GAPS) — các gap còn lại của UAH (`knowledgeGaps.ts`:
   * khối V/H có hệ số môn năng khiếu, ngành/campus khác chưa có ngưỡng verified trực tiếp, ĐGNL/quy
   * đổi tương đương chưa mô hình hoá) đều KHÔNG chặn exact cho đúng phạm vi ngành này.
   */
  {
    id: 'uah-thpt-exam-ktcsht-2026',
    schoolId: 'uah',
    name: 'Xét kết quả thi TN THPT 2026 — ngành Kỹ thuật cơ sở hạ tầng (mã 7580210, TP.HCM)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, ngành Kỹ thuật cơ sở hạ tầng, cơ sở chính TP.HCM'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
