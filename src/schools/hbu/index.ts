import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hbuAdmissionMethods } from './methods';

export const hbuModule: SchoolModule = {
  id: 'hbu',
  name: 'Trường Đại học Hòa Bình',
  shortName: 'HBU',
  about: 'Trường đại học tư thục (mã trường ETU, trụ sở Hà Nội), đào tạo 21 ngành đại học chính quy khối sức khỏe/kinh tế/kỹ thuật/ngôn ngữ/truyền thông-thiết kế: Y khoa, Y học Cổ truyền, Dược học, Điều dưỡng, Công nghệ thông tin, Kỹ thuật ô tô, Quản trị kinh doanh, Thương mại điện tử, Logistics & Quản lý chuỗi cung ứng, Kế toán, Tài chính Ngân hàng, Luật kinh tế, Quản trị dịch vụ Du lịch và Lữ hành, Quản trị khách sạn, Ngôn ngữ Anh, Ngôn ngữ Trung Quốc, Quan hệ công chúng, Truyền thông đa phương tiện, Thiết kế đồ họa, Thiết kế nội thất, Thiết kế thời trang.',
  year: 2025,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'HBU 2025 (nhánh xét kết quả thi TN THPT, mã trường ETU): điểm chuẩn theo ngành, domain gốc daihochoabinh.edu.vn bị connection refused/timeout từ môi trường research — dùng 2+ nguồn báo/tổng hợp cross-check ĐỘC LẬP (tuyensinh247 + navigates.vn, thêm giaoduc.net.vn/Sforum) cho bảng điểm chuẩn 21/21 ngành, khớp TUYỆT ĐỐI, cùng ghi nhận TRỰC TIẾP "điểm chuẩn đã cộng điểm ưu tiên nếu có" (`sources.ts:hbu-threshold-2025`). Tổ hợp môn/mã ngành lấy từ ảnh CHÍNH CHỦ của trường qua subdomain tuyensinh.daihochoabinh.edu.vn (truy cập được dù domain gốc không được), đọc bằng vision qua chrome-devtools (`hbu-combination-2025`). Mô hình hoá 18/21 ngành, mức điểm từ 15,00 đến 20,50/30 (Y khoa cao nhất). Công thức "ĐXT = TĐ1 + ĐUT" trích nguyên văn trang chính sách chung của trường (`hbu-formula-2025`); điểm ưu tiên dùng khung quốc gia hiện hành (trường không tự công bố bảng riêng, judgment call). Loại trừ 3 ngành Thiết kế (tổ hợp năng khiếu "Vẽ" V00-V03, không có SubjectId + legend gốc thiếu định nghĩa V02/V03) và tổ hợp D65 của Ngôn ngữ Trung Quốc (Tiếng Trung không có SubjectId) — xem knowledgeGaps.ts.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hbuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn Trường Đại Học Hòa Bình 2025 chính xác',
      url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-hoa-binh-ETU.html',
      type: 'secondary',
      checkedAt: '2026-09-04',
    },
    {
      title: 'Trường Đại học Hòa Bình công bố thông tin tuyển sinh đại học hệ chính quy năm 2025 (Dự kiến)',
      url: 'https://tuyensinh.daihochoabinh.edu.vn/truong-dai-hoc-hoa-binh-cong-bo-thong-tin-tuyen-sinh-dai-hoc-he-chinh-quy-nam-2025-du-kien/',
      type: 'official-institution',
      checkedAt: '2026-09-04',
    },
  ],
};
