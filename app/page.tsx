import LINKS from '@/links'
import { ThemeSwitcher } from '@/components/theme-switcher'

export default function Home() {
  return (
    <div className="text-foreground relative mx-auto h-full w-[700px] max-w-full p-8 md:p-16 xl:w-[1400px]">
      <div className="mb-12 w-full xl:fixed xl:mb-0 xl:w-[500px]">

        <div className="mt-8">
          <h2 className="font-heading text-3xl sm:text-[44px]">Edgar Sanchez</h2>
          <p className="font-base mt-6 text-base sm:text-xl">
            Software Engineer. Passionate about building web applications and exploring new technologies.
          </p>
        </div>

        <ThemeSwitcher />
      </div>
      <div className="justify-end xl:flex">
        <div
          id="grid-container"
          className="text-foreground grid w-full grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 xl:w-1/2 xl:pb-16"
        >
          {Object.keys(LINKS).map((key) => (
            <a
              className="border-border shadow-shadow text-main-foreground rounded-base bg-main hover:translate-x-boxShadowX hover:translate-y-boxShadowY border-2 p-5 transition-all hover:shadow-none"
              key={key}
              target="_blank"
              href={LINKS[key].link}
            >
              <img
                className="h-8 w-8 sm:h-10 sm:w-10"
                src={LINKS[key].icon.src}
                alt={LINKS[key].title}
              />
              <p className="font-heading mt-3 text-lg sm:text-xl">
                {LINKS[key].title}
              </p>
              <p className="font-base mt-1 text-sm sm:text-base">
                {LINKS[key].text}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}