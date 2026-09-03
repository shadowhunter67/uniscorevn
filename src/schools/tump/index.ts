import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tumpAdmissionMethods } from './methods';

export const tumpModule: SchoolModule = {
  id: 'tump',
  name: 'Trường Đại học Y - Dược, Đại học Thái Nguyên',
  shortName: 'TUMP',
  about: 'Trường đại học công lập thành viên Đại học Thái Nguyên (mã trường DTY), đào tạo khối ngành y - dược (Y khoa, Răng - Hàm - Mặt, Dược học, Điều dưỡng...).',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'TUMP 2025 (Phương thức 1 — xét kết quả thi TN THPT, mã phương thức 100): điểm trúng tuyển CHÍNH THỨC theo cả 9/9 ngành đại học chính quy (18,30–26,15/30), nguồn CHÍNH CHỦ tuyensinh.tump.edu.vn cho cả điểm trúng tuyển (Thông báo 996/TB-ĐHYD, `sources.ts:tump-threshold-2025`) và công thức/tổ hợp/điểm cộng/điểm ưu tiên (Thông tin tuyển sinh 2025, `sources.ts:tump-thongtin-2025`) — trường xác nhận điểm chuẩn theo ngành là điểm quy đổi đã bao gồm điểm cộng/ưu tiên, áp dụng chung cho mọi phương thức/tổ hợp. Cùng năm 2025. Điểm cộng dùng bảng riêng của trường (mục 4.2) — module chỉ mô hình hoá bậc IELTS, giải HSG/học lực giỏi không có input tương ứng. Điểm ưu tiên dùng khung điểm ưu tiên quốc gia hiện hành (trường không tự công bố bảng riêng, judgment call — xem `knowledgeGaps.ts`). Cơ chế thay thế điểm môn Tiếng Anh bằng IELTS quy đổi (mục 2.2) KHÔNG được mô hình hoá. Các phương thức học bạ/HSA/V-SAT/tuyển thẳng/dự bị đại học chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tumpAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo số 996/TB-ĐHYD — Điểm trúng tuyển và danh sách thí sinh trúng tuyển đại học chính quy năm 2025',
      url: 'http://tuyensinh.tump.edu.vn/article/thong-bao-diem-trung-tuyen-va-danh-sach-thi-sinh-trung-tuyen-dai-hoc-chinh-quy-nam-2025',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Thông báo số 688/TB-ĐHYD — Công khai thông tin tuyển sinh đại học năm 2025',
      url: 'https://tuyensinh.tump.edu.vn/article/thong-tin-tuyen-sinh-dai-hoc-nam-2025',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
  ],
};
