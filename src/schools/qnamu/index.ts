import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { qnamuAdmissionMethods } from './methods';

export const qnamuModule: SchoolModule = {
  id: 'qnamu',
  name: 'Trường Đại học Quảng Nam',
  shortName: 'QNamU',
  about: 'Trường đại học công lập tại Quảng Nam, đào tạo đa ngành — batch này mô hình hoá 8 ngành sư phạm/xã hội: Giáo dục Tiểu học, Sư phạm Toán/Vật lý/Sinh học/Ngữ văn/Tiếng Anh/Khoa học tự nhiên, Lịch sử.',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'QNamU 2025 (nhánh xét kết quả thi TN THPT): điểm chuẩn 8 ngành, theo TỪNG TỔ HỢP (giống QBU, không phải 1 mức chung/ngành), cross-check qua Trangedu.com + Sforum/CellphoneS (khớp tuyệt đối 29/29 cặp ngành/tổ hợp — `sources.ts`). Công thức xác nhận qua Vietjack.com: "Điểm trúng tuyển là tổng điểm 3 môn theo tổ hợp xét tuyển (không nhân hệ số) và điểm ưu tiên" — điểm chuẩn công bố ĐÃ bao hàm điểm ưu tiên; công thức giảm dần điểm ưu tiên trích nguyên văn khớp tuyệt đối khung quốc gia (ngưỡng 22,5, số chia 7,5). LOẠI TRỪ Giáo dục Mầm non (tổ hợp năng khiếu) và 5 ngành hiển thị mức nhận hồ sơ "14" (không phải điểm trúng tuyển thật, xác nhận qua Vietjack.com). Dải điểm chuẩn 23,00-26,27/30, tổ hợp A00/A01/A02/B00/B08/C00/C03/D01/D07/D14/D15/X01 (đã có sẵn, không cần thêm).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(qnamuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh Trường Đại học Quảng Nam',
      url: 'https://trangedu.com/truong/dai-hoc-quang-nam/',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
    {
      title: 'Điểm chuẩn Đại học Quảng Nam 2025 (Sforum)',
      url: 'https://cellphones.com.vn/sforum/diem-chuan-dai-hoc-quang-nam-2025',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
  ],
};
