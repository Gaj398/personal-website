import { useParams, Link } from 'react-router-dom';

/** 博客文章详情页 */
export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <article
      className="section-container"
      style={{ paddingTop: 'calc(var(--navbar-height) + 48px)' }}
    >
      <h1 className="section-title mb-8">文章详情</h1>
      <p className="mb-6 text-text-secondary">
        文章 <code className="rounded bg-bg-card px-2 py-0.5 text-accent">{slug}</code> 的详情功能即将上线...
      </p>
      <Link to="/blog" className="text-accent underline-offset-4 hover:underline">
        &larr; 返回博客列表
      </Link>
    </article>
  );
}
