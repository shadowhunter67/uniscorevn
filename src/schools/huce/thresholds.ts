export type HuceCampus = 'hanoi' | 'hcm';
export type HuceMethodId = 'huce-thpt-exam-2026' | 'huce-transcript-2026' | 'huce-tsa-2026' | 'huce-spt-2026' | 'huce-vsat-2026';

export interface HuceProgramThreshold {
  programId: string;
  programCode: string;
  campus: HuceCampus;
  name: string;
  thptMin30?: number;
  transcriptMin30?: number;
  tsaMin100?: number;
  sptMin30?: number;
  vsatMin450?: number;
  sourceId: 'huce-threshold-conversion-2026';
  page: number;
  imageDerived: true;
}

function row(params: Omit<HuceProgramThreshold, 'sourceId' | 'imageDerived'>): HuceProgramThreshold {
  return { ...params, sourceId: 'huce-threshold-conversion-2026', imageDerived: true };
}

const hanoi = (programCode: string, name: string, thptMin30: number, page: number, extras?: Partial<HuceProgramThreshold>) =>
  row({ programId: `hanoi-${programCode}`, programCode, campus: 'hanoi', name, thptMin30, page, ...extras });
const hcm = (programCode: string, name: string, thptMin30: number, extras?: Partial<HuceProgramThreshold>) =>
  row({ programId: `hcm-${programCode}`, programCode, campus: 'hcm', name, thptMin30, page: 4, ...extras });

const t17 = { transcriptMin30: 22.5, tsaMin100: 41.39, sptMin30: 11.29, vsatMin450: 243.58 };
const t18 = { transcriptMin30: 22.93, tsaMin100: 43.07, sptMin30: 12.24, vsatMin450: 257.2 };
const t20 = { transcriptMin30: 23.79, tsaMin100: 46.42, sptMin30: 14.26, vsatMin450: 288.16 };
const t22 = { transcriptMin30: 24.9, tsaMin100: 50.3, sptMin30: 16.28, vsatMin450: 321.64 };
const hcm16 = { transcriptMin30: 22, tsaMin100: 39.63, sptMin30: 10.44, vsatMin450: 230.27 };

