import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa6'

const iconMap: { [key: string]: any } = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  youtube: FaYoutube,
}

export default function SocialLinks() {
  const links = [
    { key: 'github', href: 'https://github.com/allcapsc/', label: 'Github' },
    { key: 'linkedin', href: 'https://www.linkedin.com/in/edgarsanchecz/', label: 'Linkedin' },
    { key: 'instagram', href: 'https://www.instagram.com/edgarsanchecz/', label: 'Instagram' },
    { key: 'youtube', href: 'https://www.youtube.com/@allcapsc/', label: 'Youtube' },
  ]

  return (
    <div className="flex gap-4 mt-4">
      {links.map((link) => {
        const Icon = iconMap[link.key]
        return (
          <a
            key={link.key}
            target="_blank"
            href={link.href}
            className="hover:opacity-70 transition-opacity"
            aria-label={link.label}
          >
            <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
          </a>
        )
      })}
    </div>
  )
}
