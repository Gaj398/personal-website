# AGENTS.md — AI 代理开发规范

> 本文件为 AI 编码代理（Copilot / Cursor / Qoder 等）提供项目级约束和开发准则。  
> 在修改本项目任何代码前，**必须**完整阅读本文件。  
> 关联文档：[PRD.md](./PRD.md) · [TECH_DESIGN.md](./TECH_DESIGN.md)

---

## 1. 项目概述

### 1.1 这是什么项目

一个**个人品牌展示网站**，深色星空主题，包含四大模块：

| 模块 | 说明 |
|------|------|
| **Hero + 个人介绍** | 首屏头像、姓名、简介、CTA 按钮 |
| **技能展示** | 分类卡片 + 熟练度进度条 |
| **项目展示** | 卡片网格 + 分类筛选 + 详情弹窗 |
| **技术博客** | Markdown 文章列表 + 详情页 + 目录导航 |

视觉特征：Canvas 星空粒子背景（闪烁 + 鼠标视差）、毛玻璃吸顶导航、滚动入场动画。

### 1.2 技术栈（硬性约束）

```
React 18 + TypeScript 5 + Vite 5 + Tailwind CSS 3.4
```

**禁止引入的技术：**
- ❌ Astro / Next.js / Nuxt（框架层已确定，不可替换）
- ❌ styled-components / emotion（样式统一使用 Tailwind）
- ❌ jQuery 或任何直接操作 DOM 的库
- ❌ class 组件（全部使用函数组件 + Hooks）

**允许的依赖新增：**
- ✅ `framer-motion`（动画）
- ✅ `lucide-react`（图标）
- ✅ `react-markdown` + `remark-gfm`（博客 Markdown 渲染）
- ✅ `react-syntax-highlighter`（代码高亮）
- ✅ `gray-matter`（Frontmatter 解析）
- ✅ `react-router-dom` v6（路由）
- 新增依赖前须确认不与上述约束冲突

### 1.3 如何运行

```bash
# 安装依赖（必须使用 pnpm）
pnpm install

# 启动开发服务器（端口 3000）
pnpm dev

# 生产构建
pnpm build

# 预览构建产物
pnpm preview

# 代码检查
pnpm lint

# 类型检查
pnpm type-check
```

### 1.4 部署

- **主平台**：Vercel（Git 推送自动部署）
- **备选**：Cloudflare Pages
- **构建命令**：`pnpm build`
- **输出目录**：`dist`
- **SPA 回退**：所有路由重写至 `/index.html`

---

## 2. 目录结构规范

```
src/
├── main.tsx                    # 应用唯一入口，不要在此写业务逻辑
├── App.tsx                     # 根组件，仅负责路由配置和布局包裹
│
├── pages/                      # 页面组件（每个路由对应一个文件）
│   ├── HomePage.tsx
│   ├── BlogPage.tsx
│   ├── BlogPostPage.tsx
│   └── NotFoundPage.tsx
│
├── components/                 # 组件（按功能域分目录）
│   ├── layout/                 #   布局：Navbar / Footer / MobileMenu
│   ├── ui/                     #   基础 UI：Button / Card / Tag / SectionTitle
│   ├── home/                   #   首页专用：Hero / About
│   ├── skills/                 #   技能模块：SkillCard / ProgressBar
│   ├── projects/               #   项目模块：ProjectCard / ProjectFilter / ProjectModal
│   ├── blog/                   #   博客模块：BlogCard / BlogList / BlogToc / MarkdownRenderer
│   └── common/                 #   跨模块通用：ContactLinks / SocialIcons
│
├── canvas/                     # Canvas 特效（独立模块，与 React 解耦）
│   ├── StarryBackground.tsx    #   React 组件壳
│   ├── StarField.ts            #   粒子系统核心类
│   ├── Particle.ts             #   单个粒子类
│   └── useMouseParallax.ts     #   鼠标视差 Hook
│
├── hooks/                      # 自定义 Hooks（全局可复用）
├── data/                       # 静态数据（TypeScript 模块导出）
├── content/posts/              # 博客 Markdown 文章
├── types/                      # TypeScript 类型定义（.d.ts）
├── utils/                      # 纯函数工具（无副作用）
├── styles/                     # 全局 CSS（globals.css / tokens.css / markdown.css）
└── assets/                     # 需构建处理的资源（字体 / SVG 源文件）

public/                         # 静态资源（直接复制，不经过构建）
├── images/                     #   图片
├── favicon.svg
└── robots.txt
```

