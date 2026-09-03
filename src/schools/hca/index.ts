import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hcaAdmissionMethods } from './methods';

export const hcaModule: SchoolModule = {
  id: 'hca',
  name: 'Học viện Cán bộ Thành phố Hồ Chí Minh',
  shortName: 'HCA',
  about: 'Học viện trực thuộc Thành ủy Thành phố Hồ Chí Minh (mã trường HVC), đào tạo 5 ngành đại học chính quy: Luật, Quản lý nhà nước, Xây dựng Đảng và Chính quyền nhà nước, Chính trị học, Công tác xã hội.',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'hcm',
  vnuhcm: false,
  entityLevel: 'academy',
  summary:
    'HCA 2025 (phương thức 100 — xét kết quả thi TN THPT, mục 6.1.6 phần II Thông tin tuyển sinh 639-QĐ/HVCB, nguồn chính chủ): công thức Điểm xét tuyển = M1+M2+M3 (tổng thô 3 môn theo tổ hợp) + Điểm cộng Khuyến khích (Phụ lục 3, caller tự truyền qua context) + Điểm ưu tiên (Phụ lục 4 — HCA TỰ công bố bảng mức và công thức giảm dần, KHÔNG phải judgment call như đa số trường khác trong campaign). Điểm chuẩn 2025 theo cả 5/5 ngành (`sources.ts:hca-de-an-2026` mục 11, cross-checked với Cổng TTĐT Chính phủ) — mô hình hoá toàn bộ danh mục ngành đại học chính quy của Học viện. Tổ hợp môn dùng đúng bộ 2025 (`sources.ts:hca-notice-09-2025`), khác bộ 2026 nên không tái sử dụng cho năm sau nếu chưa cập nhật lại.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hcaAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo số 09-TB/HĐTS-HVCB (19/6/2025) — Về tiếp nhận thông tin xét tuyển đại học hệ chính quy năm 2025',
      url: 'https://images.tuyensinh247.com/picture/2025/0620/hoc-vien-can-bo-tphcm_1.pdf',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Quyết định số 639-QĐ/HVCB (22/5/2026) — Thông tin tuyển sinh trình độ đại học hệ chính quy năm 2026 (kèm bảng điểm trúng tuyển 2025)',
      url: 'https://cdn.tuyensinh247.com/picture/2026/0618/639-687-qd-hvcb-12062026074819848-yd4tlk4ipv4-1.pdf',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Điểm chuẩn Học viện Cán bộ TPHCM 2025 (Cổng thông tin điện tử Chính phủ)',
      url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-hoc-vien-can-bo-tphcm-2025-119250823091527247.htm',
      type: 'official-local-authority',
      checkedAt: '2026-09-03',
    },
  ],
};
