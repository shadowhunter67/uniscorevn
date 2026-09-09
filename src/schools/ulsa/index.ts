import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { ulsaAdmissionMethods } from './methods';

export const ulsaModule: SchoolModule = {
  id: 'ulsa',
  name: 'Trường Đại học Lao động - Xã hội',
  shortName: 'ULSA',
  about:
    'Trường đại học công lập trực thuộc Bộ Nội vụ, đào tạo khối kinh tế - quản trị - nhân lực - công tác xã hội - tâm lý học tại 2 địa điểm có mã tuyển sinh riêng: Trụ sở chính Hà Nội (mã DLX, số 43 Trần Duy Hưng, phường Yên Hoà) và Cơ sở II TP. Hồ Chí Minh (mã DLS, số 1018 Tô Ký, phường Trung Mỹ Tây). Năm 2026 tuyển 28 chương trình đào tạo tại Hà Nội và 14 chương trình tại Cơ sở II.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'ULSA 2026 (Phương thức 100 — xét kết quả thi TN THPT, trường tự gọi là "PT gốc"): điểm trúng tuyển CHÍNH THỨC theo TỪNG chương trình đào tạo VÀ TỪNG địa điểm đào tạo từ Thông báo số 2752/TB-HĐTSĐH2026 ngày 11/8/2026 (`sources.ts:ulsa-diemtrungtuyen-2752-2026` — PDF gốc 5 trang có chữ ký/con dấu trên ulsa.edu.vn, đọc bằng vision): 28/28 chương trình Trụ sở chính Hà Nội (DLX, 16,50–24,78/30) và 14/14 chương trình Cơ sở II TP.HCM (DLS, 16,00–25,05/30) — tổng 42 dòng. Chính thông báo này cũng in cột "Tổ hợp xét" theo từng cụm mã ngành và gán nhãn cột điểm nguyên văn "Điểm chuẩn Thi TN THPT (PT 100, PT gốc, thang 30)" — xác nhận trực tiếp thang 30, không hệ số môn. Công thức lấy từ cổng tuyển sinh chính chủ tuyensinh.ulsa.edu.vn (`sources.ts:ulsa-thongtin-tuyensinh-2026`, mục 4.1.3): "Từ tổng điểm cao đến thấp, bao gồm cả điểm ưu tiên (nếu có)" — tức Điểm xét tuyển = tổng 3 môn theo tổ hợp + điểm ưu tiên KV/ĐT. Bảng tổ hợp trong thông báo điểm chuẩn được đối chiếu chéo với ảnh bảng ngành/tổ hợp/chỉ tiêu trên cổng tuyển sinh (ghi tổ hợp theo TÊN MÔN kèm mã) — khớp tuyệt đối. Điểm ưu tiên dùng khung quốc gia hiện hành (Điều 7 Thông tư 06/2026/TT-BGDĐT) vì trường chỉ dẫn chiếu Quy chế tuyển sinh nội bộ (Quyết định 783/QĐ-ĐHLĐXH) mà không in lại bảng mức (judgment call, cùng tiền lệ EPU/HVU/HBU/VTTU). CHƯA mô hình hoá: bảng quy đổi chứng chỉ tiếng Anh quốc tế cho PT100 (trường ghi rõ "sẽ được thông báo sau" — thiếu nguồn, không phải thiếu implement), Phương thức 200 (học bạ), 402 (ĐGNL/ĐGTD), 301 (tuyển thẳng), 500 (dự bị đại học), và ngưỡng đảm bảo chất lượng đầu vào riêng theo tổ hợp/cơ sở — xem `knowledgeGaps.ts`.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(ulsaAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo số 2752/TB-HĐTSĐH2026 (11/8/2026) — Điểm trúng tuyển đại học hệ chính quy năm 2026',
      url: 'https://ulsa.edu.vn/tuyen-sinh/thong-bao-diem-trung-tuyen-dai-hoc-he-chinh-quy-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-09-09',
    },
    {
      title: 'Trường Đại học Lao động - Xã hội tuyển sinh đại học chính quy năm 2026',
      url: 'https://tuyensinh.ulsa.edu.vn/tin-tuc-chung/truong-dai-hoc-lao-dong-xa-hoi-tuyen-sinh-dai-hoc-chinh-quy-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-09-09',
    },
  ],
};
