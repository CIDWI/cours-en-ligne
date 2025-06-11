import React from 'react'
import { Lesson } from '../../../types/course'

const LessonItem: React.FC<{ lesson: Lesson }> = ({ lesson }) => (
  <div className="flex justify-between items-center py-2 px-3 border-b">
    <span>{lesson.title}</span>
    <button
      className={`${lesson.isDone ? 'bg-gray-400' : 'bg-purple-600'}`}
    >
      {lesson.isDone ? 'Continue' : 'Start'}
    </button>
  </div>
)

export default LessonItem
