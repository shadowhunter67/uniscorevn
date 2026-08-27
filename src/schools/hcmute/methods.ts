import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hcmuteKnowledgeGaps } from './knowledgeGaps';

/** HCMUTE 2026 — Phương thức tuyển sinh kết hợp (mã 500).
 *
 * `hcmute-combined-2026` (bên dưới) là mô tả ĐẦY ĐỦ phương thức: eligibility (ngưỡng chung 15/30),
 * điểm học lực HLy.1/HLy.2/HLy.3/HLy.max (hệ số a=b=0,8 verified 07/7/2026), điểm cộng ĐXTCN, điểm
 * ưu tiên + công thức giảm — verified từ văn bản ký. VẪN `exactCalculator: false` vì còn 3 blocker
 * chỉ ảnh hưởng MỘT SỐ nhánh: (1) ĐXTT (Bảng 3) chặn HLy.2 cho thí sinh khai học bạ, (2) ĐXTCN
 * mục 1/4-7 (thành tích theo ngành đặc thù) chưa implement, (3) ĐHL "max qua mọi tổ hợp" — xem
 * `knowledgeGaps.ts`.
 *
 * `hcmute-thpt-exam-standard-2026` (thêm 2026-08-27, cùng pattern NCTU/USSH "exact cho supported
 * scope") — tách riêng nhánh HẸP không dính blocker nào: thí sinh xét bằng ĐIỂM THI TN THPT ĐỘC
 * LẬP (không khai học bạ/ĐGNL), nhóm ngành 'standard' (không phải Ngôn ngữ Anh/Kiến trúc/Thiết kế,
 * không phải SP tiếng Anh/SP công nghệ/Luật có ngưỡng riêng). Trong phạm vi này ĐHL = HLy.1 (công
 * thức có worked example chính thức Phụ lục 4), ĐXTCN chỉ còn 2 mục áp dụng chung mọi ngành (đã
 * implement), ưu tiên verified → ĐXT = HLy.1 + ĐXTCN + ĐUT tính được đầy đủ. KHÔNG gắn
 * `knowledgeGaps` (auditMethods coi exactCalculator:true + knowledgeGaps non-empty là lỗi
 * EXACT_METHOD_HAS_UNRESOLVED_GAPS). */
export const hcmuteAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hcmute-combined-2026',
    schoolId: 'hcmute',
    name: 'Phương thức tuyển sinh kết hợp',
    year: 2026,
    applicantTypes: ['Thí sinh xét theo điểm thi TN THPT 2026 độc lập (chưa dùng học bạ/ĐGNL)'],
    capabilities: {
      eligibility: true,
      scoreConversion: true,
      bonus: true,
      priority: true,
      exactCalculator: false,
    },
    knowledgeGaps: hcmuteKnowledgeGaps,
  },
  {
    id: 'hcmute-thpt-exam-standard-2026',
    schoolId: 'hcmute',
    name: 'Xét điểm thi TN THPT 2026 độc lập (nhóm ngành thường, không thành tích ĐXTCN đặc thù)',
    year: 2026,
    applicantTypes: [
      'Thí sinh xét bằng điểm thi TN THPT 2026 độc lập, nhóm ngành thường (không Ngôn ngữ Anh/Kiến trúc/Thiết kế, không SP tiếng Anh/SP công nghệ/Luật), không khai học bạ/ĐGNL và không có thành tích ĐXTCN mục 1/4-7',
    ],
    capabilities: {
      eligibility: true,
      scoreConversion: false,
      bonus: true,
      priority: true,
      exactCalculator: true,
    },
  },
];
