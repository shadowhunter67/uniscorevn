import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vnuebAdmissionMethods } from './methods';

export const vnuebModule: SchoolModule = {
  id: 'vnueb',
  name: 'Trường Đại học Kinh tế - ĐHQGHN',
  shortName: 'VNU-UEB',
  about: 'Trường đại học thành viên Đại học Quốc gia Hà Nội, đào tạo khối ngành kinh tế: Kinh tế, Kinh tế quốc tế, Kinh tế phát triển, Quản trị kinh doanh, Tài chính - Ngân hàng, Kế toán.',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'VNU-UEB 2025 (nhánh xét kết quả thi TN THPT): điểm chuẩn theo ngành cross-check qua 2 báo độc lập (tuyensinh247, Sforum/CellphoneS — `sources.ts:vnueb-threshold-2025`/`vnueb-threshold-secondary-2025`, khớp số liệu; cổng tuyển sinh chính thức tuyensinhdaihoc.ueb.edu.vn trả HTTP 403 khi truy cập trực tiếp). Xác nhận TRỰC TIẾP điểm chuẩn "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" — không cần judgment call cho việc CÓ cộng ưu tiên. Điểm xét = tổng thô 3 môn (không hệ số) + điểm ưu tiên KV/ĐT (judgment call chuẩn quốc gia cho GIÁ TRỊ, trường không tự công bố mức cụ thể). Mô hình hoá 6/6 ngành đại học chính quy, điểm chuẩn từ 24,20 đến 25,72/30, cả 6 ngành dùng chung 8 tổ hợp D01/A01/D09/D10/C01/C03/C04/X01 (X01 thêm vào core/subjects.ts trong batch này). Tiêu chí phụ khi bằng điểm (ưu tiên điểm Toán ở một số ngành) chưa mô hình hoá. Chỉ mô hình hoá nhánh thi TN THPT — chưa hỗ trợ ĐGNL HSA hay xét chứng chỉ tiếng Anh quốc tế kết hợp học bạ.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vnuebAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn Trường Đại Học Kinh Tế – Đại Học Quốc Gia Hà Nội 2025',
      url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-kinh-te-dai-hoc-quoc-gia-ha-noi-QHE.html',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
    {
      title: 'QHE - Điểm chuẩn Trường đại học Kinh tế - ĐHQGHN năm 2025 (Sforum)',
      url: 'https://cellphones.com.vn/sforum/diem-chuan-dai-hoc-kinh-te-dhqghn-2025',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
  ],
};
