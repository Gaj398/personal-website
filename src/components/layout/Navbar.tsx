import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

/** 导航项配置 */
const NAV_ITEMS = [
  { label: '首页', href: '/', section: 'hero' },
  { label: '关于', href: '/#about', section: 'about' },
  { label: '技能', href: '/#skills', section: 'skills' },
  { label: '项目', href: '/#projects', section: 'projects' },
  { label: '博客', href: '/blog', section: 'blog' },
  { label: '留言板', href: '/guestbook', section: 'guestbook' },
  { label: '联系', href: '/#contact', section: 'contact' },
  { label: '管理', href: '/admin', section: 'admin' },
];

/** 吸顶毛玻璃导航栏 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // 监听滚动，切换导航栏背景
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll(); // 初始化
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 路由变化时关闭移动菜单
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // 平滑滚动到锚点
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith('/#')) {
        e.preventDefault();
        const sectionId = href.replace('/#', '');
        const el = document.getElementById(sectionId);
        if (el) {
          const offset = 80; // 导航栏高度 + 间距
          const y = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    },
    [],
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass shadow-navbar' : 'bg-transparent'
      }`}
      style={{ height: 'var(--navbar-height)' }}
      role="banner"
    >
      <nav
        className="mx-auto flex h-full max-w-content items-center justify-between px-4 sm:px-6"
        aria-label="主导航"
      >
        {/* Logo / 站名 */}
        <Link
          to="/"
          className="text-lg font-bold tracking-wide text-text-primary transition-colors hover:text-accent"
        >
          Portfolio
        </Link>

        {/* 桌面端导航项 */}
        <ul className="hidden items-center gap-1 sm:flex">
          {NAV_ITEMS.map((item) => {
            const isAnchor = item.href.startsWith('/#');
            const isActive =
              item.href === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.href.replace('/#', '/'));
            const baseClass = `rounded-button px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'text-accent'
                : 'text-text-secondary hover:text-text-primary'
            }`;

            return (
              <li key={item.section}>
                {isAnchor ? (
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={baseClass}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className={baseClass}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* 移动端汉堡菜单按钮 */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-button p-2 text-text-secondary transition-colors hover:text-text-primary sm:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="打开菜单"
          aria-expanded={isMobileMenuOpen}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* 移动端菜单 */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={NAV_ITEMS}
        onNavClick={handleNavClick}
      />
    </header>
  );
}
