/**
 * UTT 2026 (Đại học Công nghệ Giao thông vận tải) — ngưỡng đảm bảo chất lượng đầu vào (điểm sàn
 * đăng ký xét tuyển) theo TỪNG MÃ XÉT TUYỂN, phương thức xét điểm thi TN THPT. Nguồn: "Thông báo
 * điểm sàn đăng ký xét tuyển giữa các phương thức xét tuyển năm 2026" (`sources.ts:utt-threshold-2026`,
 * đọc trực tiếp qua curl 2026-08-29, HTTP 200). Cột "Điểm thi THPT 2026" trong bảng gốc — đã bao
 * gồm điểm ưu tiên khu vực/đối tượng (và điểm thưởng nếu có) theo đúng ghi chú của trường: "Điểm
 * sàn nêu trên đã bao gồm cả điểm thưởng (nếu có) và điểm ưu tiên khu vực, đối tượng (nếu có)."
 *
 * Trường KHÔNG công bố tổ hợp môn xét tuyển cụ thể theo từng mã trong chính thông báo này (chỉ nêu
 * chung "tổng điểm 03 môn thi... theo tổ hợp xét tuyển, hoặc sử dụng điểm thi môn Toán, Ngữ văn và
 * một môn thi khác") — nhánh exact KHÔNG validate tổ hợp theo mã ngành (khác CTU), người dùng tự
 * chọn tổ hợp hợp lệ theo đề án tuyển sinh riêng (`utt-program-combination-mapping-not-imported`).
 */
export interface UttProgramThreshold {
  /** Mã xét tuyển (UTT dùng tiền tố GTAD.../GTA... tuỳ chương trình). */
  code: string;
  programId: string;
  name: string;
  /** Nhóm chương trình theo đúng 7 mục La Mã trong thông báo gốc — chỉ để tra cứu, không ảnh hưởng công thức. */
  section:
    | 'standard-hanoi'
    | 'railway-hanoi'
    | 'talent-hanoi'
    | 'english-intensive-hanoi'
    | 'japan-track-hanoi'
    | 'international-joint-hanoi'
    | 'phutho';
  /** Ngưỡng đảm bảo chất lượng đầu vào — phương thức thi TN THPT 2026 (thang 30). */
  threshold30: number;
  /** Ngành có điều kiện bổ sung theo quy định riêng của Bộ GD&ĐT (Vi mạch bán dẫn, Luật, Đường sắt) — số điểm sàn đã đúng theo bảng, nhưng có thể có điều kiện khác (chứng chỉ/sức khoẻ...) không nêu chi tiết trong nguồn này. */
  additionalMoetConditionNote?: string;
}

const LAW_RAIL_CHIP_NOTE =
  'Ngành thuộc nhóm Vi mạch bán dẫn/Luật/Đường sắt — nguồn ghi thêm "phải đảm bảo mức điểm và các điều kiện bổ sung (nếu có) theo quy định của Bộ Giáo dục và Đào tạo", không nêu chi tiết điều kiện bổ sung là gì trong thông báo này.';

