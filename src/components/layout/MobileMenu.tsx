import { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavItem {
  label: string;
  href: string;
  section: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

/** 移动端全屏菜单 */
export function MobileMenu({ isOpen, onClose, navItems, onNavClick }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // 焦点陷阱：Tab 键在菜单内循环
  useEffect(() => {
    if (!isOpen) return;

    // 打开时聚焦关闭按钮
    closeButtonRef.current?.focus();

    // 锁定 body 滚动
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      onNavClick(e, href);
      onClose();
    },
    [onNavClick, onClose],
  );

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="glass fixed inset-0 z-50 flex flex-col items-center justify-center sm:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="导航菜单"
    >
      {/* 关闭按钮 */}
      <button
        ref={closeButtonRef}
        type="button"
        className="absolute top-4 right-4 rounded-button p-2 text-text-secondary transition-colors hover:text-text-primary"
        onClick={onClose}
        aria-label="关闭菜单"
      >
        <X size={24} />
      </button>

      {/* 导航列表 */}
      <nav aria-label="移动端导航">
        <ul className="flex flex-col items-center gap-6">
          {navItems.map((item) => {
            const isAnchor = item.href.startsWith('/#');
            const linkClass =
              'text-2xl font-semibold text-text-primary transition-colors hover:text-accent';
            return (
              <li key={item.section}>
                {isAnchor ? (
                  <a
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={linkClass}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link to={item.href} onClick={onClose} className={linkClass}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
