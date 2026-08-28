import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { fptuAdmissionMethods } from './methods';

export const fptuModule: SchoolModule = {
  id: 'fptu',
  name: 'Trường Đại học FPT',
  shortName: 'FPTU',
  about: 'Trường đại học tư thục đa cơ sở, thuộc Tập đoàn FPT.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Đã xác minh thông báo điểm sàn xét tuyển 2026 (daihoc.fpt.edu.vn, 01/07/2026): ngưỡng tổ hợp thô 3 môn thi TN THPT tối thiểu 15,0/30 (Axx/Cxx), áp dụng mọi ngành và mọi cơ sở đào tạo — nguồn tự phân biệt đây là "điều kiện tổ hợp thô", không phải điểm xét tuyển cuối cùng, nên UniscoreVN tính chính xác nhánh điều kiện sàn này (exact-verified). Điểm xét tuyển cuối cùng (ĐXT >= 18,0/30, hoặc 21,0/30 cho Cử nhân tài năng Khoa học máy tính) dùng công thức kết hợp điểm thi và học bạ lớp 12 nhưng định nghĩa "điểm trung bình lớp 12" không rõ ràng nên chưa mô hình hoá (do-not-guess-formula).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(fptuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh 2026 Trường Đại học FPT',
      url: 'https://daihoc.fpt.edu.vn/tuyen-sinh/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Trường Đại học FPT công bố điểm sàn xét tuyển hệ đại học chính quy năm 2026',
      url: 'https://daihoc.fpt.edu.vn/tin-tuc/truong-dai-hoc-fpt-cong-bo-diem-san-xet-tuyen-he-dai-hoc-chinh-quy-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
