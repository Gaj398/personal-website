import { useParams, Link } from 'react-router-dom';
import { POSTS } from '@/data/blog';

/** 博客文章详情页 */
export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div
        className="section-container"
        style={{ paddingTop: 'calc(var(--navbar-height) + 48px)' }}
      >
        <h1 className="section-title mb-8">文章不存在</h1>
        <p className="mb-6 text-text-secondary">
          没有找到这篇文章，可能已被移除。
        </p>
        <Link
          to="/blog"
          className="text-accent underline-offset-4 hover:underline"
        >
          &larr; 返回博客列表
        </Link>
      </div>
    );
  }

  return (
    <article
      className="section-container"
      style={{ paddingTop: 'calc(var(--navbar-height) + 48px)' }}
    >
      <Link
        to="/blog"
        className="mb-6 inline-block text-accent underline-offset-4 hover:underline"
      >
        &larr; 返回博客列表
      </Link>

      <h1 className="section-title mb-3">{post.title}</h1>
      <p className="mb-8 text-sm text-text-secondary">
        发布于 {post.date}
      </p>

      <div className="mx-auto max-w-3xl space-y-4">
        {post.content.map((paragraph, i) => (
          <p
            key={i}
            className="leading-relaxed text-text-secondary"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
