import { Link } from 'react-router-dom'
import { getThumbnail } from './thumbnails/index.js'
import { slugify } from '../utils/slug.js'

export default function ProjectCard({ project }) {
  const { title, description, projectUrl, repoUrl, tag } = project
  const Thumbnail = getThumbnail(title)
  const slug = slugify(title)

  return (
    <article className="project-card">
      {Thumbnail ? (
        <div className="project-card-thumb project-card-thumb--diagram">
          <Thumbnail />
        </div>
      ) : (
        <div className="project-card-thumb">Preview</div>
      )}

      <div className="project-card-header">
        <h3>{title}</h3>
        {tag && <span className="project-tag">{tag}</span>}
      </div>

      <p>{description}</p>

      <div className="project-card-links">
        {tag ? (
          // Design/LLD projects have no running server, so there's nothing to
          // put behind a "Live" link.
          <span>No live demo</span>
        ) : projectUrl ? (
          <a href={projectUrl} className="project-card-link">Live</a>
        ) : (
          <span>Live</span>
        )}
        {repoUrl ? <a href={repoUrl} className="project-card-link">Code</a> : <span>Code</span>}
      </div>

      {/* Stretched link: covers the whole card so anywhere (thumbnail, title,
          description) opens the detail page, while the Live/Code anchors above
          stay independently clickable via z-index. */}
      <Link to={`/projects/${slug}`} className="project-card-cover" aria-label={`View details for ${title}`} />
    </article>
  )
}
