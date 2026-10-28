import { ChevronDown, Download } from 'lucide-react';

/** Hero 首屏 —— 页面第一屏视觉焦点 */
export function Hero() {
  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center justify-center px-4"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-content text-center">
        {/* 头像 */}
        <div className="mb-8 inline-block">
          <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full sm:h-[96px] sm:w-[96px] lg:h-[120px] lg:w-[120px]">
            {/* 微光描边动画 */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-purple opacity-75 blur-sm" />
            <div className="absolute inset-[3px] rounded-full bg-bg-primary" />
            <div className="absolute inset-[3px] flex items-center justify-center rounded-full bg-bg-card text-3xl font-bold text-accent">
              S
            </div>
          </div>
        </div>

        {/* 姓名 */}
        <h1
          id="hero-heading"
          className="mb-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
        >
          你好，我是<span className="text-gradient">开发者</span>
        </h1>

        {/* 副标题 */}
        <p className="mx-auto mb-8 max-w-xl text-base text-text-secondary sm:text-lg lg:text-xl">
          全栈工程师 · 专注于 React 生态与现代 Web 技术
        </p>

        {/* CTA 按钮 */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleScrollToProjects}
            className="btn-primary"
          >
            查看项目
          </button>
          <a
            href="/files/resume.pdf"
            download
            className="btn-secondary"
            aria-label="下载简历 PDF"
          >
            <Download size={18} aria-hidden="true" />
            下载简历
          </a>
        </div>
      </div>

      {/* 向下滚动提示 */}
      <button
        type="button"
        onClick={handleScrollToProjects}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float text-text-secondary transition-colors hover:text-accent"
        aria-label="向下滚动"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
