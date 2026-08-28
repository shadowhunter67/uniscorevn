import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vwaKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vwa-program-mapping-not-imported',
    label:
      'Batch 2026-08-28: đọc trực tiếp Thông báo 96/TB-HVPNVN (bảng đầy đủ mã ngành + tổ hợp) qua chrome-devtools + OCR và nhập 17 mã xét tuyển vào `thresholds.ts` → mở nhánh exact `vwa-thpt-exam-exact-2026` (15/17 mã, trừ 2 mã Chất lượng cao cần chứng chỉ ngoại ngữ). Phương thức eligibility rộng (`vwa-thpt-exam-2026`) vẫn dùng nhóm 3 mức (19/18/16) do người dùng tự chọn.',
    status: 'official-but-unparsed',
    sourceId: 'vwa-quality-threshold-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'vwa-law-not-modeled',
    label: 'Ngành Luật và Kinh tế Luật không có trong bảng ngưỡng 96/TB-HVPNVN — thông báo ghi "theo hướng dẫn của Bộ GDĐT", chưa xác định được số cụ thể.',
    status: 'incomplete',
    sourceId: 'vwa-quality-threshold-2026',
    scoreAffecting: true,
    impact: 'Không kiểm tra được eligibility cho ngành Luật/Kinh tế Luật tại VWA.',
  },
  {
    id: 'vwa-vact-methods-not-modeled',
    label: 'Ngưỡng theo kỳ thi ĐGNL ĐHQG Hà Nội (HSA) và ĐGNL ĐH Sư phạm Hà Nội (SPT) đã công bố nhưng chưa model do khác thang điểm với ApplicantProfile hiện tại.',
    status: 'incomplete',
    sourceId: 'vwa-quality-threshold-2026',
    scoreAffecting: true,
    impact: 'Thí sinh xét tuyển bằng điểm ĐGNL chưa kiểm tra được ở VWA trên UniScoreVN.',
  },
  {
    id: 'vwa-priority-bonus-not-modeled',
    label: 'Điểm ưu tiên khu vực/đối tượng theo Quy chế tuyển sinh của Bộ GDĐT chưa được cộng vào tổng điểm trước khi so với ngưỡng.',
    status: 'incomplete',
    sourceId: 'vwa-quality-threshold-2026',
    scoreAffecting: true,
    impact: 'Thí sinh thuộc diện ưu tiên khu vực/đối tượng cần tự cộng điểm ưu tiên của mình trước khi so sánh với ngưỡng đã công bố.',
  },
];
