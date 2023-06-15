import { ContentList } from '../types'

export const Content = ({ content }: ContentList) => {
  return (
    <>
      {content.map((item) => (
        <p key={item.name}>
          {item.name} {item.exerciseCount}
        </p>
      ))}
    </>
  )
}

export default Content
