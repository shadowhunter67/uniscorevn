import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dsuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dsu-formula-inferred-not-stated-verbatim',
    label:
      'Thông báo 247/TB-TDTTĐN (mục 4 "Phương thức tuyển sinh") không nêu công thức tính Điểm xét tuyển bằng chữ cho phương thức mã 100 (khác TVUni với "ĐXT = TN1+TN2+TN3+Điểm ưu tiên" tường minh). Công thức tổng thô 3 môn (thang 30, không hệ số) + điểm ưu tiên được suy luận từ: (1) thang điểm 30 công bố trong bảng điểm chuẩn (`Quyết định 1088/QĐ-TDTTĐN-HĐTS`); (2) không có hệ số/nhân hệ số nào được công bố cho môn nào trong tổ hợp B03/C14; (3) đây là hình thức xét tuyển thuần theo kết quả kỳ thi tốt nghiệp THPT quốc gia (không kết hợp học bạ/năng khiếu).',
    status: 'incomplete',
    sourceId: 'dsu-tb247-tuyensinh-2025',
    scoreAffecting: true,
    impact: 'Công thức là suy luận có căn cứ từ cấu trúc tổ hợp cân bằng đã công bố, không phải văn bản nêu trực tiếp bằng chữ — rủi ro thấp vì đây là cách tính chuẩn duy nhất khả dĩ cho một tổ hợp 3 môn thang 30 không hệ số.',
  },
  {
    id: 'dsu-toan-van-floor-condition-not-enforced',
    label:
      'Bảng "Mức điểm chuẩn trúng tuyển" (Quyết định 1088/QĐ-TDTTĐN-HĐTS) ghi điều kiện "Điểm môn Toán hoặc điểm môn Văn trong tổ hợp xét tuyển đạt 25% của điểm trúng tuyển" ở hàng Quản lý TDTT/Huấn luyện thể thao (gộp chung cột điều kiện cho cả 4 phương thức, bao gồm cả 100/200 không có năng khiếu). Đối chiếu Điều 6 khoản 3.a Quy chế tuyển sinh (QĐ 577/QĐ-TDTTĐN): "phải có môn toán hoặc ngữ văn với trọng số tính điểm xét không dưới 25%" — đây là NGUYÊN TẮC THIẾT KẾ TỔ HỢP (trọng số trong công thức), không phải ngưỡng điểm thô runtime áp riêng từng thí sinh. Tổ hợp B03/C14 dùng trọng số đều 1/3 mỗi môn (~33,3% > 25%) nên tự động thoả mãn — KHÔNG enforce thêm điều kiện này trong `evaluate.ts`.',
    status: 'incomplete',
    sourceId: 'dsu-qd1088-diemchuan-2025',
    scoreAffecting: false,
    impact: 'Không ảnh hưởng kết quả tính vì tổ hợp B03/C14 tự động thoả mãn điều kiện trọng số 25% theo thiết kế cân bằng 3 môn.',
  },
  {
    id: 'dsu-other-fields-methods-not-modeled',
    label:
      'DSU 2025 có 3 ngành (Quản lý TDTT — 7810301; Huấn luyện thể thao — 7810302; Giáo dục thể chất — 7140206) và 6 phương thức (301/303 tuyển thẳng/ưu tiên; 405/406 kết hợp năng khiếu TDTT — áp dụng cho cả 3 ngành; 100/200 thuần văn hoá — CHỈ ngành Quản lý TDTT). Module này CHỈ mô hình hoá phương thức 100 của Quản lý TDTT vì đây là phương thức DUY NHẤT không yêu cầu điểm thi năng khiếu TDTT (một kỳ thi thể lực riêng, không thể mô phỏng qua UniscoreVN). Huấn luyện thể thao, Giáo dục thể chất, và phương thức 200/405/406 chưa mô hình hoá.',
    status: 'incomplete',
    sourceId: 'dsu-tb247-tuyensinh-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển 2 ngành còn lại hoặc bằng phương thức khác (200/405/406/301/303) chưa tính được qua UniscoreVN cho DSU.',
  },
];
