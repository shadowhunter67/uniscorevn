import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { pvuAdmissionMethods } from './methods';

export const pvuModule: SchoolModule = {
  id: 'pvu',
  name: 'Trường Đại học Dầu khí Việt Nam',
  shortName: 'PVU',
  about: 'Trường đại học công lập trực thuộc Tập đoàn Dầu khí Việt Nam (Petrovietnam), tại Bà Rịa - Vũng Tàu, đào tạo chuyên sâu khối ngành kỹ thuật dầu khí.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'PVU 2026 (Phương thức 1 — xét kết quả thi TN THPT, hệ chính quy trong nước): điểm chuẩn 22,50/30 áp dụng đồng nhất cho cả 3 ngành (Kỹ thuật Địa chất, Kỹ thuật Dầu khí, Kỹ thuật Hóa học) và tất cả 11 tổ hợp — nguồn CHÍNH CHỦ pvu.edu.vn cho cả điều kiện xét tuyển (tổng thô 3 môn, `pvu-admission-info-2026`) và điểm chuẩn đợt 1 (`pvu-threshold-2026`), cùng năm 2026. Điểm ưu tiên KV/ĐT trường không công bố mức cụ thể — dùng khung quốc gia hiện hành (judgment call giá trị, `priority.ts`). Phương thức học bạ/ĐGNL/ĐGTD/xét thẳng và hệ liên kết quốc tế chưa mô hình hoá (`knowledgeGaps.ts`).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(pvuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin Tuyển sinh Đại học Chính quy năm 2026',
      url: 'https://www.pvu.edu.vn/tuyen-sinh/tuyen-sinh-2026/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Thông báo điểm chuẩn trúng tuyển đợt 1 trình độ đại học hệ chính quy và hệ liên kết năm 2026',
      url: 'https://www.pvu.edu.vn/tuyen-sinh/tuyen-sinh-2026/thong-bao-diem-chuan-trung-tuyen-dot-1-trinh-do-dai-hoc-he-chinh-quy-va-he-lien-ket-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
  ],
};
