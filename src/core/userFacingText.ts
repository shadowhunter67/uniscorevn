/**
 * Lọc ghi chú kỹ thuật của người nhập dữ liệu (tên file, mã nguồn nội bộ, "batch N") trước khi hiển
 * thị cho người dùng cuối. Dữ liệu gốc KHÔNG bị sửa — chỉ lớp hiển thị.
 *
 * - Tên file nguồn nhắc tới trong câu được đổi thành cụm dễ hiểu (xem FILE_LABELS) hoặc bỏ.
 * - Mã nội bộ dạng kebab-case (>= 2 dấu gạch) trong backtick/ngoặc đơn bị bỏ.
 * - Code span khác (VD công thức) giữ nguyên nội dung, chỉ bỏ backtick.
 */
const KEBAB_ID = /^[a-z0-9]+(?:-[a-z0-9]+){2,}$/;
const FILE_REF = /^[\w./-]+\.tsx?(?::[\w-]+)?$/;

const FILE_LABELS: Record<string, string> = {
  'cutoffs.ts': 'dữ liệu điểm chuẩn',
  'programs.ts': 'danh mục ngành',
  'thresholds.ts': 'bảng ngưỡng điểm',
  'sources.ts': 'danh mục nguồn',
  'knowledgeGaps.ts': 'phần phạm vi chưa hỗ trợ',
  'eligibility.ts': 'bộ điều kiện xét tuyển',
  'subjects.ts': 'danh mục môn',
};

/**
 * Thuật ngữ lập trình hay lọt vào ghi chú của người nhập dữ liệu -> cụm tiếng Việt cùng nghĩa.
 * Chỉ áp ở lớp hiển thị; viết hoa/thường được giữ theo chữ đầu của từ gốc.
 */
const GLOSSARY: ReadonlyArray<readonly [RegExp, string]> = [
  [/\bjudgment call\b/gi, 'giả định của UniScoreVN'],
  [/\bscoreConversion\b/g, 'quy đổi điểm'],
  [/\bApplicantProfile\b/g, 'hồ sơ dùng chung'],
  [/\bSubjectId\b/g, 'mã môn'],
  [/\bknowledgeGaps\b/g, 'phần phạm vi chưa hỗ trợ'],
  [/\bevaluator\b/gi, 'bộ tính điểm'],
  [/\bcross-?check(?:ed)?\b/gi, 'đối chiếu chéo'],
  [/\bverbatim\b/gi, 'nguyên văn'],
  [/\btranscribe\b/gi, 'chép lại'],
  [/\bwired(?:\s+vào)?\b/gi, 'đưa vào'],
  [/\bthresholdGroup\b/g, 'nhóm ngưỡng'],
  [/\bruntime\b/gi, 'phần tính toán'],
  [/\bmodules?\b/gi, 'phần'],
  [/\bmodeled\b/gi, 'đã mô hình hoá'],
  [/\bcaller\b/gi, 'nơi gọi'],
  [/\bexact\b/gi, 'chính xác'],
  [/\bcutoffs?\b/gi, 'điểm chuẩn'],
  [/\bthresholds?\b/gi, 'ngưỡng'],
  [/\beligibility\b/gi, 'điều kiện xét tuyển'],
  [/\bcalculator\b/gi, 'bộ tính điểm'],
  [/\btaxonomy\b/gi, 'phân loại ngành'],
];

function applyGlossary(text: string): string {
  return GLOSSARY.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), text);
}

function fileLabel(ref: string): string {
  const base = ref.split(':')[0].split('/').pop() ?? '';
  return FILE_LABELS[base] ?? '';
}

export function userFacingText(text: string): string {
  let out = text.replace(/`([^`]+)`/g, (_match, inner: string) => {
    const parts = inner.split('/').map((part) => part.trim());
    if (parts.every((part) => KEBAB_ID.test(part))) return '';
    if (parts.length === 1 && FILE_REF.test(inner)) return inner.includes(':') ? '' : fileLabel(inner);
    return inner;
  });
  out = out
    // "(xem knowledgeGaps.ts)" / "— xem sources.ts" (không backtick) -> bỏ cả cụm
    .replace(/\s*\((?:xem|trong|tại)?\s*[\w./-]+\.tsx?(?::[\w-]+)?\)/g, '')
    .replace(/\s*(?:—|-)?\s*xem\s+[\w./-]+\.tsx?(?::[\w-]+)?/g, '')
    // tên file/đường dẫn còn lại trong câu -> cụm dễ hiểu (hoặc bỏ)
    .replace(/\b[\w./-]*\w\.tsx?\b/g, (ref) => fileLabel(ref))
    // mã kebab-case đứng đầu ngoặc kèm chữ khác: "(tbdu-thpt-exam-exact-2026, nhóm ngành thường)"
    .replace(/\((?=[^)]*[a-z]{4})\s*[a-z0-9]+(?:-[a-z0-9]+){2,}\s*,\s*/gi, '(')
    // mã kebab-case trong ngoặc đơn: "(ou-thpt-exam-exact-2026)" và danh sách "(a-b-c/d-e-f)"
    .replace(/\s*\((?=[^)]*[a-z]{4})\s*[a-z0-9]+(?:-[a-z0-9]+){2,}(?:\s*[/,]\s*[a-z0-9]+(?:-[a-z0-9]+)+)*\s*\)/gi, '')
    .replace(/\s*\(\s*[a-z0-9-]+(?:\/[a-z0-9-]+){2,}\s*\)/g, '')
    // từ lóng quy trình: "batch 6", "trong batch này"
    .replace(/\s*(?:,\s*)?(?:trong\s+|ở\s+)?batch(?:\s+này|\s+\d+)?/gi, '')
    .replace(/\(\s*[,;/\s—-]*\)/g, '') // ngoặc rỗng
    .replace(/\(\s*[/,;—-]+\s*/g, '(') // dấu phân cách lẻ sau dấu mở ngoặc
    .replace(/\s+([,.;:)])/g, '$1')
    .replace(/\(\s+/g, '(')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s*—\s*(?=[.,;]|$)/g, '')
    .trim();
  return applyGlossary(out);
}

/** Nhãn nguồn hiển thị: tránh lộ id nội bộ (kebab-case) khi nguồn không có tiêu đề. */
export function displaySourceLabel(title: string | undefined, fallbackId: string | undefined): string {
  if (title) return userFacingText(title);
  if (fallbackId && !KEBAB_ID.test(fallbackId)) return fallbackId;
  return 'Nguồn tham khảo';
}
