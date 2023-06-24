import { CoursePart } from '../types'

const paddingBottom = { paddingBottom: '5px' }

const Part = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div style={paddingBottom}>
      {parts.map((part) => {
        switch (part.kind) {
          case 'basic':
            return (
              <div style={paddingBottom}>
                <p>
                  <strong>
                    {part.name} {part.exerciseCount}
                  </strong>
                </p>
                <p>
                  <em> {part.description} </em>
                </p>
              </div>
            )
          case 'background':
            return (
              <div style={paddingBottom}>
                <p>
                  <strong>
                    {part.name} {part.exerciseCount}
                  </strong>
                </p>
                <p>
                  <em>{part.description}</em>
                </p>
                <p>submit to {part.backgroundMaterial}</p>
              </div>
            )
          case 'group':
            return (
              <div style={{ paddingBottom: '5px' }}>
                <p>
                  <strong>
                    {part.name} {part.exerciseCount}
                  </strong>
                </p>
                <p>project exercises {part.groupProjectCount}</p>
              </div>
            )
          case 'special':
            return (
              <div style={{ paddingBottom: '5px' }}>
                <p>
                  <strong>
                    {part.name} {part.exerciseCount}
                  </strong>
                </p>
                <p>
                  <em>{part.description}</em>
                </p>
                <p>
                  required skills:{' '}
                  {part.requirements.map((req) => (
                    <span key={req}>{req} </span>
                  ))}
                </p>
              </div>
            )
          default:
            break
        }
      })}
    </div>
  )
}

export const Course = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      <Part parts={parts} />
    </div>
  )
}

export default Course
