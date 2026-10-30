import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface BaseLayoutProps {
  children: ReactNode;
}

/** 基础布局 —— 包裹所有页面的统一结构 */
export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* 无障碍：跳过导航链接 */}
      <a
        href="#main-content"
        className="sr-only-focusable fixed top-4 left-4 z-50 rounded-button bg-accent px-4 py-2 font-semibold text-white"
      >
        跳到主内容
      </a>

      {/* 吸顶导航 */}
      <Navbar />

      {/* 主内容 */}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}
