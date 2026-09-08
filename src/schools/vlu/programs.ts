import type { VluThresholdGroup } from './eligibility';

/**
 * Danh mục 64 ngành Chương trình TIÊU CHUẨN của VLU 2026 — transcribe từ ảnh bảng chính thức
 * `BANG_NGANH_cap_nhat_11_5_2026_6f52ef1150.jpg` (nhúng trong `vlu-admission-info-2026`, chính là
 * khối "Danh mục ngành và tổ hợp môn xét tuyển" mà bài viết dẫn chiếu tới). Đọc 2026-09-08: tải ảnh
 * gốc (1488×3543) và đọc Ở ĐỘ PHÂN GIẢI GỐC theo 4 lát cắt (STT 1-19 / 19-36 / 36-58 / 56-64) —
 * KHÔNG đọc ảnh đã thu nhỏ (lần đọc thu nhỏ 1.77× từng cho ra `7310101` ở STT 25, đọc lại ở
 * native resolution mới thấy đúng là `7310106`).
 *
 * PHẠM VI CỐ Ý HẸP — chỉ import 3 cột `STT / KHỐI NGÀNH / MÃ NGÀNH / TÊN NGÀNH`:
 * - Cột "TÊN CHUYÊN NGÀNH ĐỊNH HƯỚNG CHUYÊN SÂU" và cột "TỔ HỢP MÔN" KHÔNG import trong batch này
 *   (xem `knowledgeGaps.ts:vlu-program-combination-column-not-imported`). Mã tổ hợp trong ảnh gồm cả
 *   tổ hợp năng khiếu (S00/N00/V00/V01/H01-H08) mà `core/subjects.ts` chưa có `SubjectId` tương ứng,
 *   và mã tổ hợp chỉ đọc chắc chắn được ở vùng ảnh có độ tương phản tốt — không import nửa vời.
 * - Bảng này KHÔNG có cột "môn thi chính"/"hệ số" nào. Đây là bằng chứng TRỰC TIẾP cho việc
 *   `vlu-primary-subject-list-unpublished` vẫn mở: khối nội dung mà nguồn dẫn chiếu tới đã đọc được
 *   đầy đủ, và nó không chứa danh mục ngành nhân hệ số 2.
 *
 * Dùng để làm gì: `inferVluThresholdGroup` — trước đây `evaluate.ts` bắt caller tự truyền
 * `VluThresholdGroup`, nay suy được từ MÃ NGÀNH (stable id, không so khớp tên hiển thị — cùng quy
 * ước `schools/hcmulaw/programs.ts`).
 */
export type VluFieldBlock =
  | 'nghe-thuat'
  | 'thiet-ke'
  | 'xa-hoi-nhan-van-ngon-ngu'
  | 'truyen-thong'
  | 'luat-kinh-doanh-quan-ly'
  | 'cong-nghe-ky-thuat'
  | 'kien-truc'
  | 'khoa-hoc-suc-khoe'
  | 'du-lich';

/** Nhãn hiển thị = verbatim cột "KHỐI NGÀNH" của ảnh gốc (chữ hoa gốc đã chuyển về dạng câu). */
export const VLU_FIELD_BLOCK_LABELS: Record<VluFieldBlock, string> = {
  'nghe-thuat': 'Nghệ thuật',
  'thiet-ke': 'Thiết kế',
  'xa-hoi-nhan-van-ngon-ngu': 'Xã hội Nhân văn - Ngôn ngữ',
  'truyen-thong': 'Truyền thông',
  'luat-kinh-doanh-quan-ly': 'Luật - Kinh doanh & Quản lý',
  'cong-nghe-ky-thuat': 'Công nghệ - Kỹ thuật',
  'kien-truc': 'Kiến trúc',
  'khoa-hoc-suc-khoe': 'Khoa học Sức khỏe',
  'du-lich': 'Du lịch',
};

export interface VluProgram {
  /** Mã ngành chính thức (7 chữ số) — stable id duy nhất dùng để dispatch business rule. */
  id: string;
  name: string;
  fieldBlock: VluFieldBlock;
}

