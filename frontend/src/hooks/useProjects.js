import { useEffect, useState } from 'react'
import { fetchProjects, FALLBACK_PROJECTS } from '../api/projects.js'

// Shared by the Projects grid and the project detail page so both agree on
// the same data and the same "backend not up yet" fallback behavior.
export function useProjects() {
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
        setSource('placeholder')
      })

    return () => controller.abort()
  }, [])

  return { projects, source }
}
