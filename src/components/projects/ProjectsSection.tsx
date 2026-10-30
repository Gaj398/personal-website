import { ExternalLink, Github } from 'lucide-react';

/** 项目数据 —— 个人实践作品 */
const PROJECTS = [
  {
    title: '个人展示网站',
    description:
      '基于 React + Vite + Tailwind CSS 的深色主题个人网站，含星空粒子背景与访客留言板动态交互功能。',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'GitHub Pages'],
    demoUrl: 'https://gaj398.github.io/personal-website/',
    sourceUrl: 'https://github.com/Gaj398/personal-website',
  },
  {
    title: '电商图片下载插件',
    description:
      '用 AI 编辑器开发的 Chrome 扩展，在淘宝/京东/拼多多详情页一键提取并下载商品图片为 PNG。',
    tags: ['Chrome 扩展', 'JavaScript', 'AI 编程', 'GitHub Pages'],
    demoUrl: 'https://gaj398.github.io/image-grab/',
    sourceUrl: 'https://github.com/Gaj398/image-grab',
  },
  {
    title: '图片水印工具',
    description:
      '基于秒哒零代码平台搭建的图片水印工具，上传图片后可设置水印文字、九宫格位置、透明度并一键下载。',
    tags: ['零代码', 'AI 应用', '秒哒'],
    demoUrl: 'https://app-fexr26tkmltt.miaoda.online',
    sourceUrl: '#',
  },
  {
    title: '秒哒 AI 翻译助手',
    description:
      '基于秒哒零代码平台搭建的 AI 应用，支持中英双向实时翻译。',
    tags: ['零代码', 'AI 应用', '秒哒'],
    demoUrl: 'https://app-fch7kmxdkmip.miaoda.online',
    sourceUrl: '#',
  },
];

/** 项目展示区块 */
export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="section-container"
      aria-labelledby="projects-heading"
    >
      <h2 id="projects-heading" className="section-title mb-10">
        项目作品
      </h2>

      <div className="responsive-grid">
        {PROJECTS.map((project) => (
          <article key={project.title} className="card group">
            {/* 封面（显示项目名，非空白占位） */}
            <div className="mb-4 flex aspect-video items-center justify-center overflow-hidden rounded-button bg-gradient-to-br from-bg-secondary to-bg-card">
              <span className="px-4 text-center text-lg font-semibold text-accent">
                {project.title}
              </span>
            </div>

            {/* 标题 */}
            <h3 className="mb-2 text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
              {project.title}
            </h3>

            {/* 描述 */}
            <p className="mb-4 line-clamp-3 text-sm text-text-secondary">
              {project.description}
            </p>

            {/* 标签 */}
            <div className="mb-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* 操作链接 */}
            <div className="flex items-center gap-3">
              {project.demoUrl !== '#' ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80"
                  aria-label={`${project.title} 在线演示`}
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  在线演示
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary">
                  <ExternalLink size={14} aria-hidden="true" />
                  云端训练
                </span>
              )}
              {project.sourceUrl !== '#' ? (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                  aria-label={`${project.title} 源代码`}
                >
                  <Github size={14} aria-hidden="true" />
                  源代码
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary">
                  <Github size={14} aria-hidden="true" />
                  本地项目
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
