import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface PyuSource {
  id: string;
  publisher: string;
  title: string;
  url: string;
  accessedAt: string;
  publishedAt?: string;
  sourceType?: SourceType;
  verification: VerificationLevel;
  lifecycle?: SourceLifecycle;
  note?: string;
}

export const pyuSources: PyuSource[] = [
  {
    id: 'pyu-admission-score-2026',
    publisher: 'Báo Tuổi Trẻ (cơ quan báo chí nhà nước)',
    title: 'Các ngành sư phạm ở Trường Đại học Phú Yên có điểm sàn 20 điểm',
    url: 'https://tuoitre.vn/cac-nganh-su-pham-o-truong-dai-hoc-phu-yen-co-diem-san-20-diem-100260710185427395.htm',
    accessedAt: '2026-08-26',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'superseded', supersededBy: 'pyu-cutoff-2026' },
    note:
      'Trường Đại học Phú Yên (PYU) công bố điểm sàn 2026 trên cổng chính thức tuyensinh.pyu.edu.vn/pyu.edu.vn, nhưng WebFetch chỉ đọc được tiêu đề thông báo, không lấy được bảng số. Số liệu đối chiếu trực tiếp qua bài báo Tuổi Trẻ (cơ quan báo chí nhà nước), trích nguyên văn: khối ngành sư phạm (6 ngành: Giáo dục mầm non, Giáo dục tiểu học, Sư phạm toán học, Sư phạm ngữ văn, Sư phạm tiếng Anh, Sư phạm khoa học tự nhiên) điểm sàn 20/30 (CHỈ phương thức thi TN THPT, không xét học bạ/ĐGNL cho khối này); 5 ngành còn lại (Ngôn ngữ Anh, Quản trị kinh doanh, Công nghệ thông tin, Nông nghiệp, Du lịch) điểm sàn 15/30 (thi TN THPT), 18/30 (học bạ), 500 điểm (ĐGNL ĐHQG-HCM). Bị thay thế bởi điểm chuẩn trúng tuyển chính thức `pyu-cutoff-2026` — giữ lại làm nguồn lịch sử điểm sàn (trước kỳ thi), không còn dùng cho tính điểm.',
  },
  {
    id: 'pyu-cutoff-2026',
    publisher: 'Trường Đại học Phú Yên (Hội đồng tuyển sinh)',
    title: 'Thông báo điểm trúng tuyển Đại học hệ chính quy năm 2026 (đợt 1) — Quyết định số 497/QĐ-ĐHPY (10/8/2026)',
    url: 'https://tuyensinh.pyu.edu.vn/tuyen-sinh/tin-tuc/diem-trung-tuyen-dai-hoc-chinh-quy-n-m-2026-dot-1',
    accessedAt: '2026-09-16',
    publishedAt: '2026-08-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang nhúng ảnh "Thông báo điểm trúng tuyển đại học hệ chính quy năm 2026 (đợt 1)" (Google Drive, đọc bằng vision qua chrome-devtools screenshot) — bảng 11 ngành, mã ngành, tổ hợp môn xét tuyển, và 3 cột điểm trúng tuyển theo phương thức (Điểm học bạ THPT / Điểm thi tốt nghiệp THPT / Điểm thi ĐGNL ĐHQG TP.HCM). Module này CHỈ dùng cột "Điểm thi tốt nghiệp THPT" (thang 30, không hệ số) và CHỈ mô hình hoá 10/11 ngành — loại Giáo dục Mầm non (7140201, tổ hợp M03/M09 thi năng khiếu, không có "/" ở cột THPT thường — không có SubjectId tương ứng). Đối chiếu chéo với "Danh sách thí sinh trúng tuyển" (cùng Quyết định 497/QĐ-ĐHPY, PDF 13 trang có text layer thật, nhúng cùng trang) — xu hướng điểm trúng tuyển thấp nhất mỗi ngành/tổ hợp giảm dần khớp hướng với bảng tổng hợp; KHÔNG trích xuất bất kỳ trường dữ liệu cá nhân thí sinh nào (tên/ngày sinh/nơi thường trú/đối tượng-khu vực ưu tiên cá nhân) vào runtime, chỉ dùng để xác nhận xu hướng số liệu tổng hợp.',
  },
];
