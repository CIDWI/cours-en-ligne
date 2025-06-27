export interface Advancement {
  id: number
  isDone: boolean | number
  lesson: {
    id: number
    title: string
  }
}
