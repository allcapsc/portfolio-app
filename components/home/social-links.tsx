import LINKS from '@/links'

export default function SocialLinks() {
  return (
    <div className="mt-12">
      <div className="mb-6">
        <h3 className="font-heading text-xl sm:text-2xl mb-2">Connect</h3>
        <div className="border-border bg-main h-1 w-14 rounded-full"></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(LINKS).map((key) => (
          <a
            className="border-border shadow-shadow text-main-foreground rounded-base bg-main hover:translate-x-boxShadowX hover:translate-y-boxShadowY border-2 p-5 transition-all hover:shadow-none active:scale-95 group"
            key={key}
            target="_blank"
            href={LINKS[key].link}
          >
            <img
              className="h-6 w-6 transition-transform group-hover:scale-110"
              src={LINKS[key].icon.src}
              alt={LINKS[key].title}
            />
            <p className="font-heading mt-3 text-base">
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
