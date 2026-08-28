import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tbuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tbu-law-pt1-threshold-not-fixed',
    label:
      'Ngành Luật (PT1 — xét kết quả thi TN THPT) không có ngưỡng cố định do TBU tự công bố — Thông báo 565/TB-ĐHTB Ghi chú (b) mục 5 xác nhận rõ ngưỡng do Bộ GD&ĐT phối hợp Bộ Tư pháp quyết định hàng năm. Con số 18,00 + học lực giỏi chỉ áp dụng cho PT2/PT3/PT5 (không phải PT1).',
    status: 'incomplete',
    sourceId: 'tbu-thongbao-565-2026',
    scoreAffecting: true,
    knownData: ['PT2/PT3/PT5 - Luật: tổng 3 môn ≥18,00 VÀ học lực lớp 12 xếp loại giỏi trở lên (điều kiện AND, không phải chỉ ngưỡng điểm)'],
    impact: 'Nhánh exact chỉ áp dụng cho các ngành trừ Luật ở PT1; ngành Luật PT1 trả kết quả unknown thay vì áp nhầm một con số không có căn cứ.',
  },
  {
    id: 'tbu-program-mapping-not-imported',
    label: 'Danh mục 18 ngành cụ thể và tổ hợp môn tương ứng (Thông báo 565/TB-ĐHTB, trang 4-5) chưa import đầy đủ vào runtime — thí sinh vẫn tự chọn nhóm ngành (Luật/khác) và tổ hợp môn.',
    status: 'official-but-unparsed',
    sourceId: 'tbu-thongbao-565-2026',
    scoreAffecting: false,
    impact: 'Runtime chỉ kiểm tra được ngưỡng theo nhóm ngành do người dùng tự chọn.',
  },
  {
    id: 'tbu-conversion-methods-not-modeled',
    label: 'PT3 (ĐGNL ĐHQGHN), PT4 (ĐGTD ĐHBKHN), PT5 (ĐGNL ĐHSPHN) và bảng quy đổi kết quả về thang 30 chưa được model — chỉ PT1 (thi TN THPT) được model.',
    status: 'incomplete',
    sourceId: 'tbu-thongbao-565-2026',
    scoreAffecting: true,
    impact: 'Thí sinh xét tuyển bằng PT2-PT5 chưa kiểm tra được ở TBU trên UniScoreVN.',
  },
  {
    id: 'tbu-bonus-hsg-award-not-modeled',
    label:
      'Bảng điểm cộng mục 4.2 (Thông báo 565/TB-ĐHTB) có nhánh giải HSG cấp tỉnh/thành (Nhất 1,00/Nhì 0,75/Ba 0,50) và các trường hợp Điều 8 TT06 (mục 4.2.1-4.2.3) — KHÔNG model vì `ApplicantProfile` chưa có input field cho loại thành tích này (chỉ có `certificates.ielts` cho nhánh IELTS).',
    status: 'incomplete',
    sourceId: 'tbu-thongbao-565-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có giải HSG cấp tỉnh/thành sẽ được tính điểm cộng thấp hơn thực tế (chỉ tính nhánh IELTS).',
  },
];
