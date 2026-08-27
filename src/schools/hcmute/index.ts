import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hcmuteAdmissionMethods } from './methods';

/**
 * Module HCMUTE — research 2026-08-18 (batch 1) tìm được văn bản chính thức "THÔNG TIN TUYỂN SINH
 * ĐẠI HỌC CHÍNH QUY NĂM 2026" số 1691/ĐHCNKT-ĐT (đã ký, có Phụ lục 4 ví dụ minh họa tính điểm tay
 * khớp chính xác công thức công bố — Tier A worked example, xem `sources.ts`/`evidence.ts`).
 * Re-audit 2026-08-18 (batch 2): hệ số tương quan a=0,8/b=0,8 đã được công bố chính thức (Thông
 * báo 2092/TB-ĐHCNKT, 07/7/2026) — HLy.1/HLy.2/HLy.3/HLy.max đều tính được (HLy.2 vẫn cần ĐXTT cho
 * thí sinh khai học bạ, xem `knowledgeGaps.ts`). Ngưỡng đầu vào chung, bảng điểm ưu tiên + công
 * thức giảm, ĐXTCN (2 mục chung) đã verified. 2026-08-27: unlock `exactCalculator` cho nhánh HẸP
 * `hcmute-thpt-exam-standard-2026` (xét THPT độc lập, nhóm ngành thường) theo pattern NCTU/USSH
 * "exact cho supported scope" — các nhánh còn lại (HLy.2/HLy.3, nhóm công thức khác, ngưỡng riêng,
 * ĐXTCN mục 1/4-7) vẫn partial trên `hcmute-combined-2026`, xem `methods.ts`/`knowledgeGaps.ts`.
 * Chưa có `Page` riêng (chỉ data/audit layer, giống AGU).
 */
export const hcmuteModule: SchoolModule = {
  id: 'hcmute',
  name: 'Trường Đại học Công nghệ Kỹ thuật TP. Hồ Chí Minh',
  shortName: 'HCMUTE',
  about:
    'Đại học công lập tự chủ tài chính, tiền thân từ năm 1962; đổi tên từ Đại học Sư phạm Kỹ thuật TP.HCM sang tên hiện tại cuối năm 2025.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'Tính đủ Điểm xét tuyển (exact) cho nhánh xét ĐIỂM THI TN THPT ĐỘC LẬP, nhóm ngành thường (ĐHL = HLy.1 có ví dụ minh họa chính thức Phụ lục 4, ĐXTCN 2 mục chung, điểm ưu tiên + công thức giảm — đều verified từ văn bản đã ký) · Các nhánh khác vẫn partial: HLy.2 (học bạ) chờ ĐXTT theo nhóm trường (Bảng 3), HLy.3 (ĐGNL) và nhóm công thức Ngôn ngữ Anh/Kiến trúc-Thiết kế, ngưỡng riêng SP tiếng Anh/SP công nghệ/Luật, ĐXTCN mục 1/4-7',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hcmuteAdmissionMethods),
  },
};
