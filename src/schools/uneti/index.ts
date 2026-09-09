import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { unetiAdmissionMethods } from './methods';

export const unetiModule: SchoolModule = {
  id: 'uneti',
  name: 'Trường Đại học Kinh tế - Kỹ thuật Công nghiệp',
  shortName: 'UNETI',
  about:
    'Trường đại học công lập trực thuộc Bộ Công Thương (mã trường DKK), đào tạo đa ngành kinh tế - kỹ thuật tại 2 cơ sở: Hà Nội (454-456 Minh Khai, phường Vĩnh Tuy và 218 Lĩnh Nam, phường Hoàng Mai) và Ninh Bình (353 Trần Hưng Đạo, phường Nam Định và KCN Mỹ Xá, phường Thành Nam). Năm 2026 tuyển 27 mã xét tuyển tại Hà Nội (hậu tố DKK) và 22 mã tại Ninh Bình (hậu tố DKD).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'UNETI 2026 (Phương thức 2 — xét kết quả kỳ thi TN THPT): công thức CÓ HỆ SỐ THEO VỊ TRÍ MÔN, khác đa số trường trong hệ thống — "ĐXT = (ĐPT2 + KK) + UT" với "ĐPT2 = (M1 × 4,5 + M2 × 3,5 + M3 × 2) × 3/10" (thang 30, trần 30), lấy nguyên văn Thông tin tuyển sinh năm 2026 chính chủ uneti.edu.vn (`sources.ts:uneti-thongtin-tuyensinh-2026`, file Word gốc 20 trang). Vì hệ số gắn với VỊ TRÍ, bảng 4 nhóm tổ hợp CÓ THỨ TỰ MÔN lấy từ mã nguồn công cụ tính điểm chính chủ dkxt.uneti.edu.vn/tinh-diem (`sources.ts:uneti-tohop-dkxt-2026`) — cùng cổng này cũng cài đặt đúng công thức, mức điểm ưu tiên KV/ĐT và công thức giảm dần quanh mốc 22,50/30, khớp Điều 7 Thông tư 06/2026/TT-BGDĐT. Điểm trúng tuyển CHÍNH THỨC theo TỪNG mã xét tuyển và TỪNG cơ sở từ Thông báo số 826/TB-ĐHKTKTCN ngày 09/8/2026 (`sources.ts:uneti-diemtrungtuyen-826-2026`): 27/27 mã Hà Nội (20,00-24,50/30) + 22/22 mã Ninh Bình (19,00-21,00/30) = 49/49 mã xét tuyển. Có mô hình hoá điều kiện nguồn tuyển (tổng thô 3 môn >= 15,00/30) và điều kiện riêng ngành Ngôn ngữ Anh (điểm môn Tiếng Anh trong tổ hợp >= 6,00). CHƯA mô hình hoá: thành phần KK (điểm xét thưởng thành tích + điểm khuyến khích chứng chỉ ngoại ngữ — bảng giá trị đã đọc đủ), quy đổi chứng chỉ tiếng Anh thay điểm thi môn Tiếng Anh, Phương thức 3 (học bạ, đã có đủ công thức + điểm chuẩn), Phương thức 4/5 (ĐGTD thang 100 / ĐGNL thang 150), tiêu chí phụ thứ tự nguyện vọng, và khoản +3,00 điểm mà công cụ tính điểm của trường cộng cho cơ sở Ninh Bình (bất nhất với bảng điểm chuẩn riêng đã công bố — xem `knowledgeGaps.ts`).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(unetiAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh năm 2026 — Trường Đại học Kinh tế - Kỹ thuật Công nghiệp',
      url: 'https://uneti.edu.vn/thong-tin-tuyen-sinh-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-09-09',
    },
    {
      title: 'Thông báo số 826/TB-ĐHKTKTCN (09/8/2026) — Điểm trúng tuyển đại học hệ chính quy năm 2026',
      url: 'https://tuyensinh.uneti.edu.vn/tb-tt-2026.html',
      type: 'official-institution',
      checkedAt: '2026-09-09',
    },
  ],
};
