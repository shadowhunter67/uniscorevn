import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vaaAdmissionMethods } from './methods';

export const vaaModule: SchoolModule = {
  id: 'vaa',
  name: 'Học viện Hàng không Việt Nam',
  shortName: 'VAA',
  about: 'Public academy in TP.HCM under the Ministry of Transport, training aviation-industry programs.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'VAA 2026 (Phương thức 1 xét điểm thi TN THPT và Phương thức 2 xét học bạ): điểm trúng tuyển CHÍNH THỨC theo 36 mã xét tuyển (THPT 18–27,5/30, học bạ 20–28,13/30, `sources.ts:vaa-cutoff-2026`). Điểm xét = (môn thứ nhất x 3 + môn thứ hai x 2 + môn thứ ba)/2 + điểm ưu tiên (`vaa-notice-2026`), môn theo nhóm tổ hợp TA01/TA02/DT01/DT02 (môn tự chọn lấy theo điểm cao nhất, trường không quy định độ lệch giữa các tổ hợp); điểm ưu tiên theo bảng mức và công thức giảm của chính VAA. Điểm cộng giải thưởng, quy đổi chứng chỉ ngoại ngữ, môn Tiếng Hàn/Tiếng Trung và điều kiện phụ ngoại ngữ chưa mô hình hoá (xem knowledgeGaps.ts); các phương thức ĐGNL, SAT/ACT/IB chưa tính.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vaaAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Tuyển sinh Đại học chính quy năm 2026',
      url: 'https://tuyensinh.vaa.edu.vn/vi/tuyen-sinh/dai-hoc/tuyen-sinh-dai-hoc-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'LÀM SAO ĐỂ XÉT HỌC BẠ VÀO HỌC VIỆN HÀNG KHÔNG VIỆT NAM 2026?',
      url: 'https://tuyensinh.vaa.edu.vn/vi/tin-tuc/lam-sao-de-xet-hoc-ba-vao-hoc-vien-hang-khong-viet-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Chính thức công bố điểm trúng tuyển đại học chính quy VAA 2026',
      url: 'https://vau.edu.vn/chinh-thuc-cong-bo-diem-trung-tuyen-dai-hoc-chinh-quy-vaa-2026/',
      type: 'official-institution',
      checkedAt: '2026-10-01',
    },
    {
      title: 'Thông tin tuyển sinh đại học chính quy năm 2026 — Học viện Hàng không Việt Nam',
      url: 'https://vau.edu.vn/chi-tiet-sinh-vien/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-chinh-thuc/',
      type: 'official-institution',
      checkedAt: '2026-10-01',
    },
  ],
};
