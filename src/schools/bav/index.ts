import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { bavAdmissionMethods } from './methods';

export const bavModule: SchoolModule = {
  id: 'bav',
  name: 'Học viện Ngân hàng',
  shortName: 'BAV',
  about: 'Học viện công lập trực thuộc Ngân hàng Nhà nước Việt Nam, đào tạo khối ngành tài chính - ngân hàng - kinh tế tại Hà Nội.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'BAV 2026 (PTXT4 - xét điểm thi TN THPT): thông báo chính thức hvnh.edu.vn (Số 3508/TB-HVNH, đọc bằng vision qua PDF scan tải trực tiếp 2026-08-29) công bố công thức Điểm xét = tổng 3 môn theo tổ hợp, môn chính (Toán) nhân đôi, quy đổi thang 30 + điểm ưu tiên, và ngưỡng theo loại chương trình: chuẩn/chất lượng cao 21,50/30; liên kết đào tạo quốc tế (cấp song bằng) 19,00/30. "Thông tin tuyển sinh năm 2026" (QĐ 2028/QĐ-HVNH, đọc bằng vision) công bố bảng đầy đủ 45 mã xét tuyển với tổ hợp + môn chính — 42 mã (ngoài lĩnh vực Pháp luật) đã đưa vào tính toán; 3 mã lĩnh vực Pháp luật (LAW01/LAW03/LAW04) bị loại vì ngưỡng riêng chưa công bố (chờ Bộ GD&ĐT). Điểm cộng (thưởng/chứng chỉ, tối đa 3,0/30) chưa model. Điểm ưu tiên dùng công thức BAV tự công bố với giá trị bảng theo khung quốc gia (judgment call). Các phương thức khác (PTXT1/2/2.2/2.3/3) chưa chuẩn hoá vào runtime.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(bavAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo Về ngưỡng đảm bảo chất lượng đầu vào và cách thức quy đổi tương đương điểm trúng tuyển giữa các phương thức xét tuyển đại học chính quy năm 2026 tại Học viện Ngân hàng',
      url: 'https://hvnh.edu.vn/hvnh/vi/thong-tin-tuyen-sinh/nguong-dam-bao-chat-luong-dau-vao-va-cach-thuc-quy-doi-tuong-duong-diem-trung-tuyen-giua-cac-phuong-thuc-xet-tuyen-dai-hoc-chinh-quy-nam-2026-4024.html',
      type: 'official-institution',
      checkedAt: '2026-08-29',
    },
    {
      title: 'Thông tin tuyển sinh năm 2026 (Quyết định số 2028/QĐ-HVNH ngày 31/3/2026)',
      url: 'https://hvnh.edu.vn/ttkt/vi/bantinhvnh/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-cua-hoc-vien-ngan-hang-ban-hanh-theo-quyet-dinh-2028qdhvnh-ngay-31-thang-3-nam-2026-8193.html',
      type: 'official-institution',
      checkedAt: '2026-08-29',
    },
  ],
};
