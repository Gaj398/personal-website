/** 博客文章数据（写实，基于个人实践） */
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string[];
}

export const POSTS: BlogPost[] = [
  {
    slug: 'llm-pretrain-sft-lora',
    title: '从预训练到 SFT/LoRA 微调：我的 LLM 训练实践',
    date: '2026-10-23',
    summary:
      '记录在云端环境完成大模型预训练（6250 步、loss 2.74），再做 SFT 全量微调与两次 LoRA 微调的完整过程与踩坑。',
    content: [
      '这个学期的大作业之一，是完整地训练一个大语言模型。整个流程分三步：预训练、SFT 全量微调、LoRA 低秩微调。',
      '预训练阶段在云端的训练环境中进行，用 512 维、8 层的配置训练了 6250 步，最终 loss 收敛到 2.74。数据来自一个精简的预训练语料，模型学会了基本的中文续写能力。',
      'SFT 阶段用精选的指令数据做全量微调，把通用的底座调成能回答问题的对话模型；随后用 LoRA 训练了两个不同风格的适配器（例如基于《西游记》孙悟空语料），新增参数量只占底座的 0.43%，却能在不改变底座的前提下切换人设。',
      '收获：理解了“预训练-微调”的分工，也体会到 LoRA 这种省显存的微调思路有多么实用。',
    ],
  },
  {
    slug: 'bpe-tokenizer',
    title: '手写分词器：从简单正则到 BPE 词表训练',
    date: '2026-10-19',
    summary:
      '实现 SimpleTokenizerV2 与训练 6400 词表的 BPE 分词器，聊聊 encode/decode 与特殊标记的设计。',
    content: [
      '语言模型处理文本的第一步是分词（Tokenization），把一句话切成模型能理解的 token 序列。',
      '先实现了一个简单的 SimpleTokenizerV2：用正则切分单词和标点，构建词汇表，实现 encode 和 decode，并加入 <|unknown|> 与 <|endoftext|> 两个特殊标记，分别处理未知词和文本边界。',
      '接着训练了 BPE（Byte Pair Encoding）分词器：从字符级开始，反复合并最高频的字节对，最终得到 6400 词的词表，并导出 tokenizer.json、vocab.json、merges.txt。',
      '对比下来，BPE 对未知词和多样文本的泛化明显更好，这也是现代大模型普遍采用的做法。',
    ],
  },
  {
    slug: 'vite-github-pages-deploy',
    title: 'Vite + React 部署到 GitHub Pages 的三个坑',
    date: '2026-10-29',
    summary:
      'base 路径、React Router basename、404 回落——解决部署后白屏与路由 404 的完整踩坑记录。',
    content: [
      '把 Vite + React 项目部署到 GitHub Pages 时，我踩了三个坑，折腾很久才解决。',
      '第一个坑：白屏。因为站点部署在 /personal-website/ 子路径下，而 Vite 默认的资源路径是根路径 /，导致 JS/CSS 全部 404。解决：在 vite.config.ts 里设置 base: "/personal-website/"。',
      '第二个坑：路由 404。直接访问子页面时 React Router 匹配不到首页。解决：给 BrowserRouter 设置 basename，并用 404.html 做 SPA 回落。',
      '第三个坑：导航跳转 404。用普通 <a> 标签点击会整页刷新请求服务器，导致子路由 404。解决：内部路由改用 React Router 的 Link 做客户端跳转。',
      '这些经验以后部署任何 SPA 到静态托管平台都用得上。',
    ],
  },
  {
    slug: 'chrome-extension-ecommerce-images',
    title: '用 AI 编辑器开发电商图片下载插件',
    date: '2026-10-27',
    summary:
      '开发 Chrome 扩展，在电商详情页一键提取并下载商品图片，同时部署插件官网到 GitHub Pages。',
    content: [
      '用 AI 编辑器从零开发了一个 Chrome 扩展：电商图片下载插件。',
      '插件面向淘宝、京东、拼多多等电商详情页，用户点击扩展图标后，插件会自动提取页面上的商品图片，预览并一键下载为 PNG。',
      '同时做了一个静态页面作为插件的使用文档官网，并部署到 GitHub Pages。整个开发过程借助 AI 编辑器大幅提升了效率。',
    ],
  },
];
