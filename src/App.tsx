import { lazy, Suspense, useEffect } from 'react';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { SiteHeader } from './components/SiteHeader';
import { SkipLink } from './components/SkipLink';
import { useRoute } from './hooks/useRoute';
import { schoolRegistry } from './schools';
import { setPageMeta } from './core/pageMeta';
import { siteConfig } from './config/site';
import { ApplicantProfileProvider } from './core/ApplicantProfileContext';
import { TextSizeProvider } from './core/TextSizeContext';
import { resolveSchoolId } from './core/resolveSchoolId';
import { ErrorBoundary } from './core/ErrorBoundary';
import { deriveSchoolCtaAction } from './core/schoolCta';
import { FIELD_BY_ID, type FieldId } from './taxonomy/fields';

const MultiSchoolComparisonPage = lazy(() =>
  import('./components/MultiSchoolComparisonPage').then((module) => ({ default: module.MultiSchoolComparisonPage }))
);
const InstitutionProfilePage = lazy(() =>
  import('./components/InstitutionProfilePage').then((module) => ({ default: module.InstitutionProfilePage }))
);
const FieldBrowsePage = lazy(() => import('./components/FieldBrowsePage').then((module) => ({ default: module.FieldBrowsePage })));
const FieldRecommendationPage = lazy(() =>
  import('./components/FieldRecommendationPage').then((module) => ({ default: module.FieldRecommendationPage }))
);

/** "/nganh" hoặc "/nganh/<fieldId>" — luồng "chưa biết chọn trường nào, xem theo lĩnh vực". */
function parseFieldRoute(pathname: string): { isFieldRoute: boolean; fieldId?: FieldId } {
  const match = /^\/nganh(?:\/([a-z0-9-]+))?\/?$/.exec(pathname);
  if (!match) return { isFieldRoute: false };
  const rawFieldId = match[1];
  if (!rawFieldId) return { isFieldRoute: true };
  return { isFieldRoute: true, fieldId: FIELD_BY_ID.has(rawFieldId as FieldId) ? (rawFieldId as FieldId) : undefined };
}

/** Fallback hiện trong lúc chunk của 1 trường (code-split, `React.lazy`) đang tải — thường chỉ
 * thấy thoáng qua trên mạng chậm/lần đầu vào trường đó (chunk sau được browser cache). */
function RouteLoadingFallback() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-bg">
      <p className="text-sm text-muted">Đang tải…</p>
    </div>
  );
}

/**
 * App shell: chỉ biết routing + tra schoolRegistry, KHÔNG import bất kỳ gì từ
 * schools/<id>/calculator|data|... — toàn bộ nội dung/logic trường nằm trong `school.Page`.
 * Thêm trường mới = thêm entry vào schoolRegistry, không sửa file này.
 */
