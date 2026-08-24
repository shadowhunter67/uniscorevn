import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { fbuAdmissionMethods } from './methods';

export const fbuModule: SchoolModule = {
  id: 'fbu',
  name: 'Trường Đại học Tài chính - Ngân hàng Hà Nội',
  shortName: 'FBU',
  about: 'Trường đại học tư thục tại Hà Nội, đào tạo các ngành tài chính, ngân hàng, kinh tế.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Đã xác minh ngưỡng đảm bảo chất lượng đầu vào FBU 2026 (thi TN THPT) là 17,0/30 điểm cho mọi ngành, qua phát biểu công khai của Phó Hiệu trưởng FBU (báo Dân Việt) đối chiếu điểm trúng tuyển thực tế 17,0-21,5/30 (báo Tiền Phong). Thông báo tuyển sinh chính thức số 99/TB-ĐHTCNH xác nhận 3 phương thức nhưng chưa đọc được bảng ngưỡng bằng số trong văn bản gốc ở lượt research này. Module hiện chỉ kiểm tra ngưỡng chung theo thi TN THPT, chưa có bảng ngành/tổ hợp, ngưỡng học bạ/ĐGNL, hoặc điểm cộng.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(fbuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo công bố thông tin tuyển sinh đại học chính quy năm 2026 (số 99/TB-ĐHTCNH)',
      url: 'https://vienngonngunuocngoai.fbu.edu.vn/thong-bao-cong-bo-thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Dự báo điểm chuẩn và ngành hot ở Trường Đại học Tài chính - Ngân hàng Hà Nội 2026 (báo Dân Việt)',
      url: 'https://danviet.vn/lanh-dao-truong-dai-hoc-tai-chinh-ngan-hang-ha-noi-du-bao-diem-chuan-va-nganh-hot-nam-2026-d1440933.html',
      type: 'secondary',
      checkedAt: '2026-08-24',
    },
  ],
};
