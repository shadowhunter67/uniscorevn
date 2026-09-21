import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hnueAdmissionMethods } from './methods';

export const hnueModule: SchoolModule = {
  id: 'hnue',
  name: 'Trường Đại học Sư phạm Hà Nội',
  shortName: 'HNUE',
  about: 'Trường đại học sư phạm công lập trọng điểm quốc gia tại Hà Nội, đào tạo giáo viên, khoa học giáo dục và nhiều ngành khoa học cơ bản, xã hội, nhân văn.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'HNUE 2026, xét kết quả thi TN THPT: kiểm tra điểm sàn theo từng ngành (51/57 ngành, bảng chính thức 9 lĩnh vực: 18–22/30, GD Tiểu học 21, SP Toán dạy bằng tiếng Anh 22, Hóa học 18,5...). Điểm sàn là tổng 3 môn KHÔNG nhân hệ số, KHÔNG tính điểm cộng, xác định cho thí sinh khu vực 3, dùng chung mọi tổ hợp: đủ điều kiện khi tổng thô ≥ sàn, không đủ khi cộng ưu tiên tối đa vẫn < sàn, còn lại chưa kết luận (nguồn không nói ưu tiên tính trước hay sau sàn). Ngoài phạm vi: 6 ngành năng khiếu (Mầm non, GD Thể chất, SP Âm nhạc, SP Mỹ thuật, Huấn luyện thể thao), phương thức khác; chưa có điểm xét tuyển cuối và điểm chuẩn.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hnueAdmissionMethods),
  },
};
