import { PROJECTS } from '@/projects'

export default function Projects() {
  return (
    <section className="mb-16">
      <div className="mb-10">
        <h3 className="font-heading text-2xl sm:text-3xl mb-2">Projects</h3>
        <div className="border-border bg-main h-1 w-16 rounded-full"></div>
      </div>
      <div className="space-y-6">
        {PROJECTS.map((project, index) => (
          <div
            key={index}
            className="border-border shadow-shadow rounded-base bg-secondary-background border-2 p-6"
          >
            <h4 className="font-heading text-xl sm:text-2xl mb-3">{project.title}</h4>
            <p className="font-base text-sm sm:text-base text-muted-foreground leading-relaxed">
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="border-border rounded-base bg-main text-main-foreground border px-3 py-1.5 text-xs sm:text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            {(project.link || project.github) && (
              <div className="mt-6 flex gap-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-base text-sm sm:text-base font-medium hover:underline hover:text-main transition-colors inline-flex items-center gap-1"
                  >
                    View Project →
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-base text-sm sm:text-base font-medium hover:underline hover:text-main transition-colors inline-flex items-center gap-1"
                  >
                    GitHub →
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
