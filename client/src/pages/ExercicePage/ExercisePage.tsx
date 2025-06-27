import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Exercise } from "../../types/course"
import MonacoEditor from "@monaco-editor/react"
import { useTheme } from "../../contexts/ThemeContext"
import "./ExercisePage.css"

const ExercisePage = () => {
  const { id } = useParams<{ id: string }>()
  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [code, setCode] = useState("// Écris ton code ici")
  const { darkMode } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/exercise/${id}`)
      const data: Exercise = await res.json()
      setExercise(data)
    }
    fetchData()
  }, [id])

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
            onChange={(val: string | undefined) => setCode(val ?? "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              padding: { top: 20, bottom: 20 },
            }}
          />
        </div>

        <div className="exercise-content">
          {exercise && (
            <div>
              <h2>{exercise.title}</h2>
              <p>{exercise.content}</p>
              {exercise.imageLink && (
                <img src={exercise.imageLink} alt="Illustration" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExercisePage
