import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tnutAdmissionMethods } from './methods';

export const tnutModule: SchoolModule = {
  id: 'tnut',
  name: 'Trường Đại học Kỹ thuật Công nghiệp - Đại học Thái Nguyên',
  shortName: 'TNUT',
  about: 'Trường đại học công lập thành viên Đại học Thái Nguyên (mã trường DTK), đào tạo khối ngành kỹ thuật cơ khí, điện, điện tử, ô tô, công nghệ thông tin.',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'TNUT 2025 (Phương thức 1 — xét kết quả thi TN THPT): điểm trúng tuyển CHÍNH THỨC theo 26/26 mã xét tuyển (15,00–24,50/30), nguồn CHÍNH CHỦ tnut.edu.vn cho cả điểm trúng tuyển (Thông báo 818/TB-ĐHKTCN, `sources.ts:tnut-threshold-2025`) và công thức/tổ hợp (Hướng dẫn xét tuyển 2025 + Ngành và chỉ tiêu tuyển sinh 2025, `sources.ts:tnut-huongdan-2025`/`tnut-nganh-chitieu-2025`) — trường xác nhận "điểm trúng tuyển giữa các tổ hợp là tương đương nhau" và "được quy đổi tương đương giữa các phương thức xét tuyển". Cùng năm 2025. Điểm ưu tiên dùng khung điểm ưu tiên quốc gia hiện hành (trường không tự công bố bảng riêng, judgment call — xem `knowledgeGaps.ts`). Không có bảng điểm cộng riêng. Nhóm ngành Quản lý/Kinh tế công nghiệp còn 2 tổ hợp A10/D84 riêng cho thí sinh tự do trước 2025 KHÔNG được mô hình hoá. Các phương thức học bạ/V-SAT/tuyển thẳng chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tnutAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo số 818/TB-ĐHKTCN — Điểm trúng tuyển đại học chính quy năm 2025 (đợt 1)',
      url: 'https://tnut.edu.vn/thong-bao-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2025-dot-1-vao-truong-dai-hoc-ky-thuat-cong-nghiep-dz20043.html',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Hướng dẫn xét tuyển Đại học năm 2025 tại Trường Đại học Kỹ thuật Công nghiệp, Đại học Thái Nguyên',
      url: 'https://www.tnut.edu.vn/huong-dan-xet-tuyen-dai-hoc-nam-2025-tai-truong-dai-hoc-ky-thuat-cong-nghiep-dai-hoc-thai-nguyen-dz18957.html',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
  ],
};
