import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { utcKnowledgeGaps } from './knowledgeGaps';

export const utcAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'utc-thpt-exam-2026',
    schoolId: 'utc',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: utcKnowledgeGaps,
  },
  {
    // Nhánh HẸP tính đủ Tổng điểm xét tuyển (exact), phương thức xét kết quả thi TN THPT. Mọi quy
    // tắc ảnh hưởng điểm trích NGUYÊN VĂN từ nguồn chính thức (`sources.ts`):
    //  - Công thức: các ngành `(Toán×2 + 2 môn còn lại)×3/4`; ngành Ngôn ngữ Anh tổng thô 3 môn
    //  - Điểm cộng: IELTS 5.0-7.0+ (0,5-1,5) — `bonus.ts`
    //  - Điểm ưu tiên: bảng KV/ĐT + công thức giảm theo Điều 7 TT 08/2022 (trang UTC trỏ "quy chế
    //    hiện hành", không in bảng) — cùng judgment call như `schools/vnuulis`/`schools/vnulaw`
    //  - Ngưỡng ĐBCL theo ngành: bảng công bố 07/7/2026 (`thresholds.ts`)
    // Phạm vi: caller phải chọn `programId` khớp `thresholds.ts` và tổ hợp có môn Toán; thí sinh
    // khai giải HSG cấp tỉnh (không có field trong hồ sơ dùng chung) => ngoài phạm vi (partial).
    // KHÔNG gắn knowledgeGaps (auditMethods coi exact + gaps là lỗi).
    id: 'utc-thpt-exam-exact-2026',
    schoolId: 'utc',
    name: 'Xét kết quả thi TN THPT — Tổng điểm xét tuyển (theo ngành đã công bố ngưỡng, tổ hợp có môn Toán)',
    year: 2026,
    applicantTypes: [
      'Thí sinh xét bằng kết quả thi TN THPT 2026 vào một ngành UTC đã công bố ngưỡng, tổ hợp có môn Toán, không có giải HSG cấp tỉnh (chỉ điểm cộng IELTS nếu có)',
    ],
    capabilities: { eligibility: true, scoreConversion: false, bonus: true, priority: true, exactCalculator: true },
  },
];
