import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnuhusKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnuhus-priority-value-silent',
    label:
      'Nguồn xác nhận trực tiếp điểm chuẩn = "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có", nhưng KHÔNG công bố mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'vnuhus-threshold-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số VNU-HUS tự công bố.',
  },
  {
    id: 'vnuhus-x-combos-not-modeled',
    label:
      'Trường công bố thêm nhiều tổ hợp riêng có môn Tin học/Công nghệ Công nghiệp/Công nghệ Nông nghiệp (X02/X05/X06/X09-X16/X21/X25/X26) và các môn A04/A05/A06/B01/B02/D20 cho từng ngành — taxonomy môn dùng chung của app chưa mô hình hoá các tổ hợp này (chỉ modeled A00/A01/A02/A07/B00/B03/B08/C01/C02/C04/D01/D07/D08/D09/D10/X01) — KHÔNG ảnh hưởng điểm chuẩn (giống nhau giữa mọi tổ hợp trong 1 ngành) nhưng thí sinh CHỈ thi các tổ hợp chưa modeled chưa tính được qua UniscoreVN.',
    status: 'official-but-unparsed',
    sourceId: 'vnuhus-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh chỉ thi tổ hợp X-series/A04-A06/B01-B02/D20 chưa chọn được tổ hợp trong UniscoreVN cho VNU-HUS.',
  },
  {
    id: 'vnuhus-internal-code',
    label:
      'Mã ngành dùng mã xét tuyển chính thức của trường (QHT01-QHT99) — KHÔNG phải mã ngành đào tạo chuẩn quốc gia (Bộ GD&ĐT) vì một số ngành (Khoa học dữ liệu, Công nghệ Bán dẫn...) là chương trình mới, mã 7 số chưa phổ biến/xác minh được.',
    status: 'official-but-unparsed',
    sourceId: 'vnuhus-threshold-2025',
    scoreAffecting: false,
    impact: 'Mã ngành hiển thị là mã của trường, không dùng để tra cứu chéo với mã ngành Bộ GD&ĐT.',
  },
  {
    id: 'vnuhus-primary-source-image-only',
    label:
      'Nguồn gốc chính thức (hus.vnu.edu.vn, xaydungchinhsach.chinhphu.vn) xác nhận có thông báo điểm chuẩn nhưng bảng số liệu chỉ hiển thị dạng ẢNH, không trích xuất được bằng text extraction thông thường — số liệu dùng trong runtime lấy từ tuyensinh247 (đăng lại bảng dạng text), cross-check dải điểm với Đại biểu Nhân dân.',
    status: 'official-but-unparsed',
    sourceId: 'vnuhus-threshold-2025',
    scoreAffecting: false,
    impact: 'Độ tin cậy số liệu dựa trên báo đăng lại thay vì đọc trực tiếp văn bản/ảnh gốc của trường.',
  },
];
