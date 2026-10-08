import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const thanhdoKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'thanhdo-program-threshold-table-not-imported',
    label: 'ThanhDo 2026 công bố điểm chuẩn thi TN THPT riêng cho từng ngành (16,0-20,0/30, 14 ngành); chưa chọn được ngành cụ thể để áp dụng dung mức.',
    status: 'official-but-unparsed',
    sourceId: 'thanhdo-cutoff-2026',
    scoreAffecting: true,
    knownData: [
      'Mức thap nhat 16,0/30: Ke toan, Quan tri Van phong, Quan tri Khach san, Viet Nam hoc, Giao duc hoc',
      'Mức 16,5/30: Quan tri kinh doanh',
      'Mức 17,0/30: Công nghệ kỹ thuật O to, Ngon ngu Anh',
      'Mức 17,5/30: CNTT, Công nghệ kỹ thuật Dien-Dien tu, Ngon ngu Trung Quoc',
      'Mức 18,0/30: Điều dưỡng',
      'Mức cao nhat 20,0/30: Luat, Duoc hoc',
    ],
    impact: 'Runtime chi kiểm tra được ngoai le dưới ngưỡng thấp nhất (16/30 = ineligible chac chan); tu 16/30 den 20/30 cần chọn ngành cụ thể để kết luận chính xác.',
  },
  {
    id: 'thanhdo-subject-combination-to-major-not-mapped',
    label: 'Trang chính thức liệt kê tổ hợp môn theo nhóm ngành trong file PDF "Thông tin tuyển sinh 2026" nhưng không rõ ràng theo từng ngành cụ thể (do lỗi định dạng bảng PDF) — thí sinh phải tự chọn tổ hợp và tự chọn đúng nhóm ngành (6 mức ngưỡng) khi dùng calculator exact.',
    status: 'incomplete',
    sourceId: 'thanhdo-admission-info-2026',
    scoreAffecting: false,
    impact: 'Calculator exact tính đúng công thức + ngưỡng theo nhóm ngành đã chọn, nhưng không tự xác thực tổ hợp môn có hợp lệ với ngành đó hay không.',
  },
  {
    id: 'thanhdo-priority-inclusion-judgment-call',
    label: 'Trang chính thức chỉ nêu "không tính điểm cộng" (loại điểm cộng), KHÔNG đề cập điểm ưu tiên khu vực/đối tượng — áp dụng mức điểm ưu tiên chuẩn toàn quốc theo Thông tư 06/2026/TT-BGDĐT làm judgment call (cùng tiền lệ LTVUni/PNTU/UHD).',
    status: 'official-but-unparsed',
    sourceId: 'thanhdo-cutoff-2026',
    scoreAffecting: false,
  },
  {
    id: 'thanhdo-transcript-aptitude-not-modeled',
    label: 'ThanhDo 2026 con co phương thức học bạ (18,0-20,0/30), thi danh gia năng lực/tư duy (HSA >=75/150, TSA >=50/100), va xét tuyển thẳng; chi phương thức thi TN THPT được mô hình hóa.',
    status: 'official-but-unparsed',
    sourceId: 'thanhdo-cutoff-2026',
  },
];
