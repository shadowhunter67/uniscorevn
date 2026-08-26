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
    'Đã xác minh trực tiếp Quyết định 406/QĐ-ĐHKT-ĐT (03/07/2026, đọc từ file PDF/Phụ lục đính kèm bài đăng chính thức): mức điểm nhận hồ sơ 2 nhóm ngành dùng tổ hợp văn hóa chuẩn (A00/A01/C01/C02/D01) — Kỹ thuật hạ tầng/Giao thông đô thị/Cấp thoát nước (15,0/30), Xây dựng/Kinh tế/CNTT (18,0/30). 13/22 ngành còn lại (Kiến trúc, Quy hoạch, Điêu khắc, Thiết kế...) cần điểm thi năng khiếu — chưa có field tương ứng nên chưa model. Mức điểm công bố đã bao gồm ưu tiên/điểm cộng, runtime hiện chỉ so điểm thô 3 môn.',
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
