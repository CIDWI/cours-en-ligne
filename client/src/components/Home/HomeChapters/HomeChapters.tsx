import React from 'react'
import LessonItem from '../HomeLessons/HomeLessons'
import { Chapter } from '../../../types/course'

const HomeChapters: React.FC<{ chapter: Chapter }> = ({ chapter }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2">{chapter.title}</h3>
    <div className="bg-white shadow rounded">
      {chapter.lessons.map((lesson) => (
        <LessonItem key={lesson.id} lesson={lesson} />
      ))}
    </div>
  </div>
)

export default HomeChapters