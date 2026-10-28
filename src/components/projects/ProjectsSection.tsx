import { ExternalLink, Github } from 'lucide-react';

/** 项目数据（占位，后续迁移到 data/ 目录） */
const DEMO_PROJECTS = [
  {
    title: '个人展示网站',
    description: '基于 React + Vite + Tailwind CSS 的深色主题个人网站，含星空粒子背景。',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    demoUrl: '#',
    sourceUrl: '#',
  },
  {
    title: '任务管理应用',
    description: '全栈任务管理工具，支持拖拽排序、分类筛选和实时协作。',
    tags: ['React', 'Node.js', 'WebSocket'],
    demoUrl: '#',
    sourceUrl: '#',
  },
  {
    title: '数据可视化面板',
    description: '企业级数据 Dashboard，集成多种图表组件和实时数据流。',
    tags: ['Vue.js', 'D3.js', 'ECharts'],
    demoUrl: '#',
    sourceUrl: '#',
  },
];

/** 项目展示区块（占位，后续实现完整功能） */
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
        {DEMO_PROJECTS.map((project) => (
          <article key={project.title} className="card group">
            {/* 封面占位 */}
            <div className="mb-4 aspect-video overflow-hidden rounded-button bg-bg-secondary">
              <div className="flex h-full items-center justify-center text-text-secondary/50">
                <span className="text-sm">项目截图</span>
              </div>
            </div>

            {/* 标题 */}
            <h3 className="mb-2 text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
              {project.title}
            </h3>

            {/* 描述 */}
            <p className="mb-4 line-clamp-2 text-sm text-text-secondary">
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
              <a
                href={project.demoUrl}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80"
                aria-label={`${project.title} 在线演示`}
              >
                <ExternalLink size={14} aria-hidden="true" />
                在线演示
              </a>
              <a
                href={project.sourceUrl}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                aria-label={`${project.title} 源代码`}
              >
                <Github size={14} aria-hidden="true" />
                源代码
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
