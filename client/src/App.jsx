import { useState } from 'react'
import { BrowserRouter, Link,Route,Routes} from 'react-router-dom';
import { Home, Login, Profile, MusicSearchField } from './pages'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-3xl font-bold underline'>
        Hello
      </h1>
    </>
  )
}

export default App
