import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hmuAdmissionMethods } from './methods';

export const hmuModule: SchoolModule = {
  id: 'hmu',
  name: 'Trường Đại học Y Hà Nội',
  shortName: 'HMU',
  about: 'Trường đại học công lập trực thuộc Bộ Y tế, đào tạo khối ngành sức khoẻ tại Hà Nội.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Tính chính xác điều kiện đạt ngưỡng đảm bảo chất lượng đầu vào HMU 2026 (phương thức thi TN THPT) theo từng ngành: Thông báo số 3142/TB-ĐHYHN (10/07/2026) công bố ngưỡng theo 20 mã ngành (15 ngành cơ sở Hà Nội + 5 ngành/chương trình Phân hiệu Thanh Hoá, 17,0-24,0/30) là TỔNG THÔ 3 môn không nhân hệ số, KHÔNG cộng điểm ưu tiên/điểm khuyến khích — nhánh exact so trực tiếp tổng thô với ngưỡng ngành, không cần judgment call điểm ưu tiên. Không tìm được văn bản gốc dạng PDF (chỉ có nguồn thứ cấp đối chiếu khớp nhau, `verification: cross-checked`). Đây là điều kiện SÀN (đăng ký xét tuyển), không phải điểm chuẩn trúng tuyển cuối cùng. Các phương thức khác (xét tuyển thẳng, SPT quy đổi) chưa chuẩn hoá vào runtime.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hmuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo số 3142/TB-ĐHYHN về ngưỡng đảm bảo chất lượng đầu vào (điểm sàn) trình độ đại học hệ chính quy năm 2026',
      url: 'https://daibieunhandan.vn/truong-dai-hoc-y-ha-noi-thong-bao-diem-san-va-cac-moc-quy-doi-diem-nam-2026-10423254.html',
      type: 'secondary',
      checkedAt: '2026-08-29',
    },
  ],
};
