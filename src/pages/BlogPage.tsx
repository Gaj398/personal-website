import { Link } from 'react-router-dom';
import { POSTS } from '@/data/blog';

/** 博客列表页 */
export default function BlogPage() {
  return (
    <div
      className="section-container"
      style={{ paddingTop: 'calc(var(--navbar-height) + 48px)' }}
    >
      <h1 className="section-title mb-4">技术博客</h1>
      <p className="mb-12 text-text-secondary">
        记录我学习与开发过程中的实践与踩坑。
      </p>

      <div className="mx-auto max-w-3xl space-y-6">
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block rounded-card border border-white/10 bg-bg-card p-6 transition-colors hover:border-accent/40"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <span className="shrink-0 text-xs text-text-secondary">
                {post.date}
              </span>
            </div>
            <p className="line-clamp-2 text-sm text-text-secondary">
              {post.summary}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
