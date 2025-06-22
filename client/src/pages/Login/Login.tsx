import { useState, useEffect, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../contexts/UserContext"
import { jwtDecode } from "jwt-decode"
import Logo from "../../assets/Logo_cidwi.png"
import "./Login.css"

interface LoginResponse {
  token?: string
  message?: string
}

interface DecodedToken {
  id: number
  role: string
  exp: number
  iat: number
}

const Login = () => {
  const { user, setUserFromLogin } = useUser()
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      })

      const data: LoginResponse = await response.json()

      if (!response.ok) {
        switch (response.status) {
          case 400:
            setError("Veuillez remplir tous les champs.")
            break
          case 401:
            setError("Nom d'utilisateur ou mot de passe incorrect.")
            break
          case 500:
            setError("Erreur serveur. Veuillez réessayer plus tard.")
            break
          default:
            setError(data.message || "Erreur inconnue.")
        }
        return
      }

      if (data.token) {
        const decoded = jwtDecode<DecodedToken>(data.token)

        const user = {
          id: decoded.id,
          login: login,
          role: decoded.role,
        }

        setUserFromLogin(user, data.token)
        navigate("/")
      } else {
        setError("Réponse invalide du serveur.")
      }
    } catch {
      setError("Connexion impossible. Vérifiez votre réseau.")
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={Logo} alt="Logo de la plateforme" className="login-logo" />
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  )
}

export default Login