### 文件放置规则

| 场景 | 放哪里 | 示例 |
|------|--------|------|
| 新增页面 | `src/pages/` | `ProjectsPage.tsx` |
| 只在一个模块内用的组件 | 该模块目录下 | `components/projects/ProjectModal.tsx` |
| 跨模块复用的 UI 组件 | `src/components/ui/` | `Button.tsx` / `Card.tsx` |
| 布局级组件 | `src/components/layout/` | `Navbar.tsx` / `Footer.tsx` |
| Canvas / 动画逻辑 | `src/canvas/` | `StarField.ts` / `Particle.ts` |
| 自定义 Hook | `src/hooks/` | `useResponsive.ts` |
| 类型定义 | `src/types/` | `project.d.ts` |
| 静态数据 | `src/data/` | `skills.ts` / `projects.ts` |
| 博客文章 | `src/content/posts/` | `my-post.md` |
| 工具函数 | `src/utils/` | `markdown.ts` / `date.ts` |

**禁止：**
- ❌ 在 `pages/` 中写超过 200 行的组件逻辑 → 拆到 `components/`
- ❌ 在 `components/ui/` 中放业务组件 → 只放通用 UI 原子
- ❌ 在组件文件中定义数据类型 → 类型统一放 `src/types/`
- ❌ 在 `src/` 根目录放零散文件 → 归入对应子目录

---

## 3. 命名规范

### 3.1 文件命名

| 类型 | 规则 | 示例 |
|------|------|------|
| React 组件 | **PascalCase.tsx** | `ProjectCard.tsx` |
| Hook 文件 | **camelCase.ts**，`use` 前缀 | `useResponsive.ts` |
| 工具函数 | **camelCase.ts** | `markdown.ts` |
| 类型定义 | **camelCase.d.ts** | `project.d.ts` |
| 数据文件 | **camelCase.ts** | `skills.ts` |
| CSS 文件 | **kebab-case.css** | `globals.css` |
| Canvas 类 | **PascalCase.ts** | `StarField.ts` |
| 常量文件 | **camelCase.ts** | `social.ts` |

### 3.2 代码命名

| 类型 | 规则 | 示例 |
|------|------|------|
| 组件函数 | PascalCase | `function SkillCard() {}` |
| Hook 函数 | camelCase + `use` 前缀 | `function useIntersectionObserver() {}` |
| 接口 / 类型 | PascalCase | `interface BlogPost {}` |
| 常量 | UPPER_SNAKE_CASE | `const PROJECT_CATEGORY_LABELS` |
| 变量 / 函数 | camelCase | `const readingTime = ...` |
| 枚举值 / 联合类型字面量 | kebab-case 或 camelCase | `'devops'` / `'openSource'` |
| CSS 类名 | Tailwind 工具类优先 | 避免自定义 class |
| 自定义 CSS 类 | kebab-case + 模块前缀 | `.skill-card`, `.project-grid` |

### 3.3 Git 提交信息

遵循 **Conventional Commits** 格式：

```
<type>(<scope>): <description>

feat(skills): 新增技能分类筛选功能
fix(navbar): 修复移动端汉堡菜单无法关闭的问题
docs(readme): 更新部署说明
style(hero): 调整标题字号和间距
refactor(canvas): 重构粒子系统为 class 架构
perf(blog): 优化 Markdown 编译缓存
chore(deps): 升级 Vite 到 v5.3.0
```

---

