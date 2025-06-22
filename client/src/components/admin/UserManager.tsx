import { useEffect, useState, FormEvent } from "react"
import { useUser } from "../../contexts/UserContext"
import { User } from '../../types/user'
import "./Manager.css"

const UserManager = () => {
  const { token } = useUser()
  const [users, setUsers] = useState<User[]>([])
  const [login, setLogin] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [role, setRole] = useState<string>("user")
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const method = selectedUserId ? "PUT" : "POST"
    const url = selectedUserId ? `http://localhost:3000/user/${selectedUserId}` : "http://localhost:3000/user"

    const body: Partial<User> & { password?: string } = {
      login,
      password,
      firstName,
      lastName,
      ...(selectedUserId ? {} : { role }),
    }

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      await fetchUsers()
      resetForm()
    } else {
      const errorRes = await res.json()
      alert(errorRes.error)
    }
  }

  const resetForm = () => {
    setSelectedUserId(null)
    setLogin("")
    setPassword("")
    setFirstName("")
    setLastName("")
    setRole("user")
  }

  const handleEdit = (user: User) => {
    setSelectedUserId(user.id)
    setLogin(user.login)
    setFirstName(user.firstName)
    setLastName(user.lastName)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Confirmer la suppression ?")) return
    const res = await fetch(`http://localhost:3000/user/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.ok) {
      await fetchUsers()
    }
  }

  return (
    <div className="manager-container">
      <h2>Utilisateurs</h2>
      <form className="manager-form" onSubmit={handleSubmit}>
        <input className="manager-input" value={login} onChange={e => setLogin(e.target.value)} placeholder="Login" required />
        <input className="manager-input" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" type="password" required={!selectedUserId} />
        <input className="manager-input" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Prénom" required />
        <input className="manager-input" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Nom" required />
        {!selectedUserId && (
          <select className="manager-select" value={role} onChange={e => setRole(e.target.value)}>
            <option value="user">Utilisateur</option>
            <option value="admin">Admin</option>
          </select>
        )}
        <button className="manager-button" type="submit">{selectedUserId ? "Modifier" : "Créer"}</button>
        {selectedUserId && <button className="manager-button cancel-button" type="button" onClick={resetForm}>Annuler</button>}
      </form>

      <table className="manager-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Login</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="manager-row">
              <td className="manager-cell">{user.id}</td>
              <td className="manager-cell">{user.lastName}</td>
              <td className="manager-cell">{user.firstName}</td>
              <td className="manager-cell">{user.login}</td>
              <td className="manager-cell">{user.role}</td>
              <td className="manager-cell manager-buttons">
                <button className="manager-button edit-button" onClick={() => handleEdit(user)}>Modifier</button>
                <button className="manager-button delete-button" onClick={() => handleDelete(user.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserManager
