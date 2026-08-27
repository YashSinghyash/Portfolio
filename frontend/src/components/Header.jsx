import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link className="brand" to="/">
          Yash Pratap Singh
        </Link>
        <nav className="main-nav" aria-label="Primary">
          <Link to="/">Home</Link>
          <Link to="/#projects">Projects</Link>
        </nav>
      </div>
    </header>
  )
}
