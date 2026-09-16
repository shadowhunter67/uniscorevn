import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dhvKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dhv-priority-value-silent',
    label:
      'Ảnh công bố điểm chuẩn (dhv.edu.vn, 09/08/2026) KHÔNG tự công bố bảng mức điểm ưu tiên khu vực/đối tượng cụ thể. Dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho GIÁ TRỊ bảng (`priority.ts`), cùng tiền lệ DLA/BMTU/DNU/TUEBA/PVU/HTU/TUMP/NAEM/MKU/PYU.',
    status: 'incomplete',
    sourceId: 'dhv-cutoff-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng khung quốc gia hiện hành, không phải bảng riêng của trường (trường không công bố bảng riêng).',
  },
  {
    id: 'dhv-combinations-not-modeled',
    label:
      'DHV KHÔNG công bố tổ hợp môn xét tuyển riêng theo từng mã xét tuyển trong nguồn đã đọc được (chỉ nêu chung "tổ hợp môn xét tuyển tương ứng với từng ngành theo quy định của Bộ GD&ĐT và Nhà trường", không có bảng cụ thể) — module chấp nhận bất kỳ tổ hợp 3 môn nào người dùng chọn, không giới hạn theo mã xét tuyển.',
    status: 'incomplete',
    sourceId: 'dhv-cutoff-2026',
    scoreAffecting: false,
    impact: 'Không loại được tổ hợp không hợp lệ theo quy định thực tế của từng ngành (nếu có) — người dùng cần tự xác nhận tổ hợp mình chọn được ngành đó chấp nhận.',
  },
  {
    id: 'dhv-transcript-dgnl-methods-not-modeled',
    label:
      'Phương thức xét học bạ (Cách 1: Toán hoặc Ngữ văn + TB cả năm THPT × 2; Cách 2: theo tổ hợp môn) và phương thức xét ĐGNL ĐHQG-HCM (cùng công bố cột điểm trong ảnh điểm chuẩn) chưa được mô hình hoá; chỉ phương thức xét kết quả thi TN THPT được tính.',
    status: 'incomplete',
    sourceId: 'dhv-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng học bạ THPT hoặc điểm thi ĐGNL chưa tính được qua UniscoreVN cho DHV (dù điểm chuẩn đã công bố).',
  },
  {
    id: 'dhv-transcript-luat-condition-not-modeled',
    label:
      'Với Luật/Luật kinh tế, điểm chuẩn học bạ 20(*) kèm điều kiện phụ: "Kết quả học tập lớp 12 mức tốt; tổng điểm 03 môn thi tốt nghiệp THPT đạt 18,00 điểm trở lên; điểm TB môn Toán và Văn cấp THPT từ 6,00 trở lên" — điều kiện này chỉ áp dụng nhánh học bạ (chưa mô hình hoá), không ảnh hưởng nhánh thi TN THPT module này tính.',
    status: 'incomplete',
    sourceId: 'dhv-cutoff-2026',
    scoreAffecting: false,
    impact: 'Không ảnh hưởng kết quả nhánh thi TN THPT hiện có.',
  },
  {
    id: 'dhv-tiebreak-not-modeled',
    label: 'Không tìm thấy văn bản nêu tiêu chí phụ khi bằng điểm chuẩn ở phương thức thi TN THPT — module không mô hình hoá tiêu chí phụ cho trường hợp bằng điểm chuẩn.',
    status: 'incomplete',
    sourceId: 'dhv-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh có điểm xét tuyển đúng bằng điểm chuẩn có thể được báo "eligible" dù thực tế cần tiêu chí phụ khác (nếu có) để trúng tuyển — chỉ ảnh hưởng trường hợp biên đúng ngưỡng.',
  },
];
