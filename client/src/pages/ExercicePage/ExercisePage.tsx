import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Exercise } from "../../types/course"
import MonacoEditor from "@monaco-editor/react"
import { useTheme } from "../../contexts/ThemeContext"
import { useUser } from "../../contexts/UserContext"
import "./ExercisePage.css"

const ExercisePage = () => {
  const { id } = useParams<{ id: string }>()
  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [code, setCode] = useState("// Écris ton code ici")
  const [activeTab, setActiveTab] = useState<"lesson" | "exercise">("lesson")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { darkMode } = useTheme()
  const { user, token } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const res = await fetch(`http://localhost:3000/exercise/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          throw new Error(`Erreur ${res.status} : ${res.statusText}`)
        }

        const data: Exercise = await res.json()
        setExercise(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue.")
      } finally {
        setLoading(false)
      }
    }

    if (id && token) {
      fetchExercise()
    }
  }, [id, token])

  const handleValidation = async () => {
    if (!exercise?.lesson?.id || !user || !token) return

    try {
      await fetch("http://localhost:3000/advancement/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          lessonId: exercise.lesson.id,
          isDone: true,
        }),
      })
    } catch (e) {
      console.warn("Erreur d'envoi de l'avancement", e)
    } finally {
      navigate("/")
    }
  }

  return (
    <div className="exercise-page">
      <button className="return-button" onClick={() => navigate("/")}>
        ← Retour
      </button>

      <div className="exercise-wrapper">
        <div className="editor-pane">
          <MonacoEditor
            height="100%"
            defaultLanguage="javascript"
            theme={darkMode ? "vs-dark" : "light"}
            value={code}
            onChange={(val) => setCode(val ?? "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              padding: { top: 20, bottom: 20 },
            }}
          />
        </div>

        <div className="exercise-content">
          <div className="tabs">
            <button
              onClick={() => setActiveTab("lesson")}
              className={activeTab === "lesson" ? "active" : ""}
            >
              Leçon
            </button>
            <button
              onClick={() => setActiveTab("exercise")}
              className={activeTab === "exercise" ? "active" : ""}
            >
              Exercice
            </button>
          </div>

          <div className="tab-content">
            {loading && <p>Chargement...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && exercise && activeTab === "lesson" && (
              <div>
                <h2>{exercise.lesson.title}</h2>
                <p>Niveau : {exercise.lesson.level}</p>
                <iframe src={exercise.lesson.link} title="lesson" />
              </div>
            )}

            {!loading && !error && exercise && activeTab === "exercise" && (
              <div>
                <h2>{exercise.title}</h2>
                <p>{exercise.content}</p>
                {exercise.imageLink && (
                  <img
                    src={exercise.imageLink}
                    alt="Illustration"
                    style={{ maxWidth: "100%", marginTop: "1rem" }}
                  />
                )}

                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                  <button onClick={handleValidation} className="next-button">
                    Suivant
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExercisePage
