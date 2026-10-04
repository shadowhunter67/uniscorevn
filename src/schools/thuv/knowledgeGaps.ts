import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const thuvKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'thuv-other-methods-not-modeled',
    label:
      'THUV còn 3 phương thức khác (xét tuyển thẳng PT1, học bạ PT3 ≥19,5, ĐGNL HSA/SPT PT4 ≥75/16) chưa được chuẩn hoá vào runtime — chỉ PT2 (thi TN THPT) có nhánh exact.',
    status: 'official-but-unparsed',
    sourceId: 'thuv-admission-info-2026',
    scoreAffecting: true,
    knownData: ['Học bạ (PT3): ≥19,5/30 (điều kiện học lực lớp 12 khá trở lên)', 'ĐGNL HSA (PT4.1): ≥75/150', 'ĐGNL SPT (PT4.2): ≥16/30'],
    impact: 'UniscoreVN chỉ kiểm tra/tính được cho Phương thức 2 (thi TN THPT).',
  },
  {
    id: 'thuv-jlpt-bonus-not-modeled',
    label:
      'Điểm khuyến khích (KK) cho chứng chỉ JLPT (N5 +0,5/N4 +1/N3-N2-N1 +1,5, mục 5.b) chưa model trong ApplicantProfile — nhánh exact chỉ dành cho thí sinh KHÔNG có chứng chỉ JLPT (KK=0).',
    status: 'incomplete',
    sourceId: 'thuv-admission-info-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'thuv-combination-scope-not-full',
    label:
      'Chỉ model 7 tổ hợp CHUNG cho cả 4 ngành (A00/A01/A02/B00/B08/D07 và D23 Toán-Hóa-Tiếng Nhật, thêm 2026-10-04). Các tổ hợp riêng từng ngành chưa được model vì module không chọn ngành: D28 (Điều dưỡng, Kỹ thuật hình ảnh, PHCN) và D33 (Điều dưỡng, xét nghiệm, PHCN) vắng ở 1 ngành, C08/X10/X14/X26 chỉ áp dụng 1-2 ngành.',
    status: 'official-but-unparsed',
    sourceId: 'thuv-admission-info-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
];
