import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tmuAdmissionMethods } from './methods';

export const tmuModule: SchoolModule = {
  id: 'tmu',
  name: 'Trường Đại học Thương mại',
  shortName: 'TMU',
  about: 'Trường đại học công lập tại Hà Nội, đào tạo đa ngành về kinh tế, thương mại, quản trị kinh doanh, tài chính - ngân hàng và ngôn ngữ.',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'TMU 2025 (Phương thức 100 — xét kết quả thi TN THPT): thông báo điểm sàn chính thức (đăng lại nguyên văn trên Cổng TTĐT Chính phủ, `sources.ts:tmu-threshold-2025`) xác nhận NGƯỠNG DUY NHẤT 20/30 áp dụng cho TOÀN BỘ ngành/tổ hợp xét tuyển ("Không có sự chênh lệch điểm trúng tuyển, điểm xét tuyển giữa các tổ hợp xét tuyển"), đã bao gồm điểm ưu tiên khu vực/đối tượng. Điểm xét = tổng thô 3 môn (không hệ số) + điểm ưu tiên KV/ĐT (judgment call chuẩn quốc gia, trường không tự công bố mức cụ thể). Mô hình hoá 7/10 tổ hợp công bố (A00/A01/D01/D07/D09/D10/D84 — loại trừ D03 Tiếng Pháp, D04 Tiếng Trung, và tổ hợp riêng "TMU" dùng Tin học/Công nghệ). Thí sinh có chứng chỉ ngoại ngữ/khảo thí quốc tế được quy đổi điểm — chưa mô hình hoá. Các phương thức khác (học bạ, xét tuyển thẳng) chưa chuẩn hoá vào runtime.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tmuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm sàn Trường đại học Thương mại năm 2025',
      url: 'https://xaydungchinhsach.chinhphu.vn/diem-san-va-bang-quy-doi-tuong-duong-muc-diem-chuan-truong-dai-hoc-thuong-mai-11925072319444325.htm',
      type: 'official-document',
      checkedAt: '2026-09-02',
    },
    {
      title: 'Trường Đại học Thương mại tuyển sinh đại học năm 2025',
      url: 'https://xaydungchinhsach.chinhphu.vn/tuyen-sinh-2025-phuong-thuc-chi-tieu-tuyen-sinh-cua-truong-dai-hoc-thuong-mai-119250225173829102.htm',
      type: 'official-document',
      checkedAt: '2026-09-02',
    },
  ],
};
