import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { ntuAdmissionMethods } from './methods';

export const ntuModule: SchoolModule = {
  id: 'ntu',
  name: 'Trường Đại học Nha Trang',
  shortName: 'NTU',
  about:
    'Trường đại học công lập đa ngành tại Nha Trang, Khánh Hòa (mã trường TSN), đào tạo các nhóm Kinh tế - Ngoại ngữ, Kỹ thuật - Công nghệ, Công nghệ - Thủy sản và các chương trình đào tạo đặc biệt/theo đặt hàng doanh nghiệp (Minh Phú, Hải Vương).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'NTU 2026 (xét điểm thi TN THPT, THANG 40, tổ hợp 4 môn): điểm trúng tuyển CHÍNH THỨC 53 chương trình, mỗi chương trình có điểm riêng cho từng mã tổ hợp (19,62-27,66/40, `sources.ts:ntu-cutoff-2026`). Điểm xét = tổng 4 vị trí điểm của tổ hợp (môn "*2" nhân đôi, VD T2VA = Toán*2 + Văn + Anh) + điểm ưu tiên quy sang thang 40; mô hình tính mọi tổ hợp thí sinh đủ điểm và chọn tổ hợp có chênh lệch tốt nhất so với điểm trúng tuyển của chính tổ hợp đó. Điểm ưu tiên dùng khung quốc gia x4/3 (judgment call như HANU/AJC); điều kiện tiếng Anh và điểm cộng chưa mô hình hoá (xem knowledgeGaps.ts).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(ntuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo điểm chuẩn trúng tuyển năm 2026 — Trường Đại học Nha Trang',
      url: 'https://tuyensinh.ntu.edu.vn/thong-bao/thong-bao-diem-chuan-trung-tuyen-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-10-01',
    },
    {
      title: 'Bảng quy đổi điểm tương đương giữa các phương thức xét tuyển năm 2026 — Trường Đại học Nha Trang',
      url: 'https://tuyensinh.ntu.edu.vn/thong-bao/quy-doi-diem-tuong-duong',
      type: 'official-institution',
      checkedAt: '2026-10-01',
    },
  ],
};