## 4. 设计规范（Design Tokens）

### 4.1 颜色（必须使用 Token，禁止硬编码）

| Token | 色值 | 用途 |
|-------|------|------|
| `--color-bg-primary` / `bg-bg-primary` | `#080F1A` | 页面主背景 |
| `--color-bg-secondary` / `bg-bg-secondary` | `#0D1321` | 页脚、次级区域 |
| `--color-bg-card` / `bg-bg-card` | `#111827` | 卡片背景 |
| `--color-text-primary` / `text-text-primary` | `#E6EAF2` | 主文字 |
| `--color-text-secondary` / `text-text-secondary` | `#94A3B8` | 辅助文字 |
| `--color-accent` / `text-accent` | `#38BDF8` | 强调色（天蓝） |
| `--color-accent-purple` / `text-accent-purple` | `#818CF8` | 次强调色（靛紫） |
| `--color-success` / `text-success` | `#34D399` | 成功状态 |
| `--color-border` / `border-border` | `rgba(230,234,242,0.08)` | 边框 |

**规则：**
- ✅ 使用 Tailwind 自定义颜色类：`bg-bg-primary`, `text-text-primary`
- ✅ 在 Canvas/JS 中使用 CSS 变量：`getComputedStyle(document.documentElement).getPropertyValue('--color-bg-primary')`
- ❌ 禁止在组件中直接写 `#080F1A` 等硬编码色值

### 4.2 响应式断点

| 断点 | 宽度 | 布局 | Tailwind 前缀 |
|------|------|------|---------------|
| Mobile | < 640px | **1 列** | 默认（无前缀） |
| Tablet | 640px – 1024px | **2 列** | `sm:` |
| Desktop | > 1024px | **3 列** | `lg:` |

**内容区最大宽度**：`max-w-[1200px] mx-auto`（已注册为 `max-w-content`）

**规则：**
- ✅ 移动优先（Mobile First）：默认样式写移动端，用 `sm:` / `lg:` 向上覆盖
- ❌ 禁止使用 `max-width` 媒体查询做向下适配
- ❌ 禁止新增自定义断点（只用 Tailwind 默认的 sm/md/lg/xl）

### 4.3 圆角

| 用途 | 值 | Tailwind 类 |
|------|-----|-------------|
| 按钮 / 标签 / 输入框 | 12px | `rounded-button` |
| 卡片 | 16px | `rounded-card` |
| 弹窗 | 20px | `rounded-modal` |
| 头像 | 50% | `rounded-full` |

### 4.4 间距

| 场景 | 值 |
|------|-----|
| 区块之间 | `py-24 lg:py-32`（64px / 96px） |
| 卡片之间 | `gap-6`（24px） |
| 卡片内边距 | `p-6`（24px） |
| 内容水平边距 | `px-4 sm:px-6`（16px / 24px） |

---

## 5. 组件开发规范

### 5.1 组件结构模板

```tsx
// src/components/[domain]/ExampleCard.tsx

import { type ExampleData } from '@/types/example';

interface ExampleCardProps {
  data: ExampleData;
  onSelect: (id: string) => void;
  animationDelay?: number;
}

export function ExampleCard({ data, onSelect, animationDelay = 0 }: ExampleCardProps) {
  return (
    <article className="card group">
      {/* 内容 */}
    </article>
  );
}
```

**规则：**
- ✅ 使用**具名导出**（`export function`），不使用 `export default`（页面组件除外）
- ✅ Props 接口命名：`组件名 + Props`（如 `ProjectCardProps`）
- ✅ 每个组件文件**只导出一个组件**
- ✅ 复杂组件拆分为子组件（超过 150 行考虑拆分）
- ❌ 禁止在组件内使用 `any` 类型
- ❌ 禁止使用 `innerHTML` 或 `dangerouslySetInnerHTML`（博客渲染除外，且内容必须经过 Markdown 编译）

### 5.2 Hooks 规范

