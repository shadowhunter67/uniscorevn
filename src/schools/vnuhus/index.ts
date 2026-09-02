import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vnuhusAdmissionMethods } from './methods';

export const vnuhusModule: SchoolModule = {
  id: 'vnuhus',
  name: 'Trường Đại học Khoa học Tự nhiên - ĐHQGHN',
  shortName: 'VNU-HUS',
  about: 'Trường đại học thành viên Đại học Quốc gia Hà Nội, đào tạo khối ngành khoa học tự nhiên/công nghệ: Toán học, Vật lý học, Hoá học, Sinh học, Khoa học dữ liệu, Địa lý tự nhiên, Khoa học môi trường...',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'VNU-HUS 2025 (nhánh xét kết quả thi TN THPT): điểm chuẩn theo ngành, nguồn tuyensinh247 (`sources.ts:vnuhus-threshold-2025`), cross-check dải điểm với Đại biểu Nhân dân (`vnuhus-threshold-secondary-2025`, 20,5-26 khớp); cổng chính thức (chinhphu.vn) xác nhận có thông báo nhưng bảng chỉ hiển thị dạng ảnh. Mỗi ngành công bố nhiều tổ hợp nhưng CHỈ 1 mức điểm chuẩn chung (giống VNU-UET) và xác nhận đã CỘNG điểm ưu tiên. Điểm xét = tổng thô 3 môn (không hệ số) + điểm ưu tiên KV/ĐT (judgment call chuẩn quốc gia cho GIÁ TRỊ). Mô hình hoá 28/28 ngành đại học chính quy, điểm chuẩn từ 20,05 đến 26,00/30, tổ hợp hỗ trợ A00/A01/A02/A07/B00/B03/B08/C01/C02/C04/D01/D07/D08/D09/D10/X01 (mọi ngành đều có A00 trong danh sách công bố) — các tổ hợp riêng có môn Tin học/Công nghệ Công nghiệp-Nông nghiệp (X-series) chưa mô hình hoá. Mã ngành dùng mã xét tuyển chính thức trường (QHT01-QHT99, không phải mã ngành Bộ GD&ĐT).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vnuhusAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn Trường Đại Học Khoa Học Tự Nhiên Hà Nội 2025',
      url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-khoa-hoc-tu-nhien-dai-hoc-quoc-gia-ha-noi-QHT.html',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
    {
      title: 'Điểm chuẩn Trường Đại học Khoa học tự nhiên - ĐH Quốc gia Hà Nội dao động từ 20,5 - 26 điểm (Đại biểu Nhân dân)',
      url: 'https://daibieunhandan.vn/diem-chuan-truong-dai-hoc-khoa-hoc-tu-nhien-dh-quoc-gia-ha-noi-dao-dong-tu-20-5-26-diem-10384291.html',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
  ],
};
