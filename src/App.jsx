import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import LocationPicker from './components/LocationPicker'
import './index.css'
import { fetchAddress } from './hooks/fetchAddress'
import Shop from './components/Shop'
import Header from './components/Header'

function Home() {
  const [geometry, setGeometry] = useState(null)
  const navigate = useNavigate()

  const handleClick = async () => {
    if (!geometry) return
    const { lng, lat } = geometry
    const address = await fetchAddress(lng, lat)

    if (address) {
      // pass address or geometry using route state
      navigate('/select-supermarket', { state: { address, geometry } })
    }
  }

  return (
    <div>
      <h2 className='mx-auto flex max-w-sm my-4'>📍 Choose your location by clicking on the map</h2>
      <LocationPicker setGeometry={setGeometry} />
      <button
        onClick={handleClick}
        className="bg-blue-600 px-4 py-2 mx-auto text-white flex max-w-sm my-5 rounded hover:bg-blue-700"
      >
        Confirm Location
      </button>
    </div>
  )
}

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select-supermarket" element={<Shop />} />
      </Routes>
    </div>

  )
}

export default App
