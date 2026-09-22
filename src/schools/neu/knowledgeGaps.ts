import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const neuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'neu-detailed-equivalence-tool-not-modeled',
    label:
      'NEU Notice 1613 publishes equivalent score bands and points candidates to the AI tool for detailed conversion; UniscoreVN has not modeled a deterministic within-band conversion function.',
    status: 'incomplete',
    impact: 'The module reports the official equivalence band only, not a single exact converted final score.',
    sourceId: '',
  },
  {
    id: 'neu-program-catalog-not-imported',
    label:
      '42/88 mã tuyển sinh CHUẨN (PTXT5) đã import (xem `thresholds.ts`); 46 mã còn lại thuộc chương trình tiên tiến (TT1/TT2), chất lượng cao (CLC1-3), POHE, hoặc xét tuyển kết hợp riêng (EPxx) — dùng phương thức/tổ hợp khác, chưa import.',
    status: 'incomplete',
    impact: 'method-out-of-scope',
    sourceId: 'neu-cutoff-2026',
  },
];


