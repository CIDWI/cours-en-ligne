import HomeChapters from "../../components/Home/HomeChapters/HomeChapters"
import Page from "../../components/Page/Page"
import './Home.css'
import { Chapter } from "../../types/course"

const chapter: Chapter = {
  id: 1,
  title: "Chapter 1",
  lessons: [
    { id: 1, title: "Lesson A", isDone: false },
    { id: 2, title: "Lesson B", isDone: true }
  ]
}

function Home() {
  return (
    <Page>
      <div className="homepage-container">
        <h1>Cours</h1>
        <hr />
        <HomeChapters chapter={chapter} />
      </div>
    </Page>
  )
}

export default Home