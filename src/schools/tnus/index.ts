import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tnusAdmissionMethods } from './methods';

export const tnusModule: SchoolModule = {
  id: 'tnus',
  name: 'Truong Dai hoc Khoa hoc - Dai hoc Thai Nguyen',
  shortName: 'TNUS',
  about: 'Trường đại học thành viên Đại học Thái Nguyên, đào tạo 40 ngành/chương trình khối ngôn ngữ, xã hội, tự nhiên, kỹ thuật.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'TNUS 2026 (thi TN THPT): so Điểm xét tuyển (tổng thô 3 môn + ưu tiên) với điểm chuẩn thật theo 39/40 mã xét tuyển (16,35-22,50/30), theo Thông báo 517/TB-ĐHKH (ngưỡng, công thức) + infographic điểm chuẩn chính chủ cùng năm 2026. Luật/Luật kinh tế kèm điều kiện phụ Toán hoặc Văn ≥6,0; Công nghệ bán dẫn kèm Toán ≥7,5. Loại Ngôn ngữ Anh định hướng giảng dạy (điều kiện IELTS/học bạ riêng). Các phương thức khác (học bạ, V-SAT, DGNL/DGTD) chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(tnusAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo Ngưỡng bảo đảm chất lượng đầu vào tuyển sinh đại học chính quy đợt 1 năm 2026 (517/TB-ĐHKH)',
      url: 'https://tuyensinh.tnus.edu.vn/uploads/docs/2026/07/thong-bao-nguong-bao-dam-chat-luong-dau-vao-tuyen-sinh-dai-hoc-chinh-quy-vao-truong-dai-hoc-khoa-hoc-dai-hoc-thai-nguyen-dot-1-nam-2026.pdf',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
    {
      title: 'Điểm chuẩn Đại học chính quy năm 2026 — infographic chính chủ TNUS, 40 ngành/chương trình',
      url: 'https://giaoduc.net.vn/truong-dai-hoc-khoa-hoc-dh-thai-nguyen-cong-bo-diem-chuan-2026-post261987.gd',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
  ],
};
