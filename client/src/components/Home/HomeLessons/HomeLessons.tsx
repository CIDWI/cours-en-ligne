import { useState } from "react"
import { Lesson } from "../../../types/course"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../../contexts/UserContext"
import "./HomeLessons.css"

const LessonItem: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const navigate = useNavigate()
  const { user, token } = useUser()
  const [isCompleted, setIsCompleted] = useState(lesson.isDone) // 👈 local override

  const handleClick = async () => {
    if (!lesson.exercise?.id || !user || !token) return

    try {
      await fetch("http://localhost:3000/advancement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          lessonId: lesson.id,
          isDone: true,
        }),
      })

      setIsCompleted(true) // 👈 forcer la mise à jour locale
    } catch (error) {
      console.warn("Erreur ignorée :", error)
    } finally {
      navigate(`/exercise/${lesson.exercise.id}`)
    }
  }

  const getButtonLabel = () => {
    if (!lesson.exercise) return "Pas d'exercice"
    return isCompleted ? "Terminé" : "Start"
  }

  const getButtonClass = () => {
    if (!lesson.exercise) return "lesson-button-disabled"
    return isCompleted ? "lesson-done-button" : "lesson-button-pending"
  }

  return (
    <div className="lesson-container">
      <span>{lesson.title}</span>
      <button
        className={`lesson-button ${getButtonClass()}`}
        onClick={handleClick}
        disabled={!lesson.exercise}
      >
        {getButtonLabel()}
      </button>
    </div>
  )
}

export default LessonItem