export const HUCE_PROGRAM_THRESHOLDS_2026: readonly HuceProgramThreshold[] = [
  hanoi('XDA01', 'Kiến trúc', 20, 2),
  hanoi('XDA02', 'Kiến trúc / Kiến trúc công nghệ', 20, 2),
  hanoi('XDA03', 'Kiến trúc cảnh quan', 18, 2),
  hanoi('XDA04', 'Kiến trúc nội thất', 20, 2),
  hanoi('XDA05', 'Quy hoạch vùng và đô thị', 18, 2),
  hanoi('XDA06', 'Mỹ thuật đô thị', 20, 2),
  hanoi('XDA07', 'Kỹ thuật xây dựng', 18, 2, t18),
  hanoi('XDA08', 'Kỹ thuật xây dựng / Xây dựng dân dụng và công nghiệp', 20, 2, t20),
  hanoi('XDA09', 'Kỹ thuật xây dựng / Hệ thống kỹ thuật trong công trình', 18, 2, t18),
  hanoi('XDA10', 'Kỹ thuật xây dựng / Tin học xây dựng', 20, 2, t20),
  hanoi('XDA11', 'Kỹ thuật xây dựng / Kỹ thuật công trình biển', 17, 2, t17),
  hanoi('XDA12', 'Kỹ thuật xây dựng công trình thủy', 17, 2, t17),
  hanoi('XDA13', 'Kỹ thuật xây dựng công trình Giao thông / Xây dựng Cầu đường', 18, 2, t18),
  hanoi('XDA14', 'Kỹ thuật xây dựng công trình giao thông / Đường sắt tốc độ cao và đường sắt đô thị', 18, 2, t18),
  hanoi('XDA15', 'Kỹ thuật Cấp thoát nước / Kỹ thuật nước - Môi trường nước', 17, 2, t17),
  hanoi('XDA16', 'Kinh tế xây dựng', 20, 2, t20),
  hanoi('XDA17', 'Quản lý xây dựng / Kinh tế và quản lý đô thị', 20, 2, t20),
  hanoi('XDA18', 'Quản lý xây dựng / Kinh tế và quản lý bất động sản', 20, 2, t20),
  hanoi('XDA19', 'Quản lý xây dựng / Quản lý hạ tầng, đất đai đô thị', 18, 2, t18),
  hanoi('XDA20', 'Quản lý xây dựng / Kiểm toán đầu tư xây dựng', 18, 2, t18),
  hanoi('XDA21', 'Công nghệ kỹ thuật xây dựng', 18, 2, t18),
  hanoi('XDA22', 'Công nghệ kỹ thuật vật liệu xây dựng', 17, 2, t17),
  hanoi('XDA23', 'Logistics và Quản lý chuỗi cung ứng', 22, 3, t22),
  hanoi('XDA24', 'Logistics và Quản lý chuỗi cung ứng / Logistics đô thị', 20, 3, t20),
  hanoi('XDA25', 'Logistics và Quản lý chuỗi cung ứng / Logistics công nghiệp', 20, 3, t20),
  hanoi('XDA26', 'Công nghệ thông tin', 20, 3, t20),
  hanoi('XDA27', 'Công nghệ thông tin / Công nghệ đa phương tiện', 20, 3, t20),
  hanoi('XDA28', 'Công nghệ thông tin / An toàn thông tin', 20, 3, t20),
  hanoi('XDA29', 'Khoa học máy tính', 20, 3, t20),
  hanoi('XDA30', 'Khoa học dữ liệu', 20, 3, t20),
  hanoi('XDA31', 'Kỹ thuật cơ khí', 20, 3, t20),
  hanoi('XDA32', 'Kỹ thuật cơ khí / Máy xây dựng', 18, 3, t18),
  hanoi('XDA33', 'Kỹ thuật cơ khí / Kỹ thuật cơ điện', 20, 3, t20),
  hanoi('XDA34', 'Kỹ thuật cơ khí / Kỹ thuật ô tô', 20, 3, t20),
  hanoi('XDA35', 'Kỹ thuật cơ điện tử', 20, 3, t20),
  hanoi('XDA36', 'Kỹ thuật điện', 20, 3, t20),
  hanoi('XDA37', 'Kỹ thuật điều khiển và tự động hóa', 22, 3, t22),
  hanoi('XDA38', 'Kỹ thuật vật liệu', 17, 3, t17),
  hanoi('XDA39', 'Kỹ thuật Môi trường', 18, 3, t18),
  hanoi('XDA40', 'Quản lý dự án', 20, 3, t20),
  hanoi('XDA41', 'CTĐT Nghệ thuật và thiết kế', 20, 3),
  hanoi('XDA42', 'Kỹ thuật xây dựng (Chương trình đào tạo Kỹ sư chất lượng cao - PFIEV)', 18, 3, t18),
  hanoi('XDA43', 'Kỹ thuật xây dựng (Chương trình chuẩn đầu ra tiếng Anh, hợp tác với Đại học Mississippi, Hoa Kỳ)', 18, 3, t18),
  hanoi('XDA44', 'Khoa học Máy tính (Chương trình chuẩn đầu ra tiếng Anh, hợp tác với Đại học Mississippi, Hoa Kỳ)', 18, 3, t18),
  hcm('XDA01', 'Kiến trúc', 17),
  hcm('XDA04', 'Kiến trúc nội thất', 17),
  hcm('XDA08', 'Kỹ thuật xây dựng / Xây dựng dân dụng và công nghiệp', 17, t17),
  hcm('XDA13', 'Kỹ thuật xây dựng công trình Giao thông / Xây dựng Cầu đường', 16, hcm16),
  hcm('XDA15', 'Kỹ thuật Cấp thoát nước / Kỹ thuật nước - Môi trường nước', 16, hcm16),
  hcm('XDA16', 'Kinh tế xây dựng', 17, t17),
  hcm('XDA23', 'Logistics và Quản lý chuỗi cung ứng', 17, t17),
];

export function getHuceProgramThreshold(programId?: string): HuceProgramThreshold | undefined {
  return HUCE_PROGRAM_THRESHOLDS_2026.find((program) => program.programId === programId);
}
