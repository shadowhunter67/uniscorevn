import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hcmunreAdmissionMethods } from './methods';

export const hcmunreModule: SchoolModule = {
  id: 'hcmunre',
  name: 'Trường Đại học Tài nguyên và Môi trường TP. Hồ Chí Minh',
  shortName: 'HCMUNRE',
  about:
    'Trường đại học công lập tại TP. Hồ Chí Minh (mã trường DTM), đào tạo 20 ngành đại học chính quy: Quản trị kinh doanh, Bất động sản, Địa chất học, Biến đổi khí hậu, Khí tượng và khí hậu học, Thủy văn học, Hệ thống thông tin, Công nghệ thông tin, Công nghệ kỹ thuật hóa học, Công nghệ vật liệu, Công nghệ kỹ thuật môi trường, Logictics và quản lý chuỗi cung ứng, Kỹ thuật trắc địa - Bản đồ, Quản lý đô thị và công trình, Kỹ thuật cấp thoát nước, Quản lý tài nguyên và môi trường, Kinh tế tài nguyên thiên nhiên, Quản lý đất đai, Quản lý tài nguyên và môi trường biển đảo, Quản lý tài nguyên nước. LƯU Ý: khác hoàn toàn với Trường Đại học Tài nguyên và Môi trường HÀ NỘI (hunre.edu.vn) — hai trường độc lập, không liên quan.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'HCMUNRE 2026 (Phương thức 1, xét kết quả thi TN THPT): điểm trúng tuyển đợt 1 theo ngành, nguồn CHÍNH CHỦ tuyensinh.hcmunre.edu.vn — Quyết định về điểm trúng tuyển đại học chính quy đợt 1 năm 2026 (`sources.ts:hcmunre-cutoff-decision-2026`) kèm file đính kèm PT1.pdf (đọc trực tiếp bằng vision từ PDF gốc, `hcmunre-cutoff-pt1-2026`) + trang "Thông báo ngưỡng chất lượng đầu vào..." xác nhận công thức Điểm xét tuyển = tổng thô 3 môn + điểm ưu tiên (nếu có) (`hcmunre-floor-formula-2026`). Mô hình hoá đủ 20/20 ngành đại học chính quy, điểm trúng tuyển từ 15,00 đến 21,00/30. Chỉ tính Phương thức 1 — HCMUNRE còn Phương thức 2 (học bạ) và Phương thức 3 (ĐGNL ĐHQG-HCM) đã công bố điểm chuẩn song song, chưa mô hình hoá (xem knowledgeGaps.ts).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hcmunreAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Quyết định về điểm trúng tuyển đại học chính quy đợt 1 năm 2026 — Trường Đại học Tài nguyên và Môi trường TP. Hồ Chí Minh',
      url: 'https://tuyensinh.hcmunre.edu.vn/quyet-dinh-ve-diem-trung-tuyen-dai-hoc-chinh-quy-dot-1-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-09-27',
    },
    {
      title: 'Thông báo ngưỡng chất lượng đầu vào đối với các phương thức xét tuyển đại học hệ chính quy năm 2026 — Trường Đại học Tài nguyên và Môi trường TP. Hồ Chí Minh',
      url: 'https://tuyensinh.hcmunre.edu.vn/tb-nguong-chat-luong-dau-vao-doi-voi-cac-phuong-thuc-xet-tuyen-dhcq-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-09-27',
    },
  ],
};
