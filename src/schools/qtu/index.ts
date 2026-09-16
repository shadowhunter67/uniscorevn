import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { qtuAdmissionMethods } from './methods';

export const qtuModule: SchoolModule = {
  id: 'qtu',
  name: 'Trường Đại học Quang Trung',
  shortName: 'QTU',
  about: 'Trường đại học tư thục tại Bình Định, đào tạo 11 ngành khối kinh tế, kỹ thuật, sức khỏe, ngôn ngữ.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển QTU 2026 (thi TN THPT): ĐXT = round2(tổng thô 3 môn + điểm ưu tiên) — trích nguyên văn đề án tuyển sinh mục 4.2 ("Điểm xét tuyển = Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + Điểm ưu tiên (nếu có)"); đủ điều kiện xét tuyển khi ĐXT đạt ngưỡng theo nhóm ngành: Điều dưỡng ≥18,0/30, 10 ngành còn lại ≥15,0/30 (bảng điểm chuẩn công bố 09/8/2026). Phạm vi tổ hợp: tập chung nằm trong taxonomy hiện có, chưa ràng buộc chặt theo từng ngành. Phương thức học bạ, kết hợp, ĐGNL chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(qtuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Đề án tuyển sinh đại học chính quy năm 2026 — QTU',
      url: 'https://qtu.edu.vn/de-an-tuyen-sinh-dai-hoc-chinh-quy-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
    {
      title: 'Công bố điểm chuẩn trúng tuyển đại học chính quy đợt 1 năm 2026 — QTU',
      url: 'https://qtu.edu.vn/diem-chuan-trung-tuyen-dai-hoc-chinh-quy-dot-1-nam-2026-dai-hoc-quang-trung/',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
  ],
};
