import { loadProfile } from '@/data/profile';

/** 个人介绍区块（动态读取后台配置） */
export function About() {
  const profile = loadProfile();

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
        {profile.aboutIntro.map((paragraph, i) => (
          <p key={i} className="leading-relaxed text-text-secondary">
            {paragraph}
          </p>
        ))}

        {/* 关键标签 */}
        <div className="flex flex-wrap gap-3 pt-4">
          {profile.skills.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
