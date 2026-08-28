import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { ctumpAdmissionMethods } from './methods';

export const ctumpModule: SchoolModule = {
  id: 'ctump',
  name: 'Trường Đại học Y Dược Cần Thơ',
  shortName: 'CTUMP',
  about: 'Trường đại học công lập trực thuộc Bộ Y tế, tại Cần Thơ, đào tạo khối ngành sức khỏe.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Đã xác minh trực tiếp Thông báo 197/TB-ĐHYDCT (09/07/2026, đọc từ file PDF đính kèm bài đăng chính thức): mức điểm nhận hồ sơ đợt 1 (phương thức thi TN THPT) cho đủ 14/14 ngành, 4 mức — Y khoa/Răng hàm mặt (22,0/30), Y học cổ truyền/Dược học (20,0/30), Điều dưỡng/Xét nghiệm/Hình ảnh y học/PHCN/Y học dự phòng/Hộ sinh (18,0/30), Dinh dưỡng/Y tế công cộng/Kỹ thuật Y sinh/Tâm lý học (15,0/30). Calculator exact: mức điểm này đã bao gồm ưu tiên khu vực/đối tượng (nguồn tự trích công thức giảm dần) nên runtime cộng ưu tiên vào tổng thô trước khi so ngưỡng; mức KV/ĐT cụ thể theo mức chuẩn toàn quốc (judgment call). Phương thức V-SAT (có bảng quy đổi đầy đủ) chưa model.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(ctumpAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo 197/TB-ĐHYDCT: Ngưỡng đảm bảo chất lượng đầu vào và quy tắc quy đổi điểm tương đương xét tuyển đại học hệ chính quy năm 2026',
      url: 'https://tuyensinh.ctump.edu.vn/thong-bao-nguong-dam-bao-chat-luong-dau-vao-va-quy-tac-quy-doi-diem-tuong-duong-xet-tuyen-dai-hoc-he-chinh-quy-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-08-25',
    },
  ],
};
