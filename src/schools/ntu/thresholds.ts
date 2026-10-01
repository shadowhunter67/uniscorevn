/**
 * NTU (Trường Đại học Nha Trang) 2026 — điểm trúng tuyển 53 chương trình, nhánh xét điểm thi TN THPT 2026,
 * THANG 40 (tổ hợp 4 môn: tổng 4 vị trí điểm, môn "*2" nhân đôi). Mỗi chương trình có điểm trúng tuyển RIÊNG
 * cho từng mã tổ hợp (đã quy đổi tương đương giữa các tổ hợp) — nguồn: "Thông báo điểm chuẩn trúng tuyển
 * năm 2026", Bảng 1, đăng 12/08/2026 (`sources.ts:ntu-cutoff-2026`, bảng HTML đọc trực tiếp). Hai dòng
 * 7520320 và 7620301 gộp ô "TVAH TVLH" với CÙNG một điểm (20,93) — tách thành 2 tổ hợp.
 *
 * Tổ hợp T2VN (Toán*2, Văn, Tiếng Nhật) và T2VP (Toán*2, Văn, Tiếng Pháp) vẫn được giữ trong bảng nhưng KHÔNG
 * tính được vì hệ thống chưa có SubjectId Tiếng Nhật/Tiếng Pháp (xem combos.ts, knowledgeGaps.ts). Cột điểm ĐGNL và cột "Điều kiện tiếng Anh" không mô hình hoá.
 */
export interface NtuProgramThreshold {
  /** Mã xét tuyển chính thức của NTU. */
  code: string;
  name: string;
  /** Điểm trúng tuyển theo từng mã tổ hợp, thang 40 (đã gồm ưu tiên theo định nghĩa điểm xét tuyển). */
  cutoffs40: Readonly<Record<string, number>>;
}

