import { useState } from 'react'
import './App.css'
import { Header } from './components/Haeder/Header'
import { Counter } from './components/Counter/Counter'
import { ToDo } from './components/ToDo/ToDo'
import { Footer } from './components/Footer/Footer'
import { ParentComponent } from './components/parentComponent/ParentComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Header/>
<ParentComponent/>
<Footer/>
    </>
  )
}

export default App
