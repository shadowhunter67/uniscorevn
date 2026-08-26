import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hcmupesKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hcmupes-other-majors-not-modeled',
    label: 'Ngành Huấn luyện thể thao (7810302) và Quản lý thể dục thể thao (7810301) dùng thông báo ngưỡng riêng, chưa tìm được nguồn — chỉ ngành Giáo dục thể chất (7140206) được kiểm tra.',
    status: 'official-but-unparsed',
    sourceId: 'hcmupes-gdtc-threshold-2026',
    scoreAffecting: false,
  },
  {
    id: 'hcmupes-elite-exemption-not-modeled',
    label: 'Vận động viên cấp 1/kiện tướng/huy chương quốc gia-quốc tế, hoặc thí sinh có điểm năng khiếu TDTT ≥9,00, được miễn áp dụng ngưỡng — diện miễn này chưa được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'hcmupes-gdtc-threshold-2026',
    scoreAffecting: false,
  },
  {
    id: 'hcmupes-transcript-method-not-modeled',
    label: 'Phương thức 406 (xét học bạ) chưa được mô hình hoá — cần thêm điều kiện học lực lớp 12 xếp loại Khá trở lên (không có trong hồ sơ chung).',
    status: 'official-but-unparsed',
    sourceId: 'hcmupes-gdtc-threshold-2026',
    scoreAffecting: false,
  },
];
