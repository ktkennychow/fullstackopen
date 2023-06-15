import { ContentList } from '../types'

const Total = ({ content }: ContentList) => {
  return (
    <div>
      <p>
        Number of exercises{' '}
        {content.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

export default Total
