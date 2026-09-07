import { describe, expect, it } from 'vitest';
import readmeRaw from '../../README.md?raw';
import { extractBetweenMarkers, README_COVERAGE_MARKERS, renderKpiTableBody, renderSupportStatusTableBody } from './readmeCoverage';

/**
 * Anti-drift test — cùng pattern `docs/school-status.md?raw` đã dùng ở `src/schools/index.test.ts`.
 * Nếu test này đỏ: chạy `npm run stats:coverage -- --write` rồi commit README.md, KHÔNG sửa tay
 * từng con số (dễ quên 1 dòng, đúng bug đã xảy ra: "307/295" viết nhầm 1 câu).
 */
describe('README.md coverage blocks không lệch khỏi institutionCoverage', () => {
  it('khối KPI khớp renderKpiTableBody()', () => {
    const actual = extractBetweenMarkers(readmeRaw, README_COVERAGE_MARKERS.kpi);
    expect(actual, 'Không tìm thấy marker coverage:kpi trong README.md').not.toBeNull();
    expect(actual).toBe(renderKpiTableBody());
  });

  it('khối trạng thái hỗ trợ khớp renderSupportStatusTableBody()', () => {
    const actual = extractBetweenMarkers(readmeRaw, README_COVERAGE_MARKERS.supportStatus);
    expect(actual, 'Không tìm thấy marker coverage:support-status trong README.md').not.toBeNull();
    expect(actual).toBe(renderSupportStatusTableBody());
  });
});
