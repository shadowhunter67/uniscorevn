import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { actvnAdmissionMethods } from './methods';

export const actvnModule: SchoolModule = {
  id: 'actvn',
  name: 'Học viện Kỹ thuật Mật mã',
  shortName: 'ACTVN',
  about:
    'Học viện Kỹ thuật Mật mã (mã trường KMA, thuộc Ban Cơ yếu Chính phủ, trụ sở Hà Nội, cơ sở phía Nam tại TP.HCM), đào tạo hệ phục vụ lĩnh vực kinh tế - xã hội gồm An toàn thông tin (Hà Nội, TP.HCM), Công nghệ thông tin và Kỹ thuật Điện tử - Viễn thông.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  entityLevel: 'academy',
  vnuhcm: false,
  summary:
    'ACTVN 2026 (xét kết quả thi TN THPT, hệ kinh tế - xã hội): điểm chuẩn trúng tuyển CHÍNH THỨC 4 mã xét tuyển, 23,96-25,8/30 (Quyết định 44/QĐ-HĐTS ngày 13/08/2026, `sources.ts:actvn-cutoff-2026`). Điểm xét = tổng 3 môn hệ số 1 theo tổ hợp (A00, A01, X26, X06, C01; Điện tử - Viễn thông: A00, A01, X06, X07) + điểm ưu tiên, trường xác nhận không chênh lệch giữa các tổ hợp (`actvn-notice-2026`). Điểm cộng chứng chỉ tiếng Anh, bảng ưu tiên riêng (dùng khung quốc gia làm judgment call) và các phương thức khác chưa mô hình hoá (xem knowledgeGaps.ts).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(actvnAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo điểm chuẩn trúng tuyển vào đại học hệ chính quy năm 2026 — Học viện Kỹ thuật Mật mã',
      url: 'https://tuyensinh.actvn.edu.vn/thong-bao-diem-chuan-trung-tuyen-vao-dai-hoc-he-chinh-quy-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-10-01',
    },
    {
      title: 'Thông báo tuyển sinh đại học chính quy năm 2026 — Học viện Kỹ thuật Mật mã',
      url: 'https://tuyensinh.actvn.edu.vn/thong-bao-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-2/',
      type: 'official-institution',
      checkedAt: '2026-10-01',
    },
  ],
};
