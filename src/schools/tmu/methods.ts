import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * Batch 2026-09-02 — TMU (Đại học Thương mại) 2025: thông báo điểm sàn chính thức (đăng lại nguyên
 * văn trên Cổng TTĐT Chính phủ, `sources.ts:tmu-threshold-2025`) xác nhận NGƯỠNG DUY NHẤT 20/30
 * cho TOÀN BỘ ngành/tổ hợp, đã gồm điểm ưu tiên khu vực/đối tượng — không cần chọn ngành cụ thể
 * (khác HDIU/HOU/CMCU có bảng ngưỡng theo ngành). `exactCalculator: true` — KHÔNG gắn
 * `knowledgeGaps` (auditMethods() coi exactCalculator:true + knowledgeGaps non-empty là lỗi
 * EXACT_METHOD_HAS_UNRESOLVED_GAPS, cùng tiền lệ `schools/gdu`) — các gap còn lại của TMU
 * (`knowledgeGaps.ts`: 3/10 tổ hợp loại trừ, giá trị điểm ưu tiên judgment call, quy đổi chứng chỉ
 * ngoại ngữ chưa mô hình hoá) đều KHÔNG chặn exact cho đúng phạm vi phương thức này.
 */
export const tmuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tmu-thpt-exam-exact-2025',
    schoolId: 'tmu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2025',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 7/10 tổ hợp đã mô hình hoá của TMU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
