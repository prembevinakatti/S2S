import { useState } from 'react'
import Input from './components/InputComponent/Input'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Input placeholder="hello" />
    </>
  )
}

export default App
