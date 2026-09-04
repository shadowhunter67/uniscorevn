import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vyaAdmissionMethods } from './methods';

export const vyaModule: SchoolModule = {
  id: 'vya',
  name: 'Học viện Thanh thiếu niên Việt Nam',
  shortName: 'VYA',
  about:
    'Học viện công lập trực thuộc Trung ương Đoàn TNCS Hồ Chí Minh (mã trường HTN, trụ sở số 3 phố Chùa Láng, Đống Đa, Hà Nội, có phân hiệu tại TP.HCM), đào tạo 9 ngành đại học chính quy 2026: Công tác Thanh thiếu niên, Công tác Xã hội, Luật, Quan hệ Công chúng, Quản lý Nhà nước, Tâm lý học, Xây dựng Đảng và Chính quyền Nhà nước, Công nghệ thông tin, Kinh tế.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  entityLevel: 'academy',
  summary:
    'VYA 2026 (cơ sở Hà Nội): điểm trúng tuyển CHÍNH THỨC theo NGÀNH cho cả 2 phương thức — mã 100 (thi TN THPT, 9/9 ngành) và mã 200 (học bạ lớp 10/11/12, 7/9 ngành — Luật/Quan hệ công chúng "Không xét"). Công thức + tổ hợp môn + điểm trúng tuyển đều CHÍNH CHỦ, cùng năm 2026, cùng nguồn tuyensinh.vya.edu.vn (Quyết định 218/QĐ-HVTTNVN "Thông tin tuyển sinh năm 2026" cho công thức/tổ hợp, `sources.ts:vya-thong-tin-tuyen-sinh-2026`; Thông báo 162/TB-HVTTNVN 19/8/2026 ký tên + đóng dấu cho điểm trúng tuyển sau kỳ thi, `vya-cutoff-2026`). Điểm ưu tiên KV/ĐT trích NGUYÊN VĂN Điều 7 Quy chế tuyển sinh của chính trường (Quyết định 261/QĐ-HVTTNVN, `vya-quy-che-tuyen-sinh-2026`) — KHÔNG phải judgment call khung quốc gia thay thế, cùng tiền lệ VHS. Điểm cộng IELTS (mục 5.2.2, thang 30, trần 3,0/30) mô hình hoá qua `bonus.ts`. Loại trừ Phân hiệu TP.HCM (ngưỡng/chỉ tiêu riêng) và điểm thưởng xét tuyển thẳng không dùng quyền (không có field trong hồ sơ dùng chung) — xem knowledgeGaps.ts.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vyaAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Quyết định 218/QĐ-HVTTNVN — Thông tin tuyển sinh năm 2026 của Học viện Thanh thiếu niên Việt Nam',
      url: 'https://tuyensinh.vya.edu.vn/thong-tin-tuyen-sinh-vya-2026',
      type: 'official-institution',
      checkedAt: '2026-09-04',
    },
    {
      title: 'Thông báo 162/TB-HVTTNVN — Điểm trúng tuyển vào các ngành hệ đại học chính quy năm 2026',
      url: 'https://tuyensinh.vya.edu.vn/diem-trung-tuyen-cac-nganh-dai-hoc-vya-2026',
      type: 'official-institution',
      checkedAt: '2026-09-04',
    },
  ],
};
