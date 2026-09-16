import type { AdmissionSource } from '../../core/sourceRegistry';

export const dauSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'dau-threshold-notice-2026',
    publisher: 'Trường Đại học Kiến trúc Đà Nẵng (DAU)',
    title: 'Trường Đại học Kiến trúc Đà Nẵng công bố điểm sàn xét tuyển đại học chính quy năm 2026',
    url: 'http://tuyensinh.dau.edu.vn/cong-bo-diem-san-xet-tuyen-dai-hoc-chinh-quy-nam-2026-truong-dai-hoc-kien-truc-da-nang-042035.html',
    accessedAt: '2026-09-16',
    publishedAt: '2026-07-03',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Tải qua curl với User-Agent trình duyệt. Nguyên văn: "Từ 15 điểm (KHÔNG BAO GỒM điểm ưu tiên) đối với các phương thức: Xét tuyển theo kết quả thi tốt nghiệp THPT 2026; Kết hợp kết quả thi tốt nghiệp THPT và điểm thi năng khiếu." Chỉ model nhánh THUẦN thi TN THPT (không kết hợp năng khiếu — cần điểm thi năng khiếu riêng, chưa có trong ApplicantProfile). Không có bảng tổ hợp môn theo từng ngành trên trang (phần "Tổ hợp xét tuyển các ngành" bị mất nội dung khi trích xuất, có thể là ảnh/bảng không đọc được qua HTML tĩnh) — model theo tổ hợp CHUNG trong taxonomy hiện có. Điểm chuẩn TRÚNG TUYỂN thật (trang liên quan cùng site) là 16,5-18/30 theo ngành — CAO HƠN điểm sàn 15 — nhánh exact ở đây chỉ xác nhận đạt SÀN (điều kiện nộp hồ sơ), không phải đảm bảo trúng tuyển thật.',
  },
];
