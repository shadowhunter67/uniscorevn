import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hauAdmissionMethods } from './methods';

export const hauModule: SchoolModule = {
  id: 'hau',
  name: 'Trường Đại học Kiến trúc Hà Nội',
  shortName: 'HAU',
  about: 'Trường đại học công lập tại Hà Nội, đào tạo kiến trúc, xây dựng, kỹ thuật hạ tầng, kinh tế và mỹ thuật ứng dụng.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển HAU 2026 (thí sinh không điểm cộng thành tích) cho 9 mã ngành dùng tổ hợp văn hóa chuẩn (A00/A01/C01/C02/D01): ĐXT = round2(tổng thô 3 môn + điểm ưu tiên KV/ĐT theo Điều 7 TT 06/2026) — trích nguyên văn Quyết định 406/QĐ-ĐHKT-ĐT Điều 1 ("mức điểm nhận hồ sơ = tổng điểm tổ hợp + ưu tiên + điểm cộng nếu có"); đủ điều kiện nộp hồ sơ khi ĐXT ≥ 15,0/30 (Kỹ thuật hạ tầng/Giao thông đô thị/Cấp thoát nước) hoặc ≥ 18,0/30 (Xây dựng/Kinh tế/CNTT) · Ngoài phạm vi: 13/22 ngành năng khiếu (Kiến trúc, Quy hoạch, Điêu khắc, Thiết kế...) và thí sinh có điểm cộng thành tích.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hauAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Quyết định 406/QĐ-ĐHKT-ĐT: Công bố mức điểm nhận hồ sơ xét tuyển đại học chính quy năm 2026',
      url: 'https://hau.edu.vn/Quyet-dinh-ve-viec-cong-bo-muc-diem-nhan-ho-so-xet-tuyen-dai-hoc-hinh-thuc-chinh-quy-nam-2026-doi-voi-phuong-thuc-xet-tuyen-dua-vao-ket-qua-thi-tot-nghiep-THPT-nam-2026-va-phuong-thuc-thi-tuyen-ket-hop-voi-xet-tuyen_n4749.html',
      type: 'official-institution',
      checkedAt: '2026-08-25',
    },
  ],
};
