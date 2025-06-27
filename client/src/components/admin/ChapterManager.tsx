import { useEffect, useState, FormEvent } from "react"
import { useUser } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import { Course, Chapter } from "../../types/course"
import "./Manager.css"

const ChapterManager = () => {
  const { token, user } = useUser()
  const navigate = useNavigate()

  const [chapters, setChapters] = useState<Chapter[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [chapterTitle, setChapterTitle] = useState("")
  const [selectedCourseId, setSelectedCourseId] = useState<number | "">("")
  const [editingChapterId, setEditingChapterId] = useState<number | null>(null)

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/")
    } else {
      fetchChapters()
      fetchCourses()
    }
  }, [user])

  const fetchChapters = async () => {
    if (!token) return
    try {
      const res = await fetch("http://localhost:3000/chapter", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data: Chapter[] = await res.json()
      setChapters(data)
    } catch {
      setError("Erreur lors du chargement des chapitres")
    }
  }

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

  const handleDeleteChapter = async (id: number) => {
    if (!token) return
    if (!window.confirm("Supprimer ce chapitre ?")) return

    try {
      const res = await fetch(`http://localhost:3000/chapter/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error("Erreur lors de la suppression")
      setMessage(`Chapitre supprimé`)
      fetchChapters()
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message)
      else setError("Erreur inconnue")
    }
  }

  const handleEditChapter = (c: Chapter) => {
    setEditingChapterId(c.id)
    setChapterTitle(c.title)
    setSelectedCourseId(c.course?.id || "")
  }

  const handleChapterSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!token || selectedCourseId === "") return

    try {
      const method = editingChapterId ? "PUT" : "POST"
      const url = editingChapterId
        ? `http://localhost:3000/chapter/${editingChapterId}`
        : "http://localhost:3000/chapter"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: chapterTitle,
          courseId: selectedCourseId,
        }),
      })

      const contentType = res.headers.get("Content-Type")
      const data = contentType?.includes("application/json") ? await res.json() : await res.text()

      if (!res.ok) {
        const errorMsg = typeof data === "string" ? data : data?.error || "Erreur serveur"
        throw new Error(errorMsg)
      }

      setMessage(editingChapterId ? "Chapitre modifié" : "Chapitre ajouté")
      setError("")
      setChapterTitle("")
      setSelectedCourseId("")
      setEditingChapterId(null)
      fetchChapters()
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message)
      else setError("Erreur inconnue")
    }
  }

  return (
    <div className="manager-container">
      <h2>Gestion des chapitres</h2>
      <form className="manager-form" onSubmit={handleChapterSubmit}>
        <input className="manager-input" value={chapterTitle} onChange={(e) => setChapterTitle(e.target.value)} placeholder="Titre du chapitre" required />
        <select className="manager-select" value={selectedCourseId} onChange={(e) => setSelectedCourseId(Number(e.target.value))} required>
          <option value="">Sélectionnez un cours</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
        <button className="manager-button" type="submit">{editingChapterId ? "Modifier" : "Créer"}</button>
        {editingChapterId && (
          <button className="manager-button cancel-button" type="button" onClick={() => {
            setEditingChapterId(null)
            setChapterTitle("")
            setSelectedCourseId("")
          }}>Annuler</button>
        )}
      </form>

      <table className="manager-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Cours</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {chapters.map((c) => (
            <tr key={c.id} className="manager-row">
              <td className="manager-cell">{c.id}</td>
              <td className="manager-cell">{c.title}</td>
              <td className="manager-cell">{c.course?.title}</td>
              <td className="manager-cell manager-buttons">
                <button className="manager-button edit-button" onClick={() => handleEditChapter(c)}>Modifier</button>
                <button className="manager-button delete-button" onClick={() => handleDeleteChapter(c.id)}>Supprimer</button>
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

export default ChapterManager
