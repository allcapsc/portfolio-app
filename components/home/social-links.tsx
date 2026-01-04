import LINKS from '@/links'

export default function SocialLinks() {
  return (
    <div className="mt-10">
      <h3 className="font-heading mb-8 text-2xl sm:text-3xl">Connect</h3>
      <div className="grid grid-cols-2 gap-4">
      {Object.keys(LINKS).map((key) => (
        <a
          className="border-border shadow-shadow text-main-foreground rounded-base bg-main hover:translate-x-boxShadowX hover:translate-y-boxShadowY border-2 p-4 transition-all hover:shadow-none hover:scale-[1.02] active:scale-95"
          key={key}
          target="_blank"
          href={LINKS[key].link}
        >
          <img
            className="h-6 w-6 transition-transform group-hover:rotate-6"
            src={LINKS[key].icon.src}
            alt={LINKS[key].title}
          />
          <p className="font-heading mt-2 text-base">
            {LINKS[key].title}
          </p>
          <p className="font-base mt-1 text-xs opacity-90">
            {LINKS[key].text}
          </p>
        </a>
      ))}
      </div>
    </div>
  )
}
