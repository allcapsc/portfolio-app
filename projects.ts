export type Project = {
  title: string
  description: string
  technologies: string[]
  link?: string
  github?: string
}

export const PROJECTS: Project[] = [
  {
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with Next.js and Tailwind CSS featuring theme switching and audio player.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/allcapsc/portfolio-app',
  },
  {
    title: 'Clipboard Manager',
    description: 'A clipboard management tool that saves and organizes your clipboard history for easy access.',
    technologies: ['Rust', 'Tauri', 'React'],
    github: 'https://github.com/allcapsc/Memora',
  },
]
