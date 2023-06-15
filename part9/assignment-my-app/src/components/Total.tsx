import { CourseList } from '../types'

const Total = ({ courseParts }: CourseList) => {
  return (
    <div>
      <p>
        Number of exercises{' '}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

export default Total
