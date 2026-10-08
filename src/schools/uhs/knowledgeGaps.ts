import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const uhsKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'uhs-method2-weights-range',
    label:
      'Phương thức 2 chỉ công bố trọng số theo khoảng: THPT 30-35%, ĐGNL 45-50%, học bạ 20%. Chưa có tỷ lệ cố định cho THPT và ĐGNL, nên UniscoreVN chưa tính được điểm xét tuyển cuối cùng.',
    status: 'incomplete',
    scoreAffecting: true,
    impact: 'exact-final-score-blocking',
    note:
      'Re-check 2026-08-20: trang chính thức `tuyensinh.uhsvnu.edu.vn/news.php?slug=thongtintuyensinh` VẪN ghi dạng khoảng ("w1 trong khoảng 30% đến 35%; w2 trong khoảng 45% đến 50%; w3 = 20%"). Một bài báo Tuổi Trẻ (10/7/2026, "Trường ĐH Khoa học Sức khỏe lấy điểm sàn 18-22, điều chỉnh cách tính điểm xét tuyển") trích "w1=30%; w2=50%; w3=20%" như số CỐ ĐỊNH đã điều chỉnh — nhưng đây là nguồn thứ cấp DUY NHẤT, chưa tìm được xác nhận trực tiếp từ chính UHS (trang tra cứu kết quả `news.php?slug=ketqua2026` chỉ dẫn tới link Google Drive, không có công thức). KHÔNG đủ để nâng verification — cần tìm văn bản UHS gốc xác nhận con số này trước khi implement, để lại làm lead cho batch sau.',
  },
  {
    id: 'uhs-cutoffs-2026',
    label:
      'Điểm trúng tuyển 2026 của Phương thức 2, Mã phương thức 500, đã có cho 5/6 chương trình. Riêng "Y khoa (đặt hàng)" (uhs-7720101DH, chỉ tiêu riêng 120) chưa có điểm chuẩn riêng vì bảng gốc chỉ ghi một dòng "Y khoa". Các điểm này hiện chỉ để tham khảo vì UHS chưa công bố tỷ lệ cố định để tính điểm xét tuyển cuối cùng.',
    status: 'official-but-unparsed',
    sourceId: 'uhs-cutoffs-2026',
    scoreAffecting: false,
    implemented: false,
    impact: 'cutoff-comparison-blocking',
    attemptedSources: [
      'https://tuyensinh.uhsvnu.edu.vn/category.php?slug=diem-chuan',
      'https://tuyensinh.uhsvnu.edu.vn/news.php?slug=ketqua2026',
      'https://drive.google.com/file/d/16DnPzc4avv3NJvif551lLstBxDqKLk0p/view?usp=sharing',
    ],
    whyNotInferred:
      'uhs-7720101DH (Y khoa đặt hàng) không có dòng riêng trong bảng gốc, không suy đoán dùng chung điểm với Y khoa thường.',
  },
];
