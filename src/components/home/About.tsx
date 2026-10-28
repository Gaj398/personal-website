/** 个人介绍区块 */
export function About() {
  const highlights = ['5年前端开发', 'React', 'TypeScript', '全栈', '开源贡献者'];

  return (
    <section
      id="about"
      className="section-container"
      aria-labelledby="about-heading"
    >
      <h2 id="about-heading" className="section-title mb-10">
        关于我
      </h2>

      <div className="mx-auto max-w-3xl space-y-6">
        {/* 简介段落 */}
        <p className="leading-relaxed text-text-secondary">
          拥有 5 年前端开发经验，专注于 React 生态和现代 Web 技术。
          热衷于构建高性能、无障碍友好的用户界面，相信好的代码应该像好的设计一样优雅。
        </p>
        <p className="leading-relaxed text-text-secondary">
          工作之余喜欢写技术博客、参与开源项目，分享所学所得。
          擅长将复杂的技术概念转化为清晰易懂的实现方案。
        </p>

        {/* 关键标签 */}
        <div className="flex flex-wrap gap-3 pt-4">
          {highlights.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
