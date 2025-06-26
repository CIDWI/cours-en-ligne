import { useState } from "react"
import { useNavigate } from "react-router-dom"
import UserManager from "../../components/admin/UserManager"
import ChapterManager from "../../components/admin/ChapterManager"
import CourseManager from "../../components/admin/CourseManager"
import LessonManager from "../../components/admin/LessonManager"
import ExerciseManager from "../../components/admin/ExerciseManager"
import FlecheGauche from "../../assets/fleche-gauche.png"
import "./AdminDashboard.css"

const AdminDashboard = () => {
  const [tab, setTab] = useState<
    "user" | "course" | "chapter" | "lesson" | "exercise"
  >("user")

  const navigate = useNavigate()

  return (
    <div className="admin-dashboard">

      <button className="home-button" onClick={() => navigate("/")}>
        <img src={FlecheGauche} alt="Fleche Gauche" />
        Accueil
      </button>

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
