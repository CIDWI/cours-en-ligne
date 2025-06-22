export interface Lesson {
  id: number
  title: string
  link: string
  level: string
  languages: string
  chapter: Chapter
  isDone: boolean
}

export interface Chapter {
  id: number
  title: string
  course: {
    id: number
    title: string
  }
  lessons: Lesson[]
}

export interface Course {
  id: number
  title: string
  chapters: Chapter[]
}

interface Exercise {
  id: number
  title: string
  content: string
  imageLink: string
  lesson: Lesson
}