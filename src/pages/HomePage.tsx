import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { ContactSection } from '@/components/common/ContactSection';

/** 首页 —— Hero + 个人介绍 + 技能 + 项目预览 + 联系方式 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
