import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { bafuAdmissionMethods } from './methods';

export const bafuModule: SchoolModule = {
  id: 'bafu',
  name: 'Trường Đại học Nông - Lâm Bắc Giang',
  shortName: 'BAFU',
  about: 'Trường đại học công lập tại Bắc Giang (Bắc Ninh sau sáp nhập), đào tạo khối ngành nông-lâm nghiệp, kinh tế, kỹ thuật, ngôn ngữ.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển BAFU 2026 (Phương thức 2 — thi TN THPT): ĐXT = round2(tổng thô 3 môn + điểm ưu tiên) — trích nguyên văn "Thông tin tuyển sinh năm 2026" ("ĐXT = ĐM1+ĐM2+ĐM3+ĐƯT"); đủ điều kiện xét tuyển khi TỔNG THÔ ≥ 15,0/30 (ngưỡng ghi rõ chưa gồm ưu tiên), đồng nhất cả 20 ngành. Phạm vi tổ hợp: tập chung nằm trong taxonomy hiện có (A00/A01/A02/B00/A07/B03/C01/C02/C03/C04/D01/X01/X02). Phương thức ĐGTD và học bạ chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(bafuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh năm 2026 (cập nhật 02/03/2026) — BAFU',
      url: 'https://bafu.edu.vn/home/tin-tuc/dao-tao-tuyen-sinh/4581-thong-tin-tuyen-sinh-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
  ],
};
