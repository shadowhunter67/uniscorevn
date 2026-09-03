import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vttuAdmissionMethods } from './methods';

export const vttuModule: SchoolModule = {
  id: 'vttu',
  name: 'Trường Đại học Võ Trường Toản',
  shortName: 'VTTU',
  about: 'Trường đại học tư thục (mã trường VTT, trụ sở Cần Thơ — trước là Hậu Giang), đào tạo 9 ngành đại học chính quy khối sức khỏe/kinh tế/công nghệ/luật: Y khoa, Răng - Hàm - Mặt, Dược học, Luật, Công nghệ thông tin, Quản trị kinh doanh, Tài chính - Ngân hàng, Kế toán, Công nghệ Kỹ thuật ô tô.',
  year: 2025,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'VTTU 2025 (nhánh xét kết quả thi TN THPT/THPT quốc gia, mã 100/101): mức điểm nhận hồ sơ theo ngành, nguồn CHÍNH CHỦ vttu.edu.vn — ảnh WordPress đọc bằng vision qua chrome-devtools (curl trực tiếp bị 403 hotlink protection): "CÔNG BỐ MỨC ĐIỂM NHẬN HỒ SƠ XÉT TUYỂN" (`sources.ts:vttu-threshold-2025`, thang 30) và "NGÀNH TUYỂN SINH, HỌC PHÍ" + "PHƯƠNG THỨC TUYỂN SINH" (`vttu-combination-2025`, ngành/mã ngành/tổ hợp/chỉ tiêu). Mô hình hoá 9/9 ngành đại học chính quy, mức điểm từ 15,00 đến 20,50/30 (Y khoa/RHM cao nhất). Công thức "Điểm xét tuyển = Đ1+Đ2+Đ3+ĐƯT" trích nguyên văn từ chính ảnh trường công bố (`vttu-formula-2025`), cross-check khớp qua fptshop.com.vn (thứ cấp, `vttu-formula-crosscheck-2025`); điểm ưu tiên dùng khung quốc gia hiện hành (trường không tự công bố bảng riêng, judgment call). Chỉ mô hình hoá nhánh thi TN THPT — VTTU còn nhánh học bạ (quy đổi theo bảng bách phân vị phức tạp, một hàng dữ liệu công bố có dấu hiệu chồng chéo khoảng) chưa mô hình hoá (xem knowledgeGaps.ts).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vttuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn đảm bảo chất lượng đầu vào và quy tắc quy đổi điểm tương đương xét tuyển đại học hệ chính quy năm 2025',
      url: 'https://vttu.edu.vn/diem-chuan-dam-bao-chat-luong-dau-vao-va-quy-tac-quy-doi-diem-tuong-duong-xet-tuyen-dai-hoc-he-chinh-quy-nam-2025/',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
  ],
};