export const NTU_PROGRAM_THRESHOLDS_2026: readonly NtuProgramThreshold[] = [
  { code: '7340101A', name: 'Quản trị kinh doanh (chương trình đào tạo đặc biệt: Quản trị kinh doanh tổng hợp; Quản trị kinh doanh quốc tế)', cutoffs40: { T2VA: 24, T2VD: 23.97, T2VG: 20.18, T2VTi: 24.88 } },
  { code: '7340201A', name: 'Tài chính - Ngân hàng (chương trình đào tạo đặc biệt)', cutoffs40: { T2VA: 24, T2VD: 23.97, T2VG: 20.18, T2VTi: 24.88 } },
  { code: '7340301A', name: 'Kế toán (chương trình đào tạo đặc biệt)', cutoffs40: { T2VA: 23, T2VD: 23.03, T2VG: 19.99, T2VTi: 23.95 } },
  { code: '7420201MP', name: 'Công nghệ sinh học (chương trình Minh Phú - NTU)', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VH: 21.41, T2VSi: 20.94, TVAH: 20.93, TVASi: 20.46 } },
  { code: '7480201A', name: 'Công nghệ thông tin (chương trình đào tạo đặc biệt)', cutoffs40: { T2VA: 22, T2VC: 23.86, T2VL: 22.39, T2VTi: 23.03 } },
  { code: '7480201B', name: 'Công nghệ thông tin Việt - Nhật', cutoffs40: { T2VA: 22, T2VC: 23.86, T2VL: 22.39, T2VN: 22, T2VTi: 23.03 } },
  { code: '7520103MP', name: 'Cơ khí thủy sản thông minh (chương trình Minh Phú - NTU)', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VL: 20.46, T2VTi: 21.18, TVAL: 19.98, TVLH: 20.93 } },
  { code: '7520115MP', name: 'Kỹ thuật cơ điện lạnh (chương trình MP - NTU)', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VL: 20.46, T2VTi: 21.18, TVAL: 19.98, TVLH: 20.93 } },
  { code: '7540105HV', name: 'Công nghệ chế biến thuỷ sản (chương trình Hải Vương - NTU)', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VH: 21.41, T2VSi: 20.94, TVAH: 20.93, TVASi: 20.46 } },
  { code: '7540105MP', name: 'Công nghệ chế biến thuỷ sản (chương trình Minh Phú - NTU)', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VH: 21.41, T2VSi: 20.94, TVAH: 20.93, TVASi: 20.46 } },
  { code: '7620301MP', name: 'Nuôi trồng thuỷ sản (chương trình Minh Phú - NTU)', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VH: 21.41, T2VSi: 20.94, TVAH: 20.93, TVASi: 20.46 } },
  { code: '7810103A', name: 'Quản trị dịch vụ du lịch và lữ hành (chương trình đào tạo đặc biệt)', cutoffs40: { T2VA: 25, T2VD: 24.92, T2VG: 20.36, T2VSu: 26.06 } },
  { code: '7810103P', name: 'Quản trị dịch vụ du lịch và lữ hành (chương trình song ngữ Pháp – Việt)', cutoffs40: { T2VA: 23, T2VD: 23.03, T2VG: 19.99, T2VP: 23, T2VSu: 24.2 } },
  { code: '7810201A', name: 'Quản trị khách sạn (chương trình đào tạo đặc biệt)', cutoffs40: { T2VA: 25, T2VD: 24.92, T2VG: 20.36, T2VSu: 26.06 } },
  { code: '7810201V', name: 'Quản trị khách sạn (Chương trình Vin - NTU)', cutoffs40: { T2VA: 25, T2VD: 24.92, T2VG: 20.36, T2VSu: 26.06 } },
  { code: '7220201', name: 'Ngôn ngữ Anh (04 chuyên ngành: Biên - phiên dịch; Tiếng Anh du lịch; Giảng dạy tiếng Anh; Song ngữ Anh - Trung)', cutoffs40: { TVA2: 24.61, TVAD: 24.53, TVAG: 24.19, TVASu: 25.67 } },
  { code: '7220204', name: 'Ngôn ngữ Trung Quốc', cutoffs40: { TVA2: 21.56, TVAD: 21.64, TVAG: 21.47, TVASu: 22.83 } },
  { code: '7310101', name: 'Kinh tế (02 chuyên ngành: Kinh tế thủy sản; Quản lý kinh tế)', cutoffs40: { T2VA: 22, T2VD: 22.08, T2VG: 19.81, T2VTi: 23.03 } },
  { code: '7310105', name: 'Kinh tế phát triển', cutoffs40: { T2VA: 21.5, T2VD: 21.61, T2VG: 19.71, T2VTi: 22.56 } },
  { code: '7340101', name: 'Quản trị kinh doanh', cutoffs40: { T2VA: 24, T2VD: 23.97, T2VG: 20.18, T2VTi: 24.88 } },
  { code: '7340115', name: 'Marketing', cutoffs40: { T2VA: 27, T2VD: 26.81, T2VG: 20.73, T2VTi: 27.66 } },
  { code: '7340121', name: 'Kinh doanh thương mại', cutoffs40: { T2VA: 24, T2VD: 23.97, T2VG: 20.18, T2VTi: 24.88 } },
  { code: '7340201', name: 'Tài chính - Ngân hàng (02 chuyên ngành: Tài chính - Ngân hàng; Công nghệ tài chính)', cutoffs40: { T2VA: 24, T2VD: 23.97, T2VG: 20.18, T2VTi: 24.88 } },
  { code: '7340301', name: 'Kế toán', cutoffs40: { T2VA: 23, T2VD: 23.03, T2VG: 19.99, T2VTi: 23.95 } },
  { code: '7340302', name: 'Kiểm toán', cutoffs40: { T2VA: 23, T2VD: 23.03, T2VG: 19.99, T2VTi: 23.95 } },
  { code: '7340405', name: 'Hệ thống thông tin quản lý', cutoffs40: { T2VA: 21, T2VC: 22.99, T2VG: 19.62, T2VTi: 22.1 } },
  { code: '7380101', name: 'Luật (02 chuyên ngành: Luật; Luật kinh tế)', cutoffs40: { TV2A: 26.59, TV2D: 26.45, TV2G: 26.06, TV2Su: 27.57, V2SuD: 27.06 } },
  { code: '7420201', name: 'Công nghệ sinh học', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VH: 21.41, T2VSi: 20.94, TVAH: 20.93, TVASi: 20.46 } },
  { code: '7480101', name: 'Khoa học máy tính', cutoffs40: { T2VA: 22, T2VC: 23.86, T2VL: 22.39, T2VTi: 23.03 } },
  { code: '7480201', name: 'Công nghệ thông tin (03 chuyên ngành: Công nghệ phần mềm; Hệ thống thông tin; Truyền thông và Mạng máy tính)', cutoffs40: { T2VA: 22, T2VC: 23.86, T2VL: 22.39, T2VTi: 23.03 } },
  { code: '7510202', name: 'Công nghệ chế tạo máy', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VL: 20.46, T2VTi: 21.18, TVAL: 19.98, TVLH: 20.93 } },
  { code: '7520103', name: 'Kỹ thuật cơ khí (02 chuyên ngành: Kỹ thuật cơ khí; Thiết kế và chế tạo số)', cutoffs40: { T2VA: 21, T2VC: 22.99, T2VL: 21.43, T2VTi: 22.1, TVAL: 20.96, TVLH: 21.85 } },
  { code: '7520114', name: 'Kỹ thuật cơ điện tử (02 chuyên ngành: Kỹ thuật cơ điện tử; Hệ thống nhúng và IoT)', cutoffs40: { T2VA: 22, T2VC: 23.86, T2VL: 22.39, T2VTi: 23.03, TVAL: 21.94, TVLH: 22.78 } },
  { code: '7520115', name: 'Kỹ thuật nhiệt (03 chuyên ngành: Kỹ thuật cơ điện lạnh, Điện lạnh, Cơ điện lạnh)', cutoffs40: { T2VA: 21, T2VC: 22.99, T2VL: 21.43, T2VTi: 22.1, TVAL: 20.96, TVLH: 21.85 } },
  { code: '7520116', name: 'Kỹ thuật cơ khí động lực', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VL: 20.46, T2VTi: 21.18, TVAL: 19.98, TVLH: 20.93 } },
  { code: '7520122', name: 'Kỹ thuật tàu thủy', cutoffs40: { T2VA: 21, T2VC: 22.99, T2VL: 21.43, T2VTi: 22.1, TVAL: 20.96, TVLH: 21.85 } },
  { code: '7520130', name: 'Kỹ thuật ô tô', cutoffs40: { T2VA: 22, T2VC: 23.86, T2VL: 22.39, T2VTi: 23.03, TVAL: 21.94, TVLH: 22.78 } },
  { code: '7520201', name: 'Kỹ thuật điện (chuyên ngành Kỹ thuật điện, điện tử)', cutoffs40: { T2VA: 23, T2VC: 24.73, T2VL: 23.35, T2VTi: 23.95, TVAL: 22.93, TVLH: 23.7 } },
  { code: '7520206', name: 'Kỹ thuật biển (Giàn khoan và Tuabin gió)', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VL: 20.46, T2VTi: 21.18, TVAL: 19.98, TVLH: 20.93 } },
  { code: '7520216', name: 'Kỹ thuật điều khiển và tự động hóa', cutoffs40: { T2VA: 23, T2VC: 24.73, T2VL: 23.35, T2VTi: 23.95, TVAL: 22.93, TVLH: 23.7 } },
  { code: '7520301', name: 'Kỹ thuật hoá học', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VH: 21.41, T2VSi: 20.94, TVAH: 20.93, TVLH: 20.93 } },
  { code: '7520320', name: 'Kỹ thuật môi trường (02 chuyên ngành: Kỹ thuật môi trường; Quản lý môi trường và an toàn vệ sinh lao động)', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VH: 21.41, T2VSi: 20.94, TVAH: 20.93, TVLH: 20.93, TVASi: 20.46 } },
  { code: '7540101', name: 'Công nghệ thực phẩm (02 chuyên ngành: Công nghệ thực phẩm; Khoa học dinh dưỡng và ẩm thực)', cutoffs40: { T2VA: 20.5, T2VC: 22.56, T2VH: 21.86, T2VSi: 21.42, TVAH: 21.39, TVASi: 20.94 } },
  { code: '7540105', name: 'Công nghệ chế biến thuỷ sản (02 chuyên ngành: Công nghệ chế biến thủy sản; Công nghệ sau thu hoạch)', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VH: 21.41, T2VSi: 20.94, TVAH: 20.93, TVASi: 20.46 } },
  { code: '7540106', name: 'Đảm bảo chất lượng và an toàn thực phẩm', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VH: 21.41, T2VSi: 20.94, TVAH: 20.93, TVASi: 20.46 } },
  { code: '7580201', name: 'Kỹ thuật xây dựng (02 chuyên ngành: Kỹ thuật xây dựng; Quản lý xây dựng)', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VL: 20.46, T2VTi: 21.18, TVAL: 19.98, TVLH: 20.93 } },
  { code: '7580205', name: 'Kỹ thuật xây dựng công trình giao thông', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VL: 20.46, T2VTi: 21.18, TVAL: 19.98, TVLH: 20.93 } },
  { code: '7620301', name: 'Nuôi trồng thuỷ sản (03 chuyên ngành: Công nghệ Nuôi trồng thủy sản; Quản lý sức khỏe động vật thuỷ sản, Quản lý Nuôi trồng thủy sản)', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VH: 21.41, T2VSi: 20.94, TVAH: 20.93, TVLH: 20.93, TVASi: 20.46 } },
  { code: '7620303', name: 'Khoa học thủy sản (02 chuyên ngành: Khai thác thủy sản, Khoa học thủy sản)', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VH: 21.41, T2VSi: 20.94, T2VTi: 21.18, TVASi: 20.46 } },
  { code: '7620305', name: 'Quản lý thuỷ sản', cutoffs40: { T2VA: 20, T2VC: 22.12, T2VH: 21.41, T2VSi: 20.94, T2VTi: 21.18, TVASi: 20.46 } },
  { code: '7810103', name: 'Quản trị dịch vụ du lịch và lữ hành', cutoffs40: { T2VA: 25, T2VD: 24.92, T2VG: 20.36, T2VSu: 26.06, T2VTi: 25.81 } },
  { code: '7810201', name: 'Quản trị khách sạn', cutoffs40: { T2VA: 25, T2VD: 24.92, T2VG: 20.36, T2VSu: 26.06, T2VTi: 25.81 } },
  { code: '7840106', name: 'Khoa học hàng hải (02 chuyên ngành: Khoa học hàng hải; Quản lý hàng hải và Logistics)', cutoffs40: { T2VA: 25, T2VC: 26.47, T2VL: 25.28, T2VTi: 25.81, TVAL: 24.89, TVLH: 25.56 } },
];

export const NTU_PROGRAM_THRESHOLD_BY_CODE: ReadonlyMap<string, NtuProgramThreshold> = new Map(
  NTU_PROGRAM_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
