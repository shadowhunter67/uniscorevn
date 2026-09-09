import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { huphAdmissionMethods } from './methods';

export const huphModule: SchoolModule = {
  id: 'huph',
  name: 'Trường Đại học Y tế Công cộng',
  shortName: 'HUPH',
  about:
    'Trường đại học công lập trực thuộc Bộ Y tế (mã trường YTC), trụ sở số 1A đường Đức Thắng, phường Đông Ngạc, Hà Nội. Năm 2026 tuyển 6 ngành đại học chính quy: Y tế công cộng, Dinh dưỡng, Kỹ thuật xét nghiệm y học, Kỹ thuật phục hồi chức năng, Công tác xã hội và Khoa học dữ liệu.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'HUPH 2026 (phương thức xét kết quả thi TN THPT — trường gọi là "phương thức gốc"): điểm trúng tuyển đợt 1 CHÍNH THỨC cho cả 6/6 ngành (18,80–22,90/30) từ Thông báo số 743/TB-ĐHYTCC ngày 09/8/2026 (`sources.ts:huph-diemtrungtuyen-743-2026` — PDF gốc có chữ ký Hiệu trưởng kiêm Chủ tịch Hội đồng tuyển sinh, text layer đọc trực tiếp). Công thức + tổ hợp môn theo ngành từ Thông tin tuyển sinh đại học chính quy năm 2026 ban hành kèm Quyết định 314/QĐ-ĐHYTCC (`sources.ts:huph-thongtin-tuyensinh-314-2026` — PDF gốc 25 trang trên cổng chính chủ, đọc bằng vision): "Điểm xét tuyển = [Điểm Môn 1 + Điểm Môn 2 + Điểm Môn 3 + Điểm khuyến khích (nếu có)] + Điểm ưu tiên (nếu có)", thang 30, biểu thức trong ngoặc bị chặn trần 30 trước khi cộng điểm ưu tiên, và điểm ưu tiên giảm dần khi chính biểu thức đó đạt từ 22,5 trở lên. Trường xác nhận trực tiếp "không quy định chênh lệch điểm xét tuyển giữa các tổ hợp đối với các thí sinh đăng ký xét tuyển cùng một ngành học" — mỗi ngành chỉ có 1 mức điểm chuẩn dùng chung cho mọi tổ hợp. Điểm ưu tiên dùng khung quốc gia hiện hành (Điều 7 Thông tư 06/2026/TT-BGDĐT) vì trường mô tả đúng cơ chế nhưng không in lại bảng mức (judgment call, cùng tiền lệ ULSA/EPU/HVU). CHƯA mô hình hoá: điểm khuyến khích / quy đổi chứng chỉ tiếng Anh quốc tế (Bảng 2, giá trị đã đọc đủ), 4 phương thức còn lại (tuyển thẳng, dự bị đại học, học bạ, ĐGNL ĐHQG Hà Nội thang 150), và các tiêu chí phụ khi bằng điểm (gồm TTNV <= 2 của ngành Kỹ thuật phục hồi chức năng) — xem `knowledgeGaps.ts`.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(huphAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh đại học chính quy năm 2026 — Trường Đại học Y tế công cộng',
      url: 'https://tuyensinh.huph.edu.vn/post/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-09-09',
    },
    {
      title: 'Thông báo số 743/TB-ĐHYTCC (09/8/2026) — Điểm trúng tuyển đại học chính quy năm 2026 đợt 1',
      url: 'https://tuyensinh.huph.edu.vn/post/diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-dot-1',
      type: 'official-institution',
      checkedAt: '2026-09-09',
    },
  ],
};
