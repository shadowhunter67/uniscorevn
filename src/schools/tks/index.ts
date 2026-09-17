import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tksAdmissionMethods } from './methods';

export const tksModule: SchoolModule = {
  id: 'tks',
  name: 'Trường Đại học Kiểm sát Hà Nội',
  shortName: 'TKS',
  about: 'Cơ sở đào tạo đại học ngành Luật trực thuộc Viện Kiểm sát nhân dân tối cao, có phân hiệu tại TP.HCM.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển TKS 2026 (thi TN THPT, nhóm Luật/Luật kinh tế/Ngôn ngữ Anh — KHÔNG bao gồm chuyên ngành Kiểm sát vì cutoff riêng theo giới tính): ĐXT (quy về tổ hợp D01) = tổng thô tổ hợp đã chọn + độ lệch tổ hợp (Phụ lục II) + điểm ưu tiên. Đủ điều kiện trúng tuyển khi ĐXT đạt điểm chuẩn: Luật 23,40/30 (Trụ sở chính) hoặc 22,80/30 (Phân hiệu TP.HCM), Luật kinh tế 23,90/30, Ngôn ngữ Anh 21,50/30 — điểm chuẩn đã công bố "gồm điểm ưu tiên". LƯU Ý: còn điều kiện "Đạt sơ tuyển" (áp dụng ngành Kiểm sát) ngoài phạm vi điểm số. Phương thức học bạ, ĐGNL chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(tksAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo 283/TB-T2-ĐT — Điểm chuẩn trúng tuyển đại học chính quy năm 2026',
      url: 'https://tuyensinh.kiemsat.edu.vn/thong-bao-diem-chuan-xet-tuyen-dai-hoc-2026.html',
      type: 'official-institution',
      checkedAt: '2026-09-17',
    },
    {
      title: 'Phụ lục II — Bảng quy đổi điểm tương đương giữa các phương thức xét tuyển năm 2026',
      url: 'https://tuyensinh.kiemsat.edu.vn/quy-tac-quy-doi-diem-va-nguong-dau-vao-tuyen-sinh-dai-hoc-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-09-17',
    },
  ],
};
