import type { CompetitivenessAssessment } from '../evaluation/competitiveness/competitiveness';
import { CONFIDENCE_LABELS } from '../evaluation/competitiveness/competitivenessConfidence';
import { COMPETITIVENESS_BAND_LABELS, INSUFFICIENT_DATA_LABEL } from '../evaluation/competitiveness/competitivenessLanguage';

const BAND_MARK: Record<string, string> = {
  safer: '✓',
  competitive: '✓',
  borderline: '!',
  hard: '!',
  low: '○',
  'insufficient-data': '○',
};

/** 1 dòng tóm tắt mức độ cạnh tranh — text + ký hiệu, không chỉ dùng màu. Component thuần trình
 * bày, nhận `CompetitivenessAssessment` đã tính sẵn từ `evaluation/competitiveness`. */
export function CompetitivenessRow({ assessment }: { assessment: CompetitivenessAssessment }) {
  if (assessment.band === 'insufficient-data') {
    return (
      <p className="flex items-center gap-1.5 text-sm text-muted">
        <span aria-hidden="true">{BAND_MARK['insufficient-data']}</span>
        {INSUFFICIENT_DATA_LABEL}
      </p>
    );
  }

  return (
    <p className="flex items-center gap-1.5 text-sm text-ink-soft">
      <span aria-hidden="true">{BAND_MARK[assessment.band]}</span>
      <span className="font-medium text-ink">{COMPETITIVENESS_BAND_LABELS[assessment.band]}</span>
      <span className="text-muted">· Độ tin cậy: {CONFIDENCE_LABELS[assessment.confidence]}</span>
    </p>
  );
}
