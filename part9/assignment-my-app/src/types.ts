export interface HeaderProps {
  name: string
}

export interface CourseList {
  courseParts: CourseProps[]
}

export interface CourseProps {
  name: string
  exerciseCount: number
}
