import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnuulisKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnuulis-non-english-language-combinations-not-modeled',
    label: 'VNU-ULIS also admits via combinations using French, Chinese, Japanese, German, Russian, or Korean as the coefficient-2 language subject; the shared SubjectId taxonomy only models English, so only English-language combinations are executable.',
    status: 'official-but-unparsed',
    sourceId: 'vnuulis-admission-notice-2026',
  },
  {
    id: 'vnuulis-hsa-route-not-modeled',
    label: 'VNU-ULIS accepts VNU-Hanoi HSA (Danh gia nang luc) aptitude-test scores converted to the /30 scale, at the same thresholds as the THPT route; the shared applicant profile has no HSA score field, so this route is not executable.',
    status: 'incomplete',
    sourceId: 'vnuulis-threshold-notice-2026',
  },
  {
    id: 'vnuulis-certificate-combined-route-not-modeled',
    label: 'VNU-ULIS also allows combining international language certificates (IELTS/TOEFL/etc.) with graduation-exam results for admission; the certificate-conversion appendix is not normalized into this runtime yet.',
    status: 'official-but-unparsed',
    sourceId: 'vnuulis-admission-notice-2026',
  },
  {
    id: 'vnuulis-program-scope-not-modeled',
    label: 'Program/major-level scope (which programs are "regular" vs "international-partnership") is not imported; the caller must select the correct track manually.',
    status: 'incomplete',
    sourceId: 'vnuulis-threshold-notice-2026',
  },
];