export const UTT_PROGRAM_THRESHOLDS: readonly UttProgramThreshold[] = [
  // ===== I. Chương trình chuẩn xét tuyển tại cơ sở Hà Nội (mã GTA...) =====
  { code: 'GTADCCD2', programId: 'cnkt-xd-cau-duong-bo', name: 'Công nghệ kỹ thuật xây dựng Cầu đường bộ', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCTQ2', programId: 'thanh-tra-quan-ly-ctgt', name: 'Thanh tra và quản lý công trình giao thông', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCCH2', programId: 'ha-tang-gt-do-thi-thong-minh', name: 'Hạ tầng giao thông đô thị thông minh', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCBC2', programId: 'quan-ly-khai-thac-bao-tri-duong-cao-toc', name: 'Quản lý, khai thác và bảo trì đường cao tốc', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCBI2', programId: 'xd-quan-ly-so-ctgt', name: 'Xây dựng và quản lý số công trình giao thông', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCDD2', programId: 'cnkt-ctxd-dan-dung-cong-nghiep', name: 'CNKT công trình xây dựng dân dụng và công nghiệp', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCXQ2', programId: 'xd-quan-ly-ha-tang-do-thi', name: 'Xây dựng và quản lý hạ tầng đô thị', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCKN2', programId: 'kien-truc-noi-that', name: 'Kiến trúc nội thất', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCOT2', programId: 'cnkt-o-to', name: 'Công nghệ kỹ thuật ô tô', section: 'standard-hanoi', threshold30: 20 },
  { code: 'GTADCOH2', programId: 'cn-o-to-dien-hybrid', name: 'Công nghệ ô tô điện và ô tô hybrid', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCOD2', programId: 'co-dien-tu-o-to', name: 'Cơ điện tử ô tô', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCOG2', programId: 'cn-o-to-gt-thong-minh', name: 'Công nghệ ô tô và giao thông thông minh', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCMQ2', programId: 'cn-quan-ly-thiet-bi-xd', name: 'Công nghệ và quản lý thiết bị xây dựng', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCMX2', programId: 'may-thiet-bi-tu-dong-hoa-xd', name: 'Máy và thiết bị tự động hóa xây dựng', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCMT2', programId: 'cnkt-co-khi-tau-thuy-ctn', name: 'CNKT cơ khí tàu thủy và công trình nổi', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCCM2', programId: 'cn-che-tao-may', name: 'Công nghệ chế tạo máy', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCVL2', programId: 'logistics-van-tai-da-phuong-thuc', name: 'Logistics và vận tải đa phương thức', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCLD2', programId: 'lu-hanh-du-lich', name: 'Lữ hành và du lịch', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCKX2', programId: 'kinh-te-xay-dung', name: 'Kinh tế xây dựng', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCKB2', programId: 'kinh-te-quan-ly-bds', name: 'Kinh tế và quản lý bất động sản', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCQX2', programId: 'quan-ly-xay-dung', name: 'Quản lý xây dựng', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCMN2', programId: 'cn-quan-ly-moi-truong', name: 'Công nghệ và quản lý môi trường', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCTT2', programId: 'cong-nghe-thong-tin', name: 'Công nghệ thông tin', section: 'standard-hanoi', threshold30: 20 },
  { code: 'GTADCTG2', programId: 'ttnt-gt-thong-minh', name: 'Trí tuệ nhân tạo và giao thông thông minh', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCAT2', programId: 'an-toan-du-lieu-an-ninh-mang', name: 'An toàn dữ liệu và an ninh mạng', section: 'standard-hanoi', threshold30: 20 },
  { code: 'GTADCAI2', programId: 'tri-tue-nhan-tao', name: 'Trí tuệ nhân tạo', section: 'standard-hanoi', threshold30: 18 },
  { code: 'GTADCCN2', programId: 'cnkt-co-dien-tu', name: 'Công nghệ kỹ thuật cơ điện tử', section: 'standard-hanoi', threshold30: 20 },
  { code: 'GTADCRT2', programId: 'cnkt-robot-ttnt', name: 'Công nghệ kỹ thuật Robot và Trí tuệ nhân tạo', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCDT2', programId: 'cnkt-dien-tu-vien-thong', name: 'Công nghệ kỹ thuật điện tử - viễn thông', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCVM2', programId: 'cnkt-vi-mach-ban-dan', name: 'Công nghệ kỹ thuật vi mạch bán dẫn', section: 'standard-hanoi', threshold30: 20, additionalMoetConditionNote: LAW_RAIL_CHIP_NOTE },
  { code: 'GTADCVV2', programId: 'ky-thuat-vi-dien-tu-vat-ly-ban-dan', name: 'Kỹ thuật vi điện tử và vật lý bán dẫn', section: 'standard-hanoi', threshold30: 18, additionalMoetConditionNote: LAW_RAIL_CHIP_NOTE },
  { code: 'GTADCLG2', programId: 'logistics-quan-ly-chuoi-cung-ung', name: 'Logistics và quản lý chuỗi cung ứng', section: 'standard-hanoi', threshold30: 20 },
  { code: 'GTADCLH2', programId: 'logistics-ha-tang-giao-thong', name: 'Logistics và hạ tầng giao thông', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCQT2', programId: 'quan-tri-doanh-nghiep', name: 'Quản trị doanh nghiệp', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCQM2', programId: 'quan-tri-marketing', name: 'Quản trị Marketing', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCTD2', programId: 'thuong-mai-dien-tu', name: 'Thương mại điện tử', section: 'standard-hanoi', threshold30: 20 },
  { code: 'GTADCKS2', programId: 'kinh-doanh-so', name: 'Kinh doanh số', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCTN2', programId: 'tai-chinh-doanh-nghiep', name: 'Tài chính doanh nghiệp', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCHQ2', programId: 'hai-quan-logistics', name: 'Hải quan và Logistics', section: 'standard-hanoi', threshold30: 20 },
  { code: 'GTADCKT2', programId: 'ke-toan-doanh-nghiep', name: 'Kế toán doanh nghiệp', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCKQ2', programId: 'kinh-doanh-quoc-te', name: 'Kinh doanh quốc tế', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCCI2', programId: 'thuong-mai-quoc-te', name: 'Thương mại quốc tế', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCFT2', programId: 'cong-nghe-tai-chinh', name: 'Công nghệ tài chính', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCPK2', programId: 'phan-tich-du-lieu-kinh-te', name: 'Phân tích dữ liệu trong kinh tế', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCMA2', programId: 'truyen-thong-marketing', name: 'Truyền thông Marketing', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCMS2', programId: 'digital-marketing', name: 'Digital Marketing', section: 'standard-hanoi', threshold30: 15 },
  { code: 'GTADCLA2', programId: 'luat', name: 'Luật', section: 'standard-hanoi', threshold30: 20, additionalMoetConditionNote: LAW_RAIL_CHIP_NOTE },
  { code: 'GTADCEN2', programId: 'ngon-ngu-anh', name: 'Ngôn ngữ Anh', section: 'standard-hanoi', threshold30: 20 },

  // ===== II. Chương trình đường sắt tốc độ cao, đường sắt đô thị (Hà Nội, mã GTA) =====
  { code: 'GTADCHS2', programId: 'duong-sat-toc-do-cao', name: 'Đường sắt tốc độ cao', section: 'railway-hanoi', threshold30: 18, additionalMoetConditionNote: LAW_RAIL_CHIP_NOTE },
  { code: 'GTADCXS2', programId: 'xd-quan-ly-khai-thac-duong-sat-do-thi', name: 'Xây dựng và quản lý khai thác đường sắt đô thị', section: 'railway-hanoi', threshold30: 18, additionalMoetConditionNote: LAW_RAIL_CHIP_NOTE },
  { code: 'GTADCDM2', programId: 'cn-phuong-tien-duong-sat-hien-dai', name: 'Công nghệ phương tiện đường sắt hiện đại', section: 'railway-hanoi', threshold30: 18, additionalMoetConditionNote: LAW_RAIL_CHIP_NOTE },
  { code: 'GTADCVS2', programId: 'quan-ly-dieu-hanh-van-tai-duong-sat-tdc', name: 'Quản lý và điều hành vận tải đường sắt tốc độ cao', section: 'railway-hanoi', threshold30: 18, additionalMoetConditionNote: LAW_RAIL_CHIP_NOTE },

  // ===== III. Chương trình tài năng (Hà Nội, mã GTA) =====
  { code: 'GTADCTGT2', programId: 'talent-ttnt-gt-thong-minh', name: 'Trí tuệ nhân tạo và giao thông thông minh (Tài năng)', section: 'talent-hanoi', threshold30: 15 },
  { code: 'GTADCCHT2', programId: 'talent-ha-tang-gt-do-thi-thong-minh', name: 'Hạ tầng giao thông đô thị thông minh (Tài năng)', section: 'talent-hanoi', threshold30: 15 },
  { code: 'GTADCDQT2', programId: 'talent-quan-ly-xd-ctdd-thong-minh', name: 'Quản lý và xây dựng công trình dân dụng thông minh (Tài năng)', section: 'talent-hanoi', threshold30: 15 },
  { code: 'GTADCHST2', programId: 'talent-duong-sat-toc-do-cao', name: 'Đường sắt tốc độ cao (Tài năng)', section: 'talent-hanoi', threshold30: 18, additionalMoetConditionNote: LAW_RAIL_CHIP_NOTE },
  { code: 'GTADCGMT2', programId: 'talent-vat-lieu-xd-tien-tien-thong-minh', name: 'Công nghệ vật liệu xây dựng tiên tiến và thông minh (Tài năng)', section: 'talent-hanoi', threshold30: 15 },

  // ===== IV. Chương trình tăng cường tiếng Anh (Hà Nội, mã GTA) =====
  { code: 'GTADCTTA2', programId: 'tca-cong-nghe-thong-tin', name: 'Công nghệ thông tin (tăng cường tiếng Anh)', section: 'english-intensive-hanoi', threshold30: 15 },
  { code: 'GTADCLDA2', programId: 'tca-lu-hanh-du-lich', name: 'Lữ hành và du lịch (tăng cường tiếng Anh)', section: 'english-intensive-hanoi', threshold30: 15 },
  { code: 'GTADCODA2', programId: 'tca-co-dien-tu-o-to', name: 'Cơ điện tử ô tô (tăng cường tiếng Anh)', section: 'english-intensive-hanoi', threshold30: 15 },
  { code: 'GTADCLGA2', programId: 'tca-logistics-quan-ly-chuoi-cung-ung', name: 'Logistics và quản lý chuỗi cung ứng (tăng cường tiếng Anh)', section: 'english-intensive-hanoi', threshold30: 15 },
  { code: 'GTADCTDA2', programId: 'tca-thuong-mai-dien-tu', name: 'Thương mại điện tử (tăng cường tiếng Anh)', section: 'english-intensive-hanoi', threshold30: 15 },
  { code: 'GTADCKQA2', programId: 'tca-kinh-doanh-quoc-te', name: 'Kinh doanh quốc tế (tăng cường tiếng Anh)', section: 'english-intensive-hanoi', threshold30: 15 },
  { code: 'GTADCHQA2', programId: 'tca-hai-quan-logistics', name: 'Hải quan và Logistics (tăng cường tiếng Anh)', section: 'english-intensive-hanoi', threshold30: 15 },
  { code: 'GTADCQHA2', programId: 'tca-quan-tri-dich-vu-hang-khong', name: 'Quản trị dịch vụ hàng không (tăng cường tiếng Anh)', section: 'english-intensive-hanoi', threshold30: 15 },

  // ===== V. Chương trình định hướng thực tập và làm việc tại Nhật Bản (Hà Nội, mã GTA) =====
  { code: 'GTADCLGJ2', programId: 'jp-logistics-quan-ly-chuoi-cung-ung', name: 'Logistics và quản lý chuỗi cung ứng (tăng cường tiếng Nhật, Nhật Bản)', section: 'japan-track-hanoi', threshold30: 15 },
  { code: 'GTADCDTJ2', programId: 'jp-cnkt-dien-tu-vien-thong', name: 'CNKT Điện tử - Viễn thông (tăng cường tiếng Nhật, Nhật Bản)', section: 'japan-track-hanoi', threshold30: 15 },
  { code: 'GTADCCMJ2', programId: 'jp-cong-nghe-che-tao-may', name: 'Công nghệ chế tạo máy (tăng cường tiếng Nhật, Nhật Bản)', section: 'japan-track-hanoi', threshold30: 15 },

  // ===== VI. Chương trình liên kết quốc tế (Hà Nội, mã GTA) =====
  { code: 'GTADKTT2', programId: 'lkqt-cntt-uitm-ba-lan', name: 'Công nghệ thông tin — ĐH Công nghệ thông tin và quản lý Ba Lan (UITM) cấp bằng', section: 'international-joint-hanoi', threshold30: 15 },
  { code: 'GTADKLG2', programId: 'lkqt-logistics-tongmyong-han-quoc', name: 'Logistics — Trường Đại học Tongmyong, Hàn Quốc cấp bằng', section: 'international-joint-hanoi', threshold30: 15 },

  // ===== VII. Ngành/chuyên ngành tuyển sinh tại cơ sở Phú Thọ (mã GTP) =====
  { code: 'GTADCQM1', programId: 'pt-quan-tri-marketing', name: 'Quản trị Marketing (học tại Phú Thọ)', section: 'phutho', threshold30: 15 },
  { code: 'GTADCKT1', programId: 'pt-ke-toan-doanh-nghiep', name: 'Kế toán doanh nghiệp (học tại Phú Thọ)', section: 'phutho', threshold30: 15 },
  { code: 'GTADCOT1', programId: 'pt-cnkt-o-to', name: 'Công nghệ kỹ thuật ô tô (học tại Phú Thọ)', section: 'phutho', threshold30: 15 },
  { code: 'GTADCTT1', programId: 'pt-cong-nghe-thong-tin', name: 'Công nghệ thông tin (học tại Phú Thọ)', section: 'phutho', threshold30: 15 },
  { code: 'GTADC1', programId: 'pt-cnkt-cau-duong-bo', name: 'CNKT Cầu đường bộ (học tại Phú Thọ)', section: 'phutho', threshold30: 15 },
];

export const UTT_THRESHOLD_BY_CODE: ReadonlyMap<string, UttProgramThreshold> = new Map(
  UTT_PROGRAM_THRESHOLDS.map((entry) => [entry.code, entry])
);

export const UTT_THRESHOLD_BY_PROGRAM_ID: ReadonlyMap<string, UttProgramThreshold> = new Map(
  UTT_PROGRAM_THRESHOLDS.map((entry) => [entry.programId, entry])
);
