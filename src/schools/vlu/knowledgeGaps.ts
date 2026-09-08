import type { KnowledgeGap } from '../../core/knowledgeStatus';

/**
 * Research 2026-08-19/20 (browser thật, chrome-devtools, đọc trực tiếp `www.vlu.edu.vn`). Ngưỡng
 * đảm bảo chất lượng đầu vào theo nhóm ngành (thi TN THPT: 15/18/20/22; học bạ/kết hợp: điều kiện
 * học lực + điểm thay thế) đã verified từ 2 bài viết chính thức, cross-check khớp nhau. Các mục
 * dưới đây vẫn là gap vì lý do CỤ THỂ đọc được, không phải "trường chưa công bố" chung chung.
 *
 * **Batch "6 học kỳ" — ĐÃ ĐÓNG `vlu-transcript-semester-granularity-gap`** (xoá khỏi mảng dưới đây,
 * đúng quy ước UFM khi đóng `ufm-hocba-semester-granularity-gap`): blocker là mô hình dữ liệu dùng
 * chung chỉ lưu TB cả năm, nay `ApplicantProfile.transcript.bySemester` lưu đủ 6 học kỳ
 * (`core/transcriptSemesters.ts`) nên `evaluate.ts` tính và hiển thị được ĐIỂM HỌC BẠ theo tổ hợp
 * ("tổng điểm trung bình 03 môn ... của 06 học kỳ").
 *
 * CHÚ Ý: đóng gap này KHÔNG nâng VLU lên exact — Phương thức 2/3 vẫn `partial`, không trả `score`,
 * vì `vlu-primary-subject-list-unpublished` (ngành nào nhân hệ số 2) và `vlu-priority-bonus-table-not-found`
 * vẫn mở và đều `exact-final-score-blocking`.
 *
 * **Batch "danh mục ngành" (2026-09-08) — ĐÃ ĐÓNG `vlu-program-catalog-not-imported`** (xoá khỏi mảng
 * dưới đây, đúng quy ước UFM/HUTECH/HCMULAW khi đóng gap). Cách đóng: khối "Danh mục ngành và tổ hợp
 * môn xét tuyển" mà nguồn dẫn chiếu tới hoá ra là một ẢNH nhúng trong chính bài viết
 * (`BANG_NGANH_cap_nhat_11_5_2026_6f52ef1150.jpg`); tải ảnh gốc từ CDN chính thức của trường và đọc ở
 * ĐỘ PHÂN GIẢI GỐC (1488×3543, 4 lát cắt) cho ra đủ 64 dòng → `programs.ts`. Cột "KHỐI NGÀNH" của ảnh
 * này khớp 1-1 với tên khối ngành trên bảng điểm sàn (`CONG_BO_DIEM_SAN_CAP_NHAT_01_7952e551f1.jpg`),
 * nên `inferVluThresholdGroup(mã ngành)` suy được `VluThresholdGroup` mà KHÔNG cần đoán — evaluator
 * không còn bắt caller tự truyền nhóm ngưỡng.
 *
 * Cùng lượt đọc ảnh đó còn bổ sung một ngưỡng THẬT trước đây bỏ sót: điểm sàn nhận hồ sơ tính trên
 * chính ĐIỂM HỌC BẠ (18/20/23/22/19 theo nhóm ngành) — trước đây nhóm `standard` bị mô hình hoá là
 * "không có điều kiện bổ sung nào" ở phương thức học bạ. Xem `evidence.ts:vluTranscriptThresholdEvidence`.
 *
 * VẪN KHÔNG nâng được VLU lên exact: 2 gap `exact-final-score-blocking` ở đầu mảng dưới đây đã được
 * RESEARCH LẠI ngày 2026-09-08 và vẫn mở — xem `note` của từng entry để biết chính xác đã thử gì.
 */
