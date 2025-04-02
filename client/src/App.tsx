import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import { ThemeProvider } from './ThemeContext'

export const App = () => {

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
