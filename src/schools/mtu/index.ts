import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { mtuAdmissionMethods } from './methods';

export const mtuModule: SchoolModule = {
  id: 'mtu',
  name: 'Trường Đại học Xây dựng Miền Tây',
  shortName: 'MTU',
  about: 'Trường đại học công lập tại Vĩnh Long, đào tạo 28 ngành khối xây dựng, kỹ thuật, kinh tế.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển MTU 2026 (Phương thức 1 — thi TN THPT): ĐXT = round2(tổng thô 3 môn + điểm ưu tiên) — trích nguyên văn PDF "Phương thức tuyển sinh năm 2026" ("Điểm xét tuyển = Điểm thi THPT môn 1 + môn 2 + môn 3 + Điểm ưu tiên (nếu có) + Điểm cộng (nếu có)"); đủ điều kiện khi TỔNG THÔ ≥ 15,0/30 (điều kiện điểm riêng, đồng nhất cả 28 ngành, tổ hợp bắt buộc có môn Toán trọng số ≥1/3). Phương thức ĐGNL ĐHQG-HCM, V-SAT và học bạ chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(mtuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh năm 2026 — MTU',
      url: 'http://tuyensinh.mtu.edu.vn/Thongtintuyensinh.aspx',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
  ],
};
