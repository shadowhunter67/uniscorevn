import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vnuedAdmissionMethods } from './methods';

export const vnuedModule: SchoolModule = {
  id: 'vnued',
  name: 'Trường Đại học Giáo dục - ĐHQGHN',
  shortName: 'VNU-UED',
  about: 'Trường đại học thành viên Đại học Quốc gia Hà Nội, đào tạo khối ngành sư phạm/giáo dục: Giáo dục Tiểu học, Giáo dục Mầm non, Sư phạm Toán/Vật lí/Hoá học/Sinh học/Ngữ văn/Lịch sử/Khoa học Tự nhiên, Sư phạm Lịch sử - Địa lý.',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'VNU-UED 2025 (nhánh xét kết quả thi TN THPT): điểm chuẩn theo ngành + tổ hợp, nguồn tuyensinh247 (`sources.ts:vnued-threshold-2025`), cross-check dải điểm với VnExpress (`vnued-threshold-secondary-2025`, 25,37-29,84 khớp); cổng chính thức education.vnu.edu.vn xác nhận có thông báo nhưng bảng chỉ hiển thị dạng ảnh. Xác nhận TRỰC TIẾP điểm chuẩn "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" — không cần judgment call cho việc CÓ cộng ưu tiên. Điểm xét = tổng thô 3 môn (không hệ số) + điểm ưu tiên KV/ĐT (judgment call chuẩn quốc gia cho GIÁ TRỊ). Mô hình hoá 10/11 ngành đại học chính quy (loại trừ nhóm "Khoa học giáo dục và khác" — gộp nhiều chuyên ngành nhỏ, không rõ 1 mã ngành cụ thể), điểm chuẩn từ 25,37 đến 29,84/30, mỗi ngành có tập tổ hợp riêng (A00/A01/A02/A07/B00/B03/B08/C00/C01/C02/C03/C04/C14/D01/D07/D09/D14/D15 — A07/B03/D15 thêm vào core/subjects.ts trong batch này). Chỉ mô hình hoá nhánh thi TN THPT.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vnuedAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn Trường Đại Học Giáo Dục - ĐHQG Hà Nội 2025',
      url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-giao-duc-dai-hoc-quoc-gia-ha-noi-QHS.html',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
    {
      title: 'Điểm chuẩn Đại học Giáo dục (UEd) 2025 chính xác nhất (VnExpress)',
      url: 'https://vnexpress.net/diem-chuan-dai-hoc-giao-duc-ued-2025-chinh-xac-nhat-4930396.html',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
  ],
};
