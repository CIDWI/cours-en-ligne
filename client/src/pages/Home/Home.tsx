import HomeChapters from "../../components/Home/HomeChapters/HomeChapters"
import Page from "../../components/Page/Page"
import './Home.css'
import { Chapter } from "../../types/course"

const chapter1: Chapter = {
  id: 1,
  title: "Chapter 1",
  lessons: [
    { id: 1, title: "Lesson A", isDone: false },
    { id: 2, title: "Lesson B", isDone: true }
  ]
}
const chapter2: Chapter = {
  id: 2,
  title: "Chapter 2",
  lessons: [
    { id: 1, title: "CSS", isDone: false },
    { id: 2, title: "Lesson B", isDone: true }
  ]
}
const chapter3: Chapter = {
  id: 3,
  title: "Chapter 3",
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
        <HomeChapters chapter={chapter1} />
        <HomeChapters chapter={chapter2} />
        <HomeChapters chapter={chapter3} />
      </div>
    </Page>
  )
}

export default Home