import type { AdmissionSource } from '../../core/sourceRegistry';

export const mduSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'mdu-identity-2026',
    publisher: 'Truong Dai hoc Cong nghe Mien Dong (MIT Uni.)',
    title: 'Trang chu Truong Dai hoc Cong nghe Mien Dong',
    url: 'https://mit.vn/',
    accessedAt: '2026-09-26',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Confirms the current MIT Uni. identity for the legacy MDU catalog entry (former Truong Dai hoc Mien Dong / Truong Dai hoc Cong nghe Mien Dong).',
  },
  {
    id: 'mdu-admission-methods-2026',
    publisher: 'Truong Dai hoc Cong nghe Mien Dong (MIT Uni.)',
    title: 'Truong Dai hoc Cong nghe Mien Dong cong bo cac phuong thuc xet tuyen nam 2026',
    url: 'https://mit.vn/cong-bo-cac-phuong-thuc-xet-tuyen-nam-2026/',
    accessedAt: '2026-09-26',
    publishedAt: '2026-03-20',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official page lists 4 admission methods. Method 1 states THPT exam results, 3-subject combination must include Math or Literature, and applicants graduating from 2026 must have a 3-subject THPT total from 15/30.',
  },
  {
    id: 'mdu-cutoff-summary-2026',
    publisher: 'Du Lieu Phap Luat',
    title: 'Diem chuan Truong Dai hoc Cong nghe Mien Dong 2026',
    url: 'https://dulieuphapluat.vn/cong-cu/diem-chuan-dai-hoc/dai-hoc-cong-nghe-mien-dong-mit.html',
    accessedAt: '2026-09-26',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Secondary cutoff table for 19 THPT-exam program rows: 15/30 for modeled programs, 18 for Economic Law, 19 for Pharmacy. The site explicitly says the controlling document is the official school cutoff notice; use as a cross-check with the official MIT method page, not as a standalone primary source.',
  },
];
