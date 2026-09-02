import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { aofKnowledgeGaps } from './knowledgeGaps';

/**
 * Batch 2026-09-02 (roadmap 100 -> 150) — thêm method[1] `aof-thpt-exam-exact-2025`: điểm CHUẨN
 * TRÚNG TUYỂN thật (khác method[0] là ngưỡng SÀN 2026) của năm liền kề 2025, công bố CHI TIẾT THEO
 * TỪNG MÃ NGÀNH — nguồn Báo Hà Tĩnh + tuyensinh247 (`thresholds2025.ts`), khớp TUYỆT ĐỐI 34/34
 * ngành/chương trình. `exactCalculator: true`, KHÔNG gắn `knowledgeGaps` (cùng tiền lệ
 * `schools/vnuuet`, `schools/hunre`, `schools/hump`) — gap của method[0] (2026, ngưỡng dải, chưa
 * có bảng ánh xạ mã ngành) KHÔNG áp dụng cho method[1] (2025, đã có bảng chi tiết theo mã ngành).
 */
export const aofAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'aof-thpt-exam-2026',
    schoolId: 'aof',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026 (phương thức 3)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: aofKnowledgeGaps,
  },
  {
    id: 'aof-thpt-exam-exact-2025',
    schoolId: 'aof',
    name: 'Xét điểm thi TN THPT năm 2025 (phương thức 3) — Điểm chuẩn theo ngành/chương trình',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 34 ngành/chương trình đại học chính quy của AOF'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
