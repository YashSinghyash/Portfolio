import ProjectCard from './ProjectCard.jsx'
import { useProjects } from '../hooks/useProjects.js'

export default function Projects() {
  const { projects, source } = useProjects()

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-heading">
          <h2>Projects</h2>
          <span className="section-index">01 — 03</span>
        </div>
        {source === 'placeholder' && (
          <p className="projects-status">
            Showing placeholders — start the backend to load real projects.
          </p>
        )}
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
