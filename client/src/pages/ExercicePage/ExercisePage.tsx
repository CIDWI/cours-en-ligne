import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Exercise, Lesson } from "../../types/course"
import MonacoEditor from "@monaco-editor/react"
import "./ExercisePage.css"


const ExercisePage = () => {
  const { id } = useParams<{ id: string }>()
  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [activeTab, setActiveTab] = useState<"lesson" | "exercise">("exercise")
  const [code, setCode] = useState("// Écris ton code ici")

  useEffect(() => {
    const fetchData = async () => {
      const resEx = await fetch(`http://localhost:3000/exercise/${id}`)
      const exData: Exercise = await resEx.json()
      setExercise(exData)
      setLesson(exData.lesson)
    }
    fetchData()
  }, [id])

  return (
    <div className="exercise-page">
      <div className="editor-pane">
        <MonacoEditor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={(val: string | undefined) => setCode(val ?? "")}
        />
      </div>

      <div className="side-pane">
        <div className="tabs">
          <button onClick={() => setActiveTab("lesson")}>Leçon</button>
          <button onClick={() => setActiveTab("exercise")}>Exercice</button>
        </div>
        <div className="tab-content">
          {activeTab === "lesson" && lesson && (
            <div>
              <h2>{lesson.title}</h2>
              <p>Niveau : {lesson.level}</p>
              <iframe src={lesson.link} width="100%" height="250px" />
            </div>
          )}
          {activeTab === "exercise" && exercise && (
            <div>
              <h2>{exercise.title}</h2>
              <p>{exercise.content}</p>
              {exercise.imageLink && <img src={exercise.imageLink} alt="Illustration" />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExercisePage
