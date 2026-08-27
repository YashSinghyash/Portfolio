import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container">
        <span>© {year} Yash Pratap Singh</span>
        <Link to="/#home">Back to top</Link>
      </div>
    </footer>
  )
}
