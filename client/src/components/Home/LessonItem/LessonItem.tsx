import { useNavigate } from "react-router-dom"
import { Lesson } from "../../../types/course"
import { useUser } from "../../../contexts/UserContext"
import "./LessonItem.css"

interface LessonItemProps {
  lesson: Lesson
  isCompleted: boolean
}

const LessonItem: React.FC<LessonItemProps> = ({ lesson, isCompleted }) => {
  const navigate = useNavigate()
  const { user, token } = useUser()

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
    } catch (error) {
      console.warn("Erreur :", error)
    } finally {
      navigate(`/exercise/${lesson.exercise.id}`)
    }
  }

  const label = !lesson.exercise
    ? "Pas d'exercice"
    : isCompleted
    ? "Terminé"
    : "Start"

  const btnClass = !lesson.exercise
    ? "lesson-button-disabled"
    : isCompleted
    ? "lesson-done-button"
    : "lesson-button-pending"

  return (
    <div className="lesson-container">
      <span>{lesson.title}</span>
      <button
        className={`lesson-button ${btnClass}`}
        onClick={handleClick}
        disabled={!lesson.exercise}
      >
        {label}
      </button>
    </div>
  )
}

export default LessonItem
