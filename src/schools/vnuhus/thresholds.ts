/**
 * Trường Đại học Khoa học Tự nhiên - ĐHQG Hà Nội (VNU-HUS) 2025 — điểm chuẩn 28/28 ngành đại học
 * chính quy, nhánh xét điểm thi TN THPT, công bố 22/08/2025. Nguồn chính: tuyensinh247
 * (`sources.ts:vnuhus-threshold-2025`, bảng đầy đủ theo ngành), cross-check dải điểm với
 * Daibieunhandan.vn (`vnuhus-threshold-secondary-2025`, dải 20,5-26 khớp). Cổng chính thức
 * (chinhphu.vn) xác nhận có thông báo nhưng bảng chỉ hiển thị dạng ảnh (cùng tình huống VNU-UED/
 * VNU-UET/HPMU/VNU-UEB).
 *
 * tuyensinh247 trích nguyên văn: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu
 * tiên nếu có" — xác nhận TRỰC TIẾP điểm chuẩn ĐÃ CỘNG điểm ưu tiên. Mức điểm ưu tiên cụ thể không
 * được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.
 *
 * Mỗi ngành công bố NHIỀU tổ hợp nhưng CHỈ 1 mức điểm chuẩn chung (giống VNU-UET, KHÁC VNU-UED) —
 * nguồn liệt kê 1 dòng/ngành với danh sách tổ hợp gộp chung, không có ghi chú "điểm chuẩn khác
 * nhau theo tổ hợp" như USSH/QBU.
 *
 * Mã ngành dùng mã xét tuyển chính thức của trường (QHT01-QHT99, theo tuyensinh247 đăng lại đề án
 * tuyển sinh) — KHÔNG suy đoán mã ngành đào tạo chuẩn quốc gia (Bộ GD&ĐT) vì một số ngành (Khoa học
 * dữ liệu, Công nghệ Bán dẫn...) là chương trình mới, mã 7 số chưa phổ biến/xác minh được.
 *
 * Tổ hợp áp dụng CHỈ liệt kê các mã đã có trong taxonomy môn dùng chung của app (A00/A01/A02/A07/
 * B00/B03/B08/C01/C02/C04/D01/D07/D08/D09/D10/X01) — loại các mã tổ hợp riêng của trường
 * (X02/X05/X06/X09-X16/X21/X25/X26, A04/A05/A06, B01/B02, D20) do thành phần môn (Công nghệ Công
 * nghiệp/Nông nghiệp cụ thể, Tin học kèm biến thể...) chưa xác minh đủ tin cậy để thêm vào taxonomy
 * dùng chung trong batch này — MỌI ngành đã mô hình hoá đều còn ít nhất 1 tổ hợp hợp lệ (A00 xuất
 * hiện trong danh sách công bố của cả 28/28 ngành).
 */
export interface VnuhusFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

