import React from 'react'
import LessonItem from '../HomeLessons/HomeLessons'
import { Chapter } from '../../../types/course'
import './HomeChapters.css'

const HomeChapters: React.FC<{ chapter: Chapter }> = ({ chapter }) => (
  <div className='chapter-container'>
    <h3>{chapter.title}</h3>
    <div className='chapter-button-container'>
      {chapter.lessons.map((lesson) => (
        <LessonItem key={lesson.id} lesson={lesson} />
      ))}
    </div>
  </div>
)

export default HomeChapters