import type { AdmissionSource } from '../../core/sourceRegistry';

export const hdiuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'hdiu-admission-info-2025',
    publisher: 'Trường Đại học Đông Đô',
    title: 'Quyết định số 129/QĐ-ĐHĐD ngày 26/3/2025 về việc ban hành Thông tin tuyển sinh năm 2025',
    url: 'https://images.tuyensinh247.com/picture/2025/0618/dh-dong-do-2025.pdf',
    accessedAt: '2026-09-02',
    publishedAt: '2025-03-26',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'PDF 27 trang, có chữ ký/con dấu Hiệu trưởng, đọc trực tiếp bằng vision (không cần OCR, chữ rõ). Mục 2.1 (Phương thức 100 — xét điểm thi TN THPT 2025) nguyên văn: "Sử dụng điểm 03 môn thi thuộc tổ hợp từ kết quả thi THPTQG năm 2025 để xét tuyển vào ngành tương ứng. Điểm xét tuyển là tổng điểm các bài thi/môn thi theo thang điểm 10 đối với bài thi/môn thi của từng tổ hợp xét tuyển và được làm tròn đến 0,25; cộng với điểm ưu tiên/khuyến khích đối tượng, khu vực." và "Ngưỡng đảm bảo chất lượng đầu vào: Kết quả thi tốt nghiệp THPT năm 2025 có tổng điểm 3 bài thi/môn thi thuộc 1 trong các tổ hợp xét tuyển, gồm cả điểm ưu tiên/ khuyến khích theo khu vực không dưới điểm sàn do Bộ GDĐT quy định năm 2025 và không có bài thi/môn thi nào trong tổ hợp xét tuyển có kết quả ≤ 1 điểm." — xác nhận TRỰC TIẾP ngưỡng so với TỔNG ĐÃ CỘNG điểm ưu tiên (không phải tổng thô), nhưng KHÔNG công bố mức điểm ưu tiên cụ thể cho từng khu vực/đối tượng. Trang 5-9 (mục 4 "Chỉ tiêu tuyển sinh") liệt kê bảng mã xét tuyển, tên ngành, chỉ tiêu, và tổ hợp xét tuyển hợp lệ cho từng ngành (7220204 Ngôn ngữ Trung Quốc: A01/C00/C19/D01/D04/D14; 7220209 Ngôn ngữ Nhật: A01/C00/C19/D01/D06/D14; 7220210 Ngôn ngữ Hàn Quốc: A01/C00/C19/D01/DD2/D14; 7310205 Quản lý nhà nước: A00/A01/C00/C19/C14/D01; 7340101 Quản trị kinh doanh, 7340122 Thương mại điện tử, 7340201 Tài chính-Ngân hàng, 7340301 Kế toán: A00/A01/A09/C00/C14/D01 (thương mại điện tử có thêm A12); 7380107 Luật kinh tế: A00/A01/C00/C19/C14/D01; 7480201 Công nghệ thông tin, 7510205 Công nghệ kỹ thuật ô tô: A00/A01/A12/A13/A14/D01; 7640101 Thú y: A00/A01/B00/B04/B08/D01; 7720201 Dược học: A00/A02/B00/B04/B08/D07; 7720301 Điều dưỡng, 7720601 Kỹ thuật xét nghiệm y học: A00/A01/B00/B04/B08/D07). Không có bảng số điểm sàn cụ thể theo ngành trong chính văn bản này (chỉ dẫn chiếu "theo quy định của Bộ GDĐT" cho ngưỡng chung và khối sức khỏe) — số điểm sàn cụ thể theo ngành lấy từ `hdiu-threshold-2025`.',
  },
  {
    id: 'hdiu-threshold-2025',
    publisher: 'VietNamNet (dẫn thông báo chính thức Trường Đại học Đông Đô)',
    title: 'Trường Đại học Đông Đô công bố điểm sàn xét tuyển đại học chính quy năm 2025',
    url: 'https://vietnamnet.vn/truong-dai-hoc-dong-do-cong-bo-diem-san-xet-tuyen-dai-hoc-chinh-quy-nam-2025-2428741.html',
    accessedAt: '2026-09-02',
    publishedAt: '2025-07-15',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bài báo tường thuật thông báo điểm sàn chính thức của trường (không phải suy luận của phóng viên) — đăng lại bảng "Điểm sàn xét thi tốt nghiệp THPT 2025" theo ngành: Dược học >= 19,0; Điều dưỡng & Kỹ thuật xét nghiệm y học >= 17,0; Luật kinh tế >= 18,0; Các ngành khác (Quản trị kinh doanh, Thương mại điện tử, Tài chính-Ngân hàng, Kế toán, Công nghệ thông tin, Công nghệ kỹ thuật ô tô, Thú y, Ngôn ngữ Trung Quốc/Hàn Quốc/Nhật, Quản lý nhà nước) >= 14,0. Đây chính là cách áp dụng cụ thể theo ngành của "Ngưỡng đảm bảo chất lượng đầu vào" nêu trong `hdiu-admission-info-2025` (đã xác nhận GỒM CẢ điểm ưu tiên) — không phải điểm chuẩn trúng tuyển cuối cùng.',
  },
];
