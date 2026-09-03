import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hbuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hbu-official-domain-unreachable',
    label:
      'Domain gốc daihochoabinh.edu.vn (bao gồm trang thông báo điểm trúng tuyển 2025 chính chủ) bị connection refused/timeout từ môi trường research (cả WebFetch lẫn chrome-devtools). Bảng điểm chuẩn dùng 2 nguồn báo/tổng hợp ĐỘC LẬP đăng lại thông báo gốc (tuyensinh247 + navigates.vn, cross-check thêm giaoduc.net.vn/Sforum), khớp TUYỆT ĐỐI 21/21 ngành — không đọc trực tiếp văn bản có chữ ký/con dấu của trường.',
    status: 'incomplete',
    sourceId: 'hbu-threshold-2025',
    scoreAffecting: false,
    impact: 'Điểm chuẩn dựa trên nguồn thứ cấp cross-check thay vì văn bản gốc trực tiếp — rủi ro thấp do 2+ nguồn độc lập khớp tuyệt đối, nhưng không phải xác nhận chính chủ 100%.',
  },
  {
    id: 'hbu-priority-table-national-judgment-call',
    label:
      'HBU KHÔNG tự công bố bảng mức điểm ưu tiên khu vực/đối tượng riêng — công thức "ĐXT = TĐ1 + ĐUT" chỉ dẫn chiếu "quy chế tuyển sinh hiện hành của Bộ Giáo dục và Đào tạo và của Trường". Dùng khung điểm ưu tiên quốc gia hiện hành (Điều 7 Thông tư 06/2025/TT-BGDĐT) làm judgment call cho GIÁ TRỊ bảng (`priority.ts`), cùng tiền lệ DLA/VTTU/TUEBA/PVU/HTU/TUMP/NAEM.',
    status: 'incomplete',
    sourceId: 'hbu-formula-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng khung quốc gia hiện hành thay vì bảng riêng của trường (trường không công bố bảng riêng).',
  },
  {
    id: 'hbu-design-majors-not-modeled',
    label:
      'HBU 2025 còn 3/21 ngành Thiết kế (Thiết kế đồ họa 7210403, Thiết kế nội thất 7580108, Thiết kế thời trang 7210404) dùng tổ hợp năng khiếu V00/V01/V02/V03 (môn "Vẽ") — không có SubjectId tương ứng trong hệ thống, và chú giải tổ hợp CHÍNH CHỦ còn thiếu định nghĩa V02/V03 (chỉ định nghĩa V00/V01). Không mô hình hoá.',
    status: 'incomplete',
    sourceId: 'hbu-combination-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển vào 3 ngành Thiết kế của HBU chưa tính được qua UniscoreVN.',
  },
  {
    id: 'hbu-chinese-combination-not-modeled',
    label:
      'Ngành Ngôn ngữ Trung Quốc (7220204) công bố 4 tổ hợp C00/C19/D14/D65 — D65 (Văn, Sử, Tiếng Trung) không mô hình hoá do "Tiếng Trung" không có SubjectId trong hệ thống. 3/4 tổ hợp còn lại (C00/C19/D14) vẫn tính được.',
    status: 'incomplete',
    sourceId: 'hbu-combination-2025',
    scoreAffecting: false,
    impact: 'Thí sinh Ngôn ngữ Trung Quốc chọn tổ hợp D65 (có môn Tiếng Trung) chưa tính được qua UniscoreVN; 3 tổ hợp còn lại vẫn tính bình thường.',
  },
  {
    id: 'hbu-other-methods-not-modeled',
    label: 'HBU 2025 còn phương thức 2 (xét học bạ THPT/tốt nghiệp Trung cấp-Cao đẳng-Đại học cùng nhóm ngành), phương thức 3 (điểm thi đánh giá năng lực của trường khác) và phương thức 4 (xét tuyển thẳng) — module này CHỈ mô hình hoá phương thức 1 (xét kết quả thi TN THPT).',
    status: 'incomplete',
    sourceId: 'hbu-formula-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng học bạ, ĐGNL của trường khác, hoặc xét tuyển thẳng chưa tính được qua UniscoreVN cho HBU.',
  },
];
