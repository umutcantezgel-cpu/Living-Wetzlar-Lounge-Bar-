import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Menu from './pages/Menu'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import NotFound from './pages/404'
import Offline from './pages/Offline'

// Page name mapping for layout
const PAGE_NAMES = {
  '/': 'Home',
  '/about': 'About',
  '/services': 'Services',
  '/menu': 'Menu',
  '/gallery': 'Gallery',
  '/contact': 'Contact',
  '/impressum': 'Impressum',
  '/datenschutz': 'Datenschutz'
}

function App() {
  const location = useLocation()
  const currentPageName = PAGE_NAMES[location.pathname] || 'Home'

  return (
    <Layout currentPageName={currentPageName}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/offline" element={<Offline />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
