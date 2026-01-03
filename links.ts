import github from './public/icons/github.svg'
import instagram from './public/icons/instagram.svg'
import linkedin from './public/icons/linkedin.svg'
import youtube from './public/icons/youtube.svg'

type SocialMedia = (typeof websites)[number]

type Link = {
  title: string
  icon: any
  link: string
  text?: string
}

const websites = [
  'github',
  'instagram',
  'linkedin',
  'youtube',
]

const LINKS: { [key in SocialMedia]: Link } = {
  github: {
    title: 'Github',
    icon: github,
    link: 'https://github.com/allcapsc/',
    text: '@allcapsc',
  },
  instagram: {
    title: 'Instagram',
    icon: instagram,
    link: 'https://www.instagram.com/edgarsanchecz/',
    text: '@edgarsanchecz',
  },
  linkedin: {
    title: 'Linkedin',
    icon: linkedin,
    link: 'https://www.linkedin.com/in/edgarsanchecz/',
    text: '@edgarsanchecz',
  },
  youtube: {
    title: 'Youtube',
    icon: youtube,
    link: 'https://www.youtube.com/@allcapsc/',
    text: '@allcapsc',
  },
}

export default LINKS