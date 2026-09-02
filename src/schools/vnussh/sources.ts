import type { AdmissionSource } from '../../core/sourceRegistry';

export const vnusshSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'vnussh-threshold-2025',
    publisher: 'Tuyensinh247 (tường thuật thông báo chính thức Trường Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN)',
    title: 'Điểm chuẩn Trường Đại Học Khoa Học Xã Hội và Nhân Văn Hà Nội 2025 chính xác',
    url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-khoa-hoc-xa-hoi-va-nhan-van-dai-hoc-quoc-gia-ha-noi-QHX.html',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng điểm chuẩn phương thức xét kết quả thi TN THPT, trích nguyên văn ghi chú của trang: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" (xác nhận TRỰC TIẾP đã cộng ưu tiên, cùng câu mẫu dùng cho VNU-UET/VNU-HUS/VNU-UED/VNU-UEB trên cùng hệ thống). Bảng điểm chuẩn (thang 30, 28/29 ngành, MỖI ngành RIÊNG mức điểm theo tổ hợp — khác VNU-UET/VNU-HUS): Báo chí (C00 28,2/D14 25,2/D15 25,2/D66 25,2/D01 24,7/C03 25,7/C04 25,7); Chính trị học (C00 26,86/D14,D15,D66,D01,C03,C04 đều 25,86); Công tác xã hội (C00 26,99/D14,D15,D66 24,99/D01 24,49/C03,C04 24,99); Điện ảnh và nghệ thuật đại chúng (C00 27,3/D14,D15,D66 25,3/D01 24,8/C03,C04 25,3); Đông Nam Á học (D14,D15,D66 23,25/D01 21,75, KHÔNG có C00); Đông phương học (C00 28/D14,D15,D66 25/D01 24,5/C03,C04 25,5/D04 24,5 [tiếng Trung, không modeled]); Hán Nôm (C00 25,76/D14,D15,D66 24,76/D01 24,26/C03,C04 24,76/D04 25,76 [không modeled]); Hàn Quốc học (C00 27,83/D14,D15,D66 24,83/D01 24,33/C03,C04 25,33/DD2 24,33 [tiếng Hàn, không modeled]); Khoa học quản lý (C00 26,68/D14,D15,D66 24,68/D01 24,18/C03,C04 24,68); Lịch sử (C00 27,3/D14,D15,D66 26,3/D01 25,8/C03,C04 26,3); Lưu trữ học (C00 26,04/D14,D15,D66 25,04/D01 24,54/C03,C04 25,04); Ngôn ngữ học (C00 26,75/D14,D15,D66 25,75/D01 25,25/C03,C04 25,75); Nhân học (C00 25,8/D14,D15,D66 24,8/D01 24,3/C03,C04 24,8); Nhật Bản học (D01 21,75/D06 21,75 [tiếng Nhật, không modeled], KHÔNG có C00); Quan hệ công chúng (C00 28,95/D14,D15,D66 25,95/D01 25,45/C03,C04 26,45); Quản lý thông tin (C00 26,99/D14,D15,D66 24,99/D01 24,49/C03,C04 24,99); Quản trị dịch vụ du lịch và lữ hành (C00 27,87/D14,D15,D66 24,87/D01 24,37/C03,C04 25,37); Quản trị khách sạn (C00 27,49/D14,D15,D66 24,49/D01 23,99/C03,C04 24,99); Quản trị văn phòng (C00 27,43/D14,D15,D66 25,43/D01 24,93/C03,C04 25,43); Quốc tế học (C00 26,5/D14 23,5/D15 25,3/D66 23,5/D01 23/C03,C04 24); Tâm lý học (C00 29/D14,D15,D66 26/D01 25,5/C03,C04 26,5, ngành cao nhất trường); Thông tin - Thư viện (C00 25,41/D14,D15,D66 24,41/D01 23,91/C03,C04 24,41); Tôn giáo học (C00 25/D14,D15,D66 24/D01 23,5/C03,C04 24); Triết học (C00 25,89/D14,D15,D66 24,89/D01 24,39/C03,C04 24,89); Văn hóa học (C00 27,22/D14,D15,D66 25,22/D01 24,72/C03,C04 25,22); Văn học (C00 27,5/D14,D15,D66 25,5/D01 25/C03,C04 25,5); Việt Nam học (C00 26,62/D14,D15,D66 24,62/D01 24,12/C03,C04 24,62); Xã hội học (C00 27/D14,D15,D66 25/D01 24,5/C03,C04 25). Ngành thứ 29 (Truyền thông đa phương tiện) KHÔNG có trong bảng nhánh thi TN THPT thu thập được — không modeled, xem `knowledgeGaps.ts`. Mã ngành dùng mã xét tuyển chính thức trường (QHX01-QHX28).',
  },
  {
    id: 'vnussh-threshold-secondary-2025',
    publisher: 'VietnamNet (tường thuật thông báo chính thức Trường Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN)',
    title: 'Điểm chuẩn Trường Đại học Khoa học Xã hội và Nhân văn năm 2025',
    url: 'https://vietnamnet.vn/diem-chuan-truong-dai-hoc-khoa-hoc-xa-hoi-va-nhan-van-nam-2025-2435086.html',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cross-check độc lập với `vnussh-threshold-2025` (tuyensinh247) — khớp ngành cao nhất (Tâm lý học 29,00, tổ hợp C00), khớp mô tả 28 ngành tuyển sinh, 2.650 chỉ tiêu, 3 phương thức xét tuyển. Nguồn gốc chính thức (ussh.vnu.edu.vn) có đăng thông báo dạng text nhưng bảng đầy đủ theo tổ hợp không trích xuất gọn qua text extraction thông thường — dùng kỹ thuật cross-check 2 nguồn báo (cùng tiền lệ VNU-UET/VNU-HUS/VNU-UED/HPMU/VNU-UEB).',
  },
];
