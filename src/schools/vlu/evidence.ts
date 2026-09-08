import type { SourcedRule } from '../../core/evidence';

export const vluThptExamThresholdEvidence = {
  value: { standard: 15, law: 20, 'medicine-dentistry': 22, pharmacy: 20, 'nursing-medlab': 18 },
  evidence: [
    {
      sourceId: 'vlu-quality-threshold-2026',
      location:
        'Mục "Xét điểm thi tốt nghiệp THPT" — "Các ngành đào tạo tiêu chuẩn nhận hồ sơ xét tuyển từ 15,00 điểm. Riêng khối ngành Pháp luật và Khoa học Sức khỏe áp dụng ngưỡng đảm bảo chất lượng đầu vào theo quy định của Bộ Giáo dục & Đào tạo: Luật/Luật Kinh tế 20,00; Y khoa/Răng-Hàm-Mặt 22,00; Dược học 20,00; Điều dưỡng/KTXNYH 18,00."',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-20',
      note: 'Cross-check khớp với `vlu-admission-info-2026` (bài công bố thông tin tuyển sinh 2026, mục "Điều kiện tuyển sinh chung").',
    },
  ],
} satisfies SourcedRule<Record<'standard' | 'law' | 'medicine-dentistry' | 'pharmacy' | 'nursing-medlab', number>>;

/**
 * Công thức điểm học bạ Phương thức 2/3 — trích nguyên văn cụm định nghĩa phạm vi tính điểm. Batch
 * "6 học kỳ": trước đây KHÔNG tính được vì `ApplicantProfile.transcript` chỉ lưu TB cả năm; nay
 * `transcript.bySemester` lưu đủ 6 học kỳ nên `evaluate.ts` tính và hiển thị được con số này.
 *
 * LƯU Ý phạm vi: đây là ĐIỂM HỌC BẠ THEO TỔ HỢP, CHƯA phải điểm xét tuyển cuối — hệ số 2 của "môn
 * thi chính" (chưa biết áp dụng cho ngành nào) và điểm ưu tiên/điểm cộng vẫn là gap mở, xem
 * `knowledgeGaps.ts`.
 */
export const vluTranscriptFormulaEvidence = {
  value: { description: 'tổng điểm trung bình 03 môn theo tổ hợp xét tuyển của 06 học kỳ (thang 30)', semesterCount: 6, subjectCount: 3 },
  evidence: [
    {
      sourceId: 'vlu-admission-info-2026',
      location: 'Mục "Phương thức 2: Xét kết quả học tập cấp THPT (học bạ)" — "tổng điểm trung bình 03 môn theo tổ hợp xét tuyển của 06 học kỳ".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-20',
    },
  ],
} satisfies SourcedRule<{ description: string; semesterCount: number; subjectCount: number }>;

/**
 * Điểm sàn nhận hồ sơ của PHƯƠNG THỨC HỌC BẠ (khác điểm sàn Phương thức 1) — đọc 2026-09-08 từ ảnh
 * `CONG_BO_DIEM_SAN_CAP_NHAT_01_7952e551f1.jpg` (nhúng trong `vlu-quality-threshold-2026`), cột
 * "XÉT HỌC BẠ THPT". Mỗi ô ghi 2 số: điểm học bạ tối thiểu, và trong ngoặc là điều kiện ĐỒNG THỜI về
 * tổng 3 môn thi TN THPT.
 *
 * Con số trong ngoặc (15 / 18 / 20 / 20 / 16,5) KHỚP 100% với `vluTranscriptExtraRequirementEvidence`
 * ở dưới (đọc từ TEXT của 2 bài viết, 2026-08-20) — 2 lần đọc độc lập, 2 định dạng khác nhau (ảnh vs
 * text), cùng kết quả. Phần MỚI mà chỉ ảnh này có: chính ngưỡng ĐIỂM HỌC BẠ (18/20/23/22/19), trước
 * đây nhóm `standard` bị mô hình hoá là "không có điều kiện bổ sung nào".
 */
export const vluTranscriptThresholdEvidence = {
  value: {
    standard: { transcriptTotal30: 18, concurrentThptTotal30: 15 },
    law: { transcriptTotal30: 20, concurrentThptTotal30: 18 },
    'medicine-dentistry': { transcriptTotal30: 23, concurrentThptTotal30: 20 },
    pharmacy: { transcriptTotal30: 22, concurrentThptTotal30: 20 },
    'nursing-medlab': { transcriptTotal30: 19, concurrentThptTotal30: 16.5 },
  },
  evidence: [
    {
      sourceId: 'vlu-quality-threshold-2026',
      location:
        'Ảnh "ĐIỂM SÀN TUYỂN SINH 2026 — 64 ngành đào tạo chương trình tiêu chuẩn của VLU / 16 ngành đào tạo chương trình Global Standard" (`CONG_BO_DIEM_SAN_CAP_NHAT_01_7952e551f1.jpg`), cột "XÉT HỌC BẠ THPT": dòng 1 (Truyền thông / Xã hội - Nhân văn & Ngôn ngữ / Du lịch / Kinh doanh & Quản lý / Nghệ thuật - Kiến trúc - Thiết kế / Công nghệ - Kỹ thuật) = 18 (đồng thời điểm thi tốt nghiệp THPT từ 15 điểm trở lên); Luật, Luật Kinh tế = 20 (đồng thời từ 18); Y khoa, Răng Hàm Mặt = 23 (đồng thời từ 20); Dược học = 22 (đồng thời từ 20); Điều dưỡng, Kỹ thuật xét nghiệm y học = 19 (đồng thời từ 16,5).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-08',
      note:
        'Ảnh tải trực tiếp từ CDN chính thức của trường (`vluwebmedia.s3.ap-southeast-1.amazonaws.com`, link nhúng trong bài) và đọc ở độ phân giải gốc 3543×3543. Cùng ảnh này còn có cột "XÉT KẾT HỢP HỌC BẠ + ĐGNL/SAT" (V-ACT/HSA/TSA/V-SAT/SAT) — CHƯA import, xem `knowledgeGaps.ts:vlu-combined-method-conversion-table-unpublished` (biết ngưỡng SÀN của từng kỳ thi vẫn không đủ để QUY ĐỔI điểm 2 thang khác nhau về cùng 1 thang theo trọng số 20%/80%).',
    },
  ],
} satisfies SourcedRule<Record<'standard' | 'law' | 'medicine-dentistry' | 'pharmacy' | 'nursing-medlab', { transcriptTotal30: number; concurrentThptTotal30: number }>>;

/**
 * Ánh xạ MÃ NGÀNH → nhóm ngưỡng (`programs.ts`) — bằng chứng là chính cột "KHỐI NGÀNH" của bảng 64
 * ngành, khớp 1-1 với tên khối ngành trên bảng điểm sàn.
 */
export const vluProgramCatalogEvidence = {
  value: { programCount: 64, fieldBlockCount: 9 },
  evidence: [
    {
      sourceId: 'vlu-admission-info-2026',
      location:
        'Ảnh "Danh mục ngành và tổ hợp môn xét tuyển" (`BANG_NGANH_cap_nhat_11_5_2026_6f52ef1150.jpg`, 1488×3543) nhúng trong bài — 64 dòng, cột STT / KHỐI NGÀNH / MÃ NGÀNH / TÊN NGÀNH ĐĂNG KÝ XÉT TUYỂN / TÊN CHUYÊN NGÀNH ĐỊNH HƯỚNG CHUYÊN SÂU / TỔ HỢP MÔN.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-08',
      note:
        'Đọc ở ĐỘ PHÂN GIẢI GỐC theo 4 lát cắt. Bảng KHÔNG có cột "môn thi chính"/"hệ số" nào — bằng chứng trực tiếp cho việc `vlu-primary-subject-list-unpublished` vẫn mở.',
    },
  ],
} satisfies SourcedRule<{ programCount: number; fieldBlockCount: number }>;

export const vluTranscriptExtraRequirementEvidence = {
  value: {
    law: { minRank: 'gioi', altThptTotal30: 18, altGraduationScore10: 8.5 },
    'medicine-dentistry': { minRank: 'gioi', altThptTotal30: 20, altGraduationScore10: 8.5 },
    pharmacy: { minRank: 'gioi', altThptTotal30: 20, altGraduationScore10: 8.5 },
    'nursing-medlab': { minRank: 'kha', altThptTotal30: 16.5, altGraduationScore10: 6.5 },
  },
  evidence: [
    {
      sourceId: 'vlu-admission-info-2026',
      location:
        'Mục "Phương thức 2: Xét kết quả học tập cấp THPT (học bạ)" — điều kiện học lực lớp 12 (giỏi/khá) + tổng 3 môn TN THPT thay thế (20/16,5/18) hoặc điểm xét tốt nghiệp (8,5/6,5/8,5), áp dụng khối Sức khỏe (Y khoa/Dược/RHM, Điều dưỡng/KTXNYH) và Luật/Luật Kinh tế, ghi rõ "không áp dụng đối với phương thức xét điểm thi tốt nghiệp THPT".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-20',
      note: 'Cross-check khớp với `vlu-quality-threshold-2026` (bài công bố điểm sàn), mục "Xét điểm học bạ và xét tuyển kết hợp".',
    },
  ],
} satisfies SourcedRule<
  Record<'law' | 'medicine-dentistry' | 'pharmacy' | 'nursing-medlab', { minRank: string; altThptTotal30: number; altGraduationScore10: number }>
>;
