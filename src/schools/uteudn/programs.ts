export type UteThresholdBasis = 'dxt' | 'thpt-raw-plus-priority';

export interface UteProgram {
  code: string;
  name: string;
  /** Hệ số điểm thi THPT / học bạ trong công thức ĐXT (tổng = 1). */
  thptWeight: number;
  hbWeight: number;
  /** Ngưỡng đảm bảo chất lượng đầu vào 2026 (thang 30). */
  threshold30: number;
  /** 'dxt': so ĐXT (gồm ưu tiên/cộng). 'thpt-raw-plus-priority': ngành SPKT-CNTT — tổng 3 môn THPT
   * (không nhân hệ số) + điểm ưu tiên, theo ghi chú của bảng ngưỡng. */
  thresholdBasis: UteThresholdBasis;
  /** Tổ hợp mô hình hoá được. `undefined` = ngoài phạm vi exact (xem `outOfScopeReason`). */
  combinations?: readonly string[];
  outOfScopeReason?: string;
}

// Bảng "Thông tin đăng ký xét tuyển ... kết hợp điểm thi THPT và học bạ" (7 ảnh) + bảng "Điểm ngưỡng đầu vào".
const TECH = ['A00', 'A01', 'C01', 'D01', 'X07', 'X06'] as const;
const IT = ['A00', 'A01', 'C01', 'X10', 'X06', 'X26'] as const;
const CIVIL = ['A00', 'A01', 'C01', 'D01', 'X02', 'C04'] as const;
const CHEM = ['A00', 'A01', 'B00', 'D01', 'C02', 'D07'] as const;

function program(code: string, name: string, threshold30: number, combinations: readonly string[], weights: [number, number] = [0.7, 0.3], thresholdBasis: UteThresholdBasis = 'dxt'): UteProgram {
  return { code, name, thptWeight: weights[0], hbWeight: weights[1], threshold30, thresholdBasis, combinations };
}

export const UTE_PROGRAMS_2026: readonly UteProgram[] = [
  program('7140214', 'Sư phạm Kỹ thuật công nghiệp (Công nghệ thông tin)', 20, IT, [0.7, 0.3], 'thpt-raw-plus-priority'),
  program('7480201', 'Công nghệ thông tin', 17, IT, [1, 0]),
  program('7510103', 'Công nghệ kỹ thuật xây dựng (Xây dựng dân dụng và Công nghiệp)', 15, CIVIL),
  program('7510104', 'Công nghệ kỹ thuật giao thông (Xây dựng cầu đường)', 15, CIVIL),
  program('7510201', 'Công nghệ kỹ thuật cơ khí (Cơ khí chế tạo)', 16, TECH),
  program('7510201A', 'Công nghệ kỹ thuật cơ khí (Thiết kế và mô phỏng số trong cơ khí)', 16, TECH),
  program('7510203', 'Công nghệ kỹ thuật cơ điện tử', 16, TECH),
  program('7510205', 'Công nghệ kỹ thuật ô tô', 17, TECH),
  program('7510205A', 'Công nghệ kỹ thuật ô tô (Ô tô điện)', 17, TECH),
  program('7510205KT', 'Công nghệ kỹ thuật ô tô (đào tạo 2 năm đầu tại Kon Tum)', 15, TECH),
  program('7510206', 'Công nghệ kỹ thuật nhiệt (Nhiệt - Điện lạnh)', 16, TECH),
  program('7510301A', 'Công nghệ kỹ thuật điện, điện tử (Công nghệ kỹ thuật điện tử)', 16, TECH),
  program('7510301B', 'Công nghệ kỹ thuật điện, điện tử (Công nghệ kỹ thuật điện)', 16, TECH),
  program('7510302', 'Công nghệ kỹ thuật điện tử - viễn thông', 16, TECH),
  {
    code: '7510302A',
    name: 'Công nghệ kỹ thuật điện tử - viễn thông (Thiết kế vi mạch bán dẫn)',
    thptWeight: 1,
    hbWeight: 0,
    threshold30: 0,
    thresholdBasis: 'dxt',
    outOfScopeReason: 'Ngưỡng theo phân vị toàn quốc (top 25% tổ hợp và top 20% điểm Toán do Bộ GDĐT công bố), không phải điểm số cố định.',
  },
  program('7510303', 'Công nghệ kỹ thuật điều khiển và tự động hóa', 17, TECH),
  program('7510303KT', 'Công nghệ kỹ thuật điều khiển và tự động hóa (đào tạo 2 năm đầu tại Kon Tum)', 15, TECH),
  program('7580210', 'Kỹ thuật cơ sở hạ tầng (Xây dựng hạ tầng đô thị)', 15, CIVIL),
  program('7510406', 'Công nghệ kỹ thuật môi trường', 15, CHEM),
  program('7540102', 'Kỹ thuật thực phẩm', 15, CHEM),
  program('7540102A', 'Kỹ thuật thực phẩm (Kỹ thuật sinh học thực phẩm)', 15, CHEM),
  program('7510402', 'Công nghệ vật liệu (Hóa học Vật liệu mới)', 15, CHEM),
  program('7510402A', 'Công nghệ vật liệu (Vật liệu bán dẫn)', 15, CHEM),
  program('7510401', 'Công nghệ kỹ thuật hóa học', 15, CHEM),
  {
    code: '7510101',
    name: 'Công nghệ kỹ thuật kiến trúc',
    thptWeight: 0.7,
    hbWeight: 0.3,
    threshold30: 15,
    thresholdBasis: 'dxt',
    outOfScopeReason: 'Tổ hợp V00/V01/V02 có môn Vẽ mỹ thuật (năng khiếu) chưa mô hình hoá được.',
  },
];

export function getUteProgram(code: string | undefined): UteProgram | undefined {
  return UTE_PROGRAMS_2026.find((program) => program.code === code);
}