export const vluKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vlu-primary-subject-list-unpublished',
    label:
      'Danh mục ngành áp dụng "môn thi chính nhân hệ số 2" — bài công bố chính thức nêu nguyên tắc chung ("Riêng đối với các ngành có môn thi chính, môn thi chính được nhân hệ số 2 và quy về thang điểm 30") nhưng không liệt kê ngành nào thuộc diện này ngay trong bài; trang chỉ dẫn chiếu sang mục "Danh mục ngành và tổ hợp môn xét tuyển" (một khối nội dung riêng trên cùng trang, không trích xuất được nội dung bảng cụ thể qua lần đọc DOM hiện tại).',
    status: 'official-but-unparsed',
    sourceId: 'vlu-admission-info-2026',
    scoreAffecting: true,
    implemented: false,
    attemptedSources: [
      'www.vlu.edu.vn/news/truong-dai-hoc-van-lang-cong-bo-thong-tin-tuyen-sinh-dai-hoc-chinh-quy-2026 — chỉ có nguyên tắc chung, không có bảng ngành/môn chính.',
      'Tìm kiếm web trực tiếp cho danh sách ngành có môn thi chính VLU 2026 — không ra kết quả có bảng đầy đủ.',
    ],
    whyNotInferred:
      'Không suy đoán ngành nào có môn thi chính từ tên ngành (vd ngành Ngôn ngữ Anh có thể có môn chính tiếng Anh, nhưng đây là suy đoán, không phải nguồn xác nhận) — hệ số 2 là score-affecting, sai 1 ngành sẽ làm sai điểm xét tuyển của đúng ngành đó.',
    impact: 'exact-final-score-blocking',
    note:
      'Research 2026-08-28 (batch nâng FPTU/HCMUE): tìm kiếm lại danh mục ngành/tổ hợp/hệ số 2 VLU 2026 — không tìm được trang/bảng mới nào liệt kê cụ thể ngành nào có môn thi chính. Research 2026-09-08 (batch danh mục ngành) — LẦN NÀY ĐỌC ĐƯỢC ĐÚNG KHỐI NỘI DUNG MÀ NGUỒN DẪN CHIẾU TỚI, và kết luận vẫn là gap MỞ, nhưng nay có bằng chứng TRỰC TIẾP thay vì "chưa trích xuất được": khối "Danh mục ngành và tổ hợp môn xét tuyển" là một ẢNH nhúng (`BANG_NGANH_cap_nhat_11_5_2026_6f52ef1150.jpg`), đã tải bản gốc 1488×3543 và đọc hết 64 dòng (nay nằm trong `programs.ts`) — bảng CHỈ có 6 cột STT / KHỐI NGÀNH / MÃ NGÀNH / TÊN NGÀNH / TÊN CHUYÊN NGÀNH / TỔ HỢP MÔN, KHÔNG có cột "môn thi chính" hay "hệ số" nào. Tức trường công bố nguyên tắc hệ số 2 nhưng KHÔNG công bố danh mục ngành áp dụng, ở bất kỳ nguồn nào đã đọc. Chưa đủ điều kiện nâng VLU lên verified exact.',
  },
  {
    id: 'vlu-priority-bonus-table-not-found',
    label:
      'Bảng điểm ưu tiên khu vực/đối tượng cụ thể và công thức giảm điểm ưu tiên theo Thông tư 08/2022 (nếu VLU tự công bố lại) — bài viết chỉ nêu "Thí sinh có thể cộng điểm ưu tiên (đối tượng, khu vực) vào điểm của tổ hợp môn xét tuyển, miễn đạt mức sàn quy định này", không kèm bảng số hay công thức giảm dần khi tổng điểm cao. Không tìm thấy bảng điểm cộng/khuyến khích (thành tích, chứng chỉ ngoài ngoại ngữ) nào khác trên 2 nguồn đã đọc.',
    status: 'incomplete',
    sourceId: 'vlu-quality-threshold-2026',
    scoreAffecting: true,
    implemented: false,
    whyNotInferred:
      'Không tái dùng bảng ưu tiên chuẩn quốc gia cross-checked từ trường khác (như UFM/HUTECH đã làm) cho VLU trong batch này vì scope batch này dừng ở eligibility-only (chưa có scoreConversion/exactCalculator nào cần tới điểm ưu tiên) — để dành khi VLU tiến lên exact calculator.',
    impact: 'exact-final-score-blocking',
    attemptedSources: [
      'Đọc lại TOÀN BỘ text 2 bài chính thức 2026-09-08 — chỉ có đúng 1 câu về ưu tiên: "Mức điểm sàn nêu trên là điểm tối thiểu thí sinh cần đạt. Thí sinh có thể cộng điểm ưu tiên (đối tượng, khu vực) vào điểm của tổ hợp môn xét tuyển, miễn đạt mức sàn quy định này." Không bảng số, không công thức giảm dần.',
      'Đọc TẤT CẢ 4 ảnh nhúng có nội dung dữ liệu trên trang điểm sàn (`CONG_BO_DIEM_SAN_CAP_NHAT_01`, `CONG_BO_DIEM_SAN_2_01_02_1`, `Bang_quy_doi_diem_ngoai_ngu`, `image_181464ff61`) ở độ phân giải gốc — không ảnh nào là bảng điểm ưu tiên/điểm cộng.',
      '`vlu.edu.vn/dynamic/de-an-tuyen-sinh` (kiểm tra lại 2026-09-08): vẫn chỉ có Đề án 2018/2023/2024/2025, CHƯA có bản 2026 — không có nguồn nào khác của trường để tra bảng ưu tiên.',
      'Tìm kiếm web "Đại học Văn Lang 2026 điểm ưu tiên đối tượng khu vực điểm khuyến khích bảng" (2026-09-08) — mọi kết quả đều dẫn về đúng 1 câu chung ở trên, không nơi nào có bảng số riêng của VLU.',
    ],
    note:
      'Research 2026-09-08 (batch danh mục ngành): kết luận là VLU KHÔNG tự công bố bảng ưu tiên riêng — trường chỉ dẫn chiếu ngầm tới bảng chuẩn quốc gia. Cố ý KHÔNG tự thay bằng bảng chuẩn quốc gia trong batch này vì việc đó chỉ có ý nghĩa khi VLU đã tính được điểm xét tuyển cuối, mà điểm cuối vẫn bị chặn bởi `vlu-primary-subject-list-unpublished` (không biết ngành nào nhân hệ số 2 thì có bảng ưu tiên cũng chưa lắp ráp được ĐXT).',
  },
  {
    id: 'vlu-combined-method-conversion-table-unpublished',
    label:
      'Phương thức 3 (kết hợp học bạ 20% + 1 trong 5 kỳ thi: V-ACT/HSA/TSA/V-SAT/SAT, trọng số 80%) cần công thức/bảng quy đổi từng loại điểm đầu vào (thang điểm khác nhau: V-ACT 1200, V-SAT theo thang riêng, SAT 1600...) về cùng 1 thang trước khi áp trọng số 20%/80% — chưa tìm thấy công thức quy đổi cụ thể trên 2 nguồn đã đọc.',
    status: 'incomplete',
    sourceId: 'vlu-admission-info-2026',
    scoreAffecting: true,
    implemented: false,
    impact: 'exact-final-score-blocking',
  },
  {
    id: 'vlu-global-tier-program-lists-not-published',
    label:
      'Danh mục 16 ngành Chương trình Global Standard và 10 ngành Chương trình Global Elite chưa import — KHÔNG PHẢI vì chưa đọc được, mà vì mã ngành KHÔNG phân biệt được tier. Ảnh chính thức liệt kê 10 ngành Global Elite CHỈ BẰNG TÊN, không kèm mã ngành, và cả 10 tên đó (Quan hệ Công chúng, Truyền thông Đa phương tiện, Marketing, Thiết kế Đồ hoạ, Quản trị Khách sạn, Quản trị Kinh doanh, Kiến trúc, Tài chính Ngân hàng, Khoa học Dữ liệu, Logistics & Quản lý chuỗi cung ứng) ĐỀU đã có mặt trong danh mục 64 ngành Chương trình tiêu chuẩn với đúng mã ngành đó. Hệ quả: từ một mã ngành không suy ra được thí sinh đăng ký tier nào, mà tier lại đổi ngưỡng thật (Global Elite: thi TN THPT 20, học bạ 23, V-ACT 750, HSA 90, TSA 65, V-SAT 265, SAT 1.200 — cao hơn hẳn; Global Standard thì nguồn ghi rõ "áp dụng mức điểm sàn tuyển sinh tương tự Chương trình tiêu chuẩn" nên KHÔNG lệch).',
    status: 'incomplete',
    sourceId: 'vlu-quality-threshold-2026',
    scoreAffecting: true,
    implemented: false,
    knownData: [
      'Đủ 10 tên ngành Global Elite + bộ ngưỡng riêng của tier này (ảnh `CONG_BO_DIEM_SAN_2_01_02_1_297dd45939.jpg`, đọc 2026-09-08 ở độ phân giải gốc).',
      'Global Standard: 16 ngành, ngưỡng bằng Chương trình tiêu chuẩn (nêu bằng TEXT trên trang, không cần danh sách ngành để tính đúng ngưỡng).',
    ],
    missingData: ['Mã ngành (hoặc mã tuyển sinh) riêng cho từng ngành thuộc Global Elite / Global Standard.'],
    whyNotInferred:
      'Không tự gán tier theo TÊN ngành: 10 tên Global Elite trùng hệt 10 ngành trong danh mục tiêu chuẩn, nên gán theo tên sẽ nâng nhầm ngưỡng cho thí sinh học Chương trình tiêu chuẩn của đúng 10 ngành đó (báo "trượt" oan). `inferVluThresholdGroup` vì vậy trả `undefined` cho mã lạ thay vì mặc định `standard`.',
    impact: 'threshold-group-inference-incomplete',
  },
  {
    id: 'vlu-program-combination-column-not-imported',
    label:
      'Cột "TỔ HỢP MÔN" và cột "TÊN CHUYÊN NGÀNH ĐỊNH HƯỚNG CHUYÊN SÂU" của bảng 64 ngành chưa import (`programs.ts` chỉ giữ STT/khối ngành/mã ngành/tên ngành) — evaluator vẫn nhận `VluSubjectContext` (danh sách 3 `SubjectId`) trực tiếp từ caller thay vì tra tổ hợp hợp lệ theo ngành.',
    status: 'official-but-unparsed',
    sourceId: 'vlu-admission-info-2026',
    scoreAffecting: false,
    implemented: false,
    whyNotInferred:
      'Bảng gốc là ảnh; cột tổ hợp gồm cả mã tổ hợp năng khiếu (S00/N00/V00/V01/H01-H08) mà `core/subjects.ts` chưa có `SubjectId` tương ứng, nên import nửa vời sẽ tạo danh mục tổ hợp thiếu đúng những ngành năng khiếu. Không ảnh hưởng công thức điểm hiện tại (caller đã tự chọn tổ hợp), nên để lại làm follow-up cùng lúc với việc mở rộng taxonomy môn năng khiếu.',
    impact: 'program-catalog-only',
  },
  {
    id: 'vlu-foreign-language-conversion-table-not-imported',
    label:
      'Bảng "quy đổi điểm chứng chỉ ngoại ngữ sang thang điểm 10" cho MÔN NGOẠI NGỮ trong tổ hợp xét tuyển (IELTS/TOEFL iBT/TOEIC 4 kỹ năng/PTE Academic/Cambridge/APTIS ESOL/LINGUASKILL/VSTEP/HSK/TOCFL/TCF/DELF/TOPIK/JLPT → 5,0/6,0/7,0/8,0/9,0/9,5/10,0) ĐÃ đọc được đầy đủ (ảnh `Bang_quy_doi_diem_ngoai_ngu_144386ae5e.jpg`, 3425×2362, đọc 2026-09-08) nhưng CHƯA mô hình hoá — `ApplicantProfile.certificates` hiện không có PTE/Cambridge/APTIS/LINGUASKILL/VSTEP/TOCFL/TOPIK, và điểm quy đổi này thay THẲNG điểm môn ngoại ngữ trong tổ hợp (không phải điểm cộng), tức phải đổi cả cách dựng tổ hợp chứ không chỉ thêm field.',
    status: 'official-but-unparsed',
    sourceId: 'vlu-quality-threshold-2026',
    scoreAffecting: true,
    implemented: false,
    whyNotInferred:
      'Đây là cơ chế TÙY CHỌN của thí sinh ("được sử dụng chứng chỉ ngoại ngữ để quy đổi"), không phải thành phần bắt buộc của công thức — bỏ qua sẽ ra điểm THẤP HƠN cho thí sinh chọn dùng chứng chỉ. Nhưng vì VLU vẫn `partial` do 2 gap chặn khác, chưa có con số ĐXT nào để làm sai; để lại làm follow-up cùng lúc với việc mở rộng `certificates` sang các loại chứng chỉ còn thiếu.',
    impact: 'optional-conversion-not-modeled',
  },
  {
    id: 'vlu-talent-methods-not-modeled',
    label:
      'Phương thức 4 (kết hợp thi TN THPT + năng khiếu) và Phương thức 5 (kết hợp học bạ + năng khiếu) chưa được model hoá trong UniscoreVN — ngưỡng môn năng khiếu Âm nhạc/Sân khấu Điện ảnh (2 môn: ≥5,00 và ≥7,00 thang 10) đã đọc được, nhưng nhóm ngành Thiết kế/Kiến trúc (chọn 1 trong các môn Vẽ) không có ngưỡng điểm cụ thể trong nguồn đã đọc — để ngoài scope batch này (khác cấu trúc tổ hợp 3 môn chuẩn của phương thức 1-3).',
    status: 'incomplete',
    sourceId: 'vlu-admission-info-2026',
    scoreAffecting: false,
    implemented: false,
    impact: 'talent-methods-out-of-scope',
  },
  {
    id: 'vlu-2026-admission-scheme-pdf-not-found',
    label:
      'Đề án tuyển sinh 2026 dạng PDF chính thức — trang lưu trữ đề án của trường (`vlu.edu.vn/dynamic/de-an-tuyen-sinh`) tại thời điểm research (2026-08-20) chỉ có các năm 2018/2023/2024/2025, CHƯA có bản 2026. Dữ liệu trong module này dựa trên 2 bài tin tức chính thức trên cùng domain (`vlu.edu.vn/news/...`), không phải Đề án PDF — nếu Đề án 2026 được công bố sau, cần đối chiếu lại toàn bộ ngưỡng/công thức.',
    status: 'incomplete',
    sourceId: 'vlu-admission-info-2026',
    scoreAffecting: false,
    implemented: false,
    impact: 'source-lifecycle-review-needed',
  },
];
