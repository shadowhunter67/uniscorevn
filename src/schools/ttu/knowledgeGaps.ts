import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const ttuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ttu-program-threshold-table-not-imported',
    label:
      'TTU 2026 công bố ngưỡng THPT theo 4 nhóm ngành (đa số ngành, Điều dưỡng/KTXN, Luật, Y khoa); chưa chọn được ngành cụ thể để áp dụng dung nhom.',
    status: 'official-but-unparsed',
    sourceId: 'ttu-floor-score-2026',
    scoreAffecting: true,
    knownData: [
      'Đa số ngành (kỹ thuật, công nghệ, kinh tế, ngon ngu): >= 15,0/30',
      'Điều dưỡng, Kỹ thuật Xét nghiệm Y học: >= 18,0/30',
      'Luat: >= 20,0/30',
      'Y khoa: >= 22,0/30',
    ],
    impact: 'Runtime chi loai được hồ sơ dưới 15/30 va xác nhận dat tren 22/30 (moi ngành); giữa 15/30 va 22/30 cần chọn ngành để kết luận chính xác.',
  },
  {
    id: 'ttu-formula-and-groups-resolved',
    label:
      'Batch 2026-08-28: doc lai truc tiep thông báo chính thức qua chrome-devtools, xác nhận 3 nhom ngưỡng (standard 15 / nursingMedtech 18 / law 20) không có điều kiện phu → mo nhanh exact `ttu-thpt-exam-exact-2026`. Ngành Y khoa (22, điều kiện kep tổ hợp A00/D07 >=22 VA Sinh học bạp TB >=6,5) van ngoai phạm vi (cau truc khác các nhom con lai).',
    status: 'official-but-unparsed',
    sourceId: 'ttu-floor-score-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'ttu-other-methods-not-modeled',
    label:
      'TTU 2026 con các phương thức khác ngoai thi TN THPT (xét tuyển thẳng/ưu tiên theo quy dinh Bộ GD&ĐT, va các phương thức khác nêu co); chi phương thức thi TN THPT được mô hình hóa.',
    status: 'official-but-unparsed',
    sourceId: 'ttu-floor-score-2026',
  },
];
