import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vnusshAdmissionMethods } from './methods';

export const vnusshModule: SchoolModule = {
  id: 'vnussh',
  name: 'Trường Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN',
  shortName: 'VNU-USSH',
  about: 'Trường đại học thành viên Đại học Quốc gia Hà Nội, đào tạo khối ngành khoa học xã hội và nhân văn: Báo chí, Tâm lý học, Quan hệ công chúng, Lịch sử, Văn học, Đông phương học, Xã hội học... (khác USSH - Trường ĐH Khoa học Xã hội và Nhân văn thuộc ĐHQG TP.HCM).',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'VNU-USSH 2025 (nhánh xét kết quả thi TN THPT): điểm chuẩn theo ngành + tổ hợp, nguồn tuyensinh247 (`sources.ts:vnussh-threshold-2025`), cross-check với VietnamNet (`vnussh-threshold-secondary-2025`, ngành cao nhất Tâm lý học 29,00 khớp). Xác nhận TRỰC TIẾP điểm chuẩn "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" (đã cộng ưu tiên). Điểm xét = tổng thô 3 môn (không hệ số) + điểm ưu tiên KV/ĐT (judgment call chuẩn quốc gia cho GIÁ TRỊ). Mô hình hoá 28/29 ngành đại học chính quy (loại Truyền thông đa phương tiện — không có trong bảng nhánh THPT thu thập được), điểm chuẩn từ 21,75 đến 29,00/30, MỖI NGÀNH có mức điểm RIÊNG theo TỪNG tổ hợp (giống QBU, khác VNU-UET/VNU-HUS) — tổ hợp hỗ trợ C00/C03/C04/D01/D14/D15 (loại D66/D04/D06/DD2 — tổ hợp có ngoại ngữ Trung/Nhật/Hàn chưa có SubjectId tương ứng). Mã ngành dùng mã xét tuyển chính thức trường (QHX01-QHX28).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vnusshAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn Trường Đại Học Khoa Học Xã Hội và Nhân Văn Hà Nội 2025 chính xác',
      url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-khoa-hoc-xa-hoi-va-nhan-van-dai-hoc-quoc-gia-ha-noi-QHX.html',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
    {
      title: 'Điểm chuẩn Trường Đại học Khoa học Xã hội và Nhân văn năm 2025 (VietnamNet)',
      url: 'https://vietnamnet.vn/diem-chuan-truong-dai-hoc-khoa-hoc-xa-hoi-va-nhan-van-nam-2025-2435086.html',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
  ],
};
