/**
 * HCMUNRE (Trường Đại học Tài nguyên và Môi trường TP. Hồ Chí Minh) 2026 — điểm chuẩn trúng tuyển
 * 20/20 ngành đại học chính quy đợt 1, nhánh Phương thức 1 (xét kết quả điểm thi TN THPT năm 2026,
 * thang điểm 30, áp dụng chung cho các tổ hợp xét tuyển của từng ngành). Nguồn chính là file đính
 * kèm chính thức `PT1.pdf` (`sources.ts:hcmunre-cutoff-pt1-2026`, đọc bằng vision từ PDF gốc), tổ
 * hợp môn theo ngành lấy CÙNG bảng này (cột "Tổ hợp xét tuyển").
 *
 * LƯU Ý quan trọng: `hcmunre.edu.vn`/`tuyensinh.hcmunre.edu.vn` LÀ TP.HCM (mã trường DTM, có phương
 * thức 3 dùng kỳ thi ĐGNL của ĐHQG-HCM — chỉ trường phía Nam mới dùng). ĐỪNG nhầm với `hunre.edu.vn`
 * — Trường Đại học Tài nguyên và Môi trường HÀ NỘI, một trường HOÀN TOÀN KHÁC, mã ngành và điểm
 * chuẩn khác hẳn (batch trước đã nhầm, xem NOTES lịch sử — bản này đã đối chiếu lại đúng domain).
 *
 * Tổ hợp X03/X04 xuất hiện trong bảng gốc (Logistics và quản lý chuỗi cung ứng dùng X03; nhiều ngành
 * dùng X04) không có SubjectId tương ứng trong hệ thống UniscoreVN — loại khỏi combinationIds của
 * các ngành liên quan, các tổ hợp còn lại của ngành đó vẫn tính bình thường.
 */
export interface HcmunreFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn PT1.pdf. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

export const HCMUNRE_FIELD_THRESHOLDS_2026: readonly HcmunreFieldThreshold[] = [
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 19, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X01', 'X02'] },
  { code: '7340116', name: 'Bất động sản', threshold30: 15.5, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X01'] },
  { code: '7440201', name: 'Địa chất học', threshold30: 16.5, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X01'] },
  { code: '7440211', name: 'Biến đổi khí hậu', threshold30: 15, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X01', 'X02'] },
  { code: '7440222', name: 'Khí tượng và khí hậu học', threshold30: 15, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X01', 'X02'] },
  { code: '7440224', name: 'Thủy văn học', threshold30: 15, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X01', 'X02'] },
  { code: '7480104', name: 'Hệ thống thông tin', threshold30: 17, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X01', 'X02'] },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 18, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X01', 'X02'] },
  { code: '7510401', name: 'Công nghệ kỹ thuật hóa học', threshold30: 18, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X02'] },
  { code: '7510402', name: 'Công nghệ vật liệu', threshold30: 16, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X02'] },
  { code: '7510406', name: 'Công nghệ kỹ thuật môi trường', threshold30: 17, combinationIds: ['B03', 'C01', 'C02', 'C03', 'D01', 'X01', 'X02'] },
  { code: '7510605', name: 'Logictics và quản lý chuỗi cung ứng', threshold30: 21, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X01', 'X02'] },
  { code: '7520503', name: 'Kỹ thuật trắc địa - Bản đồ', threshold30: 15, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X02'] },
  { code: '7580106', name: 'Quản lý đô thị và công trình', threshold30: 15.5, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X02'] },
  { code: '7580213', name: 'Kỹ thuật cấp thoát nước', threshold30: 15, combinationIds: ['B03', 'C01', 'C02', 'C03', 'D01', 'X01', 'X02'] },
  { code: '7850101', name: 'Quản lý tài nguyên và môi trường', threshold30: 18, combinationIds: ['B03', 'C02', 'C03', 'C04', 'D01', 'X01', 'X02'] },
  { code: '7850102', name: 'Kinh tế tài nguyên thiên nhiên', threshold30: 15.5, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X01', 'X02'] },
  { code: '7850103', name: 'Quản lý đất đai', threshold30: 18, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X01'] },
  { code: '7850197', name: 'Quản lý tài nguyên và môi trường biển đảo', threshold30: 15, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X02'] },
  { code: '7850198', name: 'Quản lý tài nguyên nước', threshold30: 15, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X01', 'X02'] },
];

export const HCMUNRE_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, HcmunreFieldThreshold> = new Map(
  HCMUNRE_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