function AppShell() {
  const { pathname, navigate, redirect } = useRoute();
  const fieldRoute = parseFieldRoute(pathname);
  const schoolId = fieldRoute.isFieldRoute ? null : resolveSchoolId(pathname);

  useEffect(() => {
    // Canonicalize địa chỉ trên thanh URL cho link cũ "/?dg_v=..." -> "/hcmut?dg_v=...".
    // Nội dung render đã đúng ngay từ lần đầu (resolveSchoolId xử lý đồng bộ), effect này
    // chỉ dọn URL hiển thị, không ảnh hưởng gì tới việc đã render đúng trang chưa.
    if (pathname === '/' && schoolId === 'hcmut') {
      redirect('/hcmut');
    }
  }, [pathname, schoolId, redirect]);

  const school = schoolId ? schoolRegistry[schoolId] : undefined;
  const schoolAction = school ? deriveSchoolCtaAction(school) : { kind: 'none' as const };

  useEffect(() => {
    if (pathname === '/compare') {
      setPageMeta({
        title: `So sánh điểm xét tuyển — ${siteConfig.name}`,
        description: 'So sánh điểm xét tuyển, điểm chuẩn và mức độ đủ điều kiện của một hồ sơ ở nhiều cơ sở/ngành cùng lúc.',
        path: '/compare',
      });
      return;
    }
    if (fieldRoute.isFieldRoute) {
      const field = fieldRoute.fieldId ? FIELD_BY_ID.get(fieldRoute.fieldId) : undefined;
      setPageMeta({
        title: field ? `${field.name} — ${siteConfig.name}` : `Chọn lĩnh vực — ${siteConfig.name}`,
        description: 'Xem các trường/ngành phù hợp với hồ sơ của bạn theo lĩnh vực — mức độ cạnh tranh tham khảo, không phải dự đoán trúng tuyển.',
        path: pathname,
      });
      return;
    }
    if (!school) {
      setPageMeta({ title: `${siteConfig.name} — Tính & mô phỏng điểm xét tuyển`, description: siteConfig.description, path: '/' });
      return;
    }
    setPageMeta({
      title: `${school.name} — ${siteConfig.name}`,
      description: school.about ?? school.summary ?? siteConfig.description,
      path: `/${schoolId}`,
    });
  }, [pathname, school, schoolId, fieldRoute.isFieldRoute, fieldRoute.fieldId]);

  let content;
  if (pathname === '/compare') {
    content = (
      <Suspense fallback={<RouteLoadingFallback />}>
        <MultiSchoolComparisonPage onBackHome={() => navigate('/')} onOpenSchool={(id) => navigate(`/${id}`)} />
      </Suspense>
    );
  } else if (fieldRoute.isFieldRoute && fieldRoute.fieldId) {
    content = (
      <Suspense fallback={<RouteLoadingFallback />}>
        <FieldRecommendationPage fieldId={fieldRoute.fieldId} onBackToFields={() => navigate('/nganh')} onOpenSchool={(id) => navigate(`/${id}`)} />
      </Suspense>
    );
  } else if (fieldRoute.isFieldRoute) {
    content = (
      <Suspense fallback={<RouteLoadingFallback />}>
        <FieldBrowsePage onOpenField={(id) => navigate(`/nganh/${id}`)} onBackHome={() => navigate('/')} />
      </Suspense>
    );
  } else if (school?.Page) {
    const Page = school.Page;
    // `Page` có thể là `React.lazy(...)` (16 trường có UI calculator thật, xem `schools/index.ts`)
    // — bắt buộc bọc `<Suspense>` khi render component lazy, kể cả với 14 trường còn lại dùng
    // component thường (Suspense không ảnh hưởng gì nếu con không thật sự lazy).
    content = (
      <Suspense fallback={<RouteLoadingFallback />}>
        <Page onChangeSchool={() => navigate('/')} />
      </Suspense>
    );
  } else if (school && schoolAction.kind !== 'none') {
    content = (
      <Suspense fallback={<RouteLoadingFallback />}>
        <InstitutionProfilePage
          school={school}
          onChangeSchool={() => navigate('/')}
          onOpenCompare={(id) => navigate(`/compare?school=${encodeURIComponent(id)}`)}
        />
      </Suspense>
    );
  } else {
    content = (
      <div className="min-h-svh bg-bg">
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <LandingPage
            onSelectSchool={(id) => navigate(`/${id}`)}
            onOpenCompare={() => navigate('/compare')}
            onOpenFieldBrowse={() => navigate('/nganh')}
          />
          <Footer />
        </div>
      </div>
    );
  }

  // 16 trường "nặng" (school.Page thật, không phải lazy generic) đã có Header riêng của mình
  // (site name + nav tương đương) — không chèn thêm SiteHeader ở đó để tránh 2 header/2 dòng brand
  // trên cùng 1 trang. Landing/compare/trang trường thường (generic) chưa từng có header nào,
  // dùng SiteHeader chung.
  const showSiteHeader = !school?.Page;

  // `key={pathname}` (P3): đổi route tạo boundary instance mới -> tự reset hasError, tránh 1 lỗi ở
  // route trước dính mãi sau khi user bấm "Về trang chủ"/điều hướng sang route khác.
  return (
    <>
      <SkipLink />
      {showSiteHeader && <SiteHeader pathname={pathname} onNavigate={navigate} />}
      <ErrorBoundary key={pathname} onGoHome={() => navigate('/')}>
        <main id="main-content" tabIndex={-1} className="outline-none">
          {content}
        </main>
      </ErrorBoundary>
    </>
  );
}

/** TextSizeProvider + ApplicantProfileProvider bọc ngoài AppShell (mount 1 lần, sống suốt phiên
 * SPA) để pref hiển thị + hồ sơ điểm không mất khi chuyển route giữa các trường — xem
 * core/TextSizeContext.tsx / core/ApplicantProfileContext.tsx. */
function App() {
  return (
    <TextSizeProvider>
      <ApplicantProfileProvider>
        <AppShell />
      </ApplicantProfileProvider>
    </TextSizeProvider>
  );
}

export default App;