```tsx
// src/hooks/useExample.ts

import { useState, useEffect } from 'react';

export function useExample(param: string): ExampleResult {
  // Hook 逻辑
}
```

**规则：**
- ✅ Hook 必须以 `use` 开头
- ✅ 返回值使用对象或元组，类型明确
- ✅ 副作用必须在 `useEffect` 中，且提供清理函数
- ❌ 禁止在 Hook 中直接操作 DOM（用 `ref`）
- ❌ 禁止在循环 / 条件语句中调用 Hook

### 5.3 数据与内容分离

```tsx
// ✅ 正确：数据从外部导入
import { skills } from '@/data/skills';
export function SkillGrid() {
  return skills.map(category => <SkillCategory key={category.id} data={category} />);
}

// ❌ 错误：数据硬编码在组件内
export function SkillGrid() {
  const skills = [{ name: 'React', level: 90 }, ...]; // 禁止！
  return ...;
}
```

**规则：**
- ✅ 个人信息、技能、项目、社交链接 → 统一在 `src/data/` 中管理
- ✅ 博客文章 → Markdown 文件存放在 `src/content/posts/`
- ❌ 禁止在组件中硬编码内容数据

---

## 6. 关键技术约束

### 6.1 星空 Canvas 背景

这是本项目最核心的视觉效果，实现时**必须**遵守以下约束：

#### 性能约束

| 指标 | 桌面端 | 移动端（<640px） |
|------|--------|-----------------|
| 粒子数量 | 150–200 颗 | **60–80 颗** |
| 视差效果 | ✅ 开启 | ❌ **关闭** |
| 设备像素比 | `Math.min(dpr, 2)` | `Math.min(dpr, 1.5)` |
| 帧率目标 | 60fps | 30fps 可接受 |

#### 必须实现

- ✅ 使用 `requestAnimationFrame` 驱动渲染循环
- ✅ 页面不可见时（`document.visibilitychange`）**暂停渲染**
- ✅ 支持 `prefers-reduced-motion: reduce`，减弱或关闭粒子动画
- ✅ Canvas 设置 `aria-hidden="true"`（装饰性元素，对屏幕阅读器隐藏）
- ✅ 鼠标事件使用 `passive: true` + `requestAnimationFrame` 节流
- ✅ 移动端检测触摸设备（`'ontouchstart' in window`），关闭鼠标视差

#### 禁止

- ❌ 不要在 Canvas 上使用 `setInterval` / `setTimeout` 做动画
- ❌ 不要每帧创建 / 销毁粒子对象（使用对象池或初始化一次）
- ❌ 不要在内容区域上方增加粒子密度（会影响文字可读性）
- ❌ 不要使用 WebGL / Three.js（2D Canvas 足够，避免过度依赖）

#### 参考实现架构

```
StarryBackground.tsx   →  React 组件壳（useRef + useEffect 管理生命周期）
    ↓
StarField.ts           →  粒子管理器（init / update / draw / resize）
    ↓
Particle.ts            →  单个粒子（position / size / alpha / layer / twinkle）
    ↓
useMouseParallax.ts    →  鼠标位置追踪（RAF 节流，移动端跳过）
useReducedMotion.ts    →  动画偏好检测（matchMedia）
```

### 6.2 吸顶毛玻璃导航

```css
/* 核心样式（必须实现） */
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
background: rgba(8, 15, 26, 0.75);
```

**规则：**
- ✅ 滚动超过 50px 时显示背景，回到顶部时变为全透明
- ✅ 使用 `IntersectionObserver` 检测当前区块，高亮对应导航项
- ✅ 移动端（<640px）折叠为汉堡菜单
- ✅ 汉堡菜单打开时 `Escape` 键可关闭
- ✅ 汉堡菜单展开时使用 `useFocusTrap` 锁定焦点
- ❌ 禁止导航栏遮挡内容（注意 `padding-top` 补偿）

### 6.3 博客 Markdown 渲染

