import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { humgAdmissionMethods } from './methods';

export const humgModule: SchoolModule = {
  id: 'humg',
  name: 'Trường Đại học Mỏ - Địa chất',
  shortName: 'HUMG',
  about: 'Trường đại học công lập tại Hà Nội, đào tạo các ngành mỏ, địa chất, kỹ thuật, công nghệ thông tin, kinh tế và ngôn ngữ.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm Xét HUMG 2026 theo thi TN THPT cho toàn bộ 53 mã xét tuyển: Điểm Xét = Min[(3 môn tổng thô) + điểm cộng, 30] + điểm ưu tiên; ngưỡng theo mã 15-21/30 — công thức, công thức giảm điểm ưu tiên và bảng ngưỡng đều trích nguyên văn từ Thông báo ngưỡng điểm xét tuyển đợt 1 năm 2026 (04/07/2026, mục 7106). Mức điểm ưu tiên KV/ĐT áp theo Điều 7 Thông tư 08/2022 (nguồn chỉ nêu "gồm Khu vực, Đối tượng"). Điểm cộng (QĐ 674/QĐ-MĐC) do người dùng tự cung cấp; các phương thức quy đổi (học bạ/TSA/HSA) chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(humgAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo ngưỡng điểm xét tuyển đợt 1 hệ đại học năm 2026',
      url: 'https://ts.humg.edu.vn/tuyen-sinh/Pages/Thong-tin-tuyen-sinh.aspx?ItemID=7106',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
