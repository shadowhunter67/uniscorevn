import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const gduKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'gdu-health-law-scope-excluded',
    label:
      'Ngưỡng 15,0/30 (module này) chỉ áp dụng cho nhóm ngành IT/truyền thông/quản trị/kinh doanh/tài chính-ngân hàng/khoa học xã hội/ngôn ngữ quốc tế. Đề án tuyển sinh 2026 (mục 4, mã ngành cụ thể: 7720301 Điều dưỡng, 7720603 KTPHCN, 7720501 RHM, 7380101 Luật, 7380107 Luật kinh tế) xác nhận danh mục ngành thuộc khối Sức khỏe/Luật, nhưng mục 3.1 quy định điểm thi TN THPT của khối Sức khỏe là "Theo quy định của Bộ GDĐT" (ngưỡng khối sức khỏe do Bộ công bố hàng năm, KHÔNG phải số GDU tự đặt) — số 22,0/18,0 trong tin tức điểm sàn cũ (`gdu-quality-threshold-2026`) cần đối chiếu lại với văn bản Bộ GDĐT năm 2026 trước khi implement, không suy đoán 1 trong 2 nguồn đúng hơn.',
    status: 'official-but-unparsed',
    sourceId: 'gdu-de-an-tuyen-sinh-2026',
    scoreAffecting: true,
    knownData: [
      'Mã ngành khối Sức khỏe/Luật đã xác định chính xác (đóng gap "chưa rõ ngành nào thuộc nhóm nào" — chỉ còn thiếu ngưỡng điểm chính thức của Bộ GDĐT cho khối sức khỏe).',
      'Điểm chuẩn tin tức cũ (chưa đối chiếu Đề án): Răng Hàm Mặt 22,0/30 (thi TN THPT), 20,0/30 (học bạ); Luật/Luật kinh tế 20,0/30 (thi TN THPT), từ 18,0/30 (học bạ); Điều dưỡng/KTPHCN 18,0/30 (thi TN THPT), từ 16,5/30 (học bạ).',
    ],
    whyNotInferred: 'Đề án 2026 (nguồn mới hơn, mục 3.1) và tin tức điểm sàn cũ (`gdu-quality-threshold-2026`) mô tả khác nhau cho khối Sức khỏe (Đề án dẫn chiếu "theo quy định Bộ GDĐT" thay vì số cố định) — không tự chọn nguồn nào đúng hơn khi chưa đọc được văn bản ngưỡng chính thức của Bộ cho khối sức khỏe 2026.',
    impact: 'Runtime chỉ đánh giá đúng cho nhóm ngành phổ thông (không Sức khỏe/Luật); áp dụng ngưỡng 15,0/30 cho ngành Sức khỏe hoặc Luật sẽ SAI (thấp hơn ngưỡng thật của các ngành đó).',
  },
  {
    id: 'gdu-other-methods-not-modeled',
    label: 'Phương thức xét học bạ (6 học kỳ), ĐGNL ĐHQG, và tổ hợp thi THPT + điểm tốt nghiệp chưa được mô hình hoá; chỉ mới có phương thức xét điểm thi TN THPT.',
    status: 'incomplete',
    sourceId: 'gdu-quality-threshold-2026',
    scoreAffecting: false,
    impact: 'Thí sinh dùng phương thức khác ngoài thi TN THPT cần tự tra cứu ngưỡng riêng, chưa kiểm tra được qua runtime.',
  },
];
