import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vmuAdmissionMethods } from './methods';

export const vmuModule: SchoolModule = {
  id: 'vmu',
  name: 'Trường Đại học Hàng hải Việt Nam',
  shortName: 'VMU',
  about: 'Trường đại học công lập tại Hải Phòng, đào tạo các ngành hàng hải, kỹ thuật, kinh tế, ngôn ngữ và luật.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển VMU 2026 cho Phương thức 1 (thi TN THPT): ĐXT = tổng thô 3 môn tổ hợp + điểm ưu tiên (công thức trích nguyên văn Thông báo 1329/TB-ĐHHHVN, mục 2.2.1) — điểm ưu tiên KV/ĐT theo Điều 7 quy chế TT 06/2026 (công thức giảm ≥ 22,5). Thông báo chỉ công bố ngưỡng sàn chung 15,00/30 nên evaluator trả điểm chính xác kèm trạng thái đủ điều kiện "chưa kết luận" khi ≥ 15. Loại trừ D127 (sơ tuyển Vẽ mỹ thuật); các phương thức khác (kết hợp, học bạ, ĐGNL/ĐGTD, chứng chỉ) chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vmuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo tuyển sinh đại học hệ chính quy năm 2026',
      url: 'https://tuyensinh.vimaru.edu.vn/tuyensinh/2026-thong-bao-tuyen-sinh-dai-hoc-he-chinh-quy-nam-2026.vmu',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
