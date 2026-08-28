import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dutKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dut-program-threshold-table-not-imported',
    label:
      'Bảng ngưỡng đảm bảo chất lượng đầu vào 2026 theo từng ngành/chương trình của DUT chưa được nhập đầy đủ thành dataset runtime (mới có khoảng min-max tổng hợp).',
    status: 'official-but-unparsed',
    sourceId: 'dut-quality-threshold-2026',
    scoreAffecting: true,
    knownData: ['Ngưỡng DUT 2026 dao động khoảng 16-22.75/30 theo ngành/chương trình'],
    impact: 'So sánh chỉ loại chắc chắn hồ sơ dưới 16/30; chưa kết luận đạt cho từng ngành cụ thể.',
  },
  {
    id: 'dut-conversion-and-bonus-appendices-not-imported',
    label: 'Phụ lục quy đổi giữa các phương thức/tổ hợp và bảng điểm cộng, điểm ưu tiên của DUT 2026 chưa được nhập.',
    status: 'official-but-unparsed',
    sourceId: 'dut-admission-info-2026',
    scoreAffecting: true,
    impact: 'Chưa bật scoreConversion/exactCalculator; cần đọc phụ lục chính thức hoặc file đính kèm dạng ảnh/PDF quét.',
  },
  {
    id: 'dut-conversion-coefficient-missing',
    label:
      'DUT công bố áp dụng MỘT ngưỡng chung sau khi quy đổi tương đương giữa các phương thức (thi TN THPT, Đánh giá tư duy ĐHBK Hà Nội, xét tuyển thẳng), nhưng hệ số/công thức quy đổi cụ thể giữa các thang điểm chưa tìm được ở dạng máy đọc được trong đợt research này.',
    status: 'incomplete',
    sourceId: 'dut-admission-info-2026',
    scoreAffecting: true,
    impact:
      'Không đủ căn cứ để dựng scoreConversion/exactCalculator cho DUT; theo nguyên tắc "không đoán công thức", DUT giữ ở mức eligibility-only thay vì partial như kỳ vọng ban đầu trong backlog.',
  },
  {
    id: 'dut-recheck-2026-08-28',
    label:
      'Recheck 2026-08-28 (WebSearch + WebFetch trực tiếp `tuyensinh.dut.udn.vn/phuong-thuc-tuyen-sinh`): không tìm thêm được hệ số/bảng quy đổi tương đương máy đọc được giữa thi TN THPT và Đánh giá tư duy ĐHBK Hà Nội — trang chỉ liệt kê tên phương thức kèm link "Xem chi tiết" tới các trang con chưa fetch được nội dung số liệu. Báo chí (vietnamnet/vnexpress/tuyensinh247) chỉ có điểm CHUẨN (kết quả trúng tuyển cuối) theo ngành, không phải bảng hệ số quy đổi — không dùng thay thế được. Giữ nguyên eligibility-only.',
    status: 'incomplete',
    sourceId: 'dut-admission-info-2026',
    scoreAffecting: true,
    impact: 'Không có thay đổi so với đợt research trước; DUT tiếp tục ở mức eligibility-only.',
  },
];
