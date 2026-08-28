import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { apdAdmissionMethods } from './methods';

export const apdModule: SchoolModule = {
  id: 'apd',
  name: 'Hoc vien Chinh sach va Phat trien',
  shortName: 'APD',
  about: 'Public policy-and-development academy headquartered in Hanoi, with new 2026 branch campuses in Bac Ninh and Da Nang.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  entityLevel: 'academy',
  vnuhcm: false,
  summary:
    'Calculator exact cho phương thức xét kết quả thi TN THPT, theo cơ sở đào tạo (Trụ sở chính Hà Nội 19,0/30; Phân hiệu Bắc Ninh và Đà Nẵng 16,0/30, đồng nhất mọi tổ hợp): đọc trực tiếp Thông báo 180/TB-HVCSPT (02/07/2026, PDF chính thức APD) xác nhận nguyên văn ngưỡng đã bao gồm điểm cộng + điểm ưu tiên khu vực/đối tượng (điểm ưu tiên CỘNG vào tổng trước khi so ngưỡng). Mức điểm ưu tiên KV/ĐT cụ thể dùng chuẩn toàn quốc (judgment call); điểm cộng cụ thể 2026 chưa công bố, model = 0. Xét học bạ và các phương thức khác chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(apdAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Du kien diem san, diem chuan Hoc vien Chinh sach va Phat trien (APD) nam 2026',
      url: 'https://xaydungchinhsach.chinhphu.vn/du-kien-diem-san-diem-chuan-hoc-vien-chinh-sach-va-phat-trien-apd-nam-2026-11926070213145361.htm',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Thông báo 180/TB-HVCSPT (02/07/2026): Về ngưỡng đảm bảo chất lượng và phương án quy đổi mức điểm chuẩn tương đương giữa các phương thức tuyển sinh đại học chính quy năm 2026',
      url: 'https://tuyensinh.apd.edu.vn/wp-content/uploads/2026/07/Tb-180-dam-bao-nguong-diem.pdf',
      type: 'official-institution',
      checkedAt: '2026-08-28',
    },
  ],
};
