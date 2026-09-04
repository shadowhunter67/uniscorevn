import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hvuAdmissionMethods } from './methods';

export const hvuModule: SchoolModule = {
  id: 'hvu',
  name: 'Trường Đại học Hùng Vương',
  shortName: 'HVU',
  about:
    'Trường đại học công lập trực thuộc UBND tỉnh Phú Thọ (mã trường THV, trụ sở phường Nông Trang, Phú Thọ — KHÁC "DHV" Trường Đại học Hùng Vương TP.HCM), đào tạo 27 ngành đại học chính quy 2026 khối sư phạm/sức khỏe/kinh tế/kỹ thuật/ngôn ngữ/du lịch/nông nghiệp: các ngành sư phạm (Toán học, Ngữ văn, Lịch sử - Địa lí, Khoa học tự nhiên, Tiếng Anh, Giáo dục Tiểu học, Giáo dục Mầm non, Giáo dục Thể chất, Âm nhạc, Mỹ thuật), Tâm lý học, Điều dưỡng, Thú y, Chăn nuôi, Khoa học cây trồng, Kế toán, Quản trị kinh doanh, Tài chính - Ngân hàng, Kinh tế, Ngôn ngữ Anh, Ngôn ngữ Trung Quốc, Công nghệ thông tin, Công nghệ Kỹ thuật điện điện tử, Công nghệ Kỹ thuật cơ khí, Quản trị dịch vụ Du lịch và Lữ hành, Du lịch, Công tác xã hội.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'HVU 2026 (nhánh TS01 — xét kết quả thi TN THPT, mã trường THV): điểm chuẩn đợt 1 theo NGÀNH cho 7/27 ngành. Công thức + tổ hợp môn CHÍNH CHỦ từ Quyết định 226/QĐ-ĐHHV (09/3/2026, PDF gốc 15 trang có chữ ký/con dấu, nhúng qua Google Drive trên hvu.edu.vn — tải trực tiếp thay vì chỉ đọc preview) (`sources.ts:hvu-admission-scheme-2026`). Điểm chuẩn đợt 1 năm 2026 (đã công bố sau kỳ thi, tháng 8/2026 — PDF gốc ký tháng 3 không tự chứa số này) lấy từ 2 nguồn báo ĐỘC LẬP tường thuật thông báo chính thức của Hội đồng tuyển sinh (báo Phú Thọ + Giáo dục & Thời đại), khớp TUYỆT ĐỐI cho 7 ngành có số liệu chính xác không làm tròn nhóm (22,63–26,50/30) (`hvu-threshold-2026` + `hvu-threshold-secondary-2026`). Điểm ưu tiên dùng khung quốc gia hiện hành (Điều 7 Thông tư 06/2026/TT-BGDĐT, đọc trực tiếp PDF gốc — giá trị/công thức giống hệt Thông tư 06/2025 đã dùng cho HBU/VTTU) vì trường không tự công bố bảng riêng. Trường KHÔNG tính điểm cộng thành tích/chứng chỉ ngoại ngữ (xác nhận trực tiếp trong Quyết định 226, mục 5.2) — không cần mô hình hoá nhánh điểm cộng. Loại trừ 20/27 ngành: 4 ngành năng khiếu (thang 40, môn năng khiếu không có SubjectId), 5 ngành CHƯA có điểm chuẩn đợt 1 chốt (nguồn ghi rõ tuyển bổ sung), 11 ngành còn lại chỉ có số liệu điểm chuẩn nguồn thứ cấp làm tròn nhóm không đủ chính xác theo ngành — xem knowledgeGaps.ts.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hvuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Quyết định 226/QĐ-ĐHHV — Thông tin tuyển sinh đại học hệ chính quy năm 2026',
      url: 'https://www.hvu.edu.vn/tin-tuc/thong-tin-tuyen-sinh-nam-2026/1773029218.hvu',
      type: 'official-institution',
      checkedAt: '2026-09-04',
    },
    {
      title: 'Trường Đại học Hùng Vương công bố điểm trúng tuyển đợt 1 năm 2026',
      url: 'https://baophutho.vn/truong-dai-hoc-hung-vuong-cong-bo-diem-trung-tuyen-dot-1-nam-2026-nganh-su-pham-dan-dau-khang-dinh-vi-the-trung-tam-dao-tao-chat-luong-cao-259355.htm',
      type: 'secondary',
      checkedAt: '2026-09-04',
    },
  ],
};
