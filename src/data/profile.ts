/** 个人简介数据 —— 支持后台动态修改（localStorage 持久化） */

export interface SiteProfile {
  name: string;
  subtitle: string;
  aboutIntro: string[];
  skills: string[];
}

/** 默认个人简介 */
export const DEFAULT_PROFILE: SiteProfile = {
  name: '高爱君',
  subtitle: '大连民族大学 · 信息与通信工程学院 · 物联网工程 243 班',
  aboutIntro: [
    '我是高爱君，就读于大连民族大学信息与通信工程学院物联网工程专业（243 班）。热爱技术开发，当前专注于前端与 React 生态、现代 Web 技术，也在接触物联网相关应用。',
    '喜欢动手把想法实现成能运行的产品，注重工程化与代码质量，愿意不断学习，把复杂的问题拆解成清晰的解决方案。',
  ],
  skills: ['物联网工程', '信息与通信工程学院', '前端开发', 'React', 'TypeScript'],
};

const STORAGE_KEY = 'site_profile';

/** 从 localStorage 读取个人简介 */
export function loadProfile(): SiteProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SiteProfile>;
      return { ...DEFAULT_PROFILE, ...parsed };
    }
  } catch {
    /* 忽略解析错误，回退默认值 */
  }
  return DEFAULT_PROFILE;
}

/** 保存个人简介到 localStorage */
export function saveProfile(profile: SiteProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

/** 恢复默认个人简介 */
export function resetProfile(): void {
  localStorage.removeItem(STORAGE_KEY);
}
