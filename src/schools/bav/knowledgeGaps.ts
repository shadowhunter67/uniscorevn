import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const bavKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'bav-other-methods-not-modeled',
    label:
      'BAV còn PTXT1 (xét tuyển thẳng/ưu tiên xét tuyển), PTXT2 (kết hợp học bạ THPT với chứng chỉ quốc tế), PTXT2.2/2.3 (kết hợp học bạ với ĐGNL ĐHQGHN/V-SAT) và PTXT3 (dựa trên thành tích học tập THPT) — nguồn công bố bảng quy đổi tương đương điểm trúng tuyển giữa các phương thức nhưng CHƯA chuẩn hoá các phương thức này vào runtime trong batch này.',
    status: 'official-but-unparsed',
    sourceId: 'bav-threshold-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ tính được PTXT4 (xét điểm thi TN THPT).',
  },
  {
    id: 'bav-diem-cong-not-modeled',
    label:
      'Thông tin tuyển sinh 2026 (mục 5.b) quy định tổng điểm cộng (điểm thưởng + điểm xét thưởng + điểm khuyến khích) không vượt quá 3,0 điểm, nhưng KHÔNG cung cấp bảng quy đổi cụ thể (đối tượng nào được bao nhiêu điểm) trong phạm vi tài liệu đã đọc — điểm cộng KHÔNG model, mặc định 0.',
    status: 'official-but-unparsed',
    sourceId: 'bav-admission-info-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có thành tích/chứng chỉ quốc tế được cộng điểm sẽ có Điểm xét thực tế cao hơn kết quả UniscoreVN hiển thị (chênh lệch tối đa 3,0/30).',
  },
  {
    id: 'bav-priority-table-value-referenced-not-restated',
    label:
      'Mục "7.1 Chính sách ưu tiên chung" công bố ĐÚNG công thức giảm điểm ưu tiên theo thang 30 (mốc 22,50, chia 7,5) nhưng chỉ dẫn chiếu "mức điểm ưu tiên quy định" theo quy chế tuyển sinh hiện hành, không liệt lại bằng số trong văn bản — dùng khung quốc gia hiện hành (Điều 7 Thông tư 06/2026/TT-BGDĐT) làm judgment call cho GIÁ TRỊ bảng (`priority.ts`), không phải cho công thức (công thức đã xác nhận trực tiếp).',
    status: 'incomplete',
    sourceId: 'bav-admission-info-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên dùng giá trị bảng chuẩn quốc gia — nếu BAV áp dụng ngoại lệ khác quy chế chung (không có dấu hiệu trong nguồn đã đọc), kết quả UniscoreVN có thể lệch nhẹ.',
  },
  {
    id: 'bav-combination-differential-not-modeled',
    label:
      'Mục 2 của thông báo ngưỡng công bố "chênh lệch điểm trúng tuyển giữa các tổ hợp" so với tổ hợp gốc D01 (A00 cao hơn 0,5; C00/C03 thấp hơn 0,5; A01/D07/D09/D14 bằng D01) — đây là hệ số quy đổi dùng khi XÉT DUYỆT/xếp hạng trúng tuyển giữa các tổ hợp khác nhau trong cùng mã xét tuyển, KHÔNG phải điều chỉnh ngưỡng đăng ký xét tuyển (mục 1). UniscoreVN chỉ áp dụng ngưỡng đăng ký (mục 1) và KHÔNG model chênh lệch này khi so ngưỡng.',
    status: 'official-but-unparsed',
    sourceId: 'bav-threshold-2026',
    scoreAffecting: false,
    impact: 'Kết quả đạt/chưa đạt ngưỡng đăng ký không bị ảnh hưởng, nhưng dự đoán khả năng trúng tuyển thực tế (điểm chuẩn cuối cùng) giữa các tổ hợp có thể lệch tới 0,5/30 so với tổ hợp gốc D01.',
  },
  {
    id: 'bav-law-threshold-unpublished',
    label:
      'Ngưỡng đảm bảo chất lượng đầu vào cho lĩnh vực Pháp luật (LAW01 - Luật kinh tế, LAW03 - CLC Luật kinh tế, LAW04 - Luật học) "sẽ căn cứ theo ngưỡng bảo đảm chất lượng đầu vào do Bộ GD&ĐT công bố trong thời gian tới" — CHƯA có số cụ thể tại thời điểm research (2026-08-29), nên 3 mã xét tuyển này KHÔNG có trong `thresholds.ts`.',
    status: 'official-but-unparsed',
    sourceId: 'bav-threshold-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chưa tính được ngưỡng đầu vào cho 3 mã xét tuyển lĩnh vực Pháp luật (LAW01/LAW03/LAW04).',
  },
];
