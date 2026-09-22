import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { nttuAdmissionMethods } from './methods';

/**
 * Module NTTU (Trường Đại học Nguyễn Tất Thành, mã trường NNT) — research 2026-08-21, browser
 * thật (chrome-devtools, đọc trực tiếp `tuyensinh.ntt.edu.vn`). Ngưỡng điểm sàn phương thức học
 * bạ theo 6 nhóm ngành (Y khoa 23, Răng-Hàm-Mặt 23, Y học cổ truyền & Dược học 21, Điều dưỡng và
 * nhóm liên quan 19, Luật 18, các ngành còn lại 18 — thang 30) đã verified từ 1 bài công bố chính
 * thức. Chưa có `Page` riêng (chỉ data/eligibility layer, như AGU/VLU/HUIT) — chưa đủ scope dựng
 * UI calculator khi danh mục ngành, bảng ưu tiên/điểm cộng, và phương thức ĐGNL vẫn còn là
 * knowledge gap (xem `knowledgeGaps.ts`).
 */
export const nttuModule: SchoolModule = {
  id: 'nttu',
  name: 'Trường Đại học Nguyễn Tất Thành',
  shortName: 'NTTU',
  about: 'Trường đại học tư thục đa ngành tại TP.HCM, đào tạo mạnh về khối Sức khỏe (Y khoa, Răng - Hàm - Mặt, Dược học) và công nghệ - kỹ thuật.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'NTTU 2026 (thi TN THPT): điểm chuẩn thật (công bố 09/8/2026) theo 6 nhóm ngành — Y khoa/Răng-Hàm-Mặt 22/30, Dược học/Y học cổ truyền 20/30, Điều dưỡng/YHDP/KTXNYH/KTPHCN 18/30, Luật/Luật kinh tế 20/30, còn lại 15/30 — so tổng thô (nguồn không có anchor điểm ưu tiên, không hiển thị). Ngưỡng điểm sàn phương thức học bạ theo 6 nhóm ngành (thang 30) đã xác minh riêng · ĐGNL và phương pháp tính điểm học bạ chi tiết chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(nttuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn cao nhất Trường ĐH Nguyễn Tất Thành là 22 điểm',
      url: 'https://ntt.edu.vn/diem-chuan-cao-nhat-truong-dh-nguyen-tat-thanh-la-22-diem/',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
  ],
};
