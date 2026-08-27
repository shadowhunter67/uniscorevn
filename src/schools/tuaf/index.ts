import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tuafAdmissionMethods } from './methods';

export const tuafModule: SchoolModule = {
  id: 'tuaf',
  name: 'Truong Dai hoc Nong Lam - Dai hoc Thai Nguyen',
  shortName: 'TUAF',
  about: 'Public agriculture and forestry member school of Thai Nguyen University.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển TUAF 2026 (phương thức thi TN THPT, đợt 1): ĐXT = round2(tổng thô 3 môn + điểm ưu tiên KV/ĐT theo Điều 7 TT 06/2026) — công thức trích nguyên văn Thông báo 727/TB-ĐHNL (07/07/2026); ĐXT ≥ 16,0/30 (đồng nhất cho tất cả 23 ngành) là đủ điều kiện xét tuyển. Phương thức học bạ / V-SAT / xét tuyển thẳng chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tuafAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Official 2026 undergraduate admission floor-score notice (727/TB-DHNL)',
      url: 'https://tuaf.edu.vn/bai-viet/truong-dai-hoc-nong-lam-thai-nguyen-cong-bo-nguong-dam-bao-chat-luong-dau-vao-diem-san-dai-hoc-he-chinh-quy-dot-1-nam-2026-43603.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
