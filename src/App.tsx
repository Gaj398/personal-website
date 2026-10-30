import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { BaseLayout } from '@/components/layout/BaseLayout';

// 路由级懒加载
const HomePage = lazy(() => import('@/pages/HomePage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));
const GuestBookPage = lazy(() => import('@/pages/GuestBookPage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

/** 页面加载占位 */
function PageLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-twinkle rounded-full bg-accent" />
    </div>
  );
}

export default function App() {
  return (
    <BaseLayout>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/guestbook" element={<GuestBookPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BaseLayout>
  );
}
