import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { ntuhnAdmissionMethods } from './methods';

export const ntuhnModule: SchoolModule = {
  id: 'ntuhn',
  name: 'Trường Đại học Nguyễn Trãi',
  shortName: 'NTU-HN',
  about: 'Trường đại học tư thục tại Hà Nội, đào tạo 11 ngành trình độ đại học chính quy.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Tinh chính xác Điểm xét tuyển NTU-HN 2026 (phương thức thi TN THPT): DXT = round2(tổng thô 3 môn + điểm ưu tiên KV/ĐT theo Điều 7 TT 06/2026) — ngưỡng 15/30 đồng nhất ca 11 ngành, trích nguyên văn Thông báo điểm sàn chính thức 29/06/2026 (PDF Google Drive, doc bằng OCR). Cong thuc tổng thô + ưu tiên la judgment call vi thông báo không in công thức tuong minh. Phương thức học bạ (18/30) va các phương thức kết hợp điểm năng khiếu chưa được mô hình hóa.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(ntuhnAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn Hệ đại học Chính quy Trường Đại học Nguyễn Trãi 2026',
      url: 'https://daihocnguyentrai.edu.vn/diem-chuan-he-dai-hoc-chinh-quy-truong-dai-hoc-nguyen-trai-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Đại học Nguyễn Trãi công bố điểm chuẩn 2026: Xét điểm thi từ 15, học bạ từ 18 điểm (Báo Đầu tư)',
      url: 'https://baodautu.vn/dai-hoc-nguyen-trai-cong-bo-diem-chuan-2026-xet-diem-thi-tu-15-hoc-ba-tu-18-diem-d668518.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
