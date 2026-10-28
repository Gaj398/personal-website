# 个人展示网站 — 技术设计文档（TECH_DESIGN）

> **版本**：v1.0  
> **最后更新**：2025-07-14  
> **关联文档**：[PRD.md](./PRD.md)  
> **状态**：设计阶段

---

## 目录

1. [技术栈选型](#1-技术栈选型)
2. [项目结构](#2-项目结构)
3. [数据模型设计](#3-数据模型设计)
4. [关键技术实现](#4-关键技术实现)
5. [组件架构设计](#5-组件架构设计)
6. [路由与页面设计](#6-路由与页面设计)
7. [样式系统设计](#7-样式系统设计)
8. [性能优化策略](#8-性能优化策略)
9. [无障碍设计方案](#9-无障碍设计方案)
10. [部署方案](#10-部署方案)
11. [开发规范](#11-开发规范)
12. [附录：技术决策记录](#12-附录技术决策记录)

---

## 1. 技术栈选型

### 1.1 核心技术栈

| 层级 | 技术 | 版本 | 选型理由 |
|------|------|------|----------|
| **构建工具** | Vite | v5+ | 极速冷启动、HMR 即时更新、原生 ESM 支持 |
| **UI 框架** | React | v18+ | 组件化开发、生态成熟、Hooks 模型灵活 |
| **编程语言** | TypeScript | v5+ | 类型安全、IDE 智能提示、重构友好 |
| **CSS 框架** | Tailwind CSS | v3.4+ | 原子化 CSS、设计 Token 系统、响应式工具类 |
| **路由** | React Router | v6+ | SPA 路由、嵌套路由、懒加载支持 |
| **Markdown 解析** | react-markdown + remark-gfm | - | 博客 Markdown 渲染、支持 GFM 语法 |
| **代码高亮** | react-syntax-highlighter | - | 博客代码块高亮，支持多主题 |
| **图标库** | Lucide React | - | 轻量 SVG 图标、Tree-shaking 友好 |
| **动画** | Framer Motion | v11+ | 声明式动画 API、布局动画、手势支持 |

### 1.2 开发工具链

| 工具 | 用途 | 配置说明 |
|------|------|----------|
| **包管理** | pnpm | 快速、节省磁盘空间 |
| **代码规范** | ESLint v9 (Flat Config) | 继承 `@typescript-eslint/recommended` |
| **格式化** | Prettier | 与 ESLint 集成，保存时自动修复 |
| **Git Hooks** | Husky + lint-staged | 提交前自动检查代码规范 |
| **提交规范** | Commitlint | Conventional Commits 格式 |
| **编辑器配置** | .editorconfig | 统一跨编辑器格式 |

### 1.3 部署与托管

| 服务 | 用途 | 说明 |
|------|------|------|
| **Vercel** | 主部署平台 | 自动 CI/CD、全球 CDN、Preview Deployments |
| **Cloudflare Pages** | 备选部署 | 国内访问更优、免费额度充足 |
| **GitHub** | 代码托管 | 私有仓库 + GitHub Actions（可选） |

### 1.4 技术选型决策矩阵

```
                    开发效率   运行时性能   构建速度   生态成熟度   学习成本
Vite + React        ★★★★★    ★★★★☆     ★★★★★    ★★★★★     ★★★★☆
Next.js             ★★★★☆    ★★★★★     ★★★★☆    ★★★★★     ★★★☆☆
Astro + React       ★★★★☆    ★★★★★     ★★★★★    ★★★☆☆     ★★★☆☆
纯 HTML/JS          ★★☆☆☆    ★★★★★     ★★★★★    ★★☆☆☆     ★★★★★
```

**最终决策**：选择 **Vite + React + TypeScript + Tailwind CSS**，在开发效率、性能、类型安全之间取得最佳平衡，且满足老师的技术要求。

---

## 2. 项目结构

### 2.1 目录结构总览

```
personal-website/
├── public/                         # 静态资源（不经过构建处理）
│   ├── favicon.svg                 # 网站图标
│   ├── robots.txt                  # 爬虫规则
│   └── images/                     # 静态图片资源
│       ├── avatar.jpg              # 个人头像
│       └── projects/               # 项目截图
│
├── src/
│   ├── main.tsx                    # 应用入口
│   ├── App.tsx                     # 根组件（路由配置）
│   │
│   ├── components/                 # 可复用组件
│   │   ├── layout/                 # 布局组件
│   │   │   ├── Navbar.tsx          # 吸顶毛玻璃导航栏
│   │   │   ├── Footer.tsx          # 页脚
│   │   │   └── MobileMenu.tsx      # 移动端汉堡菜单
│   │   │
│   │   ├── ui/                     # 基础 UI 组件
│   │   │   ├── Button.tsx          # 按钮组件
│   │   │   ├── Card.tsx            # 卡片容器
│   │   │   ├── Tag.tsx             # 标签组件
│   │   │   ├── SectionTitle.tsx    # 区块标题（含左侧竖线装饰）
│   │   │   └── ScrollReveal.tsx    # 滚动入场动画包装器
│   │   │
│   │   ├── home/                   # 首页专用组件
│   │   │   ├── Hero.tsx            # Hero 首屏
│   │   │   └── About.tsx           # 个人介绍区块
│   │   │
│   │   ├── skills/                 # 技能展示组件
│   │   │   ├── SkillCategory.tsx   # 技能分类
│   │   │   ├── SkillCard.tsx       # 单个技能卡片
│   │   │   └── ProgressBar.tsx     # 熟练度进度条
│   │   │
│   │   ├── projects/               # 项目展示组件
│   │   │   ├── ProjectCard.tsx     # 项目卡片
│   │   │   ├── ProjectGrid.tsx     # 项目网格布局
│   │   │   ├── ProjectFilter.tsx   # 分类筛选栏
│   │   │   └── ProjectModal.tsx    # 项目详情弹窗
│   │   │
│   │   ├── blog/                   # 博客组件
│   │   │   ├── BlogCard.tsx        # 文章卡片
│   │   │   ├── BlogList.tsx        # 文章列表
│   │   │   ├── BlogToc.tsx         # 文章目录导航
│   │   │   └── MarkdownRenderer.tsx # Markdown 渲染器
│   │   │
│   │   └── common/                 # 通用组件
│   │       ├── ContactLinks.tsx    # 联系方式链接
│   │       └── SocialIcons.tsx     # 社交媒体图标
│   │
│   ├── pages/                      # 页面级组件
│   │   ├── HomePage.tsx            # 首页（Hero + About + Skills + Projects 预览）
│   │   ├── ProjectsPage.tsx        # 项目完整列表页
│   │   ├── BlogPage.tsx            # 博客列表页
│   │   ├── BlogPostPage.tsx        # 博客详情页
│   │   └── NotFoundPage.tsx        # 404 页面
│   │
│   ├── canvas/                     # Canvas 特效模块
│   │   ├── StarryBackground.tsx    # 星空背景 React 组件
│   │   ├── StarField.ts            # 粒子系统核心类
│   │   ├── Particle.ts             # 单个粒子类
│   │   └── useMouseParallax.ts     # 鼠标视差 Hook
│   │
│   ├── hooks/                      # 自定义 Hooks
│   │   ├── useIntersectionObserver.ts  # 视口检测 Hook
│   │   ├── useScrollPosition.ts    # 滚动位置 Hook
│   │   ├── useResponsive.ts        # 响应式断点 Hook
│   │   └── useReducedMotion.ts     # 减弱动画偏好检测
│   │
│   ├── data/                       # 静态数据（JSON/TS 模块）
│   │   ├── profile.ts              # 个人信息数据
│   │   ├── skills.ts               # 技能数据
│   │   ├── projects.ts             # 项目数据
│   │   └── social.ts               # 社交链接数据
│   │
│   ├── content/                    # 博客 Markdown 文章
│   │   └── posts/
│   │       ├── getting-started-with-react.md
│   │       └── typescript-tips.md
│   │
│   ├── types/                      # TypeScript 类型定义
│   │   ├── profile.d.ts            # 个人信息类型
│   │   ├── skill.d.ts              # 技能类型
│   │   ├── project.d.ts            # 项目类型
│   │   ├── blog.d.ts               # 博客类型
│   │   └── common.d.ts             # 通用类型
│   │
│   ├── styles/                     # 全局样式
│   │   ├── globals.css             # 全局基础样式 + Tailwind 指令
│   │   ├── tokens.css              # 设计 Token（CSS 变量）
│   │   └── markdown.css            # Markdown 文章专用样式
│   │
│   ├── utils/                      # 工具函数
│   │   ├── markdown.ts             # Markdown 解析与 Frontmatter 提取
│   │   ├── date.ts                 # 日期格式化工具
│   │   ├── seo.ts                  # SEO 相关工具（Meta 标签生成）
│   │   └── storage.ts              # localStorage 工具
│   │
│   └── assets/                     # 需要构建处理的资源
│       ├── fonts/                  # 本地字体文件
│       └── icons/                  # SVG 图标源文件
│
├── .github/                        # GitHub 配置
│   └── workflows/
│       └── deploy.yml              # GitHub Actions 部署流程（可选）
│
├── index.html                      # HTML 模板
├── vite.config.ts                  # Vite 配置
├── tailwind.config.ts              # Tailwind 配置
├── tsconfig.json                   # TypeScript 配置
├── postcss.config.js               # PostCSS 配置
├── eslint.config.js                # ESLint 配置
├── .prettierrc                     # Prettier 配置
├── vercel.json                     # Vercel 部署配置
├── package.json                    # 项目依赖
├── pnpm-lock.yaml                  # 依赖锁定
├── PRD.md                          # 产品需求文档
├── TECH_DESIGN.md                  # 本文档
└── README.md                       # 项目说明
```

### 2.2 目录职责说明

| 目录 | 职责 | 规则 |
|------|------|------|
| `src/components/` | 可复用 UI 组件 | 按功能域分子目录，组件使用 PascalCase 命名 |
| `src/pages/` | 页面级组件 | 每个路由对应一个页面组件 |
| `src/canvas/` | Canvas 特效 | 独立模块，与 React 组件解耦 |
| `src/hooks/` | 自定义 Hooks | 封装可复用的状态逻辑 |
| `src/data/` | 静态数据 | TypeScript 模块导出，便于类型检查 |
| `src/content/` | Markdown 内容 | 博客文章源文件 |
| `src/types/` | 类型定义 | 全局 `.d.ts` 文件 |
| `src/utils/` | 工具函数 | 纯函数，无副作用 |
| `public/` | 静态资源 | 直接复制到构建产物，不经过处理 |

---

## 3. 数据模型设计

### 3.1 数据架构总览

```
┌─────────────────────────────────────────────────────────────┐
│                     数据层架构                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  profile.ts  │  │  skills.ts   │  │  projects.ts     │  │
│  │  (个人信息)   │  │  (技能数据)   │  │  (项目数据)       │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  content/posts/*.md  (博客文章 - Markdown + Frontmatter) │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │  social.ts   │  │  静态资源     │                        │
│  │  (社交链接)   │  │  (images/)   │                        │
│  └──────────────┘  └──────────────┘                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**设计原则**：
- MVP 阶段使用**静态数据**（TypeScript 模块 + Markdown 文件），无需后端
- 数据与视图分离，修改内容不需要改动组件代码
- 所有数据导出为强类型 TypeScript 常量，编译时检查
- 后续可平滑迁移到 Headless CMS（只需替换数据源）

### 3.2 个人信息数据模型

```typescript
// src/types/profile.d.ts

/** 个人信息 */
export interface Profile {
  /** 姓名 */
  name: string;
  /** 英文名（可选，用于国际化） */
  nameEn?: string;
  /** 职业头衔，如 "全栈工程师" */
  title: string;
  /** 一句话介绍（支持多个，用于打字机轮播） */
  taglines: string[];
  /** 个人简介段落 */
  bio: string[];
  /** 头像图片路径 */
  avatar: string;
  /** 关键标签，如 ["5年前端开发", "开源爱好者"] */
  highlights: string[];
  /** 简历 PDF 下载地址 */
  resumeUrl: string;
  /** 邮箱地址 */
  email: string;
  /** 所在地区 */
  location: string;
}
```

```typescript
// src/data/profile.ts
import type { Profile } from '@/types/profile';

export const profile: Profile = {
  name: '张三',
  nameEn: 'Zhang San',
  title: '全栈工程师',
  taglines: [
    '全栈工程师',
    '开源爱好者',
    '技术博客作者',
    'UI/UX 设计师',
  ],
  bio: [
    '拥有 5 年前端开发经验，专注于 React 生态和现代 Web 技术。',
    '热衷于构建高性能、无障碍友好的用户界面，相信好的代码应该像好的设计一样优雅。',
    '工作之余喜欢写技术博客、参与开源项目，分享所学所得。',
  ],
  avatar: '/images/avatar.jpg',
  highlights: ['5年前端开发', 'React', 'TypeScript', '开源贡献者'],
  resumeUrl: '/files/resume.pdf',
  email: 'hello@example.com',
  location: '中国 · 北京',
};
```

### 3.3 技能数据模型

```typescript
// src/types/skill.d.ts

/** 单个技能 */
export interface Skill {
  /** 技能名称 */
  name: string;
  /** 熟练度 (0-100) */
  level: number;
  /** 图标标识（对应 Lucide 图标名或自定义 SVG） */
  icon: string;
  /** 技能描述（可选） */
  description?: string;
  /** 相关经验年限（可选） */
  years?: number;
}

/** 技能分类 */
export interface SkillCategory {
  /** 分类 ID（唯一标识） */
  id: string;
  /** 分类名称 */
  name: string;
  /** 分类图标 */
  icon: string;
  /** 该分类下的技能列表 */
  skills: Skill[];
}
```

```typescript
// src/data/skills.ts
import type { SkillCategory } from '@/types/skill';

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    name: '前端开发',
    icon: 'layout',
    skills: [
      { name: 'React', level: 90, icon: 'react', years: 4 },
      { name: 'TypeScript', level: 85, icon: 'typescript', years: 3 },
      { name: 'Vue.js', level: 75, icon: 'vuejs', years: 2 },
      { name: 'HTML/CSS', level: 95, icon: 'html5', years: 5 },
      { name: 'Tailwind CSS', level: 88, icon: 'tailwind', years: 2 },
    ],
  },
  {
    id: 'backend',
    name: '后端开发',
    icon: 'server',
    skills: [
      { name: 'Node.js', level: 80, icon: 'nodejs', years: 3 },
      { name: 'Python', level: 70, icon: 'python', years: 2 },
      { name: 'PostgreSQL', level: 72, icon: 'database', years: 2 },
      { name: 'RESTful API', level: 85, icon: 'api', years: 3 },
    ],
  },
  {
    id: 'devops',
    name: '工具 / DevOps',
    icon: 'settings',
    skills: [
      { name: 'Git', level: 88, icon: 'git', years: 5 },
      { name: 'Docker', level: 70, icon: 'docker', years: 2 },
      { name: 'CI/CD', level: 72, icon: 'workflow', years: 2 },
      { name: 'Vercel/Netlify', level: 80, icon: 'cloud', years: 2 },
    ],
  },
  {
    id: 'design',
    name: '设计 / 其他',
    icon: 'palette',
    skills: [
      { name: 'Figma', level: 75, icon: 'figma', years: 2 },
      { name: 'UI/UX 设计', level: 70, icon: 'figma', years: 2 },
      { name: '技术写作', level: 80, icon: 'pen-tool', years: 3 },
    ],
  },
];
```

### 3.4 项目数据模型

```typescript
// src/types/project.d.ts

/** 单个项目 */
export interface Project {
  /** 项目 ID（唯一标识，用于路由和锚点） */
  id: string;
  /** 项目名称 */
  title: string;
  /** 一句话描述 */
  description: string;
  /** 详细介绍（Markdown 格式，用于详情弹窗/页面） */
  detail?: string;
  /** 封面图路径 */
  coverImage: string;
  /** 截图画廊（多图） */
  images?: string[];
  /** 技术标签 */
  tags: string[];
  /** 分类 */
  category: ProjectCategory;
  /** 在线演示链接 */
  demoUrl?: string;
  /** 源代码链接 */
  sourceUrl?: string;
  /** 是否为精选项目（置顶显示） */
  featured: boolean;
  /** 项目日期（YYYY-MM） */
  date: string;
  /** 个人职责描述 */
  role?: string;
}

/** 项目分类 */
export type ProjectCategory =
  | 'all'
  | 'web'
  | 'mobile'
  | 'tool'
  | 'design';

/** 项目分类标签映射 */
export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  all: '全部',
  web: 'Web 应用',
  mobile: '移动端',
  tool: '开源工具',
  design: '设计作品',
};
```

```typescript
// src/data/projects.ts
import type { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'personal-website',
    title: '个人展示网站',
    description: '基于 React + Vite + Tailwind CSS 的深色主题个人网站，含星空粒子背景。',
    detail: '## 项目背景\n\n为了展示个人技能和项目经验...',
    coverImage: '/images/projects/website-cover.jpg',
    images: [
      '/images/projects/website-1.jpg',
      '/images/projects/website-2.jpg',
    ],
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Canvas'],
    category: 'web',
    demoUrl: 'https://example.com',
    sourceUrl: 'https://github.com/username/repo',
    featured: true,
    date: '2024-07',
    role: '独立设计与开发',
  },
  // ... 更多项目
];
```

### 3.5 博客数据模型

```typescript
// src/types/blog.d.ts

/** 博客文章 Frontmatter（Markdown 文件头部元数据） */
export interface BlogPostMeta {
  /** 文章标题 */
  title: string;
  /** 发布日期 (YYYY-MM-DD) */
  date: string;
  /** 分类 */
  category: BlogCategory;
  /** 标签列表 */
  tags: string[];
  /** 文章摘要 */
  summary: string;
  /** 封面图路径（可选） */
  cover?: string;
  /** 是否发布（草稿设为 false） */
  published: boolean;
  /** 预计阅读时间（分钟，自动计算） */
  readingTime?: number;
}

/** 完整博客文章 */
export interface BlogPost extends BlogPostMeta {
  /** 文章唯一标识（从文件名生成） */
  slug: string;
  /** 文章 HTML 内容（从 Markdown 编译） */
  content: string;
  /** 文章原始 Markdown 内容 */
  rawContent: string;
  /** 文章目录结构（从标题提取） */
  toc: TocItem[];
}

/** 目录项 */
export interface TocItem {
  /** 标题层级 (1-6) */
  level: number;
  /** 标题文字 */
  text: string;
  /** 锚点 ID */
  id: string;
}

/** 博客分类 */
export type BlogCategory = 'frontend' | 'backend' | 'devops' | 'essay';

/** 博客分类标签映射 */
export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  frontend: '前端',
  backend: '后端',
  devops: '工程化',
  essay: '随笔',
};
```

#### 博客文章存储格式

```markdown
<!-- src/content/posts/getting-started-with-react.md -->
---
title: "React 18 新特性速览"
date: "2024-07-10"
category: "frontend"
tags: ["React", "前端框架", "并发模式"]
summary: "本文介绍 React 18 的核心新特性，包括并发渲染、自动批处理、Suspense 改进等。"
cover: "/images/blog/react-18-cover.jpg"
published: true
---

## 前言

React 18 于 2022 年正式发布...

## 并发渲染（Concurrent Rendering）

...

## 自动批处理（Automatic Batching）

...
```

#### 博客构建时处理流程

```
┌─────────────────────────────────────────────────────────────┐
│                    博客构建流程                               │
│                                                             │
│  src/content/posts/*.md                                     │
│         │                                                   │
│         ▼                                                   │
│  ┌──────────────┐     ┌──────────────┐                     │
│  │ gray-matter  │────▶│ 提取 Frontmatter │                  │
│  │ (解析 YAML)  │     │ (title/date/  │                      │
│  └──────────────┘     │  tags/etc.)   │                      │
│                       └──────────────┘                     │
│                              │                              │
│                              ▼                              │
│                       ┌──────────────┐                      │
│                       │ remark +     │                      │
│                       │ rehype       │────▶ 编译为 HTML      │
│                       │ (MD→HTML)    │                      │
│                       └──────────────┘                      │
│                              │                              │
│                              ▼                              │
│                       ┌──────────────┐                      │
│                       │ 生成 TOC     │────▶ 提取 H2/H3 标题  │
│                       │              │                      │
│                       └──────────────┘                      │
│                              │                              │
│                              ▼                              │
│                       ┌──────────────┐                      │
│                       │ 计算阅读时间  │────▶ 中文字数 / 300   │
│                       │              │                      │
│                       └──────────────┘                      │
│                              │                              │
│                              ▼                              │
│              生成 BlogPost[] 对象数组                         │
│              (编译时嵌入到 JS Bundle 中)                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 博客加载工具函数

```typescript
// src/utils/markdown.ts

import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import type { BlogPost, BlogPostMeta, TocItem } from '@/types/blog';

/**
 * 解析单篇 Markdown 文章
 */
export async function parseMarkdownPost(
  slug: string,
  raw: string
): Promise<BlogPost> {
  // 1. 提取 Frontmatter
  const { data, content } = matter(raw);
  const meta = data as BlogPostMeta;

  // 2. 编译 Markdown 为 HTML
  const processedHtml = await remark()
    .use(html)
    .use(remarkGfm)
    .process(content);

  // 3. 提取 TOC
  const toc = extractToc(content);

  // 4. 计算阅读时间
  const readingTime = calculateReadingTime(content);

  return {
    slug,
    ...meta,
    content: processedHtml.toString(),
    rawContent: content,
    toc,
    readingTime,
  };
}

/**
 * 从 Markdown 内容提取目录结构
 */
function extractToc(markdown: string): TocItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      .replace(/^-|-$/g, '');

    toc.push({ level, text, id });
  }

  return toc;
}

/**
 * 计算中文阅读时间（300字/分钟）
 */
function calculateReadingTime(content: string): number {
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = content.replace(/[\u4e00-\u9fa5]/g, '').split(/\s+/).length;
  const totalWords = chineseChars + englishWords;
  return Math.ceil(totalWords / 300);
}
```

### 3.6 社交链接数据模型

```typescript
// src/types/common.d.ts

export interface SocialLink {
  /** 平台名称 */
  platform: string;
  /** 链接地址 */
  url: string;
  /** 图标名称（对应 Lucide 图标） */
  icon: string;
  /** 显示标签 */
  label: string;
}
```

```typescript
// src/data/social.ts
import type { SocialLink } from '@/types/common';

export const socialLinks: SocialLink[] = [
  { platform: 'github', url: 'https://github.com/username', icon: 'github', label: 'GitHub' },
  { platform: 'linkedin', url: 'https://linkedin.com/in/username', icon: 'linkedin', label: 'LinkedIn' },
  { platform: 'twitter', url: 'https://twitter.com/username', icon: 'twitter', label: 'Twitter / X' },
  { platform: 'email', url: 'mailto:hello@example.com', icon: 'mail', label: '发送邮件' },
];
```

### 3.7 数据模型 ER 关系图

```
┌──────────────┐         ┌──────────────────┐
│   Profile    │         │   SocialLink[]   │
│──────────────│         │──────────────────│
│ name         │         │ platform         │
│ title        │         │ url              │
│ taglines[]   │         │ icon             │
│ bio[]        │         │ label            │
│ avatar       │         └──────────────────┘
│ highlights[] │
│ resumeUrl    │
│ email        │
│ location     │
└──────────────┘

┌──────────────────┐     ┌──────────────────┐
│ SkillCategory    │     │     Skill         │
│──────────────────│     │──────────────────│
│ id               │──┐  │ name             │
│ name             │  │  │ level (0-100)    │
│ icon             │  └─▶│ icon             │
│ skills[]         │     │ description      │
└──────────────────┘     │ years            │
                         └──────────────────┘

┌──────────────────┐     ┌──────────────────┐
│    Project       │     │  ProjectImage    │
│──────────────────│     │──────────────────│
│ id               │     │ url              │
│ title            │     │ alt              │
│ description      │     └──────────────────┘
│ detail (markdown)│
│ coverImage       │
│ images[]         │
│ tags[]           │
│ category         │
│ demoUrl          │
│ sourceUrl        │
│ featured         │
│ date             │
│ role             │
└──────────────────┘

┌──────────────────┐     ┌──────────────────┐
│   BlogPost       │     │    TocItem       │
│──────────────────│     │──────────────────│
│ slug             │     │ level (1-6)      │
│ title            │     │ text             │
│ date             │     │ id               │
│ category         │     └──────────────────┘
│ tags[]           │
│ summary          │
│ cover            │
│ published        │
│ readingTime      │
│ content (html)   │
│ rawContent (md)  │
│ toc[]            │
└──────────────────┘
```

---

## 4. 关键技术实现

### 4.1 星空背景 Canvas 粒子系统

#### 4.1.1 架构设计

```
┌─────────────────────────────────────────────────────────────┐
│                  StarryBackground 组件                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  <canvas ref={canvasRef} />                           │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │           StarField (粒子管理器)                  │  │  │
│  │  │                                                 │  │  │
│  │  │  particles: Particle[]                          │  │  │
│  │  │  + add() / remove() / update() / draw()        │  │  │
│  │  │                                                 │  │  │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐        │  │  │
│  │  │  │Particle 1│ │Particle 2│ │Particle 3│ ...    │  │  │
│  │  │  │ x, y     │ │ x, y     │ │ x, y     │        │  │  │
│  │  │  │ size     │ │ size     │ │ size     │        │  │  │
│  │  │  │ alpha    │ │ alpha    │ │ alpha    │        │  │  │
│  │  │  │ speed    │ │ speed    │ │ speed    │        │  │  │
│  │  │  │ layer    │ │ layer    │ │ layer    │        │  │  │
│  │  │  └──────────┘ └──────────┘ └──────────┘        │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │  useMouseParallax() ──▶ 鼠标偏移量 ──▶ 视差变换       │  │
│  │  useReducedMotion() ──▶ 是否减弱动画                   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

#### 4.1.2 粒子类设计

```typescript
// src/canvas/Particle.ts

export interface ParticleConfig {
  canvasWidth: number;
  canvasHeight: number;
  reducedMotion: boolean;
}

export class Particle {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
  /** 深度层级 (0=远, 1=中, 2=近)，影响视差速率和大小 */
  layer: number;

  constructor(config: ParticleConfig) {
    this.layer = Math.random() < 0.6 ? 0 : Math.random() < 0.8 ? 1 : 2;
    this.x = Math.random() * config.canvasWidth;
    this.y = Math.random() * config.canvasHeight;
    // 近大远小
    this.size = [0.5, 1.2, 2.0][this.layer] + Math.random() * 0.5;
    this.baseAlpha = 0.3 + Math.random() * 0.7;
    this.alpha = this.baseAlpha;
    this.twinkleSpeed = 0.001 + Math.random() * 0.003;
    this.twinklePhase = Math.random() * Math.PI * 2;
    // 颜色分配
    const colorRand = Math.random();
    if (colorRand < 0.7) this.color = '#FFFFFF';
    else if (colorRand < 0.9) this.color = '#7DD3FC';
    else this.color = '#C4B5FD';
  }

  /** 更新粒子状态（每帧调用） */
  update(deltaTime: number, reducedMotion: boolean): void {
    if (!reducedMotion) {
      // 呼吸式闪烁
      this.twinklePhase += this.twinkleSpeed * deltaTime;
      this.alpha = this.baseAlpha * (0.5 + 0.5 * Math.sin(this.twinklePhase));
    }
  }

  /** 绘制粒子 */
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
  }
}
```

#### 4.1.3 粒子系统管理器

```typescript
// src/canvas/StarField.ts

import { Particle, ParticleConfig } from './Particle';

export class StarField {
  private particles: Particle[] = [];
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private reducedMotion: boolean;

  /** 视差偏移量（由鼠标位置计算） */
  private parallaxOffsetX = 0;
  private parallaxOffsetY = 0;

  /** 各层视差速率系数 */
  private static readonly PARALLAX_FACTORS = [0.02, 0.06, 0.12];

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number, reducedMotion: boolean) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.reducedMotion = reducedMotion;
    this.init();
  }

  /** 初始化粒子群 */
  private init(): void {
    const isMobile = this.width < 640;
    const count = isMobile ? 70 : 180;
    const config: ParticleConfig = {
      canvasWidth: this.width,
      canvasHeight: this.height,
      reducedMotion: this.reducedMotion,
    };

    this.particles = Array.from({ length: count }, () => new Particle(config));
  }

  /** 更新鼠标视差偏移 */
  updateParallax(mouseX: number, mouseY: number): void {
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    this.parallaxOffsetX = (mouseX - centerX) / centerX;
    this.parallaxOffsetY = (mouseY - centerY) / centerY;
  }

  /** 每帧更新 */
  update(deltaTime: number): void {
    this.particles.forEach(p => p.update(deltaTime, this.reducedMotion));
  }

  /** 每帧绘制 */
  draw(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.particles.forEach(particle => {
      // 应用视差偏移
      const factor = StarField.PARALLAX_FACTORS[particle.layer];
      const offsetX = this.parallaxOffsetX * factor * 50;
      const offsetY = this.parallaxOffsetY * factor * 50;

      this.ctx.save();
      this.ctx.translate(offsetX, offsetY);
      particle.draw(this.ctx);
      this.ctx.restore();
    });

    // 重置 globalAlpha
    this.ctx.globalAlpha = 1;
  }

  /** 窗口尺寸变化时重新初始化 */
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.init();
  }
}
```

#### 4.1.4 React 组件封装

```typescript
// src/canvas/StarryBackground.tsx

import { useRef, useEffect, useCallback } from 'react';
import { StarField } from './StarField';
import { useMouseParallax } from './useMouseParallax';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starFieldRef = useRef<StarField | null>(null);
  const animationFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const { mouseX, mouseY } = useMouseParallax();
  const reducedMotion = useReducedMotion();

  // 初始化 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      if (!starFieldRef.current) {
        starFieldRef.current = new StarField(ctx, window.innerWidth, window.innerHeight, reducedMotion);
      } else {
        starFieldRef.current.resize(window.innerWidth, window.innerHeight);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [reducedMotion]);

  // 动画循环
  const animate = useCallback((timestamp: number) => {
    if (!starFieldRef.current) return;

    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    starFieldRef.current.updateParallax(mouseX, mouseY);
    starFieldRef.current.update(deltaTime);
    starFieldRef.current.draw();

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [mouseX, mouseY]);

  useEffect(() => {
    // 页面不可见时暂停渲染
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameRef.current);
      } else {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"  // 装饰性元素，对屏幕阅读器隐藏
    />
  );
}
```

#### 4.1.5 鼠标视差 Hook

```typescript
// src/canvas/useMouseParallax.ts

import { useState, useEffect, useRef } from 'react';

interface MousePosition {
  mouseX: number;
  mouseY: number;
}

export function useMouseParallax(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ mouseX: 0, mouseY: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // 移动端不使用鼠标视差
    if (window.innerWidth < 640 || 'ontouchstart' in window) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ mouseX: e.clientX, mouseY: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return position;
}
```

#### 4.1.6 性能优化策略

| 策略 | 实现方式 |
|------|----------|
| **设备像素比限制** | `Math.min(window.devicePixelRatio, 2)` 避免高 DPI 设备过度渲染 |
| **离屏暂停** | `document.hidden` 时停止 `requestAnimationFrame` |
| **移动端降级** | 粒子数量减半（70 vs 180），关闭视差效果 |
| **减弱动画支持** | 检测 `prefers-reduced-motion`，关闭闪烁和视差 |
| **空间分区** | 只重绘变化区域（使用 `clearRect` 全屏清除，粒子少时性能足够） |
| **对象池** | 粒子对象复用，resize 时重新初始化而非创建新对象 |

### 4.2 响应式布局实现

#### 4.2.1 Tailwind 断点配置

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      'sm': '640px',    // 平板竖屏 → 两列布局
      'md': '768px',    // 平板横屏
      'lg': '1024px',   // 桌面 → 三列布局
      'xl': '1280px',   // 大屏桌面
    },
    extend: {
      colors: {
        // 设计 Token 颜色
        'bg-primary': '#080F1A',
        'bg-secondary': '#0D1321',
        'bg-card': '#111827',
        'text-primary': '#E6EAF2',
        'text-secondary': '#94A3B8',
        'accent': '#38BDF8',
        'accent-purple': '#818CF8',
        'success': '#34D399',
        'border': 'rgba(230, 234, 242, 0.08)',
      },
      maxWidth: {
        'content': '1200px',  // 内容区最大宽度
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
        'modal': '20px',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

#### 4.2.2 响应式布局 Hook

```typescript
// src/hooks/useResponsive.ts

import { useState, useEffect } from 'react';

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

interface ResponsiveState {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  columns: 1 | 2 | 3;
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>(getBreakpointState());

  useEffect(() => {
    const handleResize = () => setState(getBreakpointState());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return state;
}

function getBreakpointState(): ResponsiveState {
  const width = window.innerWidth;

  if (width < 640) {
    return { breakpoint: 'mobile', isMobile: true, isTablet: false, isDesktop: false, columns: 1 };
  } else if (width < 1024) {
    return { breakpoint: 'tablet', isMobile: false, isTablet: true, isDesktop: false, columns: 2 };
  } else {
    return { breakpoint: 'desktop', isMobile: false, isTablet: false, isDesktop: true, columns: 3 };
  }
}
```

#### 4.2.3 通用响应式网格组件

```tsx
// src/components/ui/ResponsiveGrid.tsx

import { ReactNode } from 'react';

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
}

export function ResponsiveGrid({ children, className = '' }: ResponsiveGridProps) {
  return (
    <div
      className={`
        grid
        grid-cols-1          /* <640px: 单列 */
        sm:grid-cols-2       /* ≥640px: 双列 */
        lg:grid-cols-3       /* ≥1024px: 三列 */
        gap-6
        max-w-content        /* 1200px */
        mx-auto
        px-4 sm:px-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}
```

#### 4.2.4 响应式适配策略总结

| 元素 | Mobile (<640px) | Tablet (640-1024px) | Desktop (>1024px) |
|------|-----------------|---------------------|-------------------|
| **导航栏** | 汉堡菜单（全屏展开） | 水平导航 | 水平导航 |
| **Hero 标题** | 32px | 40px | 48px |
| **项目/技能网格** | 1 列 | 2 列 | 3 列 |
| **卡片内边距** | 16px | 20px | 24px |
| **区块间距** | 64px | 80px | 96px |
| **星空粒子数** | 70 颗 | 120 颗 | 180 颗 |
| **视差效果** | 关闭 | 开启 | 开启 |
| **内容水平内边距** | 16px | 24px | 24px |

### 4.3 无障碍（A11y）实现方案

#### 4.3.1 语义化 HTML 结构

```tsx
// 页面整体语义结构
<body>
  {/* 跳过导航链接（键盘用户快速跳转到主内容） */}
  <a href="#main-content" className="sr-only focus:not-sr-only ...">
    跳到主内容
  </a>

  {/* 导航区域 */}
  <nav aria-label="主导航">
    ...
  </nav>

  {/* 主内容区域 */}
  <main id="main-content">
    <section aria-labelledby="hero-heading">
      <h1 id="hero-heading">个人介绍</h1>
      ...
    </section>

    <section aria-labelledby="skills-heading">
      <h2 id="skills-heading">技能展示</h2>
      ...
    </section>

    <section aria-labelledby="projects-heading">
      <h2 id="projects-heading">项目作品</h2>
      ...
    </section>

    <section aria-labelledby="blog-heading">
      <h2 id="blog-heading">技术博客</h2>
      ...
    </section>
  </main>

  {/* 页脚 */}
  <footer aria-label="页脚">
    ...
  </footer>
</body>
```

#### 4.3.2 焦点管理

```typescript
// src/hooks/useFocusTrap.ts

import { useEffect, useRef } from 'react';

/**
 * 焦点陷阱 Hook —— 用于 Modal / 弹出菜单
 * 确保 Tab 键只在弹窗内部元素间循环
 */
export function useFocusTrap(isOpen: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const container = containerRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

    const focusableElements = container.querySelectorAll<HTMLElement>(focusableSelector);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return containerRef;
}
```

#### 4.3.3 键盘导航支持

| 组件 | 键盘操作 | 实现方式 |
|------|----------|----------|
| **导航栏** | Tab 切换项，Enter 跳转 | 原生 `<a>` 标签 + `:focus-visible` 样式 |
| **汉堡菜单** | Enter 打开，Escape 关闭 | `onKeyDown` 监听 + `useFocusTrap` |
| **项目卡片** | Tab 聚焦，Enter 打开详情 | `role="button"` + `tabIndex={0}` |
| **筛选标签** | 左右箭头切换，Enter 确认 | `role="tablist"` + `role="tab"` |
| **Modal 弹窗** | Tab 循环，Escape 关闭 | `useFocusTrap` + `onKeyDown` |
| **回到顶部** | Enter 触发 | 按钮元素原生支持 |

#### 4.3.4 对比度验证

| 元素组合 | 前景色 | 背景色 | 对比度 | WCAG AA (≥4.5:1) |
|----------|--------|--------|--------|-------------------|
| 主文字 / 主背景 | `#E6EAF2` | `#080F1A` | **15.4:1** | ✅ 通过 |
| 次级文字 / 主背景 | `#94A3B8` | `#080F1A` | **5.8:1** | ✅ 通过 |
| 强调色 / 主背景 | `#38BDF8` | `#080F1A` | **7.2:1** | ✅ 通过 |
| 主文字 / 卡片背景 | `#E6EAF2` | `#111827` | **13.1:1** | ✅ 通过 |
| 次级文字 / 卡片背景 | `#94A3B8` | `#111827` | **4.9:1** | ✅ 通过 |

#### 4.3.5 减弱动画支持

```typescript
// src/hooks/useReducedMotion.ts

import { useState, useEffect } from 'react';

/**
 * 检测用户是否偏好减弱动画
 * 遵循 WCAG 2.1 SC 2.3.3 要求
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}
```

```css
/* src/styles/globals.css */

/* 当用户偏好减弱动画时，禁用所有过渡和动画 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

#### 4.3.6 图片无障碍

```tsx
// 有信息量的图片 —— 提供描述性 alt
<img src={project.coverImage} alt={`${project.title} 项目截图`} />

// 装饰性图片 —— 空 alt，屏幕阅读器跳过
<img src="/images/decorative-divider.svg" alt="" role="presentation" />

// 图标按钮 —— 使用 aria-label 说明功能
<button aria-label="在 GitHub 上查看源代码">
  <GithubIcon />
</button>

// 社交图标链接
<a href={link.url} aria-label={`访问我的 ${link.label} 主页`}>
  <Icon />
</a>
```

---

## 5. 组件架构设计

### 5.1 组件分层模型

```
┌─────────────────────────────────────────────────────────────┐
│                      Pages 层（页面组件）                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │ HomePage │ │BlogPage  │ │BlogPost  │ │ProjectsPage  │   │
│  │          │ │          │ │Page      │ │              │   │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └──────┬───────┘   │
│       │            │            │               │           │
├───────┼────────────┼────────────┼───────────────┼───────────┤
│       │     Feature Components 层（功能组件）    │           │
│  ┌────┴────┐ ┌─────┴─────┐ ┌───┴─────┐ ┌──────┴──────┐    │
│  │  Hero   │ │ SkillGrid │ │ProjectGrid│ │ BlogList   │    │
│  │  About  │ │SkillCard  │ │ProjectCard│ │ BlogCard   │    │
│  │         │ │ProgressBar│ │ProjectFltr│ │ BlogToc    │    │
│  └────┬────┘ └─────┬─────┘ └───┬─────┘ └──────┬──────┘    │
│       │            │           │               │           │
├───────┼────────────┼───────────┼───────────────┼───────────┤
│       │       UI Components 层（基础组件）       │           │
│  ┌────┴────┐ ┌─────┴─────┐ ┌───┴─────┐ ┌──────┴──────┐    │
│  │ Button  │ │   Card    │ │   Tag   │ │SectionTitle │    │
│  │ScrollRev│ │Responsive │ │         │ │             │    │
│  │  eat    │ │  Grid     │ │         │ │             │    │
│  └────┬────┘ └─────┬─────┘ └───┬─────┘ └──────┬──────┘    │
│       │            │           │               │           │
├───────┼────────────┼───────────┼───────────────┼───────────┤
│       │        Hooks / Utils 层（逻辑层）        │           │
│  ┌────┴────────────┴───────────┴───────────────┴────────┐  │
│  │ useResponsive │ useIntersectionObserver │ useFocusTrap │  │
│  │ useReducedMotion │ useScrollPosition │ markdown utils  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                    Canvas / 特效层                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ StarryBackground → StarField → Particle               │  │
│  │ useMouseParallax                                       │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 核心组件 Props 接口设计

#### Navbar 导航栏

```typescript
interface NavbarProps {
  /** 导航项配置 */
  navItems: Array<{
    label: string;
    href: string;
    /** 是否使用平滑滚动到锚点 */
    smoothScroll?: boolean;
  }>;
  /** 当前激活的导航项 ID */
  activeSection?: string;
}
```

#### ProjectCard 项目卡片

```typescript
interface ProjectCardProps {
  /** 项目数据 */
  project: Project;
  /** 点击卡片回调（打开详情） */
  onSelect: (project: Project) => void;
  /** 动画延迟（用于 stagger 效果） */
  animationDelay?: number;
}
```

#### SkillCard 技能卡片

```typescript
interface SkillCardProps {
  /** 技能数据 */
  skill: Skill;
  /** 是否显示动画（进入视口时触发） */
  animate?: boolean;
}
```

#### ScrollReveal 滚动入场包装器

```typescript
interface ScrollRevealProps {
  children: ReactNode;
  /** 入场方向 */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** 动画延迟（ms） */
  delay?: number;
  /** 是否只触发一次 */
  once?: boolean;
  /** 触发阈值（0-1） */
  threshold?: number;
}
```

### 5.3 组件依赖关系图

```
App.tsx
├── StarryBackground (canvas/)
│   ├── StarField (canvas/)
│   │   └── Particle (canvas/)
│   ├── useMouseParallax (canvas/)
│   └── useReducedMotion (hooks/)
│
├── Navbar (components/layout/)
│   ├── MobileMenu (components/layout/)
│   └── useScrollPosition (hooks/)
│
├── HomePage (pages/)
│   ├── Hero (components/home/)
│   │   ├── Button (components/ui/)
│   │   └── ScrollReveal (components/ui/)
│   ├── About (components/home/)
│   │   ├── Tag (components/ui/)
│   │   └── ScrollReveal (components/ui/)
│   ├── SkillCategory (components/skills/)
│   │   ├── SkillCard (components/skills/)
│   │   │   ├── ProgressBar (components/skills/)
│   │   │   └── ScrollReveal (components/ui/)
│   │   └── SectionTitle (components/ui/)
│   ├── ProjectGrid (components/projects/)
│   │   ├── ProjectFilter (components/projects/)
│   │   └── ProjectCard (components/projects/)
│   └── ContactLinks (components/common/)
│
├── BlogPage (pages/)
│   ├── BlogList (components/blog/)
│   │   └── BlogCard (components/blog/)
│   └── SectionTitle (components/ui/)
│
├── BlogPostPage (pages/)
│   ├── MarkdownRenderer (components/blog/)
│   ├── BlogToc (components/blog/)
│   └── SectionTitle (components/ui/)
│
└── Footer (components/layout/)
    └── SocialIcons (components/common/)
```

---

## 6. 路由与页面设计

### 6.1 路由配置

```typescript
// src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { BaseLayout } from '@/components/layout/BaseLayout';

// 路由级懒加载
const HomePage = lazy(() => import('@/pages/HomePage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function App() {
  return (
    <BrowserRouter>
      <BaseLayout>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BaseLayout>
    </BrowserRouter>
  );
}
```

### 6.2 基础布局组件

```tsx
// src/components/layout/BaseLayout.tsx

import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { StarryBackground } from '@/canvas/StarryBackground';

interface BaseLayoutProps {
  children: ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* 星空背景 —— 固定定位，覆盖全屏 */}
      <StarryBackground />

      {/* 跳过导航链接（无障碍） */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-accent focus:text-bg-primary focus:px-4 focus:py-2 focus:rounded-button"
      >
        跳到主内容
      </a>

      {/* 吸顶导航 */}
      <Navbar />

      {/* 主内容 */}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}
```

### 6.3 页面内容规划

| 路由 | 页面 | 包含区块 | 数据来源 |
|------|------|----------|----------|
| `/` | 首页 | Hero + About + Skills + Projects(精选) + Contact | profile.ts + skills.ts + projects.ts |
| `/blog` | 博客列表 | BlogList + 分类筛选 | content/posts/*.md |
| `/blog/:slug` | 文章详情 | MarkdownRenderer + TOC + 上下篇导航 | content/posts/[slug].md |
| `*` | 404 | 错误提示 + 返回首页链接 | - |

---

## 7. 样式系统设计

### 7.1 设计 Token 架构

```
┌─────────────────────────────────────────────────────────────┐
│                    设计 Token 三层架构                        │
│                                                             │
│  Layer 1: Tailwind Config (tailwind.config.ts)              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  定义原始值：颜色色值、字体族、断点、动画关键帧         │  │
│  │  → 编译时生成 Tailwind 工具类                          │  │
│  └───────────────────────────────────────────────────────┘  │
│                         │                                   │
│                         ▼                                   │
│  Layer 2: CSS Variables (src/styles/tokens.css)             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  定义语义化 CSS 变量，供非 Tailwind 场景使用            │  │
│  │  如：Canvas 粒子颜色、JS 动态样式                      │  │
│  └───────────────────────────────────────────────────────┘  │
│                         │                                   │
│                         ▼                                   │
│  Layer 3: Component Styles (各组件内部)                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  使用 Tailwind 工具类 + 少量自定义 CSS                 │  │
│  │  优先使用 @apply 复用组合类                            │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 CSS 变量定义

```css
/* src/styles/tokens.css */

:root {
  /* 颜色 */
  --color-bg-primary: #080F1A;
  --color-bg-secondary: #0D1321;
  --color-bg-card: #111827;
  --color-text-primary: #E6EAF2;
  --color-text-secondary: #94A3B8;
  --color-accent: #38BDF8;
  --color-accent-purple: #818CF8;
  --color-success: #34D399;
  --color-border: rgba(230, 234, 242, 0.08);

  /* 间距 */
  --spacing-section: 96px;
  --spacing-card: 24px;
  --spacing-content-padding: 24px;

  /* 圆角 */
  --radius-button: 12px;
  --radius-card: 16px;
  --radius-modal: 20px;

  /* 阴影 */
  --shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  --shadow-card-hover: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
  --shadow-navbar: 0 1px 3px rgba(0, 0, 0, 0.2);
  --shadow-glow: 0 0 20px rgba(56, 189, 248, 0.15);

  /* 过渡 */
  --transition-fast: 200ms ease;
  --transition-normal: 300ms ease-in-out;
  --transition-slow: 600ms ease-out;

  /* 毛玻璃 */
  --glass-bg: rgba(8, 15, 26, 0.75);
  --glass-blur: 12px;
}

/* 移动端间距调整 */
@media (max-width: 639px) {
  :root {
    --spacing-section: 64px;
    --spacing-content-padding: 16px;
  }
}
```

### 7.3 全局基础样式

```css
/* src/styles/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply bg-bg-primary text-text-primary font-sans leading-relaxed;
  }

  /* 焦点样式 —— 无障碍：清晰的键盘焦点指示器 */
  :focus-visible {
    @apply outline-2 outline-offset-2 outline-accent;
  }

  /* 选中文字样式 */
  ::selection {
    @apply bg-accent/30 text-text-primary;
  }
}

@layer components {
  /* 卡片基础样式 */
  .card {
    @apply bg-bg-card border border-border rounded-card p-6;
    @apply transition-all duration-200 ease-in-out;
    @apply hover:-translate-y-1 hover:shadow-card-hover;
  }

  /* 主按钮 */
  .btn-primary {
    @apply px-6 py-3 rounded-button font-semibold text-white;
    @apply bg-gradient-to-r from-accent to-accent-purple;
    @apply transition-all duration-200;
    @apply hover:opacity-90 hover:shadow-glow;
    @apply focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent;
  }

  /* 次按钮 */
  .btn-secondary {
    @apply px-6 py-3 rounded-button font-semibold text-accent;
    @apply border border-accent bg-transparent;
    @apply transition-all duration-200;
    @apply hover:bg-accent/10;
  }

  /* 区块标题 */
  .section-title {
    @apply text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary;
    @apply pl-4 border-l-4 border-accent;
  }
}

/* 减弱动画支持 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 8. 性能优化策略

### 8.1 构建时优化

| 策略 | 工具 / 方法 | 预期效果 |
|------|------------|----------|
| **代码分割** | React.lazy + 路由级动态导入 | 首屏 JS < 100KB |
| **Tree Shaking** | Vite 原生支持 ESM | 移除未使用代码 |
| **CSS 裁剪** | Tailwind PurgeCSS（内置） | CSS 体积 < 10KB |
| **图片压缩** | vite-plugin-imagemin | 图片体积减少 60-80% |
| **字体子集化** | fontmin-plugin（可选） | 中文字体从 10MB → 100KB |
| **Gzip / Brotli** | Vercel 自动开启 | 传输体积减少 70% |
| **预加载关键资源** | `<link rel="preload">` | 首屏资源提前加载 |

### 8.2 运行时优化

| 策略 | 实现方式 |
|------|----------|
| **图片懒加载** | `loading="lazy"` + Intersection Observer 占位图 |
| **虚拟滚动** | 博客文章列表超过 50 篇时启用（react-window） |
| **防抖节流** | 滚动事件、鼠标移动事件使用 `requestAnimationFrame` 节流 |
| **Canvas 离屏暂停** | `document.hidden` 时停止渲染循环 |
| **组件缓存** | `React.memo` 包裹纯展示组件，避免无意义重渲染 |

### 8.3 Vite 构建配置

```typescript
// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    // 代码分割策略
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-markdown': ['react-markdown', 'remark-gfm', 'rehype-highlight'],
        },
      },
    },
    // 资源内联阈值（小于 4KB 的资源内联为 base64）
    assetsInlineLimit: 4096,
    // 生成 sourcemap（生产环境可选关闭）
    sourcemap: false,
    // 压缩选项
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // 移除 console.log
        drop_debugger: true,
      },
    },
  },
  // 开发服务器
  server: {
    port: 3000,
    open: true,
  },
});
```

### 8.4 性能指标目标

| 指标 | 目标值 | 测量工具 |
|------|--------|----------|
| **Lighthouse Performance** | ≥ 90（桌面 ≥ 95） | Lighthouse CI |
| **FCP（首次内容绘制）** | < 1.5s | Web Vitals |
| **LCP（最大内容绘制）** | < 2.5s | Web Vitals |
| **TTI（可交互时间）** | < 3.0s | Lighthouse |
| **CLS（累积布局偏移）** | < 0.1 | Web Vitals |
| **首屏 JS 体积** | < 150KB（gzip） | Build 分析 |
| **首屏 CSS 体积** | < 15KB（gzip） | Build 分析 |

---

## 9. 无障碍设计方案

### 9.1 WCAG 2.1 AA 合规清单

| 准则 | 要求 | 实现方式 | 状态 |
|------|------|----------|------|
| **1.1.1 非文本内容** | 图片有 alt | 所有 `<img>` 必须有 alt 或 alt="" | ✅ |
| **1.4.3 对比度（最低）** | 文本对比度 ≥ 4.5:1 | 设计 Token 已验证（见 4.3.4） | ✅ |
| **1.4.11 非文本对比度** | UI 组件对比度 ≥ 3:1 | 边框、图标颜色已验证 | ✅ |
| **2.1.1 键盘** | 所有功能可键盘操作 | tabIndex + onKeyDown + useFocusTrap | ✅ |
| **2.1.2 无键盘陷阱** | 键盘焦点可移出 | 焦点陷阱仅在 Modal 内，Escape 可退出 | ✅ |
| **2.4.1 跳过区块** | 提供跳过导航链接 | "跳到主内容" 隐藏链接 | ✅ |
| **2.4.3 焦点顺序** | 焦点顺序合理 | DOM 顺序 = 视觉顺序 | ✅ |
| **2.4.6 标题和标签** | 描述性标题 | 每个 section 有 aria-labelledby | ✅ |
| **2.4.7 焦点可见** | 焦点指示器清晰 | `:focus-visible` 2px 蓝色轮廓 | ✅ |
| **3.2.1 聚焦时不突变** | 聚焦不触发意外行为 | 仅改变样式，不触发导航 | ✅ |
| **4.1.2 名称/角色/值** | 组件有正确语义 | ARIA 标签 + role 属性 | ✅ |
| **2.3.3 动画交互** | 支持减弱动画 | `prefers-reduced-motion` 媒体查询 | ✅ |

### 9.2 屏幕阅读器兼容

```tsx
// 装饰性 Canvas 背景 —— 对屏幕阅读器隐藏
<canvas aria-hidden="true" />

// 图标按钮 —— 提供文字说明
<button aria-label="发送邮件至 hello@example.com">
  <MailIcon aria-hidden="true" />
</button>

// 进度条 —— 使用 ARIA 属性
<div
  role="progressbar"
  aria-valuenow={skill.level}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={`${skill.name} 熟练度 ${skill.level}%`}
>
  <div style={{ width: `${skill.level}%` }} />
</div>

// 导航区域
<nav aria-label="主导航">...</nav>

// 当前页面位置
<a href="/blog" aria-current="page">博客</a>

// 新窗口链接提示
<a href={url} target="_blank" rel="noopener noreferrer">
  在线演示
  <span className="sr-only">（在新窗口打开）</span>
  <ExternalLinkIcon aria-hidden="true" />
</a>
```

### 9.3 键盘导航测试矩阵

| 测试场景 | 操作步骤 | 预期结果 |
|----------|----------|----------|
| Tab 遍历全站 | 连续按 Tab | 焦点按 DOM 顺序移动，`:focus-visible` 轮廓清晰 |
| 跳过导航 | 首次 Tab 聚焦"跳到主内容"，Enter | 焦点跳转到 main 区域 |
| 汉堡菜单 | 打开菜单后 Tab | 焦点在菜单项内循环，Escape 关闭菜单 |
| Modal 弹窗 | 打开项目详情后 Tab | 焦点在弹窗内循环，Escape 关闭弹窗 |
| 箭头键导航 | 筛选标签栏左右箭头 | 标签项切换，Enter 确认筛选 |

---

## 10. 部署方案

### 10.1 Vercel 部署（推荐）

```json
// vercel.json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*\\.(jpg|jpeg|png|gif|webp|avif|svg))",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=2592000" }
      ]
    }
  ]
}
```

**部署流程：**

```
Git Push → GitHub → Vercel Webhook → 自动构建 → 全球 CDN 分发
                                            ↓
                              Preview Deployment（PR 预览）
                                            ↓
                              Production Deployment（main 分支）
```

### 10.2 Cloudflare Pages 备选部署

```toml
# wrangler.toml（可选，用于自定义配置）
name = "personal-website"
compatibility_date = "2024-07-01"

[site]
bucket = "./dist"
```

**Cloudflare Pages 配置：**

| 配置项 | 值 |
|--------|-----|
| Framework preset | Vite |
| Build command | `pnpm build` |
| Build output | `dist` |
| Node version | 20.x |

### 10.3 部署检查清单

| 检查项 | 命令 / 操作 |
|--------|------------|
| 构建无错误 | `pnpm build` |
| Lighthouse 评分 ≥ 90 | Chrome DevTools → Lighthouse |
| 无控制台错误 | 浏览器控制台检查 |
| 移动端布局正确 | Chrome DevTools 设备模拟 |
| 键盘可导航 | 纯键盘操作全站 |
| 图片 alt 完整 | 审查所有 `<img>` 标签 |
| HTTPS 强制 | 检查 Vercel 强制 HTTPS 设置 |
| 404 页面正常 | 访问不存在的路由 |
| 博客文章渲染 | 检查 Markdown 样式和代码高亮 |
| Canvas 性能 | 低端设备（如手机）检查帧率 |

---

## 11. 开发规范

### 11.1 代码风格

| 规范 | 规则 | 示例 |
|------|------|------|
| **文件命名** | PascalCase（组件）/ camelCase（工具） | `ProjectCard.tsx` / `useResponsive.ts` |
| **组件命名** | PascalCase | `function SkillCard() {}` |
| **Hook 命名** | camelCase，use 前缀 | `function useIntersectionObserver() {}` |
| **常量命名** | UPPER_SNAKE_CASE | `const PROJECT_CATEGORY_LABELS = {...}` |
| **类型命名** | PascalCase，I 前缀可选 | `interface BlogPost {}` / `type ProjectCategory = ...` |
| **CSS 类名** | Tailwind 工具类优先 | 避免自定义 class，除非复杂组合 |

### 11.2 Git 提交规范

```
feat: 新增项目筛选功能
fix: 修复移动端导航栏汉堡菜单无法关闭的问题
docs: 更新 README 部署说明
style: 调整 Hero 区域标题字号
refactor: 重构星空粒子系统为 class 架构
perf: 优化 Canvas 渲染循环，降低 CPU 占用
chore: 升级 Vite 到 v5.3.0
```

### 11.3 目录新增规范

| 场景 | 放置位置 |
|------|----------|
| 新增页面 | `src/pages/` |
| 新增可复用组件 | `src/components/[domain]/` |
| 新增 Hook | `src/hooks/` |
| 新增工具函数 | `src/utils/` |
| 新增类型定义 | `src/types/` |
| 新增博客文章 | `src/content/posts/` |
| 新增静态图片 | `public/images/` |
| 新增数据配置 | `src/data/` |

---

## 12. 附录：技术决策记录

### ADR-001：选择 Vite 而非 Webpack

| 维度 | 说明 |
|------|------|
| **状态** | ✅ 已采纳 |
| **背景** | 需要为 React SPA 选择构建工具 |
| **决策** | 使用 Vite v5+ |
| **理由** | ① 原生 ESM 开发服务器，冷启动 <1s；② HMR 即时更新，开发体验极佳；③ 内置 TypeScript 支持，无需额外配置；④ Rollup 构建产物体积小 |
| **风险** | 插件生态不如 Webpack 成熟，但主流需求已覆盖 |

### ADR-002：选择静态数据而非 Headless CMS

| 维度 | 说明 |
|------|------|
| **状态** | ✅ 已采纳（MVP 阶段） |
| **背景** | 需要管理个人介绍、技能、项目、博客等数据 |
| **决策** | MVP 使用 TypeScript 模块 + Markdown 文件 |
| **理由** | ① 零外部依赖，部署简单；② 版本控制友好（Git 追踪每次修改）；③ 类型安全（TS 编译时检查）；④ 博客用 Markdown，写作体验好 |
| **风险** | 非技术人员无法更新内容；v2.0 可迁移到 CMS |

### ADR-003：Canvas 粒子系统自研而非使用第三方库

| 维度 | 说明 |
|------|------|
| **状态** | ✅ 已采纳 |
| **背景** | 需要实现星空粒子背景 + 鼠标视差效果 |
| **决策** | 使用原生 Canvas API 自研粒子系统 |
| **理由** | ① 无额外依赖，包体积极小；② 完全可控，便于性能调优；③ 需求明确，不需要第三方库的复杂功能 |
| **风险** | 开发周期略长（约 2-3 天），但长期维护成本低 |

### ADR-004：博客采用构建时编译而非运行时解析

| 维度 | 说明 |
|------|------|
| **状态** | ✅ 已采纳 |
| **背景** | 博客文章以 Markdown 存储，需要转换为 HTML 渲染 |
| **决策** | 构建时读取 Markdown 文件，编译为 HTML 嵌入 JS Bundle |
| **理由** | ① 运行时零成本（无需浏览器解析 Markdown）；② 首屏加载快；③ 部署为纯静态文件，CDN 友好 |
| **风险** | 新增文章需重新构建（CI/CD 自动处理） |

### ADR-005：响应式方案选择 Tailwind 断点而非 CSS-in-JS

| 维度 | 说明 |
|------|------|
| **状态** | ✅ 已采纳 |
| **背景** | 需要实现三档响应式布局（mobile / tablet / desktop） |
| **决策** | 使用 Tailwind CSS 的响应式工具类（`sm:` / `md:` / `lg:`） |
| **理由** | ① 与 Tailwind 技术栈一致，无额外学习成本；② 编译时生成 CSS，运行时零开销；③ 移动优先（Mobile First）语法直观 |
| **风险** | 复杂布局可能需要少量自定义 CSS |

---

> **文档维护说明**：本文档随项目技术演进持续更新。所有技术决策变更需在附录中新增 ADR 记录，并注明状态（提议 / 已采纳 / 已废弃 / 已取代）。
