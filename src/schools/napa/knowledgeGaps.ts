import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const napaKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'napa-combo-conversion-not-modeled',
    label: 'Chưa mô hình hóa quy đổi sang các tổ hợp khác D01',
    status: 'verified',
    scoreAffecting: true,
    implemented: false,
    note:
      'Thông báo điểm trúng tuyển 2026 công bố ngưỡng đã quy đổi về phương thức gốc, tổ hợp môn gốc D01. Batch nay chỉ tính nhanh D01; các tổ hợp C00/C03/C04/D10/D14... cần bằng quy đổi chi tiet doc sach truoc khi mô hình hóa.',
  },
];
