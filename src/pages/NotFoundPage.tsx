import { Link } from 'react-router-dom';

/** 404 页面 */
export default function NotFoundPage() {
  return (
    <div
      className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center"
      style={{ paddingTop: 'var(--navbar-height)' }}
    >
      <h1 className="mb-4 text-6xl font-bold text-gradient">404</h1>
      <p className="mb-2 text-xl font-semibold text-text-primary">页面未找到</p>
      <p className="mb-8 text-text-secondary">你访问的页面不存在或已被移除</p>
      <Link to="/" className="btn-primary">
        返回首页
      </Link>
    </div>
  );
}
