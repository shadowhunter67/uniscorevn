import { describe, expect, it } from 'vitest';
import { schoolRegistry } from '../schools';
import { UNIVERSITY_SYSTEMS, getUniversitySystem, getUniversitySystemId } from './universitySystems';

describe('university systems registry', () => {
  it('every declared member id resolves to a real school in the registry', () => {
    for (const system of UNIVERSITY_SYSTEMS) {
      for (const memberId of system.memberIds) {
        expect(schoolRegistry[memberId], `${system.id} -> ${memberId}`).toBeDefined();
      }
    }
  });

  it('no school belongs to more than one system', () => {
    const seen = new Map<string, string>();
    for (const system of UNIVERSITY_SYSTEMS) {
      for (const memberId of system.memberIds) {
        expect(seen.has(memberId), `${memberId} claimed by both ${seen.get(memberId)} and ${system.id}`).toBe(false);
        seen.set(memberId, system.id);
      }
    }
  });

  it('every system has at least two members and stable ids/labels', () => {
    const ids = new Set<string>();
    for (const system of UNIVERSITY_SYSTEMS) {
      expect(system.memberIds.length).toBeGreaterThanOrEqual(2);
      expect(system.id).toMatch(/^[a-z0-9-]+$/);
      expect(system.shortLabel.length).toBeGreaterThan(0);
      expect(ids.has(system.id)).toBe(false);
      ids.add(system.id);
    }
  });

  it('does not group independent look-alike ids', () => {
    // "vnu" prefix but not ĐHQG Hà Nội
    expect(getUniversitySystemId('vnua')).toBeUndefined();
    expect(getUniversitySystemId('vnuf')).toBeUndefined();
    expect(getUniversitySystemId('vnufa')).toBeUndefined();
    // Đà Nẵng health school under Bộ Y tế
    expect(getUniversitySystemId('dumtp')).toBeUndefined();
    // independent economics universities
    expect(getUniversitySystemId('ueh')).toBeUndefined();
    expect(getUniversitySystemId('nctu')).toBeUndefined();
  });

  it('maps members back to the right system', () => {
    expect(getUniversitySystemId('hce')).toBe('hue');
    expect(getUniversitySystemId('vku')).toBe('da-nang');
    expect(getUniversitySystemId('hcmut')).toBe('vnu-hcm');
    expect(getUniversitySystem('hue')?.name).toBe('Đại học Huế');
    expect(getUniversitySystem('missing')).toBeUndefined();
  });
});