export const VNUHUS_FIELD_THRESHOLDS_2025 = [
  { code: 'QHT93', name: 'Khoa học dữ liệu', threshold30: 26, combinationIds: ['A00', 'A01', 'C01', 'D07', 'D08'] },
  { code: 'QHT01', name: 'Toán học', threshold30: 25.9, combinationIds: ['A00', 'A01', 'C01', 'D07', 'D08'] },
  { code: 'QHT98', name: 'Khoa học máy tính và thông tin', threshold30: 25.35, combinationIds: ['A00', 'A01', 'C01', 'D07', 'D08'] },
  { code: 'QHT99', name: 'Công nghệ Bán dẫn', threshold30: 25.55, combinationIds: ['A00', 'A01', 'A02', 'B00', 'C01', 'C02', 'D07'] },
  { code: 'QHT02', name: 'Toán tin', threshold30: 25.5, combinationIds: ['A00', 'A01', 'C01', 'D07', 'D08'] },
  { code: 'QHT94', name: 'Kỹ thuật điện tử và tin học', threshold30: 24.57, combinationIds: ['A00', 'A01', 'A02', 'B00', 'C01', 'C02', 'D07'] },
  { code: 'QHT03', name: 'Vật lý học', threshold30: 24.65, combinationIds: ['A00', 'A01', 'A02', 'B00', 'C01', 'C02', 'D07'] },
  { code: 'QHT04', name: 'Khoa học vật liệu', threshold30: 24.2, combinationIds: ['A00', 'A01', 'A02', 'B00', 'C01', 'C02', 'D07'] },
  { code: 'QHT10', name: 'Địa lý tự nhiên', threshold30: 23.95, combinationIds: ['A00', 'A01', 'A07', 'B00', 'C04', 'D01', 'D10', 'X01'] },
  { code: 'QHT06', name: 'Hoá học', threshold30: 23.9, combinationIds: ['A00', 'B00', 'C02', 'D07'] },
  { code: 'QHT43', name: 'Hoá dược', threshold30: 23.7, combinationIds: ['A00', 'B00', 'C02', 'D07'] },
  { code: 'QHT07', name: 'Công nghệ kỹ thuật hoá học', threshold30: 23.45, combinationIds: ['A00', 'B00', 'C02', 'D07'] },
  { code: 'QHT91', name: 'Khoa học thông tin địa không gian', threshold30: 23.5, combinationIds: ['A00', 'A01', 'A07', 'B00', 'C04', 'D01', 'D10', 'X01'] },
  { code: 'QHT05', name: 'Công nghệ kỹ thuật hạt nhân', threshold30: 23.5, combinationIds: ['A00', 'A01', 'A02', 'B00', 'C01', 'C02', 'D07'] },
  { code: 'QHT16', name: 'Khí tượng và khí hậu học', threshold30: 22.8, combinationIds: ['A00', 'A01', 'A02', 'B00', 'B03', 'B08', 'C01', 'C02', 'C04', 'D01', 'D07', 'D10'] },
  { code: 'QHT96', name: 'Khoa học và công nghệ thực phẩm', threshold30: 22.8, combinationIds: ['A00', 'A01', 'A02', 'B00', 'B03', 'C01', 'C02', 'D01', 'D07', 'D08'] },
  { code: 'QHT95', name: 'Quản lý phát triển đô thị và bất động sản', threshold30: 22.9, combinationIds: ['A00', 'A01', 'A07', 'B00', 'C04', 'D01', 'D10', 'X01'] },
  { code: 'QHT20', name: 'Quản lý tài nguyên và môi trường', threshold30: 22.2, combinationIds: ['A00', 'A01', 'A07', 'B00', 'B03', 'C01', 'C02', 'C04', 'D01', 'D07', 'D08', 'D09', 'D10', 'X01'] },
  { code: 'QHT09', name: 'Công nghệ sinh học', threshold30: 22.05, combinationIds: ['A00', 'A02', 'B00', 'B03', 'B08', 'D07', 'D08'] },
  { code: 'QHT18', name: 'Địa chất học', threshold30: 22.05, combinationIds: ['A00', 'A01', 'A07', 'B00', 'B03', 'C01', 'C02', 'C04', 'D01', 'D07', 'D08', 'D09', 'D10', 'X01'] },
  { code: 'QHT12', name: 'Quản lý đất đai', threshold30: 22.27, combinationIds: ['A00', 'A01', 'A07', 'B00', 'C04', 'D01', 'D10', 'X01'] },
  { code: 'QHT15', name: 'Công nghệ kỹ thuật môi trường', threshold30: 21.55, combinationIds: ['A00', 'A01', 'A02', 'B00', 'B03', 'C01', 'C02', 'D01', 'D07', 'D08'] },
  { code: 'QHT17', name: 'Hải dương học', threshold30: 21.5, combinationIds: ['A00', 'A01', 'A02', 'B00', 'B03', 'B08', 'C01', 'C02', 'C04', 'D01', 'D07', 'D10'] },
  { code: 'QHT82', name: 'Môi trường, sức khỏe và an toàn', threshold30: 21.2, combinationIds: ['A00', 'A01', 'A02', 'B00', 'B03', 'C01', 'C02', 'D01', 'D07', 'D08'] },
  { code: 'QHT92', name: 'Tài nguyên và môi trường nước', threshold30: 21.1, combinationIds: ['A00', 'A01', 'A02', 'B00', 'B03', 'B08', 'C01', 'C02', 'C04', 'D01', 'D07', 'D10'] },
  { code: 'QHT13', name: 'Khoa học môi trường', threshold30: 21.25, combinationIds: ['A00', 'A01', 'A02', 'B00', 'B03', 'C01', 'C02', 'D01', 'D07', 'D08'] },
  { code: 'QHT81', name: 'Sinh dược học', threshold30: 20.1, combinationIds: ['A00', 'A02', 'B00', 'B03', 'B08', 'D07', 'D08'] },
  { code: 'QHT08', name: 'Sinh học', threshold30: 20.05, combinationIds: ['A00', 'A02', 'B00', 'B03', 'B08', 'D07', 'D08'] },
] as const satisfies readonly VnuhusFieldThreshold[];

export type VnuhusFieldCode = (typeof VNUHUS_FIELD_THRESHOLDS_2025)[number]['code'];

export const VNUHUS_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, VnuhusFieldThreshold> = new Map(
  VNUHUS_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
