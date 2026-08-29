import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hnmuAdmissionMethods } from './methods';

export const hnmuModule: SchoolModule = {
  id: 'hnmu',
  name: 'Trường Đại học Thủ đô Hà Nội',
  shortName: 'HNMU',
  about: 'Trường đại học công lập trực thuộc UBND Thành phố Hà Nội, đào tạo đa ngành với thế mạnh sư phạm.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Tính chính xác điều kiện đạt ngưỡng đảm bảo chất lượng đầu vào HNMU 2026 (phương thức thi TN THPT) theo nhóm ngành: thông báo ngưỡng công bố 04/07/2026 (cross-checked qua giadinh.suckhoedoisong.vn và vietnamnet.vn, không tìm được văn bản gốc PDF hnmu.edu.vn) xác nhận NGUYÊN VĂN tổng thô 3 môn/bài thi không nhân hệ số, không tính điểm cộng, áp dụng thí sinh khu vực 3: chương trình đào tạo giáo viên = 20/30 (riêng Giáo dục Thể chất = 19/30); chương trình pháp luật = 20/30 (kèm điều kiện phụ Toán/Văn >=6, chưa mô hình hoá); các ngành/chương trình khác = 16/30. Không cộng điểm ưu tiên khu vực/đối tượng khi hiển thị (theo tiền lệ schools/hmu, nguồn cùng cách diễn đạt). Đây là điều kiện SÀN (đăng ký xét tuyển), không phải điểm chuẩn trúng tuyển cuối cùng. Phương thức xét học bạ THPT chưa chuẩn hoá vào runtime.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hnmuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Đạt mức điểm sàn này thí sinh có thể vào học Trường ĐH Thủ đô Hà Nội 2026',
      url: 'https://giadinh.suckhoedoisong.vn/dat-muc-diem-san-nay-thi-sinh-co-the-vao-hoc-truong-dh-thu-do-ha-noi-2026-17226071310124409.htm',
      type: 'secondary',
      checkedAt: '2026-08-30',
    },
  ],
};
