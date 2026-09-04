import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hvuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hvu-scheme-signed-before-exam-threshold-pending',
    label:
      'Quyết định 226/QĐ-ĐHHV ký 09/3/2026 (trước kỳ thi TN THPT 2026) tự ghi rõ "Ngưỡng đảm bảo chất lượng đầu vào được xác định SAU KHI có kết quả thi tốt nghiệp THPT năm 2026" cho phương thức TS01/TS04 — PDF gốc này KHÔNG tự chứa điểm chuẩn/ngưỡng cuối cùng. Điểm chuẩn thực tế dùng trong `thresholds.ts` lấy từ thông báo điểm trúng tuyển đợt 1 công bố tháng 8/2026 (`sources.ts:hvu-threshold-2026`), tách biệt về nguồn với Quyết định 226 (chỉ cung cấp công thức/tổ hợp).',
    status: 'incomplete',
    sourceId: 'hvu-admission-scheme-2026',
    scoreAffecting: false,
    impact: 'Không ảnh hưởng tính đúng của module (đã dùng điểm chuẩn thực tế công bố sau kỳ thi), chỉ là ghi chú về trình tự 2 nguồn khác thời điểm.',
  },
  {
    id: 'hvu-priority-table-national-judgment-call',
    label:
      'HVU KHÔNG tự công bố bảng mức điểm ưu tiên khu vực/đối tượng riêng — Quyết định 226 mục 5.2 chỉ dẫn chiếu "Quy chế tuyển sinh hiện hành". Dùng khung điểm ưu tiên quốc gia hiện hành (Điều 7 Thông tư 06/2026/TT-BGDĐT, đọc trực tiếp PDF gốc) làm judgment call cho GIÁ TRỊ bảng (`priority.ts`), cùng tiền lệ HBU/VTTU/DLA/PVU/HTU/TUMP/NAEM.',
    status: 'incomplete',
    sourceId: 'hvu-admission-scheme-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng khung quốc gia hiện hành thay vì bảng riêng của trường (trường không công bố bảng riêng).',
  },
  {
    id: 'hvu-talent-majors-not-modeled',
    label:
      'HVU 2026 còn 4/27 ngành năng khiếu (Giáo dục Mầm non 7140201, Giáo dục Thể chất 7140206, Sư phạm Âm nhạc 7140221, Sư phạm Mỹ thuật 7140222) dùng thang điểm 40 (hệ số 2 cho môn năng khiếu: NK GDMN/NK GDTC/NK ÂN/NK MT) — các môn năng khiếu này không có SubjectId tương ứng trong hệ thống. Không mô hình hoá.',
    status: 'incomplete',
    sourceId: 'hvu-admission-scheme-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển vào 4 ngành năng khiếu của HVU chưa tính được qua UniscoreVN.',
  },
  {
    id: 'hvu-supplementary-round-majors-not-modeled',
    label:
      '5/27 ngành (Ngôn ngữ Anh 7220201, Thú y 7640101, Công nghệ thông tin 7480201, Khoa học cây trồng 7620110, Chăn nuôi 7620105) CHƯA có điểm chuẩn đợt 1 chốt tính đến 09/08/2026 — nguồn `hvu-threshold-2026` ghi rõ trường "dự kiến sẽ tiếp tục tổ chức tuyển bổ sung" cho các ngành này. Không đủ dữ liệu điểm chuẩn để mô hình hoá.',
    status: 'incomplete',
    sourceId: 'hvu-threshold-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển vào 5 ngành này chưa tính được qua UniscoreVN cho tới khi có thông báo điểm chuẩn đợt bổ sung.',
  },
  {
    id: 'hvu-remaining-majors-rounded-secondary-only',
    label:
      '11/27 ngành còn lại (Điều dưỡng, Công tác xã hội, Quản trị dịch vụ Du lịch và Lữ hành, Du lịch, Ngôn ngữ Trung Quốc, Kế toán, Quản trị kinh doanh, Tài chính - Ngân hàng, Kinh tế, Công nghệ Kỹ thuật cơ khí, Công nghệ Kỹ thuật điện điện tử) chỉ có số liệu điểm chuẩn đợt 1 năm 2026 từ nguồn thứ cấp GỘP NHÓM theo khoảng làm tròn (vd nhiều ngành cùng ghi "18 điểm") — không đủ độ chính xác theo TỪNG ngành cụ thể để đảm bảo đúng số. Không mô hình hoá để tránh dùng số liệu ước lượng; có thể bổ sung khi tìm được bảng điểm chuẩn CHÍNH CHỦ chi tiết theo ngành.',
    status: 'incomplete',
    sourceId: 'hvu-threshold-secondary-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển vào 11 ngành này chưa tính được qua UniscoreVN — chờ nguồn chính chủ/chi tiết hơn.',
  },
  {
    id: 'hvu-other-methods-not-modeled',
    label:
      'HVU 2026 còn 6 phương thức khác (TS02 xét học bạ, TS03 kết hợp học bạ + chứng chỉ quốc tế, TS04 thi TN THPT + năng khiếu, TS05 học bạ + năng khiếu, TS06 xét tuyển thẳng/ưu tiên xét tuyển, TS07 dự bị đại học/cử tuyển) — module này CHỈ mô hình hoá TS01 (xét kết quả thi TN THPT).',
    status: 'incomplete',
    sourceId: 'hvu-admission-scheme-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng học bạ, chứng chỉ quốc tế, năng khiếu, xét tuyển thẳng, hoặc cử tuyển chưa tính được qua UniscoreVN cho HVU.',
  },
];
