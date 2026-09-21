import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { uteudnAdmissionMethods } from './methods';

export const uteudnModule: SchoolModule = {
  id: 'uteudn',
  name: 'Trường Đại học Sư phạm Kỹ thuật - Đại học Đà Nẵng',
  shortName: 'UTE',
  about: 'Trường thành viên khối sư phạm kỹ thuật của Đại học Đà Nẵng (UDN).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'UTE-ĐN 2026, xét điểm thi TN THPT kết hợp học bạ, 23/25 ngành/chuyên ngành (trừ Thiết kế vi mạch bán dẫn và Kiến trúc): ĐXT = điểm THPT × hệ số + điểm học bạ (TB 3 năm từng môn) × hệ số + điểm ưu tiên giảm dần khi ≥ 22,5 (hệ số 0,7/0,3; Công nghệ thông tin 1/0), tổ hợp theo từng ngành (bảng chính thức); đủ điều kiện xét tuyển ⟺ đạt ngưỡng đầu vào của ngành (15–20/30, bảng ảnh chính thức; Sư phạm KT công nghiệp so tổng 3 môn THPT + ưu tiên, ngành còn lại so ĐXT). Đúng cho thí sinh không có điểm cộng thành tích học tập (chưa có trong hồ sơ). Ngoài phạm vi: Thiết kế vi mạch bán dẫn (ngưỡng theo phân vị toàn quốc), Kiến trúc (tổ hợp Vẽ mỹ thuật), các phương thức khác. Có điểm chuẩn trúng tuyển 2026 của 25 ngành (bảng ảnh chính thức) để so sánh trong /compare.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: true,
    ...aggregateSchoolCapabilities(uteudnAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo tuyển sinh đại học chính quy năm 2026 của Đại học Đà Nẵng (đợt 1)',
      url: 'https://ts.udn.vn/DHCD/Chinhquy/DHTbao/19360',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'UTE - Trang tuyển sinh chính thức',
      url: 'https://tuyensinh.ute.udn.vn/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