**规则：**
- ✅ 使用 `react-markdown` + `remark-gfm` 渲染
- ✅ 代码块使用 `react-syntax-highlighter` 高亮，主题匹配深色背景
- ✅ 文章 Frontmatter 使用 `gray-matter` 解析
- ✅ 自动生成 TOC（从 H2/H3 标题提取）
- ✅ 计算阅读时间（中文 300 字/分钟）
- ❌ 禁止使用 `dangerouslySetInnerHTML` 渲染用户输入（只渲染构建时编译的 Markdown）

### 6.4 响应式网格布局

```tsx
{/* 通用响应式网格 —— 所有卡片列表统一使用此模式 */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-content mx-auto">
  {items.map(item => <Card key={item.id} data={item} />)}
</div>
```

**规则：**
- ✅ 使用 CSS Grid + Tailwind 响应式类
- ✅ 卡片最小宽度 `minmax(300px, 1fr)` 防止过窄
- ❌ 禁止使用 `float` 或绝对定位做布局
- ❌ 禁止使用 JS 监听 `resize` 事件做布局切换（用 CSS 媒体查询）

---

## 7. 无障碍（A11y）强制要求

> 本项目的无障碍目标：**WCAG 2.1 Level AA**。以下规则为强制执行，不可跳过。

### 7.1 对比度

| 元素 | 前景 | 背景 | 最低对比度 |
|------|------|------|-----------|
| 正文文字 | `#E6EAF2` | `#080F1A` | 4.5:1（实际 15.4:1 ✅） |
| 辅助文字 | `#94A3B8` | `#080F1A` | 4.5:1（实际 5.8:1 ✅） |
| 强调色 | `#38BDF8` | `#080F1A` | 3:1（UI 组件，实际 7.2:1 ✅） |

**规则：**
- ✅ 新增颜色组合前，必须用 [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) 验证
- ❌ 禁止使用低于 AA 标准的颜色组合

### 7.2 键盘导航

**每个交互元素必须可通过键盘操作：**

```tsx
// ✅ 正确：使用语义化按钮
<button onClick={handleClick} aria-label="查看详情">
  <EyeIcon />
</button>

// ❌ 错误：div 模拟按钮（无法聚焦、无法键盘触发）
<div onClick={handleClick}>
  <EyeIcon />
</div>
```

**规则：**
- ✅ 所有可交互元素使用 `<button>` / `<a>` / `<input>` 等语义标签
- ✅ 自定义交互组件必须设置 `tabIndex={0}` + `onKeyDown` 处理
- ✅ Modal / 菜单打开时使用 `useFocusTrap` 锁定焦点
- ✅ `Escape` 键关闭弹出层
- ✅ 焦点样式使用 `:focus-visible`，轮廓宽度 2px，颜色 `#38BDF8`
- ❌ 禁止使用 `tabIndex={-1}` 隐藏可交互元素的焦点
- ❌ 禁止移除 `outline` 样式（除非替换为等效可见焦点指示器）

### 7.3 图片与图标

```tsx
// ✅ 有信息量的图片 —— 必须提供描述性 alt
<img src={project.cover} alt={`${project.title} 项目截图`} />

// ✅ 装饰性图片 —— 空 alt，屏幕阅读器跳过
<img src="/images/divider.svg" alt="" role="presentation" />

// ✅ 图标按钮 —— 使用 aria-label 说明功能
<button aria-label="在 GitHub 上查看源代码">
  <GithubIcon aria-hidden="true" />
</button>

// ❌ 禁止：无 alt 属性的 img 标签（TypeScript 会报错，不要绕过）
<img src="photo.jpg" />
```

### 7.4 语义化 HTML

```tsx
// ✅ 正确的页面结构
<body>
  <a href="#main-content" className="sr-only focus:not-sr-only ...">跳到主内容</a>
  <nav aria-label="主导航">...</nav>
  <main id="main-content">
    <section aria-labelledby="skills-heading">
      <h2 id="skills-heading">技能展示</h2>
      ...
    </section>
  </main>
  <footer aria-label="页脚">...</footer>
</body>
```