/** 64 ngành, giữ NGUYÊN thứ tự STT 1-64 của bảng gốc để đối chiếu lại với ảnh khi maintain. */
export const vluPrograms: readonly VluProgram[] = [
  { id: '7210205', name: 'Thanh nhạc', fieldBlock: 'nghe-thuat' },
  { id: '7210208', name: 'Piano', fieldBlock: 'nghe-thuat' },
  { id: '7210234', name: 'Diễn viên kịch, điện ảnh - truyền hình', fieldBlock: 'nghe-thuat' },
  { id: '7210235', name: 'Đạo diễn điện ảnh, truyền hình', fieldBlock: 'nghe-thuat' },
  { id: '7210402', name: 'Thiết kế công nghiệp', fieldBlock: 'thiet-ke' },
  { id: '7210403', name: 'Thiết kế Đồ họa', fieldBlock: 'thiet-ke' },
  { id: '7210404', name: 'Thiết kế thời trang', fieldBlock: 'thiet-ke' },
  { id: '7210409', name: 'Thiết kế Mỹ thuật số', fieldBlock: 'thiet-ke' },
  { id: '7580108', name: 'Thiết kế nội thất', fieldBlock: 'thiet-ke' },
  { id: '7220201', name: 'Ngôn ngữ Anh', fieldBlock: 'xa-hoi-nhan-van-ngon-ngu' },
  { id: '7220204', name: 'Ngôn ngữ Trung Quốc', fieldBlock: 'xa-hoi-nhan-van-ngon-ngu' },
  { id: '7220210', name: 'Ngôn ngữ Hàn Quốc', fieldBlock: 'xa-hoi-nhan-van-ngon-ngu' },
  { id: '7229030', name: 'Văn học', fieldBlock: 'xa-hoi-nhan-van-ngon-ngu' },
  { id: '7310401', name: 'Tâm lý học', fieldBlock: 'xa-hoi-nhan-van-ngon-ngu' },
  { id: '7310608', name: 'Đông phương học', fieldBlock: 'xa-hoi-nhan-van-ngon-ngu' },
  { id: '7320104', name: 'Truyền thông đa phương tiện', fieldBlock: 'truyen-thong' },
  { id: '7320105', name: 'Truyền thông Đại chúng', fieldBlock: 'truyen-thong' },
  { id: '7320108', name: 'Quan hệ công chúng', fieldBlock: 'truyen-thong' },
  { id: '7210302', name: 'Công nghệ điện ảnh, truyền hình', fieldBlock: 'truyen-thong' },
  { id: '7320106', name: 'Công nghệ truyền thông', fieldBlock: 'truyen-thong' },
  { id: '7210303', name: 'Thiết kế âm thanh ánh sáng', fieldBlock: 'truyen-thong' },
  { id: '7340101', name: 'Quản trị Kinh doanh', fieldBlock: 'luat-kinh-doanh-quan-ly' },
  { id: '7340115', name: 'Marketing', fieldBlock: 'luat-kinh-doanh-quan-ly' },
  { id: '7340116', name: 'Bất động sản', fieldBlock: 'luat-kinh-doanh-quan-ly' },
  { id: '7310106', name: 'Kinh tế quốc tế', fieldBlock: 'luat-kinh-doanh-quan-ly' },
  { id: '7340120', name: 'Kinh doanh quốc tế', fieldBlock: 'luat-kinh-doanh-quan-ly' },
  { id: '7340121', name: 'Kinh doanh thương mại', fieldBlock: 'luat-kinh-doanh-quan-ly' },
  { id: '7340122', name: 'Thương mại điện tử', fieldBlock: 'luat-kinh-doanh-quan-ly' },
  { id: '7340201', name: 'Tài chính - Ngân hàng', fieldBlock: 'luat-kinh-doanh-quan-ly' },
  { id: '7340205', name: 'Công nghệ tài chính', fieldBlock: 'luat-kinh-doanh-quan-ly' },
  { id: '7340301', name: 'Kế toán', fieldBlock: 'luat-kinh-doanh-quan-ly' },
  { id: '7380101', name: 'Luật', fieldBlock: 'luat-kinh-doanh-quan-ly' },
  { id: '7380107', name: 'Luật kinh tế', fieldBlock: 'luat-kinh-doanh-quan-ly' },
  { id: '7420201', name: 'Công nghệ sinh học', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7420207', name: 'Công nghệ thẩm mỹ', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7460108', name: 'Khoa học dữ liệu', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7480102', name: 'Mạng máy tính và truyền thông dữ liệu', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7480103', name: 'Kỹ thuật phần mềm', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7480104', name: 'Hệ thống thông tin', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7480107', name: 'Trí tuệ nhân tạo', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7480201', name: 'Công nghệ thông tin', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7510205', name: 'Công nghệ kỹ thuật ô tô', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7510301', name: 'Công nghệ kỹ thuật điện, điện tử', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7510406', name: 'Công nghệ kỹ thuật môi trường', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7510605', name: 'Logistics và quản lý chuỗi cung ứng', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7520114', name: 'Kỹ thuật cơ điện tử', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7520115', name: 'Kỹ thuật nhiệt', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7520118', name: 'Kỹ thuật hệ thống công nghiệp', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7520120', name: 'Kỹ thuật hàng không', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7540101', name: 'Công nghệ thực phẩm', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7850101', name: 'Quản lý Tài nguyên & Môi trường', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7580201', name: 'Kỹ thuật xây dựng', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7580205', name: 'Kỹ thuật xây dựng công trình giao thông', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7580302', name: 'Quản lý xây dựng', fieldBlock: 'cong-nghe-ky-thuat' },
  { id: '7580101', name: 'Kiến trúc', fieldBlock: 'kien-truc' },
  { id: '7720101', name: 'Y khoa', fieldBlock: 'khoa-hoc-suc-khoe' },
  { id: '7720201', name: 'Dược học', fieldBlock: 'khoa-hoc-suc-khoe' },
  { id: '7720301', name: 'Điều dưỡng', fieldBlock: 'khoa-hoc-suc-khoe' },
  { id: '7720501', name: 'Răng - Hàm - Mặt', fieldBlock: 'khoa-hoc-suc-khoe' },
  { id: '7720601', name: 'Kỹ thuật xét nghiệm y học', fieldBlock: 'khoa-hoc-suc-khoe' },
  { id: '7810101', name: 'Du lịch', fieldBlock: 'du-lich' },
  { id: '7810103', name: 'Quản trị dịch vụ du lịch và lữ hành', fieldBlock: 'du-lich' },
  { id: '7810201', name: 'Quản trị khách sạn', fieldBlock: 'du-lich' },
  { id: '7810202', name: 'Quản trị nhà hàng và Dịch vụ ăn uống', fieldBlock: 'du-lich' },
];

