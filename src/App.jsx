import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import OrderPage from './pages/OrderPage'
import '../src/styles/global.css'
import InventaryPage from './pages/InventaryPage'
import StadistiscsPage from './pages/StadistiscsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrderPage/>}/> 
        <Route path="/inventario" element={<InventaryPage/>}/>
        <Route path="/estadisticas" element={<StadistiscsPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
