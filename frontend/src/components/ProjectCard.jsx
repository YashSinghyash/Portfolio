import { getThumbnail } from './thumbnails/index.js'

export default function ProjectCard({ project }) {
  const { title, description, projectUrl, repoUrl } = project
  const Thumbnail = getThumbnail(title)

  return (
    <article className="project-card">
      {Thumbnail ? (
        <div className="project-card-thumb project-card-thumb--diagram">
          <Thumbnail />
        </div>
      ) : (
        <div className="project-card-thumb">Preview</div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="project-card-links">
        {projectUrl ? <a href={projectUrl}>Live</a> : <span>Live</span>}
        {repoUrl ? <a href={repoUrl}>Code</a> : <span>Code</span>}
      </div>
    </article>
  )
}
