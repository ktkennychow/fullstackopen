import { CourseList } from '../types'

export const Course = ({ courseParts }: CourseList) => {
  return (
    <>
      {courseParts.map((item) => (
        <p key={item.name}>
          {item.name} {item.exerciseCount}
        </p>
      ))}
    </>
  )
}

export default Course
