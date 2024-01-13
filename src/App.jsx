import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import OrderPage from './pages/OrderPage'
import '../src/styles/global.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrderPage/>} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