/**
 * Ánh xạ MÃ NGÀNH → nhóm ngưỡng, chỉ liệt kê những ngành KHÔNG thuộc nhóm `standard`. Nguồn của
 * chính danh sách nhóm là ảnh `CONG_BO_DIEM_SAN_CAP_NHAT_01_7952e551f1.jpg` (nhúng trong
 * `vlu-quality-threshold-2026`), nêu đích danh TÊN NGÀNH cho từng dòng ngưỡng: "Luật / Luật Kinh tế",
 * "Y khoa / Răng Hàm Mặt", "Dược học", "Điều dưỡng / Kỹ thuật xét nghiệm y học"; mọi khối ngành còn
 * lại (Truyền thông, Xã hội - Nhân văn & Ngôn ngữ, Du lịch, Kinh doanh & Quản lý, Nghệ thuật - Kiến
 * trúc - Thiết kế, Công nghệ - Kỹ thuật) nằm chung dòng ngưỡng đầu = `standard`. 6 tên khối ngành ở
 * dòng đó khớp 1-1 với cột "KHỐI NGÀNH" của bảng 64 ngành, nên phép suy này KHÔNG cần đoán.
 *
 * Cross-check dạng TEXT (không qua ảnh) trên cùng trang: "Ngành Luật, Luật Kinh tế: 20,00 điểm";
 * "Ngành Y khoa, Răng - Hàm - Mặt: 22,00 điểm"; "Ngành Dược học: 20,00 điểm"; "Ngành Điều dưỡng,
 * Kỹ thuật Xét nghiệm Y học: 18,00 điểm" — khớp 100% với ảnh.
 */
const NON_STANDARD_THRESHOLD_GROUP_BY_PROGRAM_ID: Readonly<Record<string, VluThresholdGroup>> = {
  '7380101': 'law', // Luật
  '7380107': 'law', // Luật kinh tế
  '7720101': 'medicine-dentistry', // Y khoa
  '7720501': 'medicine-dentistry', // Răng - Hàm - Mặt
  '7720201': 'pharmacy', // Dược học
  '7720301': 'nursing-medlab', // Điều dưỡng
  '7720601': 'nursing-medlab', // Kỹ thuật xét nghiệm y học
};

export function findVluProgram(programId: string | undefined): VluProgram | undefined {
  if (!programId) return undefined;
  return vluPrograms.find((program) => program.id === programId);
}

/**
 * `undefined` = mã ngành KHÔNG có trong danh mục 64 ngành Chương trình tiêu chuẩn → caller phải tự
 * xử lý (hỏi lại người dùng), KHÔNG mặc định `standard`: mã lạ có thể là ngành Global Elite (ngưỡng
 * CAO HƠN hẳn, xem `knowledgeGaps.ts:vlu-global-tier-program-lists-not-published`) hoặc mã gõ sai —
 * cả 2 trường hợp trả `standard` đều cho ra ngưỡng THẤP HƠN thực tế, tức sai theo hướng nguy hiểm.
 */
export function inferVluThresholdGroup(programId: string | undefined): VluThresholdGroup | undefined {
  const program = findVluProgram(programId);
  if (!program) return undefined;
  return NON_STANDARD_THRESHOLD_GROUP_BY_PROGRAM_ID[program.id] ?? 'standard';
}
