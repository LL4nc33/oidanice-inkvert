import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConversionProvider } from './context/ConversionContext'
import Home from './pages/Home'
import Convert from './pages/Convert'
import Settings from './pages/Settings'

export default function App() {
  return (
    <ConversionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/convert" element={<Convert />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </ConversionProvider>
  )
}
