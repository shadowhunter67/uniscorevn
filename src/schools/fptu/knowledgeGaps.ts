import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const fptuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'fptu-final-admission-score-formula-ambiguous',
    label:
      'FPTU công bố công thức Điểm kết hợp (ĐKH) = (Điểm thi TN THPT + Điểm trung bình lớp 12 x 3)/2, và ngưỡng nhận hồ sơ thực tế là Điểm xét tuyển (ĐXT = ĐKH + điểm khuyến khích + điểm ưu tiên) >= 18,0/30 (ngành CNTT/Khoa học máy tính hệ Cử nhân tài năng: 21,0/30). Nguồn chính thức KHÔNG nêu rõ "Điểm trung bình lớp 12" là điểm trung bình chung cả năm hay điểm trung bình riêng 3 môn tổ hợp xét tuyển, nên công thức ĐXT không được mô hình hoá để tránh đoán sai (Do-not-guess-formula).',
    status: 'incomplete',
    sourceId: 'fptu-quality-threshold-2026',
    scoreAffecting: true,
    knownData: [
      'Ngưỡng tổ hợp thô (3 môn THPT): tối thiểu 15,0/30 (Axx hoặc Cxx).',
      'Ngưỡng ĐXT cuối cùng công bố: 18,0/30 (đa số ngành), 21,0/30 (Cử nhân tài năng Khoa học máy tính).',
      'Công thức ĐKH = (Điểm thi TN THPT + Điểm trung bình lớp 12 x 3)/2 — chưa rõ định nghĩa "điểm trung bình lớp 12".',
    ],
    impact: 'Runtime chỉ kiểm tra được ngưỡng tổ hợp thô 15/30; KHÔNG tính được ĐXT cuối cùng vì thiếu định nghĩa chính xác của điểm trung bình lớp 12 trong công thức.',
  },
  {
    id: 'fptu-bonus-priority-not-modeled',
    label: 'Điểm khuyến khích (ví dụ 1,5 điểm cho thí sinh diện ưu tiên đầu vào, chứng chỉ ngoại ngữ) và điểm ưu tiên khu vực/đối tượng chưa được cộng vào ĐXT trong runtime.',
    status: 'incomplete',
    sourceId: 'fptu-quality-threshold-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có điểm khuyến khích/ưu tiên cần tự cộng thêm trước khi so với ngưỡng ĐXT đã công bố.',
  },
];
