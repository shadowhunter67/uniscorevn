import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const mkuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'mku-priority-value-silent',
    label:
      'Quyết định 3018/QĐ-ĐHCL và Thông báo 2613/TB-ĐHCL đều KHÔNG tự công bố bảng mức điểm ưu tiên khu vực/đối tượng cụ thể (chỉ dẫn chiếu Thông tư 06/2026/TT-BGDĐT ở phần căn cứ). Dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho GIÁ TRỊ bảng (`priority.ts`), cùng tiền lệ DLA/BMTU/DNU/TUEBA/PVU/HTU/TUMP/NAEM.',
    status: 'incomplete',
    sourceId: 'mku-cutoff-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng khung quốc gia hiện hành, không phải bảng riêng của trường (trường không công bố bảng riêng).',
  },
  {
    id: 'mku-health-cluster-not-modeled',
    label:
      'MKU tuyển 42 ngành đại học chính quy — module CHỈ mô hình hoá 33/42 ngành KHÔNG thuộc khối sức khỏe. 9 ngành khối sức khỏe (Y khoa, Y học cổ truyền, Răng - Hàm - Mặt, Dược học, Kỹ thuật hình ảnh y học, Hộ sinh, Kỹ thuật xét nghiệm y học, Kỹ thuật phục hồi chức năng, Điều dưỡng) có điểm chuẩn 18,0-22,0/30 kèm ngưỡng riêng theo Quyết định 1962/QĐ-BGDĐT (khối ngành sức khỏe có cấp giấy phép hành nghề) — chưa đối chiếu điều kiện phụ (nếu có) nên chưa mô hình hoá để tránh rủi ro gán sai điều kiện xét tuyển khối sức khỏe.',
    status: 'incomplete',
    sourceId: 'mku-cutoff-2026',
    scoreAffecting: false,
    knownData: [
      'Y khoa (7720101): 22,0/30',
      'Y học cổ truyền (7720115): 20,0/30',
      'Răng - Hàm - Mặt (7720501): 22,0/30',
      'Dược học (7720201): 20,0/30',
      'Kỹ thuật hình ảnh y học/Hộ sinh/Kỹ thuật xét nghiệm y học/Kỹ thuật phục hồi chức năng/Điều dưỡng: 18,0/30',
    ],
    impact: '9/42 ngành MKU (toàn bộ khối sức khỏe) chưa tính được qua UniScoreVN.',
  },
  {
    id: 'mku-combinations-not-modeled',
    label:
      'MKU công bố nhiều tổ hợp môn hơn số combo hiện có trong `COMMON_SUBJECT_COMBINATIONS` — các mã A03 (Toán, Vật lý, Sử), X04 (Toán, Văn, Công nghệ nông nghiệp), X08 (Toán, Vật Lý, Công nghệ nông nghiệp), X12 (Toán, Hóa, Công nghệ nông nghiệp), X16 (Toán, Sinh, Công nghệ nông nghiệp), X17 (Toán, Sử, GDKT&PL), A10 (Toán, Vật Lý, GDCD), C07 (Văn, Vật lý, Sử) chưa có SubjectId/combo tương ứng trong hệ thống — riêng X10 của MKU ("Toán, Tin học, Công nghệ CN") KHÁC thành phần môn với combo X10 đã có sẵn trong hệ thống ("Toán, Hóa, Tin học", thêm từ PVU 2026) nên bị loại để tránh xung đột mã tổ hợp giữa 2 trường. Không mô hình hoá các tổ hợp này cho bất kỳ ngành nào.',
    status: 'incomplete',
    sourceId: 'mku-admission-notice-2026',
    scoreAffecting: false,
    impact: 'Thí sinh chỉ đủ điều kiện ở các tổ hợp trên (dùng môn Công nghệ nông nghiệp, hoặc trùng mã X10 khác thành phần) chưa tính được ở MKU trên UniScoreVN — mỗi ngành vẫn còn ít nhất 6-9 tổ hợp phổ biến khác dùng được.',
  },
  {
    id: 'mku-other-methods-not-modeled',
    label: 'MKU 2026 còn 2 phương thức khác đã công bố điểm chuẩn song song trong cùng Quyết định 3018/QĐ-ĐHCL: xét kết quả học tập bậc THPT (học bạ, thang 30, flat 18,0 cho 30/33 ngành đã mô hình hoá, 22,0 khối Luật) và xét điểm thi V-SAT (thang riêng, flat 225 cho 30/33 ngành, 250 khối Luật) — module này CHỈ mô hình hoá nhánh xét kết quả thi TN THPT.',
    status: 'incomplete',
    sourceId: 'mku-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng học bạ THPT hoặc điểm thi V-SAT chưa tính được qua UniscoreVN cho MKU (dù điểm chuẩn đã công bố).',
  },
  {
    id: 'mku-tiebreak-not-modeled',
    label: 'Không tìm thấy văn bản nêu tiêu chí phụ khi bằng điểm chuẩn ở phương thức thi TN THPT — module không mô hình hoá tiêu chí phụ cho trường hợp bằng điểm chuẩn.',
    status: 'incomplete',
    sourceId: 'mku-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh có điểm xét tuyển đúng bằng điểm chuẩn có thể được báo "eligible" dù thực tế cần tiêu chí phụ khác (nếu có) để trúng tuyển — chỉ ảnh hưởng trường hợp biên đúng ngưỡng.',
  },
];