**规则：**
- ✅ 每页有且仅有一个 `<h1>`
- ✅ 标题层级不跳级（h1 → h2 → h3）
- ✅ 每个 `<section>` 有 `aria-labelledby` 指向其标题
- ✅ 导航区域使用 `<nav>`
- ✅ 列表使用 `<ul>` / `<ol>`
- ❌ 禁止使用 `<div>` 替代语义标签

### 7.5 动画偏好

```typescript
// 必须使用的 Hook
const reducedMotion = useReducedMotion();

// 在 Canvas / 动画组件中检查
if (reducedMotion) {
  // 关闭闪烁、视差、入场动画
  // 只保留静态粒子分布
}
```

```css
/* globals.css 中必须保留的媒体查询 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 7.6 ARIA 速查表

| 场景 | 必需属性 |
|------|----------|
| 进度条（技能熟练度） | `role="progressbar"` `aria-valuenow` `aria-valuemin` `aria-valuemax` `aria-label` |
| 标签筛选栏 | `role="tablist"` `role="tab"` `aria-selected` `aria-controls` |
| Modal 弹窗 | `role="dialog"` `aria-modal="true"` `aria-labelledby` |
| 汉堡菜单按钮 | `aria-expanded` `aria-controls` `aria-label="打开菜单"` |
| 新窗口链接 | 附加 `<span className="sr-only">（在新窗口打开）</span>` |
| 装饰性 Canvas | `aria-hidden="true"` |
| 图标按钮 | `aria-label="功能描述"` |
| 加载状态 | `aria-live="polite"` + 文字提示 |

---

## 8. 性能约束

### 8.1 硬性指标

| 指标 | 目标值 | 验证方式 |
|------|--------|----------|
| Lighthouse Performance | ≥ 90（桌面 ≥ 95） | `pnpm build && pnpm preview` → Lighthouse |
| LCP | < 2.5s | Chrome DevTools |
| CLS | < 0.1 | Chrome DevTools |
| 首屏 JS（gzip） | < 150KB | `vite-bundle-analyzer` |
| 首屏 CSS（gzip） | < 15KB | 构建产物检查 |

### 8.2 必须遵守的优化规则

| 规则 | 说明 |
|------|------|
| **图片懒加载** | 非首屏图片使用 `loading="lazy"` |
| **路由懒加载** | 使用 `React.lazy()` + `Suspense` 按路由拆分 |
| **Canvas 离屏暂停** | `document.hidden` 时停止 `requestAnimationFrame` |
| **事件节流** | 滚动 / 鼠标移动事件使用 `passive: true` + RAF 节流 |
| **组件 memo** | 纯展示组件使用 `React.memo`，避免无意义重渲染 |
| **字体优化** | 使用 `font-display: swap`，中文字体考虑子集化 |
| **代码分割** | 博客 Markdown 解析库按需加载（`react-markdown` 仅在博客页引入） |

### 8.3 禁止的性能反模式

- ❌ 在 `scroll` / `mousemove` 事件中直接 `setState`（必须 RAF 节流）
- ❌ 在渲染函数中创建新对象 / 数组（使用 `useMemo`）
- ❌ 在渲染函数中定义新函数（使用 `useCallback`）
- ❌ 使用 `index` 作为列表 `key`（除非列表不会变化）
- ❌ 在 Canvas 每帧中调用 `document.querySelector` 等 DOM 查询

---

## 9. 测试要求

### 9.1 测试范围

| 类型 | 覆盖目标 | 工具 | 优先级 |
|------|----------|------|--------|
| **单元测试** | 工具函数（`src/utils/`） | Vitest | P0 |
| **组件测试** | 基础 UI 组件（Button / Card） | Vitest + Testing Library | P1 |
| **集成测试** | 页面路由 + 数据渲染 | Vitest + Testing Library | P1 |
| **视觉回归** | 关键页面截图对比 | Playwright（后续引入） | P2 |
| **无障碍测试** | ARIA 属性 + 键盘导航 | axe-core | P0 |
| **性能测试** | Lighthouse CI | Lighthouse CI | P1 |

### 9.2 测试文件命名

```
src/utils/date.ts          →  src/utils/__tests__/date.test.ts
src/components/ui/Button.tsx  →  src/components/ui/__tests__/Button.test.tsx
src/pages/HomePage.tsx     →  src/pages/__tests__/HomePage.test.tsx
```

**规则：**
- 测试文件放在对应目录的 `__tests__/` 子目录下
- 文件名：`组件名.test.tsx` / `函数名.test.ts`
- 每个组件 / 工具函数至少有一个对应测试文件

### 9.3 测试编写规范

```tsx
// ✅ 正确的测试结构
import { render, screen } from '@testing-library/react';
import { SkillCard } from '../SkillCard';

