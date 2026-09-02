import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { qnamuKnowledgeGaps } from './knowledgeGaps';

/**
 * Batch 2026-09-02 — QNamU (Trường Đại học Quảng Nam) 2025: điểm chuẩn 8 ngành (loại Giáo dục Mầm
 * non — tổ hợp năng khiếu chưa xác minh; loại 5 ngành hiển thị mức nhận hồ sơ "14" không phải điểm
 * trúng tuyển thật), TOÀN BỘ không nhân hệ số, nguồn Trangedu.com + Sforum/CellphoneS
 * (`sources.ts`), công thức xác nhận qua Vietjack.com (khớp tuyệt đối khung quốc gia). Method[0] =
 * baseline (không cần chọn ngành, dùng dải điểm chuẩn thấp nhất/cao nhất trong 8 ngành đã mô hình
 * hoá). Method[1] = nhánh exact theo TỪNG NGÀNH + TỪNG TỔ HỢP cụ thể (`exactCalculator: true`,
 * KHÔNG gắn `knowledgeGaps` — cùng tiền lệ `schools/qnu`, `schools/qbu`) — các gap còn lại
 * (`knowledgeGaps.ts`: giá trị điểm ưu tiên cơ bản judgment call, ngành mức nhận hồ sơ/năng khiếu
 * chưa mô hình hoá, tổ hợp riêng của trường chưa xác minh, không tìm được nguồn text chính thức)
 * đều KHÔNG chặn exact cho đúng phạm vi 8 ngành x tổ hợp đã mô hình hoá.
 */
export const qnamuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'qnamu-thpt-exam-2025',
    schoolId: 'qnamu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2025',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: qnamuKnowledgeGaps,
  },
  {
    id: 'qnamu-thpt-exam-exact-2025',
    schoolId: 'qnamu',
    name: 'Xét điểm thi TN THPT — Điểm chuẩn theo ngành và tổ hợp',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 8 ngành sư phạm/xã hội của QNamU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
