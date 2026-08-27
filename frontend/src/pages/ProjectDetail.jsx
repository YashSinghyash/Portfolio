import { Link, useParams } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects.js'
import { getThumbnail } from '../components/thumbnails/index.js'
import { slugify } from '../utils/slug.js'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { projects } = useProjects()
  const project = projects.find((p) => slugify(p.title) === slug)

  if (!project) {
    return (
      <section className="project-detail">
        <div className="container">
          <Link className="back-link" to="/#projects">&larr; All projects</Link>
          <h1>Project not found</h1>
          <p>That one doesn't exist yet — it might still be a placeholder.</p>
        </div>
      </section>
    )
  }

  const { title, description, projectUrl, repoUrl, tag, rationale, rationaleHeading } = project
  const Thumbnail = getThumbnail(title)

  return (
    <section className="project-detail">
      <div className="container">
        <Link className="back-link" to="/#projects">&larr; All projects</Link>

        <div className="project-detail-header">
          <h1>{title}</h1>
          {tag && <span className="project-tag">{tag}</span>}
        </div>

        <p className="project-detail-description">{description}</p>

        <div className="project-detail-preview">
          <h2>Preview</h2>

          {Thumbnail && (
            <div className="project-diagram">
              <Thumbnail />
            </div>
          )}

          {projectUrl && (
            <div className="project-live-embed">
              <iframe src={projectUrl} title={`${title} live demo`} loading="lazy" />
              <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="project-detail-open-link">
                Open in a new tab &#8599;
              </a>
            </div>
          )}

          {!Thumbnail && !projectUrl && (
            <div className="project-card-thumb">Preview coming soon</div>
          )}
        </div>

        {rationale && (
          <div className="project-detail-rationale">
            <h2>{rationaleHeading || 'Design rationale'}</h2>
            <p>{rationale}</p>
          </div>
        )}

        <div className="project-detail-actions">
          {projectUrl && (
            <a className="btn" href={projectUrl}>
              Live demo
            </a>
          )}
          {repoUrl ? (
            <a className="btn" href={repoUrl}>
              View code
            </a>
          ) : (
            <span className="btn btn--disabled">Code coming soon</span>
          )}
        </div>
      </div>
    </section>
  )
}
