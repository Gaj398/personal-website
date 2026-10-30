import { useState, useEffect, useMemo, type FormEvent } from 'react';
import { Send, Trash2, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  content: string;
  time: string;
}

const STORAGE_KEY = 'guestbook_messages';

/** 从 localStorage 读取留言 */
function loadMessages(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? (JSON.parse(raw) as Message[]) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/** 访客留言板 —— 动态交互功能：留言提交/展示/删除，数据本地持久化 */
export default function GuestBookPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [tip, setTip] = useState('');

  useEffect(() => {
    setMessages(loadMessages());
  }, []);

  const total = useMemo(() => messages.length, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      setTip('请填写昵称和留言内容');
      return;
    }
    const msg: Message = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim(),
      content: content.trim(),
      time: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    const next = [msg, ...messages];
    setMessages(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setName('');
    setContent('');
    setTip('留言成功，感谢你的留言！');
  };

  const handleDelete = (id: string) => {
    const next = messages.filter((m) => m.id !== id);
    setMessages(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <section
      id="guestbook"
      className="section-container"
      aria-labelledby="guestbook-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2 id="guestbook-heading" className="section-title mb-4">
          访客留言板
        </h2>
        <p className="mb-10 text-text-secondary">
          欢迎留下你的足迹～ 留言会保存在本地浏览器，实时更新（动态交互功能）。
        </p>

        {/* 留言表单 */}
        <form
          onSubmit={handleSubmit}
          className="mb-8 space-y-4 rounded-card border border-white/10 bg-bg-card p-6"
        >
          <div>
            <label
              htmlFor="guest-name"
              className="mb-2 block text-sm font-medium text-text-primary"
            >
              昵称
            </label>
            <input
              id="guest-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入你的昵称"
              maxLength={20}
              className="w-full rounded-button border border-white/10 bg-bg-primary px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="guest-content"
              className="mb-2 block text-sm font-medium text-text-primary"
            >
              留言内容
            </label>
            <textarea
              id="guest-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="想说点什么…"
              rows={4}
              maxLength={200}
              className="w-full resize-none rounded-button border border-white/10 bg-bg-primary px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none"
            />
            <p className="mt-1 text-right text-xs text-text-secondary">
              {content.length}/200
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button type="submit" className="btn-primary">
              <Send size={16} aria-hidden="true" />
              提交留言
            </button>
            {tip && (
              <span
                className={`text-sm ${
                  tip.includes('成功')
                    ? 'text-accent'
                    : 'text-text-secondary'
                }`}
              >
                {tip}
              </span>
            )}
          </div>
        </form>

        {/* 留言列表 */}
        <div className="flex items-center gap-2 pb-4">
          <MessageSquare size={18} className="text-accent" aria-hidden="true" />
          <h3 className="text-lg font-semibold text-text-primary">
            全部留言
          </h3>
          <span className="tag">{total} 条</span>
        </div>

        {messages.length === 0 ? (
          <p className="rounded-card border border-dashed border-white/10 bg-bg-card px-6 py-10 text-center text-text-secondary">
            还没有留言，来抢个沙发吧～
          </p>
        ) : (
          <ul className="space-y-4">
            {messages.map((msg) => (
              <li
                key={msg.id}
                className="rounded-card border border-white/10 bg-bg-card p-5"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                      {msg.name.slice(0, 1)}
                    </span>
                    <span className="font-semibold text-text-primary">
                      {msg.name}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {msg.time}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(msg.id)}
                    className="inline-flex items-center gap-1 rounded-button px-2 py-1 text-xs text-text-secondary transition-colors hover:text-accent"
                    aria-label={`删除 ${msg.name} 的留言`}
                  >
                    <Trash2 size={14} aria-hidden="true" />
                    删除
                  </button>
                </div>
                <p className="whitespace-pre-wrap leading-relaxed text-text-secondary">
                  {msg.content}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
