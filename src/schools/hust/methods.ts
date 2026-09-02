import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hustKnowledgeGaps } from './knowledgeGaps';

/**
 * Method[0] = ngưỡng đảm bảo chất lượng 2026 (dải theo khối nhóm ngành, giữ nguyên, KHÔNG đụng).
 * Method[1] = nhánh exact CHO NĂM 2025 (roadmap 100 -> 150, batch tiếp theo AOF/HUC) — điểm chuẩn
 * trúng tuyển thật theo TỪNG chương trình + TỪNG nhóm tổ hợp (`thresholds2025.ts`), công thức có
 * trọng số "môn chính" xác nhận trực tiếp qua ts.hust.edu.vn (`evidence2025.ts`). 2 method KHÔNG
 * trộn/nội suy giữa 2 năm — cùng nguyên tắc AOF.
 */
export const hustAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hust-thpt-exam-2026',
    schoolId: 'hust',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hustKnowledgeGaps,
  },
  {
    id: 'hust-thpt-exam-exact-2025',
    schoolId: 'hust',
    name: 'Xét điểm thi TN THPT — Điểm chuẩn theo chương trình và tổ hợp (2025)',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 65 chương trình đào tạo của HUST'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
