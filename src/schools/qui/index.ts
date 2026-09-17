import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { quiAdmissionMethods } from './methods';

export const quiModule: SchoolModule = {
  id: 'qui',
  name: 'Trường Đại học Công nghiệp Quảng Ninh',
  shortName: 'QUI',
  about: 'Trường đại học công lập tại Quảng Ninh, đào tạo 12 ngành khối kỹ thuật, mỏ, kinh tế.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Kiểm tra ngưỡng điểm xét QUI 2026 (thi TN THPT): đủ điều kiện ⟺ tổng thô 3 môn ≥15/30, đồng nhất cả 12 ngành (Thông báo ngưỡng đảm bảo chất lượng, 12/7/2026). Nguồn không nói rõ đã gồm điểm ưu tiên hay chưa → so RAW, điểm ưu tiên chỉ hiển thị tham khảo. LƯU Ý: đây là điểm sàn nhận hồ sơ; bài thông báo điểm chuẩn trúng tuyển thật của trường bị lỗi thiếu nội dung tại thời điểm kiểm tra. Phương thức học bạ, kết hợp, ĐGNL/ĐGTD chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(quiAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo ngưỡng đảm bảo chất lượng đại học chính quy năm 2026 — QUI',
      url: 'https://tuyensinh.qui.edu.vn/tuyen-sinh-dai-hoc/thong-bao-nguong-dam-bao-chat-luong-va-bang-quy-doi-diem-tuong-duong-giua-cac-phuong-thuc-xet-tuyen-dai-hoc-chinh-quy-nam-2026-1117.html',
      type: 'official-institution',
      checkedAt: '2026-09-17',
    },
  ],
};
