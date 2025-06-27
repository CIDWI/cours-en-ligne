import LessonItem from "../LessonItem/LessonItem"
import { Chapter } from "../../../types/course"
import "./HomeChapters.css"

interface Props {
  chapter: Chapter
  completedLessonIds: number[]
}

const HomeChapters: React.FC<Props> = ({ chapter, completedLessonIds }) => (
  <div className="chapter-container">
    <h3>{chapter.title}</h3>
    <div className="chapter-button-container">
      {chapter.lessons.map((lesson) => (
        <LessonItem
          key={lesson.id}
          lesson={lesson}
          isCompleted={completedLessonIds.includes(lesson.id)}
        />
      ))}
    </div>
  </div>
)

export default HomeChapters
