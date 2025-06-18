import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTheme } from "../../contexts/ThemeContext"
import { useUser } from "../../contexts/UserContext"
import "./Header.css"
import Logo from "../../assets/Logo_cidwi.png"

export const Header = () => {
  const { darkMode, toggleTheme } = useTheme()
  const { user, logout } = useUser()
  const navbarRef = useRef<HTMLElement | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const getDisplayedName = () => {
    if (!user) return "NOM Prénom"
    if (user.firstName || user.lastName) {
      return `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
    }
    return user.login
  }

  return (
    <header
      ref={navbarRef}
      className={`navbar ${scrolled ? "scrolled" : ""} ${darkMode ? "dark" : ""}`}
    >
      <div className="logo-theme-container">
        <div className="logo-container">
          <Link to="/">
            <img src={Logo} alt="Logo Cidwi" />
            <p>CIDWI</p>
          </Link>
        </div>
        <div className="theme-container">
          <button onClick={toggleTheme}>
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      <div className="user-identity-container">
        <div className="grade-container">Classe</div>
        <div className="user-name-container">
          {getDisplayedName()}
        </div>
        {user && (
          <button onClick={handleLogout} className="logout-button">
            Se déconnecter
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
