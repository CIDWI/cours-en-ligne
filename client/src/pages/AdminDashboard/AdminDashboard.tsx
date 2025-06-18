import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../contexts/UserContext"
import "./AdminDashboard.css"

interface Course {
  id: number
  title: string
}

interface Chapter {
  id: number
  title: string
  course: Course
}

const AdminDashboard = () => {
  const { user, token } = useUser()
  const navigate = useNavigate()
  const [tab, setTab] = useState<"user" | "course" | "chapter" | "lesson">("user")

  // States pour les formulaires
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [role, setRole] = useState("user")

  const [courseTitle, setCourseTitle] = useState("")
  const [chapterTitle, setChapterTitle] = useState("")
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null)

  const [lessonTitle, setLessonTitle] = useState("")
  const [lessonLink, setLessonLink] = useState("")
  const [lessonLevel, setLessonLevel] = useState("")
  const [lessonLang, setLessonLang] = useState("")
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null)

  const [exerciseTitle, setExerciseTitle] = useState("")
  const [exerciseContent, setExerciseContent] = useState("")
  const [exerciseImageLink, setExerciseImageLink] = useState("")

  const [courses, setCourses] = useState<Course[]>([])
  const [chapters, setChapters] = useState<Chapter[]>([])

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/")
    } else {
      fetchCoursesAndChapters()
    }
  }, [user])

  const fetchCoursesAndChapters = async () => {
    if (!token) return

    try {
      const [courseRes, chapterRes] = await Promise.all([
        fetch("http://localhost:3000/course", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("http://localhost:3000/chapter", { headers: { Authorization: `Bearer ${token}` } })
      ])
      const [courseData, chapterData] = await Promise.all([courseRes.json(), chapterRes.json()])
      setCourses(courseData)
      setChapters(chapterData)
    } catch (err) {
      console.error("Erreur lors du chargement des données", err)
    }
  }

  const postData = async (url: string, body: object) => {
    if (!token) return

    setError("")
    setMessage("")

    try {
      const res = await fetch(`http://localhost:3000/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data?.error || "Erreur serveur")
      }
      setMessage("Ajout réussi ✅")
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes("login")) setError("Le login existe déjà ❌")
        else setError(err.message)
      }
    }
  }

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Admin</h1>

      {/* Onglets */}
      <div className="admin-daboard-tabs-button">
        <button onClick={() => setTab("user")}>Créer un utilisateur</button>
        <button onClick={() => setTab("course")}>Créer un cours</button>
        <button onClick={() => setTab("chapter")}>Créer un chapitre</button>
        <button onClick={() => setTab("lesson")}>Créer une leçon + exercice</button>
      </div>

      {/* Formulaire utilisateur */}
      {tab === "user" && (
        <form onSubmit={(e) => {
          e.preventDefault()
          postData("user", { login, password, firstName, lastName, role })
        }}>
          <input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Login" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" />
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom" />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Utilisateur</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Créer</button>
        </form>
      )}

      {/* Formulaire cours */}
      {tab === "course" && (
        <form onSubmit={(e) => {
          e.preventDefault()
          postData("course", { title: courseTitle })
        }}>
          <input value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} placeholder="Titre du cours" required />
          <button type="submit">Créer</button>
        </form>
      )}

      {/* Formulaire chapitre */}
      {tab === "chapter" && (
        <form onSubmit={(e) => {
          e.preventDefault()
          if (selectedCourseId) {
            postData("chapter", { title: chapterTitle, courseId: selectedCourseId })
          }
        }}>
          <input value={chapterTitle} onChange={(e) => setChapterTitle(e.target.value)} placeholder="Titre du chapitre" required />
          <select value={selectedCourseId ?? ""} onChange={(e) => setSelectedCourseId(Number(e.target.value))} required>
            <option value="">Choisir un cours</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
          <button type="submit">Créer</button>
        </form>
      )}

      {/* Formulaire leçon + exercice */}
      {tab === "lesson" && (
        <form onSubmit={(e) => {
          e.preventDefault()
          if (selectedChapterId) {
            postData("lesson", {
              title: lessonTitle,
              link: lessonLink,
              level: lessonLevel,
              languages: lessonLang,
              chapterId: selectedChapterId,
              exercise: {
                title: exerciseTitle,
                content: exerciseContent,
                imageLink: exerciseImageLink,
              },
            })
          }
        }}>
          <input value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} placeholder="Titre leçon" required />
          <input value={lessonLink} onChange={(e) => setLessonLink(e.target.value)} placeholder="Lien vidéo" required />
          <input value={lessonLevel} onChange={(e) => setLessonLevel(e.target.value)} placeholder="Niveau" required />
          <input value={lessonLang} onChange={(e) => setLessonLang(e.target.value)} placeholder="Langage" required />
          <select value={selectedChapterId ?? ""} onChange={(e) => setSelectedChapterId(Number(e.target.value))} required>
            <option value="">Choisir un chapitre</option>
            {chapters.map(chapter => (
              <option key={chapter.id} value={chapter.id}>{chapter.title}</option>
            ))}
          </select>
          <h3>Exercice lié</h3>
          <input value={exerciseTitle} onChange={(e) => setExerciseTitle(e.target.value)} placeholder="Titre exercice" required />
          <input value={exerciseContent} onChange={(e) => setExerciseContent(e.target.value)} placeholder="Consigne" required />
          <input value={exerciseImageLink} onChange={(e) => setExerciseImageLink(e.target.value)} placeholder="Lien image" />
          <button type="submit">Créer leçon + exercice</button>
        </form>
      )}

      {/* Messages */}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}

export default AdminDashboard
