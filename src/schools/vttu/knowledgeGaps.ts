import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vttuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vttu-priority-table-national-judgment-call',
    label:
      'VTTU KHÔNG tự công bố bảng mức điểm ưu tiên khu vực/đối tượng riêng — công thức "Điểm xét tuyển = Đ1+Đ2+Đ3+ĐƯT" chỉ định nghĩa "ĐƯT là điểm ưu tiên khu vực và điểm ưu tiên đối tượng của thí sinh" mà không cho bảng mức cụ thể. Dùng khung điểm ưu tiên quốc gia hiện hành (Điều 7 Thông tư 06/2025/TT-BGDĐT) làm judgment call cho GIÁ TRỊ bảng (`priority.ts`), cùng tiền lệ DLA/TUEBA/PVU/HTU/TUMP/NAEM.',
    status: 'incomplete',
    sourceId: 'vttu-formula-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng khung quốc gia hiện hành thay vì bảng riêng của trường (trường không công bố bảng riêng).',
  },
  {
    id: 'vttu-hocba-branch-not-modeled',
    label:
      'VTTU 2025 còn nhánh xét kết quả học tập THPT (học bạ, mã 200) quy đổi tương đương sang thang điểm thi TN THPT bằng phương pháp bách phân vị (percentile equating) — ảnh "HƯỚNG DẪN QUY ĐỔI TƯƠNG ĐƯƠNG" công bố đầy đủ bảng quy đổi theo 8 mốc phân vị (5%/10%/.../90%/>90%). Không mô hình hoá nhánh này: (1) cần biết mốc phân vị của thí sinh trong phân bố điểm học bạ toàn quốc — dữ liệu phân bố không công khai; (2) một dòng trong bảng công bố (mốc 70%, "22,8<x≤24,0") có khoảng điểm học bạ CHỒNG CHÉO với dòng mốc 60% ("23,4<x≤24,0") — nghi vấn lỗi in ấn/OCR trong chính tài liệu gốc, không đủ tin cậy để mô hình hoá là "exact" mà không xác nhận lại được với trường.',
    status: 'incomplete',
    sourceId: 'vttu-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng học bạ THPT (mã 200/407/409) chưa tính được qua UniscoreVN cho VTTU (dù công thức + bảng quy đổi đã công bố công khai).',
  },
  {
    id: 'vttu-other-methods-not-modeled',
    label: 'VTTU 2025 còn phương thức mã 409 (kết hợp điểm thi TN THPT với chứng chỉ ngoại ngữ) và mã 411 (thí sinh tốt nghiệp THPT nước ngoài) — module này CHỈ mô hình hoá nhánh xét trực tiếp kết quả thi TN THPT (mã 100/101).',
    status: 'incomplete',
    sourceId: 'vttu-combination-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng chứng chỉ ngoại ngữ hoặc bằng tốt nghiệp nước ngoài chưa tính được qua UniscoreVN cho VTTU.',
  },
];