describe('SkillCard', () => {
  it('renders skill name and level', () => {
    render(<SkillCard skill={{ name: 'React', level: 90, icon: 'react' }} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '90');
  });

  it('is keyboard accessible', () => {
    render(<SkillCard skill={{ name: 'React', level: 90, icon: 'react' }} />);
    const card = screen.getByRole('article');
    card.focus();
    expect(card).toHaveFocus();
  });
});
```

**规则：**
- ✅ 使用 `@testing-library/react` 的查询方法（`getByRole` / `getByText`）
- ✅ 测试用户行为，不测试实现细节
- ✅ 无障碍相关属性必须断言（`aria-label` / `role` / `aria-valuenow`）
- ❌ 禁止使用 `document.querySelector` 做测试断言
- ❌ 禁止测试组件内部 state 值

### 9.4 运行测试

```bash
# 运行所有测试
pnpm test

# 监听模式（开发时用）
pnpm test --watch

# 生成覆盖率报告
pnpm test --coverage

# 运行无障碍测试
pnpm test -- --grep "a11y"
```

---

## 10. 代码风格约定

### 10.1 TypeScript 严格模式

`tsconfig.json` 必须开启以下选项（不可关闭）：

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### 10.2 Import 顺序

按以下顺序组织 import，组之间空一行：

```tsx
// 1. React 核心
import { useState, useEffect, useCallback } from 'react';

// 2. 第三方库
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// 3. 项目内部模块（使用 @/ 别名）
import { ProjectCard } from '@/components/projects/ProjectCard';
import { useResponsive } from '@/hooks/useResponsive';
import { projects } from '@/data/projects';

// 4. 类型导入
import type { Project } from '@/types/project';

// 5. 样式（最后）
import './HomePage.css';
```

### 10.3 注释规范

```tsx
// ✅ 组件顶部：一句话说明组件用途
/** 项目卡片组件 —— 展示单个项目的封面、标题、标签和操作链接 */
export function ProjectCard({ project, onSelect }: ProjectCardProps) { ... }

// ✅ 复杂逻辑：解释"为什么"而非"做了什么"
// 移动端关闭视差效果，因为陀螺仪 API 兼容性差且消耗电量
if (isMobile) return;

// ✅ TODO 注释：必须附带 issue 编号或负责人
// TODO(#42): 添加骨架屏加载状态 —— @zhangsan

// ❌ 禁止无意义注释
// 设置状态  ← 代码本身已经说明了
setLoading(true);
```

### 10.4 路径别名

统一使用 `@/` 指向 `src/` 目录：

```tsx
// ✅ 正确
import { Button } from '@/components/ui/Button';

