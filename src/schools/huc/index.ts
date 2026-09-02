import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hucAdmissionMethods } from './methods';

export const hucModule: SchoolModule = {
  id: 'huc',
  name: 'Trường Đại học Văn hóa Hà Nội',
  shortName: 'HUC',
  about: 'Trường đại học công lập trực thuộc Bộ Văn hóa, Thể thao và Du lịch, đào tạo khối ngành văn hóa/du lịch/thư viện: Báo chí, Luật, Quản lý di sản văn hóa, Quản trị dịch vụ du lịch và lữ hành, Quản trị thư viện...',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'HUC 2025 (nhánh xét kết quả thi TN THPT): điểm chuẩn theo ngành + tổ hợp, nguồn tuyensinh247 (`sources.ts:huc-threshold-2025`), cross-check TUYỆT ĐỐI qua Báo Hà Tĩnh (`huc-threshold-secondary-2025`, khớp 20/20 ngành từng số). Trang tuyển sinh chính thức (tuyensinh.huc.edu.vn) là SPA render bằng JS, cổng Chính phủ chỉ có bảng dạng ảnh — batch này retry thành công qua 2 nguồn báo đăng lại dạng text (trước đây HUC bị đánh giá "chưa research được" vì rào cản SPA này). Xác nhận trực tiếp điểm chuẩn "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" (đã cộng ưu tiên). Điểm xét = tổng thô 3 môn (không hệ số) + điểm ưu tiên KV/ĐT (judgment call chuẩn quốc gia cho GIÁ TRỊ). Mô hình hoá 20/21 ngành đại học chính quy (loại Sáng tác văn học — không có trong bảng nhánh THPT), điểm chuẩn từ 22,80 đến 27,55/30, mỗi ngành có 3 mức theo nhóm tổ hợp (D01 riêng; {C03,C04,D14,D15,X01} 1 mức; C00 mức cao nhất) — loại X70/X78 (mã tổ hợp riêng của trường, thành phần môn chưa xác minh, không ảnh hưởng điểm chuẩn vì đã có mã khác cùng mức thay thế).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hucAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn Trường Đại Học Văn Hóa Hà Nội 2025 chính xác',
      url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-van-hoa-ha-noi-VHH.html',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
    {
      title: 'Điểm chuẩn Trường Đại Học Văn Hóa Hà Nội 2025 – Theo ngành và tổ hợp xét tuyển (Báo Hà Tĩnh)',
      url: 'https://baohatinh.vn/cong-cu/diem-chuan/vhh-truong-dai-hoc-van-hoa-ha-noi',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
  ],
};
