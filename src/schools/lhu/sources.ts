import type { AdmissionSource } from '../../core/sourceRegistry';

export const lhuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'lhu-threshold-2026',
    publisher: 'Trường Đại học Lạc Hồng',
    title:
      'Trường Đại học Lạc Hồng công bố phương thức xét tuyển và chính sách học bổng "khủng" dành cho Tân sinh viên năm học 2026 - 2027',
    url: 'https://lhu.edu.vn/640/52289/Truong-Dai-hoc-Lac-Hong-cong-bo-phuong-thuc-xet-tuyen-va-chinh-sach-hoc-bong-khung-danh-cho-Tan-sinh-vien-nam-hoc-2026-2027.html',
    accessedAt: '2026-08-30',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đã fetch trực tiếp trang chính thức lhu.edu.vn (curl 2026-08-30, HTTP 200) — trang "năm học 2026-2027" (khác trang cũ cùng tên miền tuyensinh.lhu.edu.vn ghi "năm học 2025-2026", đã đối chiếu ngày tháng để tránh nhầm dữ liệu năm trước). Nội dung xác nhận NGUYÊN VĂN: "1. Điều kiện xét tuyển chung: Thí sinh có tổng điểm 03 môn thi kỳ thi tốt nghiệp THPT năm 2026 theo tổ hợp xét tuyển (hoặc sử dụng điểm thi môn Toán, Ngữ văn và một môn thi khác) đạt tối thiểu 15,00 điểm theo thang điểm 30." và mục 2.1: "Điểm môn 1 + Điểm môn 2 + Điểm môn 3 ≥ 15 điểm * Ngành Dược, Luật, Luật kinh tế điểm xét tuyển theo ngưỡng đảm bảo chất lượng đầu vào do Bộ GD&ĐT công bố vào ngày 08/07/2026." Trang KHÔNG nhắc tới điểm ưu tiên khu vực/đối tượng theo hướng nào (không loại trừ trực tiếp, không xác nhận cộng vào) — áp judgment call chuẩn quốc gia cho nhánh exact (xem `priority.ts`). Không có bảng ngành/tổ hợp riêng hay điểm cộng thành tích cho phương thức thi TN THPT.',
  },
];
