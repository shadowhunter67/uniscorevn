import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { qnuKnowledgeGaps } from './knowledgeGaps';

/**
 * Batch 2026-09-02 — QNU (Trường Đại học Quy Nhơn) 2025: điểm chuẩn 10/52 ngành (khối sư phạm/
 * giáo dục, không nhân hệ số), nguồn trangedu.com (`sources.ts`), cross-check Sforum/CellphoneS.
 * Method[0] = baseline (không cần chọn ngành, dùng dải điểm chuẩn thấp nhất/cao nhất trong 10
 * ngành đã mô hình hoá). Method[1] = nhánh exact theo TỪNG NGÀNH + tổ hợp cụ thể
 * (`exactCalculator: true`, KHÔNG gắn `knowledgeGaps` — cùng tiền lệ `schools/hpmu`,
 * `schools/vnueb`, `schools/vnued`, `schools/tvu`) — các gap còn lại (`knowledgeGaps.ts`: giá trị
 * điểm ưu tiên judgment call, ngành có nhân hệ số chưa mô hình hoá, tổ hợp riêng của trường chưa
 * xác minh, nguồn gốc ảnh không đọc trực tiếp được) đều KHÔNG chặn exact cho đúng phạm vi 10 ngành
 * đã mô hình hoá.
 */
export const qnuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'qnu-thpt-exam-2025',
    schoolId: 'qnu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2025',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: qnuKnowledgeGaps,
  },
  {
    id: 'qnu-thpt-exam-exact-2025',
    schoolId: 'qnu',
    name: 'Xét điểm thi TN THPT — Điểm chuẩn theo ngành (khối sư phạm/giáo dục)',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 10 ngành khối sư phạm/giáo dục của QNU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
