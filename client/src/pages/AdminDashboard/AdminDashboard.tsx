import { useEffect, useState, FormEvent } from "react"
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

interface Lesson {
  id: number
  title: string
  chapter: Chapter
}

const AdminDashboard = () => {
  const { user, token } = useUser()
  const navigate = useNavigate()
  const [tab, setTab] = useState<"user" | "course" | "chapter" | "lesson" | "exercise">("user")

  // États pour les formulaires
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [role, setRole] = useState("user")

  const [courseTitle, setCourseTitle] = useState("")
  const [chapterTitle, setChapterTitle] = useState("")
  const [selectedCourseId, setSelectedCourseId] = useState<number | "">("")

  const [lessonTitle, setLessonTitle] = useState("")
  const [lessonLink, setLessonLink] = useState("")
  const [lessonLevel, setLessonLevel] = useState("")
  const [lessonLang, setLessonLang] = useState("")
  const [selectedChapterId, setSelectedChapterId] = useState<number | "">("")

  const [exerciseTitle, setExerciseTitle] = useState("")
  const [exerciseContent, setExerciseContent] = useState("")
  const [exerciseImageLink, setExerciseImageLink] = useState("")
  const [selectedLessonId, setSelectedLessonId] = useState<number | "">("")

  const [courses, setCourses] = useState<Course[]>([])
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/")
    } else {
      fetchCoursesChaptersLessons()
    }
  }, [user])

  const fetchCoursesChaptersLessons = async () => {
    if (!token) return
    try {
      const [courseRes, chapterRes, lessonRes] = await Promise.all([
        fetch("http://localhost:3000/course", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("http://localhost:3000/chapter", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("http://localhost:3000/lesson", { headers: { Authorization: `Bearer ${token}` } }),
      ])
      const courseData = await courseRes.json()
      const chapterData = await chapterRes.json()
      const lessonData = await lessonRes.json()
      setCourses(courseData)
      setChapters(chapterData)
      setLessons(lessonData)
    } catch {
      setError("Erreur lors du chargement des données")
    }
  }

  const postData = async (url: string, body: object) => {
    if (!token) return

    try {
      const res = await fetch(`http://localhost:3000/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      const contentType = res.headers.get("Content-Type")
      const data = contentType?.includes("application/json") ? await res.json() : await res.text()

      if (!res.ok) {
        const errorMsg = typeof data === "string" ? data : data?.error || "Erreur serveur"
        throw new Error(errorMsg)
      }

      setMessage("Ajout réussi")
      setError("")
    } catch (err) {
      if (err instanceof Error) setError(err.message)
      else setError("Erreur inconnue")
    }
  }

  const handleUserSubmit = (e: FormEvent) => {
    e.preventDefault()
    postData("user", { login, password, firstName, lastName, role })
  }

  const handleCourseSubmit = (e: FormEvent) => {
    e.preventDefault()
    postData("course", { title: courseTitle })
  }

  const handleChapterSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (selectedCourseId !== "") {
      postData("chapter", { title: chapterTitle, courseId: selectedCourseId })
    }
  }

  const handleLessonSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (selectedChapterId !== "") {
      postData("lesson", {
        title: lessonTitle,
        link: lessonLink,
        level: lessonLevel,
        languages: lessonLang,
        chapterId: selectedChapterId,
      })
    }
  }

  const handleExerciseSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (selectedLessonId !== "") {
      postData("exercise", {
        title: exerciseTitle,
        content: exerciseContent,
        imageLink: exerciseImageLink,
        lessonId: selectedLessonId,
      })
    }
  }

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Admin</h1>
      <div className="admin-dashboard-tabs-button">
        <button onClick={() => setTab("user")}>Créer un utilisateur</button>
        <button onClick={() => setTab("course")}>Créer un cours</button>
        <button onClick={() => setTab("chapter")}>Créer un chapitre</button>
        <button onClick={() => setTab("lesson")}>Créer une leçon</button>
        <button onClick={() => setTab("exercise")}>Créer un exercice</button>
      </div>

      {tab === "user" && (
        <form onSubmit={handleUserSubmit}>
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

      {tab === "course" && (
        <form onSubmit={handleCourseSubmit}>
          <input value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} placeholder="Titre du cours" required />
          <button type="submit">Créer</button>
        </form>
      )}

      {tab === "chapter" && (
        <form onSubmit={handleChapterSubmit}>
          <input value={chapterTitle} onChange={(e) => setChapterTitle(e.target.value)} placeholder="Titre du chapitre" required />
          <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(Number(e.target.value))} required>
            <option value="">Sélectionnez un cours</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
          <button type="submit">Créer</button>
        </form>
      )}

      {tab === "lesson" && (
        <form onSubmit={handleLessonSubmit}>
          <input value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} placeholder="Titre de la leçon" required />
          <input value={lessonLink} onChange={(e) => setLessonLink(e.target.value)} placeholder="Lien vidéo (http://...)" required />
          <input value={lessonLevel} onChange={(e) => setLessonLevel(e.target.value)} placeholder="Niveau" required />
          <input value={lessonLang} onChange={(e) => setLessonLang(e.target.value)} placeholder="Langage" required />
          <select value={selectedChapterId} onChange={(e) => setSelectedChapterId(Number(e.target.value))} required>
            <option value="">Sélectionnez un chapitre</option>
            {chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>{chapter.title}</option>
            ))}
          </select>
          <button type="submit">Créer</button>
        </form>
      )}

      {tab === "exercise" && (
        <form onSubmit={handleExerciseSubmit}>
          <input value={exerciseTitle} onChange={(e) => setExerciseTitle(e.target.value)} placeholder="Titre de l'exercice" required />
          <input value={exerciseContent} onChange={(e) => setExerciseContent(e.target.value)} placeholder="Consigne" required />
          <input value={exerciseImageLink} onChange={(e) => setExerciseImageLink(e.target.value)} placeholder="Lien de l'image" required />
          <select value={selectedLessonId} onChange={(e) => setSelectedLessonId(Number(e.target.value))} required>
            <option value="">Sélectionnez une leçon</option>
            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
            ))}
          </select>
          <button type="submit">Créer</button>
        </form>
      )}

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default AdminDashboard
