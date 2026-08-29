import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hauiKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'haui-other-methods-not-modeled',
    label:
      'HAUI còn phương thức 2 (học sinh giỏi cấp tỉnh/chứng chỉ quốc tế kết hợp học bạ), phương thức 4 (ĐGNL ĐHQGHN/HSA quy đổi) và phương thức 5 (ĐGTD HUST/TSA quy đổi) — nguồn công bố công thức quy đổi 1:1 sang phương thức 3 nhưng CHƯA chuẩn hoá vào runtime trong batch này.',
    status: 'official-but-unparsed',
    sourceId: 'haui-threshold-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ tính được phương thức 3 (xét điểm thi TN THPT).',
  },
  {
    id: 'haui-priority-table-value-silent',
    label:
      'Mục ngưỡng phương thức 3 KHÔNG nhắc điểm ưu tiên khu vực/đối tượng (khác mục phương thức 2/4/5, nơi công thức ghi rõ "+ Điểm ưu tiên") — nhánh exact áp judgment call chuẩn quốc gia (Điều 7 Thông tư 08/2022/TT-BGDĐT) cho GIÁ TRỊ bảng ưu tiên khi hiển thị Điểm xét tuyển, cùng tiền lệ CTU/UTC/UTM/PTIT/HUB/TGU/UTT.',
    status: 'incomplete',
    sourceId: 'haui-threshold-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên dùng judgment call cho giá trị bảng, không phải số HAUI tự công bố cho mục này — mức điểm điều kiện đăng ký xét tuyển vẫn so với tổng thô (không cộng ưu tiên) nên không ảnh hưởng tới kết luận đạt/không đạt ngưỡng.',
  },
  {
    id: 'haui-nonstandard-combination-codes-unmodeled',
    label:
      'Bảng ngưỡng dùng 21 mã tổ hợp, trong đó B03, C03, D04, D06, D08, D14, D15, DD2 (môn ngoại ngữ Trung/Nhật/Hàn hoặc thành phần có nguồn thứ cấp mâu thuẫn) và 4 ký hiệu riêng của trường (X05, X06, X07, X25 — thành phần không công bố trong thông báo này) CHƯA được thêm vào danh mục tổ hợp chung (`core/subjects.ts`) — chỉ A00, A01, A02, B00, C01, C02, C04, D01, D07 khả dụng để người dùng chọn. Nhánh exact KHÔNG validate tổ hợp đã chọn có thuộc danh sách hợp lệ của ngành hay không.',
    status: 'official-but-unparsed',
    sourceId: 'haui-threshold-2026',
    scoreAffecting: false,
    impact: 'Một số ngành (đặc biệt khối Kỹ thuật/CNTT dùng X06/X07, và Dệt may dùng X05) chưa chọn được tổ hợp đúng trong UniscoreVN nếu thí sinh không thi theo A00/A01/A02 sẵn có.',
  },
  {
    id: 'haui-vi-mach-ban-dan-provisional',
    label: 'Mã 74801081 (Vi mạch bán dẫn) có mức điểm ghi "dự kiến* ≥ 18,00" — mức chính thức và điều kiện bổ sung (nếu có) chờ hướng dẫn của Bộ GD&ĐT, chưa công bố tại thời điểm research.',
    status: 'official-but-unparsed',
    sourceId: 'haui-threshold-2026',
    scoreAffecting: true,
    impact: 'Kết quả cho mã 74801081 có thể thay đổi khi HAUI công bố mức điểm chính thức.',
  },
];
