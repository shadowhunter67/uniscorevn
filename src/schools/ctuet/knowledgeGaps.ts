import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const ctuetKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ctuet-bonus-not-modeled',
    label:
      'Quy chế tuyển sinh (Điều 6.2.b) chỉ nêu trần chung "tổng điểm cộng, điểm thưởng, điểm khuyến khích" cho thí sinh có thành tích đặc biệt tối đa 10% thang điểm xét (tối đa 3/30 điểm), KHÔNG công bố bảng điểm cộng cụ thể theo loại thành tích/chứng chỉ cho CTUET — module này KHÔNG mô hình hoá điểm cộng (mặc định 0).',
    status: 'incomplete',
    sourceId: 'ctuet-quyche-2025',
    scoreAffecting: true,
    impact: 'Thí sinh có thành tích đặc biệt (giải thưởng/chứng chỉ) không được cộng điểm cộng khi tính qua UniscoreVN — Điểm xét tuyển hiển thị có thể thấp hơn thực tế đối với nhóm này.',
  },
  {
    id: 'ctuet-cong-nghe-sinh-hoc-x16-not-modeled',
    label:
      'Ngành Công nghệ sinh học (7420201) còn tổ hợp X16 (Toán, Sinh học, CN nông nghiệp) trong danh sách chính thức — "CN nông nghiệp" không có `SubjectId` tương ứng trong hệ thống, nên tổ hợp này chưa mô hình hoá (7 tổ hợp còn lại của ngành vẫn tính được đầy đủ).',
    status: 'incomplete',
    sourceId: 'ctuet-thongtin-2025',
    scoreAffecting: false,
    impact: 'Thí sinh dùng đúng tổ hợp X16 cho ngành Công nghệ sinh học chưa tính được qua UniscoreVN cho CTUET (các tổ hợp khác của ngành này không bị ảnh hưởng).',
  },
  {
    id: 'ctuet-other-methods-not-modeled',
    label:
      'CTUET 2025 còn phương thức xét học bạ lớp 12 (mã 200) và xét điểm ĐGNL ĐHQG-HCM (mã 402) — module này CHỈ mô hình hoá phương thức xét kết quả thi TN THPT (mã 100).',
    status: 'incomplete',
    sourceId: 'ctuet-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng học bạ hoặc ĐGNL chưa tính được qua UniscoreVN cho CTUET.',
  },
];
