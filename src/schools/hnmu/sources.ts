import type { AdmissionSource } from '../../core/sourceRegistry';

export const hnmuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'hnmu-threshold-2026',
    publisher: 'Trường Đại học Thủ đô Hà Nội',
    title: 'Đạt mức điểm sàn này thí sinh có thể vào học Trường ĐH Thủ đô Hà Nội 2026',
    url: 'https://giadinh.suckhoedoisong.vn/dat-muc-diem-san-nay-thi-sinh-co-the-vao-hoc-truong-dh-thu-do-ha-noi-2026-17226071310124409.htm',
    accessedAt: '2026-08-30',
    publishedAt: '2026-07-13',
    sourceType: 'official-admission',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Không tìm được PDF/trang thông báo gốc hnmu.edu.vn cho batch này (cổng tuyển sinh HNMU không hiển thị bảng ngưỡng dạng text, xem research note batch 2026-08-24 trong normalized/runtime-source-snapshot/finalCatalog.ts) — số liệu đối chiếu khớp TUYỆT ĐỐI (từng chữ) giữa 2 báo chí chính thống độc lập trích dẫn trực tiếp thông báo HNMU: giadinh.suckhoedoisong.vn (13/07/2026, cơ quan Sức khỏe & Đời sống) và vietnamnet.vn (đã fetch trực tiếp qua curl, HTTP 200, cả hai). Cùng mức độ tin cậy "corroborate qua nhiều báo chí chính thống, không có PDF gốc, verification: cross-checked" đã áp dụng cho `schools/hmu`. Nguyên văn: "Ngưỡng đảm bảo chất lượng đầu vào theo kết quả thi tốt nghiệp THPT năm 2026 đối với thí sinh ở khu vực 3 có mức điểm tối thiểu (không nhân hệ số) của tất cả các tổ hợp gồm 3 bài thi/môn thi theo thang điểm 30, không tính điểm cộng, không phân biệt kết quả thi của thí sinh học chương trình 2006 và 2018 như sau: - Ngưỡng đảm bảo chất lượng đầu vào các chương trình đào tạo giáo viên trình độ đại học là 20 điểm; riêng đối với chương trình đào tạo Giáo dục Thể chất là 19 điểm cho tổ hợp xét tuyển 3 môn văn hóa, các tổ hợp xét tuyển khác thực hiện theo quy định của quy chế tuyển sinh hiện hành. - Chương trình đào tạo thuộc lĩnh vực pháp luật là 20 điểm, điểm xét tuyển có môn Toán hoặc môn Ngữ văn đạt tối thiểu 6 điểm. - Đối với các ngành/chương trình đào tạo khác là 16 điểm." Nguồn KHÔNG nói rõ mức điểm ưu tiên khu vực/đối tượng cho thí sinh ngoài KV3 — áp judgment call chuẩn quốc gia (xem `priority.ts`). Điều kiện phụ Toán/Văn >=6 cho ngành pháp luật CHƯA đưa vào runtime (knowledge gap).',
  },
];
