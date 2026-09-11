import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { ndunAdmissionMethods } from './methods';

export const ndunModule: SchoolModule = {
  id: 'ndun',
  name: 'Trường Đại học Điều dưỡng Nam Định',
  shortName: 'NDUN',
  about:
    'Trường đại học công lập trực thuộc Bộ Y tế (mã trường YDD), đào tạo 3 ngành đại học chính quy: Điều dưỡng, Hộ sinh và Dinh dưỡng. Văn bản tuyển sinh 2026 của trường ghi nơi ban hành là Ninh Bình (sau sáp nhập đơn vị hành chính cấp tỉnh) trong khi tên trường giữ nguyên "Nam Định".',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'NDUN 2026 (Phương thức 100 — xét kết quả kỳ thi TN THPT): công thức CHÍNH CHỦ từ Thông tin tuyển sinh đại học năm 2026 ban hành kèm Quyết định 1155/QĐ-ĐDN (`sources.ts:ndun-thongtin-tuyensinh-1155-2026`, PDF gốc 15 trang trên hệ thống văn bản tcvb.ndun.edu.vn, lấy URL trực tiếp từ iframe pdf.js của trang tin, đọc bằng vision), mục 2.2.2: "ĐXT = (ĐPT2 + KK) + UT" với "ĐPT2 = (M1 + M2 + M3)" là tổng điểm thi 3 môn trong tổ hợp, trần bằng điểm tối đa của thang xét (30). Danh mục tổ hợp theo NGÀNH và xác nhận KHÔNG chênh lệch giữa tổ hợp lấy từ Thông báo ngưỡng đảm bảo chất lượng ngày 09/7/2026 (`sources.ts:ndun-nguong-dochenh-2026`) mục 2 "Độ chênh lệch giữa các tổ hợp xét tuyển ... so với tổ hợp B00 (tổ hợp gốc)" — Điều dưỡng và Hộ sinh dùng B00/A00/A01/B03/B08/C02/D01/D07, Dinh dưỡng dùng thêm B04 và C20, và ĐỘ CHÊNH = 0 cho TẤT CẢ tổ hợp của cả 3 ngành. Cùng thông báo đó công bố ngưỡng đảm bảo chất lượng đầu vào theo ngành (Điều dưỡng 18,0; Hộ sinh 18,0; Dinh dưỡng 15,0 — tính trên tổng thô, không tính điểm cộng), và Thông tin tuyển sinh mục 1 nêu nguồn tuyển (tổng thô tối thiểu 16,50 cho Điều dưỡng/Hộ sinh, 15,0 cho Dinh dưỡng) — module mô hình hoá CẢ HAI điều kiện này bên cạnh điểm chuẩn. Điểm chuẩn trúng tuyển CHÍNH THỨC cả 3/3 ngành (Điều dưỡng 21,10; Hộ sinh 18,30; Dinh dưỡng 16,25/30) từ Thông báo số 2058/TB-ĐDN ngày 10/8/2026 (`sources.ts:ndun-diemchuan-2058-2026`, ảnh scan văn bản gốc có chữ ký Hiệu trưởng + con dấu, được Cổng thông tin điện tử Chính phủ đăng lại nguyên trang ở độ phân giải đầy đủ). Điểm ưu tiên dùng khung quốc gia hiện hành (Điều 7 Thông tư 06/2026/TT-BGDĐT, judgment call cùng tiền lệ HMTU/VUTM/HUPH/ULSA/EPU). CHƯA mô hình hoá: thành phần KK (điểm xét thưởng thành tích/năng khiếu + điểm khuyến khích chứng chỉ ngoại ngữ — công thức có nêu nhưng phần đã đọc không in bảng giá trị) và 3 phương thức còn lại (tuyển thẳng, học bạ, ĐGNL HSA ĐHQG Hà Nội) — xem `knowledgeGaps.ts`.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(ndunAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Quyết định về việc ban hành Thông tin tuyển sinh đại học năm 2026 (số 1155/QĐ-ĐDN)',
      url: 'https://ndun.edu.vn/bai_viet/3789/quyet-dinh-ve-viec-ban-hanh-thong-tin-tuyen-sinh-dai-hoc-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-09-11',
    },
    {
      title: 'Thông báo số 2058/TB-ĐDN (10/8/2026) — Điểm chuẩn trúng tuyển đại học chính quy năm 2026',
      url: 'https://ndun.edu.vn/bai_viet/3859/thong-bao-diem-chuan-trung-tuyen-dai-hoc-chinh-quy-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-09-11',
    },
  ],
};
