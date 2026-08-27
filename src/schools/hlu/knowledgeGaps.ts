import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hluKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hlu-program-mapping-not-imported',
    label:
      'Batch 2026-08-27: đã nhập 5 mã ngành (Luật, Luật Kinh tế, Luật TMQT, Ngôn ngữ Anh, Luật Đắk Lắk) + điểm trúng tuyển 2026 theo tổ hợp gốc D01 (`thresholds.ts`) + bảng độ chênh tổ hợp (Thông báo 1029) → mở nhánh exact `hlu-thpt-exam-exact-2026` cho tổ hợp D01/A00/A01/C00. Còn ngoài phạm vi: tổ hợp ngoại ngữ D02-D06 (Nga/Pháp/Trung/Đức/Nhật, không có trong taxonomy môn) và phương thức xét học bạ (quy đổi piecewise theo Thông báo 1029 mục 2).',
    status: 'official-but-unparsed',
    sourceId: 'hlu-cutoff-2026',
    scoreAffecting: false,
    knownData: ['Ngưỡng chung: 20,0/30 (KV3, tổng thô 3 môn, không quy đổi tổ hợp)'],
    impact: 'method-out-of-scope',
  },
  {
    id: 'hlu-transcript-method-conversion-not-modeled',
    label:
      'Phương thức xét kết quả học tập bậc THPT (học bạ): Thông báo 1029 mục 2 công bố công thức quy đổi tương đương piecewise linear (y = a + (x−m)/(n−m)·(b−a)) giữa 3 khoảng điểm THPT ↔ học bạ, nhưng chưa model — nhánh exact hiện chỉ phủ phương thức thi TN THPT.',
    status: 'official-but-unparsed',
    sourceId: 'hlu-combo-delta-2026',
    scoreAffecting: true,
    impact: 'method-out-of-scope',
  },
];
