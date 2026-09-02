import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tluKnowledgeGaps } from './knowledgeGaps';

/**
 * Batch 2026-09-02 — TLU (Đại học Thủy lợi) 2025: điểm chuẩn PT1 (xét điểm thi TN THPT) đăng lại
 * nguyên văn trên Cổng TTĐT Chính phủ (`sources.ts:tlu-threshold-2025`), 43/43 ngành đại học chính
 * quy hệ tiêu chuẩn. Method[0] = baseline (không cần chọn ngành, dùng dải điểm chuẩn thấp nhất/cao
 * nhất trong 43 ngành). Method[1] = nhánh exact theo TỪNG NGÀNH cụ thể (`exactCalculator: true`,
 * KHÔNG gắn `knowledgeGaps` — auditMethods() coi exactCalculator:true + knowledgeGaps non-empty là
 * lỗi EXACT_METHOD_HAS_UNRESOLVED_GAPS, cùng tiền lệ `schools/hdiu`, `schools/gdu`) — các gap còn
 * lại của TLU (`knowledgeGaps.ts`: tiêu chí phụ TTNV/điều kiện môn phụ Luật, giá trị điểm ưu tiên
 * judgment call, tổ hợp không validate theo ngành, tổ hợp riêng của trường loại trừ, PT2/PT3 chưa
 * mô hình hoá) đều KHÔNG chặn exact cho đúng phạm vi phương thức PT1 theo ngành đã chọn.
 */
export const tluAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tlu-thpt-exam-2025',
    schoolId: 'tlu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2025 (PT1)',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tluKnowledgeGaps,
  },
  {
    id: 'tlu-thpt-exam-exact-2025',
    schoolId: 'tlu',
    name: 'Xét điểm thi TN THPT (PT1) — Điểm chuẩn theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 43 ngành đại học chính quy hệ tiêu chuẩn của TLU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
