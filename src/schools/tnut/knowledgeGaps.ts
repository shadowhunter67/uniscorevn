import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tnutKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tnut-priority-value-silent',
    label:
      'Mục 1.2.1 "Điểm xét tuyển" của Hướng dẫn xét tuyển 2025 chỉ định nghĩa "điểm ƯT ... được tính theo quy chế tuyển sinh hiện hành" (Văn bản hợp nhất 02/VBHN-BGDĐT ngày 02/4/2025), KHÔNG tự công bố mức điểm ưu tiên cụ thể theo khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`), cùng tiền lệ TUEBA/PVU/HUST/DNU/TUMP.',
    status: 'incomplete',
    sourceId: 'tnut-huongdan-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số TNUT tự công bố riêng (trường không công bố số riêng).',
  },
  {
    id: 'tnut-a10-d84-freelance-not-modeled',
    label:
      'Nhóm ngành Quản lý công nghiệp/Kinh tế công nghiệp (mã xét tuyển QLC, QLC1, KCN) còn 2 tổ hợp A10, D84 dành RIÊNG cho "thí sinh tự do tốt nghiệp trước năm 2025" (`sources.ts:tnut-nganh-chitieu-2025`) — module này KHÔNG mô hình hoá 2 tổ hợp này (không có input phân biệt "thí sinh tự do" trong `ApplicantProfile`, và tổ hợp A10 chưa có trong `COMMON_SUBJECT_COMBINATIONS`).',
    status: 'incomplete',
    sourceId: 'tnut-nganh-chitieu-2025',
    scoreAffecting: false,
    impact: 'Thí sinh tự do tốt nghiệp trước 2025 muốn dùng tổ hợp A10/D84 cho nhóm ngành Quản lý/Kinh tế công nghiệp chưa tính được qua UniscoreVN cho TNUT.',
  },
  {
    id: 'tnut-other-methods-not-modeled',
    label: 'TNUT 2025 còn phương thức xét học bạ THPT (mục 1.2.2), xét tuyển theo kết quả V-SAT trên máy tính (mục 1.2.3), và xét tuyển thẳng theo Quy chế tuyển sinh của Bộ GD&ĐT (mục 1.2.4) — module này CHỈ mô hình hoá phương thức xét kết quả thi TN THPT.',
    status: 'incomplete',
    sourceId: 'tnut-huongdan-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng các phương thức khác chưa tính được qua UniscoreVN cho TNUT.',
  },
  {
    id: 'tnut-mangnhanh-code-not-collected',
    label: 'Mã ngành đào tạo chính thức (7 chữ số, mã cổng thông tin BGD&ĐT) của từng mã xét tuyển chưa được thu thập đầy đủ cho toàn bộ 26 mã trong `thresholds.ts` — module dùng MÃ XÉT TUYỂN (CBM, CDK, ...) làm khoá chính thay vì mã ngành 7 chữ số.',
    status: 'incomplete',
    sourceId: 'tnut-nganh-chitieu-2025',
    scoreAffecting: false,
    impact: 'Không ảnh hưởng kết quả tính điểm — chỉ ảnh hưởng cách hiển thị/tra cứu ngành theo mã ngành chuẩn nếu UI cần trong tương lai.',
  },
];
