export interface Lesson {
  id: number
  title: string
  isDone: boolean
}

export interface Chapter {
  id: number
  title: string
  lessons: Lesson[]
}

export interface Course {
  id: number
  title: string
  chapters: Chapter[]
}
