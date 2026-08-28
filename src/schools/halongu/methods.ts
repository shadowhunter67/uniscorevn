import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { halonguKnowledgeGaps } from './knowledgeGaps';

export const halonguAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'halongu-thpt-exam-2026',
    schoolId: 'halongu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (nhóm ngành ngoài sư phạm)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, nhóm ngành ngoài sư phạm'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: halonguKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), Phương thức 1 (mã 100, thi TN THPT), nhóm ngành
   * NGOÀI sư phạm. Trích nguyên văn trang "Cách tính điểm xét tuyển" chính thức
   * (`sources.ts:halongu-formula-2026`): ĐXT = [M1+M2+M3] + ĐƯT (nếu có), không nhân hệ số. Ngưỡng
   * ≥15,00/30 ĐÃ GỒM điểm ưu tiên (`sources.ts:halongu-quality-threshold-2026`) → so ĐXT với
   * ngưỡng. Điểm ưu tiên là judgment call (Điều 7 TT 06/2026, `priority.ts`) — trường không công
   * bố bảng riêng. Nhóm sư phạm (kể cả Sư phạm Âm nhạc) ngoài phạm vi, xem
   * `halongu-pedagogy-scope-excluded`. KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'halongu-thpt-exam-exact-2026',
    schoolId: 'halongu',
    name: 'Xét kết quả thi TN THPT (PT1, mã 100) — Điểm xét tuyển (nhóm ngành ngoài sư phạm)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một ngành HALONGU thuộc nhóm ngoài sư phạm'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
