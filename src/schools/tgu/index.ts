import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tguAdmissionMethods } from './methods';

export const tguModule: SchoolModule = {
  id: 'tgu',
  name: 'Trường Đại học Tiền Giang',
  shortName: 'TGU',
  about: 'Public multidisciplinary university based in Tien Giang.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'TGU 2026 co mot nhanh tinh du Điểm xét tuyển (exact) cho Phương thức 1 (thi TN THPT), phạm vi "các ngành khác" (tru Luật va Giáo dục Mầm non), trích nguyên văn De an tuyen sinh chính thức: DXT = tổng thô 3 môn + điểm ưu tiên (judgment call theo Điều 7 TT 06/2026), điều kiện ĐXT >= 15,0/30 VA điểm Toán hoặc Ngữ văn >= 1/3 DXT. Ngành Luật va các phương thức khác (học bạ, V-SAT, danh gia năng lực) van o mức threshold-only/chưa model.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tguAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn / Ngưỡng đảm bảo chất lượng đầu vào Trường Đại học Tiền Giang năm 2026',
      url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-tien-giang-TTG.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
