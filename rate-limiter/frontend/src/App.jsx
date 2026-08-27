import { Route, Routes, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import ClientDetail from './pages/ClientDetail.jsx'

export default function App() {
  return (
    <>
      <header className="app-header">
        <div className="container">
          <Link to="/" className="app-header-title">
            <h1>API Usage Tracker & Rate Limiter</h1>
          </Link>
          <span className="subtitle">Token Bucket · per-client limits</span>
        </div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients/:clientKey" element={<ClientDetail />} />
        </Routes>
      </main>
    </>
  )
}
