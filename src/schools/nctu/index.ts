import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { nctuAdmissionMethods } from './methods';

export const nctuModule: SchoolModule = {
  id: 'nctu',
  name: 'Trường Đại học Nam Cần Thơ',
  shortName: 'NCTU',
  about: 'Trường đại học tư thục đa ngành tại Cần Thơ, đào tạo 48 ngành trình độ đại học chính quy.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'Tinh chính xác điểm xét tuyển NCTU 2026 theo thi TN THPT cho nhóm ngành ngoai Sức khỏe/Luật (ngưỡng 15/30, không hệ số mon, cộng điểm ưu tiên theo Điều 7 — bài hướng dẫn tu dang tren tuyensinh.nctu.edu.vn). Nhom Sức khỏe/Luật gate theo học lực lớp 12 (chưa có trường hồ sơ tuong ung) va bảng ngưỡng theo học bạ/V-SAT van chi o mức kiểm tra ngưỡng.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(nctuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo ngưỡng đảm bảo chất lượng đầu vào (điểm sàn) xét tuyển đại học chính quy năm 2026',
      url: 'https://nctu.edu.vn/truong-dai-hoc-nam-can-tho-cong-bo-diem-san-xet-tuyen-dai-hoc-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Đối tượng ưu tiên, điểm ưu tiên theo quy chế tuyển sinh đại học năm 2026',
      url: 'https://tuyensinh.nctu.edu.vn/news/2026/doi-tuong-uu-tien-diem-uu-tien-theo-quy-che-tuyen-sinh-dai-hoc-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-26',
    },
  ],
};
