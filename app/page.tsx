import { ThemeSwitcher } from '@/components/features/theme-switcher'
import AudioPlayer from '@/components/features/audio-player'
import Hero from '@/components/home/hero'
import SocialLinks from '@/components/home/social-links'
import Projects from '@/components/home/projects'

export default function Home() {
  return (
    <div className="text-foreground relative mx-auto h-full w-[700px] max-w-full p-8 md:p-16 xl:w-[1400px]">
      <div className="mb-16 w-full xl:fixed xl:mb-0 xl:w-[500px]">
        <Hero />
        <div className="mt-8 flex items-center gap-4">
          <AudioPlayer />
          <ThemeSwitcher />
        </div>
        <SocialLinks />
      </div>
      <div className="justify-end xl:flex">
        <div className="w-full xl:w-1/2 xl:pb-16">
          <Projects />
        </div>
      </div>
    </div>
  )
}