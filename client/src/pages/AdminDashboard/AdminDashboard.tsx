import { useState } from "react"
import UserManager from "../../components/admin/UserManager"
import ChapterManager from "../../components/admin/ChapterManager"
import CourseManager from "../../components/admin/CourseManager"
import LessonManager from "../../components/admin/LessonManager"
import ExerciseManager from "../../components/admin/ExerciseManager"
import "./AdminDashboard.css"


const AdminDashboard = () => {
  const [tab, setTab] = useState<
    | "user"
    | "course"
    | "chapter"
    | "lesson"
    | "exercise"
  >("user")

  return (
    <div className="admin-dashboard">
      <div className="admin-tabs">
        <button onClick={() => setTab("user")}>Utilisateurs</button>
        <button onClick={() => setTab("course")}>Cours</button>
        <button onClick={() => setTab("chapter")}>Chapitres</button>
        <button onClick={() => setTab("lesson")}>Leçons</button>
        <button onClick={() => setTab("exercise")}>Exercices</button>
      </div>
      <div className="admin-content">
        {tab === "user" && <UserManager />}
        {tab === "course" && <CourseManager />}
        {tab === "chapter" && <ChapterManager />}
        {tab === "lesson" && <LessonManager />}
        {tab === "exercise" && <ExerciseManager />}
      </div>
    </div>
  )
}

export default AdminDashboard
