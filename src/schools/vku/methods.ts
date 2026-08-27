import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vkuKnowledgeGaps } from './knowledgeGaps';

export const vkuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vku-thpt-exam-2026',
    schoolId: 'vku',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vkuKnowledgeGaps,
  },
  {
    // Nhánh HẸP tính đủ Điểm xét tuyển (exact) cho Phương thức 2 - xét tuyển kết hợp. Mọi quy tắc
    // ảnh hưởng điểm được trích NGUYÊN VĂN từ PDF "Thông tin tuyển sinh năm 2026 (cập nhật
    // 09/4/2026)" (`sources.ts:vku-admission-info-2026`, đã tải & đọc trực tiếp):
    //  - Công thức: học bạ×60% + thi THPT×40% + điểm cộng + điểm ưu tiên (Mục 2.2.c) — không hệ số môn
    //  - Điểm cộng: bảng chứng chỉ IELTS/SAT/ACT (Phụ lục II), trần 3,0
    //  - Điểm ưu tiên: bảng KV/ĐT theo TT 06/2026 + công thức giảm nguyên văn (Mục 5.2.b)
    //  - "không có điểm khuyến khích/thưởng" — KHÔNG áp dụng: VKU CÓ điểm cộng, nên nhánh exact chỉ
    //    dành cho thí sinh không khai thành tích ngoài IELTS/SAT/ACT.
    // CAVEAT (xem `knowledgeGaps.ts:vku-combined-threshold-not-published`): ngưỡng đảm bảo chất
    // lượng đầu vào PT2 chưa được VKU công bố ("Trường sẽ công bố theo kế hoạch của Bộ GDĐT", Mục
    // 3.1) → evaluator trả `eligibility.status = 'unknown'` dù `score` là exact.
    // KHÔNG gắn knowledgeGaps ở descriptor này (auditMethods coi exact + gaps là lỗi).
    id: 'vku-combined-exact-2026',
    schoolId: 'vku',
    name: 'Xét tuyển kết hợp (học bạ 60% + thi TN THPT 40%), phạm vi không thành tích ngoài chứng chỉ',
    year: 2026,
    applicantTypes: [
      'Thí sinh xét tuyển kết hợp VKU 2026 có đủ điểm học bạ 3 năm + điểm thi TN THPT theo 1 tổ hợp, không có điểm thưởng/xét thưởng thành tích (chỉ điểm cộng chứng chỉ IELTS/SAT/ACT, nếu có)',
    ],
    capabilities: { eligibility: false, scoreConversion: true, bonus: true, priority: true, exactCalculator: true },
  },
];
