export interface Advancement {
  id: number;
  isDone: boolean;
  lesson: {
    id: number;
    title: string;
  };
}
