import { Routes, Route } from 'react-router-dom'
import './index.css'
import Shop from './pages/Shop'
import Header from './components/Header'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import Footer from './components/Footer' // ✅ add this
import Checkout from './pages/Checkout'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select-supermarket" element={<Shop />} />
          <Route path="/:category" element={<CategoryPage />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer /> {/* ✅ Add here */}
    </div>
  )
}

export default App
