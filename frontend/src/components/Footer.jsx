export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container">
        <span>© {year} Yash Pratap Singh</span>
        <a href="#home">Back to top</a>
      </div>
    </footer>
  )
}
