import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const thanhdoKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'thanhdo-program-threshold-table-not-imported',
    label: 'ThanhDo 2026 cong bo diem chuan thi TN THPT rieng cho tung nganh (16,0-20,0/30, 14 nganh); chua chon duoc nganh cu the de ap dung dung muc.',
    status: 'official-but-unparsed',
    sourceId: 'thanhdo-cutoff-2026',
    scoreAffecting: true,
    knownData: [
      'Muc thap nhat 16,0/30: Ke toan, Quan tri Van phong, Quan tri Khach san, Viet Nam hoc, Giao duc hoc',
      'Muc 16,5/30: Quan tri kinh doanh',
      'Muc 17,0/30: Cong nghe ky thuat O to, Ngon ngu Anh',
      'Muc 17,5/30: CNTT, Cong nghe ky thuat Dien-Dien tu, Ngon ngu Trung Quoc',
      'Muc 18,0/30: Dieu duong',
      'Muc cao nhat 20,0/30: Luat, Duoc hoc',
    ],
    impact: 'Runtime chi kiem tra duoc ngoai le duoi nguong thap nhat (16/30 = ineligible chac chan); tu 16/30 den 20/30 can chon nganh cu the de ket luan chinh xac.',
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
    label: 'ThanhDo 2026 con co phuong thuc hoc ba (18,0-20,0/30), thi danh gia nang luc/tu duy (HSA >=75/150, TSA >=50/100), va xet tuyen thang; chi phuong thuc thi TN THPT duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'thanhdo-cutoff-2026',
  },
];
