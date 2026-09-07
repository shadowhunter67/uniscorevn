import { describe, expect, it } from 'vitest';
import { deriveEvidenceConfidence } from './evidenceConfidence';

describe('deriveEvidenceConfidence', () => {
  it('explicit evidenceConfidence luôn thắng, không suy diễn lại', () => {
    expect(deriveEvidenceConfidence({ verification: 'verified', evidenceConfidence: 'official_document_image' })).toBe(
      'official_document_image'
    );
  });

  it('official-republication -> official_mirror bất kể verification', () => {
    expect(deriveEvidenceConfidence({ sourceType: 'official-republication', verification: 'verified' })).toBe('official_mirror');
    expect(deriveEvidenceConfidence({ sourceType: 'official-republication', verification: 'incomplete' })).toBe('official_mirror');
  });

  it('secondary + cross-checked -> secondary_triangulated', () => {
    expect(deriveEvidenceConfidence({ sourceType: 'secondary', verification: 'cross-checked' })).toBe('secondary_triangulated');
  });

  it('secondary không cross-checked -> unverified', () => {
    expect(deriveEvidenceConfidence({ sourceType: 'secondary', verification: 'verified' })).toBe('unverified');
    expect(deriveEvidenceConfidence({ sourceType: 'secondary', verification: 'official-source-available' })).toBe('unverified');
    expect(deriveEvidenceConfidence({ sourceType: 'secondary', verification: 'incomplete' })).toBe('unverified');
  });

  it('verification incomplete (nguồn không phải secondary) -> unverified', () => {
    expect(deriveEvidenceConfidence({ sourceType: 'official-school', verification: 'incomplete' })).toBe('unverified');
    expect(deriveEvidenceConfidence({ verification: 'incomplete' })).toBe('unverified');
  });

  it('nguồn chính thức (official-school/official-admission/vnuhcm/government) + verified/cross-checked -> official_primary', () => {
    for (const sourceType of ['official-school', 'official-admission', 'vnuhcm', 'government'] as const) {
      expect(deriveEvidenceConfidence({ sourceType, verification: 'verified' })).toBe('official_primary');
      expect(deriveEvidenceConfidence({ sourceType, verification: 'cross-checked' })).toBe('official_primary');
    }
  });

  it('sourceType chưa khai (record cũ, legacy) + verified -> official_primary (an toàn, không unverified oan)', () => {
    expect(deriveEvidenceConfidence({ verification: 'verified' })).toBe('official_primary');
  });
});
