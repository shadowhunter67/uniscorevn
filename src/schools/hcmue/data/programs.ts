export interface HcmueProgramThreshold {
  id: string;
  code: string;
  name: string;
  campus: 'hcmc' | 'long-an' | 'gia-lai';
  group: 'teacher-training' | 'other';
  /** Ngưỡng đầu vào PT xét KQ thi TN THPT (thang 30). Chưa công bố riêng cho phân hiệu -> undefined, KHÔNG suy đoán bằng số trụ sở chính. */
  thptThreshold30?: number;
  /** Ngưỡng đầu vào PT xét học bạ THPT kết hợp ĐGNLCB (thang 30). Chưa công bố riêng cho phân hiệu -> undefined. */
  dgnlcbThreshold30?: number;
}

export const hcmueProgramThresholds: HcmueProgramThreshold[] = [
  { id: 'hcmue-7140201', code: '7140201', name: 'Giáo dục Mầm non', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 21, dgnlcbThreshold30: 19 },
  { id: 'hcmue-7140202', code: '7140202', name: 'Giáo dục Tiểu học', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 21, dgnlcbThreshold30: 19 },
  { id: 'hcmue-7140202SN', code: '7140202SN', name: 'Giáo dục Tiểu học song ngữ', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 21, dgnlcbThreshold30: 19 },
  { id: 'hcmue-7140203', code: '7140203', name: 'Giáo dục Đặc biệt', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 22, dgnlcbThreshold30: 20 },
  { id: 'hcmue-7140204', code: '7140204', name: 'Giáo dục Công dân', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 22, dgnlcbThreshold30: 20 },
  { id: 'hcmue-7140205', code: '7140205', name: 'Giáo dục Chính trị', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 22, dgnlcbThreshold30: 20 },
  { id: 'hcmue-7140206', code: '7140206', name: 'Giáo dục Thể chất', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 19, dgnlcbThreshold30: 17 },
  { id: 'hcmue-7140208', code: '7140208', name: 'Giáo dục Quốc phòng - An ninh', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 20, dgnlcbThreshold30: 18 },
  { id: 'hcmue-7140209', code: '7140209', name: 'Sư phạm Toán học', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 24, dgnlcbThreshold30: 22 },
  { id: 'hcmue-7140210', code: '7140210', name: 'Sư phạm Tin học', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 20, dgnlcbThreshold30: 18 },
  { id: 'hcmue-7140211', code: '7140211', name: 'Sư phạm Vật lý', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 24, dgnlcbThreshold30: 22 },
  { id: 'hcmue-7140212', code: '7140212', name: 'Sư phạm Hóa học', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 24, dgnlcbThreshold30: 22 },
  { id: 'hcmue-7140213', code: '7140213', name: 'Sư phạm Sinh học', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 22, dgnlcbThreshold30: 20 },
  { id: 'hcmue-7140217', code: '7140217', name: 'Sư phạm Ngữ văn', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 24, dgnlcbThreshold30: 22 },
  { id: 'hcmue-7140218', code: '7140218', name: 'Sư phạm Lịch sử', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 24, dgnlcbThreshold30: 22 },
  { id: 'hcmue-7140219', code: '7140219', name: 'Sư phạm Địa lý', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 24, dgnlcbThreshold30: 22 },
  { id: 'hcmue-7140231', code: '7140231', name: 'Sư phạm Tiếng Anh', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 23, dgnlcbThreshold30: 21 },
  { id: 'hcmue-7140232', code: '7140232', name: 'Sư phạm Tiếng Nga', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 20, dgnlcbThreshold30: 18 },
  { id: 'hcmue-7140233', code: '7140233', name: 'Sư phạm Tiếng Pháp', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 20, dgnlcbThreshold30: 18 },
  { id: 'hcmue-7140234', code: '7140234', name: 'Sư phạm Tiếng Trung Quốc', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 22, dgnlcbThreshold30: 20 },
  { id: 'hcmue-7140246', code: '7140246', name: 'Sư phạm Công nghệ', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 20, dgnlcbThreshold30: 18 },
  { id: 'hcmue-7140247', code: '7140247', name: 'Sư phạm Khoa học tự nhiên', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 21, dgnlcbThreshold30: 19 },
  { id: 'hcmue-7140249', code: '7140249', name: 'Sư phạm Lịch sử - Địa lý', campus: 'hcmc', group: 'teacher-training', thptThreshold30: 22, dgnlcbThreshold30: 20 },
  { id: 'hcmue-7140101', code: '7140101', name: 'Giáo dục học', campus: 'hcmc', group: 'other', thptThreshold30: 19, dgnlcbThreshold30: 17 },
  { id: 'hcmue-7140103', code: '7140103', name: 'Công nghệ giáo dục', campus: 'hcmc', group: 'other', thptThreshold30: 18, dgnlcbThreshold30: 17 },
  { id: 'hcmue-7140114', code: '7140114', name: 'Quản lý giáo dục', campus: 'hcmc', group: 'other', thptThreshold30: 20, dgnlcbThreshold30: 18 },
  { id: 'hcmue-7220201', code: '7220201', name: 'Ngôn ngữ Anh', campus: 'hcmc', group: 'other', thptThreshold30: 21, dgnlcbThreshold30: 19 },
  { id: 'hcmue-7220202', code: '7220202', name: 'Ngôn ngữ Nga', campus: 'hcmc', group: 'other', thptThreshold30: 17, dgnlcbThreshold30: 16 },
  { id: 'hcmue-7220203', code: '7220203', name: 'Ngôn ngữ Pháp', campus: 'hcmc', group: 'other', thptThreshold30: 18, dgnlcbThreshold30: 17 },
  { id: 'hcmue-7220204', code: '7220204', name: 'Ngôn ngữ Trung Quốc', campus: 'hcmc', group: 'other', thptThreshold30: 20, dgnlcbThreshold30: 18 },
  { id: 'hcmue-7220209', code: '7220209', name: 'Ngôn ngữ Nhật', campus: 'hcmc', group: 'other', thptThreshold30: 19, dgnlcbThreshold30: 17 },
  { id: 'hcmue-7220210', code: '7220210', name: 'Ngôn ngữ Hàn Quốc', campus: 'hcmc', group: 'other', thptThreshold30: 19, dgnlcbThreshold30: 17 },
  { id: 'hcmue-7229030', code: '7229030', name: 'Văn học', campus: 'hcmc', group: 'other', thptThreshold30: 22, dgnlcbThreshold30: 20 },
  { id: 'hcmue-7310401', code: '7310401', name: 'Tâm lý học', campus: 'hcmc', group: 'other', thptThreshold30: 23, dgnlcbThreshold30: 21 },
  { id: 'hcmue-7310403', code: '7310403', name: 'Tâm lý học giáo dục', campus: 'hcmc', group: 'other', thptThreshold30: 22, dgnlcbThreshold30: 20 },
  { id: 'hcmue-7310501', code: '7310501', name: 'Địa lý học', campus: 'hcmc', group: 'other', thptThreshold30: 20, dgnlcbThreshold30: 18 },
  { id: 'hcmue-7310601', code: '7310601', name: 'Quốc tế học', campus: 'hcmc', group: 'other', thptThreshold30: 20, dgnlcbThreshold30: 18 },
  { id: 'hcmue-7310630', code: '7310630', name: 'Việt Nam học', campus: 'hcmc', group: 'other', thptThreshold30: 21, dgnlcbThreshold30: 19 },
  { id: 'hcmue-7420203', code: '7420203', name: 'Sinh học ứng dụng', campus: 'hcmc', group: 'other', thptThreshold30: 18, dgnlcbThreshold30: 17 },
  { id: 'hcmue-7440102', code: '7440102', name: 'Vật lý học', campus: 'hcmc', group: 'other', thptThreshold30: 19, dgnlcbThreshold30: 17 },
  { id: 'hcmue-7440112', code: '7440112', name: 'Hóa học', campus: 'hcmc', group: 'other', thptThreshold30: 20, dgnlcbThreshold30: 18 },
  { id: 'hcmue-7460112', code: '7460112', name: 'Toán ứng dụng', campus: 'hcmc', group: 'other', thptThreshold30: 22, dgnlcbThreshold30: 20 },
  { id: 'hcmue-7480201', code: '7480201', name: 'Công nghệ thông tin', campus: 'hcmc', group: 'other', thptThreshold30: 18, dgnlcbThreshold30: 17 },
  { id: 'hcmue-7760101', code: '7760101', name: 'Công tác xã hội', campus: 'hcmc', group: 'other', thptThreshold30: 20, dgnlcbThreshold30: 18 },
  { id: 'hcmue-7810101', code: '7810101', name: 'Du lịch', campus: 'hcmc', group: 'other', thptThreshold30: 20, dgnlcbThreshold30: 18 },
  { id: 'hcmue-7310201', code: '7310201', name: 'Chính trị học', campus: 'hcmc', group: 'other', thptThreshold30: 19, dgnlcbThreshold30: 17 },
  { id: 'hcmue-7760103', code: '7760103', name: 'Hỗ trợ Giáo dục người khuyết tật', campus: 'hcmc', group: 'other', thptThreshold30: 19, dgnlcbThreshold30: 17 },

  // Phan hieu Long An (ma tuyen sinh SPT) - chua co nguong dau vao rieng cong bo, chi co diem trung tuyen (xem data/cutoffs.ts).
  { id: 'hcmue-51140201-longan', code: '51140201', name: 'Giáo dục Mầm non (trình độ cao đẳng, Long An)', campus: 'long-an', group: 'teacher-training' },
  { id: 'hcmue-7140201-longan', code: '7140201', name: 'Giáo dục Mầm non (trình độ đại học, Long An)', campus: 'long-an', group: 'teacher-training' },
  { id: 'hcmue-7140202-longan', code: '7140202', name: 'Giáo dục Tiểu học (Long An)', campus: 'long-an', group: 'teacher-training' },
  { id: 'hcmue-7140206-longan', code: '7140206', name: 'Giáo dục Thể chất (Long An)', campus: 'long-an', group: 'teacher-training' },
  { id: 'hcmue-7140208-longan', code: '7140208', name: 'Giáo dục Quốc phòng - An ninh (Long An)', campus: 'long-an', group: 'teacher-training' },
  { id: 'hcmue-7140209-longan', code: '7140209', name: 'Sư phạm Toán học (Long An)', campus: 'long-an', group: 'teacher-training' },
  { id: 'hcmue-7140217-longan', code: '7140217', name: 'Sư phạm Ngữ văn (Long An)', campus: 'long-an', group: 'teacher-training' },
  { id: 'hcmue-7140231-longan', code: '7140231', name: 'Sư phạm Tiếng Anh (Long An)', campus: 'long-an', group: 'teacher-training' },
  { id: 'hcmue-7140249-longan', code: '7140249', name: 'Sư phạm Lịch sử - Địa lý (Long An)', campus: 'long-an', group: 'teacher-training' },
  { id: 'hcmue-7220210-longan', code: '7220210', name: 'Ngôn ngữ Hàn Quốc (Long An)', campus: 'long-an', group: 'other' },

  // Phan hieu Gia Lai (ma tuyen sinh SPG) - chua co nguong dau vao rieng cong bo, chi co diem trung tuyen (xem data/cutoffs.ts).
  { id: 'hcmue-51140201-gialai', code: '51140201', name: 'Giáo dục Mầm non (trình độ cao đẳng, Gia Lai)', campus: 'gia-lai', group: 'teacher-training' },
  { id: 'hcmue-7140201-gialai', code: '7140201', name: 'Giáo dục Mầm non (trình độ đại học, Gia Lai)', campus: 'gia-lai', group: 'teacher-training' },
  { id: 'hcmue-7140202-gialai', code: '7140202', name: 'Giáo dục Tiểu học (Gia Lai)', campus: 'gia-lai', group: 'teacher-training' },
  { id: 'hcmue-7140247-gialai', code: '7140247', name: 'Sư phạm Khoa học tự nhiên (Gia Lai)', campus: 'gia-lai', group: 'teacher-training' },
  { id: 'hcmue-7810101-gialai', code: '7810101', name: 'Du lịch (Gia Lai)', campus: 'gia-lai', group: 'other' },
];
