import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import PrivateRoute from './routes/PrivateRoute'
import { ThemeProvider } from './contexts/ThemeContext'
import { UserProvider } from './contexts/UserContext'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import ExercisePage from './pages/ExercicePage/ExercisePage'

export const App = () => {

  return (
    <UserProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="/exercise/:id" element={<ExercisePage />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider> 
  )
}

export default App
