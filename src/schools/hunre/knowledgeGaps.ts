import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hunreKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hunre-priority-value-silent',
    label:
      'Nguồn xác nhận trực tiếp điểm chuẩn "đã bao gồm điểm ưu tiên (nếu có)", nhưng KHÔNG công bố mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'hunre-threshold-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số HUNRE tự công bố.',
  },
  {
    id: 'hunre-other-combos-not-modeled',
    label:
      'Trường công bố nhiều ngành có thêm các tổ hợp riêng (B03/C01/C02/C03/C04/X01/X02/X03/X04 theo dữ liệu năm liền kề 2024/2026) ngoài D01, nhưng thành phần/áp dụng cho ĐÚNG năm 2025 chưa xác minh trực tiếp — CHỈ modeled D01 (xác nhận riêng: dải điểm tổ hợp D01 khớp chính xác bảng công bố 2025). KHÔNG ảnh hưởng điểm chuẩn (mọi ngành công bố 1 mức chung, không phân biệt theo tổ hợp) nhưng thí sinh CHỈ thi tổ hợp khác D01 chưa tính được qua UniscoreVN.',
    status: 'official-but-unparsed',
    sourceId: 'hunre-threshold-secondary-2025',
    scoreAffecting: false,
    impact: 'Thí sinh chỉ thi tổ hợp khác D01 chưa chọn được tổ hợp trong UniscoreVN cho HUNRE.',
  },
  {
    id: 'hunre-primary-source-image-only',
    label:
      'Nguồn gốc chính thức (hunre.edu.vn, xaydungchinhsach.chinhphu.vn — thông báo số 2468/TB-TĐHHN 23/07/2025) xác nhận có thông báo điểm chuẩn chính thức nhưng bảng số liệu chỉ hiển thị dạng ẢNH, không trích xuất được bằng text extraction thông thường — số liệu dùng trong runtime lấy từ Viettelstore (đăng lại bảng dạng text), cross-check với Giaoduc.net.vn.',
    status: 'official-but-unparsed',
    sourceId: 'hunre-threshold-2025',
    scoreAffecting: false,
    impact: 'Độ tin cậy số liệu dựa trên báo đăng lại thay vì đọc trực tiếp văn bản/ảnh gốc của trường.',
  },
  {
    id: 'hunre-hcm-campus-distinct',
    label:
      'Trường có 1 cơ sở khác tên gần giống ở TP.HCM (HCMUNRE — Trường Đại học Tài nguyên và Môi trường TP.HCM, catalog id riêng `hcmunre`), mã ngành/điểm chuẩn KHÔNG liên quan — batch này CHỈ nghiên cứu cơ sở Hà Nội.',
    status: 'incomplete',
    sourceId: 'hunre-threshold-2025',
    scoreAffecting: false,
    impact: 'Không nhầm lẫn dữ liệu giữa 2 trường khi mở rộng nghiên cứu cơ sở TP.HCM sau này.',
  },
];
