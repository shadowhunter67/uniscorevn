import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hunreKnowledgeGaps } from './knowledgeGaps';

/**
 * Batch 2026-09-02 — HUNRE (Trường Đại học Tài nguyên và Môi trường Hà Nội) 2025: điểm chuẩn theo
 * ngành, nguồn Viettelstore (`sources.ts`), cross-check dải điểm + ngành cao nhất với Giaoduc.net.vn
 * (khớp tuyệt đối). Method[0] = baseline (không cần chọn ngành, dùng dải điểm chuẩn thấp nhất/cao
 * nhất). Method[1] = nhánh exact theo TỪNG NGÀNH (`exactCalculator: true`, KHÔNG gắn
 * `knowledgeGaps` — cùng tiền lệ `schools/vnuuet`, `schools/vnued`) — các gap còn lại
 * (`knowledgeGaps.ts`: giá trị điểm ưu tiên judgment call, tổ hợp khác D01 chưa modeled cho năm
 * 2025, nguồn gốc ảnh không đọc trực tiếp được) đều KHÔNG chặn exact cho đúng phạm vi 22/22 ngành
 * đã mô hình hoá.
 */
export const hunreAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hunre-thpt-exam-2025',
    schoolId: 'hunre',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2025',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hunreKnowledgeGaps,
  },
  {
    id: 'hunre-thpt-exam-exact-2025',
    schoolId: 'hunre',
    name: 'Xét điểm thi TN THPT — Điểm chuẩn theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 22 ngành đại học chính quy của HUNRE, tổ hợp D01'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
