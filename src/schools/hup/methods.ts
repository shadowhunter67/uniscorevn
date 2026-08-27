import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hupKnowledgeGaps } from './knowledgeGaps';

export const hupAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hup-thpt-exam-2026',
    schoolId: 'hup',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (PT4)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hupKnowledgeGaps,
  },
  {
    // Nhánh HẸP tính đủ Điểm xét tuyển (exact), Phương thức 4 (xét thi TN THPT). Trích NGUYÊN VĂN
    // từ nguồn chính thức (`sources.ts`):
    //  - Công thức: "ĐXT = M1 + M2 + M3 + ĐKK (nếu có) + ĐƯT quy đổi (nếu có)" — tổng thô 3 môn,
    //    không hệ số (`calculator.ts`)
    //  - ĐKK: bảng IELTS 5.5-8.0+ (0,25-1,50), trần 3,0 (`bonus.ts`)
    //  - ĐƯT: bảng KV/ĐT + công thức giảm theo Điều 7 TT 08/2022 (trang HUP ghi "quy đổi theo quy
    //    định Bộ GDĐT", không in bảng) — judgment call như `schools/vnuulis`/`schools/utc`
    //  - Ngưỡng PT4 theo ngành: Dược học 22 / Hoá dược 20 / Hoá học 19 / CNSH 19 (`thresholds.ts`)
    // Phạm vi: caller chọn programId khớp `thresholds.ts`; thí sinh khai giải HSG (không có field
    // trong hồ sơ dùng chung) => ngoài phạm vi (partial). KHÔNG gắn knowledgeGaps.
    id: 'hup-thpt-exam-exact-2026',
    schoolId: 'hup',
    name: 'Xét kết quả thi TN THPT (PT4) — Điểm xét tuyển, phạm vi không có giải HSG',
    year: 2026,
    applicantTypes: [
      'Thí sinh xét PT4 (thi TN THPT 2026) vào 1 trong 4 ngành HUP, không có giải học sinh giỏi cấp tỉnh/quốc gia (chỉ điểm cộng IELTS nếu có)',
    ],
    capabilities: { eligibility: true, scoreConversion: false, bonus: true, priority: true, exactCalculator: true },
  },
];
