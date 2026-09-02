import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hustAdmissionMethods } from './methods';

export const hustModule: SchoolModule = {
  id: 'hust',
  name: 'Đại học Bách khoa Hà Nội',
  shortName: 'HUST',
  about: 'Public technical university in Hanoi (mã trường BKA).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'HUST 2026 THPT threshold (method[0], giữ nguyên) modeled từ press release chính thức ts.hust.edu.vn: ngưỡng đảm bảo chất lượng theo khối nhóm ngành (2 nhóm, KHÔNG theo chương trình cụ thể) — Kỹ thuật >= 20,0/30; Kinh tế/Giáo dục/Ngoại ngữ >= 19,5/30. Batch 2026-09-03 (roadmap 100 -> 150) thêm method[1] EXACT cho NĂM LIỀN KỀ 2025: điểm chuẩn trúng tuyển thật 65/65 chương trình đào tạo x tổ hợp, nguồn tuyensinh247 (`sources.ts:hust-threshold-2025`), cross-check TUYỆT ĐỐI 4 mức top/bottom qua vnexpress/nhandan/chinhphu.vn. Công thức Điểm xét (ĐX) có trọng số "môn chính" xác nhận trực tiếp qua ts.hust.edu.vn (`hust-formula-official-2025`): (a) không môn chính = tổng thô 3 môn; (b) có môn chính = [(tổng thô + môn chính) x 3/4]; cộng điểm ưu tiên KV/ĐT (judgment call chuẩn quốc gia cho giá trị). Dải điểm chuẩn 2025: 19,00-29,39/30. Tổ hợp mới thêm X02 (Toán/Văn/Tin) vào taxonomy chung; D04/D26/D28/D29/K01 (ngoại ngữ Trung/Đức/Nhật/Pháp hoặc trọng số 4-môn) chưa mô hình hoá (không chương trình nào CHỈ có các tổ hợp này). 2 method KHÔNG trộn/nội suy giữa 2 năm.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hustAdmissionMethods),
  },
  catalogSources: [
    {
      title:
        'Thông cáo báo chí về độ lệch giữa các tổ hợp xét tuyển, bảng quy đổi điểm chuẩn và dự báo mức điểm trúng tuyển vào các ngành của Đại học Bách khoa Hà Nội năm 2026',
      url: 'https://ts.hust.edu.vn/tin-tuc/thong-cao-bao-chi-ve-do-lech-giua-cac-to-hop-xet-tuyen-bang-quy-doi-diem-chuan-va-du-bao-muc-diem-trung-tuyen-vao-cac-nganh-cua-dai-hoc-bach-khoa-ha-noi-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-29',
    },
    {
      title: 'Điểm chuẩn cao nhất ĐH Bách khoa Hà Nội 2025 (công thức Điểm xét chính thức)',
      url: 'https://ts.hust.edu.vn/tin-tuc/diem-chuan-cao-nhat-dh-bach-khoa-ha-noi-2025-29-39-diem-thpt-tuong-duong-93-96-diem-xttn-va-86-97-diem-tsa',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Điểm chuẩn Đại Học Bách Khoa Hà Nội 2025 chính xác (tuyensinh247, bảng đầy đủ 65 chương trình)',
      url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-bach-khoa-ha-noi-BKA.html',
      type: 'secondary',
      checkedAt: '2026-09-03',
    },
  ],
};
