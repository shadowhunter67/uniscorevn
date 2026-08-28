import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dtuAdmissionMethods } from './methods';

export const dtuModule: SchoolModule = {
  id: 'dtu',
  name: 'Truong Dai hoc Duy Tan',
  shortName: 'DTU',
  about: 'Large private multidisciplinary university based in Da Nang.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển DTU 2026 (thi TN THPT, ngành chung, thí sinh không điểm cộng): ĐXT = round2(tổng thô 3 môn + điểm ưu tiên KV/ĐT theo Điều 7 TT 06/2026) — công thức trích nguyên văn trang tuyển sinh chính thức ("Điểm Xét tuyển = Điểm thi môn 1 + môn 2 + môn 3 + Điểm cộng + Điểm ưu tiên"); đủ điều kiện xét tuyển khi ĐXT ≥ 15,0/30. Ngành pháp luật (18,0 + điều kiện học lực), Điều dưỡng/KTXN (16,5 + học lực), Y khoa/RHM/Dược (20,0 + học lực), Kiến trúc/Thanh nhạc (năng khiếu) ngoài phạm vi. Học bạ, V-SAT, ĐGNL, quy đổi IELTS chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(dtuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Official 2026 undergraduate admission information',
      url: 'https://duytan.edu.vn/tuyen-sinh/page/EnrollArticleViewDetail.aspx?id=1010',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
