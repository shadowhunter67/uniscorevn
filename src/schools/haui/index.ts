import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hauiAdmissionMethods } from './methods';

export const hauiModule: SchoolModule = {
  id: 'haui',
  name: 'Trường Đại học Công nghiệp Hà Nội',
  shortName: 'HaUI',
  about: 'Trường đại học công lập đa ngành tại Hà Nội, thế mạnh khối kỹ thuật - công nghệ.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển HAUI 2026 (phương thức 3 - xét điểm thi TN THPT) theo mã xét tuyển: thông báo chính thức haui.edu.vn "Ngưỡng đảm bảo chất lượng đầu vào và Quy tắc quy đổi điểm xét tuyển, điểm trúng tuyển..." (đọc trực tiếp qua curl 2026-08-29) công bố bảng ngưỡng đầy đủ 72 mã xét tuyển (17,00-20,00/30). Mục phương thức 3 không nhắc điểm ưu tiên khu vực/đối tượng — áp judgment call chuẩn quốc gia (Điều 7 Thông tư 08/2022/TT-BGDĐT) khi hiển thị Điểm xét tuyển; ngưỡng so với tổng thô (không cộng ưu tiên). 21 mã tổ hợp dùng trong bảng, trong đó 8 mã (ngoại ngữ Trung/Nhật/Hàn hoặc thành phần không xác định tin cậy) và 4 ký hiệu riêng của trường (X05/X06/X07/X25) chưa có trong danh mục tổ hợp chung. Các phương thức khác (học sinh giỏi/chứng chỉ quốc tế, ĐGNL ĐHQGHN, ĐGTD HUST) chưa chuẩn hoá vào runtime.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hauiAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Ngưỡng đảm bảo chất lượng đầu vào và Quy tắc quy đổi điểm xét tuyển, điểm trúng tuyển của các phương thức xét tuyển đại học chính quy năm 2026',
      url: 'https://www.haui.edu.vn/vn/tin-tuc/nguong-dam-bao-chat-luong-dau-vao-va-quy-tac-quy-doi-diem-xet-tuyen-diem-trung-tuyen-cua-cac-phuong-thuc-xet-tuyen-dai-hoc-chinh-quy-nam-2026/68002',
      type: 'official-institution',
      checkedAt: '2026-08-29',
    },
  ],
};
