import { useEffect, useState, FormEvent } from "react"
import { useUser } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import { Chapter, Lesson } from "../../types/course"
import "./Manager.css"

const LessonManager = () => {
  const { token, user } = useUser()
  const navigate = useNavigate()

  const [lessons, setLessons] = useState<Lesson[]>([])
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [lessonTitle, setLessonTitle] = useState("")
  const [lessonLink, setLessonLink] = useState("")
  const [lessonLevel, setLessonLevel] = useState("")
  const [lessonLang, setLessonLang] = useState("")
  const [selectedChapterId, setSelectedChapterId] = useState<number | "">("")
  const [editingLessonId, setEditingLessonId] = useState<number | null>(null)

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/")
    } else {
      fetchLessons()
      fetchChapters()
    }
  }, [user])

  const fetchLessons = async () => {
    if (!token) return
    try {
      const res = await fetch("http://localhost:3000/lesson", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data: Lesson[] = await res.json()
      setLessons(data)
    } catch {
      setError("Erreur lors du chargement des leçons")
    }
  }

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

  const handleDeleteLesson = async (id: number) => {
    if (!token) return
    if (!window.confirm("Supprimer cette leçon ?")) return

    try {
      const res = await fetch(`http://localhost:3000/lesson/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error("Erreur lors de la suppression")
      setMessage("Leçon supprimée")
      fetchLessons()
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message)
      else setError("Erreur inconnue")
    }
  }

  const handleEditLesson = (l: Lesson) => {
    setEditingLessonId(l.id)
    setLessonTitle(l.title)
    setLessonLink(l.link)
    setLessonLevel(l.level)
    setLessonLang(l.languages)
    setSelectedChapterId(l.chapter?.id || "")
  }

  const handleLessonSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!token || selectedChapterId === "") return

    try {
      const method = editingLessonId ? "PUT" : "POST"
      const url = editingLessonId
        ? `http://localhost:3000/lesson/${editingLessonId}`
        : "http://localhost:3000/lesson"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: lessonTitle,
          link: lessonLink,
          level: lessonLevel,
          languages: lessonLang,
          chapterId: selectedChapterId,
        }),
      })

      const contentType = res.headers.get("Content-Type")
      const data = contentType?.includes("application/json") ? await res.json() : await res.text()

      if (!res.ok) {
        const errorMsg = typeof data === "string" ? data : data?.error || "Erreur serveur"
        throw new Error(errorMsg)
      }

      setMessage(editingLessonId ? "Leçon modifiée" : "Leçon ajoutée")
      setError("")
      setLessonTitle("")
      setLessonLink("")
      setLessonLevel("")
      setLessonLang("")
      setSelectedChapterId("")
      setEditingLessonId(null)
      fetchLessons()
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message)
      else setError("Erreur inconnue")
    }
  }

  return (
    <div className="manager-container">
      <h2>Gestion des leçons</h2>
      <form className="manager-form" onSubmit={handleLessonSubmit}>
        <input className="manager-input" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} placeholder="Titre de la leçon" required />
        <input className="manager-input" value={lessonLink} onChange={(e) => setLessonLink(e.target.value)} placeholder="Lien vidéo (http://...)" required />
        <input className="manager-input" value={lessonLevel} onChange={(e) => setLessonLevel(e.target.value)} placeholder="Niveau" required />
        <input className="manager-input" value={lessonLang} onChange={(e) => setLessonLang(e.target.value)} placeholder="Langage" required />
        <select className="manager-select" value={selectedChapterId} onChange={(e) => setSelectedChapterId(Number(e.target.value))} required>
          <option value="">Sélectionnez un chapitre</option>
          {chapters.map((ch) => (
            <option key={ch.id} value={ch.id}>{ch.title}</option>
          ))}
        </select>
        <button className="manager-button" type="submit">{editingLessonId ? "Modifier" : "Créer"}</button>
        {editingLessonId && (
          <button className="manager-button cancel-button" type="button" onClick={() => {
            setEditingLessonId(null)
            setLessonTitle("")
            setLessonLink("")
            setLessonLevel("")
            setLessonLang("")
            setSelectedChapterId("")
          }}>Annuler</button>
        )}
      </form>

      <table className="manager-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Chapitre</th>
            <th>Niveau</th>
            <th>Langage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((l) => (
            <tr key={l.id} className="manager-row">
              <td className="manager-cell">{l.id}</td>
              <td className="manager-cell">{l.title}</td>
              <td className="manager-cell">{l.chapter?.title}</td>
              <td className="manager-cell">{l.level}</td>
              <td className="manager-cell">{l.languages}</td>
              <td className="manager-cell manager-buttons">
                <button className="manager-button edit-button" onClick={() => handleEditLesson(l)}>Modifier</button>
                <button className="manager-button delete-button" onClick={() => handleDeleteLesson(l.id)}>Supprimer</button>
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

export default LessonManager
