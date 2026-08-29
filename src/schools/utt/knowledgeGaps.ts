import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const uttKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'utt-other-methods-not-modeled',
    label: 'UTT còn các phương thức khác (xét tuyển thẳng, học bạ, ĐGTD/TSA, ĐGNL/HSA/SPT) chưa được chuẩn hoá vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'utt-threshold-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra được ngưỡng cho phương thức xét điểm thi TN THPT.',
  },
  {
    id: 'utt-priority-table-value-silent',
    label:
      'Thông báo ngưỡng UTT 2026 xác nhận công thức "Tổng 3 môn + Điểm ưu tiên (Khu vực, Đối tượng)" và ngưỡng đã bao gồm điểm ưu tiên, nhưng KHÔNG in bảng mức điểm KV/ĐT cụ thể — nhánh exact áp judgment call chuẩn quốc gia (Điều 7 Thông tư 08/2022/TT-BGDĐT) cho GIÁ TRỊ bảng, cùng tiền lệ CTU/UTC/UTM/PTIT/HUB.',
    status: 'incomplete',
    sourceId: 'utt-threshold-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên dùng judgment call cho giá trị bảng, không phải số UTT tự công bố — nếu UTT sau này công bố bảng riêng thì phải cập nhật lại.',
  },
  {
    id: 'utt-program-combination-mapping-not-imported',
    label:
      'Thông báo ngưỡng không công bố tổ hợp môn xét tuyển cụ thể theo từng mã ngành (chỉ nêu chung "theo tổ hợp xét tuyển, hoặc Toán + Ngữ văn + 1 môn khác") — nhánh exact không validate tổ hợp có hợp lệ với ngành đã chọn hay không, người dùng tự chịu trách nhiệm chọn tổ hợp đúng theo đề án tuyển sinh chi tiết của UTT.',
    status: 'official-but-unparsed',
    sourceId: 'utt-threshold-2026',
    scoreAffecting: false,
    impact: 'Không chặn tính điểm nhưng không tự phát hiện được tổ hợp sai với ngành.',
  },
  {
    id: 'utt-law-rail-chip-additional-moet-condition-unparsed',
    label:
      'Ngành Vi mạch bán dẫn, Luật, Đường sắt (tốc độ cao/đô thị) có thêm ghi chú "phải đảm bảo mức điểm và các điều kiện bổ sung (nếu có) theo quy định của Bộ Giáo dục và Đào tạo" — không nêu chi tiết điều kiện bổ sung, không rõ có ảnh hưởng tới điểm xét tuyển hay chỉ là điều kiện phụ (sức khoẻ, chứng chỉ...).',
    status: 'official-but-unparsed',
    sourceId: 'utt-threshold-2026',
    scoreAffecting: false,
    impact: 'Điểm sàn/công thức các ngành này vẫn tính đúng theo bảng đã công bố; điều kiện bổ sung (nếu có, không score-affecting theo hiểu biết hiện tại) thí sinh cần tự tra cứu thêm.',
  },
];
