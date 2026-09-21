import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { davKnowledgeGaps } from './knowledgeGaps';

export type DavMethodId =
  | 'dav-priority-2026'
  | 'dav-transcript-certificate-2026'
  | 'dav-sat-act-certificate-2026'
  | 'dav-thpt-exam-2026'
  | 'dav-thpt-exam-exact-2026';

export const davAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dav-priority-2026',
    schoolId: 'dav',
    name: 'Direct and priority admission',
    year: 2026,
    applicantTypes: ['Candidates under MOET direct/priority admission categories'],
    capabilities: { eligibility: false, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: davKnowledgeGaps,
  },
  {
    id: 'dav-transcript-certificate-2026',
    schoolId: 'dav',
    name: 'Transcript plus international language certificate threshold eligibility',
    year: 2026,
    applicantTypes: ['Candidates using academic record and international language certificate'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: davKnowledgeGaps,
  },
  {
    id: 'dav-sat-act-certificate-2026',
    schoolId: 'dav',
    name: 'SAT/ACT plus international language certificate threshold eligibility',
    year: 2026,
    applicantTypes: ['Candidates using SAT/ACT and international language certificate'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: davKnowledgeGaps,
  },
  {
    id: 'dav-thpt-exam-2026',
    schoolId: 'dav',
    name: 'THPT exam threshold eligibility',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: davKnowledgeGaps,
  },
  /**
   * Nhánh HẸP exact — PT4 (mã 100, thi TN THPT 2026), 9 ngành KHÔNG phải Luật, 9 tổ hợp mô hình hoá
   * được (A00/A01/C00/D01/D07/D09/D10/D14/D15). Điểm xét = tổng 3 môn (môn ngoại ngữ tự chọn phương án
   * có lợi hơn giữa điểm thi và điểm quy đổi IELTS/TOEFL, đúng như PDF nói hệ thống tự đối chiếu) + điểm
   * ưu tiên giảm dần [(30 − tổng)/7,5]×mức khi tổng ≥ 22,5; so ngưỡng 22,0 (C00: 23,0) — thông báo
   * ngưỡng 10/07/2026 ghi rõ ngưỡng "đã bao gồm điểm cộng xét thưởng và điểm ưu tiên". Ngoài phạm vi:
   * ngành Luật (điều kiện riêng theo khu vực + Toán/Văn), tổ hợp ngoại ngữ Pháp/Trung/Nhật/Hàn, điểm
   * xét thưởng học sinh giỏi (Bảng 5, chưa có input trong hồ sơ), chứng chỉ ngoại ngữ ngoài Anh. KHÔNG
   * gắn `knowledgeGaps` ở descriptor này; các giới hạn trên hiện dưới dạng missingRequirements.
   */
  {
    id: 'dav-thpt-exam-exact-2026',
    schoolId: 'dav',
    name: 'THPT exam admission score and threshold (non-law programs, modeled combinations)',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores, without DAV achievement bonus'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: true, exactCalculator: true },
  },
];
