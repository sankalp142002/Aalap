import { useState } from 'react'
import './App.css'
import NavB from './components/NavB' 
import ChatConsole from './components/ChatConsole'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>

<NavB />
<ChatConsole />


    </div>
  )
}

export default App
