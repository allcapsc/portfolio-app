'use client'

import { PROJECTS } from '@/projects'
import { FaArrowRight } from 'react-icons/fa6'

export default function Projects() {
  return (
    <section className="mb-16">
      <h3 className="font-heading mb-8 text-2xl sm:text-3xl">Projects</h3>
      <div className="space-y-6">
        {PROJECTS.map((project, index) => (
          <div
            key={index}
            className="border-border shadow-shadow rounded-base bg-main text-main-foreground border-2 p-6"
          >
            <h4 className="font-heading text-xl sm:text-2xl">{project.title}</h4>
            <p className="font-base mt-3 text-sm sm:text-base leading-relaxed opacity-90">
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="border-border rounded-base bg-background text-foreground border-2 px-3 py-1 text-xs sm:text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            {(project.link || project.github) && (
              <div className="mt-5 flex justify-end">
                {project.link ? (
                  <button
                    onClick={() => window.open(project.link, '_blank')}
                    className="border-border shadow-shadow rounded-base border-2 px-4 py-2 font-base text-sm sm:text-base hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all active:scale-95 inline-flex items-center gap-2 bg-background text-foreground cursor-pointer"
                  >
                    Learn More <FaArrowRight className="w-3 h-3" />
                  </button>
                ) : project.github ? (
                  <button
                    onClick={() => window.open(project.github, '_blank')}
                    className="border-border shadow-shadow rounded-base border-2 px-4 py-2 font-base text-sm sm:text-base hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all active:scale-95 inline-flex items-center gap-2 bg-background text-foreground cursor-pointer"
                  >
                    GitHub <FaArrowRight className="w-3 h-3" />
                  </button>
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
