import { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard.jsx'
import { fetchProjects, FALLBACK_PROJECTS } from '../api/projects.js'

export default function Projects() {
  // Render placeholders immediately so this section never blocks on the network;
  // swap in real data from the Spring Boot API as soon as it arrives.
  const [projects, setProjects] = useState(FALLBACK_PROJECTS)
  const [source, setSource] = useState('placeholder')

  useEffect(() => {
    const controller = new AbortController()

    fetchProjects({ signal: controller.signal })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data)
          setSource('api')
        }
      })
      .catch(() => {
        // Backend not reachable yet — keep showing the local placeholders.
        setSource('placeholder')
      })

    return () => controller.abort()
  }, [])

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
