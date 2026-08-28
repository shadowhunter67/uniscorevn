import type { AdmissionSource } from '../../core/sourceRegistry';

export const dainamSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'dainam-threshold-2026',
    publisher: 'Trường Đại học Đại Nam',
    title: 'Trường Đại học Đại Nam công bố ngưỡng đảm bảo chất lượng đầu vào hệ đại học chính quy năm 2026',
    url: 'https://tuyensinh.dainam.edu.vn/vi/tin-tuc/truong-dai-hoc-dai-nam-cong-bo-nguong-dam-bao-chat-luong-dau-vao-he-dai-hoc-chinh-quy-nam-2026',
    accessedAt: '2026-08-28',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đã fetch trực tiếp trang chính thức (mã trường DDN) ngày 2026-08-28: mục 1 xác nhận NGUYÊN VĂN "Ngưỡng đảm bảo chất lượng đầu vào đối với phương thức xét tuyển dựa vào kết quả thi tốt nghiệp THPT năm 2026 là 15 điểm (thang điểm 30, không nhân hệ số, không bao gồm điểm cộng, điểm ưu tiên khu vực và đối tượng, không tính điểm quy đổi từ chứng chỉ ngoại ngữ quốc tế), áp dụng với các ngành không thuộc lĩnh vực Sức khoẻ và lĩnh vực Pháp luật." Đây là TUYÊN BỐ TRỰC TIẾP loại trừ điểm ưu tiên khỏi phép so sánh với ngưỡng (không phải judgment call). Trang cũng công bố ngưỡng riêng cho: Luật/Luật kinh tế (học lực Giỏi + tổng 3 môn >= 18,00 hoặc điểm xét tốt nghiệp THPT >= 8,50), Y khoa/Dược học (học lực Giỏi + tổng 3 môn >= 20,00 hoặc >= 8,50), Điều dưỡng (học lực Khá + tổng 3 môn >= 16,50 hoặc >= 6,50); và ngưỡng học bạ (18 điểm/30, không cộng điểm ưu tiên) + HSA (60/150, không cộng điểm ưu tiên) cho ngành ngoài Sức khoẻ/Pháp luật — các phương thức/nhóm ngành này chưa mô hình hoá.',
  },
  {
    id: 'dainam-admission-info-2026',
    publisher: 'Trường Đại học Đại Nam',
    title: 'Thông tin tuyển sinh đại học hệ chính quy năm 2026 - Trường Đại học Đại Nam',
    url: 'https://dainam.edu.vn/vi/tin-tuc/thong-tin-tuyen-sinh-dai-hoc-he-chinh-quy-nam-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang mô tả tổng quan 4 phương thức xét tuyển 2026 (thi TN THPT, học bạ, xét tuyển thẳng, HSA). Phương thức 2 (học bạ) nêu rõ "không cộng điểm ưu tiên"; phương thức 1 (thi TN THPT) lúc công bố trang này chưa có mức ngưỡng cụ thể ("sẽ công bố ngưỡng đảm bảo chất lượng sau khi có kết quả thi") — xem dainam-threshold-2026 cho mức ngưỡng cụ thể đã công bố sau đó.',
  },
];
