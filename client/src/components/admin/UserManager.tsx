import { useEffect, useState, FormEvent } from "react"
import { useUser } from "../../contexts/UserContext"
import { Advancement } from '../../types/advancement'
import { User } from '../../types/user'


const UserManager = () => {
  const { token } = useUser()
  const [users, setUsers] = useState<User[]>([])
  const [login, setLogin] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [role, setRole] = useState<string>("user")
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [advancements, setAdvancements] = useState<Record<number, Advancement[]>>({})

  const fetchUsers = async () => {
    const res = await fetch("/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    setUsers(data)
  }

  const fetchAdvancements = async (userId: number) => {
    const res = await fetch(`/api/advancement/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    setAdvancements(prev => ({ ...prev, [userId]: data }))
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const method = selectedUserId ? "PUT" : "POST"
    const url = selectedUserId ? `/api/user/${selectedUserId}` : "/api/user"

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
    const res = await fetch(`/api/user/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.ok) {
      await fetchUsers()
    }
  }

  return (
    <div>
      <h2>Utilisateurs</h2>
      <form onSubmit={handleSubmit}>
        <input value={login} onChange={e => setLogin(e.target.value)} placeholder="Login" required />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" type="password" required={!selectedUserId} />
        <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Prénom" required />
        <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Nom" required />
        {!selectedUserId && (
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="user">Utilisateur</option>
            <option value="admin">Admin</option>
          </select>
        )}
        <button type="submit">{selectedUserId ? "Modifier" : "Créer"}</button>
        {selectedUserId && <button type="button" onClick={resetForm}>Annuler</button>}
      </form>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.firstName} {user.lastName} ({user.login})
            <button onClick={() => handleEdit(user)}>✏️</button>
            <button onClick={() => handleDelete(user.id)}>🗑️</button>
            <button onClick={() => fetchAdvancements(user.id)}>Voir l'avancement</button>
            {advancements[user.id] && (
              <ul>
                {advancements[user.id].map(adv => (
                  <li key={adv.id}>{adv.lesson.title} - {adv.isDone ? "✅ Terminé" : "⏳ En cours"}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserManager