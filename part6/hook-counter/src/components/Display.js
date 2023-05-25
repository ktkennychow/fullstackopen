import {useCounterValue} from '../CounterContext'

const Button = () => {
  const counter = useCounterValue()
  return <div>
    {counter}
  </div>
}

export default Button