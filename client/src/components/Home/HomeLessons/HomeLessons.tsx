import React from 'react'
import { Lesson } from '../../../types/course'
import "./HomeLessons.css"

const LessonItem: React.FC<{ lesson: Lesson }> = ({ lesson }) => (
  <div className="lesson-container">
    <span>{lesson.title}</span>
    <button
      className={`${lesson.isDone ? "lesson-done-button" : "lesson-button-pending"} lesson-button`}
    >
      {lesson.isDone ? 'Continue' : 'Start'}
    </button>
  </div>
)

export default LessonItem
