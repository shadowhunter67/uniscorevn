import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const naemKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'naem-priority-value-silent',
    label:
      '`sources.ts:naem-priority-formula-2025` chỉ công bố CÔNG THỨC giảm dần điểm ưu tiên "[(30-Tổng điểm)/7,5] x Mức điểm ưu tiên", KHÔNG tự công bố bảng "Mức điểm ưu tiên" cụ thể theo khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`), cùng tiền lệ DNU/TUEBA/PVU/HUST.',
    status: 'incomplete',
    sourceId: 'naem-priority-formula-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số NAEM tự công bố riêng (trường không công bố số riêng).',
  },
  {
    id: 'naem-english-cert-conversion-not-modeled',
    label:
      '`sources.ts:naem-priority-formula-2025` có bảng quy đổi chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL iBT/APTIS ESOL/Cambridge Assessment English) sang điểm môn Tiếng Anh trong tổ hợp xét tuyển — module này KHÔNG mô hình hoá (không có field chuẩn tương ứng trong context xét tuyển, cùng tiền lệ nhiều trường khác bỏ qua quy đổi chứng chỉ tuỳ chọn).',
    status: 'incomplete',
    sourceId: 'naem-priority-formula-2025',
    scoreAffecting: true,
    impact: 'Thí sinh có chứng chỉ ngoại ngữ quốc tế không được quy đổi điểm môn Tiếng Anh khi tính qua UniscoreVN — vẫn phải nhập điểm thi TN THPT môn Tiếng Anh thực tế.',
  },
  {
    id: 'naem-other-methods-not-modeled',
    label:
      'NAEM 2025 còn phương thức xét học bạ THPT (mã 200), xét tuyển thẳng, và xét kết quả các kỳ thi riêng (ĐGTD/TSA của ĐH Bách khoa Hà Nội, ĐGNL/HSA của ĐHQG Hà Nội, SPT của trường khác) — module này CHỈ mô hình hoá phương thức xét kết quả thi TN THPT (mã 100).',
    status: 'incomplete',
    sourceId: 'naem-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng các phương thức khác chưa tính được qua UniscoreVN cho NAEM.',
  },
  {
    id: 'naem-no-signed-document-number',
    label:
      'Trang "Thông báo Điểm trúng tuyển..." và "Thông tin tuyển sinh đại học chính quy năm 2025" trên naem.edu.vn là bài tin tức, KHÔNG kèm số hiệu văn bản/bản PDF có chữ ký-con dấu (khác định dạng "Quyết định" của một số trường khác) — vẫn là nguồn CHÍNH CHỦ (tên miền trường), cùng dạng bằng chứng đã chấp nhận cho TUEBA/PVU/TNUT/HTU/DUMTP.',
    status: 'incomplete',
    sourceId: 'naem-threshold-2025',
    scoreAffecting: false,
    impact: 'Không ảnh hưởng số liệu — chỉ là ghi chú về định dạng bằng chứng.',
  },
];
