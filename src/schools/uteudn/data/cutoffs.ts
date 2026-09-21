import type { CutoffStatus, SourceType } from '../../../core/admissionHistory';

export interface UteudnCutoff {
  year: number;
  /** Mã ngành/mã xét tuyển của UTE (khớp `UTE_PROGRAMS_2026[].code`). */
  programId: string;
  score: number;
  scoreScale: number;
  sourceLabel: string;
  sourceUrl: string;
  accessedAt: string;
  status?: CutoffStatus;
  comparableToPrevious?: boolean;
  sourceType?: SourceType;
}

const SOURCE = {
  sourceLabel: 'Điểm chuẩn trúng tuyển đại học năm 2026 theo phương thức xét điểm thi tốt nghiệp THPT 2026 kết hợp học bạ THPT — UTE, ĐH Đà Nẵng',
  sourceUrl: 'https://tuyensinh.ute.udn.vn/ChuyenMuc/Diem-chuan-trung-tuyen-dai-hoc-nam-2026-cua-Truong-Dai-hoc-Su-pham-Ky-thuat--Dai-hoc-Da-Nang_16485.html',
  accessedAt: '2026-09-21',
  sourceType: 'official-school' as const,
};

/** Điểm chuẩn trúng tuyển (KHÔNG phải ngưỡng đầu vào) 2026, thang 30 — ĐXT gồm điểm cộng + ưu tiên. Đọc từ
 * ảnh bảng chính thức `Upload/2026/ketquatuyensinh/kqts2026.jpg` ở độ phân giải gốc (25/25 dòng). */
export const uteudnCutoffs2026: UteudnCutoff[] = [
  { year: 2026, programId: '7140214', score: 22.68, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7480201', score: 19.25, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510101', score: 18.17, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510103', score: 20.06, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510104', score: 19.78, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510201', score: 22.11, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510201A', score: 21.63, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510203', score: 22.78, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510205', score: 22.25, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510205A', score: 23.27, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510205KT', score: 19.9, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510206', score: 21.75, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510301A', score: 22.59, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510301B', score: 22.55, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510302', score: 21.93, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510302A', score: 22.75, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510303', score: 23.91, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510303KT', score: 20.85, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510401', score: 22.05, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510402', score: 19.75, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510402A', score: 20.36, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7510406', score: 18.8, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7540102', score: 20.09, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7540102A', score: 18.83, scoreScale: 30, ...SOURCE },
  { year: 2026, programId: '7580210', score: 20.41, scoreScale: 30, ...SOURCE },
];
