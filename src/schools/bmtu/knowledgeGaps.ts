import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const bmtuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'bmtu-priority-value-silent',
    label:
      'Mục 2.1.a đề án chỉ nêu công thức "ƯT = ƯT Đối tượng + ƯT Khu vực xác định theo quy định của Quy chế tuyển sinh hiện hành", KHÔNG tự công bố bảng mức điểm ưu tiên khu vực/đối tượng cụ thể — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho GIÁ TRỊ bảng (`priority.ts`), cùng tiền lệ DUMTP/CTUMP/TNUT/HTU/TUMP.',
    status: 'incomplete',
    sourceId: 'bmtu-dean-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số BMTU tự công bố riêng (trường không công bố số riêng).',
  },
  {
    id: 'bmtu-fields-not-modeled',
    label:
      'BMTU tuyển 7 ngành (Y khoa, Y học cổ truyền, Y học dự phòng, Dược học, Kỹ thuật xét nghiệm y học, Điều dưỡng, Y tế công cộng) — module CHỈ mô hình hoá 2/7 ngành (Y khoa, Dược học), do nguồn điểm chuẩn 2026 đã đọc (Báo Thanh Niên) gộp nhóm một số ngành lại (không tách rõ điểm chuẩn riêng từng ngành trong nhóm) và 5 ngành còn lại có tổ hợp/điều kiện phụ khác chưa đối chiếu kỹ.',
    status: 'incomplete',
    sourceId: 'bmtu-dean-2026',
    scoreAffecting: false,
    knownData: ['Y khoa: 22,0/30 (2026)', 'Dược học: 20,0/30 (2026)', 'Y học cổ truyền/Điều dưỡng/Kỹ thuật xét nghiệm y học: 20,0/30 (theo nhóm, chưa tách riêng)', 'Y học dự phòng/Y tế công cộng: 18,0/30 (theo nhóm, chưa tách riêng)'],
    impact: '5/7 ngành BMTU chưa tính được qua UniScoreVN.',
  },
  {
    id: 'bmtu-flexible-third-subject-not-modeled',
    label:
      'Mỗi "nhóm tổ hợp" của BMTU (mục 4.2 đề án) cho phép môn thứ 3 linh hoạt trong {Hóa/Lý/Sinh (tuỳ nhóm), Tin học, Công nghệ, Tiếng Anh} — module chỉ hỗ trợ 5 tổ hợp map được vào `COMMON_SUBJECT_COMBINATIONS` hiện có (A00/A01/B00/B08/D07). Các lựa chọn dùng Tin học hoặc Công nghệ làm môn thứ 3 CHƯA có tổ hợp tương ứng trong hệ thống, chưa mô hình hoá.',
    status: 'incomplete',
    sourceId: 'bmtu-dean-2026',
    scoreAffecting: false,
    impact: 'Thí sinh chọn tổ hợp có môn Tin học/Công nghệ chưa tính được ở BMTU trên UniScoreVN — vẫn còn 5 tổ hợp phổ biến khác dùng được.',
  },
  {
    id: 'bmtu-threshold-secondary-source',
    label:
      'Điểm chuẩn 2026 theo từng ngành (`bmtu-threshold-2026`) đọc qua bản tin Báo Thanh Niên tường thuật trực tiếp thông báo của trường (10/8/2026) — CHƯA đọc trực tiếp được văn bản/quyết định công bố điểm chuẩn gốc của BMTU (trang bmu.edu.vn dùng CMS render nội dung bài viết qua JS, không lấy được text tĩnh khi truy xuất).',
    status: 'incomplete',
    sourceId: 'bmtu-threshold-2026',
    scoreAffecting: true,
    impact: 'Rủi ro thấp (báo nhà nước, số liệu khớp nội bộ với ngưỡng sàn Bộ GD&ĐT 2026 đã công bố cho khối sức khỏe — Quyết định 1962/QĐ-BGDĐT — nhưng chưa phải xác nhận trực tiếp từ văn bản gốc BMTU).',
  },
  {
    id: 'bmtu-hsg-bonus-not-in-profile',
    label: 'Điểm thưởng HSG (mục 7 đề án) không có field tương ứng trong `ApplicantProfile` dùng chung — caller phải tự truyền `hsgAwardLevel` qua context (không phải input hồ sơ chuẩn), cùng tiền lệ HUP.',
    status: 'incomplete',
    sourceId: 'bmtu-dean-2026',
    scoreAffecting: true,
    impact: 'Nếu không truyền `hsgAwardLevel`, điểm thưởng HSG mặc định tính là 0 dù thí sinh có thể đủ điều kiện.',
  },
  {
    id: 'bmtu-tiebreak-not-modeled',
    label: 'Đề án không nêu tiêu chí phụ khi bằng điểm ở phương thức thi TN THPT (chỉ nêu ở mục xét học bạ: ưu tiên nguyện vọng cao hơn) — module không mô hình hoá tiêu chí phụ cho trường hợp bằng điểm chuẩn.',
    status: 'incomplete',
    sourceId: 'bmtu-dean-2026',
    scoreAffecting: false,
    impact: 'Thí sinh có điểm xét tuyển đúng bằng điểm chuẩn có thể được báo "eligible" dù thực tế cần tiêu chí phụ khác (nếu có) để trúng tuyển — chỉ ảnh hưởng trường hợp biên đúng ngưỡng.',
  },
];
