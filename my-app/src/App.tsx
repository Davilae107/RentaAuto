import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Component/Login'
import Signup from './Component/signup'
import MainApp from './App/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<MainApp />} />
      </Routes>
    </Router>
  )
}

export default App