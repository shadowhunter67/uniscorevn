import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * Batch 2026-08-26 — đọc trực tiếp Đề án tuyển sinh 2026 (PDF chính thức, Số 01/2026/DA-GDU): điểm
 * học lực là tổng thô 3 môn (không hệ số, mục 5.1 "không áp dụng thêm tiêu chí phụ") + điểm ưu tiên
 * tự công bố (mục 7) → `exactCalculator: true` cho nhóm ngành ngoài Sức khỏe/Luật (`name` đã nêu rõ
 * phạm vi). KHÔNG gắn `knowledgeGaps` (auditMethods() coi exactCalculator:true + knowledgeGaps
 * non-empty là lỗi EXACT_METHOD_HAS_UNRESOLVED_GAPS) — các gap còn lại của GDU (`knowledgeGaps.ts`:
 * khối Sức khỏe/Luật theo ngưỡng riêng Bộ GDĐT, phương thức học bạ/ĐGNL/kết hợp chưa mô hình hoá)
 * đều KHÔNG chặn exact cho đúng phạm vi phương thức này.
 */
export const gduAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'gdu-thpt-exam-2026',
    schoolId: 'gdu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (nhóm ngành ngoài Sức khỏe/Luật)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, nhóm ngành IT/truyền thông/quản trị/kinh doanh/tài chính-ngân hàng/khoa học xã hội/ngôn ngữ quốc tế'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
