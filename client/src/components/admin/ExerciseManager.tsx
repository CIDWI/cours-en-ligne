import { useEffect, useState, FormEvent } from "react"
import { useUser } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import { Exercise, Lesson } from "../../types/course"

import "./Manager.css" // Ajout de l'import CSS

const ExerciseManager = () => {
  const { token, user } = useUser()
  const navigate = useNavigate()

  const [exercises, setExercises] = useState<Exercise[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [exerciseTitle, setExerciseTitle] = useState("")
  const [exerciseContent, setExerciseContent] = useState("")
  const [exerciseImageLink, setExerciseImageLink] = useState("")
  const [selectedLessonId, setSelectedLessonId] = useState<number | "">("")
  const [editingExerciseId, setEditingExerciseId] = useState<number | null>(null)

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/")
    } else {
      fetchExercises()
      fetchLessons()
    }
  }, [user])

  const fetchExercises = async () => {
    if (!token) return
    try {
      const res = await fetch("http://localhost:3000/exercise", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data: Exercise[] = await res.json()
      setExercises(data)
    } catch {
      setError("Erreur lors du chargement des exercices")
    }
  }

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

  const handleDeleteExercise = async (id: number) => {
    if (!token) return
    if (!window.confirm("Supprimer cet exercice ?")) return

    try {
      const res = await fetch(`http://localhost:3000/exercise/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error("Erreur lors de la suppression")
      setMessage("Exercice supprimé")
      fetchExercises()
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message)
      else setError("Erreur inconnue")
    }
  }

  const handleEditExercise = (e: Exercise) => {
    setEditingExerciseId(e.id)
    setExerciseTitle(e.title)
    setExerciseContent(e.content)
    setExerciseImageLink(e.imageLink)
    setSelectedLessonId(e.lesson?.id || "")
  }

  const handleExerciseSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!token || selectedLessonId === "") return

    try {
      const method = editingExerciseId ? "PUT" : "POST"
      const url = editingExerciseId
        ? `http://localhost:3000/exercise/${editingExerciseId}`
        : "http://localhost:3000/exercise"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: exerciseTitle,
          content: exerciseContent,
          imageLink: exerciseImageLink,
          lessonId: selectedLessonId,
        }),
      })

      const contentType = res.headers.get("Content-Type")
      const data = contentType?.includes("application/json") ? await res.json() : await res.text()

      if (!res.ok) {
        const errorMsg = typeof data === "string" ? data : data?.error || "Erreur serveur"
        throw new Error(errorMsg)
      }

      setMessage(editingExerciseId ? "Exercice modifié" : "Exercice ajouté")
      setError("")
      setExerciseTitle("")
      setExerciseContent("")
      setExerciseImageLink("")
      setSelectedLessonId("")
      setEditingExerciseId(null)
      fetchExercises()
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message)
      else setError("Erreur inconnue")
    }
  }

  return (
    <div className="manager-container">
      <h2>Gestion des exercices</h2>
      <form onSubmit={handleExerciseSubmit} className="manager-form">
        <input value={exerciseTitle} onChange={(e) => setExerciseTitle(e.target.value)} placeholder="Titre de l'exercice" required />
        <input value={exerciseContent} onChange={(e) => setExerciseContent(e.target.value)} placeholder="Consigne" required />
        <input value={exerciseImageLink} onChange={(e) => setExerciseImageLink(e.target.value)} placeholder="Lien de l'image" required />
        <select value={selectedLessonId} onChange={(e) => setSelectedLessonId(Number(e.target.value))} required>
          <option value="">Sélectionnez une leçon</option>
          {lessons.map((l) => (
            <option key={l.id} value={l.id}>{l.title}</option>
          ))}
        </select>
        <button type="submit">{editingExerciseId ? "Modifier" : "Créer"}</button>
        {editingExerciseId && (
          <button type="button" onClick={() => {
            setEditingExerciseId(null)
            setExerciseTitle("")
            setExerciseContent("")
            setExerciseImageLink("")
            setSelectedLessonId("")
          }}>Annuler</button>
        )}
      </form>

      <table className="manager-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Leçon</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((e) => (
            <tr key={e.id} className="manager-row">
              <td className="manager-cell">{e.id}</td>
              <td className="manager-cell">{e.title}</td>
              <td className="manager-cell">{e.lesson?.title}</td>
              <td className="manager-cell manager-buttons">
                <button className="manager-button edit-button" onClick={() => handleEditExercise(e)}>Modifier</button>
                <button className="manager-button delete-button" onClick={() => handleDeleteExercise(e.id)}>Supprimer</button>
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

export default ExerciseManager
