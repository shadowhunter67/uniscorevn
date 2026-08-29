import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const aofKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'aof-program-to-group-mapping-not-imported',
    label:
      'Ngưỡng đảm bảo chất lượng đầu vào AOF 2026 (phương thức 3) công bố theo CƠ SỞ/LOẠI CHƯƠNG TRÌNH (chuẩn/LKT DDP >= 19, LKT Toulon >= 17, CLC chứng chỉ quốc tế >= 20 tại Hà Nội; Phân hiệu TP.HCM và Hưng Yên >= 16), không theo từng mã ngành cụ thể. Bảng ánh xạ đầy đủ mã ngành -> nhóm cơ sở/loại chương trình nằm trong bảng chỉ tiêu tuyển sinh (mục 4 của thông báo) nhưng chưa được trích xuất đầy đủ vào runtime trong batch này.',
    status: 'official-but-unparsed',
    sourceId: 'aof-threshold-2026',
    scoreAffecting: true,
    impact: 'Runtime chỉ loại được hồ sơ dưới 16/30 (chắc chắn không đạt ngưỡng nào) và xác nhận đạt trên 20/30 (đạt cả mọi nhóm); giữa 16/30 và 20/30 cần biết ngành/chương trình/cơ sở cụ thể thuộc nhóm nào để kết luận chính xác.',
  },
  {
    id: 'aof-priority-formula-not-confirmed-for-pt3',
    label:
      'Công thức Điểm xét tuyển các phương thức 1/2/4 công bố tường minh có cộng "Điểm ưu tiên (Nếu có)", nhưng mục phương thức 3 (thi TN THPT) không lặp lại công thức chi tiết trong đoạn văn bản đọc được (PDF gốc có lỗi encoding dấu tiếng Việt) — chưa đủ chắc chắn để áp dụng judgment call điểm ưu tiên cụ thể cho PT3.',
    status: 'incomplete',
    sourceId: 'aof-threshold-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra tổng thô 3 môn so với dải ngưỡng, không cộng điểm ưu tiên cho phương thức 3.',
  },
  {
    id: 'aof-other-methods-not-modeled',
    label: 'AOF còn phương thức 1 (xét tuyển thẳng/ưu tiên), phương thức 2 (kết hợp học bạ + thành tích/chứng chỉ quốc tế) và phương thức 4 (học bạ, chỉ áp dụng chương trình LKT Toulon) — chỉ phương thức 3 (thi TN THPT) được mô hình hoá dạng dải ngưỡng trong batch này.',
    status: 'official-but-unparsed',
    sourceId: 'aof-threshold-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra được ngưỡng dải cho phương thức thi TN THPT.',
  },
  {
    id: 'aof-law-math-condition-not-modeled',
    label: 'Ngành Luật, chương trình Luật kinh doanh có thêm điều kiện điểm thi TN THPT 2026 môn Toán >= 6 điểm — chưa mô hình hoá điều kiện bổ sung này (chỉ áp dụng điều kiện tổng điểm).',
    status: 'official-but-unparsed',
    sourceId: 'aof-threshold-2026',
    scoreAffecting: false,
  },
];
