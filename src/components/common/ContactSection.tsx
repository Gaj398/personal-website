import { useState, useCallback } from 'react';
import { Mail, Copy, Check } from 'lucide-react';

/** 联系方式区块 */
export function ContactSection() {
  const email = 'hello@example.com';
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <section
      id="contact"
      className="section-container"
      aria-labelledby="contact-heading"
    >
      <h2 id="contact-heading" className="section-title mb-10">
        联系我
      </h2>

      <div className="mx-auto max-w-xl text-center">
        <p className="mb-8 text-text-secondary">
          如果你对我的项目感兴趣，或者想一起合作，欢迎随时联系我！
        </p>

        {/* 邮箱（点击复制） */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <Mail size={20} className="text-accent" aria-hidden="true" />
          <span className="text-lg text-text-primary">{email}</span>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-1 rounded-button px-3 py-1.5 text-sm text-text-secondary transition-colors hover:bg-accent/10 hover:text-accent"
            aria-label={`复制邮箱地址 ${email}`}
          >
            {copied ? (
              <>
                <Check size={14} aria-hidden="true" />
                已复制
              </>
            ) : (
              <>
                <Copy size={14} aria-hidden="true" />
                复制
              </>
            )}
          </button>
        </div>

        {/* 社交链接 */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm"
            aria-label="访问我的 GitHub 主页"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm"
            aria-label="访问我的 LinkedIn 主页"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${email}`}
            className="btn-primary text-sm"
            aria-label="发送邮件"
          >
            发送邮件
          </a>
        </div>
      </div>
    </section>
  );
}
