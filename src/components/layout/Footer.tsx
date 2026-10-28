import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

/** 社交链接配置 */
const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/', label: 'Twitter / X' },
  { icon: Mail, href: 'mailto:hello@example.com', label: '发送邮件' },
];

/** 页脚 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-secondary" aria-label="页脚">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-6">
          {/* 社交图标 */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full p-2.5 text-text-secondary transition-colors hover:bg-accent/10 hover:text-accent"
                aria-label={label}
              >
                <Icon size={20} aria-hidden="true" />
                <span className="sr-only">（在新窗口打开）</span>
              </a>
            ))}
          </div>

          {/* 版权信息 */}
          <p className="text-sm text-text-secondary">
            &copy; {currentYear} Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
