import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tnuflAdmissionMethods } from './methods';

export const tnuflModule: SchoolModule = {
  id: 'tnufl',
  name: 'Truong Ngoai ngu - Dai hoc Thai Nguyen',
  shortName: 'TNUFL',
  about: 'Public foreign-language member school of Thai Nguyen University.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Đã xác minh điểm chuẩn trúng tuyển chính thức 2026 của TNUFL qua trang hệ thống tnu.edu.vn: 2/5 ngành liên quan Tiếng Anh (Ngôn ngữ Anh, Sư phạm Tiếng Anh) lên exact — Điểm xét = tổng 3 môn (tổ hợp D01/D14/D15/X78) + điểm ưu tiên KV/ĐT (khung quốc gia hiện hành). 3 ngành dùng ngoại ngữ Trung/Hàn (Ngôn ngữ Trung Quốc, Ngôn ngữ Hàn Quốc, Sư phạm Tiếng Trung Quốc) chưa mô hình hoá — hệ thống chỉ có SubjectId cho Tiếng Anh.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: true,
    ...aggregateSchoolCapabilities(tnuflAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Truong Ngoai ngu - Dai hoc Thai Nguyen cong bo diem chuan trung tuyen dai hoc nam 2026',
      url: 'https://tnu.edu.vn/dao-tao/truong-ngoai-ngu-dai-hoc-thai-nguyen-cong-bo-diem-chuan-trung-tuyen-dai-hoc-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
