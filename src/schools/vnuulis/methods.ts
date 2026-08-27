import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vnuulisKnowledgeGaps } from './knowledgeGaps';

export type VnuulisMethodId =
  | 'vnuulis-thpt-exam-2026'
  | 'vnuulis-thpt-exam-exact-2026'
  | 'vnuulis-hsa-2026'
  | 'vnuulis-transcript-2026';

export const vnuulisAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vnuulis-thpt-exam-2026',
    schoolId: 'vnuulis',
    name: 'THPT exam threshold eligibility (language subject coefficient 2)',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vnuulisKnowledgeGaps,
  },
  {
    // Nhánh HẸP tính đủ Điểm xét tuyển (exact). Nguồn: thông báo tuyển sinh chính thức
    // https://ulis.vnu.edu.vn/tbtsdh26/ — công thức quy đổi /40→/30, bảng điểm ưu tiên KV/ĐT, trần
    // 3,0; và "không có điểm khuyến khích hoặc điểm thưởng riêng cho phương thức xét tuyển bằng kết
    // quả thi tốt nghiệp THPT" (trích nguyên văn) → ĐXT = điểm quy đổi + ĐUT, không còn ẩn số.
    // KHÔNG gắn knowledgeGaps (auditMethods coi exact + gaps là lỗi). Ngoài phạm vi (giữ partial ở
    // descriptor rộng): tổ hợp ngoại ngữ khác tiếng Anh, route HSA, route kết hợp chứng chỉ.
    id: 'vnuulis-thpt-exam-exact-2026',
    schoolId: 'vnuulis',
    name: 'THPT exam admission score (English-language combination, no certificate substitution)',
    year: 2026,
    applicantTypes: [
      'Candidates using 2026 THPT exam scores with an English-language combination (English as the coefficient-2 subject), not substituting a language certificate',
    ],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: true, exactCalculator: true },
  },
  {
    id: 'vnuulis-hsa-2026',
    schoolId: 'vnuulis',
    name: 'VNU HSA aptitude-test threshold eligibility',
    year: 2026,
    applicantTypes: ['Candidates using VNU-Hanoi HSA aptitude-test scores'],
    capabilities: { eligibility: false, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vnuulisKnowledgeGaps,
  },
  {
    id: 'vnuulis-transcript-2026',
    schoolId: 'vnuulis',
    name: 'Transcript-based threshold eligibility (international-partnership programs only)',
    year: 2026,
    applicantTypes: ['Candidates applying to international-partnership programs using academic transcripts'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vnuulisKnowledgeGaps,
  },
];
