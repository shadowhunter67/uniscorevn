import type { SourceType } from './admissionHistory';
import type { VerificationLevel } from './trust';

/**
 * Chiều "độ tin cậy nguồn" tách biệt khỏi "mức độ hoàn thiện tính năng" (SchoolStatus/
 * SchoolCapabilities/InstitutionSupportStatus). Hai calculator cùng "tính được đầy đủ" vẫn có thể
 * khác nhau ở đây — 1 cái dựa nguồn gốc (PDF/trang tuyển sinh chính thức), 1 cái dựa nguồn đối
 * chiếu nhiều trang thứ cấp (mirror/tổng hợp). Layer lên `VerificationLevel`/`SourceType` đã có
 * sẵn, KHÔNG thay thế — field mới hoàn toàn optional, record cũ không set vẫn hợp lệ.
 */
export type EvidenceConfidence =
  | 'official_primary'
  | 'official_mirror'
  | 'official_document_image'
  | 'secondary_triangulated'
  | 'unverified';

const OFFICIAL_MIRROR_SOURCE_TYPES: ReadonlySet<SourceType> = new Set(['official-republication']);

/**
 * Suy ra `EvidenceConfidence` từ `sourceType`/`verification` đã có sẵn khi record KHÔNG tự khai
 * field mới — `official_document_image` không suy ra được (không có tín hiệu nào phân biệt "đọc
 * qua ảnh/PDF scan" so với "đọc trực tiếp text"), phải khai tay field mới nếu muốn phân biệt.
 */
export function deriveEvidenceConfidence(evidence: {
  sourceType?: SourceType;
  verification: VerificationLevel;
  evidenceConfidence?: EvidenceConfidence;
}): EvidenceConfidence {
  if (evidence.evidenceConfidence) return evidence.evidenceConfidence;

  if (evidence.sourceType && OFFICIAL_MIRROR_SOURCE_TYPES.has(evidence.sourceType)) return 'official_mirror';

  if (evidence.sourceType === 'secondary') {
    return evidence.verification === 'cross-checked' ? 'secondary_triangulated' : 'unverified';
  }

  if (evidence.verification === 'incomplete') return 'unverified';

  // official-school / official-admission / vnuhcm / government, hoặc sourceType chưa khai (legacy)
  // + verification verified/official-source-available/cross-checked ⇒ coi là nguồn chính thức gốc.
  return 'official_primary';
}

export const EVIDENCE_CONFIDENCE_LABELS: Record<EvidenceConfidence, string> = {
  official_primary: 'Nguồn chính thức gốc',
  official_mirror: 'Nguồn chính thức (qua mirror/đăng lại)',
  official_document_image: 'Nguồn chính thức (đọc qua ảnh/PDF scan)',
  secondary_triangulated: 'Đối chiếu nhiều nguồn thứ cấp',
  unverified: 'Chưa xác minh đầy đủ',
};
