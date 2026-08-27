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
    label:
      'Điểm ưu tiên KV/ĐT (Bảng 1 Đại học Huế) đã được mô hình hoá trong nhánh THPT exact (`huaf-thpt-exam-exact-2026`). Bảng điểm cộng thành tích (Phụ lục 2, tối đa 3/30) vẫn chưa nhập thành bảng tra cứu tự động — caller tự cung cấp giá trị nếu đã tính. Phương thức học bạ vẫn chỉ kiểm tra ngưỡng đồng thời.',
    status: 'incomplete',
    sourceId: 'huaf-hueuni-ttts-2026',
    scoreAffecting: true,
    impact: 'Nhánh học bạ và điểm cộng thành tích của nhánh THPT chưa tự cộng; điểm ưu tiên KV/ĐT đã tính đủ trong nhánh THPT exact.',
  },
];
