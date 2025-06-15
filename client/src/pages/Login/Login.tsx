import { useState, useEffect, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../contexts/UserContext"
import Logo from "../../assets/Logo_cidwi.png"
import "./Login.css"

interface LoginResponse {
  token: string
  message?: string
}

const Login = () => {
  const { user, setUserFromToken } = useUser()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
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
        body: JSON.stringify({ email, password }),
      })

      const data: LoginResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Échec de la connexion")
      }

      localStorage.setItem("token", data.token)
      setUserFromToken(data.token)
      navigate("/")
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Une erreur inattendue est survenue.")
      }
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={Logo} alt="Logo de la plateforme" className="login-logo" />
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
