/** 技能展示区块（占位，后续实现完整功能） */
export function SkillsSection() {
  const categories = [
    {
      title: '前端开发',
      items: ['React', 'TypeScript', 'Vue.js', 'HTML/CSS', 'Tailwind CSS'],
    },
    {
      title: '后端开发',
      items: ['Node.js', 'Python', 'PostgreSQL', 'RESTful API'],
    },
    {
      title: '工具 / DevOps',
      items: ['Git', 'Docker', 'CI/CD', 'Vercel'],
    },
  ];

  return (
    <section
      id="skills"
      className="section-container"
      aria-labelledby="skills-heading"
    >
      <h2 id="skills-heading" className="section-title mb-10">
        技能展示
      </h2>

      <div className="responsive-grid">
        {categories.map((category) => (
          <div key={category.title} className="card">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
