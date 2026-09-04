import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { trungvuongAdmissionMethods } from './methods';

export const trungvuongModule: SchoolModule = {
  id: 'trungvuong',
  name: 'Trường Đại học Trưng Vương',
  shortName: 'TVUni',
  about: 'Trường đại học tư thục tại Vĩnh Phúc (mã trường DVP), đào tạo khối ngành ngôn ngữ, kinh tế, kỹ thuật, sức khỏe và du lịch.',
  year: 2025,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'TVUni 2025 (Phương thức 2 — xét kết quả thi TN THPT 2025): điểm trúng tuyển CHÍNH THỨC theo 16/16 ngành đại học chính quy (15,00–19,00/30), nguồn CHÍNH CHỦ tv-uni.edu.vn (Thông báo 387/TB-ĐHTV, 09/06/2025, có chữ ký Hiệu trưởng + con dấu, `sources.ts:trungvuong-thongbao-387-2025`) cho công thức ("ĐXT = TN1+TN2+TN3+Điểm ưu tiên") và tổ hợp môn theo ngành. Điểm trúng tuyển đợt 1 (22/8/2025) đối chiếu 3 nguồn tổng hợp ĐỘC LẬP khớp tuyệt đối (`sources.ts:trungvuong-diemchuan-2025-crosscheck`) vì trang chính chủ không còn giữ bảng đầy đủ theo ngành cho năm 2025. Điểm ưu tiên dùng khung quốc gia hiện hành (trường không tự công bố bảng riêng, judgment call — cùng tiền lệ DNU/TUEBA/PVU/HUST). Loại trừ các tổ hợp dùng ngoại ngữ không có SubjectId (D04 Tiếng Trung, DD2 Tiếng Hàn) và 2 mã tổ hợp không rõ thành phần môn (B01, D02) — các ngành liên quan vẫn tính được với tổ hợp còn lại. Phương thức 1 (học bạ, công thức riêng không cộng ưu tiên), Phương thức 3 (tuyển thẳng) và Phương thức 4 (ĐGNL/ĐGTD) chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(trungvuongAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo 387/TB-ĐHTV — Về việc tuyển sinh trình độ đại học hình thức chính quy năm 2025',
      url: 'https://images.tuyensinh247.com/picture/2025/0703/tb387-vv-tuyen-sinh-trinh-do-dai-hoc-hinh-thuc-chinh-quy-nam-2025.pdf',
      type: 'official-institution',
      checkedAt: '2026-09-04',
    },
    {
      title: 'Điểm chuẩn Trường Đại học Trưng Vương năm 2025 (cross-check 3 nguồn)',
      url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-trung-vuong-DVP.html',
      type: 'secondary',
      checkedAt: '2026-09-04',
    },
  ],
};
