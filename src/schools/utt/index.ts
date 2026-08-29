import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { uttAdmissionMethods } from './methods';

export const uttModule: SchoolModule = {
  id: 'utt',
  name: 'Trường Đại học Công nghệ Giao thông vận tải',
  shortName: 'UTT',
  about: 'Trường đại học công lập tại Hà Nội, đào tạo kỹ thuật giao thông vận tải và công nghệ.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển UTT 2026 (phương thức thi TN THPT) theo mã xét tuyển: thông báo chính thức utt.edu.vn "Thông báo điểm sàn đăng ký xét tuyển giữa các phương thức xét tuyển năm 2026" (đọc trực tiếp qua curl 2026-08-29) công bố công thức TRỰC TIẾP (ĐXT = tổng 3 môn + điểm ưu tiên KV/ĐT) và bảng ngưỡng đầy đủ 75 mã xét tuyển (15/18/20 tuỳ ngành), ngưỡng ĐÃ BAO GỒM điểm ưu tiên. Nguồn không in bảng giá trị KV/ĐT cụ thể — áp judgment call chuẩn quốc gia (Điều 7 Thông tư 08/2022/TT-BGDĐT) cho giá trị bảng. Chưa validate tổ hợp môn theo từng mã ngành (nguồn không công bố); các phương thức khác (học bạ, ĐGTD/ĐGNL, xét tuyển thẳng) chưa chuẩn hoá vào runtime.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(uttAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo điểm sàn đăng ký xét tuyển giữa các phương thức xét tuyển năm 2026',
      url: 'https://utt.edu.vn/vn/tuyensinh/tuyen-sinh/dai-hoc-chinh-quy/thong-bao-diem-san-dang-ky-xet-tuyen-giua-cac-phuong-thuc-xet-tuyen-nam-2026-a17263.html',
      type: 'official-institution',
      checkedAt: '2026-08-29',
    },
  ],
};
