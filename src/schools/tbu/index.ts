import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tbuAdmissionMethods } from './methods';

export const tbuModule: SchoolModule = {
  id: 'tbu',
  name: 'Trường Đại học Thái Bình',
  shortName: 'TBU',
  about: 'Trường đại học công lập tại tỉnh Thái Bình, đào tạo đa ngành.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Đã xác minh trực tiếp bài đăng chính thức tbu.edu.vn (08/07/2026): ngưỡng nhận hồ sơ xét tuyển (thi TN THPT) — 18,0/30 cho ngành Luật, 15,0/30 cho các ngành khác. Đây là điều kiện tối thiểu để nộp hồ sơ, KHÔNG PHẢI điểm trúng tuyển cuối cùng (công thức điểm trúng tuyển "A+B+C" chưa rõ chi tiết A/B/C).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tbuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường Đại học Thái Bình thông báo ngưỡng đảm bảo chất lượng đầu vào, điểm trúng tuyển và quy đổi tương đương giữa các phương thức xét tuyển đại học chính quy năm 2026',
      url: 'https://tbu.edu.vn/truong-dai-hoc-thai-binh-thong-bao-nguong-dam-bao-chat-luong-dau-vao-diem-trung-tuyen-va-quy-doi-tuong-duong-giua-cac-phuong-thuc-xet-tuyen-dai-hoc-ch.html',
      type: 'official-institution',
      checkedAt: '2026-08-25',
    },
  ],
};
