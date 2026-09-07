import type { CompetitivenessAssessment } from '../evaluation/competitiveness/competitiveness';
import { CONFIDENCE_LABELS } from '../evaluation/competitiveness/competitivenessConfidence';
import { COMPETITIVENESS_DISCLAIMER } from '../evaluation/competitiveness/competitivenessLanguage';
import { Disclosure } from './Disclosure';

/** "Vì sao đánh giá như vậy?" — expandable, hiện điểm/mốc điểm chuẩn/chênh lệch/độ tin cậy. Ẩn
 * hẳn khi `band === 'insufficient-data'` (không có gì để giải thích). */
export function CompetitivenessExplanation({ assessment }: { assessment: CompetitivenessAssessment }) {
  if (assessment.band === 'insufficient-data') return null;

  return (
    <Disclosure summary="Vì sao có đánh giá này?" className="mt-2">
      <div className="space-y-1.5 text-[13px] text-ink-soft">
        {assessment.referenceYear !== undefined && (
          <p>
            Điểm chuẩn tham chiếu: năm {assessment.referenceYear}
            {assessment.referenceType === 'historical' ? ' (mốc lịch sử gần nhất, năm nay chưa công bố)' : ''}.
          </p>
        )}
        {assessment.rawMargin !== undefined && assessment.scale !== undefined && (
          <p>
            Chênh lệch so với điểm chuẩn: {assessment.rawMargin >= 0 ? '+' : ''}
            {assessment.rawMargin.toFixed(2)}/{assessment.scale}.
          </p>
        )}
        <p>Độ tin cậy đánh giá: {CONFIDENCE_LABELS[assessment.confidence]}.</p>
        {assessment.source?.url && (
          <p>
            Nguồn:{' '}
            <a href={assessment.source.url} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-2 hover:underline">
              {assessment.source.label ?? 'Xem nguồn'}
            </a>
          </p>
        )}
        <p className="text-muted">{COMPETITIVENESS_DISCLAIMER}</p>
      </div>
    </Disclosure>
  );
}
