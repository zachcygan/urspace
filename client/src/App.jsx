import { useState } from 'react'
import { BrowserRouter, Link,Route,Routes} from 'react-router-dom';
import { Home, Login, Profile, MusicSearchField } from './pages'
import Navbar from './components/Navbar';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
    </>
  )
}

export default App
