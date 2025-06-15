import { useEffect, useState } from "react"
import Page from "../../layout/Page/Page"
import HomeChapters from "../../components/Home/HomeChapters/HomeChapters"
import { useUser } from "../../contexts/UserContext"
import { Course, Chapter } from "../../types/course"
import "./Home.css"

function Home() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const { user, token } = useUser()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/course/with-lessons/${user?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des cours")
        }

        const data: Course[] = await response.json()
        setCourses(data)
      } catch (error) {
        console.error("Erreur de chargement :", error)
      } finally {
        setLoading(false)
      }
    }

    if (user?.id && token) {
      fetchCourses()
    }
  }, [user, token])

  if (!user) {
    return <Page><p>Veuillez vous connecter pour accéder à vos cours.</p></Page>
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
            <div key={course.id}>
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
