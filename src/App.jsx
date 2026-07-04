import { Routes, Route, Navigate } from 'react-router-dom'
import Shop from './pages/Shop'
import Header from './components/Header'
import CategoryPage from './pages/CategoryPage'
import Footer from './components/Footer'
import Checkout from './pages/Checkout'
import LocationModal from './components/LocationModal'
import { useDispatch } from 'react-redux'
import { loadLocation } from './redux/globalSlice'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadLocation())
  }, [dispatch])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/select-supermarket" element={<Navigate to="/" replace />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/:category" element={<CategoryPage />} />
        </Routes>
      </main>
      <Footer />
      <LocationModal />
    </div>
  )
}

export default App
