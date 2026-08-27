import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import Projects from '../components/Projects.jsx'

export default function Home() {
  const location = useLocation()

  // Supports Header's "Projects" link (to="/#projects") whether you're already
  // on "/" or navigating there from a project detail page.
  useEffect(() => {
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView()
    }
  }, [location])

  return (
    <>
      <Hero />
      <Projects />
    </>
  )
}
