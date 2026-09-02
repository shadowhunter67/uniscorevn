import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vnuuetAdmissionMethods } from './methods';

export const vnuuetModule: SchoolModule = {
  id: 'vnuuet',
  name: 'Trường Đại học Công nghệ - ĐHQGHN',
  shortName: 'VNU-UET',
  about: 'Trường đại học thành viên Đại học Quốc gia Hà Nội, đào tạo khối ngành công nghệ/kỹ thuật: Công nghệ thông tin, Khoa học máy tính, Trí tuệ nhân tạo, Kỹ thuật điều khiển và tự động hoá, Cơ kỹ thuật, Công nghệ kỹ thuật điện tử - Viễn thông...',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'VNU-UET 2025 (nhánh xét kết quả thi TN THPT): điểm chuẩn theo ngành, nguồn tuyensinh247 (`sources.ts:vnuuet-threshold-2025`), cross-check dải điểm với VnExpress (`vnuuet-threshold-secondary-2025`, 22,14-28,19 khớp); cổng chính thức (tuyensinh.uet.vnu.edu.vn, chinhphu.vn) xác nhận có thông báo nhưng bảng chỉ hiển thị dạng ảnh. Trường tự công bố "Điểm trúng tuyển của một ngành là như nhau giữa các tổ hợp xét tuyển" (điểm chuẩn KHÔNG khác nhau theo tổ hợp trong 1 ngành, khác VNU-UED) và xác nhận đã CỘNG điểm ưu tiên. Điểm xét = tổng thô 3 môn (không hệ số) + điểm ưu tiên KV/ĐT (judgment call chuẩn quốc gia cho GIÁ TRỊ). Mô hình hoá 20/20 ngành đại học chính quy, điểm chuẩn từ 22,00 đến 28,19/30, tổ hợp hỗ trợ A00/A01/D01 (+B00 cho 2 ngành khối nông nghiệp/sinh học) — X06/X26 (có môn Tin học) trường công bố thêm nhưng chưa mô hình hoá (không ảnh hưởng điểm chuẩn vì giống nhau giữa mọi tổ hợp). Mã ngành dùng mã nội bộ trường (CN1-CN21, không phải mã ngành Bộ GD&ĐT).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vnuuetAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn Trường Đại Học Công Nghệ – Đại Học Quốc Gia Hà Nội 2025',
      url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-cong-nghe-dai-hoc-quoc-gia-ha-noi-QHI.html',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
    {
      title: 'Điểm chuẩn Đại học Công nghệ (UET) 2025 mới nhất (VnExpress)',
      url: 'https://vnexpress.net/diem-chuan-dai-hoc-cong-nghe-uet-2025-moi-nhat-4930248.html',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
  ],
};
