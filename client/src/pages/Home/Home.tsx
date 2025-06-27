import { useEffect, useState } from "react"
import Page from "../../layout/Page/Page"
import HomeChapters from "../../components/Home/HomeChapters/HomeChapters"
import { useUser } from "../../contexts/UserContext"
import { Course} from "../../types/course"
import { Advancement } from "../../types/advancement"
import "./Home.css"

function Home() {
  const [courses, setCourses] = useState<Course[]>([])
  const [advancements, setAdvancements] = useState<Advancement[]>([])
  const [loading, setLoading] = useState(true)
  const { user, token } = useUser()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, advRes] = await Promise.all([
          fetch("http://localhost:3000/course/detail", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`http://localhost:3000/advancement`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        const [courseData, advData] = await Promise.all([
          courseRes.json(),
          advRes.json(),
        ])

        setCourses(courseData)
        setAdvancements(advData)
      } catch (error) {
        console.error("Erreur de chargement :", error)
      } finally {
        setLoading(false)
      }
    }

    if (user && token) fetchData()
  }, [user, token])

  const completedLessonIds = advancements
    .filter((a) => a.isDone)
    .map((a) => a.lesson.id)

  return (
    <Page>
      <div className="homepage-container">
        <h1>Cours</h1>
        <hr />
        {loading ? (
          <p>Chargement…</p>
        ) : (
          courses.map((course) => (
            <div key={course.id}>
              <h2>{course.title}</h2>
              {course.chapters.map((chapter) => (
                <HomeChapters
                  key={chapter.id}
                  chapter={chapter}
                  completedLessonIds={completedLessonIds}
                />
              ))}
            </div>
          ))
        )}
      </div>
    </Page>
  )
}

export default Home
