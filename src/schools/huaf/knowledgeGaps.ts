import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const huafKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'huaf-program-subject-combination-not-runtime-mapped',
    label: 'HUAF 2026 subject-combination scope per program (19 ngành) is normalized in research but not yet mapped for per-program runtime validation.',
    status: 'incomplete',
    sourceId: 'huaf-official-admission-info-2026',
    scoreAffecting: false,
    impact: 'The evaluator can check the common THPT co-requisite threshold, but cannot confirm the selected subject combination is valid for a specific HUAF program.',
  },
  {
    id: 'huaf-foreign-language-conversion-not-normalized',
    label: 'HUAF combined methods (exam/transcript + foreign-language certificate) reference a Hue University conversion table linked but not normalized into runtime data.',
    status: 'official-but-unparsed',
    sourceId: 'huaf-official-admission-info-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN cannot compute admission scores for HUAF combined-certificate methods; only the transcript method threshold check is executable.',
  },
  {
    id: 'huaf-bonus-priority-not-modeled',
    label: 'HUAF bonus (up to 3/30) and priority points are documented (achievement/merit/certificate incentives) but not modeled in runtime.',
    status: 'incomplete',
    sourceId: 'huaf-official-admission-info-2026',
    scoreAffecting: true,
    impact: 'Eligibility checks compare raw available scores to the published minimum threshold without adding bonus or priority adjustments.',
  },
];
