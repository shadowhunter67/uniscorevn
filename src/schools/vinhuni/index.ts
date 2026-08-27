import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vinhuniAdmissionMethods } from './methods';

export const vinhuniModule: SchoolModule = {
  id: 'vinhuni',
  name: 'Trường Đại học Vinh',
  shortName: 'VinhUni',
  about: 'Trường đại học công lập đa ngành tại Nghệ An, đào tạo giáo viên, kinh tế, kỹ thuật, nông nghiệp, sức khỏe, luật và nhiều lĩnh vực ứng dụng.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển VinhUni 2026 (Phương thức 100 - thi TN THPT) cho 55 mã ngành ngoài nhóm năng khiếu: Điểm xét tuyển = [tổng thô 3 môn + điểm thưởng] + điểm ưu tiên (công thức giảm ≥ 22,5), so với ngưỡng theo mã ngành (nhóm sư phạm 21-23, ngoài sư phạm 15-20) + điều kiện không môn nào ≤ 1,0 và điều kiện phụ theo môn (Luật: Ngữ văn ≥ 6; Ngôn ngữ Anh: Tiếng Anh ≥ 6) — công thức và bảng ngưỡng trích nguyên văn Phụ lục 1 Thông báo ngưỡng 2026. Điểm thưởng do người dùng cung cấp; phương thức học bạ / ĐGNL / năng khiếu và các trường thành viên chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vinhuniAdmissionMethods),
  },
};