// ❌ 错误（相对路径层级过深）
import { Button } from '../../../components/ui/Button';
```

---

## 11. 常见陷阱与注意事项

### ⚠️ 1. Canvas 在 Retina 屏幕模糊

```tsx
// ✅ 必须乘以设备像素比
const dpr = Math.min(window.devicePixelRatio || 1, 2); // 限制最大 2，防止性能问题
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;
ctx.scale(dpr, dpr);
```

### ⚠️ 2. 毛玻璃效果在 Safari 需要前缀

```css
/* ✅ 两个都要写 */
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
```

### ⚠️ 3. 平滑滚动与固定导航冲突

```tsx
// ✅ 导航锚点跳转时补偿导航栏高度
const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 80; // 导航栏高度 + 间距
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
};
```

### ⚠️ 4. Framer Motion 与 Canvas 层级冲突

```tsx
// ✅ Canvas 使用固定定位 + 负 z-index，确保在所有动画层之下
<canvas className="fixed inset-0 -z-10 pointer-events-none" />
```

### ⚠️ 5. 博客文章新增后不显示

博客文章在**构建时**编译为 HTML 嵌入 Bundle。新增文章后必须**重新构建**：
```bash
pnpm build   # 重新构建才能看到新文章
```

### ⚠️ 6. 中文字体加载阻塞渲染

```css
/* ✅ 必须使用 font-display: swap */
@font-face {
  font-family: 'Noto Sans SC';
  src: url('/fonts/NotoSansSC.woff2') format('woff2');
  font-display: swap; /* 先用系统字体渲染，再替换 */
}
```

### ⚠️ 7. IntersectionObserver 在 SSR 中不可用

本项目为纯 SPA（CSR），不涉及 SSR，但要注意：
```tsx
// ✅ 在 useEffect 中初始化 Observer，不要在组件顶层
useEffect(() => {
  const observer = new IntersectionObserver(...);
  return () => observer.disconnect();
}, []);
```

### ⚠️ 8. 移动端 100vh 问题

```tsx
// ❌ 移动端浏览器地址栏会导致 100vh 溢出
<section className="h-screen">

// ✅ 使用 dvh 或 JS 计算
<section className="h-[100dvh]">
// 或使用 Tailwind 的 min-h-screen + overflow-hidden 组合
```

---

## 12. 新增功能检查清单

每次新增功能前，对照此清单确认：

- [ ] 文件放在正确的目录下（参考第 2 节）
- [ ] 命名符合规范（参考第 3 节）
- [ ] 颜色使用 Design Token，未硬编码（参考第 4 节）
- [ ] 响应式布局正确：mobile / tablet / desktop 三档测试（参考第 4.2 节）
- [ ] 所有交互支持键盘操作（参考第 7.2 节）
- [ ] 图片有 alt 属性，图标按钮有 aria-label（参考第 7.3 节）
- [ ] 新增颜色组合通过对比度验证（参考第 7.1 节）
- [ ] Canvas 动画支持 `prefers-reduced-motion`（参考第 6.1 节）
- [ ] 移动端性能已优化（粒子数减少、视差关闭）（参考第 6.1 节）
- [ ] 没有引入禁止的技术栈（参考第 1.2 节）
- [ ] 新依赖已记录在本文第 1.2 节
- [ ] 编写了对应的测试用例（参考第 9 节）
- [ ] Lighthouse 评分未下降（参考第 8.1 节）
- [ ] Git 提交信息符合 Conventional Commits 格式（参考第 3.3 节）

---

## 13. 快速参考卡片

```
┌─────────────────────────────────────────────────────────┐
│  技术栈: React 18 + TS 5 + Vite 5 + Tailwind 3.4       │
│  包管理: pnpm                                           │
│  部署:   Vercel (主) / Cloudflare Pages (备)             │
│  背景:   #080F1A  文字: #E6EAF2  强调: #38BDF8          │
│  断点:   mobile(<640) → tablet(640-1024) → desktop(>1024)│
│  列数:   1 → 2 → 3    最大宽度: 1200px                  │
│  圆角:   按钮 12px / 卡片 16px / 弹窗 20px              │
│  无障碍: WCAG 2.1 AA / 键盘可导航 / aria 标签            │
│  性能:   Lighthouse ≥ 90 / LCP < 2.5s / CLS < 0.1      │
│  测试:   Vitest + Testing Library + axe-core             │
└─────────────────────────────────────────────────────────┘
```
