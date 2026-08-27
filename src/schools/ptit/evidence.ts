import type { SourcedRule } from '../../core/evidence';
import { PTIT_DOMESTIC_EXAM_THRESHOLDS, type PtitDomesticExam } from './eligibility';

export const ptitDomesticExamThresholdEvidence = {
  value: PTIT_DOMESTIC_EXAM_THRESHOLDS,
  evidence: [
    {
      sourceId: 'ptit-admission-methods-2026',
      location: 'Section B.III lists domestic DGNL/DGTD thresholds: TSA >= 50, HSA >= 75, V-ACT >= 600, SPT >= 15.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-21',
    },
  ],
} satisfies SourcedRule<Record<PtitDomesticExam, number>>;

export const ptitRawFormulaEvidence = {
  value: 'DXT = DGNL/DGTD score + bonus + priority',
  evidence: [
    {
      sourceId: 'ptit-admission-methods-2026',
      location: 'Section C.3 states DXT = DGNL/DGTD score + bonus + priority; section D publishes bonus tables on scale 30 and cap by each method scale.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-21',
    },
  ],
} satisfies SourcedRule<string>;

export const ptitThptFormulaEvidence = {
  ruleId: 'ptit-thpt-formula-2026',
  evidence: [
    {
      sourceId: 'ptit-admission-methods-2026',
      location: 'Mục C.5 (Xét tuyển dựa vào kết quả thi tốt nghiệp THPT năm 2026): "ĐXT = M1 + M2 + M3 + Điểm cộng (nếu có) + Điểm ƯT (nếu có)"; tổng thô 3 môn, không hệ số, thang 30',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const ptitThptCampusThresholdEvidence = {
  ruleId: 'ptit-thpt-campus-threshold-2026',
  evidence: [
    {
      sourceId: 'ptit-thpt-threshold-2026',
      location:
        'Thông báo Ngưỡng đảm bảo chất lượng đầu vào đợt 1 năm 2026, mục 1: BVH ≥ 20,00; BVS ≥ 16,50 (05 tổ hợp A00/A01/D01/X06/X26); "đã bao gồm điểm ưu tiên đối tượng và ưu tiên khu vực"',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const ptitThptBonusEvidence = {
  ruleId: 'ptit-thpt-bonus-2026',
  evidence: [
    {
      sourceId: 'ptit-admission-methods-2026',
      location:
        'Mục D (Điểm cộng), bảng Điểm khuyến khích chứng chỉ tiếng Anh: IELTS 7.0-9.0 → 1,50; 6.5 → 1,00; 6.0 → 0,75; 5.5 → 0,50 (thang 30); tổng điểm cộng không vượt 10% thang điểm (3,0/30)',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const ptitThptPriorityEvidence = {
  ruleId: 'ptit-thpt-priority-2026',
  evidence: [
    {
      sourceId: 'ptit-admission-methods-2026',
      location:
        'Mục C: "Điểm ưu tiên thực hiện theo Quy chế tuyển sinh của Bộ GD&ĐT" — bảng mức KV/ĐT và công thức giảm khi tổng ≥ 22,5 áp theo Điều 7 Thông tư 06/2026/TT-BGDĐT',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

