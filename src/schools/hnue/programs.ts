export interface HnueProgram {
  code: string;
  name: string;
  /** Điểm sàn 2026 (thang 30, KHÔNG nhân hệ số, KHÔNG tính điểm cộng, thí sinh khu vực 3) — mọi tổ hợp 3 môn
   * dùng chung một mức. `undefined` = ngành năng khiếu có điều kiện phụ (điểm sàn tổ hợp + điểm sàn 1-2 môn
   * thi TN THPT), chưa mô hình hoá. */
  floor30?: number;
  outOfScopeReason?: string;
}

const TALENT = 'Ngành năng khiếu: điểm sàn tổ hợp kèm điểm sàn riêng cho môn thi TN THPT trong tổ hợp, và môn năng khiếu chưa mô hình hoá được.';

// Bảng "Ngưỡng bảo đảm chất lượng đầu vào ... năm 2026" — tuyensinh.hnue.edu.vn/thong-bao/667 (9 lĩnh vực).
export const HNUE_PROGRAMS_2026: readonly HnueProgram[] = [
  // 1a. Khoa học giáo dục
  { code: '7140101', name: 'Giáo dục học (Giáo dục và truyền thông)', floor30: 18 },
  { code: '7140114', name: 'Quản lí giáo dục', floor30: 18 },
  // 1b. Đào tạo giáo viên
  { code: '7140201', name: 'GD Mầm non', outOfScopeReason: TALENT },
  { code: '7140201K', name: 'GD Mầm non - SP Tiếng Anh', outOfScopeReason: TALENT },
  { code: '7140202', name: 'GD Tiểu học', floor30: 21 },
  { code: '7140202K', name: 'GD Tiểu học - SP Tiếng Anh', floor30: 21 },
  { code: '7140203', name: 'GD đặc biệt', floor30: 22 },
  { code: '7140204', name: 'GD công dân', floor30: 21 },
  { code: '7140205', name: 'GD chính trị', floor30: 21 },
  { code: '7140206', name: 'GD thể chất', outOfScopeReason: TALENT },
  { code: '7140208', name: 'GD Quốc phòng và An ninh', floor30: 20 },
  { code: '7140209', name: 'SP Toán học', floor30: 21 },
  { code: '7140209K', name: 'SP Toán học (dạy Toán bằng tiếng Anh)', floor30: 22 },
  { code: '7140210', name: 'SP Tin học', floor30: 21 },
  { code: '7140210K', name: 'SP Tin học (dạy Tin học bằng tiếng Anh)', floor30: 21 },
  { code: '7140211', name: 'SP Vật lí', floor30: 21 },
  { code: '7140211K', name: 'SP Vật lí (dạy Vật lí bằng tiếng Anh)', floor30: 21 },
  { code: '7140212', name: 'SP Hoá học', floor30: 21 },
  { code: '7140212K', name: 'SP Hoá học (dạy Hóa học bằng tiếng Anh)', floor30: 21 },
  { code: '7140213', name: 'SP Sinh học', floor30: 22 },
  { code: '7140217', name: 'SP Ngữ văn', floor30: 22 },
  { code: '7140218', name: 'SP Lịch sử', floor30: 22 },
  { code: '7140219', name: 'SP Địa lí', floor30: 21 },
  { code: '7140221', name: 'SP Âm nhạc', outOfScopeReason: TALENT },
  { code: '7140222', name: 'SP Mỹ thuật', outOfScopeReason: TALENT },
  { code: '7140231', name: 'SP Tiếng Anh', floor30: 21 },
  { code: '7140233', name: 'SP Tiếng Pháp', floor30: 20 },
  { code: '7140246', name: 'SP Công nghệ', floor30: 20 },
  { code: '7140247', name: 'SP Khoa học tự nhiên', floor30: 21 },
  { code: '7140249', name: 'SP Lịch sử - Địa lí', floor30: 21 },
  // 2. Nhân văn
  { code: '7220101', name: 'Tiếng Việt và văn hóa Việt Nam (tuyển sinh người Việt Nam)', floor30: 20 },
  { code: '7220201', name: 'Ngôn ngữ Anh', floor30: 20 },
  { code: '7220203', name: 'Ngôn ngữ Pháp (Tiếng Pháp ứng dụng và giao tiếp quốc tế)', floor30: 18 },
  { code: '7220204', name: 'Ngôn ngữ Trung Quốc', floor30: 20 },
  { code: '7229001', name: 'Triết học (Triết học Mác Lê-nin)', floor30: 18 },
  { code: '7229010', name: 'Lịch sử', floor30: 19 },
  { code: '7229030', name: 'Văn học', floor30: 21 },
  // 3. Khoa học xã hội và hành vi
  { code: '7310201', name: 'Chính trị học', floor30: 18 },
  { code: '7310301', name: 'Xã hội học', floor30: 18 },
  { code: '7310401', name: 'Tâm lý học (Tâm lý học trường học)', floor30: 19 },
  { code: '7310403', name: 'Tâm lý học giáo dục', floor30: 19 },
  { code: '7310501', name: 'Địa lý học (Địa lí tài nguyên và môi trường)', floor30: 18 },
  { code: '7310601', name: 'Quốc tế học', floor30: 18 },
  { code: '7310630', name: 'Việt Nam học (tuyển sinh người Việt Nam)', floor30: 18 },
  // 4. Khoa học sự sống
  { code: '7420101', name: 'Sinh học', floor30: 18 },
  { code: '7420201', name: 'Công nghệ sinh học', floor30: 18 },
  // 5. Khoa học tự nhiên
  { code: '7440102', name: 'Vật lí học (Vật lí bán dẫn và kỹ thuật)', floor30: 18 },
  { code: '7440112', name: 'Hóa học', floor30: 18.5 },
  { code: '7440112D', name: 'Hóa học (Hóa dược)', floor30: 18 },
  // 6. Toán và thống kê
  { code: '7460101', name: 'Toán học', floor30: 20 },
  { code: '7460108', name: 'Khoa học dữ liệu', floor30: 20 },
  // 7. Máy tính và công nghệ thông tin
  { code: '7480107', name: 'Trí tuệ nhân tạo', floor30: 20 },
  { code: '7480201', name: 'Công nghệ thông tin', floor30: 20 },
  // 8. Dịch vụ xã hội
  { code: '7760101', name: 'Công tác xã hội', floor30: 18 },
  { code: '7760103', name: 'Hỗ trợ giáo dục người khuyết tật', floor30: 18 },
  // 9. Du lịch, khách sạn, thể thao và dịch vụ cá nhân
  { code: '7810103', name: 'Quản trị dịch vụ du lịch và lữ hành', floor30: 18 },
  { code: '7810302', name: 'Huấn luyện thể thao', outOfScopeReason: TALENT },
];

export function getHnueProgram(code: string | undefined): HnueProgram | undefined {
  return HNUE_PROGRAMS_2026.find((program) => program.code === code);
}

/** Điểm ưu tiên khu vực/đối tượng MỨC CHUẨN (chưa giảm) theo Điều 7 TT 06/2026 — dùng làm CẬN TRÊN để loại
 * chắc chắn: điểm sàn HNUE xác định cho thí sinh khu vực 3, không nói rõ thí sinh có ưu tiên so sàn trước hay
 * sau khi cộng ưu tiên nên vùng giữa (thô < sàn ≤ thô + ưu tiên) trả `unknown`, không đoán. */
export function lookupHnueMaxPriority30(region: string | undefined, category: string | undefined): number {
  const regionPoints: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
  const categoryPoints: Record<string, number> = { UT1: 2, UT2: 1 };
  return (region ? regionPoints[region] ?? 0 : 0) + (category ? categoryPoints[category] ?? 0 : 0);
}
