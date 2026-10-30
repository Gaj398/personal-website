import { useState, type FormEvent } from 'react';
import { Lock, Save, RotateCcw, LogOut } from 'lucide-react';
import { loadProfile, saveProfile, resetProfile } from '@/data/profile';

/** 管理后台密码（可自行修改） */
const ADMIN_PASSWORD = 'admin';
const AUTH_KEY = 'admin_auth';

/** 管理后台 —— 登录后可修改首页个人简介 */
export default function AdminPage() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === '1',
  );
  const [pwd, setPwd] = useState('');
  const [msg, setMsg] = useState('');

  const [name, setName] = useState(() => loadProfile().name);
  const [subtitle, setSubtitle] = useState(() => loadProfile().subtitle);
  const [aboutText, setAboutText] = useState(() =>
    loadProfile().aboutIntro.join('\n'),
  );
  const [skillsText, setSkillsText] = useState(() =>
    loadProfile().skills.join(','),
  );

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, '1');
      setAuthed(true);
      setMsg('');
    } else {
      setMsg('密码错误，请重试');
    }
  };

  const handleSave = () => {
    saveProfile({
      name: name.trim() || '未命名',
      subtitle: subtitle.trim(),
      aboutIntro: aboutText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      skills: skillsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    });
    setMsg('✅ 已保存！刷新首页即可看到更新。');
  };

  const handleReset = () => {
    resetProfile();
    const def = loadProfile();
    setName(def.name);
    setSubtitle(def.subtitle);
    setAboutText(def.aboutIntro.join('\n'));
    setSkillsText(def.skills.join(','));
    setMsg('已恢复默认内容并清空本地修改。');
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  const inputClass =
    'w-full rounded-button border border-white/10 bg-bg-primary px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none';

  if (!authed) {
    return (
      <section
        className="section-container"
        style={{ paddingTop: 'calc(var(--navbar-height) + 48px)' }}
      >
        <div className="mx-auto max-w-sm">
          <h1 className="section-title mb-8 text-center">管理后台</h1>
          <form
            onSubmit={handleLogin}
            className="space-y-4 rounded-card border border-white/10 bg-bg-card p-6"
          >
            <label className="block text-sm font-medium text-text-primary">
              登录密码
            </label>
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="请输入管理密码"
              className={inputClass}
            />
            {msg && <p className="text-sm text-accent">{msg}</p>}
            <button type="submit" className="btn-primary w-full">
              <Lock size={16} aria-hidden="true" />
              登录
            </button>
            <p className="text-xs text-text-secondary">
              提示：默认密码为 admin，如需修改请改代码中的 ADMIN_PASSWORD。
            </p>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section
      className="section-container"
      style={{ paddingTop: 'calc(var(--navbar-height) + 48px)' }}
    >
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="section-title">管理后台 · 编辑个人简介</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-button px-3 py-1.5 text-sm text-text-secondary transition-colors hover:text-accent"
          >
            <LogOut size={14} aria-hidden="true" />
            退出
          </button>
        </div>

        <p className="mb-6 rounded-card border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-text-secondary">
          修改下方信息并保存后，刷新首页即可看到更新。数据保存在本机浏览器中。
        </p>

        <div className="space-y-5 rounded-card border border-white/10 bg-bg-card p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              姓名
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              副标题（学校 · 学院 · 专业）
            </label>
            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              关于我（每行一段）
            </label>
            <textarea
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              rows={5}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              技能标签（用英文逗号分隔）
            </label>
            <input
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="React, TypeScript, Vite"
              className={inputClass}
            />
          </div>

          {msg && <p className="text-sm text-accent">{msg}</p>}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleSave}
              className="btn-primary"
            >
              <Save size={16} aria-hidden="true" />
              保存并生效
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary"
            >
              <RotateCcw size={16} aria-hidden="true" />
              恢复默认
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
