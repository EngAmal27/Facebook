import { useState } from 'react'
import Facebookclone from './components/Facebookclone.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Facebookclone />
  )
}

export default App
