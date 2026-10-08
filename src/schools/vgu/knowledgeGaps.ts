import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vguKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vgu-program-threshold-table-not-imported',
    label: 'VGU công bố điểm sàn riêng theo từng ngành (17-22/30); đã nhập tu báo chí (SGGP) vi ban công bố chính thức (tuyensinh.vgu.edu.vn) chi hien anh bảng điểm, không doc được văn bản.',
    status: 'official-but-unparsed',
    sourceId: 'vgu-floor-score-press-2026',
    scoreAffecting: true,
    knownData: [
      '22/30: Ky thuat co dien tu (Mechatronics Engineering)',
      '19/30: Quan tri kinh doanh, Tai chinh & Ke toan, Khoa học may tinh, Kỹ thuật co khi, Kinh tế, Quan ly kỹ thuật so & Kinh doanh quốc tế',
      '18,5/30: Ky thuat dien va May tinh',
      '18/30: Kien truc',
      '17/30: Ky thuat va Quan ly xay dung',
    ],
    impact: 'Runtime chi loai được hồ sơ dưới 17/30 va xác nhận dat tren 22/30 (moi ngành); giữa 17/30 va 22/30 cần chọn ngành để kết luận chính xác.',
    attemptedSources: [
      '2026-08-28: WebFetch lai trang chính thức VGU (tuyensinh.vgu.edu.vn) — van chi co text tổng hop "điểm sàn dao động 17-22 tuy ngành", bằng so lieu từng ngành van chi la anh nhung, không doc được text; không tim thay ban công bố moi hon 09/07/2026.',
    ],
  },
  {
    id: 'vgu-floor-includes-priority-points',
    label: 'VGU công bố điểm sàn "da bao gồm điểm ưu tiên va điểm cộng (nêu co)" — khác voi cach các trường khác công bố điểm sàn THPT thuan (chưa cóng điểm ưu tiên). Bo tính điểm hien chi cong 3 môn THPT tho, chưa cóng điểm ưu tiên/khu vực, nen so sanh voi ngưỡng VGU co the chưa chính xác tuyet doi cho thí sinh co điểm ưu tiên.',
    status: 'official-but-unparsed',
    sourceId: 'vgu-floor-score-press-2026',
    impact: 'Ket qua eligibility co the bi danh gia thấp hơn thuc te đối với thí sinh co điểm ưu tiên khu vực/đối tượng.',
  },
  {
    id: 'vgu-english-score-condition-not-modeled',
    label: 'VGU yeu cau điểm trung bình môn Tiếng Anh 3 năm THPT >= 8,0/10 (hoặc >=7,5 cho Kỹ thuật & Quan ly xây dựng) áp dụng cho phương thức 2 (học bạ) va 5 (thi TN THPT); điều kiện nay chưa được kiểm tra trong bo tính điểm.',
    status: 'official-but-unparsed',
    sourceId: 'vgu-admission-notice-2026',
  },
  {
    id: 'vgu-other-methods-not-modeled',
    label: 'VGU con 4 phương thức khác: TestAS (phương thức 1), học bạ THPT (phương thức 2, GPA 7,3-8,45), chung chi THPT quốc tế SAT/ACT/IB/A-Level/GED (phương thức 4: SAT>=1150, ACT>=23, IB>=28) va xét tuyển thẳng (phương thức 3); chi phương thức 5 (thi TN THPT) được mô hình hóa.',
    status: 'official-but-unparsed',
    sourceId: 'vgu-admission-notice-2026',
  },
];
