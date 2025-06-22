import { useEffect, useState, FormEvent } from "react"
import { useUser } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom"

interface Course {
  id: number
  title: string
}

const CourseManager = () => {
  const { token, user } = useUser()
  const navigate = useNavigate()

  const [courses, setCourses] = useState<Course[]>([])
  const [courseTitle, setCourseTitle] = useState("")
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null)

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/")
    } else {
      fetchCourses()
    }
  }, [user])

  const fetchCourses = async () => {
    if (!token) return
    try {
      const res = await fetch("http://localhost:3000/course", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data: Course[] = await res.json()
      setCourses(data)
    } catch {
      setError("Erreur lors du chargement des cours")
    }
  }

  const handleDeleteCourse = async (id: number) => {
    if (!token) return
    if (!window.confirm("Supprimer ce cours ?")) return

    try {
      const res = await fetch(`http://localhost:3000/course/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error("Erreur lors de la suppression")
      setMessage("Cours supprimé")
      fetchCourses()
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message)
      else setError("Erreur inconnue")
    }
  }

  const handleEditCourse = (c: Course) => {
    setEditingCourseId(c.id)
    setCourseTitle(c.title)
  }

  const handleCourseSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!token) return

    try {
      const method = editingCourseId ? "PUT" : "POST"
      const url = editingCourseId
        ? `http://localhost:3000/course/${editingCourseId}`
        : "http://localhost:3000/course"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: courseTitle }),
      })

      const contentType = res.headers.get("Content-Type")
      const data = contentType?.includes("application/json") ? await res.json() : await res.text()

      if (!res.ok) {
        const errorMsg = typeof data === "string" ? data : data?.error || "Erreur serveur"
        throw new Error(errorMsg)
      }

      setMessage(editingCourseId ? "Cours modifié" : "Cours ajouté")
      setError("")
      setCourseTitle("")
      setEditingCourseId(null)
      fetchCourses()
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message)
      else setError("Erreur inconnue")
    }
  }

  return (
    <div>
      <h2>Gestion des cours</h2>
      <form onSubmit={handleCourseSubmit}>
        <input value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} placeholder="Titre du cours" required />
        <button type="submit">{editingCourseId ? "Modifier" : "Créer"}</button>
        {editingCourseId && (
          <button type="button" onClick={() => {
            setEditingCourseId(null)
            setCourseTitle("")
          }}>Annuler</button>
        )}
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.title}</td>
              <td>
                <button onClick={() => handleEditCourse(c)}>Modifier</button>
                <button onClick={() => handleDeleteCourse(c.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default CourseManager
