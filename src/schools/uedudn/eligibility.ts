export const UEDUDN_THPT_THRESHOLD = {
  min30: 15.5,
  max30: 20,
  requiredText:
    'UED 2026: ngưỡng đảm bảo chất lượng đầu vào (điểm sàn) theo ngành dao động khoảng 15.50-20.00/30.',
};

/**
 * UED 2026 — ảnh chính thức "ĐIỂM NGƯỠNG ĐẦU VÀO ĐẠI HỌC CHÍNH QUY NĂM 2026 THEO ĐIỂM THI THPT"
 * (tuyensinh.ued.udn.vn, tải trực tiếp qua curl + đọc qua vision 2026-08-28) công bố ĐẦY ĐỦ 37
 * ngành. 33/37 ngành dùng công thức chuẩn (tổng 3 môn thi THPT theo tổ hợp + điểm ưu tiên KV/ĐT) —
 * chia 3 nhóm ngưỡng. 4 ngành còn lại (Giáo dục Thể chất, Sư phạm Mỹ thuật, Giáo dục Mầm non, Sư
 * phạm Âm nhạc) dùng công thức khác (1 môn thi + 1/3 điểm ưu tiên, có điểm năng khiếu) — KHÔNG mô
 * hình hoá (xem knowledgeGaps).
 */
export type UedudnProgramGroup = 'tier15_5' | 'tier17' | 'tier20';

export const UEDUDN_PROGRAM_GROUP_LABELS: Record<UedudnProgramGroup, string> = {
  tier15_5: 'Công nghệ giáo dục, Công nghệ sinh học, Nông nghiệp (Nông nghiệp thông minh), Vật lý kỹ thuật, Quản lý tài nguyên và môi trường, Hỗ trợ giáo dục người khuyết tật',
  tier17: 'Hóa học (Hóa Dược/Hóa phân tích-Ứng dụng), CNTT, Văn học, Lịch sử (Quan hệ quốc tế), Địa lý học (Địa lý du lịch), Việt Nam học (Văn hóa du lịch), Văn hóa học, Tâm lý học, Công tác xã hội, Báo chí, Khoa học dữ liệu, Quan hệ công chúng',
  tier20: 'Giáo dục Tiểu học, Giáo dục Chính trị, Sư phạm Toán/Tin/Lý/Hóa/Sinh/Ngữ văn/Lịch sử/Địa lý/KHTN/Lịch sử-Địa lý, Giáo dục Công dân, Giáo dục Pháp luật, Sư phạm Tin học và Công nghệ Tiểu học',
};

export const UEDUDN_PROGRAM_GROUP_THRESHOLD_30: Record<UedudnProgramGroup, number> = {
  tier15_5: 15.5,
  tier17: 17,
  tier20: 20,
};

export interface UedudnExactEligibilityResult {
  pass: boolean;
  requiredText: string;
}

export function checkUedudnExactThreshold(totalScore30: number, group: UedudnProgramGroup): UedudnExactEligibilityResult {
  const threshold = UEDUDN_PROGRAM_GROUP_THRESHOLD_30[group];
  return {
    pass: totalScore30 >= threshold,
    requiredText: `Ngưỡng đầu vào = tổng điểm 3 môn thi TN THPT theo tổ hợp xét tuyển CỘNG điểm ưu tiên khu vực, đối tượng >= ${threshold} (thang 30) — áp dụng ngành: ${UEDUDN_PROGRAM_GROUP_LABELS[group]}.`,
  };
}
