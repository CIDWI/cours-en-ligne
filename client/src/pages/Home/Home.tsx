import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Page from "../../layout/Page/Page"
import HomeChapters from "../../components/Home/HomeChapters/HomeChapters"
import { useUser } from "../../contexts/UserContext"
import { Course, Chapter } from "../../types/course"
import "./Home.css"

const Home = () => {
  const { user, token } = useUser()
  const location = useLocation()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)

        const response = await fetch("http://localhost:3000/course/detail", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error("Erreur lors du chargement des cours")
        const data: Course[] = await response.json()
        setCourses(data)
      } catch (error) {
        console.error("Erreur de chargement :", error)
        setCourses([])
      } finally {
        setLoading(false)
      }
    }

    if (user && token) {
      fetchCourses()
    }
  }, [user, token, location.pathname]) // 👈 re-fetch à chaque navigation

  if (!user || !token) {
    return (
      <Page>
        <p>Chargement de l'utilisateur...</p>
      </Page>
    )
  }

  return (
    <Page>
      <div className="homepage-container">
        <h1>Cours</h1>
        <hr />
        {loading ? (
          <p>Chargement des cours...</p>
        ) : courses.length === 0 ? (
          <p>Aucun cours disponible.</p>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="course-block">
              <h2>{course.title}</h2>
              {course.chapters.map((chapter: Chapter) => (
                <HomeChapters key={chapter.id} chapter={chapter} />
              ))}
            </div>
          ))
        )}
      </div>
    </Page>
  )
}

export default Home
