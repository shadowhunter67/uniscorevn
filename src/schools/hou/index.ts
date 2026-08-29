import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { houAdmissionMethods } from './methods';

export const houModule: SchoolModule = {
  id: 'hou',
  name: 'Trường Đại học Mở Hà Nội',
  shortName: 'HOU',
  about: 'Trường đại học công lập đa ngành tại Hà Nội, đào tạo chính quy và từ xa, mạnh về Luật, Ngôn ngữ, Kinh tế và Công nghệ.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'HOU 2026 (phương thức xét kết quả thi TN THPT): thông báo chính thức hou.edu.vn (đọc trực tiếp qua curl 2026-08-29, bảng ngưỡng dạng ảnh PNG gốc, đọc bằng vision) công bố "Ngưỡng bảo đảm chất lượng đầu vào" theo 22 ngành cụ thể. Batch này mô hình hoá 16/22 ngành dùng tổ hợp THPT chuẩn (loại trừ 4 ngành năng khiếu vẽ + 2 ngành ngoại ngữ Anh/Trung dùng tổ hợp hệ số 2 chưa suy diễn được cách quy đổi chắc chắn): Kế toán/Tài chính-Ngân hàng/Bảo hiểm/Quản trị kinh doanh = 18,50/30; Thương mại điện tử/Luật/Luật quốc tế/Luật kinh tế = 20,00/30; Công nghệ sinh học/Công nghệ thực phẩm = 17,00/30; Kỹ thuật máy tính/Công nghệ kỹ thuật điện tử-viễn thông/Công nghệ kỹ thuật điều khiển và tự động hóa/Quản trị dịch vụ du lịch và lữ hành/Quản trị khách sạn = 18,00/30; Công nghệ thông tin = 19,00/30. Điểm xét = tổng thô 3 môn (không hệ số) + điểm ưu tiên KV/ĐT — nguồn xác nhận TRỰC TIẾP điểm ưu tiên được cộng trước khi so ngưỡng (giá trị bảng dùng judgment call chuẩn quốc gia, nguồn im lặng đúng phần này). Ngưỡng là ĐIỀU KIỆN ĐĂNG KÝ (không phải điểm chuẩn trúng tuyển cuối cùng). Các phương thức khác (học bạ THPT, ĐGTD/TSA, ĐGNL/HSA) chưa chuẩn hoá vào runtime.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(houAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Ngưỡng bảo đảm chất lượng đầu vào Đại học chính quy năm 2026 và bảng quy đổi tương đương giữa các phương thức xét tuyển',
      url: 'https://hou.edu.vn/tin-tuyen-sinh/truong-dai-hoc-mo-ha-noi-thong-bao-nguong-bao-dam-chat-luong-dau-vao-va-bang-quy-doi-tuong-duong-giua-cac-phuong-thuc-xet-tuyen-dai-hoc-chinh-quy-nam-2026-2/',
      type: 'official-institution',
      checkedAt: '2026-08-29',
    },
  ],
};
