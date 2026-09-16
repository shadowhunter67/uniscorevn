import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { bafuKnowledgeGaps } from './knowledgeGaps';

export const bafuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'bafu-thpt-exam-2026',
    schoolId: 'bafu',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026 (Phương thức 2)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: bafuKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), Phương thức 2. Trích nguyên văn "Thông tin tuyển sinh
   * năm 2026": "ĐXT = ĐM1 + ĐM2 + ĐM3 + ĐƯT". Ngưỡng đầu vào (15,0/30) ghi RÕ "chưa gồm điểm ưu
   * tiên" → so RAW với ngưỡng, ĐXT (đã gồm ưu tiên) vẫn trả về `score`. Phạm vi tổ hợp: tập chung
   * nằm trong taxonomy hiện có, không ràng buộc theo ngành cụ thể (ngưỡng đồng nhất toàn trường).
   * KHÔNG gắn `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'bafu-thpt-exam-exact-2026',
    schoolId: 'bafu',
    name: 'Xét kết quả thi TN THPT (Phương thức 2) — Điểm xét tuyển',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 20 ngành BAFU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
