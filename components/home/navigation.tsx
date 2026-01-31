import { ThemeSwitcher } from '@/components/features/theme-switcher'

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center">
        <ThemeSwitcher />
      </div>
      <div className="flex items-center gap-6">
        <a href="/" className="font-base text-sm sm:text-base hover:text-main transition-colors">
          Home
        </a>
        <a href="/drawing" className="font-base text-sm sm:text-base hover:text-main transition-colors">
          Drawing
        </a>
        <a 
          href="/resume" 
          target="_blank"
          className="border-border shadow-shadow rounded-base border-2 px-4 py-2 font-base text-sm sm:text-base hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all active:scale-95"
        >
          Resume
        </a>
      </div>
    </nav>
  )
}
