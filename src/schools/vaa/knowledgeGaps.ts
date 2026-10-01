import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vaaKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vaa-bonus-points-not-modeled',
    label:
      'VAA cộng điểm cho thí sinh đạt giải HSG/KHKT (mục 2.3: 3 / 1,5 / 1 / 0,5 điểm theo thang 30) và điểm trúng tuyển công bố "đã có điểm cộng, điểm quy đổi từ chứng chỉ ngoại ngữ" — điểm cộng và quy đổi chứng chỉ chưa mô hình hoá, mô hình chỉ tính trên điểm thi TN THPT thô + điểm ưu tiên.',
    status: 'incomplete',
    sourceId: 'vaa-notice-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có giải thưởng hoặc chứng chỉ ngoại ngữ quy đổi sẽ thấy Điểm xét thấp hơn thực tế.',
  },
  {
    id: 'vaa-foreign-language-subject-not-modeled',
    label:
      'Ngành Ngôn ngữ Hàn Quốc được chọn Tiếng Hàn và Ngôn ngữ Trung Quốc được chọn Tiếng Trung làm môn ngoại ngữ (nhân 3) — hệ thống chưa có SubjectId tương ứng, mô hình chỉ dùng Tiếng Anh cho nhóm TA01/TA02.',
    status: 'incomplete',
    sourceId: 'vaa-notice-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét Ngôn ngữ Hàn/Trung bằng môn Tiếng Hàn/Tiếng Trung chưa tính được qua UniscoreVN.',
  },
  {
    id: 'vaa-language-condition-not-checked',
    label:
      'Các ngành Ngôn ngữ và chương trình học bằng Tiếng Anh (nhóm TA01/TA02) có tiêu chí phụ về điều kiện Ngoại ngữ khi xét tuyển; UniscoreVN không kiểm tra điều kiện này, chỉ so điểm xét với điểm trúng tuyển. Ngưỡng đầu vào (15–20/30 tuỳ ngành) cũng không kiểm tra riêng vì thấp hơn điểm trúng tuyển.',
    status: 'incomplete',
    sourceId: 'vaa-cutoff-2026',
    scoreAffecting: false,
    impact: 'Kết quả "đạt điểm trúng tuyển" chưa bao gồm điều kiện ngoại ngữ phụ của các ngành này.',
  },
  {
    id: 'vaa-other-methods-not-modeled',
    label:
      'VAA còn xét tuyển bằng học bạ (cùng công thức hệ số 3/2/1, nhưng dùng điểm TB 3 năm và điểm trúng tuyển riêng), điểm ĐGNL ĐHQG-HCM/Hà Nội, SAT/ACT/IB và xét tuyển thẳng; chỉ phương thức thi TN THPT (PT1) được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'vaa-notice-2026',
  },
];
