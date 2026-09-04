import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TrungVuongSource {
  id: string;
  publisher: string;
  title: string;
  url: string;
  accessedAt: string;
  publishedAt?: string;
  sourceType?: SourceType;
  verification: VerificationLevel;
  lifecycle?: SourceLifecycle;
  note?: string;
}

export const trungvuongSources: TrungVuongSource[] = [
  {
    id: 'trungvuong-thongbao-387-2025',
    publisher: 'Trường Đại học Trưng Vương (mã trường DVP, tv-uni.edu.vn, tên miền chính chủ)',
    title: 'Thông báo số 387/TB-ĐHTV ngày 09/06/2025 — Về việc tuyển sinh trình độ đại học hình thức chính quy năm 2025',
    url: 'https://images.tuyensinh247.com/picture/2025/0703/tb387-vv-tuyen-sinh-trinh-do-dai-hoc-hinh-thuc-chinh-quy-nam-2025.pdf',
    accessedAt: '2026-09-04',
    publishedAt: '2025-06-09',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'PDF gốc có chữ ký Hiệu trưởng (Nguyễn Huy Oanh) + con dấu "TRƯỜNG ĐẠI HỌC TRUNG VƯƠNG", căn cứ Quyết định 91/QĐ-ĐHTV (20/02/2023, quy chế tuyển sinh trình độ đại học). Mirror lưu trên CDN của tuyensinh247.com (đường link gốc tv-uni.edu.vn không truy cập ổn định từ môi trường research — cùng hiện tượng đã gặp ở HBU/HAT); nội dung PDF là bản scan văn bản gốc, đọc trực tiếp không cần vision. Mục 1.2 liệt kê 16 ngành đại học chính quy với mã ngành + tổ hợp xét tuyển + chỉ tiêu (bảng trang 1-2), kèm bảng "Bảng mã tổ hợp các môn xét tuyển" định nghĩa từng mã tổ hợp (trang 2, bao gồm DD2 = Toán/Ngữ văn/Tiếng Hàn và D04 = Ngữ văn/Toán/Tiếng Trung Quốc — không có SubjectId tương ứng). Mục 3.2 "Phương thức 2: Xét tuyển căn cứ vào kết quả kỳ thi tốt nghiệp THPT năm 2025" ghi rõ công thức: "ĐXT = TN1 + TN2 + TN3 + Điểm ưu tiên (nếu có)", trong đó TN1/TN2/TN3 là kết quả điểm thi THPT 2025 của các môn thuộc tổ hợp xét tuyển (trang 4). Mục 3.1 "Phương thức 1" (xét học bạ) dùng công thức riêng ĐXT1 = MH1+MH2+MH3 (không cộng điểm ưu tiên, không mô hình hoá ở đây). Mục 7 "Chính sách ưu tiên": "Theo quy chế tuyển sinh của Bộ Giáo dục và Đào tạo" — trường KHÔNG tự công bố bảng mức điểm ưu tiên KV/ĐT riêng (judgment call khung quốc gia, xem `priority.ts`). Mục 3.2 "Điều kiện xét tuyển" ghi ngưỡng đảm bảo chất lượng đầu vào ngành Điều dưỡng, Dược học "do Bộ Giáo dục và Đào tạo công bố" (không tự công bố mức riêng).',
  },
  {
    id: 'trungvuong-diemchuan-2025-crosscheck',
    publisher: 'Tổng hợp báo/trang tuyển sinh (3 nguồn độc lập, không phải chính chủ)',
    title: 'Điểm chuẩn Trường Đại học Trưng Vương năm 2025 theo phương thức xét kết quả thi TN THPT (16 ngành)',
    url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-trung-vuong-DVP.html',
    accessedAt: '2026-09-04',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Điểm chuẩn CHÍNH THỨC đợt 1 năm 2025 công bố ngày 22/8/2025 (theo quy định thời hạn công bố điểm chuẩn của Bộ GD&ĐT). Trang chính chủ tv-uni.edu.vn/diem-chuan-truong-dai-hoc-trung-vuong-2025/ chỉ nêu khoảng điểm tổng quát (không có bảng đầy đủ theo từng ngành khi truy cập lại 2026-09-04 — trang này đã được cập nhật cho các mùa tuyển sinh sau); dùng 3 nguồn tổng hợp ĐỘC LẬP khớp TUYỆT ĐỐI cho toàn bộ 16/16 ngành (theo đúng 16 mã ngành trong `trungvuong-thongbao-387-2025`): tuyensinh247.com (nguồn này, "điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" — xác nhận trực tiếp đã cộng ưu tiên), fptshop.com.vn/tin-tuc/danh-gia/diem-chuan-dai-hoc-trung-vuong-2025-186216, và trangedu.com/diem-chuan/diem-chuan-dai-hoc-trung-vuong/ — cùng kỹ thuật cross-check đã chấp nhận cho HAT/HLUV/HBU khi domain chính chủ không có bảng điểm chuẩn đầy đủ. LƯU Ý QUAN TRỌNG: ảnh "ĐIỂM CHUẨN TRÚNG TUYỂN... 2026" tại cùng slug CDN tuyensinh247 hiện hiển thị dữ liệu năm 2026 (17 ngành, có thêm ngành Y khoa mới không tồn tại trong `trungvuong-thongbao-387-2025` của năm 2025) — đã XÁC MINH và LOẠI TRỪ nhầm lẫn năm bằng cách đối chiếu đúng 16 mã ngành của năm 2025, không dùng ảnh CDN 2026 cho batch này.',
  },
];
