import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { bmtuAdmissionMethods } from './methods';

export const bmtuModule: SchoolModule = {
  id: 'bmtu',
  name: 'Trường Đại học Y Dược Buôn Ma Thuột',
  shortName: 'BMTU',
  about: 'Trường đại học tư thục (mã trường BMU) tại Đắk Lắk, đào tạo khối ngành sức khỏe: Y khoa, Y học cổ truyền, Y học dự phòng, Dược học, Kỹ thuật xét nghiệm y học, Điều dưỡng, Y tế công cộng.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'BMTU 2026 (phương thức 1 — xét kết quả thi TN THPT, mục 2.1.a đề án, Quyết định 396/QĐ-YDBMT, nguồn chính chủ bmu.edu.vn): công thức ĐXT = tổng thô 3 môn + điểm ưu tiên (khung quốc gia, judgment call) + điểm thưởng HSG (mục 7 đề án, caller tự truyền qua context). Điểm chuẩn 2026 theo ngành (`sources.ts:bmtu-threshold-2026`, Báo Thanh Niên đưa tin thông báo 10/8/2026 của trường) chỉ mô hình hoá được 2/7 ngành đủ tách bạch rõ ràng: Y khoa (22,0/30) và Dược học (20,0/30) — 5 ngành còn lại bị gộp nhóm trong bản tin đã đọc nên chưa model để tránh gán nhầm. Điều kiện phụ (Sinh/Hóa lớp 12 >= 6,5) đọc trực tiếp từ đề án. 5 tổ hợp môn (A00/A01/B00/B08/D07) map từ 3 "nhóm tổ hợp" linh hoạt của trường — nhánh dùng Tin học/Công nghệ chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(bmtuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Đề án/Thông tin tuyển sinh đại học chính quy năm 2026 (Quyết định 396/QĐ-YDBMT)',
      url: 'https://bmu.edu.vn/de-an-tuyen-sinh',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Điểm chuẩn Trường ĐH Y dược Buôn Ma Thuột 2026: Y khoa cao nhất (Báo Thanh Niên)',
      url: 'https://thanhnien.vn/diem-chuan-truong-dh-y-duoc-buon-ma-thuot-y-khoa-cao-nhat-185260810152809417.htm',
      type: 'secondary',
      checkedAt: '2026-09-03',
    },
  ],
};
